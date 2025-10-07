# 🚀 Deployment Guide - AurinkoLaskuri

## 📋 Prerequisites

- [Vercel Account](https://vercel.com) (free tier available)
- GitHub repository: [https://github.com/martingalmarino/AurinkoLaskuri.git](https://github.com/martingalmarino/AurinkoLaskuri.git)

## 🎯 Quick Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import from GitHub: `martingalmarino/AurinkoLaskuri`
4. Vercel will auto-detect Next.js configuration

### 2. Configure Project Settings

**Project Name:** `aurinkolaskuri` (or your preferred name)
**Framework Preset:** Next.js (auto-detected)
**Root Directory:** `./` (default)
**Build Command:** `npm run build` (default)
**Output Directory:** `.next` (default)
**Install Command:** `npm install` (default)

### 3. Environment Variables (Optional)

Add these in Vercel dashboard under **Settings > Environment Variables**:

```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=AurinkoLaskuri
FMI_API_KEY=your_fmi_api_key_here
NORD_POOL_API_KEY=your_nord_pool_api_key_here
```

### 4. Deploy

Click **"Deploy"** and wait for the build to complete (~2-3 minutes)

## 🌐 Custom Domain Setup

### Option 1: Vercel Subdomain
- Your app will be available at: `https://aurinkolaskuri.vercel.app`

### Option 2: Custom Domain
1. In Vercel dashboard, go to **Settings > Domains**
2. Add your custom domain (e.g., `aurinkolaskuri.fi`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be issued

## 📊 Post-Deployment Checklist

### ✅ SEO Configuration
- [ ] Verify sitemap.xml is accessible: `https://your-domain.com/sitemap.xml`
- [ ] Check robots.txt: `https://your-domain.com/robots.txt`
- [ ] Test meta tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

### ✅ Performance Testing
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test on mobile devices
- [ ] Verify all pages load correctly
- [ ] Check calculator functionality

### ✅ Analytics Setup (Optional)
1. Add Google Analytics ID to environment variables
2. Update `app/layout.tsx` with GA tracking code
3. Verify tracking is working in GA dashboard

## 🔧 Advanced Configuration

### Build Optimization
The project is already optimized with:
- ✅ Static Site Generation (SSG) for all kunta pages
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Minification and compression

### API Integration
Currently using mock data. To enable live APIs:

1. **FMI API Integration:**
   - Get API key from [FMI Open Data](https://en.ilmatieteenlaitos.fi/open-data-manual)
   - Add `FMI_API_KEY` to environment variables
   - Update `lib/fmiClient.ts` to use live data

2. **Nord Pool API Integration:**
   - Register at [Nord Pool](https://www.nordpoolgroup.com/)
   - Add `NORD_POOL_API_KEY` to environment variables
   - Update `lib/nordPoolClient.ts` to use live data

### Monitoring & Alerts
Set up monitoring in Vercel:
1. Go to **Settings > Functions**
2. Configure error tracking
3. Set up uptime monitoring
4. Configure deployment notifications

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (requires 18.x+)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

**404 Errors:**
- Verify `vercel.json` redirects are correct
- Check `next.config.js` configuration
- Ensure all pages are properly exported

**Performance Issues:**
- Enable Vercel Analytics
- Check bundle size in Vercel dashboard
- Optimize images and assets

### Support
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Issues](https://github.com/martingalmarino/AurinkoLaskuri/issues)

## 📈 Performance Metrics

Expected performance after deployment:
- **Lighthouse Score:** 95+ (Performance)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

## 🎉 Success!

Your premium solar ROI calculator is now live and ready to help Finnish homeowners calculate their solar panel investments with professional-grade accuracy and beautiful design!

---

**🔗 Live URL:** `https://aurinkolaskuri.vercel.app`
**📊 Analytics:** Available in Vercel dashboard
**🔧 Updates:** Push to main branch for automatic deployments
