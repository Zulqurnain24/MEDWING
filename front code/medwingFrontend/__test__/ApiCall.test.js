import ApiCall from './ApiCall';
import 'isomorphic-fetch';

it('Api test case', async function() {
    var json = require('./nurses.json');
    const stringifiedJSON = JSON.stringify(json);
    const parsedJSON = JSON.parse(stringifiedJSON, (key, value) => {
        return value;
    });
    const nursesArray = parsedJSON[0];
    const response = await ApiCall.callApi();
    nursesArray['data'].map(function(nurse, i) {
        expect(response.data[i].name).toEqual(nurse['name']); 
        expect(response.data[i].location).toEqual(nurse['location']); 
        expect(response.data[i].description).toEqual(nurse['description']); 
        expect(response.data[i]._id).toEqual(nurse['_id']); 
    });
});