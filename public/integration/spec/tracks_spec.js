let album = "Unbreakable Smile (Bonus Track Version)";

describe("tracks collection", function() {
	it ('fetches a collection of track models', function(done) {
		let tracks = new (Tracks.extend({
			url: "/albums/" + album + '.json',
		}))();

		tracks.fetch({
			success: function() {
				expect(tracks.length).toBeGreaterThan(0);
				expect(tracks.models[0].attributes.title).toBeDefined();
				expect(tracks.models[0].attributes.length).toBeDefined();
				done();
			},
		});
	});
});
