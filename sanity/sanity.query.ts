import { groq } from "next-sanity";
import client from "./sanity.client";
import { Project } from "@/types/projects";
import { TestProject } from "@/types/TestProject";
import { Post } from "@/types/blog";

export async function getProjects(): Promise<Project[]> {
  const projects = await client.fetch(
    groq`*[_type == "project"]{
      name,
      _id,
      _key,
      "technologies": technologies[]-> {
        _id,
        name,
        icon
      },
      importance,
      _createdAt,
      _updatedAt,
      _type,
      url,
      githubUrl,
      "slug": slug.current,
      content,
      'image': image.asset->url,
      'imageAlt': image.alt,
      status,
      "challenges": challenges[]-> {
        _id,
        title,
        "slug": slug.current,
        content,
        description,
        solution
      }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
  return projects;
}

export async function getProject(slug: string): Promise<Project> {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      author->,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content,
      importance,
      githubUrl,
      "technologies": technologies[]-> {
        _id,
        name,
        icon
      },
      "challenges": challenges[]-> {
        _id,
        title,
        "slug": slug.current,
        content,
        description,
        solution
      }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getTestProject(): Promise<TestProject[]> {
  return client.fetch(
    groq`*[_type == "testproject"]{
      _id,
      name,
      description,
      date,
      importance,
      "technologies": technologies[]-> {
        _id,
        name,
        icon
      }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

// ─── Blog ──────────────────────────────────────────────────────────────────────

// Lista post — ordinati per data, senza il content completo per performance
export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "coverImage": {
        "url": coverImage.asset->url,
        "alt": coverImage.alt,
        "caption": coverImage.caption
      },
      "tags": tags[]-> {
        _id,
        title,
        "slug": slug.current
      }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

// Singolo post — con content completo incluse immagini e codice
export async function getPost(slug: string): Promise<Post> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "coverImage": {
        "url": coverImage.asset->url,
        "alt": coverImage.alt,
        "caption": coverImage.caption
      },
      "tags": tags[]-> {
        _id,
        title,
        "slug": slug.current
      },
      content[]{
        ...,
        // Risolve le immagini inline nel PortableText
        _type == "image" => {
          ...,
          "url": asset->url,
          "alt": alt,
          "caption": caption
        }
      }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}