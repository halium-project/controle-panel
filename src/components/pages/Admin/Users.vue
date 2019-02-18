<template>
  <div class="users">
    <Table :columns="table.columnsName" :data="table.content"></Table>
  </div>
</template>

<script>
import { storage, client, url } from '@/utils/oauth2'

export default {
  name: 'Users',
  data: function () {
    return {
      users: {},
      table: {
        columnsName: [
          { title: 'Username', key: 'username' },
          { title: 'Role', key: 'role' }
        ],
        content: []
      }
    }
  },
  created: function () {
    if (!storage.getSession()) {
      this.$router.push('/login')
    }

    return fetch(`${url}/users`, {
      headers: { 'Authorization': client.getAuthorizationHeader() }
    })
      .then(res => res.json())
      .then((body) => {
        this.users = body
        this.table.content = Object.keys(this.users).map(id => this.users[id])
      })
  }
}
</script>

<style scoped>
.users {
  flex: 1 1 100%;
}
</style>
