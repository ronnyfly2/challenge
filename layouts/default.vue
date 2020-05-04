<template lang="pug">
	.app
		Header
		el-container
			el-main
				nuxt
		Footer
</template>
<script>
import Header from '~/components/Layouts/Header.vue';
import Footer from '~/components/Layouts/Footer.vue';
export default {
	middleware: ['check-auth'],
	components:{
		Header,
		Footer,
	},
	data () {
		return {
			session:false,
			loginPage:false
		}
	},
	mounted () {
		let self = this;
	},
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
