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
              <v-dialog v-model="dialogCreate" max-width="600px">
                <template v-slot:activator="{ on }">
                  <div class="d-flex">
                    <v-btn color="primary" dark class="ml-auto ma-3" v-on="on" @click="handleCreate()">
                      <v-icon left>add</v-icon>Nueva
                    </v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-title color="primary">
                    <span>Nueva sucursal</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="stor_id" label="Stor_id" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="user_id" label="User_id" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="latitude" label="Latitud" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="longitude" label="Longitud" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="city" label="Ciudad" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="phone" label="Número de teléfono" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="email" label="Email" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select v-model="pickup" :items="selectPickup" label="Pickup" ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select v-model="delivery" :items="selectDelivery" label="Delivery" ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="schedule" label="schedule" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-select v-model="state" :items="selectState" label="Estado" ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="deliveryinfo" label="Información de delivery" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="returninfo" label="return info" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="otherinfo" label="Otra información" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="webside" label="Sitio web" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="facebook" label="Facebook" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="twitter" label="Twiter" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="instagram" label="Instagram" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="pinterest" label="Pinterest" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="youtube" label="Youtube" ></v-text-field>
                      </v-col>
                    </v-row>
                  <div class="darken-2 text-justify pr-16" v-if="editError" border="bottom">
                    <span class="red--text">{{ editError }}</span>
                  </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text flat @click="handleCreate()">Cancelar</v-btn>
                    <v-btn color="primary" text flat 
                    @click="newItem()">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                  <v-card-title color="primary">
                    <span v-if="editedItem.id && this.flow === 'edit'">Editar sucursal {{editedItem.id}}</span>
                    <span v-if="editedItem.id && this.flow === 'delete'">Eliminar sucursal {{editedItem.id}}</span>
                    <span v-if="this.flow === 'create'">Nueva sucursal</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stor_id" label="Stor_id" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.user_id" label="User_id" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_latitude" label="Latitud" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_longitude" label="Longitud" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="editedItem.stbr_city" label="Ciudad" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_phone" label="Número de teléfono" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_email" label="Email" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select v-model="editedItem.stbr_pickup" :items="selectPickup" label="Pickup" :disabled="this.flow === 'delete'"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select v-model="editedItem.stbr_delivery" :items="selectDelivery" label="Delivery" :disabled="this.flow === 'delete'"></v-select>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="editedItem.stbr_schedule" label="schedule" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-select v-model="editedItem.stbr_state" :items="selectState" label="Estado" :disabled="this.flow === 'delete'"></v-select>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="editedItem.stbr_deliveryinfo" label="Información de delivery" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="editedItem.stbr_returninfo" label="return info" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="editedItem.stbr_otherinfo" label="Otra información" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field v-model="editedItem.stbr_webside" label="Sitio web" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_facebook" label="Facebook" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_twitter" label="Twiter" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_instagram" label="Instagram" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_pinterest" label="Pinterest" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.stbr_youtube" label="Youtube" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.created_at" label="Creado" :disabled="this.flow === 'delete'"></v-text-field>
                      </v-col>
                    </v-row>
                  <div class="darken-2 text-justify pr-16" v-if="editError" border="bottom">
                    <span class="red--text">{{ editError }}</span>
                  </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text flat @click="handleEdit()">Cancelar</v-btn>
                    <v-btn color="red--text lighten-5" v-if="this.flow === 'delete'" flat @click="deleteItem(editedItem.id)">Eliminar</v-btn>
                    <v-btn color="primary" text v-if="this.flow === 'edit'" flat 
                    @click="saveItem(editedItem.id, editedItem.stbr_city, editedItem.stbr_delivery, editedItem.stbr_deliveryinfo, editedItem.stbr_pickup, 
                                     editedItem.stbr_email, editedItem.stbr_facebook, editedItem.stbr_instagram, editedItem.stbr_latitude, editedItem.stbr_longitude,
                                     editedItem.stbr_otherinfo, editedItem.stbr_phone, editedItem.stbr_pinterest, editedItem.stbr_returninfo, editedItem.stbr_schedule,
                                     editedItem.stbr_state, editedItem.stbr_twitter, editedItem.stbr_webside, editedItem.stbr_youtube, editedItem.stor_id, editedItem.user_id )">Guardar</v-btn>
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
                class="elevation-1"
                item-key="name"
                loading="true"
              >
                <template v-slot:item.details="{ item }">
                  <div class="text-truncate" style="width: 180px">{{item.Details}}</div>
                </template>
                <template v-slot:item.url="{ item }">
                  <div class="text-truncate" style="width: 180px">
                    <a :href="item.URL" target="_new">{{item.URL}}</a>
                  </div>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn depressed text icon fab dark color="teal" small @click="handleEdit('edit', item)">
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
      selectPickup: [true, false],
      selectState: ['open', 'closed'],
      selectDelivery: ['p', 'e', 'a'],
      flow: '',
      branchOffices: branchOffices,
      editError: '',
      loading: true,
      formModel: {
        name: '',
        email: '',
      },
      dialog: false,
      dialogCreate: false,
      search: '',
      fields: [
        {
          text: 'Id',
          value: 'id',
        },
        {
          text: 'Ciudad',
          value: 'stbr_city',
        },
        {
          text: 'Pickup',
          value: 'stbr_pickup',
        },
        {
          text: 'Delivery',
          value: 'stbr_deliveryinfo',
        },
        { text: 'Acción', value: 'action', sortable: false, align: 'right' },
      ],
      editedItem: {},
      basic: {
        headers: [
          {
            text: 'Id',
            value: 'id',
          },
          {
            text: 'ciudad',
            value: 'city',
          },
          {
            text: 'Pickup',
            value: 'pickup',
          },
          {
            text: 'Delivery',
            value: 'delivery',
          },
        ],
      },
      stor_id: '',
      user_id: '',
      latitude: '',
      longitude: '',
      city: '',
      phone: '',
      email: '',
      pickup: '',
      delivery: '',
      schedule: '',
      state: '',
      deliveryinfo: '',
      returninfo: '',
      otherinfo: '',
      webside: '',
      facebook: '',
      twitter: '',
      instagram: '',
      pinterest: '',
      youtube: ''
    }
  },
  created () {
    this.getStores()
  },
  methods: {
    async getStores () {
      axios.get('http://store.malllikeu.com/api/store-branches')
      .then((response) => {
        this.branchOffices = response.data.storeBranches
        console.log(this.branchOffices)
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
      }).finally(() => (this.loading = false))
    },
    handleCreate() {
      this.editError = ''
      this.dialogCreate = !this.dialogCreate
    },
    handleEdit(flow, item) {
      this.flow = flow
      this.editError = ''
      this.editedItem = Object.assign(this.editedItem, item) || {}
      // this.editedItem = item || {}
      this.dialog = !this.dialog
    },
    async saveItem (id, city, delivery, deliveryinfo, pickup, email, facebook, instagram, latitude, longitude, otherinfo, 
                      phone, pinterest, returninfo, schedule, state, twitter, webside, youtube, stor_id, user_id) {
      axios.put('http://store.malllikeu.com/api/store-branches/' + id, {
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
        state: state,
        deliveryinfo: deliveryinfo,
        returninfo: returninfo,
        otherinfo: otherinfo,
        webside: webside,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        pinterest: pinterest,
        youtube: youtube
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
      }).finally(() => (this.loading = false))
    },
    async deleteItem (id) {
      axios.delete('http://store.malllikeu.com/api/store-branches/' + id)
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
      }).finally(() => (this.loading = false))
    },
    async newItem () {
      axios.post('http://store.malllikeu.com/api/store-branches', {
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
        state: this.state,
        deliveryinfo: this.deliveryinfo,
        returninfo: this.returninfo,
        otherinfo: this.otherinfo,
        webside: this.webside,
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        pinterest: this.pinterest,
        youtube: this.youtube
      })
      .then((response) => {
        console.log('RESPONSE: ', response.data.message)
        this.getStores()
        this.dialogCreate = !this.dialogCreate
      })
      .catch((error) => {
        if (error.response) {
          console.log('RESPONSE: ', error.response)
          switch (error.response.status) {
            case 422:
              this.editError = 'No se pudo agregar'
              break
            default:
          }
        }
      }).finally(() => (this.loading = false))
    }
  },
}
</script>
