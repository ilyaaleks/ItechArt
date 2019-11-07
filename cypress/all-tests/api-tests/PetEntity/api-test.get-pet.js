import Chance from 'chance'
import {createPet, getPetById, getPetByStatus} from "../../../service/petService"
import {DATA_OPTIONS, getPetRequestData} from "../../../utils/requestsDataGenerator";
import {API_URL} from "../../../service/apiSettings";
import {PET_LIMIT} from "../../../utils/limits";

describe('Tests for Get pet endpoint', () => {
    it('Positive: Get pet data C75', () => {
        let petData = getPetRequestData(DATA_OPTIONS.MAX)
        createPet(petData).then(response => {
            getPetById(response.body.id).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', petData.name);
                expect(response.body).to.have.property('id', petData.id);
                expect(response.body).to.have.property('status', petData.status);
                expect(response.body.photoUrls).to.deep.equal(petData.photoUrls);
                expect(response.body.tags).to.deep.equal(petData.tags);
                expect(response.body.category).to.deep.equal(petData.category);
            })
        })
    })
    it('Positive: Existent status C76', () => {
        getPetByStatus(Chance().pickone(PET_LIMIT.status), false).then(response => {
            console.log(response)
            expect(response.status).to.eq(200);
            expect(response.statusText).to.eq('OK');
        })
    })
    it('Negative: Nonexistent id C42', () => {
        getPetById(Chance().integer(), false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('Pet not found');
        })
    })
    it('Negative: ID as a string C43', () => {
        getPetById('anyString', false).then(response => {
            console.log(response)
            expect(response.status).to.eq(404);
            expect(response.statusText).to.eq('Not Found');
        })
    })
    it('Negative: No ID in parameter C44', () => {
        getPetById('', false).then(response => {
            console.log(response)
            expect(response.status).to.eq(405);
            expect(response.statusText).to.eq('Method Not Allowed');
        })
    })
    it('Negative: Negativity id C74', () => {
        getPetById(-5, false).then(response => {
            console.log(response)
            expect(response.status).to.eq(404);
            expect(response.statusText).to.eq('Not Found');
        })
    })
    it('Negative: Nonexisting status C77', () => {
        getPetByStatus('hello', false).then(response => {
            console.log(response)
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Not Found');
        })
    })
    it('Negative: Status not string type C78', () => {
        getPetByStatus(78, false).then(response => {
            console.log(response)
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Not Found');
        })
    })
    it('Negative: Empty id C79', () => {
        getPetById(null, false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('java.lang.NumberFormatException: For input string: "null"');
        })
    })
    it('Negative: Empty type C80', () => {
        getPetByStatus(null, false).then(response => {
            console.log(response)
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Not Found');
        })
    })
})
