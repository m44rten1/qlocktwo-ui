<template>
  <div v-if="settings">
    <p class="body-1">
      <span v-if="showMeasurement">
        The room brightness is measured by the clock and is currently
        <b>{{measurement.toFixed(0)}}%</b>.
      </span>
      <br />In 'auto' mode, this measurement is used to set the brightness of the LED's.
      <br />
    </p>
    <v-row>
      <v-switch v-model="settings.brightness.auto" class="ma-2" label="Auto"></v-switch>
      <v-col cols="12" v-show="!settings.brightness.auto">
        <v-slider
          v-model="settings.brightness.brightness"
          label="Brightness"
          min="0"
          max="100"
          thumb-label
        ></v-slider>
      </v-col>
    </v-row>
    <v-spacer class="col"></v-spacer>
    <v-row>
      <v-btn :disabled="saveDisabled" @click="save">Save</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    saveDisabled: true,
    settings: null,
    interval: null,
    measurement: 0,
    showMeasurement: false
  }),
  watch: {
    settings: {
      deep: true,
      handler(newValue, oldValue) {
        if (oldValue != null) {
          this.saveDisabled = false;
        }
      }
    }
  },
  created() {
    this.axios.get(process.env.VUE_APP_API + "settings").then(response => {
      this.settings = response.data;
    });

    // Brightness polling
    this.interval = setInterval(_ => {
      this.axios
        .get(process.env.VUE_APP_API + "measurements/brightness")
        .then(response => {
          this.measurement = response.data;
          this.showMeasurement = true;
        });
    }, 300);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    save() {
      this.saveDisabled = true;
      this.axios.post(process.env.VUE_APP_API + "settings", this.settings);
    }
  }
};
</script>