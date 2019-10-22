<template>
      <div v-if="settings">
        <v-row >
          <v-switch v-model="settings.brightness.auto" class="ma-2" label="Auto"></v-switch>
          <v-col cols="12" v-show="!settings.brightness.auto">
            <v-slider v-model="settings.brightness.brightness" label="Brightness" min="0" max="100" thumb-label ></v-slider>
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
      settings: null,
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
        })
    },
    methods: {
      save() {
        this.saveDisabled = true;
        this.axios.post(process.env.VUE_APP_API, this.settings);
        },
      }
    }
</script>