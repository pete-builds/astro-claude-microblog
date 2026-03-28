import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    date: z.string(),
    text: z.string(),
    tags: z.array(z.string()).optional(),
    link: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { posts };
