# MAC Engineering Services

React / Next.js / TypeScript website with an original live Three.js HVAC scene, GSAP + ScrollTrigger choreography, Lenis desktop scrolling and a GSAP/SVG service atlas.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production checks: `npm run typecheck` and `npm run build`. Serve the production build with `npm start`.

## Content and assets

All 13 completed project entries are in src/data/projects.ts. Photographs and the MAC logo are extracted directly from the supplied MAC.pdf. scripts/prepare-assets.py records the extraction mapping. Keep MAC.pdf in the deployed project root for the /portfolio route (or replace that route with a durable media URL when deploying). The PDF is approximately 51 MB.

The 3D scene is an original procedural illustrative AHU, with an exploded view, rotation, airflow, and a building-services view. It is rendered live in Three.js, not a Blender-rendered film or a manufacturer's exact equipment model. No reference-site code or imagery is used as production assets. The future offline cinematic sequence from the plan requires an approved production 3D asset; the delivered experience uses actual interactive 3D throughout the opening.

## Enquiry delivery

The form validates client-side and server-side. Copy .env.example to .env.local and provide RESEND_API_KEY and a verified ENQUIRY_FROM to enable email delivery. The recipient is info@maceng.in. No real email is sent during development checks. Without configuration, the form offers an explicit prefilled email-app fallback and never reports a false success. The basic in-process rate limit should be supplemented with deployment-level rate limiting before high-traffic public use. Review the enquiry privacy copy with the business before publishing.

## Before public release

Confirm capacity terminology, the two SRM scopes, preferred founder-name form, present partnership wording, and projects listed as ongoing. Source scope distinctions are retained in the UI. Review actual mobile/desktop motion in a connected browser. Public publishing has not been performed.

