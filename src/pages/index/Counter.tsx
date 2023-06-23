import { Atom, Atomic } from '#/src/components/Atom'
import { useSignal } from '@preact/signals'

const Counter: Atomic = (props, $ref) => {
  const count = useSignal(0)
  return (
    <Atom as='button'  alt='Counter' type="button" ref={$ref} onClick={() => count.value++} {...props}>
      Counter {count}
    </Atom>
  )
}

export {Counter}