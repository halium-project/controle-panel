<template>
  <div class="users">
    <Table :columns="table.columnsName" :data="tableContent">
      <template slot-scope="{ row, index }" slot="action">
        <!--<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>-->
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
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
          { title: 'Role', key: 'role' },
          { title: 'Action', slot: 'action', width: 150, align: 'center' }
        ]
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
      })
  },
  computed: {
    tableContent: function () {
      return Object.keys(this.users).map(id => {
        let user = this.users[id]
        user.id = id
        return user
      })
    }
  },
  methods: {
    remove: function (index) {
      const userID = this.tableContent[index].id

      return fetch(`${url}/users/${userID}`, {
        method: 'DELETE',
        headers: { 'Authorization': client.getAuthorizationHeader() }
      })
        .then((res) => {
          if (res.status !== 200) {
            return res.json().then((body) => { console.error('failed to delete the user: ', body) })
          }

          this.$delete(this.users, userID)
        })
    }
  }
}
</script>

<style scoped>
.users {
  flex: 1 1 100%;
}
</style>
