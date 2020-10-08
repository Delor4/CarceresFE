<template>
  <div>
    Hello from Carceres!!!
    <interactive-maps></interactive-maps>
  </div>
</template>

<script>
import IMaps from '@/components/InteractiveMaps.vue'

//const axios = require('axios').default;

export default {
   data: function() {
        return {
            info: null,
            loading: true,
            errored: false,
        }
    },
  methods: {
  },
  mounted () {
  },
  components: {
    'interactive-maps': IMaps,
  },
};
</script>