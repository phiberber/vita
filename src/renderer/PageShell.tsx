import { ComponentChildren } from 'preact'
import { PageContext, PageContextProvider } from './PageContext'

import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'

function PageShell(props: { children: ComponentChildren, pageContext: PageContext }) {
    return (
        <PageContextProvider pageContext={props.pageContext}>
            {props.children}
        </PageContextProvider>
    )
}

export { PageShell }
