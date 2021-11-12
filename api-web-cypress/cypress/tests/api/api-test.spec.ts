
const url = 'https://jsonplaceholder.cypress.io/posts'

describe('GET and POST request', function () {
    it('validate data-type for get request', function () {
        cy.request({
            method: 'GET',
            url: url,
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            let body = JSON.parse(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            body.forEach(function (item: any) {
                expect(item.userId).to.satisfy(Number.isInteger);
                expect(item.id).to.satisfy(Number.isInteger);
                expect(item.title).to.be.a('string');
                expect(item.body).to.be.a('string');
            });
        });
    });

    it('validate correct response for post request', function () {
        const post_title = 'recommendation';
        const post_body = 'motorcycle';
        const post_userId = 12;

        cy.request({
            method: 'POST',
            url: url,
            body: {
                title: post_title,
                body: post_body,
                userId: post_userId
            },
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            expect(response.status).to.eq(201);
            let body = JSON.parse(JSON.stringify(response.body));
            expect(body.userId).to.be.eq(post_userId);
            expect(body.body).to.be.eq(post_body);
            expect(body.title).to.be.eq(post_title);
        });
    });
});

