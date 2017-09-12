define("js/modules/shelf", ["jquery", "underscore", "backbone", "app", "dygraph"], function($, _, n, r, x) {
		var s = {},
			o = {},
			u = {};

// Model
		return s.Product = n.Model.extend({
			idAttribute: "title",
			urlRoot: 'api/catalog/products/',
		}),

// Collection
		o.Basket = n.Collection.extend({
			model: s.Product,
			url: 'api/catalog/search',
		}),

// Views
		
		// Individual Product View
		u.productPreviewView = n.View.extend({
			
			initialize : function() {
				this.listenTo(this.model, 'reset update', this.render);				
			},

			template: _.template( $( '#productPreviewTemplate' ).html() ),
			
			render: function(layout) {
				return layout(this).render({ model: this.model.attributes });
				
			},
			
		  afterRender: function() {
				
				var obj = this.model.attributes;
				
				var array = Object.keys(obj).map(function(key) {
					return [Number(key), obj[key]];
				});

				//console.log(this.model.attributes.prices);
				console.log(array);
				
				g = new x(document.getElementById("graph"),
					
					this.model.attributes.prices,
              {
				title: 'NYC vs. SF',
				showRoller: true,                                
              });
            
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