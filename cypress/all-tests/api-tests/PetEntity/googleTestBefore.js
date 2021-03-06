import Chance from 'chance'
import {createPet, deletePet, getPetById, updatePet} from "../../../service/petService"
import {DATA_OPTIONS, getPetRequestData} from "../../../utils/requestsDataGenerator";
import {API_URL} from "../../../service/apiSettings";
import {PET_LIMIT} from "../../../utils/limits";

describe('Tests for Google', () => {
    before(()=>
    {
        cy.request({
            method: 'GET',
            url: "https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1571310916",
            failOnStatusCode: false,
    }).its("body").as("titles")
    })
    it(("log positions"),()=>
    {
        cy.get('@Titles').then(titleList=>
        {
            console.log(titleList.products.length);
            for(let i=0;i<titleList.products.length;i++)
            {
                console.log(titleList.products[i].display_name);
            }
        })
    })

});
