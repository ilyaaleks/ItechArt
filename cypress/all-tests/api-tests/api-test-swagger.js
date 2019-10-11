import Chance from "chance";
import RandomForObject from "../../page-objects/RandomForObject"

describe('Test for swagger', () => {


    let testingData =
        [
            {
                description: "Random value",
                requestData:
                    {
                        id: Chance().integer({max: 80, min: 50}),
                        name: Chance().string({length: 100}),
                        photoUrls: RandomForObject.getUrls(),
                        category: {
                            id: Chance().integer(),
                            name: Chance().string({length: Chance().integer({min: 5, max: 20})})
                        },
                        status: Chance().pickone(['available', 'hello', 'check']),
                        tags: RandomForObject.getTags(Chance().integer({min: 5, max: 20}))
                    }
            },
            {
                description: "Random value",
                requestData:
                    {
                        id: Chance().integer({max: 80, min: 50}),
                        name: Chance().string({length: 100}),
                        photoUrls: RandomForObject.getUrls(),
                        category: {
                            id: Chance().integer(),
                            name: Chance().string({length: Chance().integer({min: 5, max: 20})})
                        },
                        status: Chance().pickone(['available', 'hello', 'check']),
                        tags: RandomForObject.getTags(Chance().integer({min: 5, max: 20}))
                    }
            },
            {
                description: "Random value",
                requestData:
                    {
                        id: Chance().integer({max: 80, min: 50}),
                        name: Chance().string({length: 100}),
                        photoUrls: RandomForObject.getUrls(),
                        category: {
                            id: Chance().integer(),
                            name: Chance().string({length: Chance().integer({min: 5, max: 20})})
                        },
                        status: Chance().pickone(['available', 'hello', 'check']),
                        tags: RandomForObject.getTags(Chance().integer({min: 5, max: 20}))
                    }
            },
            {
                description: "Random value",
                requestData:
                    {
                        id: Chance().integer({max: 80, min: 50}),
                        name: Chance().string({length: 100}),
                        photoUrls: RandomForObject.getUrls(),
                        category: {
                            id: Chance().integer(),
                            name: Chance().string({length: Chance().integer({min: 5, max: 20})})
                        },
                        status: Chance().pickone(['available', 'hello', 'check']),
                        tags: RandomForObject.getTags(Chance().integer({min: 5, max: 20}))
                    }
            }

        ]


    testingData.forEach(({description, requestData}) => {
        it(`Positive: Create Pets ${description}`, () => {

            console.log(requestData)

            cy.request('POST', 'https://petstore.swagger.io/v2/pet', requestData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestData.id)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body).to.deep.equal("photoUrls", requestData.photoUrls)
            })

        })
    })
    it("Positive add pet"), () => {
        cy.fixture("pet").then(pet => {
            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/pet",
                body: pet
            }).then(response => {
                expect(response.status).to.equal(200),
                    expect(response.body).to.have.property("name", pet.name);
                console.log(response);
            })
        })
    }
    it('Positive: Update pet', () => {
        cy.fixture('pet').then(pet => {
            cy.request({
                method: 'POST',
                url: 'https://petstore.swagger.io/v2/pet',
                failOnStatusCode: false,
                body: pet
            }).then(response => {
                expect(response.status).to.eq(200);
            })
        })
    });

    it('Positive: Get pet', () => {
        cy.fixture('pet').then(pet => {
            cy.request({
                method: 'GET',
                url: 'https://petstore.swagger.io/v2/pet/findByStatus',
            }).then(response => {
                expect(response.status).to.eq(200);
            })
        })
    });

})