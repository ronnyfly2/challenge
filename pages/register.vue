<template lang="pug">
.container
	section.forms.forms_register
		el-row.forms_form(type="flex" :gutter="20" align="center")
			el-col.forms_form_auth(:span="24" v-loading="loadingForm" element-loading-text="Válidando datos..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)")
				el-form(:model="formRegister" :rules="rulesRegister" ref="formRegister" autocomplete="off")
					h3 Crea tu cuenta
					el-form-item(prop="name")
						el-input(v-model="formRegister.name" placeholder="Nombre")
					el-form-item(prop="email")
						el-input(v-model="formRegister.email" placeholder="Correo Electrónico" autocomplete="off")
					el-form-item(prop="password")
						el-input(v-model="formRegister.password" type="password" placeholder="Contraseña" autocomplete="off")
					el-form-item(prop="passwordConfirmation")
						el-input(v-model="formRegister.passwordConfirmation" type="password" placeholder="Confirmar Contraseña")
					el-form-item
						el-row(:gutter="20")
							el-col(:span="12")
								el-button(@click="resetForm('formRegister')") Cancelar
							el-col(:span="12")
								el-button.button_green(@click="beforeRegister('formRegister')") Regístrarse
					el-form-item.now_loggin
						span ¿Ya eres miembro?
						nuxt-link(to="/login" @click.native="sendFalse") Inicia sesión
</template>
<script>
import axios from 'axios';
export default {
	layout:'auth',
  data(){
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('Campo oblitgatorio'));
			} else {
				if (this.formRegister.passwordConfirmation !== '') {
					this.$refs.formRegister.validateField('passwordConfirmation');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('Trate de que coincida el password'));
			} else if (value !== this.formRegister.password) {
				callback(new Error('El password no coincide'));
			} else {
				callback();
			}
		};
		return{
			session:true,
			loadingForm:false,
			formRegister:{
				name:null,
				email:null,
				//repeatEmail:null,
				password:null,
				passwordConfirmation:null,
			},
			rulesRegister: {
				name: [
					{ required: true, message: 'Este campo es obligatorio', trigger: ['blur', 'change'] },
					//{ min: 2, max: 50, message: 'Length should be 2 to 50', trigger: ['blur', 'change'] }
				],
				email:[
					{ required: true, message: 'Este campo es obligatorio', trigger: 'blur' },
					{ type: 'email', message: 'Por favor ingrese un correo válido', trigger: ['blur', 'change'] }
				],
				password:[
					{ required: true, message: 'Este campo es obligatorio', trigger: 'blur' },
					{  validator: validatePass, trigger: ['blur', 'change'] },
				],
				passwordConfirmation:[
					{  validator:validatePass2, trigger: ['blur', 'change'] },
				],
			}
		}
	},
	mounted(){
		let self = this;
		document.addEventListener("keydown", (e) => {
			if(e.keyCode == 13) {
				if(!self.loadingForm){
					self.beforeRegister('formRegister')
					e.preventDefault()
				}
			}
		});
	},
	methods:{
		beforeRegister(formName){
			this.$refs.formRegister.validate((valid) => {
				if (valid) {
					this.getRegister();
					this.loadingForm = true;
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		getRegister(){
			let self = this;
			self.$axios.post(process.env.baseUrl+'auth/signup', self.formRegister)
			.then(data=>{
				console.log('data',data)
				self.getLogin();
			}).catch(error =>{
				self.loadingForm = false;
				self.$message({
					showClose: true,
					message: error.response.data.error,
					type: 'error',
					duration:6000
				})
			})
		},
		async getLogin(){
			try{
        await this.$store.dispatch('authenticateUser', {
          email: this.formRegister.email,
          password: this.formRegister.password
				})
				this.$notify({
          title: 'Éxito',
          message: 'Gracias por registrarte',
          type: 'success'
        });
				//this.$message({
					//showClose: true,
          //message: 'Gracias por registrarte',
					//type: 'success',
					//duration:6000
				//});
				if(localStorage.pathItem){
					this.$router.push(localStorage.pathItem);
				}else{
					this.$router.push('/companies');
				}
      }catch(e){
				this.loadingForm = false;
				this.$message({
					showClose: true,
          message: e.message,
					type: 'error',
					duration:6000
        })
      }
		},
		sendFalse(){
			console.log('this', this.$store.commit('setPageRegister', false))
			//this.$root.$children[2].$children[0].loginBool = false;
		}
	}
}
</script>
<style lang="stylus">
//@require '~assets/css/_variables.styl'
</style>
