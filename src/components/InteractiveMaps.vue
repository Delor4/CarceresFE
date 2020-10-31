<template>
  <div>
    <interactive-map
      :map=map
      v-on:occupy-change="onOccupyChange($event)"
      v-on:zone-change="onZoneChange()"
    ></interactive-map>
   
  </div>
</template>

<script>
import IMap from '@/components/InteractiveMap.vue'
import axios from 'axios';

export default {
   data: function() {
        return {
            curr_map: 0,
            maps: {},
            map: {},
        };
    },

  methods: {
    onOccupyChange(id) {
      this.map.places[id].occupied = !this.map.places[id].occupied
    },
    
    onZoneChange() {
      this.maps[this.curr_map] = this.map
      var next_curr = -1
      var get_next = false
      for(var i in this.maps) {
        if(get_next){
          next_curr = i
          get_next = false
          break
        }
        if(i == this.curr_map){
          get_next = true;
        }
      }
      if(next_curr == -1) next_curr = 1
      
      this.curr_map = next_curr
      this.map = this.maps[this.curr_map]
    }
  },

  mounted () {
   axios.get('http://127.0.0.1:43343/api/zones')
    .then(response => {
      this.maps = response.data
      this.map = this.maps[this.curr_map];
    })

  },
  components: {
    'interactive-map': IMap,
  },
};
</script>