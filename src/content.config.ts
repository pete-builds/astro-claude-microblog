import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const SAFE_SCHEMES = ['http:', 'https:', 'mailto:'];

/** Allow relative URLs and http(s)/mailto; reject javascript:, data:, and friends. */
function isSafeUrl(value: string): boolean {
  const raw = value.trim();
  if (raw === '') return true;
  if (raw.startsWith('/') || raw.startsWith('#') || raw.startsWith('?')) return true;
  try {
    return SAFE_SCHEMES.includes(new URL(raw, 'https://example.invalid/').protocol);
  } catch {
    return false;
  }
}

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    tags: z.array(z.string()).optional(),
    // Scheme-checked rather than bare strings: both of these land directly in an
    // href/src, and Astro escapes the attribute value without restricting the
    // scheme -- so `link: "javascript:alert(1)"` validated cleanly and rendered as
    // a live anchor. Relative and root-relative values are still allowed.
    link: z.string().refine(isSafeUrl, {
      message: 'link must be relative or use http/https/mailto',
    }).optional(),
    image: z.string().refine(isSafeUrl, {
      message: 'image must be relative or use http/https',
    }).optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { posts };
