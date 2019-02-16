<template>
  <div class="applications">
    <Table :columns="table.columnsName" :data="table.content"></Table>
  </div>
</template>

<script>
import { storage, client, url } from '@/utils/oauth2'

export default {
  name: 'Applications',
  data: function () {
    return {
      users: {},
      table: {
        columnsName: [
          { title: 'Application', key: 'name' }
        ],
        content: []
      }
    }
  },
  created: function () {
    if (!storage.getSession()) {
      this.$router.push('/login')
    }

    return fetch(`${url}/clients`, {
      headers: { 'Authorization': client.getAuthorizationHeader() }
    })
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        this.users = body
        this.table.content = Object.keys(this.users).map(id => this.users[id])
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
