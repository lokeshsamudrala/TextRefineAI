# Deployment Guide for Vercel

This guide will help you deploy the TextRefine AI application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com)
3. An OpenAI API key

## Step 1: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
   - Name it something like `text-rephraser`
   - Make it public or private (your choice)
   - Do NOT initialize with README (we already have one)

2. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git commit -m "Initial commit: TextRefine AI application"
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in with your GitHub account

2. Click "Add New Project"

3. Import your GitHub repository:
   - Select your `text-rephraser` repository
   - Click "Import"

4. Configure your project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Will use vercel.json settings
   - **Output Directory**: Will use vercel.json settings

5. Add Environment Variables:
   Click "Environment Variables" and add:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
   - Environment: Production, Preview, Development (select all)

6. Click "Deploy"

## Step 3: Configure Frontend Environment

After deployment, you'll get a URL like `https://your-app.vercel.app`

1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Add a new variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-app.vercel.app` (your Vercel URL)
   - Environment: Production, Preview, Development

4. Redeploy the application:
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

## Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Test the text rephrasing functionality
3. Try different styles (General, Professional, Friendly, Creative)

## Architecture

- **Frontend**: React + TypeScript (Vite) deployed as static site
- **Backend**: FastAPI as serverless functions in `/api` directory
- **API Routes**: All backend routes are prefixed with `/api`

## Troubleshooting

### CORS Issues
If you encounter CORS errors, check that:
1. The `VITE_API_URL` environment variable is set correctly
2. The backend CORS settings allow your frontend domain

### API Errors
1. Verify `OPENAI_API_KEY` is set in Vercel environment variables
2. Check the Function logs in Vercel dashboard

### Build Failures
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify Node version compatibility

## Local Development

For local development with the new structure:

```bash
# Terminal 1 - Backend
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The frontend will use `http://localhost:8000` for local development automatically.

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
