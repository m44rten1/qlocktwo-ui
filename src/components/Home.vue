<template>
  <div>
      <v-container fluid>
        <v-card>
          <v-card-title>
            <p>This product was built with love ❤ </p><br/>
          </v-card-title>
          <v-card-subtitle>
            <br/>
            With help of Maren, Maarten, Gabi, Ralf and Laurens<br/>
          </v-card-subtitle>
          <v-card-text>
          </v-card-text>
        </v-card>

        <v-row>
          <v-col
            v-for="n in 58"
            :key="n"
            class="d-flex child-flex"
            cols="12"
            md="6"            
          >
            <v-card >
              
              <v-img
                :src="`/assets/wordclock(${n}).JPEG`"
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
              <v-card-subtitle>
                {{ descriptions[n - 1] }}
                
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    descriptions: [
      'The original clock on sale: Only 1.199 €',
      'Complete assembly in Computer Aided Design (CAD)',
      'Frame with light and cable tunnels in CAD',
      'Backplate with electronic components in CAD',
      'One of the three electronics orders arrived',
      'Setting up the Raspberry Pi',
      'First electronics tests',
      'Baumarkt shopping',
      'Precisely cut plates',
      'CAD check for measurements',
      'Preparation of lightframe',
      'We are still motivated: Hole number 1',
      'Drilling more and more and more holes',
      'Finally finished: Hole number 110',
      'Injury 1: Blisters from clamping',
      'Strategy meeting with Maarten\'s dad',
      'Milling of cable tunnels',
      'The raw backplate',
      'Programming of the app...',
      '...while Kirsten is distracted',
      'Milling of the wallframe',
      'Liquid energy',
      'Weak wood',
      'Soldering of LEDs',
      'Baguette, wine and grapes',
      'Painting of the wallframe',
      'Sorting electronics',
      'Paper template for the frontplate',
      'IT stuff: You can never have enough laptops!',
      'First words lit up',
      'Little programming error',
      'Electrical plan incl. sensors',
      'Special treatment for Ü, Ö and W',
      'Finally we found the right power plug',
      'First connector version',
      'Painting of the frames',
      'Quality claim for the frontplate',
      'Who wants a normal clock???',
      'Magic moment with all parts',
      'Glueing test for the diffusion paper',
      'Programming can be challenging...',
      '...hence more liquid energy is required',
      'Cleaning every letter with a dental stick',
      'Fitting of the cables',
      'Cutting of the PVC-sides',
      'The best teamcook ever',
      'Soldering of the power plug',
      'Jibbieh! Everything fits together!',
      'Preparation of the glueing',
      'Glueing test: Yes, it is strong enough!',
      'Glueing of the sides',
      'Glueing of the frontplate',
      'A hidden message for Kirsten (fill in the blanks)',
      'The emergency operation: Reopening the clock',
      'Injury 2: Bruise from the pliers',
      'Creating numbers for displaying temperatures',
      'IT support by Laurens',
      'THE END: We are so proud =)',
    ]
  }),
};


</script>
