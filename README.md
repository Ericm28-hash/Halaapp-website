# HALA Website — GitHub + Vercel Deployment Guide

## Repo Structure

```
hala-website/                    ← GitHub repo root
├── index.html                   ← Main website (logo embedded as base64)
├── about.html                   ← About Us page (generate with copywriting prompt)
├── faq.html                     ← FAQs (generate with copywriting prompt)
├── privacy.html                 ← Privacy Policy (generate with copywriting prompt)
├── terms.html                   ← Terms of Service (generate with copywriting prompt)
├── driver-agreement.html        ← Driver Agreement (generate with copywriting prompt)
├── cookie-policy.html           ← Cookie Policy (generate with copywriting prompt)
└── README.md                    ← This file
```

## The logo is already embedded in index.html as base64 — no separate image file needed.

## Vercel Deployment

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import from GitHub
3. Select this repo
4. Framework Preset: **Other** (plain HTML, no build step)
5. Build command: (leave empty)
6. Output directory: (leave empty / use `.`)
7. Click Deploy

Vercel auto-deploys every time you push to `main`.

## Adding a Custom Domain (halaapp.co.za)

1. In Vercel project → Settings → Domains
2. Add `halaapp.co.za` and `www.halaapp.co.za`
3. Add the DNS records Vercel gives you to your domain registrar (Afrihost / domains.co.za)
4. HTTPS is automatic

## Legal Pages

Generate all 6 legal pages using the `HALA_Master_Copywriting_Prompt.md` file.
Each page should use the same dark theme CSS as index.html.
Ask Claude to generate each page as a standalone HTML file matching the HALA brand.

## Earnings Language Reminder

All financial figures on the site use protective language:
- "Up to R..." — not "You will earn R..."
- "Approximately" — not exact figures
- "Potential earnings" — not "guaranteed income"
- "Based on individual performance, location, and market conditions"

This protects HALA against Consumer Protection Act challenges.
