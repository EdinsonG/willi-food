<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Mis surcusales</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            <v-toolbar flat color="white">
              <v-text-field
                text
                solo
                flat
                prepend-icon="search"
                placeholder="Buscar"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogCreate" max-width="800px">
                <template v-slot:activator="{ on }">
                  <div class="d-flex">
                    <v-btn
                      color="primary"
                      dark
                      class="ml-auto ma-3"
                      v-on="on"
                      @click="handleCreate()"
                    >
                      <v-icon left>add</v-icon>Nueva
                    </v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-title color="primary">
                    <span>Nueva sucursal</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValid">
                      <v-row>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="latitude"
                            label="Latitud"
                            :rules="rules.latitude"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="longitude"
                            label="Longitud"
                            :rules="rules.longitude"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="city"
                            label="Ciudad"
                            :rules="rules.city"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="phone"
                            label="Número de teléfono"
                            :rules="rules.phone"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="email"
                            label="Correo electrónico"
                            :rules="rules.email"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-switch
                            v-model="stbr_pickup"
                            :label="'Retiro: ' + this.stbr_pickup"
                            type="text"
                            :disabled="this.flow === text"
                            @change="changeSwitch(stbr_pickup, 'pickup')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-select
                            v-model="delivery"
                            :items="selectDelivery"
                            item-text="name"
                            item-value="code"
                            label="Entrega"
                            :rules="rules.delivery"
                            required
                            :disabled="text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="9">
                          <v-text-field
                            v-model="schedule"
                            label="Horario"
                            :rules="rules.schedule"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-switch
                            v-model="stbr_state"
                            :label="'Estatus: ' + this.stbr_state"
                            type="text"
                            :disabled="this.flow === text"
                            @change="changeSwitch(stbr_state, 'status')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="deliveryinfo"
                            label="Información de la entrega"
                            :rules="rules.deliveryinfo"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="returninfo"
                            label="Información de devolución"
                            :rules="rules.returninfo"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="otherinfo"
                            label="Otra información"
                            :rules="rules.otherinfo"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="webside"
                            label="Sitio web"
                            :rules="rules.webside"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="facebook"
                            label="Facebook"
                            :rules="rules.facebook"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="twitter"
                            label="Twiter"
                            :rules="rules.twitter"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="instagram"
                            label="Instagram"
                            :rules="rules.instagram"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="pinterest"
                            label="Pinterest"
                            :rules="rules.pinterest"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="youtube"
                            label="Youtube"
                            :rules="rules.youtube"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                    <div class="darken-2 text-justify" v-if="editError" border="bottom">
                      <span class="red--text">{{ editError }}</span>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="handleCreate()" :disabled="text">Cancelar</v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click="newItem()"
                      :loading="loading"
                      :disabled="!isValid"
                    >Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="800px">
                <v-card>
                  <v-card-title color="primary">
                    <span
                      v-if="editedItem.id && this.flow === 'edit'"
                    >Editar sucursal {{editedItem.id}}</span>
                    <span
                      v-if="editedItem.id && this.flow === 'delete'"
                    >Eliminar sucursal {{editedItem.id}}</span>
                    <span v-if="this.flow === 'create'">Nueva sucursal</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <v-row>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_latitude"
                            label="Latitud"
                            :rules="rules.latitude"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_longitude"
                            label="Longitud"
                            :rules="rules.longitude"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_city"
                            label="Ciudad"
                            :rules="rules.city"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_phone"
                            label="Número de teléfono"
                            :rules="rules.phone"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="editedItem.stbr_email"
                            label="Correo electrónico"
                            :rules="rules.email"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-switch
                            v-model="editedItem.stbr_pickup"
                            :label="'Retiro: ' + this.stbr_pickup"
                            :rules="rules.pickup"
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.stbr_pickup, 'pickup')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-select
                            v-model="editedItem.stbr_delivery"
                            :items="selectDelivery"
                            item-text="name"
                            item-value="code"
                            label="Entrega"
                            :rules="rules.delivery"
                            :disabled="this.flow === 'delete' || text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="9">
                          <v-text-field
                            v-model="editedItem.stbr_schedule"
                            label="Horario"
                            :rules="rules.schedule"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-switch
                            v-model="editedItem.stbr_state"
                            :label="'Estatus: ' + this.stbr_state"
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.stbr_state, 'status')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.stbr_deliveryinfo"
                            label="Información de la entrega"
                            :rules="rules.deliveryinfo"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.stbr_returninfo"
                            label="Información de devolución"
                            :rules="rules.returninfo"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.stbr_otherinfo"
                            label="Otra información"
                            :rules="rules.otherinfo"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.stbr_webside"
                            label="Sitio web"
                            :rules="rules.webside"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_facebook"
                            label="Facebook"
                            :rules="rules.facebook"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_twitter"
                            label="Twiter"
                            :rules="rules.twitter"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_instagram"
                            label="Instagram"
                            :rules="rules.instagram"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stbr_pinterest"
                            label="Pinterest"
                            :rules="rules.pinterest"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.stbr_youtube"
                            label="Youtube"
                            :rules="rules.youtube"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.created_at"
                            label="Creado"
                            :rules="rules.created"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                    <div class="darken-2 text-justify" v-if="editError" border="bottom">
                      <span class="red--text">{{ editError }}</span>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="handleEdit()" :disabled="text">Cancelar</v-btn>
                    <v-btn
                      color="red--text lighten-5"
                      v-if="this.flow === 'delete'"
                      @click="deleteItem(editedItem.id)"
                    >Eliminar</v-btn>
                    <v-btn
                      color="primary"
                      text
                      v-if="this.flow === 'edit'"
                      flat
                      @click="saveItem(editedItem.id, editedItem.stbr_city, editedItem.stbr_delivery, editedItem.stbr_deliveryinfo, editedItem.stbr_pickup, 
                                     editedItem.stbr_email, editedItem.stbr_facebook, editedItem.stbr_instagram, editedItem.stbr_latitude, editedItem.stbr_longitude,
                                     editedItem.stbr_otherinfo, editedItem.stbr_phone, editedItem.stbr_pinterest, editedItem.stbr_returninfo, editedItem.stbr_schedule,
                                     editedItem.stbr_state, editedItem.stbr_twitter, editedItem.stbr_webside, editedItem.stbr_youtube, editedItem.stor_id, editedItem.user_id )"
                      :disabled="!isValidEdit"
                      :loading="loading"
                    >Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>-->
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="fields"
                :search="search"
                :items="branchOffices"
                :sort-by="['id']"
                class="elevation-1"
                item-key="name"
                loading="true"
                loading-text="Cargando... Por favor espere"
              >
                <template v-slot:[`item.action`]="{ item }">
                  <v-btn
                    depressed
                    text
                    icon
                    fab
                    dark
                    color="teal"
                    small
                    @click="handleEdit('edit', item)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    depressed
                    text
                    icon
                    fab
                    dark
                    color="pink"
                    small
                    @click="handleEdit('delete', item)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

const branchOffices = []

export default {
  data() {
    return {
      stor_id: '',
      user_id: '',
      latitude: '',
      longitude: '',
      city: '',
      phone: '',
      email: '',
      stbr_pickup: '',
      delivery: '',
      schedule: '',
      stbr_state: '',
      deliveryinfo: '',
      returninfo: '',
      otherinfo: '',
      webside: '',
      facebook: '',
      twitter: '',
      instagram: '',
      pinterest: '',
      youtube: '',
      isValid: true,
      isValidEdit: true,
      rules: {
        stor: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        user: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        latitude: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        longitude: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        city: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        phone: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        email: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 80 || 'El campo debe tener menos de 80 caracteres.',
          (v) => /.+@.+\..+/.test(v) || 'El formato de correo electrónico es invalido',
        ],
        //stbr_pickup: [(val) => (val || '').length > 0 || 'Este campo es requerido'],
        delivery: [(v) => !!v || 'Este campo es requerido'],
        schedule: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        deliveryinfo: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        returninfo: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        otherinfo: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        webside: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        facebook: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        twitter: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        instagram: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        pinterest: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        youtube: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
      },
      selectDelivery: [
        { code: 'p', name: 'Propio' },
        { code: 'e', name: 'Externo' },
        { code: 'a', name: 'Ambos' },
      ],
      flow: '',
      branchOffices: branchOffices,
      editError: '',
      text: false,
      loading: false,
      dialog: false,
      dialogCreate: false,
      search: '',
      str_id: this.$route.params.id,
      fields: [
        {
          text: 'Nro.',
          value: 'id',
        },
        {
          text: 'Ciudad',
          value: 'stbr_city',
        },
        {
          text: 'Retiro',
          value: 'pickup_stbr',
        },
        {
          text: 'Información de la entrega',
          value: 'stbr_deliveryinfo',
        },
        { text: 'Acción', value: 'action', sortable: false, align: 'right' },
      ],
      editedItem: {},
    }
  },
  mounted() {
    !this.str_id ? this.getStores() : this.getStoreBranches()
  },
  methods: {
    async getStores() {
      let userId = this.$session.get('user_id')
      this.branchOffices = []
      let branchOffices = [] 
      axios
        .get('http://store.malllikeu.com/api/store-branches/' + userId)
        .then((response) => {
          this.branchOffices = this.branchOffices.concat(response.data.storeBranch)
          branchOffices = branchOffices.concat(response.data.storeBranch)
          branchOffices.map(function(x) {
            let langTypePickup
            switch (x.stbr_pickup) {
              case true:
                langTypePickup = 'Si'
                break
              default:
                langTypePickup = 'No'
                break
            }
            x.pickup_stbr = langTypePickup
          })
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 401:
              case 402:
                break
              default:
            }
          }
        })
        .finally(() => (this.loading = false))
    },
    async getStoreBranches() {
      this.branchOffices = []
      let branchOffices = []
      axios
        .get('http://store.malllikeu.com/api/store-branches/' + this.str_id)
        .then((response) => {
          this.branchOffices = this.branchOffices.concat(response.data.storeBranch)
          branchOffices = branchOffices.concat(response.data.storeBranch)
          branchOffices.map(function(x) {
            let langTypePickup
            switch (x.stbr_pickup) {
              case true:
                langTypePickup = 'Si'
                break
              default:
                langTypePickup = 'No'
                break
            }
            x.pickup_stbr = langTypePickup
          })
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 401:
              case 402:
                break
              default:
            }
          }
        })
        .finally(() => (this.loading = false))
    },
    handleCreate() {
      this.editError = ''
      this.stbr_pickup = this.stbr_pickup === true ? 'Si' : 'No'
      this.stbr_state = this.stbr_state === 'open' ? 'Abierto' : 'Cerrado'
      this.stbr_state = this.stbr_state === 'open' ? true : false
      this.dialogCreate = !this.dialogCreate
    },
    handleEdit(flow, item) {
      this.flow = flow
      this.editedItem = Object.assign(this.editedItem, item) || {}
      this.editError = ''
      this.stbr_pickup = this.editedItem.stbr_pickup === true ? 'Si' : 'No'
      this.stbr_state = this.editedItem.stbr_state === 'open' ? 'Abierto' : 'Cerrado'
      this.editedItem.stbr_state = this.editedItem.stbr_state === 'open' ? true : false
      // this.editedItem = item || {}
      this.dialog = !this.dialog
    },
    async saveItem(
      id,
      city,
      delivery,
      deliveryinfo,
      pickup,
      email,
      facebook,
      instagram,
      latitude,
      longitude,
      otherinfo,
      phone,
      pinterest,
      returninfo,
      schedule,
      stbr_state,
      twitter,
      webside,
      youtube,
      stor_id,
      user_id
    ) {
      var branchState = stbr_state === true ? 'open' : 'closed'
      axios
        .put('http://store.malllikeu.com/api/store-branches/' + id, {
          stor_id: stor_id,
          user_id: user_id,
          latitude: latitude,
          longitude: longitude,
          city: city,
          phone: phone,
          email: email,
          pickup: pickup,
          delivery: delivery,
          schedule: schedule,
          state: branchState,
          deliveryinfo: deliveryinfo,
          returninfo: returninfo,
          otherinfo: otherinfo,
          webside: webside,
          facebook: facebook,
          twitter: twitter,
          instagram: instagram,
          pinterest: pinterest,
          youtube: youtube,
        })
        .then((response) => {
          console.log('RESPONSE: ', response.data.message)
          this.getStores()
          this.dialog = !this.dialog
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 422:
                this.editError = 'No se pudo editar'
                break
              default:
            }
          }
        })
        .finally(() => ((this.loading = false), (this.text = false)))
      this.text = true
      this.loading = true
    },
    async deleteItem(id) {
      axios
        .delete('http://store.malllikeu.com/api/store-branches/' + id)
        .then((response) => {
          console.log('RESPONSE: ', response.data.message)
          this.getStores()
          this.dialog = !this.dialog
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 422:
                this.editError = 'No se pudo eliminar'
                break
              default:
            }
          }
        })
        .finally(() => (this.loading = false))
      this.loading = true
    },
    async newItem() {
      axios
        .post('http://store.malllikeu.com/api/store-branches', {
          stor_id: this.stor_id,
          user_id: this.user_id,
          latitude: this.latitude,
          longitude: this.longitude,
          city: this.city,
          phone: this.phone,
          email: this.email,
          pickup: this.pickup,
          delivery: this.delivery,
          schedule: this.schedule,
          branchState: this.stbr_state,
          deliveryinfo: this.deliveryinfo,
          returninfo: this.returninfo,
          otherinfo: this.otherinfo,
          webside: this.webside,
          facebook: this.facebook,
          twitter: this.twitter,
          instagram: this.instagram,
          pinterest: this.pinterest,
          youtube: this.youtube,
        })
        .then((response) => {
          console.log('RESPONSE: ', response.data.message)
          this.getStores()
          this.dialogCreate = !this.dialogCreate
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 422:
                this.editError = 'No se pudo agregar'
                break
              default:
            }
          }
        })
        .finally(() => ((this.loading = false), (this.text = false)))
      this.text = true
      this.loading = true
    },
    async changeSwitch(swt, flow) {
      switch (flow) {
        case 'pickup':
          this.stbr_pickup = swt === true ? 'Si' : 'No'
          break
        case 'status':
          this.stbr_state = swt === true ? 'Abierto' :  'Cerrado'
          break
      }
    },
  },
}
</script>
