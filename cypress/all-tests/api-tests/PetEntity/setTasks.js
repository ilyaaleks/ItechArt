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
        cy.log("Task1");
        let set=new Set(['USD','RUB','BYN']);

        cy.log("Task2");
        set.forEach(currency=>
            cy.log(currency)
        )

        cy.log("Task3");
        set.add('BYN');
        set.add('AUD');
        set.forEach(currency=>
            cy.log(currency)
        )
        set.add('AZN').add('ALL');
        set.forEach(currency=>
            cy.log(currency)
        )

        cy.log("Task4");
        cy.log(set.has('AZN').toString());
        set.delete('AZN');
        cy.log(set.has('AZN').toString());
        cy.log(Chance().pickone(Array.from(set)));

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
            cy.log(`planet: ${planet.planet}, radius: ${planet.radius}, density: ${planet.density}, distance:  ${planet.distance}`);

        cy.log("Task2");
        let planetsOfSolarSystem=planets.map((item)=>{
            item.solarSytem=true;
            return item;
        });
        planetsOfSolarSystem.forEach((item)=>{
            cy.log(item);
        })
        printPlanets(planetsOfSolarSystem);

        cy.log("Task3");
        planets.push({planet: "SomeNewPlanet", radius: 24764, density: 1.64, distance: 30.07, solarSystem: false});

        cy.log("Task4");
        planets.reduce((item,currentValue)=>{
            item+currentValue.radius;
        },0)


        cy.log("====Planets with distance > 5 ====")
        printPlanets(getPlanetsWithDistance(planets, 5))
        cy.log("Task6");
        planets.splice(planets.indexOf("SomeNewPlanet"),1);

        cy.log("Task7");
        planets.sort((planet1,planet2)=>
        {
            let x = planet1.planet.radius;
            let y = planet2.planet.radius;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        })

        cy.log("Task8");
        planets.sort((planet1,planet2)=>
        {
            let x = planet1.planet.toLowerCase();
            let y = planet2.planet.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        })


        cy.log(planets.length.toString());


    })
    it("Site",()=>
    {
        cy.log("Task10");
        cy.fixture('obj').then((object)=>{
            let conv=Chance().pickone(object.rates);
            cy.visit("https://www.xe.com/currencyconverter");
            cy.get("div[class='css-1nah8gs converterform-dropdown__control']").click({force: true, multiple: true });
            cy.get('#to').type(`${conv.shortName}{enter}{enter}`)
            cy.get("button[aria-label='Convert']").click();
            cy.get("div[class^='sc-EHOje']:nth-child(2)").invoke('text').then((divText) => {
                expect(divText.toString().toLowerCase()).to.contain(conv.rate);
            });
        })
    })
})

