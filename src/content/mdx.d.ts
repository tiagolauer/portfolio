declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { PostMeta } from '@/content/posts';

  export const meta: PostMeta;

  const MDXContent: ComponentType;
  export default MDXContent;
}
