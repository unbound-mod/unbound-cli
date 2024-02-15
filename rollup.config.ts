import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.ts',

    output: [
        {
            file: 'dist/bundle.js',
            format: 'esm',
            inlineDynamicImports: true,
            strict: true,
        }
    ],

    plugins: [
        commonJS(),
        json(),
        esbuild({ target: 'ES2022' }),
        nodeResolve(),
        {
            name: 'navigator',
            async transform(code) {
                return `var navigator = { userAgent: 'Chrome/' }; ${code}`;
            }
        },
        {
            name: 'shebang',
            async transform(code) {
                return `#!/usr/bin/env node\n${code}`;
            }
        }
    ],

    onwarn(warning, warn) {
        if (['MISSING_NAME_OPTION_FOR_IIFE_EXPORT', 'CIRCULAR_DEPENDENCY', 'PLUGIN_WARNING'].includes(warning.code!)) return;
        warn(warning);
    }
});