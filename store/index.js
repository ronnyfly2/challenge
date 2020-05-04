import Cookie from "js-cookie";

export const state = () => ({
	token: null,
	isLoged: false,
	isRegisterPage:false,
	user:{},
	userId:null,
})

export const mutations = {
	setPageRegister(state, bool){
		state.isRegisterPage = bool;
	},
  setToken(state, token) {
		state.token = token;
	},
	clearToken(state) {
		state.token = null;
	},
	setAuth(state, bool) {
		state.isLoged = bool;
	},
	setUserId(state, objct){
		state.userId = objct._id;
	},
	setUser(state, objct){
		state.user.name=objct.name;
		state.user.email=objct.email;
		state.user.companyId=objct.companyId;
		state.user._id=objct._id;
	},
}
export const actions = {
  nuxtServerInit(vuexContext, context) {
		//return context.app.$axios
			//.$get("/posts.json")
			//.then(data => {
			//	const postsArray = [];
				//for (const key in data) {
					//postsArray.push({ ...data[key], id: key });
				//}
				//vuexContext.commit("setPosts", postsArray);
			//})
			//.catch(e => context.error(e));
	},
	authenticateUser(vuexContext, authData) {
		return new Promise((resolve, reject)=>{
			this.$axios.$post(process.env.baseUrl+'auth/login', {
				email: authData.email,
				password: authData.password,
			})
			.then(result => {
				vuexContext.commit('setToken', result.sessionId);
				vuexContext.commit('setAuth', true);
				//vuexContext.commit('setUser', {name:result.name,email:result.email,companyId:result.companyId,'_id':result.id});
				//vuexContext.commit('setUserId', {'_id':result._id});
				localStorage.setItem('token', result.sessionId);
				localStorage.setItem('tokenExpiration', new Date().getTime() * 2000);
				Cookie.set('jwt', result.sessionId);
				Cookie.set("expirationDate", new Date().getTime() * 2000);
				//Cookie.set('setIdUs', result._id);
				resolve(result);
			})
			.catch(e => {
				console.log('err', e)
				reject(e.response.data);
			});
		})
	},
	initAuth(vuexContext, req) {
		let token;
		let expirationDate;
		let userBand;
		if (req) {
			if (!req.headers.cookie) {
				return;
			}
			const jwtCookie = req.headers.cookie
				.split(';')
				.find(c => c.trim().startsWith('jwt='));
			if (!jwtCookie) {
				return;
			}
			token = jwtCookie.split('=')[1];
			expirationDate = req.headers.cookie
				.split(';')
				.find(c => c.trim().startsWith('expirationDate='))
				.split('=')[1];
		} else {
			token = localStorage.getItem('token');
			expirationDate = localStorage.getItem('tokenExpiration');
		}
		//-console.log('expiration',+expirationDate)
		if (new Date().getTime() > expirationDate || !token) {
			//-console.log("No token or invalid token");
			vuexContext.dispatch('logout');
			return;
		}else{
			vuexContext.dispatch('everLogget', true);
		}
		vuexContext.commit('setToken', token);
	},
	everLogget(vueConte, payload){
		vueConte.commit("setAuth", payload);
	},
	logout(vuexContext) {
		if(localStorage.getItem('token')){
			vuexContext.commit("clearToken");
			vuexContext.commit("setAuth", false);
			Cookie.remove("jwt");
			Cookie.remove("expirationDate");
			Cookie.remove("setIdUs");
			if (process.client) {
				localStorage.removeItem("token");
				localStorage.removeItem("tokenExpiration");
			}
			localStorage.clear();
			this.$router.push('/');
		}

	},
	getUSer(vuexContext, payload){
		this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
		return new Promise((resolve, reject)=>{
			this.$axios.$get(process.env.baseUrl+'users/me')
			.then(result => {
				vuexContext.commit('setUser', {name:result.name,email:result.email,companyId:result.companyId,'_id':result.id});
				resolve(result)
			})
			.catch(e => {
				reject(e.response.data)
			});
		})
	},
}

export const getters = {
	isAuthenticated(state) {
		return state.token != null;
	}
};
