<template>
  <div>
    <h1 class="app-list-title"> Activated Applications </h1>
    <div v-for="app in activatedApps" :key="app.name" >
      <Card class="app-card" :title="app.name">
      <p>{{ app.description }}</p>
      </Card>
    </div>

    <Divider />
    <h1 class="app-list-title"> Available Applications </h1>
    <div v-for="app in availableApps" :key="app.name" >
      <Card class="app-card" :title="app.name">
      <p>{{ app.description }}</p>
      </Card>
    </div>
  </div>
</template>

<script>
import { storage, client, url } from '@/utils/oauth2'

const storeURL = 'http://localhost:42001'

export default {
  name: 'Applications',
  data: function () {
    return {
      apps: [],
      activatedApps: [],
      availableApps: []
    }
  },
  created: function () {
    if (!storage.getSession()) {
      this.$router.push('/login')
    }

    Promise.all([
      this.fetchAvailableApps(),
      this.fetchActivatedApps()
    ])
      .then(([available, activated]) => {
        this.apps = Object.keys(available).map(id => {
          let app = available[id]
          app.activated = Object.keys(activated).includes(id)
          return app
        })

        this.activatedApps = this.apps.filter(elem => elem.activated)
        this.availableApps = this.apps.filter(elem => !elem.activated)
      })
  },
  methods: {
    fetchAvailableApps: function () {
      console.log(`foobar: ${storeURL}/applications`)
      return fetch(`${storeURL}/applications`, {})
        .then(res => res.json())
    },
    fetchActivatedApps: function () {
      return fetch(`${url}/clients`, {
        headers: { 'Authorization': client.getAuthorizationHeader() }
      })
        .then(res => res.json())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-list-title {
  text-align: center;
  margin-right: 0 auto;
  margin-left: 0 auto;
}

.app-card {
  width: 300px;
  height: 150px;
}
</style>
