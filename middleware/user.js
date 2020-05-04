export default function(context) {
  if (!context.store.getters.isAuthenticated) {
		context.redirect("/companies");
  }
}
//export default function(context) {
	//if (context.store.getters.isAuthenticated) {
		//console.log('data user');
		//let userBand = context.req.headers.cookie.split('; ')[1];
		//context.store.dispatch("getUSer", userBand.split('=')[1]);
		//-context.redirect("/");
  //}
//}
