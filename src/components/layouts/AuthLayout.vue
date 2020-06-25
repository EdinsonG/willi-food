<template>
  <v-app class="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <router-view :key="$route.path"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  methods: {},
}
</script>
<style lang="sass" scoped>
.login
  background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7) ), url("../../assets/login_background-min.jpg") !important
  background-repeat: no-repeat !important
  background-size: cover !important
  background-position: center !important
</style>
