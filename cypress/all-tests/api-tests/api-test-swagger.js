import Chance from "chance";
import RandomForObject from "../../page-objects/RandomForObject"
describe('Test for swagger', () => {



    let testingData=
        [
            {
                description: "Max values",
                requestData:
                    {
                        id: Chance().integer({max:80,min:50}),
                        name:Chance().string({length: 100}),
                        photoUrls:RandomForObject.getUrls(),
                        category:{
                            id:Chance().integer(),
                            name:Chance().string({length:Chance().integer({min:5,max:20})})
                        },
                        status:Chance().pickone(['available','hello','check']),
                        tags:RandomForObject.getTags(Chance().integer({min:5,max:20}))
                    }
            },
            {
                description: "Min values",
                requestData:
                    {
                        id: Chance().integer({max:80,min:50}),
                        name:Chance().string({length: 100}),
                        photoUrls:RandomForObject.getUrls(),
                        category:{
                            id:Chance().integer(),
                            name:Chance().string({length:Chance().integer({min:5,max:20})})
                        },
                        status:Chance().pickone(['available','hello','check']),
                        tags:RandomForObject.getTags(Chance().integer({min:5,max:20}))
                    }
            },
            {
                description: "Max Average",
                requestData:
                    {
                        id: Chance().integer({max:80,min:50}),
                        name:Chance().string({length: 100}),
                        photoUrls:RandomForObject.getUrls(),
                        category:{
                            id:Chance().integer(),
                            name:Chance().string({length:Chance().integer({min:5,max:20})})
                        },
                        status:Chance().pickone(['available','hello','check']),
                        tags:RandomForObject.getTags(Chance().integer({min:5,max:20}))
                    }
            },
            {
                description: "Min Average",
                requestData:
                    {
                        id: Chance().integer({max:80,min:50}),
                        name:Chance().string({length: 100}),
                        photoUrls:RandomForObject.getUrls(),
                        category:{
                            id:Chance().integer(),
                            name:Chance().string({length:Chance().integer({min:5,max:20})})
                        },
                        status:Chance().pickone(['available','hello','check']),
                        tags:RandomForObject.getTags(Chance().integer({min:5,max:20}))
                    }
            }

        ]


    testingData.forEach(({description,requestData})=>{
        it(`Positive: Create Pets ${description}`, () => {

            console.log(requestData)

            cy.request('POST','https://petstore.swagger.io/v2/pet',requestData).then(response=>
            {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id',requestData.id)
                expect(response.body).to.have.property('name',requestData.name)
                expect(response.body).to.have.property("photoUrls",requestData.photoUrls)
            })

        })
    })



})