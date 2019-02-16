
const fetch = require('node-fetch');

fetch('http://localhost:42000/clients', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Dashboard',
    redirectURI: ['http://localhost:8080'],
    grantTypes: ['implicit', 'refresh_token'],
    responseTypes: ['token', 'code'],
    scopes: ["users", "clients.read"],
    public: true
  })
}).then(response => {
  response.json().then((res) => {
    console.log(res)
  })
}).catch(err => {console.log(err);});
