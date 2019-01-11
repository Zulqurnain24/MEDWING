// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router();
const Nurse = require("../models/Nurse");
/*  This is a sample API route. */

router.get('/:resource', (req, res) => {
	// const model = models[req.params];
	const model = Nurse;
	if(model == null) {
		res.json({
			confirmation:'fail',
			message: 'Resource not found'
		})
		return;
	}

	let { latitude, latitudeDelta, longitude, longitudeDelta } = {
		latitude: 51.1657,
		latitudeDelta: 2.0922,
		longitude: 10.4515,
		longitudeDelta: 3.5922
	};
	
	const geo = {
		type: "Polygon",
		coordinates: [
			[
			[longitude, latitude],
			[longitude, latitude + latitudeDelta],
			[longitude + longitudeDelta, latitude + latitudeDelta],
			[longitude + longitudeDelta, latitude],
			[longitude, latitude]
		]
	]
	};
	
	model
	.find()
	.where("location")
	.within(geo)
	.exec(function(err, nurses) {
		if(err) {
			console.log(err);
			res.json({
				confirmation: "error", 
				message: err.message
			});
			return;
		}
		res.json({
			confirmation: "success", 
			data: nurses
		});
		return;
	});

});

router.get('/:resource/:id', (req, res) => {
	res.json({
		confirmation: 'success',
		resource: req.params.resource,
		id: req.params.id,
		query: req.query // from the url query string
	})
})



module.exports = router
