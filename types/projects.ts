import { PortableTextBlock } from '@portabletext/react';

export interface Technology {
    _id: string;
    name: string;
    slug: string;
  
  }
  export interface Challenge {
    _id: string;
    title: string;
    description: string;
    solution: string;
    slug: { current: string }; 
  
    content: PortableTextBlock[];
  }
export type Project = {
  _id: string;
  _key: string;
  _type: string;
  technologies: Technology[]; 
  _createdAt: Date;
  _updatedAt: Date; 
  name: string;
  slug: {current:string};
  image: string;
  imageAlt: string;
  status: string;
  importance: string;
url: string;
  content: PortableTextBlock[];
  githubUrl: string;
  challenges?: Challenge[];
};
