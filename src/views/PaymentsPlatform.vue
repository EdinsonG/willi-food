<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Pagos por plataforma</h3>
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
              <v-dialog v-model="dialogView" max-width="800px">
                <v-card>
                  <v-card-title color="primary">
                    <span
                      v-if="viewItem.orde_deliverynumber && this.flow === 'view'"
                    >Ver orden: {{viewItem.orde_deliverynumber}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <v-row>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Moneda de venta</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.curr_id}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Fecha de orden</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_date}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Estatus</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.status_orde}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Subtotal</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_subtotal}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>IVA</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_tax}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Costo de la entrega</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_deliverycost}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Propina</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_deliverytip}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Descuento</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_discount}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Total</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_total}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Tipo de orden</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.type_orde}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Estatus de la entrega</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.deliverystatus_orde}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Fecha de la entrega</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_deliverydate}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Número de la entrega</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_deliverynumber}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Compañia de entrega</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_deliverycompany}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>QR de la entrega</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_deliveryQR}}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <div class="v-list-item__content pb-0 font-weight-black">
                            <span>Comentario</span>
                          </div>
                          <div class="v-list-item__content">
                            <div class="v-list-item__title">{{viewItem.orde_comment}}</div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="handleView()" :disabled="text">Cerrar</v-btn>
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
                :items="payments"
                class="elevation-1"
                item-key="name"
                loading="true"
                :sort-by="['id']"
                loading-text="Cargando... Por favor espere"
              >
                <template v-slot:[`item.details`]="{ item }">
                  <div class="text-truncate" style="width: 180px">{{item.Details}}</div>
                </template>
                <template v-slot:[`item.status_orde`]="{ item }">
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

                <!-- <template v-slot:item.url="{ item }">
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
                    color="indigo"
                    small
                    @click="handleView('view', item)"
                  >
                    <v-icon>remove_red_eye</v-icon>
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
     "Authorization": ''
   }
}

import axios from 'axios'

const payments = []

export default {
  data() {
    return {
      payments: payments,
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
      dialogView: false,
      loading: false,
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
          value: 'id',
        },
        {
          text: 'Servicio',
          value: 'orde_date',
        },
        {
          text: 'Fecha',
          value: 'status_orde',
        },
        {
          text: 'Metodo',
          value: 'orde_total',
        },
        {
          text: 'Ref',
          value: 'orde_total',
        },
        {
          text: 'Estatus',
          value: 'orde_total',
        },
        {
          text: 'Monto',
          align: 'right',
          value: 'orde_total',
        },
      ],
      editedItem: {},
      viewItem: {},
      userId: this.$session.get('user_id'),
    }
  },
  created() {
    this.getPayments()
  },
  methods: {
    async getPayments() {
      let varToken = this.$session.get('tokenSession')
      console.log(varToken);
      config.headers.Authorization = 'Bearer ' + varToken

      let userId = this.$session.get('user_id')
      console.log(userId);
      this.payments = []
      let payments = []
      axios
        .get('http://store.malllikeu.com/api/orders/' + userId)
        .then((response) => {
          console.log(response.data);
          this.payments = this.payments.concat(response.data)
          payments = payments.concat(response.data)
          payments.map(function(x) {
            let langOrder
            let langTypeOrder
            let langDeliveryStatus
            switch (x.orde_status) {
              case 'pending':
                langOrder = 'Pendiente'
                break
              case 'to be approved':
                langOrder = 'Para ser aprobado'
                break
              case 'approved':
                langOrder = 'Aprobado'
                break
              case 'canceled':
                langOrder = 'Cancelado'
                break
            }
            switch (x.orde_type) {
              case 'pickup':
                langTypeOrder = 'Retiro'
                break
              case 'delivery':
                langTypeOrder = 'Entrega'
                break
            }
            switch (x.orde_deliverystatus) {
              case 'to attend':
                langDeliveryStatus = 'Para asistir'
                break
              case 'attended':
                langDeliveryStatus = 'Atendido'
                break
              case 'to send':
                langDeliveryStatus = 'Para enviar'
                break
              case 'sent':
                langDeliveryStatus = 'Enviado'
                break
              case 'delivered':
                langDeliveryStatus = 'Entregado'
                break
            }
            x.status_orde = langOrder
            x.type_orde = langTypeOrder
            x.deliverystatus_orde = langDeliveryStatus
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
    handleView(flow, item) {
      this.flow = flow
      this.viewItem = Object.assign(this.viewItem, item) || {}
      // this.editedItem = item || {}
      this.dialogView = !this.dialogView
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
