var mongoose = require('mongoose');
var NurseSchema = new mongoose.Schema({
    name: {type:String},
    location: {
        coordinates: {
            index: '2dsphere',
            type: [Number]
        },
    }
});
module.exports = mongoose.model('Nurse', NurseSchema);