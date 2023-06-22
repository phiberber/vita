import * as __generator from '@babel/generator'
import * as __core from '@babel/core'
import __traverse from '@babel/traverse'
import type { types } from '@babel/core'
import { PluginOption } from 'vite'

const { parseSync } = __core
const { CodeGenerator } = __generator
const { default: traverse } = __traverse as unknown as { default: typeof __traverse }

export function callRemoval(removableFunctionCalls: string[]): PluginOption {
    return {
        name: 'babel:remove-calls',
        transform(code, _, options) {
            if (options?.ssr) return
            if (removableFunctionCalls.find(($) => code.includes($))) {
                const ast = parseSync(code)
                if (!ast) return null
                traverse(ast, {
                    CallExpression(path) {
                        if (path.node.callee.type !== 'Identifier') return null
                        const identifier = path.node.callee as types.Identifier
                        const hasRemovableCall = removableFunctionCalls.find(
                            ($) => identifier.name === $
                        )
                        if (hasRemovableCall) path.remove()
                        return null
                    }
                })
                return new CodeGenerator(ast).generate().code
            }
        }
    }
}
