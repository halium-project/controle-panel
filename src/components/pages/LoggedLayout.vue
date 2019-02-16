<template>
  <Layout class="layout">
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <MenuItem name="1" to="/users">
        <Icon type="md-contacts" />
        Users
        </MenuItem>
        <MenuItem name="2" to="/applications">
        <Icon type="md-appstore" />
        Applications
        </MenuItem>
      </div>
    </Menu>
  </Header>
  <Content class="content">
    <router-view/>
  </Content>
  <Footer class="layout-footer-center">Halium Dashboard</Footer>
  </Layout>
</template>

<script>
export default {
  name: 'LoggedLayout'
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 100%;
}

.layout-logo{
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav{
  margin: 0 auto;
  margin-left: 30px;
  float: left;
}

.layout-footer-center{
  text-align: center;
}

.content {
  padding: '0 50px';
  width: 90%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>
