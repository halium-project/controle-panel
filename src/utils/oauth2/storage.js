
export default class Storage {
  getSession () {
    const sessionStr = localStorage.getItem('session')
    if (sessionStr === '') {
      return null
    }

    return JSON.parse(sessionStr)
  }

  saveSession (session) {
    return localStorage.setItem('session', JSON.stringify(session))
  }
}
