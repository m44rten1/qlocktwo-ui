<template>
<!-- TODO: Toon huidig verbonden netwerk: ENDPOINT: /settings/current-connection , zie ook greenshot screenshot -->
<!-- TODO: verwijder true -->
      <div v-if="true || settings">
        <!-- TODO: add an icon -->
        <p>Currently the clock is <b v-if="!connectedToInternet">not</b> connected to the internet.</p><br/>
            <v-row>
              <v-select
                :items="items"
                :label="networkPlaceholder"
                solo
                v-model="settings.wifi.ssid"
              ></v-select>
            </v-row>
            <v-row>
              <v-text-field
                v-model="settings.wifi.password"
                :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Wifi password"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-row>
            <v-spacer class="col"></v-spacer>
            <v-row>
              <v-btn :disabled="connectDisabled" @click="connectToNetwork">
                Connect
              </v-btn>
            </v-row>
      </div>
</template>

<script>
  export default {
    data: () => ({
      items: ['Wifi-hotspot', 'GuestNetwork', 'Surf me Pleazzzz!', 'Protected wifi network'],
      show1: false,
      connectDisabled: true,  // TODO: set rules for this
      //settings: null  TODO: Dit terug verwijderen en de andere settings hieronder weg doen
      settings: {
        wifi: {
          ssid: "",
          password: ""
        }
      },
      networkPlaceholder: "Searching for WiFi networks...",
      connectionInterval: null,
      connectedToInternet: false,

    }),
    created() {
        this.axios.get(process.env.VUE_APP_API + 'settings/wifi-networks').then((response) => {
            // TODO: uncomment and check
            console.log(response);
            //this.items = response.data;
            this.networkPlaceholder = this.items.length == 0 ? "No network found" : "Select a network";

        }).catch(err => {
          this.networkPlaceholder = "There was a problem with finding networks";
        });

        this.connectionInterval = setInterval(this.doConnectionCheck, 500);

    },
    destroyed() {
      clearInterval(this.doConnectionCheck);
    },
    methods: {
      connectToNetwork() {
        // TODO: finish this
        //this.axios.post(process.env.VUE_APP_API + 'settings', this.settings);
      },
      doConnectionCheck() {
        this.axios.get(process.env.VUE_APP_API + 'settings/connected-to-internet').then((response) => {
            // TODO: uncomment and check
            console.log(response);
            //this.items = response.data;
            this.connectedToInternet = response;
        }).catch(err => {
          this.connectedToInternet = false;
        })
      }
    }
  }
</script>