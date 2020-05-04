export default function(context) {
	//context.store.dispatch("everLogget", true);
  context.store.dispatch("initAuth", context.req);
}
