<template>
    <div>
      <div :style="mergedStyle" class="vue-grid-layout" ref="item">
			<slot></slot>
			<grid-item 
				:h="placeholder.h"
				:i="placeholder.i"
				:w="placeholder.w"
				:x="placeholder.x"
				:y="placeholder.y"
				class="vue-grid-placeholder"
			></grid-item>
		</div>
    </div>
  </template>
  
<script>
import GridItem from './GridItem.vue'

  export default {
    name: 'gridlayout',
    components: {
      GridItem
    },
    data: () => ({
      mergedStyle: {},
      placeholder: {
        h:0,
        i:-1,
        w:0,
        x:0,
        y:0
      }
    }),
  }
</script>
  