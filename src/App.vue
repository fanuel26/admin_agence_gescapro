<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>

<script>

export default ({
	computed: {
		// Sets components name based on current route's specified layout, defaults to
		// <layout-default></layout-default> component.
		layout() {
			return "layout-" + (this.$route.meta.layout || "default").toLowerCase();
		}
	},
})

</script>

<style lang="scss">
.mb-4 {
	margin-bottom: 10px;
}

.mx-2 {
	margin-left: 5px;
	margin-right: 5px;
}

.d-flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>