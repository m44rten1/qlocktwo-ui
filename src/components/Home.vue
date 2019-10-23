<template>
  <div>
      <v-container fluid>
        <v-card>
          <v-card-title>
            The Building Process
          </v-card-title>
          <v-card-subtitle>
            With help of Maren, Maarten, Gabi & Ralf
          </v-card-subtitle>
          <v-card-text>
            This product is build with love ❤ <br/>
            // Nog een productlijst ofzo toevoegen <br/>
            // Schermafbeeldingen van de CAD toevoegen <br/>
            // Zorgen dat de rpi draait zonder interface <br/>
            ...
          </v-card-text>
        </v-card>

        <v-row>
          <v-col
            v-for="n in 9"
            :key="n"
            class="d-flex child-flex"
            cols="12"
            md="6"            
          >
            <v-card flat tile class="d-flex">
              <v-img
                :src="`/assets/${n}.JPG`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>