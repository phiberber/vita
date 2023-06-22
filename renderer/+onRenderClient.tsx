// https://vite-plugin-ssr.com/onRenderClient
import { hydrate, render } from 'preact'
import { PageShell } from './PageShell'
import { PageContext } from './PageContext'

async function onRenderClient(pageContext: PageContext) {
    const { Page, pageProps } = pageContext
    const page = (
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    )
    const container = document.querySelector('body')

    if (!container) return

    if (pageContext.isHydration) {
        hydrate(page, container)
    } else {
        render(page, container)
    }

    document.title = getPageTitle(pageContext)
}

function getPageTitle(pageContext: PageContext) {
    const title =
        (pageContext.config.documentProps || ({} as any)).title ||
        (pageContext.documentProps || ({} as any)).title ||
        'Demo'
    return title
}

export default onRenderClient
