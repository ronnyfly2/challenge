<template lang="pug">
	footer.footer_auth
		el-row(:gutter="20")
			el-col(:span="12")
				p © Challenge - Derechos reservados del autor
			el-col.text_right(:span="12")
				p © Desarrollado por Ronny
</template>
<script>
export default {
	props:['Footer']
}
</script>
<style lang="stylus">
@require '../../assets/css/_variables.styl'
footer
	&.footer_auth
		background-color black
		margin-top 0
		position fixed
		bottom 0
		width 100%
		color white
</style>
