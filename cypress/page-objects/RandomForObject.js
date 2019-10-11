import Chance from 'chance'
class RandomForObject
{
    getUrls(count)
    {
        let array=[];
        for(let i=0;i<count;i++)
        {
            array[i]=Chance().url();
        }
        return array;
    }
    getTags(count) {
        let array = [];
        for (let i = 0; i < count; i++) {
            array[i] = {
                id: Chance().integer({min: 0, max: 100}),
                name: Chance().string({length: 100})
            };
        }
        return array;
    }
}
export default new RandomForObject();