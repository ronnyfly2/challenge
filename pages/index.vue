<template lang="pug">
	.container
		div(v-if="!$store.state.isLoged")
			logo
			h1.title CHALLENGE
			h2.subtitle proyecto test challenge
			nuxt-link.session(to="/login") Login
			nuxt-link.btn.btn_green(to="/register") Register
		div(v-else)
			logo
			h1.title CHALLENGE
			h2.subtitle Mira los Productos
			nuxt-link.session(to="/companies") Companies
</template>
<script>
import Logo from '~/components/Logo.vue'
export default {
components: {
	Logo
}
}
</script>

<style lang="stylus">
.container
	margin 0 auto
	display block
	text-align center
</style>
