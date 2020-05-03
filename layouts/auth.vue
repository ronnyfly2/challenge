<template lang="pug">
	#app
		HeaderAuth()
		section.container
			nuxt
			FooterAuth()
</template>
<script>
import HeaderAuth from '~/components/Layouts/HeaderAuth.vue';
import FooterAuth from '~/components/Layouts/FooterAuth.vue';
export default {
	components:{
		HeaderAuth,
		FooterAuth,
	},
	data () {
		return {
			session:false,
			loginPage:true
		}
	},
	mounted () {
		let self = this;
	}
}
</script>

<style>
</style>
