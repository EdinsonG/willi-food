<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Mis tiendas</h3>
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
                      v-if="editedItem.stor_name && this.flow === 'edit'"
                    >Editar tienda: {{editedItem.stor_name}}</span>
                    <span
                      v-if="editedItem.stor_name && this.flow === 'delete'"
                    >Eliminar tienda: {{editedItem.stor_name}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="isValidEdit">
                      <v-row>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.curr_id"
                            label="Modeda de venta"
                            :rules="rules.curr_id"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-text-field
                            v-model="editedItem.stor_name"
                            label="Nombre"
                            :rules="rules.name"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <!-- <v-file-input
                            v-model="editedItem.stor_logo"
                            multiple
                            :rules="rules.logo"
                            accept="image/png, image/jpeg, image/gif"
                            prepend-icon="mdi-camera"
                            label="Logo"
                            :disabled="this.flow === 'delete' || text"
                            show-size
                          ></v-file-input>-->
                          <v-text-field
                            v-model="editedItem.stor_logo"
                            label="Logo"
                            :rules="rules.logo"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="editedItem.stor_description"
                            label="Descripción"
                            :rules="rules.description"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-switch
                            v-model="editedItem.stor_outstanding"
                            :label="'Destacada: ' + this.stor_outstanding"
                            :rules="rules.outstanding"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.stor_outstanding, 'outstanding')"
                          ></v-switch>

                          <!-- <template>
                          <v-row>
                            <v-switch v-model="editedItem.stor_outstanding" label="Destacada: "></v-switch>
                            <span hint="I am hint" persistent-hint :messages="messages"> </span>
                          </v-row>
                          </template>-->

                          <!-- <span>Destacada:</span>
                          <v-switch v-model="editedItem.stor_outstanding" label="" :rules="rules.outstanding" required type="text" :disabled="this.flow === 'delete' || text">
                            <template #prepend>
                              <v-label>Off</v-label>
                     
                            <template #append>
                              <v-label>On</v-label>
                            </template>
                          </v-switch>

                          <v-switch v-model="editedItem.stor_outstanding" :label="`Destacada: ${stor_outstanding.toString()}`" :rules="rules.outstanding" required type="text" :disabled="this.flow === 'delete' || text"></v-switch>-->
                        </v-col>
                        <v-col cols="12" sm="5">
                          <v-switch
                            v-model="editedItem.stor_typepublication"
                            :label="'Tipo de publicación: ' + this.stor_typepublication"
                            :rules="rules.typepublication"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.stor_typepublication, 'typepublication')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="4 ">
                          <v-select
                            v-model="editedItem.stor_typestore"
                            :items="selectTypeStore"
                            item-text="name"
                            item-value="code"
                            label="Tipo de tienda"
                            :rules="rules.typestore"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-switch
                            v-model="editedItem.stor_pickup"
                            :label="'Retiro: ' + this.stor_pickup"
                            :rules="rules.pickup"
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.stor_pickup, 'pickup')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-select
                            v-model="editedItem.stor_delivery"
                            :items="selectDelivery"
                            item-text="name"
                            item-value="code"
                            label="Entrega"
                            :rules="rules.delivery"
                            required
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-switch
                            v-model="editedItem.stor_supervision"
                            :label="'Supervisión: ' + this.stor_supervision"
                            :rules="rules.supervision"
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.stor_supervision, 'supervision')"
                          ></v-switch>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-switch
                            v-model="editedItem.stor_active"
                            :label="'Estatus: ' + this.stor_active"
                            :rules="rules.prod_active"
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                            @change="changeSwitch(editedItem.stor_active, 'active')"
                          ></v-switch>
                          <!-- ${editedItem.prod_status.toString()}`-->
                        </v-col>
                        <v-col cols="12" sm="12">
                          <span>Color</span>
                          <v-color-picker
                            width="900"
                            hide-mode-switch
                            :mode.sync="mode"
                            v-model="editedItem.stor_color"
                            label="Color"
                            :rules="rules.color"
                            type="text"
                            :disabled="this.flow === 'delete' || text"
                          ></v-color-picker>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <!-- <v-file-input
                            v-model="editedItem.stor_document"
                            multiple
                            :rules="rules.document"
                            accept=".pdf"
                            prepend-icon="picture_as_pdf"
                            label="Documento"
                            :disabled="this.flow === 'delete' || text"
                            show-size
                          ></v-file-input>-->

                          <v-text-field
                            v-model="editedItem.stor_document"
                            label="Documento"
                            :rules="rules.document"
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
                      @click="saveItem(editedItem.id, editedItem.user_id, editedItem.curr_id, editedItem.stor_name, editedItem.stor_logo, editedItem.stor_description, editedItem.stor_outstanding, editedItem.stor_typepublication, editedItem.stor_typestore, editedItem.stor_pickup, editedItem.stor_delivery, editedItem.stor_supervision, editedItem.stor_active, editedItem.stor_color, editedItem.stor_document,)"
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
                :items="myStores"
                class="elevation-1"
                item-key="name"
                loading="true"
                :sort-by="['id']"
                loading-text="Cargando... Por favor espere"
              >
                <template v-slot:item.details="{ item }">
                  <div class="text-truncate" style="width: 180px">{{item.Details}}</div>
                </template>

                <template v-slot:item.active_store="{ item }">
                  <span v-if="item.stor_active === false">
                    <v-avatar left>
                      <v-icon :class="getColor(item.stor_active)">mdi-minus-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.active_store }}
                  </span>
                  <span v-else-if="item.stor_active === true">
                    <v-avatar left>
                      <v-icon :class="getColor(item.stor_active)">mdi-check-circle-outline</v-icon>
                    </v-avatar>
                    {{ item.active_store }}
                  </span>
                </template>
                <!-- <template v-slot:item.url="{ item }">
                  <div class="text-truncate" style="width: 180px">
                    <a :href="item.URL" target="_new">{{item.URL}}</a>
                  </div>
                </template>-->
                <template #item.url="{ item }">
                  <a href="#" @click="storeBranches(item.user_id)">
                    <v-icon>store</v-icon>Sucursales asociadas
                  </a>
                </template>
                <template v-slot:item.action="{ item }">
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

const myStores = []

export default {
  data() {
    return {
      flow: '',
      myStores: myStores,
      id: '',
      user_id: '',
      curr_id: '',
      stor_name: '',
      stor_logo: '',
      stor_description: '',
      stor_outstanding: true,
      stor_typepublication: '',
      stor_typestore: null,
      stor_pickup: '',
      stor_delivery: '',
      stor_supervision: '',
      stor_active: '',
      stor_color: '',
      stor_document: '',
      isValidEdit: true,
      rules: {
        curr_id: [
          (v) => !!v || 'Este campo es requerido',
          (v) => Number.isInteger(Number(v)) || 'Este campo solo permite números',
        ],
        name: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        logo: [
          (v) => !!v || 'Este campo es requerido',
          (v) => (v && v.length > 0) || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        description: [
          (v) => !!v || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
        // outstanding: [
        //   v => !!v || 'Este campo es requerido',
        // ],
        // typepublication: [
        //   v => !!v || 'Este campo es requerido',
        // ],
        typestore: [(v) => !!v || 'Este campo es requerido'],
        // pickup: [
        //   v => !!v || 'Este campo es requerido',
        // ],
        delivery: [(v) => !!v || 'Este campo es requerido'],
        // supervision: [
        //   v => !!v || 'Este campo es requerido',
        // ],
        // prod_active: [
        //   v => !!v || 'Este campo es requerido',
        // ],
        color: [(v) => v.length <= 50 || 'El campo debe tener menos de 50 caracteres.'],
        document: [
          (v) => !!v || 'Este campo es requerido',
          (v) => (v && v.length > 0) || 'Este campo es requerido',
          (v) => v.length <= 255 || 'El campo debe tener menos de 255 caracteres.',
        ],
      },
      mode: 'hexa',
      modes: ['hexa'],
      selectDelivery: [
        { code: 'p', name: 'Propio' },
        { code: 'e', name: 'Externo' },
        { code: 'a', name: 'Ambos' },
      ],
      selectTypeStore: [
        { code: 't', name: 'Transable' },
        { code: 'c', name: 'Cotización' },
      ],
      loading: false,
      dialog: false,
      text: false,
      search: '',
      status: false,
      alert: false,
      fields: [
        {
          text: 'Nombre',
          value: 'stor_name',
        },
        {
          text: 'Estatus',
          value: 'active_store',
        },
        {
          text: 'Sucursales',
          value: 'url',
        },
        { text: 'Acción', value: 'action', sortable: false, align: 'right' },
      ],
      editedItem: {},
    }
  },
  created() {
    this.getStores()
  },
  methods: {
    async getStores() {
      let userId = this.$session.get('user_id')
      this.myStores = []
      let myStores = [] 
      axios
        .get('http://store.malllikeu.com/api/stores/' + userId)
        .then((response) => {
          this.myStores = this.myStores.concat(response.data.store)
          myStores = myStores.concat(response.data.store)
          myStores.map(function(x) {
            let langType
            switch (x.stor_active) {
              case true:
                langType = 'Activo'
                break
              default:
                langType = 'Inactivo'
                break
            }
            x.active_store = langType
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
        .delete('http://store.malllikeu.com/api/stores/' + id)
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
    handleEdit(flow, item) {
      this.flow = flow
      this.editedItem = Object.assign(this.editedItem, item) || {}
      this.stor_outstanding = this.editedItem.stor_outstanding === true ? 'Si' : 'No'
      this.stor_typepublication = this.editedItem.stor_typepublication === true ? 'Orgánica' : 'Privada'
      this.stor_pickup = this.editedItem.stor_pickup === true ? 'Si' : 'No'
      this.stor_supervision = this.editedItem.stor_supervision === true ? 'Si' : 'No'
      this.stor_active = this.editedItem.stor_active === true ? 'Activo' : 'Inactivo'
      // this.editedItem = item || {}
      this.dialog = !this.dialog
    },
    async saveItem(
      id,
      user_id,
      curr_id,
      stor_name,
      stor_logo,
      stor_description,
      stor_outstanding,
      stor_typepublication,
      stor_typestore,
      stor_pickup,
      stor_delivery,
      stor_supervision,
      stor_active,
      stor_color,
      stor_document
    ) {
      let typepublication = stor_typepublication === true ? 'open' : 'close'
      axios
        .put('http://store.malllikeu.com/api/stores/' + id, {
          user_id: user_id,
          curr_id: curr_id,
          name: stor_name,
          logo: stor_logo,
          description: stor_description,
          outstanding: stor_outstanding,
          typepublication: typepublication,
          typestore: stor_typestore,
          pickup: stor_pickup,
          delivery: stor_delivery,
          supervision: stor_supervision,
          active: stor_active,
          color: stor_color,
          document: stor_document,
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
    async changeSwitch(swt, flow) {
      switch (flow) {
        case 'outstanding':
          this.stor_outstanding = swt === true ? 'Si' : 'No'
          break
        case 'typepublication':
          this.stor_typepublication = swt === true ? 'Orgánica' : 'Privada'
          break
        case 'pickup':
          this.stor_pickup = swt === true ? 'Si' : 'No'
          break
        case 'supervision':
          this.stor_supervision = swt === true ? 'Si' : 'No'
          break
        case 'active':
          this.stor_active = swt === true ? 'Activo' : 'Inactivo'
      }
    },
    storeBranches: function(id) {
      this.$router.push({ name: 'Branches', params: { id: id } })
    },

    getColor(stor_active) {
      if (stor_active == false) return 'orange--text'
      else return 'green--text'
    },
  },
}
</script>
