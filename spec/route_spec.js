var request = require('request');
var root = 'http://localhost:3000';
var albums;

describe("JSON Routes", function() {
	it('returns', function(done) {
		request(`${root}/albums.json`, function(e, res, body) {
			albums = JSON.parse(body);

			expect(albums[0].artist).toBeDefined();
			done();
		});
	});

	it('returns an array of tracks', function(done) {
		request(`${root}/albums/${albums[0].title}.json`, function(err, res, body) {
			let track = JSON.parse(body)[0];

			expect(track.title).toBeDefined();
			done();
		})
	});
});

