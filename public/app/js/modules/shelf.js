define("js/modules/shelf", ["jquery", "underscore", "backbone", "app"], function($, _, n, r) {
		var s = {},
			o = {},
			u = {};

// Models
		return s.Product = n.Model.extend({
			idAttribute: "title",
			urlRoot: 'http://waylo-api.herokuapp.com/catalog/products/',
		}),

// Collections
		o.Basket = n.Collection.extend({
			model: s.Product,
			url: 'http://waylo-api.herokuapp.com/catalog/search',
		}),

// Views

		// Could I create one view that can have the number of prices displayed? Save code?
		
		// Individual Product View
		u.productPreviewView = n.View.extend({
			
			initialize : function() {
				this.listenTo(this.model, 'reset update', this.render);
			},

			template: _.template( $( '#productPreviewTemplate' ).html() ),
			
			render: function(layout) {
				return layout(this).render({ model: this.model.attributes });
			},

		}),

		// Shelf Product View
		u.ProductView = n.View.extend({
			
			template: _.template( $( '#productTemplate' ).html() ),			
			
			tagName: 'div',
			
			className: 'pure-u-1-5 productPreview',
			
			render: function(layout) {
				return layout(this).render({ model: this.model.attributes });
			},
		
			events: {
				"click li": "showProduct"
			},

			showProduct: function(e) {
				
				e.preventDefault();
				
				r.router.go("search/" + this.model.get("title"));				
												
			}
		}),


		// Shelf View
		u.ShelfView = n.View.extend({
			
			initialize : function() {
				this.listenTo(this.collection, 'reset update', this.render);
			},

			beforeRender: function() {
				this.collection.each(function(item) {
					
					this.insertView("", new u.ProductView({
						model: item
					}));
					
				}, this);
			}

		}), {
			Models: s,
			Collections: o,
			Views: u
		}
	})