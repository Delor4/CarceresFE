<template>
  <div>
    <interactive-map
      :map=map
      v-on:occupy-change="onOccupyChange($event)"
    ></interactive-map>
  </div>
</template>

<script>
import IMap from '@/components/InteractiveMap.vue'

export default {
   data: function() {
        return {
            curr_map: 2,
            maps: {
              1: {
                name: "Strefa 1",
                bkg_file: "mapa_parkingu_zone1.png",
                places: {
                },
              },
              2: {
                name: "Strefa 2",
                bkg_file: "mapa_parkingu_zone2.png",
                places: {
                },
              },
            },

            map: {
                name: "Brak strefy",
                bkg_file: "mapa_parkingu_zone1.png",
                places: {
                  1: {
                    pos: [0, 0],
                  },
                },
              },
            map_source: {
              1:[
                [10, 18],
                [14, 15],
                [18, 11],
                [22, 8],
                [26, 4],

                [2, 39],
                [3, 44],
                [4, 50],

                [25, 34],
                [29, 33],
                [34, 32],
                [39, 31],
                [44, 30],

                [47, 5],
                [51, 10],
                [55, 14],
                [59, 18],
                [63, 22],
                [67, 26],
                [71, 30],
                [75, 35],
                [79, 39],
                [83, 43],
                [87, 47],
                [92, 52],

                [56, 47],
                [51, 48],
                [46, 49],
                [42, 50],
                [37, 51],
                [33, 52],
                [28, 54],
                [23, 55],
                [18, 56],

                [11, 69],
                [15, 68],
                [20, 67],
                [24, 66],
                [29, 65],
                [34, 64],
                [38, 63],
                [43, 62],
                [47, 61],
                [52, 60],
                [56, 59],
                [61, 58],
                [65, 57],

                [67, 78],
                [62, 79],
                [58, 80],
                [54, 81],
                [49, 82],
                [44, 83],
                [40, 84],
                [35, 85],
                [31, 86],
                [26, 87],
                [21, 88],
],
              2:[
                [41, 11],
                [44, 15],
                [47, 19],
                [50, 23],
                [52, 27],
                [55, 31],
                [58, 35],
                [60, 39],
                [63, 43],
                [66, 47],
                [68, 51],
                [71, 55],
                [74, 59],
                [77, 63],
                [80, 67],

                [32, 16],
                [35, 20],
                [38, 24],
                [41, 28],
                [43, 32],
                [46, 36],
                [49, 40],
                [51, 44],
                [54, 48],
                [57, 52],
                [59, 56],
                [62, 60],
                [65, 64],
                [68, 69],
                [71, 73],

                [22, 40],
                [24, 44],
                [27, 48],
                [30, 52],
                [33, 56],
                [35, 60],
                [38, 64],
                [41, 68],
                [43, 72],
                [47, 76],
                [50, 80],

                [13, 46],
                [15, 50],
                [18, 54],
                [21, 58],
                [23, 62],
                [26, 66],
                [29, 70],
                [32, 74],
                [35, 78],
                [38, 82],
                [41, 86],
],
            },
        };
    },
  methods: {
    onOccupyChange(id) {
      this.map.places[id].occupied = !this.map.places[id].occupied
    }
  },
  mounted () {
    for(var i in this.map_source) {
      for (var pos in this.map_source[i]){
        var place = {
                    id: pos,
                    name: "PZ" + i + '_' + pos,
                    pos: this.map_source[i][pos],
                    occupied : false,
                  }
        this.$set(this.maps[i].places, pos, place)
      }
    }
    this.map = this.maps[this.curr_map]
  },
  components: {
    'interactive-map': IMap,
  },
};
</script>