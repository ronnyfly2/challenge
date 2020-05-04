<template lang="pug">
	fragment
		h1 companies
		el-dialog(:title="defaultIdCompany?'Editar Company':'Create Company'" :visible.sync="dialogFormVisible")
			el-form(:model="form")
				el-form-item(label="Nombre")
					el-input(v-model="form.name" autocomplete="off")
				el-form-item(label="R.U.C")
					el-input(v-model="form.ruc" autocomplete="off")
				el-form-item(label="Web")
					el-input(v-model="form.website" autocomplete="off")
			span(slot="footer" class="dialog-footer")
				el-button(@click="dialogFormVisible = false") Cancel
				el-button(type="primary" @click="sendEditCompany(defaultIdCompany)") {{ defaultIdCompany?'Editar':'Crear' }}
		el-row(:gutter="20" v-if="companies && companies.length>0")
			el-col(:span="24")
				el-button.button(v-if="!activeButtonCompanie" @click="openEdit(null)") Crear Compañia
			el-col(:span="6" v-for="(item, idx) in companies" :key="idx")
				el-card(:body-style="{ padding: '0px' }" :class="companyUser.length>0 && companyUser[idx] && activeButtonCompanie? 'opera':''")
					div
						p {{ item.name }}
						.bottom.clearfix
						time.time RUC: {{ item.ruc }}
						el-button.button_block(v-if="!activeButtonCompanie" @click="joinUser(item.id)") Choose
						el-button.button_block(v-if="companyUser.length>0 && companyUser[idx] && activeButtonCompanie" @click="openEdit(idx)") Edit
						el-button.button_block(v-if="companyUser.length>0 && companyUser[idx] && activeButtonCompanie" @click="leaveUser") Leave
		el-row(v-else) no tenemos
</template>
<script>
import axios from 'axios';
//- import {mapGetters} from 'vuex';
export default {
	middleware:['check-auth', 'user'],
	data(){
		return{
			token:null,
			companies:null,
			companyUser:[],
			activeButtonCompanie:false,
			dialogFormVisible:false,
			defaultIdCompany:null,
			form:{
				name:null,
				ruc: null,
				website: null
			}
		}
	},
	mounted(){
		let self = this;
		self.dataGetCompanies();
	},
	methods: {
		dataGetCompanies () {
			let self = this;
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			self.$axios.get(process.env.baseUrl+'companies').then(res=>{
				self.companies= res.data;
				setTimeout(
				()=>{
						self.getCompanyUser();
					}, 200
				)
			})
		},
		getCompanyUser(){
			let self = this;
			self.companyUser = [];
			[].forEach.call(self.companies, (ele,idx)=>{
				if(!self.$store.state.user.companyId){
					self.companyUser.push(false)
					self.activeButtonCompanie=false;
				}else{
					if(self.$store.state.user.companyId == ele.id){
						self.companyUser.push(true);
						self.activeButtonCompanie=true;
					}else{
						self.companyUser.push(false);
					}
				}
			})
		},
		joinUser(idCompany){
			let self = this;
			self.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			self.$axios.post(process.env.baseUrl+'companies/join', {companyId:idCompany})
			.then(data=>{
				self.$store.dispatch('getUSer', self.$store.state.user._id).then(res=>{
					self.getCompanyUser();
				})
			}).catch(error =>{
				self.loadingForm = false;
				self.$message({
					showClose: true,
					message: error,
					type: 'error',
					duration:6000
				})
			})
		},
		leaveUser(){
			let self = this;
			self.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			self.$axios.post(process.env.baseUrl+'companies/leave')
			.then(data=>{
				self.$store.dispatch('getUSer', self.$store.state.user._id).then(res=>{
					self.getCompanyUser();
				})
			}).catch(error =>{
				console.log(error)
				self.loadingForm = false;
				self.$message({
					showClose: true,
					message: error,
					type: 'error',
					duration:6000
				})
			})
		},
		openEdit(id){
			this.dialogFormVisible = true;
			if(id){
				this.form.name = this.companies[id].name;
				this.form.ruc = this.companies[id].ruc;
				this.form.website = this.companies[id].website;
				this.defaultIdCompany = this.companies[id].id;
			}else{
				this.form.name = null;
				this.form.ruc = null;
				this.form.website = null;
				this.defaultIdCompany = null;
			}
		},
		sendEditCompany(id){
			let self = this;
			if(!id){
				axios.post(`${process.env.baseUrl}companies/create_join`, self.form)
				.then(data=>{
					self.dialogFormVisible = false;
					self.$store.dispatch('getUSer', self.$store.state.user._id).then(res=>{
						self.dataGetCompanies();
					})
				}).catch(error =>{
					self.dialogFormVisible = false;
					self.$message({
						showClose: true,
						message: error,
						type: 'error',
						duration:6000
					})
				})
				return
			}
			axios.put(`${process.env.baseUrl}companies/${this.defaultIdCompany}`, self.form)
			.then(data=>{
				self.dialogFormVisible = false;
				self.dataGetCompanies();
			}).catch(error =>{
				self.dialogFormVisible = false;
				self.$message({
					showClose: true,
					message: error,
					type: 'error',
					duration:6000
				})
			})
		}
	}
}
</script>
<style lang="stylus">
@require './../assets/css/_variables.styl'
.el-main
	background-color #ffffff
	color #333
	text-align center
	padding 0 20px 20px
.el-col
	margin-bottom 20px
.el-card
	padding 15px
	p
		display inline-block
		padding 0 0 1rem 0
.opera
	background-color $PrimaryColor
.el-button.button_block
	display block
	width 90%
	margin 10px auto
	&:last-child
		margin-bottom 0
</style>
