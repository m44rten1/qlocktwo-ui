<template>
  <div v-if="settings">
    <p>
      The room temperature can be shown on the clock for a certain time and at a certain frequency.
      <br />These values can be set here.
      <span v-if="showMeasurement">
        The currently measured temperature is
        <b>{{measurement.toFixed(1)}} °C</b>.
      </span>
    </p>
    <v-row>
      <v-switch v-model="settings.temperature.off" class="ma-2" label="Off"></v-switch>
      <v-col cols="12" v-show="!settings.temperature.off">
        <v-slider
          v-model="settings.temperature.onTime"
          label="On time (s)"
          min="1"
          max="50"
          thumb-label
        ></v-slider>
      </v-col>
      <v-col cols="12" v-show="!settings.temperature.off">
        <v-slider
          v-model="settings.temperature.frequency"
          label="Frequency (min)"
          min="1"
          max="15"
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
    measurement: 0,
    showMeasurement: false,
    interval: null,
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
    this.axios.get(process.env.VUE_APP_API + 'settings').then(response => {
      this.settings = response.data;
      this.saveDisabled = true;
    });

    // Temperature polling
    this.interval = setInterval(() => {
      this.axios.get(process.env.VUE_APP_API + 'measurements/temperature').then(response => {
        this.measurement = response.data;
        console.log(this.measurement);
        this.showMeasurement = true;
      });
    }, 2000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    save() {
      this.saveDisabled = true;
      this.axios.post(process.env.VUE_APP_API + 'settings', this.settings);
    }
  }
};
</script>