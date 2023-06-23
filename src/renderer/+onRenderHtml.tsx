// https://vite-plugin-ssr.com/onRenderHtml
import renderToString from 'preact-render-to-string'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { PageContext } from './PageContext'

async function onRenderHtml(pageContext: PageContext) {
    const { Page, pageProps } = pageContext

    const pageHtml = renderToString(
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    )

    // See https://vite-plugin-ssr.com/head
    const { documentProps } = pageContext
    const title = (documentProps?.title) || 'Vite SSR app'
    const desc =
        (documentProps?.description) ||
        'App using Vite + vite-plugin-ssr'

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        ${dangerouslySkipEscape(pageHtml)}
      </body>
    </html>`

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        }
    }
}

export default onRenderHtml
