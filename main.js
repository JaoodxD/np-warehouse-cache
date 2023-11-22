import 'dotenv/config'

import build from './lib/request.js'

const API_KEY = process.env.NP_API_KEY
const PROXY_LOGIN = process.env.PROXY_LOGIN
const PROXY_PASSWORD = process.env.PROXY_PASSWORD
const PROXY_IPS = process.env.PROXY_IPS.split(',')

console.time('fetch')
const { fetch } = build({ PROXY_LOGIN, PROXY_PASSWORD, PROXY_IPS })
const res = await fetch(API_KEY)
console.timeEnd('fetch')
console.log(res?.data.length)
