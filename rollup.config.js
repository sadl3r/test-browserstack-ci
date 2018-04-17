import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'libtestci'
    },
    plugins: [
      resolve(),
      commonjs(),
      eslint({ exclude: ['dist/**'] }),
      babel({ exclude: ['node_modules/**'], plugins: ['external-helpers'] }),
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have thr   ee entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/main.js',
    external: [],
    output: [{
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }],
    plugins: [
      babel({ exclude: ['node_modules/**'] })
    ]
  }
];
