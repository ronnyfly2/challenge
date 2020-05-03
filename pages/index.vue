<template lang="pug">
	.container
		div
			logo
			h1.title CHALLENGE
			h2.subtitle proyecto test challenge
			nuxt-link.session(to="/login") Login
			nuxt-link.btn.btn_green(to="/register") Register
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
