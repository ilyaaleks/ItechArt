import Chance from 'chance'
import {createPet, deletePet, getPetById, updatePet} from "../../../service/petService"
import {DATA_OPTIONS, getPetRequestData} from "../../../utils/requestsDataGenerator";
import {API_URL} from "../../../service/apiSettings";
import {PET_LIMIT} from "../../../utils/limits";

describe('Tests for Create Pet endpoint', () => {

    let testingData = [
        {description: 'All fields: Max values', requestData: getPetRequestData(DATA_OPTIONS.MAX)},
        {description: 'All fields: Average values', requestData: getPetRequestData(DATA_OPTIONS.AVERAGE)},
        {description: 'All fields: Min values', requestData: getPetRequestData(DATA_OPTIONS.MIN)}
    ];

    testingData.forEach(({description, requestData}) => {
        it(description, () => {
            createPet(requestData).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', requestData.id);
                expect(response.body.id).to.be.greaterThan(0)
                expect(response.body).to.have.property('name', requestData.name);
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls);
                expect(response.body.tags).to.deep.equal(requestData.tags);
            })
        })
    });

    it('Positive: Add pet (read data from fixture - example)', () => {
        cy.fixture('pet').then(pet => {
            createPet(pet).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', pet.name);

            })
        })
    });

    it('Positive: Only required fields (name and photoUrl)', () => {
        let requestData = getPetRequestData(DATA_OPTIONS.AVERAGE, true)
        createPet(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.greaterThan(0)
            expect(response.body).to.have.property('name', requestData.name);
            expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls);
        })
    })
    it('Negative: No values (empty body)', () => {
        let requestData = {}
        createPet(requestData).then(response => {
            console.log(response);
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('id', requestData.id);
            expect(response.body.id).to.be.greaterThan(0);
            cy.writeFile("bagReport.json",response.body);
        })
    })
    it('Negative: No body in request', () => {
        cy.request({method: 'POST', url: `${API_URL}/pet`, failOnStatusCode: false}).then(response => {
            console.log(response)
            expect(response.status).to.eq(415);
        })
    })
    it('Negative: Required fields are null', () => {
        createPet({name: null, photoUrls: null}, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    })
    it('Negative: Invalid pet status (numeric instead of valid string value)', () => {
        let requestData = getPetRequestData()
        requestData.status = 1
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid pet status value');
        })
    })
    it('Negative: Invalid tag name (numeric instead of valid string value)', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].name = 2
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid tag name value');
        })
    })
    it('Negative: Invalid pet id (string valid instead of numeric value)', () => {
        let requestData = getPetRequestData()
        requestData.id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid pet id status value');
        })
    })
    it('Negative: Invalid tag id (string valid instead of numeric value)', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400)
            expect(response.statusText).to.eq('Bad Request');
        })
    })
    it('Negative: Invalid category id (string valid instead of numeric value)', () => {
        let requestData = getPetRequestData()
        requestData.category.id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    })
    it('Negative: photoUrl has max value+1', () => {
        let dataSet=getPetRequestData(PET_LIMIT, true);
        dataSet.photoUrls=fillUrls(PET_LIMIT.photoUrls.urlCount.max+1);
        createPet(dataSet, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.messages[0].fieldName).to.eq(`${PET_LIMIT.photoUrls.urlCount}`);
            expect(response.messages[0].fieldError).to.eq(`Length must be between ${PET_LIMIT.photoUrls.urlCount.min} and ${PET_LIMIT.photoUrls.urlCount.max}`);
        })
    })
    it('Negative: name has max value+1', () => {
        let dataSet=getPetRequestData(PET_LIMIT, true);
        dataSet.tags=fillTags(PET_LIMIT.tags.name.max+1)
        createPet(dataSet, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.messages[0].fieldName).to.eq(`${PET_LIMIT.tags.name}`);
            expect(response.messages[0].fieldError).to.eq(`Length must be between ${PET_LIMIT.tags.name.min} and ${PET_LIMIT.tags.name.max}`);
        })
    })
});

