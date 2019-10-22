<template>
      <div v-if="settings">
        <v-row >
          <v-switch v-model="settings.temperature.off" class="ma-2" label="Off"></v-switch>
          <v-col cols="12" v-show="!settings.temperature.off">
            <v-slider v-model="settings.temperature.onTime" label="On time (s)" min="0" max="50" thumb-label></v-slider>
          </v-col>
          <v-col cols="12" v-show="!settings.temperature.off">
            <v-slider v-model="settings.temperature.frequency" label="Frequency (min)" min="0" max="15" thumb-label></v-slider>
          </v-col>
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
      this.axios.get(process.env.VUE_APP_API).then((response) => {
          this.settings = response.data;
          this.saveDisabled = true;
      })
  },
  methods: {
    save() {
      this.saveDisabled = true;
      this.axios.post(process.env.VUE_APP_API, this.settings);
    }
  }
}
</script>