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
        // Workaround for it (strangely) adding browser code even though this is a NodeJS package.
        // If this does not run, the bundle will not run, because navigator does not exist in the NodeJS context.
        {
            name: 'navigator',
            async transform(code) {
                return `var navigator = { userAgent: 'Chrome/' }; ${code}`;
            }
        },

        // Add the NodeJS shebang to the top of the file.
        // This should run at the very end of the plugins array.
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