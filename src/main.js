import BigExample from './App/BigExample.svelte';
import BigExampleNoErrors from './App/BigExampleNoErrors.svelte';

const pathname = window.location.pathname;



 if (pathname=='/BigExample'){
	const app = new BigExample({
		target: document.body
	});
}
else if (pathname=='/BigExampleNoErrors'){
	const app = new BigExampleNoErrors({
		target: document.body
	});
}







export default app;
