define("js/modules/shelf", ["jquery", "underscore", "backbone", "app", "c3", "d3"], function($, _, n, r, c3, d3) {
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
												
				console.log(obj);
				
		var chart = c3.generate({
			bindTo: '#chart',
				data: {
					//x: 'x',
					//xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
					/*
					columns: [
					['x', '2015-09-09T01:05:43.269Z', '2015-09-09T02:05:43.269Z', '2015-09-09T03:05:43.269Z', '2015-09-09T04:05:43.269Z', '2015-09-09T05:05:43.269Z'],
					['sample', 30, 100, 400, 150], ]
					*/
					json: obj,
				},
				keys: {
					// x: 'name', // it's possible to specify 'x' when category axis
					value: ['date', 'price']
				}
			},
			axis: {
				x: {
				// type: 'category'
			}
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