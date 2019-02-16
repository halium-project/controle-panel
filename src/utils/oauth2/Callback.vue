<template>
  <p>Loading...</p>
</template>

<script>

import { client } from '@/utils/oauth2'

export default {
  name: 'Callback',
  created: function () {
    console.log('start callback')
    const res = client.parseResponseFromURL(window.location.href)
    console.log('res: ', res)
    this.$router.push('/users')
  }
}
</script>
