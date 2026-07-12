# 🚀 ANAM FASHION - Deployment Guide

## Prerequisites

- GitHub Account
- Vercel Account (free)
- Railway Account (free)
- MongoDB Atlas Account (free)
- Node.js 18+

## Step 1: MongoDB Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/anam_fashion
   ```
5. Save for later use

## Step 2: Backend (Railway)

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Connect GitHub repository
5. Set environment variables:
   ```
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<random-secret>
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   ```
6. Deploy!

## Step 3: Frontend (Vercel)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import repository
4. Set environment variables:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app/api/v1
   ```
5. Deploy!

## Step 4: Connect Both

1. Get Railway Backend URL
2. Add to Vercel Environment: `REACT_APP_API_URL`
3. Redeploy Vercel
4. Test connection

## Monitoring

- Railway Dashboard: View logs and metrics
- Vercel Dashboard: Monitor frontend performance
- MongoDB Atlas: Database analytics
