import { NextResponse } from 'next/server';

const services = {
  treatments: [
    "Arthritis", "Cervical", "Allergy", "Disc Slip", "Joint Pain",
    "Back Pain", "Gas", "Teeth Issues", "Spondylitis", "Sciatica",
    "Metapain", "Knee Pain", "Shoulder Pain", "Liver Issues",
    "Breathing Issues", "Headache", "Nerves Weakness", "Paralysis",
    "Piles", "Sexual Weakness"
  ],
  therapies: [
    "Acupressure Therapy", "Physiotherapy", "Laser Therapy", "Reiki Healing",
    "Sports Injury Treatment", "Children Physiotherapy", "Joint Pain Therapy",
    "Cervical & Back Pain Therapy", "Stress & Nerve Weakness Therapy"
  ],
  specialCare: [
    "Men Sexual Weakness Treatment", "Nerve Weakness / Kamzori Ilaaj",
    "Back & Knee Pain Relief", "Shoulder & Joints Pain", "Sports Injury Care"
  ]
};

export async function GET() {
  return NextResponse.json(services);
}