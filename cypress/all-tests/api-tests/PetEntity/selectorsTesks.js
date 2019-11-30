import Chance from 'chance'
import {createPet, deletePet, getPetById, updatePet} from "../../../service/petService"
import {DATA_OPTIONS, getPetRequestData} from "../../../utils/requestsDataGenerator";
import {API_URL} from "../../../service/apiSettings";
import {PET_LIMIT} from "../../../utils/limits";

describe('Tests https://techstepacademy.com/training-ground', () => {

    it(("Selectors"), () => {
       cy.visit("https://techstepacademy.com/training-ground/");
        cy.get('[name^="i2_"]')
        cy.xpath("//*[contains(@name,'i2_')]")

        cy.get('input[id="ipt1"]')
        cy.xpath("//input[@id='ipt1']")

        cy.get('button').contains('Button1')
        cy.xpath("//button[contains(text(),'Button1')]")

        cy.get('h2').contains('A dropdown of three things').next('select')
        cy.xpath("//h2[contains(text(),'A dropdown of three things')]/following::select")

        cy.get('option').contains('Beets').siblings('option')
        cy.xpath("//option [contains(text(),'Beets')]/preceding-sibling::option ")

        cy.get('div[class="sqs-block-content"] > p')
        cy.xpath('//div[@class="sqs-block-content"]/child::p')

        cy.get('button[value="12245"]')
        cy.get('[id="anyId"]')
        cy.get('[class="anyClass"]')

        cy.xpath("//*[@id='anyId']")
        cy.xpath("//*[@class='anyClass']")
        cy.xpath("//*[@value='12245']")

    })

})
