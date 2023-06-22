// @ts-check
import adapterVercel from '@hattip/adapter-vercel-edge'
import handler from '../'

export default adapterVercel(handler)
