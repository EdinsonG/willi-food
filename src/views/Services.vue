<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Servicios</h3>
        </v-flex>
        <v-flex lg12 class="d-print-none">
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
              <v-dialog v-model="dialogView" max-width="1200px">
                <v-card class="px-3">
                  <v-card-title color="primary">
                    <span
                      v-if="viewItem.orde_deliverynumber && this.flow === 'view'"
                    >Ver orden: {{viewItem.orde_deliverynumber}}</span>
                  </v-card-title>
                  <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                    flat
                  >
                    <v-icon>mdi-silverware</v-icon>
                    <v-toolbar-title>Factura</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <a href="javascript:window.print()"  id="print-button" class="d-print-none"><v-btn
                      class="grey--text"
                      color="white darken-1"
                      depressed
                    >
                      Imprimir
                      <v-icon right>mdi-printer</v-icon>
                    </v-btn></a>
                  </v-toolbar>
                  
                  <v-divider></v-divider>

                  <v-container class="white lighten-5 utility-bill">
                    <v-row no-gutters>
                      <v-col cols="12" sm="6" >
                        <v-simple-table class="border-table-gray">
                          <template v-slot:default>
                            <tbody >
                              <tr>
                                <td class="font-weight-medium col-1" lg="2">Plataforma:</td>
                                <td>Lorem Ipsum</td>
                              </tr>
                              <tr>
                                <td class="font-weight-medium ">Cliente:</td>
                                <td></td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col cols="12" sm="4">
                        <v-simple-table class="border-table-gray">
                          <template v-slot:default>
                            <tbody >
                              <tr>
                                <td class="font-weight-medium col-1">Fecha:</td>
                                <td>{{viewItem.invoice.invo_date}}</td>
                              </tr>
                              <tr>
                                <td class="font-weight-medium">Nro. Orden:</td>
                                <td>{{viewItem.invoice.order_id}}</td>
                              </tr>
                              <tr>
                                <td class="font-weight-medium">Estatus:</td>
                                <td>{{viewItem.status_orde}}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="d-flex align-center">
                      <v-col cols="12" sm="6" class="border-table-gray">
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody >
                              <tr>
                                <td class="font-weight-medium col-5">Facturación #:</td>
                                <td>Lorem Ipsum</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        <v-simple-table class="border-top-gray">
                          <template v-slot:default>
                            <tbody >
                              <tr>
                                <td class="font-weight-medium ">Período de facturación</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        <v-simple-table class="border-top-gray">
                          <template v-slot:default>
                            <tbody >
                              <tr>
                                <td class="font-weight-medium col-1">Inicia:</td>
                                <td>{{viewItem.invoice.invo_stardate}}</td>
                                <td class="font-weight-medium col-1">Finaliza:</td>
                                <td>{{viewItem.invoice.invo_enddate}}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-container>

                  <v-container class="white lighten-5 utility-bill">
                    <v-row no-gutters>
                      <v-col cols="12" sm="12">
                        <v-simple-table class="border-table-gray">
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left col-1">Item</th>
                                <th class="text-left">Descripción</th>
                                <th class="text-left col-1">Cantidad</th>
                                <th class="text-left col-2">Subtotal</th>
                                <th class="text-left col-2">Total</th>
                              </tr>
                              </thead>
                            <tbody >
                              <tr>
                                <td>{{viewItem.invoice.order.items[0].id}}</td>
                                <td>Lorem Ipsum</td>
                                <td>{{viewItem.invoice.order.items[0].item_quantity}}</td>
                                <td>{{viewItem.invoice.order.items[0].item_price}}</td>
                                <td>{{viewItem.invoice.order.items[0].item_price}}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-container class="white lighten-5 px-5">
                    <v-row no-gutters>
                      <v-col cols="12" sm="6" >
                        <div class="font-weight-medium">Comentarios</div>
                        <p class="grey--text text-caption border-top-gray pt-5">Ninguno</p>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col cols="12" sm="4" class="utility-bill">
                        <v-simple-table class="border-table-gray">
                          <template v-slot:default>
                            <tbody >
                              <tr>
                                <td class="font-weight-medium">Subtotal:</td>
                                <td>{{viewItem.invoice.invo_subtotal}}</td>
                              </tr>
                              <tr>
                                <td class="font-weight-medium">Impuesto:</td>
                                <td>{{viewItem.invoice.invo_tax}}</td>
                              </tr>
                              <tr>
                                <td class="font-weight-medium">Descuento:</td>
                                <td>{{viewItem.invoice.invo_discount}}</td>
                              </tr>
                              <tr>
                                <td class="font-weight-medium">Total:</td>
                                <td>{{viewItem.invoice.invo_total}}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
                  <v-card-actions class="d-print-none">
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
            <v-card-text class="pa-0 d-print-none">
              <v-data-table
                :headers="fields"
                :search="search"
                :items="services"
                class="elevation-1 d-print-none"
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
    "Accept": 'application/json',
    "Authorization": ''
   }
}
import axios from 'axios'

const services = []

export default {
  data() {
    return {
      services: services,
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
      invoice: '',
      invo_comments: '',

      isValidEdit: true,
      dialogView: false,
      loading: false,
      dialog: false,
      status: false,
      ordedate: false,
      deliverydate: false,
      text: false,
      
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
          value: 'invoice.order_id',
        },
        {
          text: 'Plataforma',
          value: 'plat_name',
        },
        {
          text: 'Estatus',
          value: 'status_orde',
        },
        {
          text: 'Inicio',
          value: 'invoice.invo_stardate',
        },
        {
          text: 'Fin',
          value: 'invoice.invo_enddate',
        },
        { text: 'Acción', value: 'action', sortable: false, align: 'right' },
      ],
      editedItem: {},
      viewItem: {},
      userId: this.$session.get('user_id')
    }
  },
  created() {
    this.getServices()
  },
  methods: {
    async getServices() {
      let varToken = this.$session.get('tokenSession')
      config.headers.Authorization = 'Bearer ' + varToken
      
      let userId = this.$session.get('user_id')
      this.services = []
      let services = [] 
      axios
        .get('https://cartqa.likeugroup.com/api/order-detail/invoice/' + userId, config)
        .then((response) => {
          this.services = this.services.concat(response.data)
          console.log(response.data);
          services = services.concat(response.data)
          services.map(function(x) {
            let langOrder
            switch (x.invoice.order.orde_status) {
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
            x.status_orde = langOrder
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
