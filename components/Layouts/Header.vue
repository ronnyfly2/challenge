<template lang="pug">
header
	.ctn_head
		.hack_space
		.row_logo
			h1 Challenge
				nuxt-link.session(to="/")
					//img(src="@/static/images/logo_challenge.png" alt="challenge | challenge")
</template>
<script>
import { actions, mapState } from 'vuex'
export default {
	name:'Header',
	data(){
		return{
		}
	},
	mounted(){
		let self = this;

	},
}
</script>
<style lang="stylus">

</style>
