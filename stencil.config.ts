import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'miha',
  globalScript:'./src/globals/script/index.ts',
  globalStyle:'./src/globals/styles/index.scss',
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
      serviceWorker: null // disable service workers
    }
  ]
};
