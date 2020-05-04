export default function(context) {
  if (context.store.getters.isAuthenticated) {
		console.log('ddd',context.store.getters.isAuthenticated)
		context.redirect("/");
  }
}
