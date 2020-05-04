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
</style>
