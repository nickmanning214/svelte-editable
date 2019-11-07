import Example1 from './App/Example1.svelte';
import Example2 from './App/Example2.svelte';
import Example3 from './App/Example3.svelte';

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
else if (pathname=='/Example3'){
	const app = new Example3({
		target: document.body
	});
}








export default app;
