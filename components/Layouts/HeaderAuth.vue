<template lang="pug">
el-container
	el-header
		el-row(:gutter="20")
			el-col(:span="12")
				h1 Challenge
					nuxt-link.session(to="/")
</template>
<script>
export default {
	name:'HeaderAuth',
	data(){
		return{
			loginBool:false
		}
	},
	computed:{

	},
	mounted(){

	},
	methods:{

	}
}
</script>
<style lang="stylus">
header
	background-color #000000
</style>
