import Storage from './storage'

const _state = 'foobarbaz'

export default class Client {
  constructor (params) {
    this._params = params

    if (!params.storage) {
      this._storage = new Storage()
    } else {
      this._storage = params.storage
    }
  }

  startImplicitFlow () {
    let url = `${this._params.serverURL}/oauth2/auth?response_type=token&client_id=${encodeURIComponent(this._params.clientID)}&state=${encodeURIComponent(_state)}`

    if (this._params.redirectURI) {
      url = `${url}&redirect_uri=${encodeURIComponent(this._params.redirectURI)}`
    }

    url = `${url}&scope=${encodeURIComponent(this._params.scopes.join(','))}`

    window.location = url
  }

  parseResponseFromURL (url) {
    let session

    if (url.indexOf('#') !== -1) {
      session = this._parseQueryString(url.substring(url.indexOf('#') + 1))
    } else if (url.indexOf('?') !== -1) {
      session = this._parseQueryString(url.substring(url.indexOf('?') + 1))
    }

    this._storage.saveSession(session)
  }

  getAuthorizationHeader () {
    const session = this._storage.getSession()

    if (!session) {
      throw new Error('no session available')
    }

    return `Bearer ${session.access_token}`
  }

  _parseQueryString (qs) {
    console.log('parse url: ', qs)
    const a = /\+/g // Regex for replacing addition symbol with a space
    const r = /([^&;=]+)=?([^&;]*)/g
    const d = (s) => decodeURIComponent(s.replace(a, ' '))

    // For some reasons, sometimes in the url a '/' appeares after the '#'.
    // Like: http://localhost:8080/#/access_token=.....
    //
    // This fix avoid to finish with '/access_token' as key instead of
    // 'access_token' which break the token saving process.
    if (qs[0] === '/') {
      qs = qs.substring(1)
    }

    const urlParams = {}
    let e

    for (;;) {
      e = r.exec(qs)
      if (!e) {
        break
      }

      urlParams[d(e[1])] = d(e[2])
    }

    console.log('scope: ', urlParams.scope.split(','))
    const session = {
      access_token: urlParams.access_token,
      expires_in: urlParams.expires_in,
      scopes: urlParams.scope.split(','),
      token_type: urlParams.token_typ
    }

    return session
  }
}
