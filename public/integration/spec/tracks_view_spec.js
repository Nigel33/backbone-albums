jQuery.fx.off = true;

describe("Tracks view", function() {
	let albums = albums_scaffold.findWhere({title: "Unbreakable Smile (Bonus Track Version)"});

	beforeEach(function() {
		this.view = new TracksView({collection: tracks_scaffold, album: album});
	});

	afterEach(function() {
		this.view.remove();
	});

	it('has a collection property assigned', function() {
		expect(this.view.collection).toBeDefined();
		expect(this.view.collection.length).toBe(tracks_scaffold.length);
	});

	it('has a Handlebars Template', function(){
		expect(this.view.template).toBeDefined();
	});

	it('renders a modal to the body when render called', function() {
		this.view.render();
		expect($("#tracks_modal li").length).toBe(tracks_scaffold.length);
	});

	it('removes the view when fadeOut called', function() {
		this.view.fadeOut();
		expect($('#tracks_modal').length).toBe(0);
	});
});
