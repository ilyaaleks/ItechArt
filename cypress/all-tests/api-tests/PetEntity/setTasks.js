import {Chance} from "chance"
import {
    difference,
    getPlanetsWithDistance,
    Helper,
    intersection,
    isSuperSet,
    printPlanets,
    union
} from "../../../utils/helper"
describe("set",()=>
{
    it(("check"),()=>
    {
        let set=new Set(['USD','RUB','BYN']);
        set.forEach(currency=>
            console.log(currency)
        )
        set.add('BYN');
        set.add('AUD');
        set.forEach(currency=>
            console.log(currency)
        )
        set.add('AZN').add('ALL');
        set.forEach(currency=>
            console.log(currency)
        )
        console.log(set.has('AZN'));
        set.delete('AZN');
        console.log(set.has('AZN'));
        Chance().pickone(set.toArray());

    })
    it(("second set"),()=>
    {
        let set1=new Set(['USD','RUB','BYN']);
        let set2=new Set(['USD','ALL','AZN']);
        let set3=new Set(['USD','RUB','AZN']);
        isSuperSet(set1,set2);
        union(set1,set2);
        intersection(set3,set1);
        difference(set3,set2);
    })
    it(("Tasks with array"),()=>
    {
        let planets = [
            {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
            {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
            {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
            {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
            {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
            {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
            {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
            {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07}
        ]
        for(let planet of planets)
            console.log(`planet: ${planet.name}, radius: ${planet.radius}, density: ${planet.density}, distance:  ${planet.distance}`);
        let planetsOfSolarSystem=planets.map((item)=>{
            item.solarSytem="SolarSystem";
        });
        printPlanets(planetsOfSolarSystem);
        planets.push({planet: "SomeNewPlanet", radius: 24764, density: 1.64, distance: 30.07, solarSystem: false});
        planets.reduce((item,currentValue)=>{
            item.radius+currentValue;
        })
        cy.log("====Planets with distance > 5 ====")
        printPlanets(getPlanetsWithDistance(planets, 5))
        planets.planet.indexOf("SomeNewPlanet");
        planets.sort((planet1,planet2)=>
        {
            let x = planet1.planet.toLowerCase();
            let y = planet2.planet.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        })
        console.log(planets.length);
        cy.fixture('obj').then((object)=>{
            let conv=Chance().pickone(object.rates);
            cy.visit("https://www.xe.com/currencyconverter");
            cy.get("#converterForm > form > div:nth-child(4) > div > div").click();
            cy.get('#to').type(`${conv.shortName}{enter}{enter}`)
            cy.get("#converterForm > form > button.OldButton-sc-1wdh3eu-5.submitButton.SubmitButton-sc-6euey0-0.dRSeAz").click();
            cy.get("#converterResult > section > div.OldColumn-sc-1rdw0o5-0.second.RateInfoColumn-sc-1cj7zsm-4.eMpVzP > div:nth-child(2)").should("eq",conv.rate);
        })


    })
})

