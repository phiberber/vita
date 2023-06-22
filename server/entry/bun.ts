// @ts-check
import bunAdapter from '@hattip/adapter-bun'
import url from 'node:url'
import path from 'node:path'
import handler from '../'

const dir = path.resolve(path.dirname(url.fileURLToPath(new URL(import.meta.url))), '../client')

export default bunAdapter(handler, { staticDir: dir })
