export const business = {
  name: "Squeaky T’s Pressure Cleaning Service",
  shortName: "Squeaky T’s",
  ownerPublicName: "Terez S.",
  phoneDisplay: "(803) 554-0377",
  phoneHref: "tel:+18035540377",
  market: "Charlotte, North Carolina",
  serviceArea: "Charlotte and surrounding communities",
  primaryCta: "Get a Free Estimate",
  instagram: "https://www.instagram.com/squeaky.ts/",
  currentSite: "https://www.squeakytspressurecleaning.pro/",
} as const;

export type SurfaceKey = "siding" | "concrete" | "wood" | "fence" | "pavers" | "commercial";

export const surfaces: Record<SurfaceKey, {
  label: string;
  eyebrow: string;
  method: string;
  protection: string;
  footage: string;
  image: string;
  imageAlt: string;
}> = {
  siding: {
    label: "Siding",
    eyebrow: "House / soft wash",
    method: "A lower-pressure application and thorough rinse suited to exterior siding.",
    protection: "Windows, vents, fixtures, landscaping, and delicate edges are checked before work starts.",
    footage: "Full-wall rinse",
    image: "/media/work-house-wash.jpg",
    imageAlt: "House exterior being carefully washed",
  },
  concrete: {
    label: "Concrete",
    eyebrow: "Pressure wash",
    method: "A pressure process suited to driveways, walks, and hard flatwork.",
    protection: "Edges, nearby doors, vehicles, drainage, and runoff paths are checked during the walk-through.",
    footage: "Clean concrete pass",
    image: "/media/work-driveway-wide.jpg",
    imageAlt: "Driveway receiving an even pressure-cleaning pass",
  },
  wood: {
    label: "Deck wood",
    eyebrow: "Controlled cleaning",
    method: "A gentler plan matched to the wood, coating, condition, and grain direction.",
    protection: "Loose boards, aging stain, furniture, outlets, and nearby planting get extra attention.",
    footage: "Board-by-board rinse",
    image: "/media/work-deck.jpg",
    imageAlt: "Deck being cleaned board by board",
  },
  fence: {
    label: "Fences",
    eyebrow: "Material-first wash",
    method: "Pressure and chemistry chosen around vinyl, painted, or bare-wood fencing.",
    protection: "Gate hardware, finishes, nearby beds, and the property line are checked before cleaning.",
    footage: "Panel-by-panel wash",
    image: "/media/work-house-finish.jpg",
    imageAlt: "A freshly cleaned exterior beside a finished fence and porch",
  },
  pavers: {
    label: "Pavers",
    eyebrow: "Even surface pass",
    method: "An even cleaning pattern designed around joints, setting material, and surface condition.",
    protection: "Joint stability, drainage, adjacent walls, and fragile borders shape the cleaning plan.",
    footage: "Even paver pass",
    image: "/media/work-brick.jpg",
    imageAlt: "Brick and paver surfaces being pressure cleaned",
  },
  commercial: {
    label: "Commercial",
    eyebrow: "Property walkthrough",
    method: "A scope-led plan for storefronts, entries, walks, and exterior surfaces.",
    protection: "Access, foot traffic, signage, neighboring units, and safe work zones are agreed first.",
    footage: "Entry reset",
    image: "/media/work-commercial-stairs.jpg",
    imageAlt: "Commercial stairs and entry being pressure cleaned",
  },
};
