# Setup Instructions for Mahey Website

## Issues Fixed

✅ Fixed path mapping in `jsconfig.json` (changed `@/*` from `"./*"` to `"./src/*"`)
✅ Installed missing npm packages:
   - framer-motion
   - @heroicons/react
   - react-icons
   - cloudinary
✅ Created missing model files:
   - src/models/videoReview.js
   - src/models/Appointment.js
✅ Created missing library files:
   - src/lib/cloudinary.js
   - src/lib/email.js
✅ Fixed database connection naming (both `connectDB` and `dbConnect` now work)

## Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Connection (REQUIRED)
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/mahey
# For MongoDB Atlas (cloud):
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mahey

# JWT Secret (REQUIRED)
# Generate a strong random string for production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google API Configuration (REQUIRED for chat functionality)
GOOGLE_API_KEY=your-google-api-key-here
GOOGLE_MODEL=gemini-2.0-flash
GOOGLE_API_VERSION=v1

# Cloudinary Configuration (REQUIRED for image/video uploads)
CLOUDINARY_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## How to Get Environment Variables

### 1. MongoDB (MONGO_URI)
- **Local**: Install MongoDB locally and use `mongodb://localhost:27017/mahey`
- **Cloud (MongoDB Atlas)**: 
  1. Go to https://www.mongodb.com/cloud/atlas
  2. Create a free account
  3. Create a cluster
  4. Get connection string and replace username/password

### 2. JWT_SECRET
- Generate a random string (at least 32 characters)
- You can use: `openssl rand -base64 32` or any random string generator

### 3. Google API Key (GOOGLE_API_KEY)
- Go to https://console.cloud.google.com/
- Create a new project
- Enable Gemini API
- Create an API key

### 4. Cloudinary
- Go to https://cloudinary.com/
- Sign up for free account
- Get your cloud name, API key, and API secret from dashboard

## Running the Application

1. **Install dependencies** (if not already done):
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Create `.env.local` file** with all required variables (see above)

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to http://localhost:3000

## Troubleshooting

### If you get "MONGO_URI is not defined" error:
- Make sure `.env.local` file exists in the project root
- Check that the file name is exactly `.env.local` (not `.env.local.txt`)
- Restart the dev server after creating/updating `.env.local`

### If you get module not found errors:
- Run `npm install --legacy-peer-deps` again
- Delete `node_modules` and `.next` folders, then reinstall:
  ```bash
  rm -rf node_modules .next
  npm install --legacy-peer-deps
  ```

### If the site loads but API routes fail:
- Check that MongoDB is running (if using local MongoDB)
- Verify all environment variables are set correctly
- Check browser console and terminal for specific error messages

## Project Structure

- `src/app/` - Next.js app directory with pages and API routes
- `src/components/` - React components
- `src/models/` - Mongoose database models
- `src/lib/` - Utility functions and configurations
- `.env.local` - Environment variables (create this file)

## Notes

- The email functionality in `src/lib/email.js` is currently a placeholder. You'll need to integrate with an email service (Resend, SendGrid, etc.) for production use.
- Some features require the environment variables to be set, but the site should still load without them (those features will just not work).

