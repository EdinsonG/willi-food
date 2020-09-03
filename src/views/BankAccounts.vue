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
              <v-text-field text solo flat prepend-icon="search" placeholder="Buscar" v-model="search" hide-details class="hidden-sm-and-down"></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogCreate" max-width="700px">
                <template v-slot:activator="{ on }">
                  <div class="d-flex">
                    <v-btn color="primary" dark class="ml-auto ma-3" v-on="on" @click="handleCreate()">
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
                            <v-text-field v-model="acco_name" label="Alias" :rules="rules.acco_name" required type="text" :disabled="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="8">
                            <v-select v-model="acco_bankname" :items="selectNameBank" item-text="name" item-value="name" label="Nombre del banco"
                              :rules="rules.acco_bankname" required :disabled="text" ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                            <v-text-field v-model="acco_numberaccount" label="Número de cuenta" :rules="rules.acco_numberaccount" required type="text"
                              :maxlength=20 :disabled="text"></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="py-1 text-center blue-grey lighten-5">
                            <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Datos personales</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-text-field v-model="acco_nameaccount" label="Nombre del titular" :rules="rules.acco_nameaccount" required type="text"
                              :disabled="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                            <v-text-field v-model="acco_email" label="Correo electrónico" :rules="rules.acco_email" required type="text"
                              :disabled="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                            <v-select v-model="country_code" :items="codeCountry" item-text="name" item-value="code" label="Pais"
                              :rules="rules.country_code" required :disabled="text" ></v-select>
                            </v-col>
                            <v-col cols="12" sm="4">
                            <v-text-field v-model="acco_phone" label="Número de teléfono" placeholder="2121234567" :rules="rules.acco_phone"
                              :maxlength=10 required type="text" :disabled="text" ></v-text-field>
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
                    <v-btn color="primary" text @click="newItem()" :loading="loading" :disabled="!isValid">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="800px">
                <v-card>
                  <v-card-title color="primary">
                    <span v-if="editedItem.id && this.flow === 'edit'">Editar cuenta {{editedItem.id}}</span>
                    <span v-if="editedItem.id && this.flow === 'delete'">Eliminar cuenta {{editedItem.id}}</span>
                    <span v-if="this.flow === 'create'">Nueva cuenta </span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <div class="py-1 text-center blue-grey lighten-5">
                          <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Datos bancarios</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="4">
                            <v-text-field v-model="editedItem.acco_name" label="Alias" :rules="rules.acco_name" required type="text"
                              :disabled="this.flow === 'delete' || text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="8">
                            <v-select v-model="editedItem.acco_bankname" :items="selectNameBank" item-text="name" item-value="name"
                              label="Nombre del banco" :rules="rules.acco_bankname" required :disabled="this.flow === 'delete' || text"
                            ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                            <v-text-field v-model="editedItem.acco_numberaccount" label="Número de cuenta" :rules="rules.acco_numberaccount" required 
                              :maxlength=20 type="text" :disabled="this.flow === 'delete' || text"></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="py-1 text-center blue-grey lighten-5">
                            <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Datos personales</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.acco_nameaccount" label="Nombre del titular" :rules="rules.acco_nameaccount" required
                              type="text" :disabled="this.flow === 'delete' || text" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.acco_email" label="Correo electrónico" :rules="rules.acco_email" required type="text"
                              :disabled="this.flow === 'delete' || text" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                            <v-select v-model="editedItem.country_code" :items="codeCountry" item-text="name" item-value="code" label="Pais"
                              :rules="rules.country_code" required :disabled="this.flow === 'delete' || text" ></v-select>
                            </v-col>
                            <v-col cols="12" sm="4">
                            <v-text-field v-model="editedItem.acco_phone" label="Número de teléfono" placeholder="2121234567"
                              :maxlength=10 :rules="rules.acco_phone" required type="text" :disabled="this.flow === 'delete' || text"></v-text-field>
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
                    <v-btn color="red--text lighten-5" v-if="this.flow === 'delete'" @click="deleteItem(editedItem.id)" >Eliminar</v-btn>
                    <v-btn color="primary" text v-if="this.flow === 'edit'" @click="saveItem(editedItem.id, editedItem.acco_name, editedItem.acco_bankname, editedItem.acco_numberaccount, editedItem.acco_nameaccount, editedItem.acco_phone, editedItem.acco_email, editedItem.country_code )" :disabled="!isValidEdit" :loading="loading" >Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>-->
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table :headers="fields" :search="search" :items="bankAccounts" :sort-by="['id']" class="elevation-1" item-key="name"
                loading="true" loading-text="Cargando... Por favor espere">
                <template v-slot:[`item.action`]="{ item }">
                  <v-btn depressed text icon fab dark color="teal" small @click="handleEdit('edit', item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn depressed text icon fab dark color="pink" small @click="handleEdit('delete', item)">
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
      config: {
        headers: {
          "Content-Type": 'application/json',
          "X-Requested-With": 'XMLHttpRequest',
          "Authorization": ''
        }
      },
      regexPhone: /^(424|414|412|426|416|212)+([0-9]{7})$/,
      regexNumberAccount: /^(\d{5})(\d{15})$/,
      bankAccounts: bankAccounts,
      user_id: '',
      acco_name: '',
      acco_bankname: '',
      acco_numberaccount: '',
      acco_nameaccount: '',
      acco_email: '',
      country_code: '',
      acco_phone: '',
      isValid: true,
      isValidEdit: true,
      rules: {
        acco_name: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        acco_bankname: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        acco_numberaccount: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
          (v) => this.regexNumberAccount.test(v) || 'Formato de campo inválido',
        ],
        acco_nameaccount: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        acco_email: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 80 || 'El campo debe tener menos de 80 caracteres.',
          (v) => /.+@.+\..+/.test(v) || 'El formato de correo electrónico es invalido',
        ],
        acco_phone: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
          (v) => this.regexPhone.test(v) || 'Formato de campo inválido'
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
      codeCountry: [
        { code: '54', name: 'Argentina' },
        { code: '591', name: 'Bolivia' },
        { code: '55', name: 'Brasil' },
        { code: '1', name: 'Canada' },
        { code: '56', name: 'Chile' },
        { code: '57', name: 'Colombia' },
        { code: '593', name: 'Ecuador' },
        { code: '1', name: 'Estados Unidos' },
        { code: '52', name: 'Mexico' },
        { code: '595', name: 'Paraguay' },
        { code: '51', name: 'Peru' },
        { code: '598', name: 'Uruguay' },
        { code: '58', name: 'Venezuela' }
      ],
      flow: '',
      editError: '',
      text: false,
      loading: false,
      dialog: false,
      dialogCreate: false,
      search: '',
      fields: [
        {
          text: 'Nro.',
          value: 'id',
        },
        {
          text: 'Nombre del banco',
          value: 'acco_bankname',
        },
        {
          text: 'Número de cuenta',
          value: 'acco_numberaccount',
        },
        { text: 'Acción', value: 'action', sortable: false, align: 'right' },
      ],
      editedItem: {}
    }
  },
  created() {
    this.getAccounts()
  },
  methods: {
    async getAccounts() {
      let varToken = this.$session.get('tokenSession')
      this.config.headers.Authorization = 'Bearer ' + varToken

      this.bankAccounts = []
      let bankAccounts = [] 
      axios.get('https://auth.malllikeu.com/api/accounts', this.config)
        .then((response) => {
          this.bankAccounts = this.bankAccounts.concat(response.data)
          bankAccounts = bankAccounts.concat(response.data)
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
      this.dialogCreate = !this.dialogCreate
    },
    handleEdit(flow, item) {
      this.flow = flow
      this.editedItem = Object.assign(this.editedItem, item) || {}
      this.editError = ''
      // this.editedItem = item || {}
      this.dialog = !this.dialog
    },
    async saveItem(id, acco_name, acco_bankname, acco_numberaccount, acco_nameaccount, acco_phone, acco_email, country_code) {
      // let nAccount1 = parseInt(acco_numberaccount.substring(0,10))
      // let nAccount2 = parseInt(acco_numberaccount.substring(10,21))
      console.log('string length: ', Number(acco_numberaccount))
      axios.put('https://auth.malllikeu.com/api/accounts/' + id, {
          user_id: id,
          name: acco_name,
          bankname: acco_bankname,
          numberaccount: Number(acco_numberaccount),
          nameaccount: acco_nameaccount,
          phone: parseInt(country_code + acco_phone),          
          email: acco_email
        }, this.config)
        .then((response) => {
          console.log('RESPONSE: ', response.data)
          this.getAccounts()
          this.dialog = !this.dialog
        })
        .catch((error) => {
          console.log('RESPONSE: ', error.response)
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
        .delete('https://auth.malllikeu.com/api/accounts/' + id, this.config)
        .then((response) => {
          console.log('RESPONSE: ', response.data)
          this.getAccounts()
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
      this.user_id = this.$session.get('user_id')
      axios.post('https://auth.malllikeu.com/api/accounts', {
          user_id: this.user_id,
          name: this.acco_name,
          bankname: this.acco_bankname,
          numberaccount: parseInt(this.acco_numberaccount),
          nameaccount: this.acco_nameaccount,
          phone: parseInt(this.country_code + this.acco_phone),   
          email: this.acco_email
        }, this.config)
        .then((response) => {
          console.log('RESPONSE: ', response.data)
          this.getAccounts()
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
  },
}
</script>
