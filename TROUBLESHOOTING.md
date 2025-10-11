# Troubleshooting Guide

## Common Vercel Deployment Errors

### Error: "Failed to process text. Please try again."

This error typically occurs when the backend API call fails. Here are the steps to debug:

#### 1. Check Environment Variables

Go to your Vercel project dashboard → Settings → Environment Variables

**Required Variables:**
- `OPENAI_API_KEY` - Your OpenAI API key
- `VITE_API_URL` - Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

**Important:** After adding or changing environment variables, you MUST redeploy:
- Go to Deployments tab
- Click the three dots on latest deployment
- Click "Redeploy"

#### 2. Check Function Logs

1. Go to your Vercel project dashboard
2. Click on "Deployments"
3. Click on your latest deployment
4. Click on "Functions" tab
5. Click on "api/index.py"
6. Check the logs for errors

**Common errors in logs:**
- "OPENAI_API_KEY environment variable is not set" → Add the environment variable
- "429 Rate Limit" → You've hit OpenAI API limits
- "401 Unauthorized" → Invalid OpenAI API key
- "Timeout" → Function execution exceeded 10s (upgrade to Pro for 30s)

#### 3. Test API Endpoint Directly

Open your browser's developer console (F12) and run:

```javascript
// Test health check
fetch('https://your-app.vercel.app/api/health')
  .then(r => r.json())
  .then(console.log)

// Test rephrase (replace with your URL)
fetch('https://your-app.vercel.app/api/rephrase', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({text: 'test', style: 'professional'})
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

#### 4. Check Network Tab

1. Open browser Developer Tools (F12)
2. Go to "Network" tab
3. Try using the app
4. Look for the `/api/rephrase` request
5. Check:
   - Status code (should be 200)
   - Response body (check for error messages)
   - Request payload (verify text and style are sent)

### Error: "CORS Policy Error"

If you see CORS errors in the browser console:

1. The API is configured to allow all origins (`allow_origins=["*"]`)
2. If still seeing CORS errors, check that you're accessing the app via the Vercel URL (not localhost)
3. In production, you may want to restrict CORS to your domain - update `api/index.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],  # Your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Error: "404 Not Found" for API calls

This means the API routing isn't working:

1. Verify `vercel.json` exists in the root directory
2. Verify `api/index.py` exists
3. Check that the rewrite rule in `vercel.json` is correct
4. Redeploy the app

### Build Failures

If the build fails:

1. Check build logs in Vercel dashboard
2. Verify `frontend/package.json` has all dependencies
3. Check that Node version is compatible (Vercel uses Node 18 by default)
4. Try building locally: `cd frontend && npm run build`

### Function Cold Start / Timeout

Serverless functions have "cold starts" - the first request after inactivity may be slow.

**Solutions:**
1. Upgrade to Vercel Pro for longer timeouts (10s → 60s)
2. Reduce `max_tokens` in the OpenAI API call
3. Add loading indicator in frontend for better UX

### OpenAI API Errors

**Rate Limits:**
- Free tier: 3 requests/minute
- Paid tier: 3,500 requests/minute
- Solution: Add rate limiting or upgrade OpenAI plan

**Invalid API Key:**
- Verify key is correct in Vercel environment variables
- Check key hasn't expired
- Ensure key has proper permissions

### Environment Variable Not Updating

If you changed an environment variable but it's not taking effect:

1. Go to Vercel project → Settings → Environment Variables
2. Make the change
3. Go to Deployments tab
4. Click three dots on latest deployment → Redeploy
5. **Important:** Simple refreshing won't work - you MUST redeploy

## Still Having Issues?

1. Check Vercel Function logs for detailed error messages
2. Test the API endpoint directly using curl or browser console
3. Verify all environment variables are set correctly
4. Make sure you redeployed after changing environment variables
5. Check your OpenAI account has available credits

## Getting Help

- Vercel Docs: https://vercel.com/docs
- OpenAI API Status: https://status.openai.com/
- Check Function Logs in Vercel Dashboard
