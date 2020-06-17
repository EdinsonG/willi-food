<template>
  <v-app-bar color="primary" dark app>
    <v-app-bar-nav-icon @click="handleDrawerToggle" />
    <v-spacer />
    <v-toolbar-items>
      <v-btn text href="mailto:wangqiangshen@gmail.com">Hire Me</v-btn>
      <v-btn icon href="https://github.com/tookit/vue-material-admin">
        <v-icon class="fa-2x">fa-github</v-icon>
      </v-btn>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon text slot="activator" v-on="on">
            <v-badge color="red" overlap>
              <span slot="badge">3</span>
              <v-icon medium>notifications</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <notification-list></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large text slot="activator" v-on="on">
            <v-avatar size="30px">
              <img src="/static/avatar/man_4.jpg" alt="Michael Wang" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in profileMenus"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-toolbar dense slot="extension" color="white" light>
      <v-icon>mdi-home</v-icon>
      <v-breadcrumbs :items="breadcrumbs" class="pa-3"></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-btn icon small color="black">
        <v-icon v-text="'mdi-arrow-left'" @click="handleGoBack" />
      </v-btn>
    </v-toolbar>
  </v-app-bar>
</template>
<script>
var varToken
var config = {
  headers: {
     "Content-Type": 'application/json',
     "X-Requested-With": 'XMLHttpRequest',
     "Authorization": ''
   }
}
import axios from 'axios'
import NotificationList from '@/components/widgets/list/NotificationList'
import Util from '@/util'
export default {
  name: 'AppToolbar',
  components: {
    NotificationList,
  },
  data() {
    return {
      profileMenus: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: this.handleProfile,
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: this.handleSetting,
        },
        {
          icon: 'fullscreen_exit',
          href: '#',
          title: 'Logout',
          click: this.handleLogout,
        },
      ],
    }
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    },
    breadcrumbs() {
      const items = [
        {
          text: 'Home',
          to: { path: '/' },
        },
      ]
      if (['/', '/dashboard'].includes(this.$route.path) === false) {
        items.push({
          text: this.$route.meta.title,
          to: { path: this.$route.path },
        })
      }
      return items
    },
  },
  methods: {
    handleDrawerToggle() {
      this.$emit('side-icon-click')
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    },

    getLogout() {
      config.headers.Authorization = 'Bearer ' + varToken
      console.log(config.headers)
      axios
        .get('http://auth.malllikeu.com/api/auth/logout', config)
        .then((response) => {
          console.log(response.data)
          this.$router.push('/login')
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 401:
              case 422:
                this.error = 'Usuario o contraseña incorrecta'
                // console.log('response status: ' + error.response.status)
                // console.log('response data:')
                // console.log(error.response.data)
                // console.log('Incorrect login or password')
                break
              default:
                this.dialog = true
                // this.error = error.response.data
                // console.log(error)
                // console.log('En estos momentos no podemos atender tu solicitud')
                break
            }
          }
        })
    },
    handleLogout() {
      this.getLogout()
    },

    handleSetting() {},
    handleProfile() {},
    handleGoBack() {
      this.$router.go(-1)
    },
  },
  created() {},
}
</script>

<style lang="sass" scoped></style>
