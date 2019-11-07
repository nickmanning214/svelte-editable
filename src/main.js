import Example1 from './App/Example1.svelte';
import Example2 from './App/Example2.svelte';

const pathname = window.location.pathname;



 if (pathname=='/Example1'){
	const app = new Example1({
		target: document.body
	});
}
else if (pathname=='/Example2'){
	const app = new Example2({
		target: document.body
	});
}







export default app;
