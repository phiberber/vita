import { ComponentProps, FunctionComponent, JSX, RefObject } from "preact";
import type { ForwardedRef, ForwardRefExoticComponent } from "preact/compat"
import type { ForwardRefComponent } from "framer-motion"
import { classlist } from "#/src/shared/utilities/string/classlist";

type ExtractElementFromAttributes<T extends JSX.HTMLAttributes<any>> = T extends JSX.HTMLAttributes<infer E> ? E : never 

export type AtomTag = keyof JSX.IntrinsicElements

export type AtomRef<T> = RefObject<T> | ForwardedRef<T>

export type AtomAs<T extends AtomTag, E extends {}> = T | ForwardRefComponent<unknown, E> | ForwardRefExoticComponent<E> | FunctionComponent<E>
export type AtomRefFromTag<T extends AtomTag> = AtomRef<ExtractElementFromAttributes<JSX.IntrinsicElements[T]> | undefined>

export type AtomProps<T extends AtomTag = AtomTag, E extends {} = {}> = 
    Omit<ComponentProps<T>, 'ref' | 'as'> 
    & E 
    & {
        as?: AtomAs<T, E>
        classList?: any[]
        ref?: AtomRefFromTag<T>
    }

export type Atomic<MergeProps extends {} = {}, DefaultTag extends AtomTag = AtomTag> = 
    <Tag extends AtomTag = DefaultTag, Props extends {} = {}>(
        props: AtomProps<Tag, Props> & MergeProps, 
        $ref: AtomRefFromTag<Tag>
    ) => JSX.Element

export function Atom<T extends AtomTag = AtomTag>(props: AtomProps<T>, $ref: AtomRefFromTag<T>) {
    const { as, className, classList, ref: _, ...rest } = props
    const Component = as as FunctionComponent<any> | AtomTag
    if(!as) throw new Error('Expected as from Atom component but got nothing.')
    return <Component className={classList ? classlist(className, ...classList) : className} ref={$ref} {...rest} />
}