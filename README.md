# Prompt Forge

Buat sebuah aplikasi web internal bernama Instagram Creative Studio yang berfungsi sebagai workspace/admin panel AI untuk membuat production-ready image prompts khusus konten Instagram. Aplikasi ini BUKAN landing page publik, BUKAN website marketing, dan untuk versi pertama TIDAK membutuhkan login atau authentication. Ketika website dibuka, pengguna langsung masuk ke halaman workspace/studio. Fokus utama aplikasi adalah membantu pengguna membuat prompt gambar profesional yang nantinya akan saya salin dan generate secara manual di ChatGPT menggunakan image generation. Jangan membuat sistem image generation di dalam aplikasi. Jangan membuat upload-to-image-generation pipeline. Jangan mengintegrasikan model image generation. AI di dalam aplikasi hanya bertugas memahami brief pengguna dan menghasilkan prompt gambar yang sangat detail, profesional, konsisten, dan siap digunakan di ChatGPT/image generator lain.

Gunakan desain visual yang TERINSPIRASI dari screenshot referensi yang saya berikan. Jangan membuat clone pixel-perfect dari website referensi, tetapi pertahankan karakter visualnya: premium dark creative studio, background hampir hitam dengan undertone maroon, aksen merah/coral terang, glow merah lembut, thin red borders, rounded cards, large bold typography, subtle grid background, soft shadows, glassy dark panels, compact mono labels, status badge, dan kesan seperti software AI kreatif premium. Dominan background #090204 atau #0D0305, panel #120608 sampai #19080A, primary accent merah/coral sekitar #FF4D52 sampai #FF666A, accent secondary burgundy #651017, text utama #FFF1F1, text secondary #C9AEB0, border rgba(255,80,85,0.18), success muted green hanya untuk status tertentu. Jangan menggunakan tampilan dashboard SaaS generic berwarna biru. Jangan menggunakan sidebar putih. Semua interface harus terasa seperti creative production studio premium.

Buat aplikasi full-screen dengan layout desktop-first namun tetap responsive. Pada desktop gunakan sidebar kiri fixed sekitar 250–280px dan area utama di kanan. Sidebar berwarna sangat gelap dengan border kanan tipis merah transparan. Bagian atas sidebar memiliki logo sederhana berbentuk kotak rounded merah menyala dengan simbol lightning/flash putih, lalu nama produk “Instagram Creative Studio” dengan subtitle kecil “AI VISUAL PROMPT ENGINE”. Di sidebar terdapat 10 menu utama dan semuanya khusus workflow Instagram. Gunakan icon line-style yang konsisten, mirip Lucide Icons. Menu pertama aktif memiliki background merah gelap transparan, border merah tipis, dan glow kecil.

Jadikan 10 menu sidebar berikut sebagai menu utama:

Dashboard

Feed 1:1

Feed 4:5

Carousel

Story / Reels

9-Feed Grid

Product Ads

Caption & Hook

Brand Kit

Prompt History

Dashboard adalah halaman default ketika aplikasi dibuka. Tidak ada halaman public, tidak ada navbar marketing, tidak ada pricing page, tidak ada FAQ public, tidak ada landing page. Root route / langsung membuka dashboard studio.

Pada bagian atas content area buat topbar internal. Di kiri tampilkan breadcrumb kecil seperti “Instagram Studio / Dashboard”. Di tengah atau area utama dapat terdapat command/search field sederhana “Describe what you want to create…” tetapi jangan mengambil terlalu banyak ruang. Di kanan tampilkan status AI seperti “AI ENGINE • READY” dengan dot merah/coral dan tombol kecil “Copy Last Prompt”, “Clear Workspace”, dan optional “Settings”. Jangan buat login button karena versi ini tanpa login.

Dashboard harus terasa seperti command center untuk content creator. Buat header dengan badge kecil “INSTAGRAM CREATIVE ENGINE” dan headline besar seperti “Turn your brief into a production-ready Instagram visual prompt.” Di bawahnya jelaskan singkat bahwa engine akan mengubah ide/produk menjadi prompt visual premium dengan struktur komposisi, art direction, lighting, typography, product placement, color system, hierarchy, negative constraints, dan format Instagram yang sesuai. Tambahkan statistik kecil seperti “Prompt Engine Ready”, “10 Creative Modes”, “IG Optimized”, “Manual Image Generation”. Jangan menggunakan angka yang terkesan sebagai data pengguna nyata.

Di dashboard buat grid kartu shortcut untuk seluruh mode utama. Setiap kartu memiliki icon, nama mode, deskripsi singkat, format/ratio badge, dan tombol “Open”. Contohnya Feed 1:1 — “Square feed visual”, ratio “1:1”; Feed 4:5 — “Portrait feed visual”, ratio “4:5”; Carousel — “Multi-slide visual sequence”, badge “3–10 slides”; Story / Reels — “Vertical visual content”, ratio “9:16”; 9-Feed Grid — “Consistent campaign system”, badge “9 posts”; Product Ads — “Commercial product advertising”; Caption & Hook — “Create headline, hook, body and CTA”; Brand Kit — “Maintain brand consistency”; Prompt History — “Saved generated prompts”.

==================================================
CORE IDEA

Aplikasi ini harus memiliki workflow utama:

USER BRIEF
→ CONTEXT ANALYSIS
→ CREATIVE DIRECTION
→ VISUAL SYSTEM
→ COMPOSITION PLAN
→ TYPOGRAPHY PLAN
→ PRODUCT / SUBJECT PLACEMENT
→ LIGHTING / MATERIAL / CAMERA
→ INSTAGRAM FORMAT RULES
→ NEGATIVE CONSTRAINTS
→ FINAL PRODUCTION PROMPT
→ COPY TO CLIPBOARD
→ MANUAL GENERATION IN CHATGPT

Jangan generate image. Generate hanya teks prompt.

Setiap prompt yang dihasilkan harus sangat detail dan ditulis seolah-olah dibuat oleh senior art director, commercial graphic designer, visual designer, creative strategist, dan prompt engineer sekaligus.

Jangan menghasilkan prompt generik seperti:
“Create a beautiful Instagram post for a skincare product.”

Prompt harus menjelaskan:

subject

product

environment

visual concept

composition

hierarchy

focal point

camera angle

lens feel

depth

lighting

material

texture

color palette

typography

font character

text placement

text hierarchy

CTA placement

visual balance

negative space

background treatment

decorative objects

shadows

highlights

reflections

product scale

product orientation

brand positioning

commercial intent

emotional tone

audience

Instagram format

safe margins

visual density

realism level

rendering quality

image quality

constraints

negative prompt / avoid list

==================================================
GLOBAL PROMPT ENGINE

Ketika user mengisi brief, frontend mengirim data ke backend endpoint /api/generate-prompt.

Backend harus memanggil OpenAI-compatible chat completion endpoint:

POST https://bandelbanget.xyz/v1/chat/completions

Gunakan Authorization Bearer dari environment variable server-side, BUKAN hardcoded di client. Gunakan environment variable:

AI_API_KEY

Jangan pernah expose AI_API_KEY ke browser.
Jangan menggunakan NEXT_PUBLIC_AI_API_KEY.
Jangan menaruh API key di React component.
Jangan menaruh API key di localStorage.
Jangan menaruh API key di source code frontend.

Gunakan model:
deepseek-v4-flash

Request body:

{
"model": "deepseek-v4-flash",
"messages": [
{
"role": "system",
"content": "SYSTEM PROMPT HERE"
},
{
"role": "user",
"content": "USER BRIEF HERE"
}
],
"max_tokens": 4000,
"temperature": 0.8
}

Buat endpoint backend/serverless function yang aman di Vercel, misalnya:

/api/generate-prompt

atau gunakan struktur Next.js App Router:

app/api/generate-prompt/route.ts

Frontend hanya melakukan:

POST /api/generate-prompt

dengan JSON:

{
"mode": "feed_4_5",
"brand": "...",
"product": "...",
"headline": "...",
"offer": "...",
"audience": "...",
"style": "...",
"color": "...",
"visual_reference": "...",
"copy": "...",
"cta": "...",
"additional_notes": "..."
}

Backend validasi input, buat system prompt berdasarkan mode yang dipilih, panggil external AI endpoint, parse response, lalu mengembalikan JSON terstruktur.

Response ideal:

{
"success": true,
"mode": "feed_4_5",
"prompt": "...",
"creative_direction": "...",
"composition_notes": "...",
"typography_notes": "...",
"negative_prompt": "...",
"instagram_format": "4:5",
"generated_at": "..."
}

Apabila API gagal, jangan crash halaman. Tampilkan error state yang jelas:
“AI Engine unavailable”
serta tombol “Retry”.

Tambahkan loading state dengan animasi seperti scanning/rendering:
“Analyzing brief…”
“Building art direction…”
“Planning composition…”
“Writing production prompt…”
“Finalizing Instagram constraints…”

Jangan menggunakan fake progress yang menipu. Loading hanya untuk pengalaman visual saat request berlangsung.

==================================================
MASTER SYSTEM PROMPT UNTUK AI

Buat system prompt internal yang sangat ketat dengan konsep berikut:

“You are a senior commercial art director, Instagram creative director, brand designer, advertising designer, visual composition specialist, product photographer, typography director, and expert AI image prompt engineer.

Your job is NOT to generate an image. Your job is to transform a user's brief into an extremely detailed production-ready image generation prompt intended for a professional image generator or ChatGPT image generation workflow.

Every prompt must describe the final visual as if a professional creative studio is producing a premium commercial Instagram campaign.

Never produce vague, generic, empty or purely aesthetic descriptions.

Before writing the final prompt, internally reason about:

Campaign objective.

Target audience.

Product positioning.

Desired emotional response.

Visual hierarchy.

Primary focal point.

Secondary focal point.

Composition structure.

Negative space.

Product placement.

Typography architecture.

Color system.

Lighting.

Shadow behavior.

Material realism.

Camera perspective.

Lens feel.

Depth of field.

Texture.

Background.

Supporting objects.

Decorative elements.

CTA hierarchy.

Brand consistency.

Instagram ratio.

Safe margins.

Commercial readability.

Scroll-stopping quality.

Realistic product preservation.

Things that must NOT appear.

The result must feel like a professional creative director gave instructions to an image-generation artist.

Always prioritize:

clean visual hierarchy

strong focal point

premium art direction

commercial usability

readable typography

realistic product appearance

coherent color palette

intentional composition

controlled visual density

professional lighting

polished shadows

sophisticated spacing

brand consistency

Instagram-native composition

Do not overload the visual with random objects.
Do not create generic stock photography.
Do not use meaningless decorations.
Do not use random futuristic UI elements unless requested.
Do not distort the product.
Do not change product identity.
Do not invent an unrelated logo.
Do not create illegible typography.
Do not use excessive text.
Do not create clutter.
Do not use low-quality backgrounds.
Do not make the design look like a beginner Canva template.
Do not describe only “modern”, “beautiful”, “premium” without explaining how those qualities are achieved visually.

When the user provides text intended to appear in the visual, preserve it exactly unless the user asks for rewriting.

When typography is requested, explicitly specify:

approximate hierarchy

alignment

size relationship

weight

character

spacing

placement

contrast

line count

relationship with image

The output should always be suitable for professional commercial visual generation.”

==================================================
PROMPT OUTPUT STRUCTURE

UI jangan hanya menampilkan satu giant text box. Tampilkan hasil AI dalam beberapa sections:

FINAL PRODUCTION PROMPT

CREATIVE DIRECTION

COMPOSITION

TYPOGRAPHY & COPY

COLOR & LIGHTING

PRODUCT / SUBJECT DIRECTION

INSTAGRAM FORMAT

NEGATIVE CONSTRAINTS

Pada bagian FINAL PRODUCTION PROMPT, tampilkan satu prompt lengkap yang dapat langsung dicopy ke ChatGPT.

Tambahkan tombol:

Copy Prompt

Copy Negative Prompt

Regenerate

Edit Brief

Save Prompt

Expand

Collapse

Berikan toast setelah copy:
“Prompt copied to clipboard.”

Gunakan monospace atau readable editorial font untuk result text tetapi tetap cocok dengan visual studio.

==================================================
MENU 1 — DASHBOARD

Dashboard berfungsi sebagai overview studio.

Tampilkan:

active engine status

quick creative modes

recent prompts

latest generated prompt

usage info sederhana

shortcut buttons

Tidak perlu data akun nyata karena belum ada authentication.

==================================================
MENU 2 — FEED 1:1

Buat form khusus Instagram square feed.

Field:

Brand name

Product name

Product category

Main headline

Secondary copy

Offer / price

CTA

Target audience

Visual style

Mood

Brand colors

Background preference

Product photo description

Supporting elements

Lighting style

Typography preference

Design density

Additional instructions

Format:
1:1 square.

AI harus menghasilkan prompt untuk:

centered product hero

editorial product ad

minimal commercial layout

luxury composition

bold typography

clean promotional visual

social-commerce style

marketplace style

campaign style

UI tampilkan ratio badge 1:1.

==================================================
MENU 3 — FEED 4:5

Ini adalah mode portrait Instagram feed.

Ratio:
4:5

AI harus memperhatikan:

vertical composition

top-to-bottom visual hierarchy

safe margins

mobile feed readability

product prominence

strong first-glance hook

CTA placement

visual storytelling

typography readability

Tambahkan style presets:
Minimal Luxury
Editorial
Bold Commercial
Clean Product
Premium Beauty
Modern F&B
Fashion Campaign
Tech Product
Professional Corporate
Playful Creator

Saat style dipilih, frontend mengirim style preset sebagai structured input ke backend.

==================================================
MENU 4 — CAROUSEL

Carousel generator khusus Instagram.

User memilih:

3 slides

4 slides

5 slides

6 slides

7 slides

8 slides

9 slides

10 slides

Pilih objective:

Educational

Product

Promo

Storytelling

Testimonial

Tips

Before / After

Tutorial

News

Case Study

Listicle

Personal Branding

AI harus menghasilkan creative direction untuk keseluruhan carousel sekaligus prompt per slide.

Setiap slide harus memiliki:

purpose

hook

key information

visual concept

composition

typography

supporting element

transition logic

Pastikan slide 1 menjadi hook paling kuat.
Slide terakhir menjadi CTA yang jelas.

Tampilkan:
CAROUSEL MASTER PROMPT

kemudian:
SLIDE 01 PROMPT
SLIDE 02 PROMPT
...
SLIDE XX PROMPT

Tambahkan tombol Copy All Slides.

==================================================
MENU 5 — STORY / REELS

Format:
9:16

Mode ini ditujukan untuk Instagram Story dan cover/visual Reels.

Preset:

Story Promo

Product Launch

Flash Sale

Educational

Quote

Creator

Testimonial

Event

Product Showcase

Announcement

AI harus memikirkan:

mobile-first layout

vertical visual balance

upper safe area

lower safe area

readable headline

product placement

CTA zone

motion-friendly composition jika digunakan sebagai visual reference

visual hook dalam 1–2 detik

Hasil tetap hanya berupa IMAGE PROMPT, bukan video prompt, kecuali user memilih “Storyboard”, dalam hal itu hasil boleh mendeskripsikan sequence visual.

==================================================
MENU 6 — 9-FEED GRID

Ini adalah salah satu fitur utama.

User memberikan satu campaign brief lalu AI membuat 9 konsep feed yang terlihat konsisten ketika ditampilkan di profil Instagram.

Input:

Brand

Product

Campaign theme

Primary color

Secondary color

Typography style

Audience

Product positioning

Campaign objective

Output:
9 individual production prompts.

Gunakan role per post:

01 Hero
02 Brand Story
03 Product Feature
04 Product Detail
05 Benefit
06 Social Proof
07 Offer / Price
08 Lifestyle
09 CTA

Semua prompt harus menjaga:

same brand DNA

same palette

same typography character

same photography style

same lighting logic

same product identity

same visual universe

Tetapi jangan membuat sembilan gambar identik.

Hasil harus terasa seperti satu campaign profesional.

Tampilkan miniature text preview:
GRID 01
GRID 02
...
GRID 09

==================================================
MENU 7 — PRODUCT ADS

Fokus pada visual iklan Instagram yang commercial-grade.

Input:

Product

Problem

Benefit

Offer

Audience

USP

CTA

Campaign objective

Platform

Visual style

Presets:
Performance Ad
Luxury Product
Direct Response
E-commerce
Beauty
Food
Fashion
Tech
Automotive
Service Business

AI harus membuat prompt yang punya:

visual hook

product hero

benefit visualization

conversion-focused layout

CTA hierarchy

strong contrast

controlled text density

persuasive visual language

==================================================
MENU 8 — CAPTION & HOOK

Mode ini bukan image generation.

Generate:

10 hooks

5 headlines

3 short captions

3 longer captions

3 CTA options

10 scroll-stopping opening lines

optional hashtag suggestions

Namun jangan menghasilkan spam hashtags. Hashtag harus relevan dengan brief.

Tambahkan tone selector:
Professional
Casual
Bold
Luxury
Educational
Persuasive
Friendly
Gen-Z
Minimal
Storytelling

AI harus tetap menghasilkan copy dalam Bahasa Indonesia kecuali user memilih bahasa lain.

==================================================
MENU 9 — BRAND KIT

Brand Kit digunakan untuk menjaga konsistensi prompt.

Field:

Brand name

Brand description

Industry

Target audience

Brand personality

Primary color

Secondary color

Accent color

Preferred typography

Visual style

Photography style

Lighting style

Background style

Product positioning

Words to use

Words to avoid

CTA language

Visual references

Tampilkan brand summary card.

Sediakan tombol:
Save Brand Kit
Update Brand Kit
Use in all prompts
Reset

Simpan untuk versi awal menggunakan localStorage jika belum ada database authentication.

Semua engine harus dapat membaca Brand Kit yang aktif.

==================================================
MENU 10 — PROMPT HISTORY

Simpan prompt yang pernah dibuat pada browser/localStorage terlebih dahulu.

Setiap item berisi:

date

mode

title

short brief

prompt

ratio

style

Action:

Open

Copy

Delete

Duplicate

Gunakan localStorage agar tidak membutuhkan database untuk MVP.

==================================================
VISUAL DESIGN SYSTEM

Design tokens:

Background:
#080204
#0C0305
#100507

Panel:
#130607
#17080A
#1B090B

Accent:
#FF4F55
#FF6267
#F23F48

Dark accent:
#4D0B10
#681016

Text:
#FFF3F3
#F4DCDD
#CBAEB0
#927476

Border:
rgba(255, 80, 85, 0.15)
rgba(255, 80, 85, 0.25)

Glow:
red/coral subtle glow only, not excessive neon.

Use a subtle background grid:
horizontal + vertical lines with very low opacity.

Use small uppercase mono labels such as:
ENGINE
FORMAT
STATUS
CREATIVE MODE
RATIO
READY
PROMPT

Typography:
Large headings should be bold, heavy, modern grotesk.
Body text clean and readable.
Labels may use monospace / technical style.
Use a visual hierarchy similar to premium creative software.

Avoid:

generic Bootstrap dashboard

blue gradients

white cards

over-rounded everything

excessive shadows

excessive glassmorphism

childish illustrations

emoji-heavy UI

==================================================
MAIN WORKSPACE STRUCTURE

For generator pages use:

LEFT / CENTER:
Input form

RIGHT:
Live prompt result

Desktop:
40% input
60% result

At top of generator:
small breadcrumb
mode badge
main heading
description

Input section cards:
Brief
Brand
Visual Direction
Typography
Format
Advanced Controls

Result section:
AI status
generation time
prompt sections
copy actions

Make result panel sticky on desktop so user can see it while scrolling form.

==================================================
FORM COMPONENTS

Use premium dark input fields.

Text input:
background #0F0507
border #3A1114
focus border coral
focus glow subtle

Select:
dark dropdown
red active states

Textarea:
minimum height 120px
comfortable padding

Color selector:
small color swatches
HEX input

Preset chip:
dark pill with subtle red border
selected chip gets red glow/background

Toggle:
dark with red active indicator.

==================================================
PROMPT GENERATION EXPERIENCE

When user clicks “Generate Prompt”:

Button changes to:
“BUILDING PROMPT…”

Then show small staged status animation:

ANALYZING BRIEF
BUILDING CREATIVE DIRECTION
PLANNING COMPOSITION
DESIGNING TYPOGRAPHY
OPTIMIZING INSTAGRAM FORMAT
FINALIZING PROMPT

After success:
status:
PROMPT READY

Show result.

Make result visually impressive, like an AI creative laboratory.

==================================================
BACKEND ARCHITECTURE

Use Next.js App Router and TypeScript.

Recommended folders:

app/
page.tsx
dashboard/
feed-square/
feed-portrait/
carousel/
stories/
grid-9/
ads/
captions/
brand-kit/
history/
api/
generate-prompt/
route.ts

components/
layout/
Sidebar.tsx
Topbar.tsx
studio/
BriefForm.tsx
PromptResult.tsx
PromptSection.tsx
CreativePreset.tsx
RatioSelector.tsx
BrandKitForm.tsx
ui/

lib/
ai/
client.ts
prompt-builder.ts
engine.ts
storage/
local-storage.ts
utils/

types/
prompt.ts
brand.ts
generator.ts

Keep business logic separate from UI.

Create engine configurations rather than hardcoding every mode independently.

Example conceptual structure:

const ENGINES = {
feed_square: {...},
feed_portrait: {...},
carousel: {...},
stories: {...},
grid_9: {...},
product_ads: {...},
caption_hook: {...}
}

Each engine defines:

name

objective

ratio

fields

systemInstruction

outputSections

==================================================
Vercel DEPLOYMENT

Project must be compatible with Vercel.

Use environment variable:

AI_API_KEY

Optional:
AI_BASE_URL=https://bandelbanget.xyz/v1
AI_MODEL=deepseek-v4-flash

Backend route uses:

process.env.AI_API_KEY

Do not access secret from browser.

The final project must run with:
npm install
npm run build
npm run start

and deploy cleanly to Vercel.

Use fetch from server-side route.

Example server implementation concept:

const response = await fetch(
${process.env.AI_BASE_URL ?? "https://bandelbanget.xyz/v1"}/chat/completions,
{
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": Bearer ${process.env.AI_API_KEY}
},
body: JSON.stringify({
model: process.env.AI_MODEL ?? "deepseek-v4-flash",
messages,
max_tokens: 4000,
temperature: 0.8
})
}
);

Check response.ok.
Handle timeout.
Handle malformed response.
Return friendly error to client.
Never return the API key.
Never log the API key.

==================================================
SECURITY

Even though authentication is intentionally disabled in this MVP, keep the architecture ready for authentication later.

Implement:

server-side API proxy

input length limits

basic request validation

no secrets in client

no sensitive logs

no API key in browser

graceful upstream failure

request timeout

Do not expose the external AI provider directly to the user browser.

==================================================
NO DATABASE FOR MVP

For the first version do NOT require Supabase, Firebase, MongoDB, PostgreSQL or other database.

Use:

React state

localStorage for Brand Kit

localStorage for Prompt History

Keep database integration optional for future version.

==================================================
NO IMAGE GENERATION

This is very important:

DO NOT BUILD:

image generation API

image editing API

image rendering API

AI image pipeline

DALL-E integration

Midjourney integration

Flux integration

Stability AI integration

Gemini image generation

The AI text API is used ONLY to generate textual prompts.

The workflow is:

User fills brief
→ backend sends brief to deepseek-v4-flash
→ AI returns professional prompt
→ app displays prompt
→ user clicks COPY
→ user pastes prompt into ChatGPT manually
→ ChatGPT generates image manually outside this app

==================================================
COPY QUALITY

Final prompts must be very comprehensive.

Example expected style:

“Create a premium commercial Instagram portrait advertisement in 4:5 format for [PRODUCT]. The primary visual objective is to communicate [OBJECTIVE] while making the product immediately recognizable within the first second of viewing. Place the product as the dominant hero element positioned slightly above the visual center, with a carefully controlled three-quarter perspective and realistic material response. Build an editorial commercial composition with intentional negative space for headline placement...”

Then continue with detailed art direction including composition, lighting, surface, atmosphere, typography, CTA, shadows, visual hierarchy, camera feel, product fidelity, realistic materials, background, color, framing, safe margins, mobile readability, and negative constraints.

Do NOT constrain the prompt to a fixed short length. Prefer completeness and precision over brevity.

==================================================
USER EXPERIENCE

The app should feel fast and sophisticated.

Use transitions:

sidebar active transition

card hover

button hover

prompt generation state

result reveal

toast

modal transitions

Do not use excessive animation.

Use subtle scale 1.01 hover.
Use subtle red glow on active elements.
Use 150–250ms transitions.

==================================================
RESPONSIVE

Desktop:
sidebar fixed
workspace two-column

Tablet:
sidebar collapsible
workspace one column if needed

Mobile:
sidebar becomes drawer
topbar compact
forms stacked
result below form
buttons full width where appropriate

The generator must remain usable on a phone.

==================================================
DEFAULT DEMO DATA

Populate dashboard with believable sample data purely for UI demonstration, for example:

Brand:
AuraSkin

Product:
Daily Defense Sunscreen SPF 50+

Headline:
Protect Your Skin Every Day

Style:
Premium Clinical Beauty

Colors:
Soft Ivory, Aqua Teal, Sage Green

Audience:
Young professional women 20–35

Do not claim the demo data belongs to a real customer.

==================================================
FIRST BUILD PRIORITY

Build the MVP in this exact order:

App shell

Sidebar

Topbar

Dashboard

Feed 4:5 generator

Backend /api/generate-prompt

AI integration

Prompt result UI

Copy button

Feed 1:1

Carousel

Story / Reels

9-Feed Grid

Product Ads

Caption & Hook

Brand Kit

Prompt History

Responsive optimization

Error handling

Vercel deployment readiness

Do not spend time building the public marketing site.

==================================================
IMPORTANT FINAL REQUIREMENT

The final result should NOT look like a generic admin dashboard.

It should feel like a real AI Creative Director Workspace for Instagram, combining the visual sophistication of a premium design studio with the functional clarity of modern creative software.

The visual identity should strongly follow the uploaded references:

dark maroon/black background

red/coral accent

large bold editorial typography

thin red borders

subtle grid

soft red glow

premium rounded cards

technical mono labels

polished creative-software aesthetic

But adapt it into an INTERNAL WORKSPACE instead of a marketing landing page.

No public homepage.
No login.
No registration.
No pricing.
No payment.
No public navigation.
No hero marketing section.

Open directly into the studio.

The central objective of this MVP is simple:

USER BRIEF → AI CREATIVE DIRECTION → PROFESSIONAL INSTAGRAM IMAGE PROMPT → COPY → MANUAL GENERATION IN CHATGPT

Make the application production-quality, cleanly structured, TypeScript-safe, Vercel-compatible, and easy to extend later with authentication, billing, database, image generation and user accounts.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2fc664ef-021a-45e8-8194-dfa5483640dd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
