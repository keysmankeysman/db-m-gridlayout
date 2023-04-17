<template>
	<div
		class="vue-grid-item app-background--secondary"
		ref="item"
	>
		<slot></slot>
		<span
			:class="resizableHandleClass"
			ref="handle"
			v-if="resizableAndNotStatic"
			style="
				z-index: 20;
			"
		>
			<v-icon
				color="grey"
			>mdi-chevron-right mdi-rotate-45</v-icon>
		</span>
  </div>
</template>
  
<script>
  export default {
    name: 'griditem',

    data: () => ({

    }),
    computed: {
			classObj() {
				return {
					'vue-resizable': this.resizableAndNotStatic,
					'static': this.static,
					'resizing': this.isResizing,
					'vue-draggable-dragging': this.isDragging,
					'cssTransforms': this.useCssTransforms,
					'render-rtl': this.renderRtl,
					'disable-userselect': this.isDragging,

					//избавление от варни при передвижении
					'no-touch': true // this.isAndroid && this.draggableOrResizableAndNotStatic
				}
			},
      resizableAndNotStatic() {
				return this.resizable && !this.static;
			},
    }
  }
</script>
