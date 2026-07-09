# SoloStack

A Next.js (App Router) site for freelancer software reviews, built to
deploy on Vercel. No database — all article content lives in
`data/articles.js` as plain data objects with Markdown bodies.

## Project structure

```
app/
  layout.js          — fonts, <Header>/<Footer>, global metadata
  globals.css         — all design tokens & component styles
  page.js              — homepage (hero + article grid)
  reviews/[slug]/page.js — article template, renders Markdown from data/articles.js
  about/page.js
  privacy/page.js
  not-found.js
components/
  Header.js
  Footer.js
data/
  articles.js         — ALL article content lives here. Edit this file
                         to add, edit, or remove reviews. No other file
                         needs to change to add a new article.
```

## Adding a new article

Open `data/articles.js` and add a new object to the `articles` array:

```js
{
  slug: "your-article-slug",              // becomes /reviews/your-article-slug
  category: "Getting Paid",                // short label shown on the card
  title: "Your Article Title",
  dek: "One-sentence summary shown on the card and hero.",
  verdict: "Top pick: Tool Name",
  toolsCompared: 5,
  readTime: "7 min read",
  date: "2026",
  body: `
## A heading

Regular Markdown goes here — paragraphs, **bold**, lists, and
GFM tables all render automatically.
`,
}
```

The homepage grid, the `/reviews/[slug]` page, and the "more reviews"
section at the bottom of every article all update automatically —
nothing else needs to change.

## Running locally

Requires Node.js 18.17 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying to Vercel

**Option A — via GitHub (recommended):**

1. Create a new GitHub repository and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, sign in, and import that GitHub repo.
3. Vercel auto-detects Next.js — leave the default build settings and
   click **Deploy**.
4. Every future `git push` to `main` redeploys automatically.

**Option B — via the Vercel CLI, no GitHub required:**

```bash
npm install -g vercel
vercel login
vercel        # deploys a preview
vercel --prod # deploys to production
```

## Before you turn on AdSense

1. Replace the placeholder text in `app/privacy/page.js` with a real
   privacy policy (see the notes already written into that file).
2. Once your AdSense account is approved, replace the `.ad-slot` `<div>`
   elements in `app/reviews/[slug]/page.js` with your actual `<ins
   class="adsbygoogle">` unit, and add the AdSense script tag to
   `app/layout.js`'s `<head>` (Next.js lets you do this with the
   `next/script` component — ask your AI assistant to wire it in once
   you have your publisher ID).
3. Add a real `ads.txt` file at the project root once Google gives you
   the line to put in it — Vercel serves any file placed in `/public` at
   the site root automatically, so `public/ads.txt` becomes
   `yoursite.com/ads.txt`.

## Custom domain

In the Vercel dashboard: **Project → Settings → Domains** → add your
domain and follow the DNS instructions Vercel shows you (usually one
CNAME or A record at your domain registrar).
