# TWWW — Journey cards + Activation BGs (regenerate)

Focused regenerate set only. These images failed in the deck because **size / crop / overlay** did not match how the UI actually uses them.

Drop replacements into the **same paths / filenames**. Do not rename.

---

## Why regenerate

| Asset | Old size | How the deck actually uses it | Problem |
|---|---|---|---|
| Journey stage cards (5) | 1600×1000 landscape | 5 tall portrait cards (~**185×375** CSS px). Full-bleed `object-fit: cover` + heavy bottom shade (~bottom **55%** for copy) | Landscape art is side-cropped to a thin vertical strip; faces / phones / Coke lost |
| Activation slide BGs (4) | 1920×1080 soft “paper-veil” scenes | Now **`tone="hero"` + `overlay="dark-left-strong"`**. Copy + cards sit on the **LEFT ~50–55%**. Right must carry the story | Soft atmospheric BGs do not read as Moment Ads / Contextual / CTV / Creatives under a burgundy left wash |

---

## Brand rules (every prompt)

- Campaign: **The World Will Wait (TWWW)** — Coca-Cola with everyday meals in Kenya / Tanzania / Uganda.
- People: **Black / East African only**. No white / Caucasian casts.
- Product: real **glass Coca-Cola contour bottle** and/or **Coca-Cola drinking glasses with ice** (authentic red script logo, sharp).
- Food: real East African meals when the moment is about meals (ugali, sukuma, stew, chapati, choma, rice, family platters).
- Device screens: **sharp, readable TWWW ads** — never blank / blur / fake glyphs.
- No MediaPal marks, no watermarks, no competing soda brands.
- Unique composition per file — do not reuse poses across this set.

**Approved on-screen TWWW lines (pick one per device):**

| Moment | On-screen line |
|---|---|
| Decide / commute | `Heading home? Don’t forget a Coke for your meal.` |
| Shop / duka | `Better meals together.` |
| Prepare / recipes | `Good food tastes better together. Enjoy a Coke with your meal.` |
| Eat / CTV | `The World Will Wait.` |
| Share / social | `Good food brings us together.` |

**Hard suffix — append to every prompt:**
```
Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

---

# A. Journey stage cards — regenerate as PORTRAIT

**Folder:** `public/twww/generated/journey/`  
**New size:** **1000×1500** (2:3 portrait) · WebP  
**Code keys:** `IMAGES.journey1` … `IMAGES.journey5` (paths unchanged)

### How the UI uses them

```
.ats-paxes-cards--five.ats-journey-paxes   ← 5 equal columns, ~971×375 CSS area
  └── .ats-paxes-card                      ← tall portrait tile
        ├── img.ats-paxes-card__media      ← position:absolute; inset:0; object-fit:cover; object-position:center top
        ├── .ats-paxes-card__shade         ← dark gradient from ~mid → bottom (~55% covered for type)
        └── .ats-paxes-card__content       ← stage #, label, time chip, 3 bullets
```

**Visible photo safe zone (compose for this):**

```
┌─────────────────────┐
│                     │  ← TOP 45% = ONLY area that stays bright
│   FACE / ACTION /   │     Keep: face, phone ad, Coke bottle, food hero
│   PHONE + COKE      │     Centered horizontally, slightly above midline of THIS band
│                     │
├─────────────────────┤  ← shade starts getting heavy
│  ##  Decide         │
│  4–7PM              │  ← BOTTOM 55% = UI copy (will darken photo)
│  • point            │
│  • point            │
│  • point            │
└─────────────────────┘
```

**Composition rules for all 5 journey cards**
1. Generate **1000×1500 portrait** (not landscape).
2. Put the entire story in the **upper 45%**.
3. Keep subject **horizontally centered** (narrow card crop).
4. Phone / Coke / face must be large enough to read after deck scale (~180px wide on screen).
5. Lower half can be soft environment — it will be covered by shade + bullets.
6. Each stage must **look like that journey moment**, not a generic meal photo.

---

### 1. `journey-decide.webp` — Decide · 4–7pm
**Slide copy it must sell:** Commute home · remind household Coke belongs with supper · inspire before purchase.

```
Photorealistic portrait 2:3, 1000x1500. Black East African young adult on a Nairobi matatu / shared taxi at golden hour (4–7pm Decide window), looking at a smartphone held close to camera. Phone screen fills the UPPER CENTER with a sharp readable TWWW mobile ad: red/white Coca-Cola creative, headline “Heading home? Don’t forget a Coke for your meal.” plus a glass Coke bottle and supper plate in the ad art. A real branded Coca-Cola glass contour bottle (condensation, authentic logo) peeks from a tote / cupholder beside them. Face + phone + bottle locked in the TOP 45% of the frame, horizontally centered. Lower half softer seat/window bokeh for UI text overlay. Mood: meal decision on the journey home. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

### 2. `journey-shop.webp` — Shop · 4–7pm
**Slide copy it must sell:** Duka / retail catchment · geo mobile at point of buy · Coke addition visible at choice.

```
Photorealistic portrait 2:3, 1000x1500. Black East African shopper at a Kenyan duka / small retail cooler at dusk (4–7pm Shop window), hand reaching for an ice-cold real branded Coca-Cola glass contour bottle from a red cooler. Phone in other hand shows a sharp readable TWWW sticky ad: “Better meals together.” with Coke + meal creative. Groceries / chapati / greens visible. Action, cooler, bottle and phone locked in the TOP 45%, horizontally centered. Lower half softer aisle floor for UI text. Mood: the exact moment Coke is added to the basket. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

### 3. `journey-prepare.webp` — Prepare · 12–2pm / 4–7pm
**Slide copy it must sell:** Food / recipe / cooking content · pairing ideas before the table · build pairing before table is set.

```
Photorealistic portrait 2:3, 1000x1500. Black East African home cook in a bright kitchen preparing supper (ugali/stew or chapati prep), tablet propped nearby showing a sharp readable TWWW in-article / native ad inside a recipe page: “Good food tastes better together. Enjoy a Coke with your meal.” with Coke bottle + plated meal in the creative. A real branded Coca-Cola glass bottle waits on the counter beside chopped ingredients. Cook’s hands, food, bottle and tablet screen locked in the TOP 45%, centered. Lower half softer counter for UI text. Mood: inspiration while cooking — Coke paired before the table. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

### 4. `journey-eat.webp` — Eat · 7–9.30pm
**Slide copy it must sell:** CTV / premium video · own home supper · enjoyment and togetherness at table.

```
Photorealistic portrait 2:3, 1000x1500. Black East African family at home supper (7–9.30pm Eat window): parents and child at a set table with steaming East African meal, real branded Coca-Cola glass bottles and Coca-Cola drinking glasses with ice. Behind them a living-room CTV / smart TV shows a sharp readable TWWW full-screen spot: “The World Will Wait.” with family meal + glass Coke creative. Faces, glasses, bottles and a clear slice of the TV screen locked in the TOP 45%, centered. Lower half softer tablecloth for UI text. Mood: meal and screen sharing the room. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

### 5. `journey-share.webp` — Share · Evenings / weekends
**Slide copy it must sell:** Participation and share · community talk · choma / celebrations / holidays.

```
Photorealistic portrait 2:3, 1000x1500. Black East African friends at a weekend choma / celebration table outdoors at dusk, toasting with Coca-Cola drinking glasses (ice, authentic logo on glass) beside grilled meat. One person holds a phone showing a sharp readable vertical TWWW social ad: “Good food brings us together.” with choma + Coke creative. Faces, glasses, food and phone locked in the TOP 45%, centered. Lower half softer table for UI text. Mood: the meal becomes shareable culture. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

---

# B. Activation full-bleed backgrounds — `dark-left-strong`

**Folder:** `public/twww/generated/bg/`  
**Size:** **1920×1080** (16:9) · WebP  
**Slides:** Moment Ads (08) · Contextual (09) · Connected TV (10) · High-impact creatives (11)  
**Shell:** `tone="hero"` · `overlay="dark-left-strong"` · deck stage **1920×1080**

### How the UI uses them

```
section.ats-slide--hero
  ├── .ats-bg > img          ← full-bleed cover, 1920×1080
  ├── .ats-overlay--dark-left-strong
  │     left→right burgundy/black wash (~0–55% heavy, clears by ~88%)
  │     + bottom fade for chrome
  └── .ats-content
        LEFT copy / cards live here (~50–55% width)
        RIGHT must carry the visual story
```

**Visible story safe zone:**

```
┌──────────────────┬────────────────────────────┐
│  HEAVY OVERLAY   │                            │
│  white/red type  │   PHOTO STORY LIVES HERE   │
│  + 2×2 cards     │   (right ~45–50%)          │
│  (Moment/Ctx/CTV)│   faces, screens, Coke,    │
│                  │   meal — sharp & readable  │
│                  │                            │
└──────────────────┴────────────────────────────┘
```

**Composition rules for all 4 BGs**
1. Keep LEFT ~40% calmer (wall, soft bokeh, simpler geometry) for the overlay + type.
2. Put the **activation proof** on the RIGHT: a real TWWW ad captured in-world (phone / article / CTV / interactive unit).
3. The image must make the product truth obvious without reading the deck:
   - Moment → *time + place + mobile ad at the meal decision*
   - Contextual → *Coke ad inside food/cooking content*
   - CTV → *supper + screen sharing the room*
   - Creatives → *high-impact interactive formats you can almost touch*
4. Full color, cinematic, not washed “paper texture.” These are hero photos now.

---

### 6. `bg-moment.webp` — Moment Ads (page 08)
**Wired to:** `IMAGES.moment`  
**Page truth:** “Engage consumers in real meal moments” using time, location, context, behaviour — work lunch, journey home, family dinner, weekends.

```
Photorealistic 16:9, 1920x1080. Hero Moment Ads atmosphere for Coca-Cola TWWW in East Africa: a Black Kenyan professional at golden-hour journey-home (4–7pm), mid-stride beside matatus / urban curb, phone held toward camera showing a sharp readable TWWW Moment Ad: “Heading home? Don’t forget a Coke for your meal.” with glass Coke + supper plate in the creative. A real branded Coca-Cola glass contour bottle visible in a shopping bag. Subtle time/place cues (wristwatch, dusk light, roadside food kiosk). Composition: LEFT ~40% quieter street wall / negative space for heavy dark burgundy overlay + white headline + 2×2 cards; RIGHT ~60% carries face, phone ad (large and sharp), bottle and city energy. Must feel like a REAL-TIME meal moment, not a generic city stock shot. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

### 7. `bg-contextual.webp` — Contextual advertising (page 09)
**Wired to:** `IMAGES.contextual`  
**Page truth:** Coke inside premium food, cooking, lifestyle, entertainment content — recipes, Kenyan cuisine, groceries — context not personal data.

```
Photorealistic 16:9, 1920x1080. Hero Contextual Advertising atmosphere for Coca-Cola TWWW: Black East African home cook at a bright kitchen island with chopped vegetables and a cookbook; an open laptop / tablet dominates the RIGHT half showing a sharp readable food-article page with a TWWW native / in-article Coca-Cola unit: “Good food tastes better together. Enjoy a Coke with your meal.” beside recipe photography and a glass Coke bottle in the ad. A real branded Coca-Cola glass bottle stands on the counter next to the meal prep. Composition: LEFT ~40% calmer cabinetry / soft light for dark burgundy overlay + white type + cards; RIGHT ~60% is the content environment — screen ad must be large, sharp, obviously INSIDE cooking/food content (not a floating banner). Mood: Coke present where meal decisions are shaped. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

### 8. `bg-ctv.webp` — Connected TV (page 10)
**Wired to:** `IMAGES.ctv`  
**Page truth:** Premium streaming + household targeting in the 7–9.30pm supper window — meal and screen share the room; 1M+ LG CTV Kenya story.

```
Photorealistic 16:9, 1920x1080. Hero Connected TV atmosphere for Coca-Cola TWWW: Black East African family in a warm living room during the 7–9.30pm supper window — plates of East African supper and real branded Coca-Cola glass bottles + Coca-Cola drinking glasses with ice on the coffee table / dining edge. Large CTV / smart TV on the RIGHT fills with a sharp readable full-screen TWWW Coca-Cola spot: “The World Will Wait.” showing family meal + glass Coke bottles on-screen. Faces mid-distance, watching together. Composition: LEFT ~40% quieter wall / soft lamp for dark burgundy overlay + white type + cards; RIGHT ~60% owns the glowing CTV creative (headline readable) plus meal + Coke in foreground. Must feel premium TV storytelling meeting digital precision at home supper — not a blank TV glow. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

### 9. `bg-creatives-intro.webp` — High-impact creatives (page 11)
**Wired to:** `IMAGES.creativesIntro`  
**Page truth:** Engaging digital experiences around the meal journey — interactive formats, immersive storytelling, real-time creative from awareness to action.

```
Photorealistic 16:9, 1920x1080. Hero High-Impact Creatives atmosphere for Coca-Cola TWWW in a Nairobi creative / media studio: Black art director’s hands adjusting a large phone and tablet on a desk. Both screens show sharp readable TWWW interactive banner / rich-media units (vertical 320x480-style frames visible): one “Better meals together.” with glass Coke + meal, another “Heading home? Don’t forget a Coke for your meal.” A real branded Coca-Cola glass contour bottle sits as product reference beside printed storyboards of East African meal moments. Warm practical lights, Coke-red accent. Composition: LEFT ~40% quieter desk / wall for dark burgundy overlay + white headline + bullet points; RIGHT ~60% owns the devices with CLEAR interactive creatives (not abstract UI). Mood: campaign ideas becoming engaging meal-journey experiences you can feel. Strict: photorealistic photography only, high detail. East African / Black African people only — no white or Caucasian people. Show a real branded Coca-Cola glass contour bottle and/or Coca-Cola drinking glasses with ice (authentic red Coca-Cola logo must look real). Include appetizing East African meal food with the Coke when the scene is about meals. Any phone, tablet, laptop, TV or LED screen must show a sharp readable TWWW Coca-Cola meal ad (approved headlines) — never blank or illegible. No MediaPal logos, no competing brands, no watermarks. Unique composition.
```

---

## Drop-in checklist

| # | Save as (exact) | Size | Replaces |
|---|---|---|---|
| 1 | `public/twww/generated/journey/journey-decide.webp` | **1000×1500** | `IMAGES.journey1` |
| 2 | `public/twww/generated/journey/journey-shop.webp` | **1000×1500** | `IMAGES.journey2` |
| 3 | `public/twww/generated/journey/journey-prepare.webp` | **1000×1500** | `IMAGES.journey3` |
| 4 | `public/twww/generated/journey/journey-eat.webp` | **1000×1500** | `IMAGES.journey4` |
| 5 | `public/twww/generated/journey/journey-share.webp` | **1000×1500** | `IMAGES.journey5` |
| 6 | `public/twww/generated/bg/bg-moment.webp` | **1920×1080** | `IMAGES.moment` |
| 7 | `public/twww/generated/bg/bg-contextual.webp` | **1920×1080** | `IMAGES.contextual` |
| 8 | `public/twww/generated/bg/bg-ctv.webp` | **1920×1080** | `IMAGES.ctv` |
| 9 | `public/twww/generated/bg/bg-creatives-intro.webp` | **1920×1080** | `IMAGES.creativesIntro` |

**After drop-in:** hard-refresh the deck. Journey cards should show faces/phones/Coke in the bright top band; activation pages should read the product story on the right through the left burgundy overlay.

**Note:** Journey size changed from 1600×1000 → **1000×1500**. Paths stay the same — no code change required. `object-fit: cover` + `center top` will finally match the art.
