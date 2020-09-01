<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Mis Productos</h3>
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
                    >Editar producto {{editedItem.id}}</span>
                    <span
                      v-if="editedItem.id && this.flow === 'delete'"
                    >Eliminar producto {{editedItem.id}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <v-row>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.depa_id"
                            label="Depa_id"
                            :rules="rules.depa"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.prod_number"
                            label="Número de producto"
                            :rules="rules.prod_number"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="editedItem.prod_name"
                            label="Nombre del producto"
                            :rules="rules.prod_name"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.prod_description"
                            label="Descripción"
                            :rules="rules.prod_description"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.prod_outstanding"
                            label="Outstanding"
                            :rules="rules.prod_outstanding"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="editedItem.prod_quantityavailable"
                            label="Cantidad disponible"
                            :rules="rules.prod_quantityavailable"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="editedItem.prod_unitcost"
                            label="Costo unitario"
                            :rules="rules.prod_unitcost"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="editedItem.prod_condition"
                            label="Condición de producto"
                            :rules="rules.prod_condition"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.prod_warranty"
                            label="Garantía"
                            :rules="rules.prod_warranty"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-switch
                            v-model="editedItem.prod_status"
                            :label="'Estatus: ' + this.prod_status"
                            :rules="rules.status"
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.prod_status, 'active')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="editedItem.prod_topost"
                            label="Topost"
                            :rules="rules.prod_topost"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.prod_long"
                            label="Longitud"
                            :rules="rules.prod_long"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.prod_width"
                            label="Width"
                            :rules="rules.prod_width"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.prod_high"
                            label="Altura"
                            :rules="rules.prod_high"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.prod_weight"
                            label="Peso"
                            :rules="rules.prod_weight"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text flat @click="handleEdit()" :disabled="text">Cancelar</v-btn>
                    <v-btn
                      color="red--text lighten-5"
                      v-if="this.flow === 'delete'"
                      flat
                      @click="deleteItem(editedItem.id)"
                    >Eliminar</v-btn>
                    <v-btn
                      color="primary"
                      text
                      v-if="this.flow === 'edit'"
                      flat
                      @click="saveItem(editedItem.id,editedItem.stbr_id, editedItem.stor_id, editedItem.depa_id, editedItem.prod_number, editedItem.prod_name, editedItem.prod_description, editedItem.prod_outstanding, editedItem.prod_quantityavailable, editedItem.prod_unitcost, editedItem.prod_condition, editedItem.prod_warranty, editedItem.prod_status, editedItem.prod_topost, editedItem.prod_long, editedItem.prod_width, editedItem.prod_high, editedItem.prod_weight)"
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
                :items="productsOffices"
                class="elevation-1"
                item-key="name"
                loading="true"
                loading-text="Cargando... Por favor espere"
                :sort-by="['id']"
              >
                <template v-slot:[`item.status_prod`]="{ item }">
                  <span v-if="item.prod_status === 'selled'">
                    <v-avatar left>
                      <v-icon :class="getColor(item.prod_status)">mdi-close-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.status_prod }}
                  </span>
                  <span v-else-if="item.prod_status === 'available'">
                    <v-avatar left>
                      <v-icon :class="getColor(item.prod_status)">mdi-check-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.status_prod }}
                  </span>
                </template>
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

const productsOffices = []

export default {
  data() {
    return {
      flow: '',
      productsOffices: productsOffices,
      stbr_id: '',
      stor_id: '',
      depa_id: '',
      prod_number: '',
      prod_name: '',
      prod_description: '',
      prod_outstanding: '',
      prod_quantityavailable: '',
      prod_unitcost: '',
      prod_condition: '',
      prod_warranty: '',
      prod_status: '',
      prod_topost: '',
      prod_long: '',
      prod_width: '',
      prod_high: '',
      prod_weight: '',
      isValidEdit: true,
      rules: {
        stbr: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        stor: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        depa: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        prod_number: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        prod_name: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        prod_description: [(v) => !!v || 'Este campo es requerido'],
        prod_outstanding: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        prod_quantityavailable: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        prod_unitcost: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        prod_condition: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        prod_warranty: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        prod_status: [
          // v => !!v || 'Este campo es requerido',
        ],
        prod_topost: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        prod_long: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        prod_width: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        prod_high: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
        prod_weight: [
          (v) => !!v || 'Este campo es requerido',
          (v) => !isNaN(Number(v)) || 'Este campo solo permite números',
        ],
      },
      loading: false,
      dialog: false,
      text: false,
      search: '',
      status: false,
      fields: [
        {
          text: 'Nro',
          value: 'id',
        },
        {
          text: 'Nombre',
          value: 'prod_name',
        },
        {
          text: 'Costo',
          value: 'prod_unitcost',
        },
        {
          text: 'Estatus',
          value: 'status_prod',
        },
        { text: 'Acción', value: 'action', align: 'right' },
      ],
      editedItem: {},
      basic: {
        headers: [
          {
            text: 'Id',
            value: 'id',
          },
          {
            text: 'Nombre',
            value: 'name_product',
          },
          {
            text: 'Costo',
            value: 'cost',
          },
          {
            text: 'Estatus',
            value: 'status',
          },
          { text: 'Acción', value: 'action', align: 'right' },
        ],
      },
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      axios
        .get('http://store.malllikeu.com/api/products')
        .then((response) => {
          this.productsOffices = response.data.products.data
          let productsOffices = response.data.products.data
          productsOffices.map(function(x) {
            let langType
            switch (x.prod_status) {
              case 'selled':
                langType = 'Agotado'
                break
              default:
                langType = 'Disponible'
                break
            }
            x.status_prod = langType
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
    async deleteItem(id) {
      axios
        .delete('http://store.malllikeu.com/api/products/' + id)
        .then((response) => {
          console.log('RESPONSE: ', response.data.message)
          this.getProducts()
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
    handleEdit(flow, item) {
      this.flow = flow
      this.editedItem = Object.assign(this.editedItem, item) || {}
      console.log(this.editedItem)
      this.prod_status = this.editedItem.prod_status === 'available' ? 'Disponible' : 'Agotado'
      this.editedItem.prod_status = this.editedItem.prod_status === 'available' ? true : false
      // this.editedItem = item || {}
      this.dialog = !this.dialog
    },
    async saveItem(
      id,
      stbr_id,
      stor_id,
      depa_id,
      prod_number,
      prod_name,
      prod_description,
      prod_outstanding,
      prod_quantityavailable,
      prod_unitcost,
      prod_condition,
      prod_warranty,
      prod_status,
      prod_topost,
      prod_long,
      prod_width,
      prod_high,
      prod_weight
    ) {
      var prodstatus = prod_status === true ? 'available' : 'selled'
      axios.put('http://store.malllikeu.com/api/products/' + id, {
          stbr_id: stbr_id,
          stor_id: stor_id,
          depa_id: depa_id,
          number: prod_number,
          name: prod_name,
          description: prod_description,
          outstanding: prod_outstanding,
          quantityavailable: prod_quantityavailable,
          unitcost: prod_unitcost,
          condition: prod_condition,
          warranty: prod_warranty,
          status: prodstatus,
          topost: prod_topost,
          long: prod_long,
          width: prod_width,
          high: prod_high,
          weight: prod_weight,
        })
        .then((response) => {
          console.log('RESPONSE: ', response.data.message)
          this.getProducts()
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
    async changeSwitch(swt) {
      this.prod_status = swt === true ? 'Disponible' :  'Agotado'
    },
    getColor(product_order) {
      if (product_order == 'selled') return 'pink--text'
      else return 'green--text'
    },
  },
}
</script>
