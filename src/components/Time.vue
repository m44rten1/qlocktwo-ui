<template>
    <div  v-if="settings">
        <v-row>
            <v-autocomplete
            v-model="settings.time.timezone"
            label="Timezone"
            :items="timezones"
            item-text="text"
            return-object
            ></v-autocomplete>
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

import timezones from '@/timezones.json'

export default {
data: () => ({
    timezones: [],
    saveDisabled: true,
    settings: null,
    
}),
created() {
    this.timezones = timezones;
    this.axios.get(process.env.VUE_APP_API + 'settings').then((response) => {
        this.settings = response.data;
    })
},
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
methods: {
    save() {
        this.saveDisabled = true;
        this.axios.post(process.env.VUE_APP_API + 'settings', this.settings);
        },
    }
}
</script>
