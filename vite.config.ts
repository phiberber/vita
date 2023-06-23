/// <reference types="vavite/vite-config" />

import { defineConfig } from 'vite'
import { callRemoval } from './src/shared/utilities/vite/call-removal'
import inspect from 'vite-plugin-inspect'
import uno from 'unocss/vite'
import preact from '@preact/preset-vite'
import ssr from 'vite-plugin-ssr/plugin'
import vavite from 'vavite'
import * as Url from 'node:url'
import { componentAutoRef } from './src/shared/utilities/vite/component-auto-ref'

const usingBun = process.env.TARGET === 'bun'
const __dirname = Url.fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    root: 'src',

    build: {
        emptyOutDir: true,
        outDir: '../dist'
    },

    resolve: {
        alias: {
            react: 'preact/compat',
            'react-dom': 'preact/compat',
            '#': __dirname
        }
    },

    buildSteps: [
        { name: 'client' },
        {
            name: 'server',
            config: {
                build: { ssr: true }
            }
        }
    ],

    plugins: [
        vavite(
            usingBun
                ? { serverEntry: '/server/entry/bun.ts' }
                : {
                      handlerEntry: '/server/entry/node.ts',
                      serveClientAssetsInDev: true,
                      clientAssetsDir: 'dist/client'
                  }
        ),
        preact(),
        uno(),
        ssr({
            disableAutoFullBuild: true
        }),
        componentAutoRef(),
        callRemoval([
            'assert',
            'assertUsage',
            'assertWarning',
            'assertSingleInstance',
            'assertNoContradiction'
        ]),
        inspect()
    ],

    optimizeDeps: {
        include: [
            'preact',
            'preact/devtools',
            'preact/debug',
            'preact/jsx-dev-runtime',
            'preact/hooks'
        ]
    }
})
