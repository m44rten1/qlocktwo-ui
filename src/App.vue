<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      temporary
    >
      <v-list dense>
        <v-list-item @click="changePage('Home')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="changePage('Time')">
          <v-list-item-action>
            <v-icon>mdi-earth</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Timezone</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="changePage('Temperature')">
          <v-list-item-action>
            <v-icon>mdi-thermometer</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Temperature</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="changePage('Brightness')">
          <v-list-item-action>
            <v-icon>mdi-brightness-6</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Brightness</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="changePage('Color')">
          <v-list-item-action>
            <v-icon>mdi-palette</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Color</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="changePage('Wifi')">
          <v-list-item-action>
            <v-icon>mdi-wifi</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Wifi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="changePage('Fun')">
          <v-list-item-action>
            <v-icon>mdi-gamepad-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Fun</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="amber lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>KIRSTENS <b>QLockTwo</b></v-toolbar-title> -->
      <v-toolbar-title>{{ currentPage }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-col cols="12" sm="8" offset-sm="2">
        <component :is="component" style="padding: 20px;"/>
      </v-col>
    </v-content>
    <!-- <v-footer
      color="amber lighten-1"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer> -->
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      component: null,
      currentPage: 'Home'
    }),
    created() {
      this.component = () => import("@/components/Home.vue")
    },
    methods: {
      changePage(pageName) {
        this.component = () => import("@/components/" + pageName + ".vue");
        this.drawer = !this.drawer;
        this.currentPage = pageName;
      }
    }
  }
</script>

<style>
  html{
        overflow-y: auto;
      }
</style>