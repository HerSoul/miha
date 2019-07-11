import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
export const config: Config = {
  namespace: 'miha',
  globalScript:'./src/globals/script/index.ts',
  plugins:[sass({
    injectGlobalPaths:['./src/globals/vars/index']
  })],
  copy: [{ src: '**/*.scss' }],
  enableCache:false,
  preamble:"web components",
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    }
  ]
};
