Cypress.Commands.add('checkData', (url, length) => {
	return cy.request({
		method: 'GET',
		url: url,
		followRedirect: false,
		headers: {
			'accept': 'application/json'
		}
	})
	.then((response) => {
		let data = response.body.steps;
		expect(response.status).to.eq(200);
		expect(data).to.have.length.of.at.least(1);

		data.forEach(function (item) {
			expect(item).to.have.all.keys('answers', 'description', 'step', 'total_count');
			expect(item['answers']).to.have.length.of.at.least(1);
			item['answers'].forEach((answer) => {
				expect(answer).to.have.all.keys('answer', 'count');
			})
		});
	});

});

describe('vueTest', () => {
	Cypress.config({'baseUrl': 'https://tmp.grimcap.ru/'})

	it('Целостность данных', () => {
		cy.checkData('answers.json')
	})
	it('Интерфейс', () => {
		cy.visit('index.html')
		cy.get('#app .b-table .chevron-cell a').first().click()
			.get('.detail .msg_txt + .msg_cnt')
	})
})