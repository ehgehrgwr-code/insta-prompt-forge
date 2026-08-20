export type FieldType = "text" | "textarea" | "select" | "chips" | "color";

export interface EngineField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  group: string;
  required?: boolean;
  defaultValue?: string;
}

export interface EngineConfig {
  id: string;
  name: string;
  path: string;
  short: string;
  description: string;
  objective: string;
  ratio: string;
  badge: string;
  outputSections: string[];
  fields: EngineField[];
}

const BASE_BRIEF: EngineField[] = [
  {
    name: "brand",
    label: "Brand name",
    type: "text",
    group: "Brief",
    placeholder: "AuraSkin",
    required: true,
  },
  {
    name: "product",
    label: "Product / subject",
    type: "text",
    group: "Brief",
    placeholder: "Daily Defense Sunscreen SPF 50+",
    required: true,
  },
  {
    name: "category",
    label: "Product category",
    type: "text",
    group: "Brief",
    placeholder: "Skincare / Sun protection",
  },
  {
    name: "headline",
    label: "Main headline",
    type: "text",
    group: "Brief",
    placeholder: "Protect Your Skin Every Day",
  },
  {
    name: "copy",
    label: "Secondary copy",
    type: "text",
    group: "Brief",
    placeholder: "Lightweight. Non-greasy. Reef safe.",
  },
  {
    name: "offer",
    label: "Offer / price",
    type: "text",
    group: "Brief",
    placeholder: "Launch price Rp 129.000",
  },
  {
    name: "cta",
    label: "Call to action",
    type: "text",
    group: "Brief",
    placeholder: "Shop now",
  },
  {
    name: "audience",
    label: "Target audience",
    type: "text",
    group: "Brand",
    placeholder: "Young professional women 20–35",
  },
];

const VISUAL_FIELDS: EngineField[] = [
  {
    name: "color",
    label: "Brand colors",
    type: "text",
    group: "Visual Direction",
    placeholder: "Soft ivory, aqua teal, sage green",
  },
  {
    name: "background",
    label: "Background preference",
    type: "text",
    group: "Visual Direction",
    placeholder: "Seamless ivory studio backdrop with soft gradient",
  },
  {
    name: "product_photo",
    label: "Product appearance",
    type: "textarea",
    group: "Visual Direction",
    placeholder: "Frosted white tube, teal cap, matte finish, 50ml",
  },
  {
    name: "supporting",
    label: "Supporting elements",
    type: "text",
    group: "Visual Direction",
    placeholder: "Water droplets, sculptural podium, soft leaf shadow",
  },
  {
    name: "lighting",
    label: "Lighting style",
    type: "select",
    group: "Visual Direction",
    options: [
      "Soft diffused studio",
      "Hard directional sunlight",
      "Golden hour warm",
      "Clinical bright",
      "Moody low-key",
      "Editorial rim light",
      "Gradient color wash",
    ],
  },
  {
    name: "typography",
    label: "Typography preference",
    type: "select",
    group: "Typography",
    options: [
      "Modern grotesk bold",
      "High-contrast editorial serif",
      "Minimal light sans",
      "Condensed commercial",
      "Luxury spaced serif",
      "Technical mono accents",
    ],
  },
  {
    name: "density",
    label: "Design density",
    type: "select",
    group: "Typography",
    options: ["Minimal", "Balanced", "Information rich"],
  },
  {
    name: "additional_notes",
    label: "Additional instructions",
    type: "textarea",
    group: "Advanced Controls",
    placeholder: "Anything the art director must respect or avoid…",
  },
];

const STYLE_PRESETS = [
  "Minimal Luxury",
  "Editorial",
  "Bold Commercial",
  "Clean Product",
  "Premium Beauty",
  "Modern F&B",
  "Fashion Campaign",
  "Tech Product",
  "Professional Corporate",
  "Playful Creator",
];

const styleField = (options = STYLE_PRESETS): EngineField => ({
  name: "style",
  label: "Visual style preset",
  type: "chips",
  group: "Visual Direction",
  options,
});

const moodField: EngineField = {
  name: "mood",
  label: "Mood",
  type: "text",
  group: "Visual Direction",
  placeholder: "Calm, clinical, confident",
};

export const ENGINES: Record<string, EngineConfig> = {
  feed_square: {
    id: "feed_square",
    name: "Feed 1:1",
    path: "/feed-square",
    short: "Square feed visual",
    description:
      "Centered product hero, editorial commercial layout and clean promotional typography for a square Instagram feed post.",
    objective: "Square Instagram feed post that stops the scroll instantly.",
    ratio: "1:1",
    badge: "1:1",
    outputSections: [
      "FINAL PRODUCTION PROMPT",
      "CREATIVE DIRECTION",
      "COMPOSITION",
      "TYPOGRAPHY & COPY",
      "COLOR & LIGHTING",
      "PRODUCT / SUBJECT DIRECTION",
      "INSTAGRAM FORMAT",
      "NEGATIVE CONSTRAINTS",
    ],
    fields: [...BASE_BRIEF, styleField(), moodField, ...VISUAL_FIELDS],
  },
  feed_portrait: {
    id: "feed_portrait",
    name: "Feed 4:5",
    path: "/feed-portrait",
    short: "Portrait feed visual",
    description:
      "Vertical 4:5 feed visual engineered for mobile readability, top-to-bottom hierarchy and a strong first-glance hook.",
    objective:
      "Portrait Instagram feed post with vertical hierarchy and maximum mobile impact.",
    ratio: "4:5",
    badge: "4:5",
    outputSections: [
      "FINAL PRODUCTION PROMPT",
      "CREATIVE DIRECTION",
      "COMPOSITION",
      "TYPOGRAPHY & COPY",
      "COLOR & LIGHTING",
      "PRODUCT / SUBJECT DIRECTION",
      "INSTAGRAM FORMAT",
      "NEGATIVE CONSTRAINTS",
    ],
    fields: [...BASE_BRIEF, styleField(), moodField, ...VISUAL_FIELDS],
  },
  carousel: {
    id: "carousel",
    name: "Carousel",
    path: "/carousel",
    short: "Multi-slide visual sequence",
    description:
      "A master creative direction plus one production prompt per slide, with a hook-first slide 01 and a CTA closer.",
    objective: "Instagram carousel sequence with narrative continuity.",
    ratio: "4:5",
    badge: "3–10 slides",
    outputSections: [
      "CAROUSEL MASTER PROMPT",
      "CREATIVE DIRECTION",
      "SLIDE PROMPTS",
      "TYPOGRAPHY & COPY",
      "COLOR & LIGHTING",
      "INSTAGRAM FORMAT",
      "NEGATIVE CONSTRAINTS",
    ],
    fields: [
      ...BASE_BRIEF,
      {
        name: "slides",
        label: "Slide count",
        type: "chips",
        group: "Format",
        options: ["3", "4", "5", "6", "7", "8", "9", "10"],
        defaultValue: "5",
      },
      {
        name: "objective_type",
        label: "Carousel objective",
        type: "chips",
        group: "Format",
        options: [
          "Educational",
          "Product",
          "Promo",
          "Storytelling",
          "Testimonial",
          "Tips",
          "Before / After",
          "Tutorial",
          "News",
          "Case Study",
          "Listicle",
          "Personal Branding",
        ],
      },
      styleField(),
      moodField,
      ...VISUAL_FIELDS,
    ],
  },
  stories: {
    id: "stories",
    name: "Story / Reels",
    path: "/stories",
    short: "Vertical visual content",
    description:
      "9:16 vertical visual built around safe areas, a 1-second hook and a clear CTA zone for Stories or Reels covers.",
    objective: "Vertical 9:16 Instagram Story / Reels cover visual.",
    ratio: "9:16",
    badge: "9:16",
    outputSections: [
      "FINAL PRODUCTION PROMPT",
      "CREATIVE DIRECTION",
      "COMPOSITION",
      "TYPOGRAPHY & COPY",
      "COLOR & LIGHTING",
      "PRODUCT / SUBJECT DIRECTION",
      "INSTAGRAM FORMAT",
      "NEGATIVE CONSTRAINTS",
    ],
    fields: [
      ...BASE_BRIEF,
      {
        name: "preset",
        label: "Story preset",
        type: "chips",
        group: "Format",
        options: [
          "Story Promo",
          "Product Launch",
          "Flash Sale",
          "Educational",
          "Quote",
          "Creator",
          "Testimonial",
          "Event",
          "Product Showcase",
          "Announcement",
          "Storyboard",
        ],
      },
      styleField(),
      moodField,
      ...VISUAL_FIELDS,
    ],
  },
  grid_9: {
    id: "grid_9",
    name: "9-Feed Grid",
    path: "/grid-9",
    short: "Consistent campaign system",
    description:
      "Nine production prompts that share one brand DNA, palette, typography and photography logic across the profile grid.",
    objective: "Nine-post Instagram grid campaign with one visual universe.",
    ratio: "1:1",
    badge: "9 posts",
    outputSections: [
      "CAMPAIGN MASTER PROMPT",
      "CREATIVE DIRECTION",
      "GRID PROMPTS",
      "TYPOGRAPHY & COPY",
      "COLOR & LIGHTING",
      "INSTAGRAM FORMAT",
      "NEGATIVE CONSTRAINTS",
    ],
    fields: [
      ...BASE_BRIEF,
      {
        name: "campaign_theme",
        label: "Campaign theme",
        type: "text",
        group: "Brief",
        placeholder: "Everyday Sun Ritual",
      },
      {
        name: "positioning",
        label: "Product positioning",
        type: "text",
        group: "Brand",
        placeholder: "Dermatologist-grade daily protection, accessible price",
      },
      styleField(),
      moodField,
      ...VISUAL_FIELDS,
    ],
  },
  product_ads: {
    id: "product_ads",
    name: "Product Ads",
    path: "/ads",
    short: "Commercial product advertising",
    description:
      "Conversion-focused ad visual with a visual hook, product hero, benefit visualization and CTA hierarchy.",
    objective: "Commercial-grade Instagram product advertisement.",
    ratio: "4:5",
    badge: "AD",
    outputSections: [
      "FINAL PRODUCTION PROMPT",
      "CREATIVE DIRECTION",
      "COMPOSITION",
      "TYPOGRAPHY & COPY",
      "COLOR & LIGHTING",
      "PRODUCT / SUBJECT DIRECTION",
      "INSTAGRAM FORMAT",
      "NEGATIVE CONSTRAINTS",
    ],
    fields: [
      ...BASE_BRIEF,
      {
        name: "problem",
        label: "Problem",
        type: "text",
        group: "Brief",
        placeholder: "Sunscreen feels heavy and leaves white cast",
      },
      {
        name: "benefit",
        label: "Main benefit",
        type: "text",
        group: "Brief",
        placeholder: "Invisible finish, all-day protection",
      },
      {
        name: "usp",
        label: "USP",
        type: "text",
        group: "Brief",
        placeholder: "SPF 50+ PA++++ with zero white cast",
      },
      {
        name: "campaign_objective",
        label: "Campaign objective",
        type: "select",
        group: "Format",
        options: [
          "Conversion / sales",
          "Traffic",
          "Awareness",
          "Lead generation",
          "Retargeting",
        ],
      },
      styleField([
        "Performance Ad",
        "Luxury Product",
        "Direct Response",
        "E-commerce",
        "Beauty",
        "Food",
        "Fashion",
        "Tech",
        "Automotive",
        "Service Business",
      ]),
      moodField,
      ...VISUAL_FIELDS,
    ],
  },
  caption_hook: {
    id: "caption_hook",
    name: "Caption & Hook",
    path: "/captions",
    short: "Create headline, hook, body and CTA",
    description:
      "Scroll-stopping hooks, headlines, short and long captions, CTA options and relevant hashtags — copy only, no image prompt.",
    objective: "Instagram copywriting set: hooks, headlines, captions, CTA.",
    ratio: "COPY",
    badge: "COPY",
    outputSections: [
      "HOOKS",
      "HEADLINES",
      "SHORT CAPTIONS",
      "LONG CAPTIONS",
      "CTA OPTIONS",
      "OPENING LINES",
      "HASHTAGS",
    ],
    fields: [
      ...BASE_BRIEF.filter((f) => f.name !== "copy"),
      {
        name: "tone",
        label: "Tone of voice",
        type: "chips",
        group: "Brand",
        options: [
          "Professional",
          "Casual",
          "Bold",
          "Luxury",
          "Educational",
          "Persuasive",
          "Friendly",
          "Gen-Z",
          "Minimal",
          "Storytelling",
        ],
      },
      {
        name: "language",
        label: "Language",
        type: "select",
        group: "Brand",
        options: ["Bahasa Indonesia", "English", "Mixed ID/EN"],
        defaultValue: "Bahasa Indonesia",
      },
      {
        name: "additional_notes",
        label: "Additional instructions",
        type: "textarea",
        group: "Advanced Controls",
        placeholder: "Angle, promo detail, restrictions…",
      },
    ],
  },
};

export const ENGINE_LIST = Object.values(ENGINES);

export const DEMO_BRIEF: Record<string, string> = {
  brand: "AuraSkin",
  product: "Daily Defense Sunscreen SPF 50+",
  category: "Skincare / Sun protection",
  headline: "Protect Your Skin Every Day",
  copy: "Lightweight, invisible finish, reef safe",
  offer: "Launch price Rp 129.000",
  cta: "Shop now",
  audience: "Young professional women 20–35",
  style: "Premium Beauty",
  mood: "Calm, clinical, confident",
  color: "Soft ivory, aqua teal, sage green",
  background: "Seamless ivory studio backdrop with soft gradient falloff",
  product_photo:
    "Frosted white 50ml tube with aqua teal cap, matte soft-touch finish, minimal typographic label",
  supporting: "Sculptural stone podium, water droplets, soft leaf shadow",
  lighting: "Soft diffused studio",
  typography: "Modern grotesk bold",
  density: "Balanced",
};
