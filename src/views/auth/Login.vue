<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <v-layout align-center justify-center column fill-height>
        <img src="/static/willi-food.svg" alt="willi-food-img" width="200" height="120" />
        <h1 class="my-4 secondary--text display-1">Admin</h1>
      </v-layout>
      <!-- <v-alert type="error" dense outlined class="notification is-danger" v-if="error">
          {{error}}
      </v-alert>-->

      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field
          append-icon="person"
          name="email"
          label="Correo electrónico"
          type="text"
          v-model="model.email"
          :rules="model.emailRules"
          required
        ></v-text-field>
        <v-text-field
          append-icon="lock"
          name="password"
          label="Password"
          id="password"
          type="password"
          v-model="model.password"
          :rules="model.passwordRules"
        ></v-text-field>

        <!-- <v-btn icon>
            <v-icon color="blue">fa fa-facebook fa-lg</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="red">fa fa-google fa-lg</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
        </v-btn>-->

        <v-card-actions>
          <div class="darken-2 text-justify pr-16" v-if="error" border="bottom">
            <span class="red--text">{{ error }}</span>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="login" :loading="loading" :disabled="!valid">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Error</v-card-title>

          <v-card-text>En estos momentos no podemos atender tu solicitud.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    error: '',
    valid: true,
    dialog: false,
    loading: false,
    model: {
      email: 'xenag67252@unomail9.com',
      emailRules: [
        v => !!v || 'Correo electrónico es requerido',
        v => /.+@.+\..+/.test(v) || 'El formato de correo electrónico es invalido',
      ],
      password: '12345678',
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
      ],
    },
    lazy: false,
  }),
  created () {
    this.$session.destroy()
  },
  methods: {
    getLogin() {
      axios
        .post('http://auth.malllikeu.com/api/auth/login', {
          email: this.model.email,
          password: this.model.password,
        })
        .then((response) => {
          this.$session.start()
          this.$session.set('tokenSession', response.data.access_token)
          if (this.$session.exists()) {
            this.$router.push('/estadisticas')
          }
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
        .finally(() => (this.loading = false))
    },
    login() {
      this.loading = true
      this.getLogin()
    },
  },
}
</script>
<style lang="sass" scoped>
.v-main__wrap
  background-image: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7) ), url("https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg")
  background-repeat: no-repeat
  background-size: cover
  background-position: center
</style>
