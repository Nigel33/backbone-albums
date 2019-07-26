
let App = {
	albums: null,
	selected_album: null,
	tracks: null,

	albumsLoaded: function() {
		console.log(this.albums);
		this.view.render();
	},

	fetchAlbums: function() {
		this.albums = new Albums();
		this.view = new AlbumsView({collection: this.albums});
		this.albums.fetch({
			success: (collection) => {
				this.albumsLoaded();
			}
		})
	},

	fetchTracks: function(name) {
		let tracks = new (Tracks.extend({
			url: '/albums/' + name + '.json',
		}))();

		this.selected_album = this.albums.findWhere({title: name});
		tracks.fetch({
			success: (collection) => {
				this.tracksLoaded(collection);
			}
		});
	},

	tracksLoaded: function(tracks) {
		let tracks_modal = new TracksView({
			collection: tracks,
			album: this.selected_album.toJSON(),
		});

		tracks_modal.render();
		this.tracks = tracks_modal;
	},

	init: function() {
		this.fetchAlbums();
	}
}

let Router = Backbone.Router.extend({
	routes: {
		"albums/:name": "getAlbum",
	},

	getAlbum: function(name) {
		App.fetchTracks(name);
		console.log('fdf');
	},

	initialize: function() {
		this.route(/^\/?$/, 'index', this.index);
	},

	index: function() {
		if (!App.tracks.$el.is(":animated")) {
			App.tracks.fadeOut();
		}
	},
});

let router = new Router();

Backbone.history.start({
	pushState: true,
	silent: true,
});

$(document).on('click', "a[href^='/']", function(e) {
	e.preventDefault();

	router.navigate($(e.currentTarget).attr('href').replace(/^\//, ""), {trigger: true});
});




