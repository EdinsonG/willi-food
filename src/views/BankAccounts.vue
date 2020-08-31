<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Cuentas bancarias</h3>
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
              <v-dialog v-model="dialogCreate" max-width="700px">
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
                    <span>Nueva cuenta</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValid">
                        <div class="py-1 text-center blue-grey lighten-5">
                            <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Datos bancarios</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="name"
                                label="Alias"
                                :rules="rules.name"
                                required
                                type="text"
                                :disabled="text"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="8">
                            <v-select
                              v-model="bankname"
                              :items="selectNameBank"
                              item-text="name"
                              item-value="code"
                              label="Nombre del banco"
                              :rules="rules.bankname"
                              required
                              :disabled="text"
                            ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                            <v-text-field
                                v-model="numberaccount"
                                label="Número de cuenta"
                                :rules="rules.numberaccount"
                                required
                                type="text"
                                :disabled="text"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="py-1 text-center blue-grey lighten-5">
                            <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Datos personales</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="nameaccount"
                                label="Nombre del titular"
                                :rules="rules.nameaccount"
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
                            <v-col cols="12" sm="2">
                            <v-text-field
                                v-model="country_code"
                                label="Código de país"
                                placeholder="+58"
                                :rules="rules.country_code"
                                required
                                type="text"
                                :disabled="text"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="phone"
                                label="Número de teléfono"
                                placeholder="2121234567"
                                :rules="rules.phone"
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
                    >Editar cuenta {{editedItem.id}}</span>
                    <span
                      v-if="editedItem.id && this.flow === 'delete'"
                    >Eliminar cuenta {{editedItem.id}}</span>
                    <span v-if="this.flow === 'create'">Nueva cuenta </span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <div class="py-1 text-center blue-grey lighten-5">
                          <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Datos bancarios</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="editedItem.name"
                                label="Alias"
                                :rules="rules.name"
                                required
                                type="text"
                                :disabled="this.flow === 'delete' || text"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="8">
                            <v-select
                              v-model="editedItem.bankname"
                              :items="selectNameBank"
                              item-text="name"
                              item-value="code"
                              label="Nombre del banco"
                              :rules="rules.bankname"
                              required
                              :disabled="this.flow === 'delete' || text"
                            ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                            <v-text-field
                                v-model="editedItem.numberaccount"
                                label="Número de cuenta"
                                :rules="rules.numberaccount"
                                required
                                type="text"
                                :disabled="this.flow === 'delete' || text"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="py-1 text-center blue-grey lighten-5">
                            <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Datos personales</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="editedItem.nameaccount"
                                label="Nombre del titular"
                                :rules="rules.nameaccount"
                                required
                                type="text"
                                :disabled="this.flow === 'delete' || text"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="editedItem.email"
                                label="Correo electrónico"
                                :rules="rules.email"
                                required
                                type="text"
                                :disabled="this.flow === 'delete' || text"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2">
                            <v-text-field
                                v-model="editedItem.country_code"
                                label="Código de país"
                                placeholder="+58"
                                :rules="rules.country_code"
                                required
                                type="text"
                                :disabled="this.flow === 'delete' || text"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                            <v-text-field
                                v-model="editedItem.phone"
                                label="Número de teléfono"
                                placeholder="2121234567"
                                :rules="rules.phone"
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
                      @click="saveItem(editedItem.id, editedItem.name, editedItem.bankname, editedItem.numberaccount, editedItem.nameaccount, 
                                     editedItem.country_code, editedItem.phone, editedItem.email, editedItem.stor_id, editedItem.user_id )"
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
                :items="bankAccounts"
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

const bankAccounts = []

export default {
  data() {
    return {
      stor_id: '',
      bankAccounts: bankAccounts,
      user_id: '',
      name: '',
      bankname: '',
      numberaccount: '',
      nameaccount: '',
      email: '',
      country_code: '',
      phone: '',
      isValid: true,
      isValidEdit: true,
      rules: {
        name: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        bankname: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        numberaccount: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 20 || 'El campo debe tener menos de 20 caracteres.',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        nameaccount: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        email: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 80 || 'El campo debe tener menos de 80 caracteres.',
          (v) => /.+@.+\..+/.test(v) || 'El formato de correo electrónico es invalido',
        ],
        phone: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
      },
      selectNameBank: [
        { code: '0156', name: '100%BANCO' },
        { code: '0196', name: 'ABN AMRO BANK' },
        { code: '0172', name: 'BANCAMIGA BANCO MICROFINANCIERO, C.A.' },
        { code: '0171', name: 'BANCO ACTIVO BANCO COMERCIAL, C.A.' },
        { code: '0166', name: 'BANCO AGRICOLA' },
        { code: '0175', name: 'BANCO BICENTENARIO' },
        { code: '0128', name: 'BANCO CARONI, C.A. BANCO UNIVERSAL' },
        { code: '0164', name: 'BANCO DE DESARROLLO DEL MICROEMPRESARIO' },
        { code: '0102', name: 'BANCO DE VENEZUELA S.A.C.A. BANCO UNIVERSAL' },
        { code: '0114', name: 'BANCARIBE C.A. BANCO UNIVERSAL' },
        { code: '0149', name: 'BANCO DEL PUEBLO SOBERANO C.A.' },
        { code: '0163', name: 'BANCO DEL TESORO' },
        { code: '0176', name: 'BANCO ESPIRITO SANTO, S.A.' },
        { code: '0115', name: 'BANCO EXTERIOR C.A.' },
        { code: '0003', name: 'BANCO INDUSTRIAL DE VENEZUELA.' },
        { code: '0173', name: 'BANCO INTERNACIONAL DE DESARROLLO, C.A.' },
        { code: '0105', name: 'BANCO MERCANTIL C.A.' },
        { code: '0191', name: 'BANCO NACIONAL DE CREDITO' },
        { code: '0116', name: 'BANCO OCCIDENTAL DE DESCUENTO.' },
        { code: '0138', name: 'BANCO PLAZA' },
        { code: '0108', name: 'BANCO PROVINCIAL BBVA' },
        { code: '0104', name: 'BANCO VENEZOLANO DE CREDITO S.A.' },
        { code: '0168', name: 'BANCRECER S.A. BANCO DE DESARROLLO' },
        { code: '0134', name: 'BANESCO BANCO UNIVERSAL' },  
        { code: '0177', name: 'BANFANB' },
        { code: '0146', name: 'BANGENTE' },
        { code: '0174', name: 'BANPLUS BANCO COMERCIAL C.A' },
        { code: '0190', name: 'CITIBANK.' },
        { code: '0121', name: 'CORP BANCA.' },
        { code: '0157', name: 'DELSUR BANCO UNIVERSAL' },
        { code: '0151', name: 'BFC BANCO FONDO COMÚN C.A. BANCO UNIVERSAL' },
        { code: '0601', name: 'INSTITUTO MUNICIPAL DE CR&#201;DITO POPULAR' },
        { code: '0169', name: 'MIBANCO BANCO DE DESARROLLO, C.A.' },
        { code: '0137', name: 'SOFITASA' }
      ],
      flow: '',
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
          text: 'Nombre del banco',
          value: 'name_bank',
        },
        {
          text: 'Número de cuenta',
          value: 'numberaccount',
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
      console.log(this.$route.params.id);
      let userId = this.$session.get('user_id')
      this.bankAccounts = []
      let bankAccounts = [] 
      axios
        .get('http://auth.malllikeu.com/api/accounts/' + userId)
        .then((response) => {
          this.bankAccounts = this.bankAccounts.concat(response.data.account)
          bankAccounts = bankAccounts.concat(response.data.account)
          bankAccounts.map(function(x) {
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
      this.bankAccounts = []
      let bankAccounts = []
      axios
        .get('http://auth.malllikeu.com/api/accounts/' + this.str_id)
        .then((response) => {
          this.bankAccounts = this.bankAccounts.concat(response.data.account)
          bankAccounts = bankAccounts.concat(response.data.account)
          bankAccounts.map(function(x) {
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
        .put('http://store.malllikeu.com/api/accounts/' + id, {
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
        .delete('http://store.malllikeu.com/api/accounts/' + id)
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
        .post('http://store.malllikeu.com/api/accounts', {
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
