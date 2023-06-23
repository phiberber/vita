// @ts-check
import netlifyFunctionsAdapter from '@hattip/adapter-netlify-functions'
import hattipHandler from '..'

export const handler = netlifyFunctionsAdapter(hattipHandler)
