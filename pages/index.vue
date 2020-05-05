<template lang="pug">
	fragment
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
				ul( v-if="products&&products.length>0")
					li( v-for="(item, idx) in products" :key="idx")
						p {{ item.name }}
				ul(v-else) {{ 'gika' }}

</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios';
export default {
	components: {
		Logo
	},
	data(){
		return{
			products:[]
		}
	},
	mounted(){
		let self = this;
		setTimeout(
			()=>{
				self.dataGetProducts();
			}, 300
		)
	},
	methods: {
		dataGetProducts(){
			let self = this;
			console.log(self.$store.state);
			if(self.$store.state.user.companyId){
				axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
				self.$axios.get(process.env.baseUrl+'products').then(res=>{
					console.log('data',res.data)
					self.products= res.data;
					setTimeout(
					()=>{
							//self.getProductsUser();
						}, 200
					)
				})
			}
		},
		getProductsUser(){
			let self = this;
			self.products = [];
			console.log('entro');

		},
	}
}
</script>

<style lang="stylus">
.container
	margin 0 auto
	display block
	text-align center
</style>
