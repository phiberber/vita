/// <reference types="vavite/vite-config" />

import { defineConfig } from 'vite'
import uno from 'unocss/vite'
import preact from '@preact/preset-vite'
import ssr from 'vite-plugin-ssr/plugin'
import vavite from 'vavite'
import { callRemoval } from './utils/plugins/call-removal'
import * as Url from 'node:url'

const usingBun = process.env.TARGET === 'bun'
const __dirname = Url.fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    resolve: {
        alias: {
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
        ssr({ disableAutoFullBuild: true }),
        callRemoval([
            'assert',
            'assertUsage',
            'assertWarning',
            'assertSingleInstance',
            'assertNoContradiction'
        ])
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
