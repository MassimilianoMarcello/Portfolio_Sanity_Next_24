// lib/challengeId.ts
// Unica fonte per l'id dell'ancora di una challenge: la usano sia la card in
// home (link "Key challenges") sia la pagina del progetto (id dell'elemento
// e sidebar). Prima i due lati costruivano l'id in modo diverso e non
// combaciavano mai.

type SlugLike = string | { current?: string } | null | undefined;

type ChallengeLike = {
  title?: string;
  slug?: SlugLike;
};

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Ordine di preferenza: slug di Sanity, poi titolo ripulito, poi la posizione.
 * La posizione evita id duplicati o vuoti quando slug e titolo mancano.
 */
export function challengeId(challenge: ChallengeLike, index: number): string {
  const slug =
    typeof challenge.slug === "string" ? challenge.slug : challenge.slug?.current;

  const base = slug || (challenge.title ? slugify(challenge.title) : "");

  return `challenge-${base || index + 1}`;
}
