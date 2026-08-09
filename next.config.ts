import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const config: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default createMDX()(config);
