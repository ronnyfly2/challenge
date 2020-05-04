<template lang="pug">
.container
	section.forms
		el-row.forms_form(type="flex" :gutter="20" align="center")
			el-col.forms_form_auth(:span="24" v-loading="loadingForm" element-loading-text="Válidando datos..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)")
				el-form(:model="formLogin" :rules="rules" ref="formLogin")
					h3 Inicia sesión
					el-form-item(prop="email")
						el-input(v-model="formLogin.email" placeholder="Correo Electrónico")
					el-form-item(prop="password")
						el-input(v-model="formLogin.password" type="password" placeholder="Contraseña")
					el-form-item
						el-row(:gutter="20")
							el-col(:span="24")
								el-button.button_green(@click="beforeLogin('formLogin')") Iniciar Sesión
</template>
<script>
//-import { mapActions, mapGetters } from "vuex";
export default {
	layout:'auth',
  data(){
		return{
			loadingForm:false,
			session:true,
			formLogin:{
				email:null,
				password:null,
			},
			rules: {
				email:[
					{ required: true, message: 'Este campo es obligatorio', trigger: 'blur' },
					{ type: 'email', message: 'Escribe un correo válido', trigger: ['blur', 'change'] }
				],
				password:[
					{ required: true, message: 'Este campo es obligatorio', trigger: 'blur' },
				],
			}
		}
	},
	mounted(){
		let self = this;
		document.addEventListener("keydown", (e) => {
			if(e.keyCode == 13) {
				if(!self.loadingForm){
					self.beforeLogin('formLogin');
					e.preventDefault()
				}
			}
		});
	},
	methods:{
		beforeLogin(formName){
			this.$refs.formLogin.validate((valid) => {
				if (valid) {
					this.getLogin();
					this.loadingForm = true;
				} else {
					return false;
				}
			});
		},
		async getLogin(){
			try{
        await this.$store.dispatch('authenticateUser', {
          email: this.formLogin.email,
          password: this.formLogin.password
				})
				if(localStorage.pathItem){
					this.$router.push(localStorage.pathItem);
				}else{
					this.$router.push('/companies');
				}
      }catch(e){
				this.loadingForm = false;
				this.$message({
					showClose: true,
          message: e.error,
					type: 'error',
					duration:6000
        })
      }
		},
	}
}
</script>
<style lang="stylus">

</style>
