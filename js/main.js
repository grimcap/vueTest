new Vue({
	el: '#app',
	data: {
		steps: [],
	},
	methods: {

		read(){
			fetch('/answers.json')
				.then((response) => {
					if(response.ok) {
						return response.json();
					}
					throw new Error('Network response was not ok');
				})
				.then((json) => {
					this.steps = json.steps;
				})
				.catch((error) => {
					console.error(error);
				});
		},

	},
	created() {
		this.read()
	},
	
})