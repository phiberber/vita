// @ts-ignore
import cloudflareWorkersAdapter from '@hattip/adapter-cloudflare-workers'
import handler from '../'

export default {
    fetch: cloudflareWorkersAdapter(handler)
}
