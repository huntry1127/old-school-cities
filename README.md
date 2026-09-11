# Old School Cities

Parent apparel brand with reusable city collections. Chicago Old School is the first collection.

## Routes

- `/` — Old School Cities parent homepage
- `/chicago` — Chicago Old School collection homepage
- `/chicago/shop` — Chicago shop
- `/chicago/product/[slug]` — Chicago product detail
- `/shop` and `/product/[slug]` — compatibility redirects for older links

Add future cities in `lib/cities.js`, then create the corresponding city route using the Chicago route as the collection template.

Starter storefront for a Chicago-inspired print-on-demand apparel brand with Etsy handoff/integration points.

## Run locally

1. Install Node.js 20+.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Etsy setup

The storefront works immediately with local sample product data. Product buy buttons currently point to Etsy's homepage as placeholders.

To connect your seller account:

1. Create/approve an Etsy Seller App.
2. Copy `.env.example` to `.env.local`.
3. Add `ETSY_API_KEY`, `ETSY_SHOP_ID`, and (where needed) `ETSY_ACCESS_TOKEN`.
4. The endpoint `/api/etsy/listings` is ready to fetch active listings.
5. Replace placeholder `etsyUrl` values in `lib/products.js` with your real Etsy listing URLs, or extend the UI to consume `/api/etsy/listings` directly.

## Included

- Responsive editorial homepage
- Shop page
- Dynamic product pages
- Etsy checkout handoff
- Etsy listings API route
- Original brand language and styling
- No official Chicago sports team names/logos in merchandise copy

## Next build steps

- Add the final shirt artwork as product imagery
- Create Etsy OAuth callback/token storage
- Map Etsy listing images, prices, variations and inventory into the storefront
- Add email signup provider
- Add analytics and Meta/TikTok pixels if desired
- Deploy to Vercel and connect your domain
