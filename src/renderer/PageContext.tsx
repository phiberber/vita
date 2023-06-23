import { ComponentChildren, createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { PageContextBuiltInClientWithClientRouting } from 'vite-plugin-ssr/types'

type PageContext = PageContextBuiltInClientWithClientRouting & {
    pageProps: any
    documentProps: any
}

const Context = createContext<PageContext | undefined>(undefined)

function PageContextProvider(props: { pageContext: PageContext, children: ComponentChildren }) {
    const { pageContext, children } = props
    return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

function usePageContext() {
    const pageContext = useContext(Context)
    return pageContext
}

export type { PageContext }
export { PageContextProvider }
export { usePageContext }
