<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Órdenes de compra</h3>
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
                            <span>orde_deliverytip</span>
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
                    <v-btn color="grey" text flat @click="handleView()" :disabled="text">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="800px">
                <!-- <template v-slot:activator="{ on }">
                  <div class="d-flex">
                    <v-btn color="primary" dark class="ml-auto ma-3" v-on="on">
                      <v-icon left>add</v-icon>Nueva
                    </v-btn>
                  </div>
                </template>-->
                <v-card>
                  <v-card-title color="primary">
                    <span
                      v-if="editedItem.id && this.flow === 'edit'"
                    >Editar orden: {{editedItem.id}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <v-row>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.curr_id"
                            label="Moneda de venta"
                            :rules="rules.curr_id"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-menu
                            v-model="ordedate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.orde_date"
                                label="Fecha de orden"
                                prepend-icon="event"
                                :rules="rules.date"
                                readonly
                                required
                                v-bind="attrs"
                                v-on="on"
                                :disabled="text"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.orde_date"
                              locale="es-es"
                              @input="ordedate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-select
                            v-model="editedItem.orde_status"
                            :items="selectEstatus"
                            item-text="name"
                            item-value="code"
                            label="Estatus"
                            :rules="rules.status"
                            required
                            :disabled="text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.orde_subtotal"
                            label="Subtotal"
                            :rules="rules.subtotal"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.orde_tax"
                            label="IVA"
                            :rules="rules.tax"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.orde_deliverycost"
                            label="Costo de la entrega"
                            :rules="rules.deliverycost"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.orde_deliverytip"
                            label="Propina"
                            :rules="rules.deliverytip"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.orde_discount"
                            label="Descuento"
                            :rules="rules.discount"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.orde_total"
                            label="Total"
                            :rules="rules.total"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-select
                            v-model="editedItem.orde_type"
                            :items="selectTypeOrder"
                            item-text="name"
                            item-value="code"
                            label="Tipo de orden"
                            :rules="rules.type"
                            required
                            :disabled="text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-select
                            v-model="editedItem.orde_deliverystatus"
                            :items="selectDeliveryStatus"
                            item-text="name"
                            item-value="code"
                            label="Estatus de la entrega"
                            :rules="rules.deliverystatus"
                            required
                            :disabled="text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-menu
                            v-model="deliverydate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.orde_deliverydate"
                                label="Fecha de la entrega"
                                :rules="rules.deliverydate"
                                prepend-icon="event"
                                readonly
                                required
                                v-bind="attrs"
                                v-on="on"
                                :disabled="text"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.orde_deliverydate"
                              locale="es-es"
                              @input="deliverydate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.orde_deliverynumber"
                            label="Número de la entrega"
                            :rules="rules.deliverynumber"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="9">
                          <v-text-field
                            v-model="editedItem.orde_deliverycompany"
                            label="Compañia de entrega"
                            :rules="rules.deliverycompany"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.orde_deliveryQR"
                            label="QR de la entrega"
                            :rules="rules.deliveryQR"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.orde_comment"
                            label="Comentario"
                            :rules="rules.comment"
                            required
                            type="text"
                            :disabled="text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text flat @click="handleEdit()" :disabled="text">Cancelar</v-btn>
                    <v-btn
                      color="primary"
                      text
                      v-if="this.flow === 'edit'"
                      flat
                      @click="saveItem(editedItem.id,editedItem.user_id,editedItem.user_id2,editedItem.stbr_id,editedItem.stor_id,editedItem.curr_id,editedItem.orde_date,editedItem.orde_status,editedItem.orde_subtotal,editedItem.orde_tax,editedItem.orde_deliverycost,editedItem.orde_deliverytip,editedItem.orde_discount,editedItem.orde_total,editedItem.orde_type,editedItem.orde_deliverystatus,editedItem.orde_deliverydate,editedItem.orde_deliverynumber,editedItem.orde_deliverycompany,editedItem.orde_deliveryQR,editedItem.orde_comment,)"
                      :disabled="!isValidEdit"
                      :loading="loading"
                    >Guardar</v-btn>
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
                <template v-slot:item.details="{ item }">
                  <div class="text-truncate" style="width: 180px">{{item.Details}}</div>
                </template>
                <template v-slot:item.status_orde="{ item }">
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
                <template v-slot:item.action="{ item }">
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
      dialogView: false,
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
          value: 'id',
        },
        {
          text: 'Fecha',
          value: 'orde_date',
        },
        {
          text: 'Estatus',
          value: 'status_orde',
        },
        {
          text: 'Total',
          value: 'orde_total',
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
      let userId = this.$session.get('user_id')
      this.purchaseOrders = []
      let purchaseOrders = [] 
      axios
        .get('http://store.malllikeu.com/api/orders/' + userId)
        .then((response) => {
          this.purchaseOrders = this.purchaseOrders.concat(response.data.order)
          purchaseOrders = purchaseOrders.concat(response.data.order)
          purchaseOrders.map(function(x) {
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
