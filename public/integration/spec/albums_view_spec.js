
describe("Albums View", function() {
	let view;

	beforeEach(function() {
		view = new AlbumsView({collection: albums_scaffold});
	});

	it("should have a collection property assigned", () => {
		expect(view.collection).toBeDefined();
	});

	it('should have 3 albums', () => {
		expect(view.collection.length).toEqual(albums_scaffold.length);
	});

	it("should have a Handlebars template compiled", () => {
		expect(view.template).toBeDefined();
	});

	it("it should render to an #albums container when render called", () => {
		view.render();
		expect($('#albums li').length).toBe(albums_scaffold.length);
	});

	it("it shoudl rerender the view when collection changes", () => {
		var model = albums_scaffold.findWhere({artist: "Tori Kelly"});
		var original_html, new_html;

		view.render();
		original_html = $('#albums').html();
		model.set('title', 'The JS');
		new_html = $('#albums').html();
		expect(original_html).not.toEqual(new_html);
	});
});
