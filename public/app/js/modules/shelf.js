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
				
				var obj = this.model.attributes.prices;
								
				var data = this.flattenObject(obj);
				
				//console.log(data);
				
				g = new x(document.getElementById("graph"), [[2009/07/12 12:34:56, 6.49],[new Date("2009/07/13 12:34:56"), 6.99]], {
					labels: [ "Date", "Price" ],
				});
        
		  },
		  
		  flattenObject(obj) {
			
			var newObj = [];
			
			_.map(obj, function(value) {
					
				newObj.push(_.values(value));
			
				console.log(value.date);
			
			});
				return newObj;
		  }
		  
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