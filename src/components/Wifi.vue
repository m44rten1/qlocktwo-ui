<template>
      <div v-if="settings">
            <v-row>
              <v-select
                :items="items"
                label="Network"
                solo
                v-model="settings.wifi.network"
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
              <v-btn :disabled="saveDisabled" @click="save">
                Save
              </v-btn>
            </v-row>
      </div>
</template>

<script>
  export default {
    data: () => ({
      items: ['Wifi-hotspot', 'GuestNetwork', 'Surf me Pleazzzz!', 'Protected wifi network'],
      show1: false,
      saveDisabled: true,
      settings: null
    }),
    watch: {
      settings: {
        deep: true,
        handler(newValue, oldValue) {
          if ( oldValue != null) {
            this.saveDisabled = false;
          }
        }
      },
    },
    created() {
        this.axios.get(process.env.VUE_APP_API + 'settings').then((response) => {
            this.settings = response.data;
        })
    },
    methods: {
      save() {
        this.saveDisabled = true;
        this.axios.post(process.env.VUE_APP_API + 'settings', this.settings);
      }
    }
  }
</script>