<template>
  <div>
    <h1 class="app-list-title"> Activated Applications </h1>
    <Row type="flex" justify="space-between">
      <i-Col>
      <Card class="app-card" v-for="app in activatedApps" :key="'activ-' + app.id">
        <p slot="title">{{ app.name  }}</p>
        <Button slot="extra" v-on:click="deleteApp" :value="app.id" class="app-card-btn" type="error">
          <Icon type="md-close"></Icon>
        </Button>
        <p class="app-card-description">{{ app.description }}</p>
      </Card>
    </i-Col>
    </Row>

    <Divider />
    <h1 class="app-list-title"> Available Applications </h1>
    <Row>
      <Card class="app-card" v-for="app in availableApps" :key="'avail-' + app.id">
        <p slot="title">{{ app.name  }}</p>
        <Button slot="extra" v-on:click="addApp" :value="app.id" class="app-card-btn" type="success">
          <Icon type="md-add"></Icon>
        </Button>
        <p class="app-card-description">{{ app.description }}</p>
      </Card>
    </Row>
  </div>
</template>

<script>
import { storage, client, url } from '@/utils/oauth2'

const storeURL = 'http://localhost:42001'

export default {
  name: 'Admin',
  data: function () {
    return {
      apps: {}
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
        Object.keys(activated).forEach((id) => {
          available[id].activated = true
        })

        this.apps = available
      })
  },
  computed: {
    availableApps: function () {
      return Object.keys(this.maps).map(id => this.maps[id]).filter(app => !app.activated)
    },
    activatedApps: function () {
      return Object.keys(this.maps).map(id => this.maps[id]).filter(app => app.activated)
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
      console.log('delete: ', event.target.value)
      this.$set(this.apps[event.target.value], 'activated', false)
    },
    addApp: function (event) {
      console.log('add: ', event.target.value)
      this.$set(this.apps[event.target.value], 'activated', true)
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
