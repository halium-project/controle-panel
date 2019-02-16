
import Client from '@/utils/oauth2/client'
import Storage from '@/utils/oauth2/storage'

const url = 'http://localhost:42000'

const client = new Client({
  clientID: 'dashboard',
  serverURL: url,
  scopes: ['users', 'clients.read'],
  response_type: 'token',
  debug: true
})

const storage = new Storage()

export {
  url,
  client,
  storage
}
