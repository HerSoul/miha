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
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      copy:[{ src: '**/*.html' },{ src: '**/*.css' }],
      serviceWorker: null // disable service workers
    }
  ]
};
