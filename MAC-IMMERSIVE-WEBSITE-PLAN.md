# MAC immersive website — reference audit and revised build plan

Research date: 8 September 2026. This document replaces the visual and motion direction of the earlier landing-page mockups. The factual inventory in MAC-LANDING-PAGE-PLAN.md remains the content source.

## Research scope and confidence

Inspected the public HTML, linked CSS/JavaScript, selected original media and sequence frames from landonorris.com, terminal-industries.com, and rotoris.com. Also read OFF+BRAND's official Lando case study and inspected its desktop design imagery. The interactive browser was unavailable: no claim is made to have personally scrolled the live sites, measured their runtime frame rate, or exhaustively inspected every route. Public code reveals shipped implementations; it does not establish that every bundled module executes on every route. Lando's active custom bundle returned HTTP 403, so its internal libraries remain partly unverified.

Confidence labels used below:

- **Confirmed:** explicit primary-source agency credit, active asset reference, library implementation, or relevant application call site.
- **Strong indication:** clear integration markup without an inspectable runtime implementation.
- **Not established:** no adequate evidence in the material inspected; this is not proof of absence across the entire website.

## 1. What the references actually use

### Lando Norris

| Technology | Finding and evidence |
|---|---|
| Webflow | Confirmed in active HTML/assets and the agency's project credits. |
| Custom JavaScript | Confirmed active OFF+BRAND script in the document. That bundle itself returned 403. Commented-out alternate scripts were excluded from this audit. |
| WebGL / 3D | Confirmed by OFF+BRAND's official case study. This does not identify the underlying WebGL library. |
| Rive | Confirmed by the agency and explicit canvas artboard/state-machine markup for navigation, helmet graphics, and other interactive details. |
| Lenis | Strong indication: active embedded Lenis integration CSS and data conventions. Runtime initialization could not be inspected. |
| GSAP / ScrollTrigger | ScrollTrigger-related data attributes are present, but the library implementation and initialization could not be confirmed. Do not publish this as fully verified. |
| Three.js | Not established. WebGL is a browser rendering capability; it does not automatically mean Three.js. |
| Typography | Mona Sans variable WOFF2 is explicitly preloaded and defined in CSS; this is a verified family, not an exhaustive inventory of every display face. |

Design evidence: the agency imagery combines bold typography, personal photography, bright accents and a recurring helmet. The agency describes racing-inspired motion and cinematic scrolling. MAC should take the recurring-object storytelling principle and distinctive brand behavior from this reference.

Primary sources: [live site](https://landonorris.com), [OFF+BRAND case study](https://www.itsoffbrand.com/our-work/lando-norris), [published desktop imagery](https://cdn.prod.website-files.com/64cf4cc8c9b14fe4cb3c54d8/68ece675b6f19ada86c38c40_lando-cs-desktop.webp).

### Terminal Industries

| Technology | Finding and evidence |
|---|---|
| Nuxt / Vue | Confirmed in Nuxt headers, application bundles and Vue component implementations. |
| GSAP 3.13.0 | Explicit library banner in the inspected entry bundle. Snapshot version only; not a recommendation to pin this old version. |
| ScrollTrigger | Confirmed implementation and section-level animation call sites. |
| SplitText | Confirmed plugin implementation and character/line splitting in components. |
| DrawSVGPlugin / MotionPathPlugin | Confirmed implementations and calls animating lines and objects along paths. |
| Lenis | Confirmed implementation and root Lenis component. Application explicitly disables auto-RAF and advances Lenis through its coordinated timing system. |
| Canvas 2D image sequences | Confirmed sequence component, drawing calls and home sequence paths. Desktop configured for 410 WebP frames; mobile for 409. |
| Web Worker | Confirmed worker creation and batch loading of sequence image blobs. Rendering remains Canvas 2D in the inspected implementation. |
| Storyblok | Confirmed CMS component integration and asset hosting. |
| Typography | Suisse Intl Regular and Medium explicitly preloaded. |
| Three.js | Not established for the inspected homepage. Its cinematic hero sequence is demonstrably a rendered image sequence. |

The reviewed source frames show a realistically lit truck at the beginning, an elevated yard view with trucks rendered as wireframes/points mid-sequence, and a dark grid transition at the end. This turns a physical operation into an understandable systems story. The animated diagram paths extend that story into the page's information design. The footer credits REJOUICE.

Primary sources: [live site](https://terminal-industries.com), [application entry](https://terminal-industries.com/_nuxt/CGyjR-Nh.js), [home sequence component](https://terminal-industries.com/_nuxt/CCGV33ln.js), [sequence loader/renderer](https://terminal-industries.com/_nuxt/DjtQlGfq.js), [diagram component](https://terminal-industries.com/_nuxt/B1588z2M.js).

### Rotoris

| Technology | Finding and evidence |
|---|---|
| Next.js / React | Confirmed application structure, React implementation and Next.js response headers. |
| Tailwind CSS | Confirmed CSS banner, version 4.1.18 in inspected asset. |
| GSAP + ScrollTrigger | Confirmed library code, plugin registration and homepage frame-sequence tween. ScrollTrigger reports 3.14.2 in this snapshot. |
| Canvas 2D image sequences | Confirmed desktop sequence of 239 AVIF frames and mobile sequence of 144 AVIF frames. |
| Scroll synchronization | Desktop uses a 300vh sequence section with a sticky viewport and `scrub: 0.5`. Mobile implementation uses pinning and a `+=200%` scroll interval. |
| Video | Confirmed separate autoplay/muted/looping/playsinline hero videos and poster images for desktop/mobile. |
| Shopify | Confirmed Storefront integration and product/media delivery. Its commerce role does not cause the animation quality. |
| Lottie | Confirmed runtime and React wrapper present in shipped bundles. Specific visual assignments require runtime inspection. |
| Motion / Framer Motion family | Strong indication from animation/projection runtime signatures. Exact package name/version was not established, so it is not required in MAC's stack. |
| Fonts | Switzer, RotorisSans and Decimal font assets are referenced. RotorisSans is brand-specific and should not be reused for MAC without appropriate rights. |
| Lenis / ScrollSmoother / Three.js | Not established in the inspected homepage implementation. A `ScrollSmoother` string inside ScrollTrigger's internal compatibility logic does not prove the ScrollSmoother plugin is installed. |

The reviewed sequence begins with separated mechanical parts, passes through a compact mechanism, and ends on a finished watch. The hero uses an additional product video. The useful lesson is control of lighting, assembly choreography and product scale; the 3D appearance can be delivered through prepared frames.

Primary sources: [live site](https://www.rotoris.com/), [homepage implementation](https://www.rotoris.com/_next/static/chunks/app/page-feed45aaaa5f4382.js), [ScrollTrigger bundle](https://www.rotoris.com/_next/static/chunks/5580-942c0f576929d3fe.js), [CSS](https://www.rotoris.com/_next/static/css/b1b18c595650d9cc.css).

Asset URLs are build-specific and may change. Local research snapshots and asset-audit.json are in tmp/site-research. Avoid using the raw token-search results as confirmed detections: for example, “barba” can match a country name and “rive” can match “derived.” Only the reviewed findings above should be carried forward.

## 2. Why the earlier direction missed the brief

The earlier images emphasized repeating light/dark sections, similar architectural images, conventional project cards and a generic blue CTA system. They did not specify a strong original visual identity or a continuous spatial experience. A static image also could not demonstrate camera movement, interaction response or scroll pacing.

The revised work needs an authored 3D subject, clear transformations, deliberate typography and real engineering detail. Adding animation libraries to the previous composition would not resolve those design weaknesses.

## 3. Recommended MAC concept: Behind every environment

The visitor follows a single engineering system from component to complete building, and then sees MAC's real delivery evidence. A sculptural AHU/fan assembly is the recurring subject. It is directly connected to MAC's HVAC expertise and can carry a recognizable visual identity across the experience.

Visual language:

- Close views of physically plausible aluminium fins, fan blades, fasteners, duct joints and insulated piping; controlled studio lighting and intentional shadows.
- A predominantly mineral palette: near-black #111210, warm paper #E7E6DF, brushed-metal silver and a restrained MAC blue accent matched to the real logo. Retain the original red/blue logo.
- Directional lines derived from engineering drawings: airflow, duct routes, section markers and dimensional ticks. Use each to explain something.
- Larger and more variable composition: an object can occupy most of the viewport, then give way to a large word or a full-width project photograph. Use compact technical captions rather than decorative pseudo-data.
- Starting typography choice: Mona Sans variable for expressive headings and readable body copy; a small monospace style for system labels and genuine specifications. Test a width/weight system before buying or adding more fonts. Suisse Intl is an optional licensed alternative, not a necessary expense.
- New opening copy: **The engineering behind better spaces.** Immediate supporting line: **HVAC & MEP · Design, installation and commissioning.**
- Persistent compact navigation with a project index and enquiry action. The viewer can jump directly to work or contact without completing the animation.

## 4. Scene-by-scene experience

The scene intervals below are prototype starting points, not measured optimum durations. Native document scroll remains the source of navigation and reading order.

| Chapter | What the viewer sees | Implementation and transition |
|---|---|---|
| 01 — First impression | An oversized precision fan/AHU assembly, cropped confidently against mineral paper; headline partly overlaps the composition while remaining readable. Slow pointer response establishes depth. | Live Three.js with a static poster first. Pointer changes are limited to a few degrees; touch scrolling is unaffected. Initial contact and project links work immediately. |
| 02 — Inside the system | Casing separates; fan, filter, coil and airflow path are revealed in a short explanatory sequence. Components retain physical relationships. | Blender-authored image sequence rendered into Canvas 2D; GSAP maps scroll to frames. Two or three HTML captions, not labels burned into images. Match the entry camera, lighting and silhouette to the live model before switching layers. |
| 03 — From system to space | Camera follows the outlet through a duct route and opens into a conceptual building section. HVAC leads; electrical, ELV, public health, fire and BMS layers appear as the story progresses. | Continuation of the same rendered sequence; clean DOM/SVG annotations. Thin animated service paths using DrawSVG/MotionPath or standard SVG stroke animation. Keep “Illustrative system view” visible. |
| 04 — Explore the expertise | Viewer can select HVAC, Electrical, ELV, Public Health, Fire or BMS. The relevant path lights and the explanation changes. HVAC provides a simple rotate/explode control for the equipment model. | One shared live Three.js scene with chapter-specific model/layer state. Accessible HTML buttons; raycasting is optional enhancement. Scroll continues freely, and no orbit gesture captures the page unexpectedly. |
| 05 — Prove the work | Match-cut the schematic facade into a genuine completed-project photograph. The next project fills the visual stage as the site name, system and client change. | Normal vertical project articles with one sticky media stage on desktop. GSAP handles modest crop/opacity transitions. All 13 projects remain in a usable index; details keep contracting client separate from project site. |
| 06 — Delivery at scale | Stanley's 950 TR / 45-day result and SRMIST's 400 TR / 15-day result receive large, quiet, distinct typographic moments beside the corresponding actual work. | Stable numerical values; animate surrounding lines and composition, not invented intermediate metrics. Keep source/scope distinctions from the PDF. |
| 07 — History and approach | A technical drawing line becomes the history timeline: 2010 foundation, 2014 registration, 2021–present development. It then connects to the five-step delivery process. | SVG path progression plus restrained GSAP text choreography. Native-scroll reading layout, authentic founder portrait when approved; no invented archival images. |
| 08 — Enquiry | The opening object returns in a calmer small composition, visually closing the story. Clear project enquiry and verified contact information. | Pause heavy media. Optional brief object settle, then render only when necessary. Real form validation and confirmed backend success states. |

Recommended opening cinematic interval: 220–300vh of additional scroll on desktop, tested with real mouse-wheel and trackpad behavior. Avoid pinning every subsequent section. A short mobile interval can retain genuine movement, using a dedicated vertical composition and a lower-resolution sequence. Reduced-motion receives meaningful stills and the same content in order.

### Content coverage

Preserve the PDF's full service scope, all 13 completed project entries, four ongoing scope entries at three named sites, technology partnerships, founder/leadership, company history, values, process and contact details. Keep lengthy specifications in project detail pages or expandable accessible sections so the main narrative remains legible. Confirm the two SRM capacity figures, founder-name form, capacity units and current ongoing status before public copy is finalized.

## 5. Exact proposed stack for MAC

| Layer | Choice | Reason |
|---|---|---|
| Site foundation | Next.js + React + TypeScript | Matches a verified reference foundation; supports pre-rendered content, enquiry endpoints and project routes. Nuxt would also work, but one framework is sufficient. |
| Styling | CSS Modules with a small design-token system | Direct control over typography and custom composition. Tailwind is verified on Rotoris, but does not contribute a unique visual effect; it can be used if the project team prefers it. |
| Choreography | GSAP + ScrollTrigger; SplitText for selected headings | One timeline system coordinates scene state, captions, masks and media transitions. |
| Scrolling | Lenis on suitable desktop devices | Confirmed in Terminal, strongly indicated in Lando. One coordinated timing loop; retain native touch behavior initially. |
| Cinematic 3D delivery | Custom Canvas 2D frame player with AVIF/WebP assets | Directly follows the verified Terminal/ Rotoris sequence approach. Gives consistent lighting and authored camera choreography. |
| Interactive 3D | Three.js, GLTFLoader, compressed GLB and texture assets | MAC-specific implementation choice for genuine rotation, layer selection and depth. It is not claimed as the verified library behind all references. |
| 3D authoring | Blender, using Cycles for sequence renders and an optimized glTF export for the interactive model | Creates a reusable original asset and matched viewpoints. Blender is our proposed production tool; the references' authoring software was not established. |
| Small brand interactions | Rive only for a designed menu/service-symbol interaction that benefits from a state machine | Confirmed in Lando. Keep it isolated and deferred; SVG/GSAP covers simple arrows and lines. |
| Diagrams | SVG + GSAP DrawSVG/MotionPath where justified | Same verified technique as Terminal; useful for visible airflow/service-path stories. |
| Content | Typed project data initially; optional Storyblok when the team needs editing | Storyblok is verified on Terminal. A CMS is not required to achieve motion quality. |
| Media delivery | Optimized object storage/CDN with immutable versioned asset paths | Deliver frames progressively; cache media separately from HTML. Choose the hosting provider at deployment. |

Shopify is unnecessary for MAC's enquiry-focused site. Lottie, Motion, Rive and GSAP should not all be introduced for overlapping jobs. Use the minimum tools that implement an approved interaction. Pin compatible current versions at implementation, not the incidental versions found on the reference sites.

Official implementation references: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Lenis integration](https://github.com/darkroomengineering/lenis), [Three.js responsive canvas guidance](https://threejs.org/manual/en/responsive.html).

## 6. Animation architecture

Keep business content in server-rendered/pre-rendered HTML. Put the visual enhancement in a client-only SceneDirector. Scene progress and canvas frame indexes live in mutable objects/refs so animation does not trigger React renders on every frame.

Suggested modules:

```text
app/page.tsx                     Semantic landing content
app/projects/[slug]/page.tsx     Full project evidence
components/experience/
  SceneDirector.tsx              Chapter state and scene handoffs
  ScrollProvider.tsx             Lenis and GSAP timing integration
  SequenceCanvas.tsx             Responsive drawing and frame selection
  FrameLoader.ts                 Prioritized loading / cancellation
  EquipmentScene.ts              Three.js scene, camera and controls
  ServiceControls.tsx            Accessible HTML interaction controls
  SceneFallback.tsx              Poster / reduced-motion reading path
components/projects/
components/contact/
data/projects.ts
data/chapters.ts
public/media/mac-experience/v1/
```

Data flow:

```text
Native document scroll
  -> Lenis on supported desktop path
  -> ScrollTrigger chapter progress
  -> SceneDirector
       -> Canvas sequence frame
       -> Three.js camera / model state
       -> HTML captions and SVG annotations
```

Use one scheduling owner for manual animation work. Feed Lenis through the coordinated ticker, update ScrollTrigger on Lenis scroll, and render Three.js only while visible and changing. Do not run both Lenis auto-RAF and manual RAF. Do not add a second independent smoothing layer to already scrubbed progress without testing the cumulative delay.

Per chapter, define start/end anchors, progress mapping, media readiness, caption intervals and fallback behavior. Route/unmount cleanup must remove only that component's listeners and triggers; never copy a global `ScrollTrigger.getAll().forEach(kill)` cleanup into reusable components. Refresh layout measurements after fonts/media settle, using scoped scheduling rather than repeated per-frame refreshes.

## 7. Asset pipeline and budgets

1. Obtain original MAC logo and project photographs. Keep source images from the three references as research material only.
2. Model one believable AHU/fan assembly plus a schematic building service network. Have MAC review the engineering representation.
3. Develop three lighting/material styleframes: component closeup, exploded equipment and building section. Maintain common material and color treatment.
4. Animate a 12–18 second camera/assembly sequence. Review low-resolution motion before committing to final renders.
5. Export an initial 180–240-frame desktop sequence and an approximately 90–120-frame vertical mobile sequence; frame count is provisional and depends on motion complexity, decoding costs and visual testing.
6. Render separate posters and content-equivalent stills. Export a simplified GLB from the same source asset for interactive equipment exploration.
7. Compress frames at multiple widths. Keep captions in HTML. Use a manifest containing frame dimensions, URLs, sequence length and chapter boundaries.
8. Prioritize first visible frame and upcoming frames. Allow cancellation, bounded request concurrency and a nearest-loaded-frame fallback when a frame is missing. A worker may handle fetching/decoding where supported, but moving work to a worker does not remove network or memory cost.

Initial planning budgets, not measured results:

- Critical initial content/poster/fonts: aim near 1–1.5 MB compressed, independently of deferred animation.
- First interactive GLB: target 1–3 MB including its required compressed textures where feasible.
- Desktop sequence target: 6–12 MB progressively transferred; mobile 3–6 MB. Validate image quality against the budget and reduce frames or resolution if necessary.
- Avoid decoding the entire sequence simultaneously. One 1920×1080 RGBA frame is about 7.9 MiB; 200 decoded frames alone can approach 1.5 GiB. Use an adaptive cache with a measured memory budget, lower-resolution decode and release of old image bitmaps.
- Cap effective drawing resolution according to real hardware tests. Pause offscreen work and release GPU/decoded image resources when no longer required.
- Aim for smooth 60 Hz motion on the representative target laptop, with LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 as validation goals. No site performance was measured during this research.

## 8. Build order and quality decisions

### Phase 1 — Story and art direction

Finalize one storyboard, three original styleframes, exact opening copy, type system and the evidence-to-project mapping. Document how the recurring object belongs to MAC. Use the PDF audit to keep factual content complete.

### Phase 2 — Working motion slice

Build only the opening component scene, a short explode-to-building sequence and the transition into one genuine project photograph. Use the real proposed stack. Test forward/backward scroll, rapid scroll, first load, touch and reduced motion. This is the first reviewable design deliverable; another long generated page image cannot validate the experience.

### Phase 3 — Full experience

Extend the proven scene system through services and the project stage. Add all projects, achievement scope, timeline, delivery process, partnerships and enquiry. Keep CMS/data independent of motion. Implement project and contact access before all high-resolution assets are ready.

### Phase 4 — Production media and integration

Replace rough geometry and preview frames with the final matched assets. Calibrate colors, text placement, transition frames and timing across breakpoints. Connect a real enquiry destination. Introduce Rive only if an approved interaction needs it.

### Phase 5 — Performance and final review

Test on a mid-range Windows laptop, iPhone Safari and mid-range Android Chrome, using mouse, trackpad, keyboard and touch. Test slow-network, failed-frame, WebGL-loss, resize/orientation, background tab and reduced-motion paths. Check all source figures, actual client/site relationships, contact links and form failure states.

Estimated production range: about 4–6 weeks for a focused creative developer and 3D artist with timely access to assets and content decisions. A functional opening prototype can usually be scoped to 3–5 working days after the storyboard and initial model are ready. These are planning estimates, not promises or claims about how long the reference sites took.

Acceptance principles:

- The first screen identifies MAC and HVAC/MEP clearly, even with animation disabled.
- The movement has a readable sequence and a clear connection to a service or project.
- The same object/camera state connects the major cinematic moments without visible mismatched handoffs.
- Project evidence is authentic and accessible independently of the cinematic route.
- The desktop and mobile experiences are deliberately composed and tested.
- The design has distinctive type, framing and engineering details before decorative effects are added.

The next authorized planning outcome is this revised specification. Building and publishing the website have not been performed in this task.
