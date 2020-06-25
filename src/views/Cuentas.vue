<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Cuentas</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            <v-toolbar flat color="white">
              <v-text-field
                text
                solo
                flat
                prepend-icon="search"
                placeholder="Escribe algo"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table :headers="complex.headers" :search="search" :items="complex.items" class="elevation-1" item-key="name">
                <template v-slot:item.avatar="{ item }">
                  <v-avatar>
                    <img :src="item.avatar" alt="avatar" size="16" />
                  </v-avatar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn depressed text icon fab dark color="primary" small @click="handleClick(props.item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <!-- <v-btn depressed outline text icon fab dark color="pink" small @click="handleDelete(props.item)">
                    <v-icon>delete</v-icon>
                  </v-btn> -->
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" max-width="60vh">
      <v-card>
        <v-toolbar card>Edit User</v-toolbar>
        <v-card-text>
          <form>
            <v-text-field v-model="formModel.name" :counter="10" label="Name" required></v-text-field>
            <v-text-field v-model="formModel.email" label="E-mail" required></v-text-field>
            <v-divider class="mt-3 mb-3"></v-divider>
            <v-btn @click="handleSubmit">submit</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Items as Users } from '@/api/user'
export default {
  data() {
    return {
      formModel: {
        name: '',
        email: '',
      },
      dialog: false,
      search: '',
      complex: {
        selected: [],
        headers: [
          //  {
          //   text: 'Avatar',
          //   value: 'avatar',
          // },
          {
            text: 'Id',
            value: 'id',
          },
          {
            text: 'Nombre del banco',
            value: 'name_bank',
          },
          {
            text: 'Número de cuenta',
            value: 'account_number',
          },
          { text: 'Acción', 
            value: 'action', 
            align: 'right' 
          },
        ],
        items: Users,
      },
      basic: {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      },
    }
  },
  methods: {
    handleClick(row) {
      this.formModel = Object.assign(this.formModel, row)
      this.dialog = true
    },
    /* eslint-disable-line no-unused-vars */
    handleDelete() {},
    handleSubmit() {},
  },
}
</script>
