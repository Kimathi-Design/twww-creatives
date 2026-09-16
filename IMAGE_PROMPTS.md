# TWWW × MediaPal × Coca-Cola — Master Image Prompts (ChatGPT)

Generate **unique, photorealistic** East African meal-occasion photography for the TWWW MediaPal proposal. **Every slide and every card gets its own file — zero reuse / zero sharing** across pages or components.

---

## Save / naming / sizes (drop-in replace map)

**Root folder (create this):**
```
TWWW-Proposal/public/twww/generated/
├── bg/           ← 17 full-bleed slide backgrounds
├── jobs/         ← 3 response job cards
├── journey/      ← 5 meal-journey stage cards
├── audience/     ← wheel hero + 4 occasion circles
├── publishers/   ← 6 Kenya publisher cards
├── markets/      ← 3 market reach cards
├── moment/       ← 4 Moment Ads cards
├── contextual/   ← 4 contextual cards
├── ctv/          ← 4 CTV cards
├── why/          ← 4 Why MediaPal cards
└── measure/      ← 8 measurement cards
```

**Naming rules**
- Use the **exact filename** in each prompt heading (e.g. `bg-cover.webp`).
- Do not rename, do not add spaces, do not use `IMG_001`.
- Format: **WebP** for all slide BGs + cards. Audience wheel files may be **JPG** (as named) or WebP if you prefer — keep the stem identical (`wheel-hero`, `occasion-work-lunch`, etc.).
- One ChatGPT download → one file → one folder path below.

**Size legend**

| Kind | Pixels | Aspect | Notes |
|---|---|---|---|
| Slide background | **1920×1080** | 16:9 | Full-bleed; ask ChatGPT for 1920x1080 |
| Card / paxes image | **1600×1000** | 16:10 | Upper 60% subject; bottom shade in UI |
| Wheel hero / occasions | **1600×1600** | 1:1 | Circle-cropped in UI; keep subject centered |

**Export tip:** If ChatGPT only gives 1792×1024 / 1024×1024, upscale or crop to the exact sizes above before saving.

### Full path → code key (wire these later)

| Save as (exact) | Size | Replaces / wires to |
|---|---|---|
| `public/twww/generated/bg/bg-cover.webp` | 1920×1080 | `IMAGES.cover` |
| `public/twww/generated/bg/bg-brief.webp` | 1920×1080 | `IMAGES.brief` |
| `public/twww/generated/bg/bg-response.webp` | 1920×1080 | `IMAGES.response` |
| `public/twww/generated/bg/bg-journey.webp` | 1920×1080 | Journey slide BG (new key) |
| `public/twww/generated/bg/bg-audience.webp` | 1920×1080 | `IMAGES.audience` |
| `public/twww/generated/bg/bg-inventory-kenya.webp` | 1920×1080 | `IMAGES.kenya` |
| `public/twww/generated/bg/bg-inventory-markets.webp` | 1920×1080 | Markets slide BG (new key) |
| `public/twww/generated/bg/bg-moment.webp` | 1920×1080 | `IMAGES.moment` |
| `public/twww/generated/bg/bg-contextual.webp` | 1920×1080 | `IMAGES.contextual` |
| `public/twww/generated/bg/bg-ctv.webp` | 1920×1080 | `IMAGES.ctv` |
| `public/twww/generated/bg/bg-creatives-intro.webp` | 1920×1080 | Creatives intro BG |
| `public/twww/generated/bg/bg-creatives-decide.webp` | 1920×1080 | Decide canvas BG |
| `public/twww/generated/bg/bg-creatives-share.webp` | 1920×1080 | Share canvas BG |
| `public/twww/generated/bg/bg-why.webp` | 1920×1080 | `IMAGES.why` |
| `public/twww/generated/bg/bg-measure.webp` | 1920×1080 | Measurement BG |
| `public/twww/generated/bg/bg-next.webp` | 1920×1080 | `IMAGES.next` |
| `public/twww/generated/bg/bg-contact.webp` | 1920×1080 | `IMAGES.contact` |
| `public/twww/generated/jobs/job-famous.webp` | 1600×1000 | `IMAGES.job1` |
| `public/twww/generated/jobs/job-frequent.webp` | 1600×1000 | `IMAGES.job2` |
| `public/twww/generated/jobs/job-theirs.webp` | 1600×1000 | `IMAGES.job3` |
| `public/twww/generated/journey/journey-decide.webp` | 1600×1000 | `IMAGES.journey1` |
| `public/twww/generated/journey/journey-shop.webp` | 1600×1000 | `IMAGES.journey2` |
| `public/twww/generated/journey/journey-prepare.webp` | 1600×1000 | `IMAGES.journey3` |
| `public/twww/generated/journey/journey-eat.webp` | 1600×1000 | `IMAGES.journey4` |
| `public/twww/generated/journey/journey-share.webp` | 1600×1000 | `IMAGES.journey5` |
| `public/twww/generated/audience/wheel-hero.jpg` | 1600×1600 | `AUDIENCE.wheelHero` |
| `public/twww/generated/audience/occasion-work-lunch.jpg` | 1600×1600 | Work lunch occasion |
| `public/twww/generated/audience/occasion-weekend-choma.jpg` | 1600×1600 | Weekend choma |
| `public/twww/generated/audience/occasion-weekday-supper.jpg` | 1600×1600 | Weekday supper |
| `public/twww/generated/audience/occasion-christmas-table.jpg` | 1600×1600 | Christmas table |
| `public/twww/generated/publishers/pub-tasty.webp` | 1600×1000 | `IMAGES.pub1` · Tasty |
| `public/twww/generated/publishers/pub-nation.webp` | 1600×1000 | `IMAGES.pub2` · Daily Nation |
| `public/twww/generated/publishers/pub-kenyans.webp` | 1600×1000 | `IMAGES.pub3` · Kenyans.co.ke |
| `public/twww/generated/publishers/pub-tuko.webp` | 1600×1000 | `IMAGES.pub4` · TUKO |
| `public/twww/generated/publishers/pub-standard.webp` | 1600×1000 | `IMAGES.pub5` · The Standard |
| `public/twww/generated/publishers/pub-star.webp` | 1600×1000 | `IMAGES.pub6` · The Star |
| `public/twww/generated/markets/market-kenya.webp` | 1600×1000 | Kenya market card |
| `public/twww/generated/markets/market-tanzania.webp` | 1600×1000 | `IMAGES.tz` / TZ card |
| `public/twww/generated/markets/market-uganda.webp` | 1600×1000 | `IMAGES.ug` / UG card |
| `public/twww/generated/moment/moment-12-2.webp` | 1600×1000 | Moment 12–2pm card |
| `public/twww/generated/moment/moment-4-7.webp` | 1600×1000 | Moment 4–7pm card |
| `public/twww/generated/moment/moment-5-7.webp` | 1600×1000 | Moment 5–7pm card |
| `public/twww/generated/moment/moment-weekends.webp` | 1600×1000 | Moment weekends card |
| `public/twww/generated/contextual/ctx-placements.webp` | 1600×1000 | Contextual card 1 |
| `public/twww/generated/contextual/ctx-food-lifestyle.webp` | 1600×1000 | Contextual card 2 |
| `public/twww/generated/contextual/ctx-association.webp` | 1600×1000 | Contextual card 3 |
| `public/twww/generated/contextual/ctx-no-data.webp` | 1600×1000 | Contextual card 4 |
| `public/twww/generated/ctv/ctv-devices.webp` | 1600×1000 | CTV card 1 |
| `public/twww/generated/ctv/ctv-streaming.webp` | 1600×1000 | CTV card 2 |
| `public/twww/generated/ctv/ctv-household.webp` | 1600×1000 | CTV card 3 |
| `public/twww/generated/ctv/ctv-brandsafe.webp` | 1600×1000 | CTV card 4 |
| `public/twww/generated/why/why-occasion.webp` | 1600×1000 | Why card 1 |
| `public/twww/generated/why/why-inventory.webp` | 1600×1000 | Why card 2 |
| `public/twww/generated/why/why-activation.webp` | 1600×1000 | Why card 3 |
| `public/twww/generated/why/why-omni.webp` | 1600×1000 | Why card 4 |
| `public/twww/generated/measure/measure-reach.webp` | 1600×1000 | Measure card 1 |
| `public/twww/generated/measure/measure-occasions.webp` | 1600×1000 | Measure card 2 |
| `public/twww/generated/measure/measure-markets.webp` | 1600×1000 | Measure card 3 |
| `public/twww/generated/measure/measure-engagement.webp` | 1600×1000 | Measure card 4 |
| `public/twww/generated/measure/measure-banners.webp` | 1600×1000 | Measure card 5 |
| `public/twww/generated/measure/measure-ctv.webp` | 1600×1000 | Measure card 6 |
| `public/twww/generated/measure/measure-brand.webp` | 1600×1000 | Measure card 7 |
| `public/twww/generated/measure/measure-retail.webp` | 1600×1000 | Measure card 8 |

**Do not overwrite** `public/twww/coca-cola-logo.webp` or `public/twww/mediapal-logo.svg` — logos stay as-is.

After files are in place, ask to **wire paths** in `lib/ats-content.ts` (and occasion paths) so ATS placeholders are replaced.

---

## Brand & casting (non-negotiable)

- Campaign world: **The World Will Wait** — Coca-Cola with **everyday meals** in Kenya / Tanzania / Uganda.
- People: **Black / East African adults and families only**. Kenyan, Tanzanian, Ugandan faces and everyday fashion. Natural hair, contemporary urban East Africa.
- **No white / Caucasian people. No mixed “stock-global” casts.** If a background crowd appears, keep it East African.
- Look: **high-detail realism** — documentary food + lifestyle photo, shallow–medium DOF, rich color, edible texture, ice condensation, steam, warm home light or golden-hour streets.
- **Coca-Cola product (required in almost every frame):** show a **real, well-branded Coca-Cola glass contour bottle** (classic transparent glass with the real red Coca-Cola script logo visible and sharp) and/or **Coca-Cola drinking glasses** (clear tumblers / branded fountain glasses with ice and dark cola). Condensation, ice, and pours encouraged. Cans only as secondary support — **glass bottle is the hero**.
- **Meals (required):** real East African food in the same frame as Coke whenever the slide is about meals/moments — ugali, sukuma, stew, nyama choma, chapati, rice, family platters, lunch boxes, supermarket/duka groceries. Food must look freshly cooked and appetizing, plated with Coke at the table or beside the cook.
- **Phones / tablets / laptops / TVs / LED screens (when present):** must show **readable, real-looking TWWW-tailored Coca-Cola meal ads or meal content** — not blank, not abstract glow, not illegible fake UI. Sharp enough to read the headline. Use the approved lines below. Device chrome can look like iPhone/Android/laptop but **no Apple/Google wordmarks** required; focus on the ad creative.
- **Other logos still banned:** no MediaPal marks, no watermarks, no burned-in captions outside device screens, no newspaper mastheads except on publisher cards, no competing soda brands.
- Mood that supports **Coke red (#E61A27)** and deep burgundy overlays: warm wood, charcoal grills, red enamel accents, sunset, iced Coke — so red type and icons still **pop** on dark or paper slides.

**Hard suffix — append to every prompt:**
```
Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Include a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo on glass is required and must look real). Feature appetizing real East African meals with the Coke. If any phone, tablet, laptop, TV, or LED screen is visible, it must show a sharp readable TWWW-tailored Coca-Cola meal ad or meal content (approved headlines below) — never blank or illegible screens. No MediaPal logos, no competing brands, no watermarks. Unique composition — do not reuse poses or crops from other images in this set.
```

**Coke product cheat-sheet (put into prompts):**
- Hero: ice-cold **glass Coca-Cola contour bottle**, red script logo, water droplets
- Serve: **Coca-Cola in clear drinking glasses** with ice cubes, optionally a bottle beside the glass
- Pairing: bottle/glass **on the table with the meal**, in hand during toast, in a red cooler at the duka, or mid-pour over ice
- Do **not** invent fake logos — use the authentic Coca-Cola glass bottle look

**TWWW screen / mockup ad library (use when phones, laptops, tablets, TVs, or LED boards appear):**

Pick **one** line per image (readable, sharp on-screen). Creative look: Coca-Cola red + white, meal photography, East African table, glass Coke bottle in the ad art.

| Use when | On-screen ad / content |
|---|---|
| Commute / Decide / journey home | Banner: **“Heading home? Don’t forget a Coke for your meal.”** + Coke glass bottle + supper plate |
| Shop / duka / retail | Mobile sticky: **“Better meals together.”** + Coke bottle at a duka cooler |
| Prepare / recipes / cooking | In-article / native: **“Good food tastes better together. Enjoy a Coke with your meal.”** beside a recipe |
| Eat / CTV / living room | Full-screen CTV spot: **“The World Will Wait.”** + family supper with Coke |
| Share / social / weekend | Vertical social ad: **“Good food brings us together.”** + choma + Coke glasses |
| Generic meal / fame / studio | Premium video still: **“Better meals together.”** with classic glass Coke bottle hero |

**Screen framing tip:** Phone held at ~30–45° or flat on table; laptop open toward camera; ad fills most of the display; headline large enough to read at 1600px wide.

---

## Overlay map (compose for these, not generic center crops)

Deck overlays (TWWW brand tints dark slides toward deep Coke burgundy/black):

| Overlay | Slides | Where copy sits | Keep main subject |
|---|---|---|---|
| `dark-left-strong` (burgundy-black) | Cover, Brief, Next steps, Contact | Left ~55–65% | **Right half / center-right**; calm LEFT for red/white type |
| `paper-veil` (~55% photo + cream wash) | Response, Journey, Audience, Inventory, Markets, Moment, Contextual, CTV, Creatives intro, Why, Measurement | Full-frame wash | Soft atmosphere; **no sharp faces under dense copy**; texture + mid-ground food/life |
| `paper` (heavier cream) | Creatives Decide & Share canvases | Mostly paper | Very soft BG texture only; leave center empty for live banners |
| Paxes / moment cards | 2×2 & journey strips | Bottom ~40% shaded | Faces / action in **upper 60%** |
| Audience wheel hero | Circle crop center | Hub sits bottom-center of circle | Strong **center** subject; edges can soft-blur |
| Occasion circles | 4 diagonal circles | Label band on **bottom third** (red gradient) | Faces / food in **upper 55–60%** |

**Color tip for overlays:** Prefer scenes with **warm highlights + cooler shadows**. Avoid large pure-white walls behind left copy on dark slides (washes out red). On paper-veil slides, avoid neon clutter; keep mid-tones so navy labels and Coke red icons stay crisp.

---

## Shared ChatGPT settings

- Start every prompt with the size line already in the prompt (`1920x1080`, `1600x1000`, or `1600x1600`).
- Ask for **photorealistic / real photo**, not illustration, 3D, or AI-plastic skin.
- One generation = one filename. Do not “vary slightly” and reuse.
- When downloading: rename immediately to the **exact filename**, drop into the **exact folder** from the map above.

---

# A. Full-bleed slide backgrounds — `1920×1080`

**Folder:** `public/twww/generated/bg/`  
**Size:** `1920×1080` · WebP  
**Save as:** `bg-<slide>.webp` (exact names in each heading)

### 1. `bg-cover.webp` — Cover
- **Use:** `dark-left-strong` · `object-position: center` · left copy (“The World Will Wait”)
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Hero East African family supper at home: Black Kenyan parents and teen sharing a steaming meal, ice-cold real branded Coca-Cola glass contour bottles (authentic red script logo, heavy condensation) and Coca-Cola drinking glasses with ice beside a full East African supper spread, warm practical kitchen light. Composition: faces, hands, bottles and food clearly on the RIGHT two-thirds; LEFT third quieter wall/doorway for a heavy dark burgundy overlay and big white headline. Optimistic, iconic meal-together mood. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 2. `bg-brief.webp` — The brief
- **Use:** `dark-left-strong` · full-width copy stack · subject must not fight stats
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. East African home evening: Black woman plating ugali and stew while a real branded Coca-Cola glass contour bottle (authentic logo, condensation) waits on the counter next to the plated meal — the “decision before the table.” Visual weight and figure on the RIGHT; LEFT half simpler cabinetry/negative space for dark overlay, stats and bullets. Documentary, intimate, slightly cinematic. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 3. `bg-response.webp` — Our response
- **Use:** `paper-veil` · soft atmosphere behind three job cards
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft, airy East African daytime food-market / kitchen atmosphere: Black vendors and shoppers mid-distance only, colorful produce, a real branded Coca-Cola glass bottle visible in a vendor cooler mid-distance, shallow depth of field, cream-friendly light. Low contrast so a white paper veil can sit on top. No sharp faces in the center third. Mood: activate around meal moments. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 4. `bg-journey.webp` — Meal journey
- **Use:** `paper-veil` · five journey cards
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft dusk commute-to-home atmosphere in Nairobi: Black pedestrians and matatus mid-ground, warm sodium/golden light, food kiosks soft in background with a hint of red Coca-Cola cooler and glass bottles. Low-contrast texture for paper veil; avoid dominant close-up faces. Suggests the journey from decide → share. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 5. `bg-audience.webp` — Audience discovery
- **Use:** `paper-veil` · left reporting copy + right intelligence wheel
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft abstract urban East Africa: glass reflections, phone-in-hand silhouettes of Black young adults mid-distance, meal + Coke lifestyle vibe; a real Coca-Cola glass bottle soft in mid-ground; phones held by young adults showing a sharp readable TWWW mobile ad: “Better meals together.” with a Coke glass bottle and supper plate on screen. Calm left-center negative space for copy; right side can hold slightly more texture behind a circular diagram. Paper-veil friendly. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 6. `bg-inventory-kenya.webp` — Ad inventory discovery
- **Use:** `paper-veil` · split copy + publisher cards
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft Nairobi digital lifestyle atmosphere: Black young professionals browsing phones in a bright café; phone screens show a sharp readable TWWW in-feed Coke meal ad (“Good food tastes better together. Enjoy a Coke with your meal.”) with recipe + glass Coke bottle creative; real branded Coca-Cola glass bottle on the café table, airy daylight. Low contrast for paper veil; keep faces soft/mid-distance so publisher cards can sit on the right. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 7. `bg-inventory-markets.webp` — Market inventory reach
- **Use:** `paper-veil` · three market cards (KE / TZ / UG)
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft East African regional panorama suggestion: layered hills haze and city edge light (not a labeled map), warm daylight, very low contrast. Atmosphere for three country cards — no sharp portraits. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 8. `bg-moment.webp` — Moment Ads
- **Use:** `paper-veil` · 2×2 moment cards
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft real-time meal-moment atmosphere: wristwatch + phone on a café table beside a lunch plate; phone screen shows a sharp readable TWWW Moment Ad (“Heading home? Don’t forget a Coke for your meal.”) with daypart timing UI and Coke bottle art; real branded Coca-Cola glass bottle and a Coke glass with ice; Black hand reaching in frame edge only, East African café light. Paper-veil friendly, calm center. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 9. `bg-contextual.webp` — Contextual advertising
- **Use:** `paper-veil`
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft lifestyle content world: Black home cook scrolling a tablet showing a sharp readable TWWW contextual native ad inside a food article: “Good food tastes better together. Enjoy a Coke with your meal.” with recipe photo + glass Coke bottle; next to chopped vegetables, a real branded Coca-Cola glass bottle, and a cookbook. Airy kitchen daylight, low contrast for paper veil. Mood: recipes, cooking, context — not personal data. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 10. `bg-ctv.webp` — Connected TV
- **Use:** `paper-veil`
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft East African living room at supper: Black family on sofa mid-distance, large CTV showing a sharp readable TWWW Coca-Cola supper spot: “The World Will Wait.” with East African family meal + glass Coke bottles on screen; plates of real supper food plus real branded Coca-Cola glass bottles and Coca-Cola drinking glasses with ice on the coffee table in foreground bokeh. Low contrast for paper veil; faces not sharp under copy. Mood: meal + screen sharing the room. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 11. `bg-creatives-intro.webp` — High-impact creatives
- **Use:** `paper-veil` · left copy
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft creative-studio atmosphere in Nairobi: Black art director reviewing large print boards and phone mockups showing sharp readable TWWW Coke meal banner ads (“Better meals together.” / “Heading home? Don’t forget a Coke for your meal.”) with real Coca-Cola glass bottle product stills (authentic logo), warm practical lights. Calm left for copy; visual interest mid-right. Paper-veil friendly. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 12. `bg-creatives-decide.webp` — Creatives · Decide & Shop canvas
- **Use:** `paper` overlay · mostly empty for live banners
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Extremely soft abstract texture: out-of-focus commute lights and roadside dusk bokeh in East Africa, almost pastel, minimal subject. Designed to sit under a heavy paper wash with a blank center for banner drops. No people faces. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 13. `bg-creatives-share.webp` — Creatives · Prepare, Eat & Share canvas
- **Use:** `paper` overlay
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Extremely soft abstract texture: out-of-focus steam and warm kitchen bokeh, hint of real Coca-Cola glass bottle bokeh and red enamel, East African home supper glow. Heavy paper wash ready; empty center for banners. No faces. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 14. `bg-why.webp` — Why MediaPal
- **Use:** `paper-veil`
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft modern media-ops floor in East Africa: Black specialists at dual monitors showing sharp readable TWWW Coke campaign dashboards and live banner previews (“Better meals together.” with glass Coke bottle creative), subtle red accent lighting, a real Coca-Cola glass bottle on a desk edge, confident tech mood. Low contrast for paper veil; no sharp central faces. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 15. `bg-measure.webp` — Measurement
- **Use:** `paper-veil` · 2×4 metric cards
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Soft analytics atmosphere: laptop open with a sharp readable measurement dashboard featuring TWWW Coke meal campaign creatives and KPIs, printed charts beside it, a real Coca-Cola glass bottle beside the notes, Black hands annotating paper on a desk, East African office daylight. Calm, precise, paper-veil friendly. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 16. `bg-next.webp` — Next steps
- **Use:** `dark-left-strong` · left copy
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. East African strategy workshop: Black media planners at a glass whiteboard (blank marks), Nairobi skyline soft through window on the RIGHT. A real Coca-Cola glass bottle on the meeting table. Figures and window light on RIGHT; LEFT calmer wall for dark burgundy overlay and step list. Forward-moving, commercial. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 17. `bg-contact.webp` — Contact / close
- **Use:** `dark-left-strong` · left contact stack · cover-style footer
- **Prompt:**
```
Photorealistic 16:9, 1920x1080. Inviting evening exterior of a modern Nairobi commercial lobby / glass entrance with warm welcome light, East African city life soft in background. Path and architecture interest on the RIGHT; LEFT simpler facade/sky for dark overlay and contact lines. Upscale hospitality, no readable building names. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# B. Response — job cards — `1600×1000`

**Folder:** `public/twww/generated/jobs/`  
**Size:** `1600×1000` · WebP  
Bottom shade for labels · subject in **upper 60%**.

### 18. `job-famous.webp` — Make it famous
```
Photorealistic 16:10, 1600x1000. Premium East African night street with large LED screen showing a sharp readable TWWW Coca-Cola OOH/video still: “The World Will Wait.” / “Better meals together.” with glass Coke bottle + meal imagery, Black pedestrians mid-distance, and a clear foreground still of a real branded Coca-Cola glass contour bottle with condensation beside takeaway meal packaging — national fame / high-impact video mood. Key light, bottle and screen in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 19. `job-frequent.webp` — Make it frequent
```
Photorealistic 16:10, 1600x1000. Black office workers grabbing midday lunch with real branded Coca-Cola glass bottles and Coca-Cola drinking glasses with ice beside the food, repeating weekday rhythm. Faces/food in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 20. `job-theirs.webp` — Make it theirs
```
Photorealistic 16:10, 1600x1000. Black friends filming a joyful weekend meal on a phone; the phone screen (and/or an on-screen social overlay) shows a sharp readable TWWW vertical ad “Good food brings us together.” with choma + Coke glasses, shareable culture energy. Faces in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# C. Meal journey stage cards — `1600×1000`

**Folder:** `public/twww/generated/journey/`  
**Size:** `1600×1000` · WebP

### 21. `journey-decide.webp` — Decide · 4–7pm
```
Photorealistic 16:10, 1600x1000. Black commuter in matatu/taxi golden hour, phone in hand showing a sharp readable TWWW Decide ad “Heading home? Don’t forget a Coke for your meal.”, city OOH behind showing the same campaign readable if in focus, deciding supper. Face/upper body + phone in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 22. `journey-shop.webp` — Shop · 4–7pm
```
Photorealistic 16:10, 1600x1000. Black shopper at a Kenyan duka/kiosk choosing a real branded Coca-Cola glass contour bottle from a red Coca-Cola cooler beside East African groceries. Hands and cooler in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 23. `journey-prepare.webp` — Prepare
```
Photorealistic 16:10, 1600x1000. Black home cook chopping vegetables for dinner, tablet showing a sharp readable TWWW recipe contextual ad “Good food tastes better together. Enjoy a Coke with your meal.” beside a real branded Coca-Cola glass contour bottle and prepped meal ingredients. Action in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 24. `journey-eat.webp` — Eat · 7–9.30pm
```
Photorealistic 16:10, 1600x1000. Black family at the supper table, TV in background playing a sharp readable TWWW CTV spot “The World Will Wait.” with meal + Coke creative; real branded Coca-Cola glass contour bottles and Coca-Cola drinking glasses with ice paired with the meal. Faces in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 25. `journey-share.webp` — Share
```
Photorealistic 16:10, 1600x1000. Black friends at a weekend outdoor choma gathering with nyama choma on the grill, real branded Coca-Cola glass bottles in a bucket of ice and Coke glasses being poured, phones up showing a sharp readable TWWW social ad “Good food brings us together.”, laughter, night string lights. Faces + bottles + food in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# D. Audience intelligence wheel — circular crops

**Folder:** `public/twww/generated/audience/`  
**Size:** `1600×1600` · JPG (or WebP with same stem)  
Compose for **circle crop**: keep hero in center; avoid important detail in extreme corners.

### 26. `wheel-hero.jpg` — Core hero (circle)
- **Size:** `1600×1600` square (or 1600×1000 centered)
```
Photorealistic square 1600x1600. Centered East African meal-together moment: Black family hands toasting real branded Coca-Cola glass contour bottles (authentic red script logo, condensation) over a shared East African dish, Coke drinking glasses with ice also on the table, warm light, circular-friendly composition with faces and bottles in the CENTER; edges can soft falloff. High detail food + glass condensation. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 27. `occasion-work-lunch.jpg` — Work lunch circle
- Label sits on **bottom** red band → subject **upper 60%**
```
Photorealistic square 1600x1600. Black professionals sharing a quick urban work lunch outdoors/café, real branded Coca-Cola glass bottles and Coke glasses with ice. Faces and food in UPPER 60%; lower third simpler for a red label band. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 28. `occasion-weekend-choma.jpg` — Weekend choma circle
```
Photorealistic square 1600x1600. Black friends around a weekend nyama choma grill at dusk with real branded Coca-Cola glass bottles in ice, smoke and warm light. Faces/grill in UPPER 60%; lower third clearer for label. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 29. `occasion-weekday-supper.jpg` — Weekday supper circle
```
Photorealistic square 1600x1600. Black family weekday home supper with ugali/stew, practical kitchen light, real branded Coca-Cola glass contour bottles and Coke glasses with ice on the table. Faces in UPPER 60%. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 30. `occasion-christmas-table.jpg` — Christmas table circle
```
Photorealistic square 1600x1600. Black East African Christmas / holiday table celebration, festive but real home decor (no branded packaging), real branded Coca-Cola glass bottles and Coca-Cola drinking glasses raised in a toast over the holiday meal. Faces in UPPER 60%. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# E. Kenya publisher cards — `1600×1000`

**Folder:** `public/twww/generated/publishers/`  
**Size:** `1600×1000` · WebP  

**Real logos required (same size + position on all 6):**
- Use the **official real logo** for that publisher (accurate colors, wordmark, proportions — not a made-up substitute).
- **Identical lockup on every card** so the set looks uniform:
  - Corner: **TOP-LEFT**
  - Logo height: **~100px** on the 1000px-tall frame (**10% of image height**)
  - Margins: **80px from left** (~5% of width), **50px from top** (~5% of height)
  - Sit the logo on a **small soft white rounded rectangle / frosted plate** (same style all 6) so it stays crisp over busy food photos
  - Plate padding ~16–20px around the logo; slight drop shadow OK
- Scene content changes per publisher; **logo box never moves**.
- Subject / meal / Coke still in the **UPPER 60%** (below the logo plate). Bottom ~40% can be simpler for the card label shade.
- Allowed logos here only: Tasty, Daily Nation, Kenyans.co.ke, TUKO, The Standard, The Star — plus Coca-Cola on the bottle/glass. No other marks.

**Shared logo line (append inside every publisher prompt):**
```
Logo lockup (identical on all publisher cards): place the real official publisher logo TOP-LEFT on a small soft white rounded plate; logo height ~100px on a 1000px-tall image; 80px from left edge, 50px from top edge; plate padding ~18px; do not move this lockup. Meal + real branded Coca-Cola glass bottle/glasses with ice in the upper-middle of frame below the logo plate.
```

### 31. `pub-tasty.webp` — Tasty / Food
```
Photorealistic 16:10, 1600x1000. Mouthwatering East African easy-dinner plating (ugali/stew or chapati), Black cook’s hands finishing the dish, real branded Coca-Cola glass contour bottle and Coca-Cola drinking glass with ice. Food + Coke in UPPER-MIDDLE below logo. Logo lockup (identical on all publisher cards): place the real official Tasty logo TOP-LEFT on a small soft white rounded plate; logo height ~100px on a 1000px-tall image; 80px from left edge, 50px from top edge; plate padding ~18px; do not move this lockup. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Real Tasty logo + real Coca-Cola glass branding only. No MediaPal/UI captions. Unique composition.
```

### 32. `pub-nation.webp` — Daily Nation / News
```
Photorealistic 16:10, 1600x1000. Black Kenyan morning reader with breakfast plate, real branded Coca-Cola glass bottle, and a folded Daily Nation newspaper (real masthead may appear on the paper as secondary detail — primary logo is the TOP-LEFT lockup). Face + bottle + food in UPPER-MIDDLE. Logo lockup (identical on all publisher cards): place the real official Daily Nation logo TOP-LEFT on a small soft white rounded plate; logo height ~100px on a 1000px-tall image; 80px from left edge, 50px from top edge; plate padding ~18px; do not move this lockup. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Real Daily Nation logo + real Coca-Cola glass branding only. No MediaPal/UI captions. Unique composition.
```

### 33. `pub-kenyans.webp` — Kenyans.co.ke / Lifestyle
```
Photorealistic 16:10, 1600x1000. Stylish Black Kenyan couple sharing street food with real branded Coca-Cola glass bottles and Coke glasses in Nairobi evening. Faces + food + Coke in UPPER-MIDDLE. Logo lockup (identical on all publisher cards): place the real official Kenyans.co.ke logo TOP-LEFT on a small soft white rounded plate; logo height ~100px on a 1000px-tall image; 80px from left edge, 50px from top edge; plate padding ~18px; do not move this lockup. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Real Kenyans.co.ke logo + real Coca-Cola glass branding only. No MediaPal/UI captions. Unique composition.
```

### 34. `pub-tuko.webp` — TUKO / Family
```
Photorealistic 16:10, 1600x1000. Multi-generation Black Kenyan family on a sofa after a meal, warm living room, real branded Coca-Cola glass bottles and Coke glasses with ice on the coffee table with leftover plates. Faces in UPPER-MIDDLE. Logo lockup (identical on all publisher cards): place the real official TUKO logo TOP-LEFT on a small soft white rounded plate; logo height ~100px on a 1000px-tall image; 80px from left edge, 50px from top edge; plate padding ~18px; do not move this lockup. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Real TUKO logo + real Coca-Cola glass branding only. No MediaPal/UI captions. Unique composition.
```

### 35. `pub-standard.webp` — The Standard / Food
```
Photorealistic 16:10, 1600x1000. Bright East African food story scene: Black food writer plating a colorful Kenyan dish beside a real branded Coca-Cola glass bottle and Coke glass with ice. Food + Coke in UPPER-MIDDLE. Logo lockup (identical on all publisher cards): place the real official The Standard (Kenya) logo TOP-LEFT on a small soft white rounded plate; logo height ~100px on a 1000px-tall image; 80px from left edge, 50px from top edge; plate padding ~18px; do not move this lockup. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Real The Standard logo + real Coca-Cola glass branding only. No MediaPal/UI captions. Unique composition.
```

### 36. `pub-star.webp` — The Star / Entertainment
```
Photorealistic 16:10, 1600x1000. Black young adults at a casual Nairobi entertainment hangout with snacks, music vibe, real branded Coca-Cola glass bottles on the table. Energy + Coke in UPPER-MIDDLE. Logo lockup (identical on all publisher cards): place the real official The Star (Kenya) logo TOP-LEFT on a small soft white rounded plate; logo height ~100px on a 1000px-tall image; 80px from left edge, 50px from top edge; plate padding ~18px; do not move this lockup. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Real The Star logo + real Coca-Cola glass branding only. No MediaPal/UI captions. Unique composition.
```

---

# F. Market reach cards — `1600×1000`

**Folder:** `public/twww/generated/markets/`  
**Size:** `1600×1000` · WebP

### 37. `market-kenya.webp`
```
Photorealistic 16:10, 1600x1000. Distinct Nairobi urban meal culture: Black diners at a busy local restaurant terrace with real branded Coca-Cola glass bottles on the tables, late afternoon. Faces in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 38. `market-tanzania.webp`
```
Photorealistic 16:10, 1600x1000. Distinct Dar es Salaam / Tanzanian coastal-city meal moment: Black family sharing rice and stew with real branded Coca-Cola glass bottles and Coke glasses outdoors, humid warm light. Faces in UPPER half. Must feel different from Kenya card. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 39. `market-uganda.webp`
```
Photorealistic 16:10, 1600x1000. Distinct Kampala meal moment: Black friends at a hillside café supper with real branded Coca-Cola glass bottles on the table, soft hill haze. Faces in UPPER half. Must feel different from KE/TZ cards. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# G. Moment Ads cards — `1600×1000` (unique — do not reuse journey)

**Folder:** `public/twww/generated/moment/`  
**Size:** `1600×1000` · WebP

### 40. `moment-12-2.webp` — Work lunch
```
Photorealistic 16:10, 1600x1000. Black office team at 12–2pm cafeteria lunch with plated hot meals, real branded Coca-Cola glass bottles and Coke glasses with ice on the trays. Clock-on-wall soft/illegible. Faces + food + bottles in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 41. `moment-4-7.webp` — Journey home / retail
```
Photorealistic 16:10, 1600x1000. Black shopper in evening retail catchment near a lit duka, holding a real branded Coca-Cola glass contour bottle just taken from a red cooler, groceries under the other arm, phone in hand showing a sharp readable TWWW shop Moment Ad “Better meals together.” with duka + Coke creative, 4–7pm blue hour. Figure + bottle in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 42. `moment-5-7.webp` — Home dinner prep
```
Photorealistic 16:10, 1600x1000. Black parent and child setting the table for home dinner, 5–7pm window light. Faces in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 43. `moment-weekends.webp` — Weekend social
```
Photorealistic 16:10, 1600x1000. Black weekend garden party / choma celebration, daytime. Faces in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# H. Contextual cards — `1600×1000`

**Folder:** `public/twww/generated/contextual/`  
**Size:** `1600×1000` · WebP

### 44. `ctx-placements.webp` — Relevant placements
```
Photorealistic 16:10, 1600x1000. Black reader on a sofa with tablet showing a sharp readable TWWW contextual Coke meal ad inside a food article: “Good food tastes better together. Enjoy a Coke with your meal.” with glass Coke bottle creative; coffee table with snacks and a real branded Coca-Cola glass bottle. Face in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 45. `ctx-food-lifestyle.webp` — Food & lifestyle
```
Photorealistic 16:10, 1600x1000. Vibrant Kenyan cuisine flat-lay plus Black cook mid-prep in soft background. Food hero UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 46. `ctx-association.webp` — Meal association
```
Photorealistic 16:10, 1600x1000. Close storytelling: real branded Coca-Cola poured from a glass contour bottle into a Coca-Cola drinking glass with ice beside a plated East African meal, Black hand in frame. Pour/glass in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 47. `ctx-no-data.webp` — Context, not data
```
Photorealistic 16:10, 1600x1000. Semantic/context metaphor: open cookbook and grocery ingredients on a table, no face needed — privacy-safe contextual mood. Subject UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# I. CTV cards — `1600×1000`

**Folder:** `public/twww/generated/ctv/`  
**Size:** `1600×1000` · WebP

### 48. `ctv-devices.webp` — 1M+ Connected TV
```
Photorealistic 16:10, 1600x1000. Modern East African living room with slim smart TV showing a sharp readable TWWW CTV ad “The World Will Wait.” with family supper + glass Coke bottles on screen, remote on armrest, no people or Black viewer silhouette only at edge. TV in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 49. `ctv-streaming.webp` — Premium streaming
```
Photorealistic 16:10, 1600x1000. Black couple watching premium streaming on a large TV during evening; TV shows a sharp readable TWWW Coke meal CTV spot “Better meals together.” with glass bottle hero; cozy blankets, soft lamp light. Faces/TV in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 50. `ctv-household.webp` — Household targeting
```
Photorealistic 16:10, 1600x1000. Whole Black household in one living space — kids on floor, adults on sofa — supper plates present with real branded Coca-Cola glass bottles and Coke glasses. Group in UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 51. `ctv-brandsafe.webp` — Brand-safe video
```
Photorealistic 16:10, 1600x1000. Clean premium AV rack / living-room media console detail with TV showing a sharp readable brand-safe TWWW Coke supper ad “The World Will Wait.”, polished mood. Subject UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# J. Why MediaPal cards — `1600×1000` (unique)

**Folder:** `public/twww/generated/why/`  
**Size:** `1600×1000` · WebP

### 52. `why-occasion.webp` — Occasion-led targeting
```
Photorealistic 16:10, 1600x1000. Five small vignette-friendly still: Black person moving from street → shop → kitchen → table (single cohesive scene suggesting journey stages). Upper-half action. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 53. `why-inventory.webp` — Premium East Africa inventory
```
Photorealistic 16:10, 1600x1000. Black media buyer reviewing multiple screens showing sharp readable TWWW Coke meal ads placed in premium publisher environments (news/food layouts with “Good food tastes better together. Enjoy a Coke with your meal.”), Nairobi office. Face/screens UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 54. `why-activation.webp` — Moment, contextual, CTV
```
Photorealistic 16:10, 1600x1000. Triptych-like single frame: phone showing Moment Ad “Heading home? Don’t forget a Coke for your meal.”, laptop showing contextual article ad “Good food tastes better together. Enjoy a Coke with your meal.”, and TV remote in front of a CTV spot “The World Will Wait.” — all sharp and readable — on a home table with Black hand. Objects UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 55. `why-omni.webp` — Omnichannel optimisation
```
Photorealistic 16:10, 1600x1000. Black performance marketer adjusting a campaign wall / monitors showing sharp readable TWWW Coke meal creatives and optimisation charts (“Better meals together.”), energetic mood. Face UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

# K. Measurement cards — `1600×1000` (unique — 8 cards)

**Folder:** `public/twww/generated/measure/`  
**Size:** `1600×1000` · WebP

### 56. `measure-reach.webp` — Reach & frequency
```
Photorealistic 16:10, 1600x1000. Abstract media reach: many East African phones/tablets in a meeting, each screen showing a sharp readable TWWW Coke meal ad variant, Black hands. UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 57. `measure-occasions.webp` — Meal occasions
```
Photorealistic 16:10, 1600x1000. Four small meal moments collage feel in one photo: lunch box, supper plate, choma skewer, festive dessert — Black hands plating. UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 58. `measure-markets.webp` — Market split
```
Photorealistic 16:10, 1600x1000. Three unmarked country souvenir textures / city postcards blurred with Black planner’s hands — KE/TZ/UG without labels. UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 59. `measure-engagement.webp` — Engagement quality
```
Photorealistic 16:10, 1600x1000. Black reader engaged with food lifestyle content on tablet showing a sharp readable TWWW contextual Coke ad “Good food tastes better together. Enjoy a Coke with your meal.”, focused expression. Face UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 60. `measure-banners.webp` — Live banners
```
Photorealistic 16:10, 1600x1000. Designer reviewing live display banner frames on a monitor wall — sharp readable TWWW Coke banners “Heading home? Don’t forget a Coke for your meal.” and “Better meals together.” — Black creative in Nairobi studio. UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 61. `measure-ctv.webp` — CTV metrics
```
Photorealistic 16:10, 1600x1000. Close living-room CTV moment: completion vibe — Black viewer leaning in, remote, TV showing sharp readable TWWW Coke supper spot “The World Will Wait.”. Face UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 62. `measure-brand.webp` — Proxy brand measures
```
Photorealistic 16:10, 1600x1000. Qualitative research mood: Black respondent with a real branded Coca-Cola glass bottle plus meal during an interview; interviewer tablet shows a sharp readable TWWW brand-lift survey with a small Coke meal ad stimulus on screen. Face UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

### 63. `measure-retail.webp` — Retail-proximate
```
Photorealistic 16:10, 1600x1000. Geo-retail: Black shopper’s feet and shopping bag at duka entrance, phone showing a sharp readable TWWW geo Moment Ad “Better meals together.” near the duka. Subject UPPER half. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic logo on glass). Include real East African meal food with the Coke. No MediaPal watermarks. Device screens must show readable TWWW Coke meal ads when present. Unique composition.
```

---

## Delivery checklist

- [ ] 17 × `bg/` @ 1920×1080
- [ ] 3 × `jobs/` @ 1600×1000
- [ ] 5 × `journey/` @ 1600×1000
- [ ] 5 × `audience/` @ 1600×1600
- [ ] 6 × `publishers/` @ 1600×1000
- [ ] 3 × `markets/` @ 1600×1000
- [ ] 4 × `moment/` @ 1600×1000
- [ ] 4 × `contextual/` @ 1600×1000
- [ ] 4 × `ctv/` @ 1600×1000
- [ ] 4 × `why/` @ 1600×1000
- [ ] 8 × `measure/` @ 1600×1000

**Total: 63 unique images. Exact names + folders in the map at the top. No file is used on two slides.**

After files are saved, ask to **wire paths** in `lib/ats-content.ts` + occasion paths.

---

## Quick ChatGPT paste block (master system)

Use once at the start of the chat, then paste each numbered prompt:

```
You are generating a unique photorealistic photo set for a Coca-Cola × MediaPal “The World Will Wait” meals proposal in East Africa.

Rules for every image:
- Photorealistic, high detail, documentary food/lifestyle quality.
- Black / East African people only. No white or Caucasian people.
- ALWAYS include real Coca-Cola product: classic glass contour bottle with authentic red Coca-Cola script logo (condensation) and/or Coca-Cola drinking glasses with ice and dark cola. Glass bottle is the hero — not generic unmarked soda.
- ALWAYS pair Coke with real East African meals when the scene is about eating, cooking, shopping, or sharing (ugali, stew, choma, chapati, rice, lunch plates, etc.).
- If a phone, tablet, laptop, TV, or LED screen appears: show a SHARP READABLE TWWW-tailored Coca-Cola meal ad on that screen (use approved headlines: “Heading home? Don’t forget a Coke for your meal.” / “Better meals together.” / “Good food tastes better together. Enjoy a Coke with your meal.” / “Good food brings us together.” / “The World Will Wait.”). Never blank or illegible screens.
- No MediaPal logos, no competing soda brands, no watermarks (Coca-Cola bottle/glass branding + TWWW ads on screens are required exceptions).
- Respect the composition notes (left clear for dark overlays; upper 60% for cards; center for circles).
- Each image must be unique — different location, wardrobe, lighting, meal, and bottle placement from all others.
- Output one image per prompt; wait for the next prompt.
```
