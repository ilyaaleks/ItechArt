import {printMapOFPlanets} from "../../../utils/helper";
import {Chance} from "chance";
describe('Map Tasks', () => {

    it('', () => {
        let mapOfPlanets=new Map;
        mapOfPlanets.set("Mercury",{radius: 2440, density: 5.43, distance: 0.395});
        mapOfPlanets.set("Venus",{radius: 6052, density: 5.24, distance: 0.723});
        mapOfPlanets.set("Earth",{radius: 6378, density: 5.52, distance: 1});
        mapOfPlanets.set("Mars",{radius: 3396, density: 3.93, distance: 1.53});
        mapOfPlanets.set("Jupiter",{ radius: 71492, density: 1.33, distance: 5.21});
        mapOfPlanets.set("Saturn",{radius: 60268, density: 0.69, distance: 9.551});
        mapOfPlanets.set("Uranus",{radius: 25559, density: 1.27, distance: 19.213});
        mapOfPlanets.set("Neptune",{radius: 24764, density: 1.64, distance: 30.07});
        printMapOFPlanets(mapOfPlanets);
        cy.log(JSON.stringify(mapOfPlanets.get("Mercury")));
        cy.log(mapOfPlanets.size.toString());
        let set=new Set(['Mercury','Not Mercury']);
        set.forEach((item)=>
        {
            cy.log(mapOfPlanets.has(item).toString());
        });
        cy.log("-------------------------------delete uranus")
        mapOfPlanets.delete("Uranus");
        printMapOFPlanets(mapOfPlanets);
        let mapOfPlanets2=new Map();
        mapOfPlanets2.set("Uranus",{radius: 25559, density: 1.27, distance: 19.213});
        var merged = new Map([...mapOfPlanets, ...mapOfPlanets2]);
        cy.log("----------------------------------Merge map---------------------------------");
        printMapOFPlanets(merged);
        let planet = {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395}
        for(let item in planet)
        {
            cy.log(item);
        }


    });
    it("if-else operators",()=>
    {
        let age=Chance().age();
        cy.log(age.toString());
        if(age<=3)
        {
            cy.log("child");
        }
        else if(age<=18)
        {
            cy.log("teen");
        }
        else if(age<=60)
        {
            cy.log("adult");
        }
        else
        {
            cy.log("senior");
        }
        switch(true)
        {
            case age<=3:
            {
                cy.log("child");
            };break;
            case age<=18:
            {
                cy.log("teen");
            }break;
            case age<=60:
            {
                cy.log("adult");
            };break;
            default:
            {
                cy.log("senior");
            }
        }
        let message = (age < 3) ? 'child' :
            (age < 18) ? 'teen' :
                (age < 60) ? 'adult' :
                    'senior';
        cy.log(message);


    })

});

