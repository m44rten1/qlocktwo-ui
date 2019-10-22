<template>
      <div>
        <v-row ref="colorPickerRow">
          <v-color-picker
            v-if="settings"
            v-model="settings.color.color"
            :hide-canvas="hideCanvas"
            :hide-inputs="hideInputs"
            :hide-mode-switch="hideModeSwitch"
            :mode.sync="mode"
            :show-swatches="showSwatches"
            :width="colorPickerWidth"
          ></v-color-picker>
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
      colorPickerWidth: 0,
      hideCanvas: false,
      hideInputs: false,
      hideModeSwitch: false,
      mode: 'rgba',
      modes: ['rgba', 'hsla', 'hexa'],
      showSwatches: false,
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
          this.colorPickerWidth = this.$refs.colorPickerRow.clientWidth;
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