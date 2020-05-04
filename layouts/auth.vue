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
	middleware:['check-auth','auth'],
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
		//console.log('mount reg',this.$router.history.current.name)
		//self.onResize();
		//section.forms(v-if="!$store.state.isLoged")
	}
}
</script>

<style>
</style>
