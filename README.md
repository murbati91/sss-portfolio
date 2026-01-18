# TSS - Tech Sierra Solutions Portfolio

Production portfolio site at: https://techsierrasolutions.com

## Quick Commands

### Add New Project
```bash
node add-project.js
```

### Verify All Links
```bash
node verify-links.js
```

### Manual JSON Edit
Edit `projects.json` directly and add to the `projects` array:
```json
{
  "id": "my-project",
  "title": "My New Project",
  "url": "https://example.com",
  "image": "/projects/my-project.png",
  "description": "Short description of the project",
  "category": "ai",
  "tags": ["React", "AI", "TypeScript"],
  "status": "live",
  "verified": true
}
```

## Project Structure

```
TSS/
├── index.html           # Main portfolio page (built)
├── projects.json        # Project configuration
├── add-project.js       # Add new project script
├── verify-links.js      # Link verification script
├── assets/              # JS/CSS bundles
├── projects/            # Project screenshots
└── videos/              # Promo videos
```

## Deployment

The site is deployed to: `root@104.248.23.145:/opt/tech-sierra-portfolio/`

To deploy changes:
```bash
scp -r ./* root@104.248.23.145:/opt/tech-sierra-portfolio/
```

## Current Status

### Working URLs
- https://aaaprinterz.bahrain-ai.com ✅
- https://app.menapool.com ✅
- https://charter.bahrain-ai.com ✅
- https://erp.bahrain-ai.com ✅
- https://gcc.bahrain-ai.com ✅
- https://laterb.bahrain-ai.com ✅
- https://m.bahrain-ai.com ✅
- https://search.murbati.ai ✅
- https://www.tiktok.com/@desertsquatch ✅

### Auth Required (Dashboard apps)
- https://geopoint.bahrain-ai.com 🔒
- https://icc.bahrain-ai.com 🔒
- https://studio.bahrain-ai.com 🔒
- https://webbuilder.bahrain-ai.com 🔒

### Needs Fixing
- https://calendly.com/techsierrasolutions ❌ (404)
- https://menapool.com ❌ (SSL error)
- https://monitor.bahrain-ai.com ❌ (404)
- https://n8n.murbati.ai ❌ (404)

## Domains

- **techsierrasolutions.com** - Main portfolio (static)
- **tss.techsierrasolutions.com** - ICC Dashboard proxy
- **icc.techsierrasolutions.com** - ICC Dashboard

## Server Info

- **IP:** 104.248.23.145 (Digital Ocean)
- **Cloudflare Tunnel:** face9db5-102b-4b7e-9185-d7a3bd16f977
- **PM2 Apps:** icc-dashboard-prod (port 3020)
