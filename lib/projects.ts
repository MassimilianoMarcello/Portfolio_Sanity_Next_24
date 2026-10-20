// lib/projects.ts — helper puri per normalizzare i dati dei progetti (Sanity)
import { urlFor } from "@/sanity/sanity.client";
import type { Project } from "@/types/projects";

export type ProjectStatus = "live" | "wip" | "archived";

type SlugLike = string | { current?: string } | null | undefined;

/** Accetta sia `slug: "abc"` sia `slug: { current: "abc" }`. */
export const resolveSlug = (slug: SlugLike): string =>
  typeof slug === "string" ? slug : slug?.current ?? "";

/** Riduce le varianti del CMS ("wip", "In Progress", …) a tre stati. Sconosciuto/assente → null (nessuna pill). */
export function normalizeStatus(raw?: string | null): ProjectStatus | null {
  switch (raw?.trim().toLowerCase()) {
    case "live":
      return "live";
    case "wip":
    case "in progress":
      return "wip";
    case "archived":
      return "archived";
    default:
      return null;
  }
}

/** Hostname per la barra del browser; non lancia mai su URL malformati. */
export function getHostname(url: string | null | undefined, name: string): string {
  if (url) {
    try {
      return new URL(url).hostname;
    } catch {
      /* URL non valido: si usa il fallback */
    }
  }
  return `${name.toLowerCase().replace(/\s+/g, "")}.dev`;
}

/** URL immagine Sanity; null se il record è incompleto o malformato. */
export function getImageUrl(image: Project["image"] | null | undefined, width = 1200): string | null {
  if (!image) return null;
  try {
    return urlFor(image).width(width).url();
  } catch {
    return null;
  }
}
