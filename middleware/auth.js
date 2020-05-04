export default function(context) {
  if (context.store.getters.isAuthenticated) {
		console.log('visor',context.store.getters.isAuthenticated)
		context.redirect("/");
  }
}
