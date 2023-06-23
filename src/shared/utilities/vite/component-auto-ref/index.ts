import { PluginOption } from 'vite'

import * as __core from '@babel/core'
import * as __generator from '@babel/generator'
import __traverse from '@babel/traverse'

import {
    ArrowFunctionExpression,
    CallExpression,
    FunctionDeclaration,
    blockStatement,
    callExpression,
    functionExpression,
    identifier,
    returnStatement,
    variableDeclaration,
    variableDeclarator
} from '@babel/types'

const { parseSync } = __core
const { CodeGenerator } = __generator
const { default: traverse } = __traverse as unknown as { default: typeof __traverse }

function wrapIntoForwardRef(
    fun: __core.NodePath<FunctionDeclaration | ArrowFunctionExpression>
): CallExpression {
    return callExpression(identifier('forwardRef'), [
        functionExpression(
            null,
            fun.node.params,
            fun.node.body.type === 'BlockStatement'
                ? fun.node.body
                : blockStatement([returnStatement(fun.node.body)])
        )
    ])
}

function isPreactRefComponent(fun: __core.NodePath<FunctionDeclaration | ArrowFunctionExpression>) {
    const secondParameter = fun.node.params[1]
    return secondParameter?.type === 'Identifier' && secondParameter?.name === '$ref'
}

export function componentAutoRef(): PluginOption {
    return {
        name: 'babel:component-auto-ref',
        transform(code, _, options) {
            if (options?.ssr) return
            if (code.includes('$ref')) {
                const ast = parseSync(code)

                if (!ast) return null

                let transformed = false

                traverse(ast, {
                    FunctionDeclaration(fun) {
                        if (isPreactRefComponent(fun)) {
                            if (fun.node.id) {
                                transformed = true
                                fun.replaceWith(
                                    variableDeclaration('const', [
                                        variableDeclarator(fun.node.id, wrapIntoForwardRef(fun))
                                    ])
                                )
                            } else {
                                transformed = true
                                fun.replaceWith(wrapIntoForwardRef(fun))
                            }
                        }
                    },
                    ArrowFunctionExpression(fun) {
                        if (isPreactRefComponent(fun)) {
                            transformed = true
                            fun.replaceWith(wrapIntoForwardRef(fun))
                        }
                    }
                })

                let generatedCode = new CodeGenerator(ast).generate().code

                if (!code.includes('forwardRef') && transformed) {
                    generatedCode = `import {forwardRef} from 'preact/compat'\n${generatedCode}`
                }

                return generatedCode
            }
        }
    }
}
