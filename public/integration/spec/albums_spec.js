describe("Albums collection", function() {


	it('fetches a collection of three albums', function(done) {
		let albumsLoaded = App.albumsLoaded;

		App.albumsLoaded = function() {
			// albumsLoaded.apply(App, arguments);
			expect(App.albums.models.length).toBe(3);
			expect(typeof App.albums.models[0].attributes.title).toBe('string');
			done();
		};

		App.init();
	});


	it('sets a tracks_url property on models', (done) => {
		App.albumsLoaded = function() {
			expect(App.albums.first().get('tracks_url')).toMatch(/\/album/);
			done();
		};

		App.init();
	});

});
