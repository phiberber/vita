/// <reference types="vite/client" />

import { compose, RequestContext } from '@hattip/compose'
import { renderPage } from 'vite-plugin-ssr/server'

async function handler(ctx: RequestContext) {
    const parsedUrl = new URL(ctx.request.url)
    const url = parsedUrl.pathname + parsedUrl.search
    const pageContextInit = { urlOriginal: url }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    if (httpResponse) {
        return new Response(httpResponse.body, {
            status: httpResponse.statusCode,
            headers: {
                'Content-Type': httpResponse.contentType,
            },
        })
    }
}

export default compose(handler)
