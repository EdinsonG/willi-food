<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>General</h3>
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
              <v-dialog v-model="dialog" max-width="500px">
                <!-- <template v-slot:activator="{ on }">
                  <div class="d-flex">
                    <v-btn color="primary" dark class="ml-auto ma-3" v-on="on">
                      <v-icon left>add</v-icon>Nueva
                    </v-btn>
                  </div>
                </template> -->
                <v-card>
                  <v-card-title color="primary">
                    <span>Editar producto {{editedItem.id}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.name_product" label="Nombre del producto"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.cost" label="Costo"></v-text-field>
                      </v-col>                     
                      <v-col cols="12" sm="6">
                      <v-switch v-model="status" :label="`Estatus: ${status.toString()}`"></v-switch>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text flat @click="handleEdit()">Cancelar</v-btn>
                     <!-- <v-btn color="blue-grey lighten-5" flat @click.native="close">Cancelar</v-btn> -->
                    <v-btn color="primary" text flat @click="saveItem(editedItem)">Guardar</v-btn>
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
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                class="elevation-1"
                item-key="name"
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
                  <v-btn depressed text icon fab dark color="teal" small @click="handleEdit(item)">
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
                    @click="handleDelete(item)"
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
import { Items as Users } from '@/api/user'

export default {
  data() {
    return {
      formModel: {
        name_bank: '',
        account_number: '',
      },
      dialog: false,
      search: '',
      status: false,
      complex: {
        selected: [],
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
          { text: 'Acción', 
            value: 'action', 
            align: 'right' 
          },
        ],
        items: Users,
      },
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

  methods: {
    handleEdit(item) {
      this.editedItem = Object.assign(this.editedItem, item) || {}
      // this.editedItem = item || {}
      this.dialog = !this.dialog
    },
  },

  close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
  },
}
</script>
