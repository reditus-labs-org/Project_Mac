# MAC Engineering Services

MAC Engineering Services is a company website for HVAC (heating, ventilation and air conditioning) and MEP (mechanical, electrical and plumbing) engineering. It includes an interactive 3D equipment scene, an animated service diagram, project photographs, a searchable-by-sector project index, individual project pages, company information and an enquiry form.

This README describes the technologies implemented in the repository and explains what each one does.

## Technology stack

The version ranges below are declared in `package.json`. The exact dependency versions used by an installation are recorded in `package-lock.json`.

| Technology | Declared version | Use in this website |
| --- | --- | --- |
| Next.js | `^16.3.4` | Provides page routing, page generation, metadata, server endpoints and development/production commands. |
| React and React DOM | `^19.2.8` | Build and display the interface, including menus, project filters, dialogs, model controls and form feedback. |
| TypeScript | `^7.0.2` | Adds type checking to JavaScript so mistakes in component properties, project data and other code can be caught before deployment. |
| Three.js | `^0.185.1` | Creates and renders the interactive 3D equipment and building scenes. |
| GSAP | `^3.15.0` | Drives animations and supplies the shared animation ticker used by the 3D scene and smooth scrolling. |
| GSAP ScrollTrigger | Included with GSAP | Connects scrolling to the hero chapters, content reveals and photograph movement. |
| GSAP DrawSVGPlugin | Included with GSAP | Animates the drawing of service-network lines in the SVG diagram. |
| Lenis | `^1.3.26` | Smooths mouse-wheel scrolling on supported devices with a fine pointer. |
| Mona Sans Variable / Fontsource | `^5.3.0` | Supplies the main website font through a locally installed font package. |
| HTML and CSS | Browser standards | Provide page structure, responsive layouts, colours, spacing, transitions and accessible controls. |
| SVG | Browser standard | Draws the service diagram, arrows, plus icons and the fallback equipment illustration. |
| WebGL | Browser graphics API, accessed through Three.js | Uses the device's graphics hardware to display the live 3D scene inside a canvas. |
| Canvas 2D | Browser graphics API | Generates the equipment label and soft ground-shadow textures used in the 3D scene. |
| Node.js and npm | Runtime and package manager; no version pinned in `package.json` | Run the application server, install dependencies and execute project commands. |
| Resend HTTP API | External email service | Sends enquiry emails when the server has the required configuration. |
| Python, PyMuPDF and Pillow | Asset preparation tools | Extract photographs and the logo from the supplied company PDF and prepare image files. |

Development dependencies also include `@types/node`, `@types/react`, `@types/react-dom` and `@types/three`. These describe library types for TypeScript; they do not add visible website features.

## Website framework and page structure

### Next.js App Router

Pages and server endpoints live in `src/app`. The home page brings together separate components for the header, hero, services, portfolio and contact form. Company history, achievements, process information and ongoing projects are also included on the home page.

| Route | Purpose |
| --- | --- |
| `/` | Main company website and interactive engineering experience. |
| `/projects/[slug]` | Individual project pages generated from the project data. |
| `/privacy` | Enquiry privacy information. |
| `/portfolio` | Streams the original company PDF from the server. |
| `/api/enquiry` | Accepts and validates form submissions, then requests email delivery. |

The project detail route uses `generateStaticParams` to supply the 13 project paths for build-time generation. Unknown projects use Next.js's `notFound` handling. The main layout supplies a page title, description and robots settings; project pages generate their own titles and descriptions from project data.

React Client Components handle browser interactions such as changing the model view, opening a menu, selecting a service and filtering projects. The 3D component is dynamically imported with `next/dynamic` and `ssr: false`, allowing its browser-dependent renderer to initialize on the client.

### React state and native controls

React state tracks the selected service, active hero chapter, model rotation, project filter, open project and enquiry status. React refs hold values such as scroll progress and references to the canvas host or dialog.

The mobile navigation and project previews use the browser's native `<dialog>` element. The project index filters local data by sector and opens a project preview, which also links to a dedicated project page. Icons are authored as small SVG components.

## Styling, layout and fonts

The visual design is written in plain CSS in `src/app/globals.css`. CSS variables define shared colours. Grid and Flexbox arrange sections, project cards, forms and navigation. Media queries adjust the layout for large screens, tablets and phones, while `clamp()` and viewport units scale headings and other dimensions.

CSS also supplies hover effects, title transitions, the model's fade-in, dialog styling and the fixed header's appearance after scrolling. The opening experience uses a sticky stage inside a taller section so the model remains visible while its chapters change.

Mona Sans Variable is imported through `@fontsource-variable/mona-sans` in the root layout. Arial is a fallback, and technical labels use a system monospace font such as Courier New.

## 3D visuals: Three.js and WebGL

The live 3D implementation is in `src/components/Equipment.tsx`, with its controls and scroll chapters in `src/components/Hero.tsx`.

### How the model is built

The air-handling unit is created directly in code from Three.js geometry. Boxes form panels, frames and grilles; cylinders and torus shapes form fittings and fan rings; curved tubes form pipework; and extruded shapes create individual fan blades.

The equipment includes a base, vibration feet, rear casing, removable top panels, heat-exchanger fins, copper pipes, twin fans, a side grille and a MAC label. Related pieces are placed into groups so they can move together when the unit opens into its exploded view.

The same component also builds a schematic multi-storey building with floor slabs, columns, translucent surfaces, rooftop equipment and service pipes. This appears in the final scroll chapter.

These are illustrative models generated at runtime. The current implementation does not load an external GLB, GLTF or CAD model, and the hero is not a prerecorded 3D video or Blender render.

### Rendering, materials and lighting

Three.js's `WebGLRenderer` renders the scene into a transparent HTML canvas. A perspective camera gives the model depth, with framing adjusted for the canvas size.

Metallic materials represent the casing, fins and copper pipework. Additional materials represent dark components and translucent building surfaces. Ambient and directional lights illuminate the scene. `RoomEnvironment` and `PMREMGenerator` create environment lighting used for material reflections, while ACES filmic tone mapping and sRGB output control the final colour presentation.

Two small Canvas 2D drawings become Three.js textures: one carries the MAC product label, and the other creates a soft shadow beneath the equipment. The shadow avoids a separate real-time shadow-rendering pass.

### Movement and controls

| Visual behaviour | Implementation |
| --- | --- |
| Assembled equipment | Three.js groups hold parts in their original positions. |
| Exploded view | Each movable group has an offset; Three.js damping smoothly moves it towards its open or closed position. |
| Continuous rotation | The animation loop updates the model's rotation when the Rotate control is active. |
| Pointer response | Pointer movement adds a small change in viewing angle. |
| Spinning fans | Individual fan groups rotate during animation. |
| Airflow | A Three.js point cloud moves along a curved path through the equipment. |
| Building chapter | Scroll progress changes the visibility and scale of the equipment and building groups. |

GSAP's ticker supplies the animation timing. Three.js code then updates positions, rotations, particles and the camera before drawing each frame. React supplies the selected view and rotation settings, while ScrollTrigger supplies scroll progress.

### Loading and performance

The scene becomes ready only after it has a non-zero width and height and has rendered its first frame. The simplified SVG equipment drawing stays hidden during normal loading and reloading; it remains available if renderer creation fails or the WebGL context is lost. The existing live model fades into view once ready.

Performance measures include instancing the 64 repeated heat-exchanger fins, limiting the rendering pixel ratio to 1.6, and skipping rendering when the scene is outside its observed visibility area or the document is hidden. `ResizeObserver` updates canvas dimensions and camera framing, while `IntersectionObserver` tracks visibility.

When the component unmounts, it removes listeners and observers, stops its ticker callback and disposes of geometries, materials, textures and the renderer.

## Animation and scrolling stack

### GSAP

GSAP is the main JavaScript animation library. In `Motion.tsx`, content marked with `data-reveal` moves upwards and fades into view as it enters the viewport. Featured project photographs also move slightly inside their containers to create a parallax effect.

The shared GSAP ticker updates the Three.js scene and Lenis scrolling. Frame-time-based updates help keep model motion consistent when the frame rate changes.

### ScrollTrigger

ScrollTrigger measures the visitor's position within the hero section and updates the three chapters: the assembled object, its internal detail and the building system. That progress also drives the model's exploded view and transition into the building scene.

Elsewhere, ScrollTrigger starts one-time content reveals and links project-photo movement to scrolling. Measurements are refreshed after fonts are ready so layout changes caused by font loading can be accounted for.

### Lenis

Lenis smooths wheel scrolling when the device has a fine pointer and reduced motion is not requested. It runs from the GSAP ticker and informs ScrollTrigger when scrolling changes. Anchor links have an offset, and dialog content is excluded from Lenis handling. Devices that do not meet the activation conditions use native scrolling.

### SVG and DrawSVGPlugin

The service atlas in `Expertise.tsx` is a two-dimensional SVG illustration of a building and its service networks. Selecting a service updates the highlighted path, its colour and the accompanying description. GSAP's DrawSVGPlugin animates the selected path from undrawn to fully drawn.

### Reduced motion and accessibility

The implementation checks `prefers-reduced-motion`. With that preference enabled, it disables Lenis and the main scroll reveal effects, suppresses continuous fan and airflow animation, and avoids the scroll-driven building transition. Explicit model-view controls remain available. CSS also reduces transition durations and simplifies the hero layout.

Other accessibility features include a skip link, visible keyboard focus outlines, labelled form fields, image descriptions, pressed/expanded states on controls and live announcements for service descriptions and form status.

## Content, images and PDF assets

`src/data/projects.ts` stores the 13 completed project entries, sector filters and service descriptions as typed local data. Other company sections are authored in the page components. The current implementation has no database or content-management-system connection.

Photographs and the MAC logo are extracted from the supplied `MAC.pdf`. The preparation script at `scripts/prepare-assets.py` uses Python with PyMuPDF to read the PDF and Pillow to resize and encode photographs as WebP. It writes the logo as PNG. These tools prepare assets before the website runs; they are not browser dependencies.

Images are served from `public/images`. Many below-the-fold photographs use native `loading="lazy"`. The current components use standard HTML image elements rather than the Next.js Image component.

The `/portfolio` route uses Node.js filesystem and stream APIs to serve `MAC.pdf` inline with PDF response headers. Keep the approximately 51 MB PDF in the deployed project root, or update that route to use a durable media location.

## Enquiry form and email backend

`Contact.tsx` collects the visitor's name, company, email, optional phone number, project type and project brief. Native HTML form validation handles required fields, email format and field-length rules. React displays sending, success and error states.

The browser sends JSON to `/api/enquiry` using `fetch`. The Next.js route validates the data again, rejects oversized or malformed input, and checks a hidden honeypot field intended to catch simple automated submissions.

When configured, the server calls Resend's HTTP API using `fetch`; there is no Resend SDK dependency. Messages go to `info@maceng.in`, with the visitor's address set as the reply-to address. The request has a 12-second timeout, and success is returned only after Resend responds successfully with a message ID. This confirms API acceptance, not final inbox delivery.

An in-memory limiter allows up to three attempts per email address within ten minutes. Its state belongs to one server process and is not shared across instances or preserved after a restart.

If delivery is unconfigured or fails, the form offers a link that opens the visitor's email app with their enquiry filled in. It does not report a successful send for an unconfigured service.

### Email configuration

Copy `.env.example` to `.env.local` and set:

```dotenv
RESEND_API_KEY=your_resend_api_key
ENQUIRY_FROM=your_verified_sender_address
```

Use a sender identity verified with the email provider. These values are read by the server-side enquiry route.

## Development and production commands

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. The development and production start commands bind to `0.0.0.0`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Runs the Next.js development server. |
| `npm run typecheck` | Runs TypeScript without emitting application files. |
| `npm run build` | Creates the optimized Next.js production build. |
| `npm start` | Serves the production build after a successful build. |
| `node scripts/check-site.mjs` | Runs the existing HTTP checks against a running site. |

On Windows, use `npm.cmd` in place of `npm` if PowerShell blocks `npm.ps1` under its script execution policy.

The Next.js commands use the framework's build tooling, including Turbopack in the current project setup. `next.config.ts` enables React Strict Mode and disables the `X-Powered-By` header. `tsconfig.json` enables strict TypeScript checks and the `@/*` alias for `src/*` imports.

The HTTP check script uses Node.js assertions and fetch. It checks homepage content, project routes and assets, the missing-project response, privacy page, PDF response and invalid enquiry submissions. It skips the valid enquiry check when configuration may be present to avoid sending real email. It does not test browser interactions, WebGL rendering or visual animation quality. Its direct TypeScript data import requires a Node.js version capable of running that import.

## Main source files

| File or folder | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Global font, stylesheet and default metadata. |
| `src/app/page.tsx` | Home page composition and company content. |
| `src/app/globals.css` | Website styling, responsive layouts and CSS transitions. |
| `src/components/Header.tsx` | Header, navigation and mobile menu. |
| `src/components/Hero.tsx` | Hero chapters, model controls and loading presentation. |
| `src/components/Equipment.tsx` | Three.js models, lighting, rendering and movement. |
| `src/components/Motion.tsx` | Lenis scrolling, GSAP reveals and photo parallax. |
| `src/components/Expertise.tsx` | Interactive SVG service atlas and DrawSVG animation. |
| `src/components/Portfolio.tsx` | Featured projects, sector filtering and project dialogs. |
| `src/components/Contact.tsx` | Enquiry form and delivery feedback. |
| `src/components/Icons.tsx` | Shared SVG icons and brand markup. |
| `src/data/projects.ts` | Completed-project data, sectors and service descriptions. |
| `src/app/projects/[slug]/page.tsx` | Individual project pages and project metadata. |
| `src/app/api/enquiry/route.ts` | Validation, basic rate limiting and Resend integration. |
| `src/app/portfolio/route.ts` | Original PDF delivery. |
| `src/app/privacy/page.tsx` | Privacy information. |
| `public/images` | Prepared photographs and logo. |
| `scripts/prepare-assets.py` | PDF image extraction and conversion. |
| `scripts/check-site.mjs` | HTTP validation checks. |

## Before public release

Confirm capacity terminology, the two separate SRM scopes, the preferred founder-name form, current partnership wording and projects listed as ongoing. Review the enquiry privacy copy with the business and supplement the basic in-process rate limiter with deployment-level controls before high-traffic public use.

Review actual desktop and mobile loading, scrolling, model controls and reduced-motion behaviour in a connected browser. A successful build or HTTP check does not establish visual correctness. Public publishing has not been performed as part of this documentation update.
