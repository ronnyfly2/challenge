<template lang="pug">
header
	.ctn_head
		.hack_space
		.row_logo
			nuxt-link.session(to="/")
				h1 Challenge
		.row_search
			.box_search
				//-label(for="search")
				input(type="text" placeholder="Buscar" id="search" name="search" aria-label="Search")
		.row_auth
			.box_auth
				.start_session(v-if="$store.state.isLoged")
					el-dropdown(trigger="click")
						.el-dropdown-link
							.user_list(v-if="goLoad" :loading="loadingGet")
								i(class="el-icon-loading")
							.user_list(v-else) {{ userInfo.name }}
							i(class="el-icon-arrow-down el-icon--right")
						el-dropdown-menu.header_menu(slot="dropdown")
							el-dropdown-item
								nuxt-link.link_header(to="/user")
									i(class="el-icon-user-solid")
									| Perfíl
							el-dropdown-item
								div(@click="getLogout")
									i(class="el-icon-switch-button")
									| Cerrar sesión
				.register(v-else)
					nuxt-link.session(to="/login")
						span Iniciar sesión
					nuxt-link.btn(to="/register")
						span Registrate
</template>
<script>
import { actions, mapState } from 'vuex'
export default {
	name:'Header',
	data(){
		return{
			goLoad:true,
			session:true,
			loadingGet:true,
			userInfo: {
				name:null,
				lastName:null,
			},
		}
	},
	computed:{
		...mapState(['user'])
	},
	mounted(){
		let self = this;
		if(self.$store.state.isLoged){
			self.loadingGet = true;
			self.$store.dispatch('getUSer', self.$store.state.userId).then((res)=>{
				self.loadingGet = false;
				self.goLoad = false;
				self.userInfo.name = res.name;
				self.userInfo.lastName = res.last_name;
			}).catch(()=>{
				self.$store.dispatch('logout');
			})
		}
	},
	methods:{
		getLogout(){
			this.$store.dispatch('logout');
		}
	}
}
</script>
<style lang="stylus">
@require '../../assets/css/_variables.styl'
.ctn
	&_head
		max-height 71px
		height 100px
		color white
		padding 0 15px
		>div
			display inline-block
			vertical-align middle
			a
				color white
				text-decoration none
	&_menu_user
		background-color $SecondaryColor
		ul
			display flex
			flex-wrap nowrap
			padding 0
			li
			a
				color white
				padding 0 15px
				line-height 3.4
				display block
				text-decoration none
				&:hover
					color rgba(225, 225, 225, .7)
					background-color #656d71
.box
	&_search
		max-width 503px
		position relative
		margin 0 auto
		.icon_search_head
			position absolute
			right 10px
			top 11px
	&_auth
		width 100%
		text-align right
		font-size 16px
		.start_session
			>div
				display inline-block
			.el-dropdown
				width 83%
				//-width 36.137%
				max-width 123px
				border 1px solid $SecondaryColor
				border-radius 4px
				cursor pointer
				.el-dropdown-link
					vertical-align middle
			i
				display inline-block
				vertical-align middle
				margin 0 3%
				&.icon_user
					width 15%
					margin 0 2% 0 0
				&.row_down_head
					margin-right 0
				&.el-icon-arrow-down
					margin 0
					width 15%
					text-align center
	&_menu_user
		max-width $wrapperWidth
		margin 0 auto
.row
	&_logo
		width 22%
		h1
			font-size 25px
			img
				width 100%
				max-width 159px
	&_search
		width 50%
		input
			width 100%
			max-width 503px
			height 36px
			border-radius 6px
			padding-left 10px
			&::placeholder
				color #17180f
	&_auth
		width 27.9%
		.register
			.session
			.btn
				display inline-block
		.session
			width 55%
			text-align left
.user_list
	padding 6px 0 7px 0
	display inline-block
	white-space nowrap
	overflow hidden
	text-overflow ellipsis
	max-width 99px
	width 85%
	vertical-align middle
	text-align center
.header_menu
	.el-dropdown-menu__item
		padding 0
		div
			padding 0 20px
		.link_header
			padding 0 20px
			color #606266
			text-decoration none
			display block
@media only screen and (max-width: 830px)
	.box_search
		max-width 280px
@media only screen and (max-width: 777px)
	.row_auth
		.register
			span
				display none
			i
				display block
		.session
			max-width 36px
			text-align center
			margin-right 4%
@media only screen and (max-width: 680px)
	.box_search
		max-width 150px
@media only screen and (max-width: 570px)
	.box_auth
		.start_session
			i.icon_user
				display none
			.el-dropdown
				width 100%
</style>
