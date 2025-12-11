export async function POST(request) {
  try {
    const { message, conversationId } = await request.json();
    
    // Enhanced input validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "Please provide a valid message",
          suggestion: "Ask about treatments, services, appointments, or any other clinic information"
        }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate message length
    if (message.length > 1000) {
      return new Response(
        JSON.stringify({ 
          error: "Message too long",
          suggestion: "Please keep your question under 1000 characters"
        }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "Service temporarily unavailable",
          suggestion: "Please contact the clinic directly for immediate assistance"
        }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Load knowledge base with caching
    let knowledgeBase;
    try {
      knowledgeBase = await import("../../components/additionals/knowledge.json")
        .then((module) => module.default)
        .catch(() => {
          throw new Error("Knowledge base not available");
        });
    } catch (error) {
      console.error("Failed to load knowledge base:", error);
      return new Response(
        JSON.stringify({ 
          error: "Service configuration issue",
          suggestion: "Please contact the clinic directly for accurate information"
        }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Deterministic, local responder using the knowledge base.
    // This ensures common queries are answered from `knowledge.json` even when
    // the external model is unavailable or to provide instant accurate replies.
    function generateLocalReply(message, kb) {
      if (!message || !kb) return null;
      const m = message.toLowerCase();

      // Helper formatting
      const joinPhones = (phones = []) => phones.join(' / ');

      // Appointment / booking
      if (m.includes('appointment') || m.includes('book') || m.includes('schedule')) {
        return `**Book Your Appointment** 📅\n\n**Call:** ${joinPhones(kb.contact.phone)}\n**Address:** ${kb.contact.address}\n\n**Hours:** Mon-Sun, 9:00 AM - 8:00 PM\n\nYou can call the clinic to book or ask for walk-in availability.`;
      }

      // Contact info
      if (m.includes('contact') || m.includes('phone') || m.includes('address') || m.includes('email')) {
        return `**Contact Information** 📞\n\n**Clinic:** ${kb.clinicName}\n**Address:** ${kb.contact.address}\n**Phone:** ${joinPhones(kb.contact.phone)}${kb.contact.email ? `\n**Email:** ${kb.contact.email}` : ''}`;
      }

      // Doctor info
      if (m.includes('doctor') || m.includes(kb.doctor?.name?.toLowerCase()) || m.includes('dr.')) {
        const quals = (kb.doctor?.qualifications || []).map(q => `• ${q}`).join('\n');
        return `**${kb.doctor?.name || 'Our Doctor'}** 🩺\n\n**Qualifications:**\n${quals}\n\n**Specialties:**\n• Acupressure Therapy\n• Physiotherapy\n• Laser Therapy\n\nCall ${joinPhones(kb.contact.phone)} for consultation details.`;
      }

      // Laser / therapy specific
      if (m.includes('laser')) {
        return `**Laser Therapy** 🔬\n\nBenefits:\n• Faster pain relief\n• Non-invasive\n• Accelerated healing\n\nConditions treated include arthritis, back/neck pain, sports injuries, and nerve issues.`;
      }

      if (m.includes('acupressure') || m.includes('reiki')) {
        return `**Traditional Therapies** 🌿\n\nAcupressure: pressure-point treatment for pain relief and circulation.\nReiki: energy healing to support stress reduction and emotional balance.`;
      }

      // Services list
      if (m.includes('treatment') || m.includes('treatments') || m.includes('services')) {
        const treatments = (kb.services?.treatments || []).slice(0, 25).map(t => `• ${t}`).join('\n');
        const therapies = (kb.services?.therapies || []).map(t => `• ${t}`).join('\n');
        return `**Our Services** 💼\n\n**Treatments:**\n${treatments}\n\n**Therapies:**\n${therapies}\n\nCall ${joinPhones(kb.contact.phone)} for tailored treatment plans and pricing.`;
      }

      // FAQs
      if (kb.faqs && kb.faqs.length) {
        for (const faq of kb.faqs) {
          if (m.includes(faq.q.toLowerCase().split('?')[0].trim())) {
            return `**FAQ** — ${faq.q}\n\n${faq.a}`;
          }
        }
      }

      // Short queries asking about features / highlights
      if (m.includes('highlight') || m.includes('special') || m.includes('feature')) {
        const hl = (kb.highlights || []).map(h => `• ${h}`).join('\n');
        return `**Clinic Highlights** ✨\n\n${hl}`;
      }

      // If user mentions a specific known treatment exactly, return details
      for (const t of [...(kb.services?.treatments || []), ...(kb.services?.therapies || [])]) {
        if (m.includes(t.toLowerCase())) {
          return `**${t}** 🩺\n\nWe provide comprehensive care for **${t}** using a combination of modern physiotherapy, advanced laser technology, and traditional acupressure where appropriate. Call ${joinPhones(kb.contact.phone)} for details.`;
        }
      }

      // No deterministic match found
      return null;
    }

    // Try local deterministic responder first
    const localReply = generateLocalReply(message, knowledgeBase);
    if (localReply) {
      return new Response(JSON.stringify({ reply: localReply, metadata: { local: true, timestamp: new Date().toISOString(), conversationId: conversationId || null } }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
      });
    }

    // Model configuration with fallbacks
    const requestedModel = (process.env.GOOGLE_MODEL || "gemini-2.0-flash").trim();
    
    function resolveModelAndVersion(modelId) {
      const modelConfigs = {
        "gemini-pro": { model: "gemini-1.0-pro", apiVersion: "v1beta" },
        "gemini-2.0-flash": { model: "gemini-2.0-flash", apiVersion: "v1" },
        "gemini-1.5-flash": { model: "gemini-1.5-flash", apiVersion: "v1" },
        "gemini-1.0-pro": { model: "gemini-1.0-pro", apiVersion: "v1beta" }
      };
      
      return modelConfigs[modelId] || { model: modelId, apiVersion: "v1" };
    }

    // Enhanced prompt with structured context
    const enhancedPrompt = `
You are a helpful AI assistant for Manjit Health Care clinic. Your role is to provide accurate, friendly, and professional information about the clinic's services and treatments.

CLINIC CONTEXT:
${JSON.stringify(knowledgeBase, null, 2)}

USER QUESTION: "${message}"

RESPONSE GUIDELINES:
1. PRIMARY FOCUS: Use the knowledge base above to answer questions about:
   - Available treatments and therapies
   - Doctor qualifications and expertise
   - Contact information and clinic location
   - Appointment booking process
   - Specific conditions treated

2. RESPONSE STYLE:
   - Be warm, professional, and empathetic
   - Use clear, simple language with proper formatting
   - Break complex information into bullet points when helpful
   - Always maintain a positive and supportive tone

3. BOUNDARIES:
   - If information is not in the knowledge base, politely admit it and suggest contacting the clinic
   - For medical emergencies, advise immediate hospital visit
   - Never provide medical diagnoses or treatment recommendations beyond the clinic's stated services
   - Never invent or hallucinate information not present in the knowledge base

4. FORMATTING:
   - Use emojis sparingly to make responses engaging
   - Structure information logically
   - End with an encouraging note or next steps

Please provide a helpful, accurate response based on the clinic knowledge base:
`;

    // Model discovery and fallback system
    async function listModels(targetVersion) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/${targetVersion}/models?key=${encodeURIComponent(apiKey)}`,
          { 
            method: "GET",
            signal: controller.signal
          }
        );
        clearTimeout(timeoutId);
        
        if (!resp.ok) return { models: [], errorText: await resp.text(), status: resp.status };
        const json = await resp.json();
        return { models: Array.isArray(json?.models) ? json.models : [] };
      } catch (error) {
        return { models: [], error: error.message };
      }
    }

    function pickClosestSupportedModel(models, desiredModelId) {
      const desiredBase = desiredModelId.replace(/-latest$/, "");
      const isGood = (m) => Array.isArray(m?.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent");
      
      // Exact match
      const exact = models.find((m) => m.name?.endsWith(`/models/${desiredModelId}`) && isGood(m));
      if (exact) return desiredModelId;
      
      // Latest version
      const exactLatest = models.find((m) => m.name?.endsWith(`/models/${desiredBase}-latest`) && isGood(m));
      if (exactLatest) return `${desiredBase}-latest`;
      
      // Same family
      const family = desiredBase.split("-").slice(0, 3).join("-");
      const sameFamily = models
        .filter((m) => m.name?.includes(`/models/${family}`) && isGood(m))
        .map((m) => m.name.split("/models/").pop());
      if (sameFamily.length > 0) return sameFamily[0];
      
      // Any working model
      const anyGenerate = models.find(isGood);
      return anyGenerate ? anyGenerate.name.split("/models/").pop() : null;
    }

    async function callGenerateContent(targetModel, targetVersion) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/${targetVersion}/models/${encodeURIComponent(
            targetModel
          )}:generateContent?key=${encodeURIComponent(apiKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({ 
              contents: [{ 
                role: "user", 
                parts: [{ text: enhancedPrompt }] 
              }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              }
            }),
          }
        );
        clearTimeout(timeoutId);
        return resp;
      } catch (error) {
        return new Response(JSON.stringify({ error: "Request timeout" }), { status: 408 });
      }
    }

    // Resolve model and version
    const envVersion = process.env.GOOGLE_API_VERSION && process.env.GOOGLE_API_VERSION.trim();
    const { model, apiVersion } = envVersion
      ? { model: requestedModel, apiVersion: envVersion }
      : resolveModelAndVersion(requestedModel);

    // Primary API call attempt
    let attemptModel = model;
    let attemptVersion = apiVersion;
    let upstream = await callGenerateContent(attemptModel, attemptVersion);

    // Enhanced fallback logic
    if (!upstream.ok && upstream.status === 404) {
      console.log(`Model ${attemptModel} not found, attempting fallbacks...`);
      
      const fallbackStrategies = [
        { model: `${attemptModel}-latest`, version: attemptVersion },
        { model: attemptModel, version: attemptVersion === "v1" ? "v1beta" : "v1" },
        { model: "gemini-1.5-flash-latest", version: "v1" },
        { model: "gemini-1.0-pro-latest", version: "v1beta" }
      ];

      for (const strategy of fallbackStrategies) {
        const resp = await callGenerateContent(strategy.model, strategy.version);
        if (resp.ok) {
          upstream = resp;
          attemptModel = strategy.model;
          attemptVersion = strategy.version;
          console.log(`Fallback successful: ${attemptModel} on ${attemptVersion}`);
          break;
        }
      }

      // Final attempt: discover available models
      if (!upstream.ok) {
        const preferredOrder = [attemptVersion, attemptVersion === "v1" ? "v1beta" : "v1"];
        for (const ver of preferredOrder) {
          const { models } = await listModels(ver);
          if (models && models.length) {
            const picked = pickClosestSupportedModel(models, attemptModel) || 
                          pickClosestSupportedModel(models, "gemini-1.5-flash") ||
                          pickClosestSupportedModel(models, "gemini-pro");
            if (picked) {
              const tryResp = await callGenerateContent(picked, ver);
              if (tryResp.ok) {
                upstream = tryResp;
                attemptModel = picked;
                attemptVersion = ver;
                break;
              }
            }
          }
        }
      }
    }

    // Handle upstream errors gracefully
    if (!upstream.ok) {
      const errorText = await upstream.text();
      console.error("Gemini API error:", upstream.status, errorText);
      
      let userFriendlyError = {
        error: "I'm having trouble processing your request right now",
        suggestion: "Please try again in a moment, or contact the clinic directly for immediate assistance",
        contact: knowledgeBase.contact
      };

      // Specific error handling
      if (upstream.status === 429) {
        userFriendlyError = {
          error: "Service is busy",
          suggestion: "Please wait a moment and try again",
          contact: knowledgeBase.contact
        };
      } else if (upstream.status === 403) {
        userFriendlyError = {
          error: "Service temporarily unavailable",
          suggestion: "Please contact the clinic directly for assistance",
          contact: knowledgeBase.contact
        };
      }

      return new Response(JSON.stringify(userFriendlyError), {
        status: 200, // Return 200 to avoid breaking the chat interface
        headers: { "Content-Type": "application/json" },
      });
    }

    // Process successful response
    const data = await upstream.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      `I apologize, but I'm having trouble generating a response right now. 

For accurate and immediate information about Manjit Health Care, please:

📞 Call: ${knowledgeBase.contact.phone.join(" or ")}
📍 Visit: ${knowledgeBase.contact.address}

Our clinic team will be happy to assist you with any questions about treatments, appointments, or services!`;

    return new Response(
      JSON.stringify({ 
        reply: botReply,
        metadata: {
          model: attemptModel,
          timestamp: new Date().toISOString(),
          conversationId: conversationId || null
        }
      }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
    });

  } catch (error) {
    console.error("Server error:", error);
    
    const userFriendlyError = {
      error: "Something went wrong on our end",
      suggestion: "Please try again in a few moments, or contact us directly for assistance",
      contact: {
        phone: ["94174-03743", "70098-60754"],
        address: "VPO Jangliana, Near Bham (Hoshiarpur)"
      }
    };

    return new Response(JSON.stringify(userFriendlyError), {
      status: 200, // Return 200 to maintain chat flow
      headers: { "Content-Type": "application/json" },
    });
  }
}