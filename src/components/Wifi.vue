<template>
<!-- TODO: Toon huidig verbonden netwerk: ENDPOINT: /settings/current-connection , zie ook greenshot screenshot -->
<!-- TODO: wifi connect deel niet tonen als er internet verbinding is -->
<!-- TODO: verwijder true -->
      <div v-if="true || settings">
        <v-alert :value="successAlert" type="success" transition="scale-transition">
          You have successfuly connected to {{ wifi.ssid }}
        </v-alert>
        <v-alert :value="errorAlert" type="error" transition="scale-transition">
          The clock failed to connect to {{ wifi.ssid }}
        </v-alert>
        <!-- TODO: add an icon -->
        <p>Currently the clock is <b v-if="!connectedToInternet">not</b> connected to the internet <span :class="{'mi': true, 'mi-wifi': connectedToInternet, 'mi-signal-wifi-off': !connectedToInternet}"></span></p><br/><br/><br/>
            <v-row>
              <v-select
                :items="items"
                :label="networkPlaceholder"
                solo
                v-model="wifi.ssid"
              ></v-select>
            </v-row>
            <v-row>
              <v-text-field
                v-model="wifi.psk"
                :append-icon="show1 ? 'mi-visibility' : 'mi-visibility-off'"
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
            <v-overlay :value="loading">
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
      </div>
</template>

<script>
  export default {
    data: () => ({
      items: [],
      show1: false,
      connectDisabled: true,
      wifi: {
        ssid: "",
        psk: "",
        timeout: 8000,
      },
      loading: false,
      networkPlaceholder: "Searching for WiFi networks...",
      connectionInterval: null,
      connectedToInternet: false,
      successAlert: false,
      errorAlert: false,

    }),
    created() {
      this.doConnectionCheck();
      this.axios.get(process.env.VUE_APP_API + 'settings/wifi-networks').then((response) => {
          this.items = response.data.map(item => item.ssid).filter(item => item.length > 0);
          this.networkPlaceholder = this.items.length == 0 ? "No network found" : "Select a network";

      }).catch(err => {
        this.networkPlaceholder = "There was a problem with finding networks";
      });

      this.connectionInterval = setInterval(this.doConnectionCheck, 2000);

    },
    computed: {
      connectDisabled() {
        return !(this.wifi.ssid.length > 0 && this.wifi.psk.length >= 8);
      },
    },
    watch: {
      wifi: {
        handler() {
          this.connectDisabled = !(this.wifi.ssid.length > 0 && this.wifi.psk.length >= 8);
        },
        deep: true,
      },
      successAlert() {
        if(this.successAlert) {
          setTimeout(() => {
            this.successAlert = false;
          }, 3000);
        }
      },
      errorAlert() {
        if(this.errorAlert) {
          setTimeout(() => {
            this.errorAlert = false;
          }, 3000);
        }
      }
    },
    destroyed() {
      clearInterval(this.connectionInterval);
    },
    methods: {
      connectToNetwork() {
        this.connectDisabled = true;
        this.loading = true;
        // TODO: finish this
        this.axios.post(process.env.VUE_APP_API + 'settings/connect-to-wifi', this.wifi).then(response => {
          console.log(response);
          if(response.data) {
            this.successAlert = true;
          } else {
            this.errorAlert = true;
          }
          
        }).catch(error => {
          this.errorAlert = true;
        }).finally(() => { 
          this.loading = false;
        })
      },
      doConnectionCheck() {
        this.axios.get(process.env.VUE_APP_API + 'settings/connected-to-internet').then((response) => {
            this.connectedToInternet = response.data;
        }).catch(err => {
          this.connectedToInternet = false;
        })
      }
    }
  }
</script>