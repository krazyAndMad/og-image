import { IncomingMessage } from 'http'
import { parse } from 'url'
import { ParsedRequest } from './types'

export function parseRequest(req: IncomingMessage) {
  console.log('HTTP ' + req.url)
  const { pathname } = parse(req.url || '/', true)

  const arr = (pathname || '/').slice(1).split('.')
  let extension = ''
  let text = ''
  if (arr.length === 0) {
    text = ''
  } else if (arr.length === 1) {
    text = arr[0]
  } else {
    extension = arr.pop() as string
    text = arr.join('.')
  }

  const [collection, token] = text.split('-')

  return {
    collection: '0x487b068009c7094fe8dc9452bc804f1129709288',
    token: '461',
    fileType: 'png',
  } as ParsedRequest

  return {
    collection,
    token,
    fileType: extension === 'jpeg' ? extension : 'png',
  } as ParsedRequest
}
