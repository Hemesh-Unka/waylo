define("js/modules/search", ["jquery", "underscore", "backbone", "app"], function($, _, n, r) {
	var 	t = {},
			o = {},
			u = {};

//Models
		return t.Query = n.Model.extend({}),

//Collections
		o.searchResults = n.Collection.extend({
			model: t.Query,

			url: function() {
				return 'api/catalog/autosuggest/'
			}
		}),

		u.Search = n.View.extend({

			template: _.template( $( '#searchTemplate' ).html() ),

			render: function(layout) {
				return layout(this).render();
			},

				 events: {
				  'keyup input': "action"
				 },

			minLength: 1,
			currentText: "",

		    isValid: function(query) {
		        return query.length > this.minLength
		    },

		    isChanged: function(query) {
		        return this.currentText != query;
		    },

			action: function(e) {
				var query = $(e.currentTarget).val();

				if (this.isChanged(query)) {
					if (this.isValid(query)) {
						$(".suggestions").show();
						this.setView(".suggestions", new u.suggestionList({q: query}));
					} else {
						$(".suggestions").hide();
					}
				this.currentText = query;
				}
			},


/*
			action: _.debounce(function(e) {

				var query = $(e.currentTarget).val();

				if (this.isChanged(query)) {

				$(".suggestions").addClass('disabled');

					if (this.isValid(query)) {
						this.setView(".suggestions", new u.suggestionList({collection: new o.searchResults(), q: query}));
					} else {
						console.log("false")
					}
					this.currentText = query;
				}
			}, 500)

*/
		}),


		u.suggestionListItem = n.View.extend({
			tagName: "li",
			template: _.template('<a href="/search/<%= title %>"><%= title %></a>'),
			className: "normalSuggestion",
		}),

		u.suggestionList = n.View.extend({

			tagName: "ol",

			initialize: function(options) {

				this.options = options;

				this.collection = new o.searchResults();
				this.collection.fetch({ data: $.param({ q: options.q })});
				this.listenTo(this.collection, 'sync', this.render);
			},

			beforeRender: function() {

				this.collection.each(function(item) {
					this.insertView("", new u.suggestionListItem({
						model: item
					}));
				}, this);
			},

			afterRender: function() {
			},

		}),
		{
			Models: t,
			Collections: o,
			Views: u
		}
	})
