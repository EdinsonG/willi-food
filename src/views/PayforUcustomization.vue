<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Personalización de PayforU</h3>
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
              <v-dialog v-model="dialog" max-width="800px">
                <v-card>
                  <v-card-title color="primary">
                    <span v-if="editedItem.id && this.flow === 'edit'">Editar</span>
                    <span v-if="editedItem.id && this.flow === 'delete'">Eliminar cuenta {{editedItem.id}}</span>
                    <span v-if="this.flow === 'create'">Nueva cuenta </span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <div class="py-1 text-center blue-grey lighten-5">
                          <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Identificación</span>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                            <v-text-field v-model="editedItem.acco_name" label="URL" :rules="rules.acco_name" required type="text"
                              :disabled="this.flow === 'delete' || text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                            <v-text-field v-model="editedItem.acco_numberaccount" label="Nombre" :rules="rules.acco_numberaccount" required type="text" :disabled="this.flow === 'delete' || text"></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="py-1 text-center blue-grey lighten-5">
                            <span class="font-weight-medium text-h7 text-uppercase indigo--text text--darken-4" border="bottom">Imagen</span>
                        </div>
                        <v-row>
                          <v-col cols="12" sm="12">
                            <v-file-input
                            v-model="editedItem.stor_logo"
                            multiple
                            :rules="rules.logo"
                            accept="image/png, image/jpeg, image/gif"
                            prepend-icon="mdi-camera"
                            label="Imagen"
                            :disabled="this.flow === 'delete' || text"
                            show-size>
                            </v-file-input>
                          </v-col>

                          <v-col cols="12" sm="12">
                            <v-text-field v-model="editedItem.acco_name" label="Cover" :rules="rules.acco_name" required type="text"
                              :disabled="this.flow === 'delete' || text"></v-text-field>
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

              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="fields"
                :search="search"
                :items="purchaseOrders"
                class="elevation-1"
                item-key="name"
                loading="true"
                :sort-by="['id']"
                loading-text="Cargando... Por favor espere"
              >
                <template v-slot:[`item.details`]="{ item }">
                  <div class="text-truncate" style="width: 180px">{{item.Details}}</div>
                </template>
                <!-- <template v-slot:[`item.status_orde`]="{ item }">
                  <span v-if="item.orde_status === 'pending'">
                    <v-avatar left>
                      <v-icon :class="getColor(item.orde_status)">mdi-alert-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.status_orde }}
                  </span>
                  <span v-else-if="item.orde_status === 'to be approved'">
                    <v-avatar left>
                      <v-icon :class="getColor(item.orde_status)">mdi-minus-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.status_orde }}
                  </span>
                  <span v-else-if="item.orde_status === 'approved'">
                    <v-avatar left>
                      <v-icon :class="getColor(item.orde_status)">mdi-check-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.status_orde }}
                  </span>
                  <span v-else-if="item.orde_status === 'canceled'">
                    <v-avatar left>
                      <v-icon :class="getColor(item.orde_status)">mdi-close-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.status_orde }}
                  </span>
                </template>
                <template v-slot:item.url="{ item }">
                  <div class="text-truncate" style="width: 180px">
                    <a :href="item.URL" target="_new">{{item.URL}}</a>
                  </div>
                </template>-->
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
var config = {
  headers: {
    "Accept": 'application/json',
    "Authorization": ''
   }
}

import axios from 'axios'

const purchaseOrders = []

export default {
  data() {
    return {
      purchaseOrders: purchaseOrders,
      flow: '',
      search: '',

      id: '',
      stor_id: '',
      user_id: '',
      user_id2: '',
      stbr_id: '',
      curr_id: '',
      orde_date: '',
      orde_status: '',
      orde_subtotal: '',
      orde_tax: '',
      orde_deliverycost: '',
      orde_deliverytip: '',
      orde_discount: '',
      orde_total: '',
      orde_type: '',
      orde_deliverystatus: '',
      orde_deliverydate: '',
      orde_deliverynumber: '',
      orde_deliverycompany: '',
      orde_deliveryQR: '',
      orde_comment: '',

      isValidEdit: true,
      loading: false,
      dialog: false,
      status: false,
      ordedate: false,
      deliverydate: false,
      text: false,

      rules: {
        curr_id: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        date: [(v) => !!v || 'Este campo es requerido'],
        status: [(v) => !!v || 'Este campo es requerido'],
        subtotal: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        tax: [(v) => !!v || 'Este campo es requerido', (v) => !isNaN(Number(v)) || 'Este campo solo permite números'],
        deliverycost: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        deliverytip: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        discount: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        total: [(v) => !!v || 'Este campo es requerido', (v) => !isNaN(Number(v)) || 'Este campo solo permite números'],
        type: [(v) => !!v || 'Este campo es requerido'],
        deliverystatus: [(v) => !!v || 'Este campo es requerido'],
        deliverydate: [(v) => !!v || 'Este campo es requerido'],
        deliverynumber: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        deliverycompany: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 100 || 'El campo debe tener menos de 100 caracteres.',
        ],
        deliveryQR: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        comment: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
      },
      selectEstatus: [
        { code: 'pending', name: 'Pendiente' },
        { code: 'to be approved', name: 'Para ser aprobado' },
        { code: 'approved', name: 'Aprobado' },
        { code: 'canceled', name: 'Cancelado' },
      ],
      selectTypeOrder: [
        { code: 'pickup', name: 'Retiro' },
        { code: 'delivery', name: 'Entrega' },
      ],
      selectDeliveryStatus: [
        { code: 'to attend', name: 'Para asistir' },
        { code: 'attended', name: 'Atendido' },
        { code: 'to send', name: 'Para enviar' },
        { code: 'sent', name: 'Enviado' },
        { code: 'delivered', name: 'Entregado' },
      ],
      fields: [
        {
          text: 'Nro',
          value: 'payforuform[0].id',
        },
        {
          text: 'URL',
          value: 'payforuform[0].form_url',
        },
        {
          text: 'Nombre',
          value: 'payforuform[0].form_name',
        },
        {
          text: 'Imagen',
          value: 'payforuform[0].image',
        },
        {
          text: 'Estatus',
          value: 'status_orde',
        },
        
        { text: 'Acción', value: 'action', sortable: false, align: 'right' },
      ],
      editedItem: {},
      viewItem: {},
      userId: this.$session.get('user_id')
    }
  },
  created() {
    this.getPurchaseOrders()
  },
  methods: {
    async getPurchaseOrders() {
      let varToken = this.$session.get('tokenSession')
      config.headers.Authorization = 'Bearer ' + varToken

      let userId = this.$session.get('user_id')
      console.log(userId);
      this.purchaseOrders = []
      let purchaseOrders = [] 
      axios
        .get('https://cartqa.likeugroup.com/api/payforu-form', config)
        .then((response) => {
          console.log(response.data);
          this.purchaseOrders = this.purchaseOrders.concat(response.data)
          purchaseOrders = purchaseOrders.concat(response.data)
          console.log(response.data);
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

    handleEdit(flow, item) {
      this.flow = flow
      this.editedItem = Object.assign(this.editedItem, item) || {}
      // this.editedItem = item || {}
      this.dialog = !this.dialog
    },

    async saveItem(
      id,
      stor_id,
      user_id,
      user_id2,
      stbr_id,
      curr_id,
      orde_date,
      orde_status,
      orde_subtotal,
      orde_tax,
      orde_deliverycost,
      orde_deliverytip,
      orde_discount,
      orde_total,
      orde_type,
      orde_deliverystatus,
      orde_deliverydate,
      orde_deliverynumber,
      orde_deliverycompany,
      orde_deliveryQR,
      orde_comment
    ) {
      axios
        .put('http://store.malllikeu.com/api/orders/' + id, {
          stor_id: stor_id,
          user_id: user_id,
          user_id2: user_id2,
          stbr_id: stbr_id,
          curr_id: curr_id,
          date: orde_date,
          status: orde_status,
          subtotal: orde_subtotal,
          tax: orde_tax,
          deliverycost: orde_deliverycost,
          deliverytip: orde_deliverytip,
          discount: orde_discount,
          total: orde_total,
          type: orde_type,
          deliverystatus: orde_deliverystatus,
          deliverydate: orde_deliverydate,
          deliverynumber: orde_deliverynumber,
          deliverycompany: orde_deliverycompany,
          deliveryQR: orde_deliveryQR,
          comment: orde_comment,
        })
        .then((response) => {
          console.log('RESPONSE: ', response.data.message)
          this.getPurchaseOrders()
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
    getColor(status_orde) {
      if (status_orde == 'pending') return 'orange--text'
      else if (status_orde == 'to be approved') return 'purple--text'
      else if (status_orde == 'canceled') return 'pink--text'
      else return 'green--text'
    },
  },
}
</script>
