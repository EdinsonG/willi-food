<template>
  <div class="page--dash">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg4 sm12 xs12 v-for="(item, index) in trending" :key="'c-trending' + index">
          <v-card max-width="344" class="mx-auto">
            <v-list-item>
              <v-list-item-title class="text-h6 font-weight-medium">{{item.subheading}}</v-list-item-title>
              <v-spacer></v-spacer>
              <v-icon :color="item.icon.color">{{item.icon.label}}</v-icon>
            </v-list-item>
            <v-col cols="12">
              <v-row justify="center">
                <v-progress-circular
                  :size="170"
                  :width="15"
                  :value="100"
                  :color="item.linear.color"
                >
                  <span class="text--secondary text-h5 font-weight-regular">{{item.linear.value}}</span>
                </v-progress-circular>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="text-lowercase"
                >{{item.linear.value}} Ordenes {{item.subheading}}s</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from '@/api'
import axios from 'axios'

import Material from 'vuetify/es5/util/colors'
export default {
  data: () => ({
    color: Material,
    selectedTab: 'tab-1',
    purchaseOrders: [],
    pending: 0,
    canceled: 0,
    approved: 0,
    trending: [],
  }),
  computed: {
    // activity() {
    //   return API.getActivity()
    // },
    // posts() {
    //   return API.getPost(3)
    // },
    // siteTrafficData() {
    //   return API.getMonthVisit
    // },
    locationData() {
      return API.getLocation
    },
  },
  created: function () {
    this.getPurchaseOrders()
  },
  methods: {
    async getPurchaseOrders() {
      let userId = this.$session.get('user_id')
      axios.get('http://store.malllikeu.com/api/orders/' + userId)
        .then((response) => {
          let purchaseOrders = response.data.order
          for (let index in purchaseOrders) {
            if (purchaseOrders[index].orde_status === 'pending') {
              this.pending++
            }
            if (purchaseOrders[index].orde_status === 'approved') {
              this.approved++
            }
            if (purchaseOrders[index].orde_status === 'canceled') {
              this.canceled++
            }
          }
          this.trending = [
                            {
                        subheading: 'Pendiente',
                        headline: '15+',
                        icon: {
                          label: 'mdi-alert-circle-outline',
                          color: 'orange',
                        },
                        linear: {
                          value: this.pending,
                          color: 'info',
                        },
                      },
                      {
                        subheading: 'Aprobada',
                        headline: '15+',
                        icon: {
                          label: 'mdi-check-circle-outline',
                          color: 'green',
                        },
                        linear: {
                          value: this.approved,
                          color: 'success',
                        },
                      },
                      {
                        subheading: 'Rechazada',
                        headline: '15+',
                        icon: {
                          label: 'mdi-close-circle-outline',
                          color: 'pink',
                        },
                        linear: {
                          value: this.canceled,
                          color: 'error',
                        }
                      }
          ]
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
    }
  }
}
</script>
