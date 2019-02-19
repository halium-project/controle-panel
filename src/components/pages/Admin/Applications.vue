<template>
  <div>
    <h1 class="app-list-title"> Activated Applications </h1>
    <Row type="flex" justify="start" :gutter="16" class="code-row-bg">
      <i-Col v-for="(app, appID) in activatedApps" :key="'activ-' + appID">
        <Card class="app-card">
          <p slot="title">{{ app.name  }}</p>
          <Button slot="extra" v-on:click="deleteApp" :value="appID" class="app-card-btn" type="error">
            <Icon type="md-close"></Icon>
          </Button>
          <p class="app-card-description">{{ app.description }}</p>
        </Card>
    </i-Col>
    </Row>

    <Divider />
    <h1 class="app-list-title"> Available Applications </h1>
    <Row type="flex" justify="start" :gutter="16" class="code-row-bg">
      <i-Col v-for="(app, appID) in availableApps" :key="'avail-' + appID">
        <Card class="app-card">
          <p slot="title">{{ app.name  }}</p>
          <Button slot="extra" v-on:click="addApp" :value="appID" class="app-card-btn" type="success">
            <Icon type="md-add"></Icon>
          </Button>
          <p class="app-card-description">{{ app.description }}</p>
        </Card>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import { client, url } from '@/utils/oauth2'

const storeURL = 'http://localhost:42001'

export default {
  name: 'Applications',
  data: function () {
    return {
      apps: {}
    }
  },
  created: function () {
    Promise.all([
      this.fetchAvailableApps(),
      this.fetchActivatedApps()
    ])
      .then(([available, activated]) => {
        Object.keys(activated).forEach((id) => {
          available[id].activated = true
        })

        this.apps = available
      })
  },
  computed: {
    availableApps: function () {
      const predicate = app => app && !app.activated

      // Filter an object with the predicate
      return Object.keys(this.apps)
        .filter(id => predicate(this.apps[id]))
        .reduce((res, key) => Object.assign(res, { [key]: this.apps[key] }), {})
    },
    activatedApps: function () {
      const predicate = app => app && app.activated

      // Filter an object with the predicate
      return Object.keys(this.apps)
        .filter(id => predicate(this.apps[id]))
        .reduce((res, key) => Object.assign(res, { [key]: this.apps[key] }), {})
    }
  },
  methods: {
    fetchAvailableApps: function () {
      return fetch(`${storeURL}/applications`, {})
        .then(res => res.json())
    },
    fetchActivatedApps: function () {
      return fetch(`${url}/clients`, {
        headers: { 'Authorization': client.getAuthorizationHeader() }
      })
        .then(res => res.json())
    },
    deleteApp: function (event) {
      fetch(`${url}/clients/${event.target.value}`, {
        method: 'DELETE',
        headers: { 'Authorization': client.getAuthorizationHeader() }
      })
        .then((res) => {
          if (res.status === 200) {
            this.$set(this.apps[event.target.value], 'activated', false)
            return
          }
          console.error('failed to delete the app')
        })
    },
    addApp: function (event) {
      fetch(`${url}/clients`, {
        method: 'POST',
        body: JSON.stringify(this.apps[event.target.value]),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': client.getAuthorizationHeader()
        }
      })
        .then((res) => {
          if (res.status === 201) {
            this.$set(this.apps[event.target.value], 'activated', true)
            return
          }

          console.error('failed to register the app')
        })
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

.app-card-btn {
  padding: 5px 10px;
}

.app-card-description {
  text-align: center;
}
</style>
