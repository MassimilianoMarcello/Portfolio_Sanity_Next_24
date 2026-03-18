import { PortableTextBlock } from '@portabletext/react';

export interface Tag {
  _id:   string;
  title: string;
  slug:  { current: string };
}

export interface PostImage {
  _type:   'image';
  asset:   { _ref: string; _type: 'reference' };
  alt:     string;
  caption?: string;
}

export interface Post {
  _id:          string;
  _createdAt:   string;
  title:        string;
  slug:         { current: string };
  publishedAt?: string;
  excerpt?:     string;
  coverImage?:  PostImage & { url: string };
  tags?:        Tag[];
  // PortableText con blocchi custom (image, code) mescolati ai blocchi testo
  content:      PortableTextBlock[];
}