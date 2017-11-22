define(function(require, exports, module) {
  "use strict";

	var app = require("app");
	var Backbone = require("backbone");
	var s = require("js/modules/shelf");
	var x = require("js/modules/search");

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
	initialize: function() {

		// Set up the shelf
		this.basket = new s.Collections.Basket();
		this.basket.fetch();

		// Set up the product preview
		this.product = new s.Models.Product();

/*		// Use main layout and set Views.
		app.useLayout({ template: "#mainLayout" }).setViews({
			".search": new x.Views.Search(),
			".shelf": new s.Views.ShelfView({ collection: this.basket }),
			//".product": new s.Views.ProductView(),
		}).render();
*/

	},

	routes: {
		"": "index",
		"search/:query": "search",
    "about": "about",
	},

	index: function() {
   app.useLayout({ template: "#mainLayout" }).setViews({
    //".search": new x.Views.Search(),
    ".shelf": new s.Views.ShelfView({ collection: this.basket }),
   }).render();
  },

	search: function(query) {
		this.product.set({
			"title": query
		})

		this.product.fetch({

			success: function(response) {

				app.layout.setView(
					'.shelf', new s.Views.productPreviewView({ model: response })
				).render();

			}
		});
	},

  about: function() {
   app.useLayout({ template: "#mainLayout" }).setViews({
    //".search": new x.Views.Search(),
    ".shelf": console.log("about");
    //new s.Views.ShelfView({ collection: this.basket }
  ),
   }).render();
  },

	// Shortcut for building a url.
	go: function() {
	  return this.navigate(_.toArray(arguments).join("/"), true);
	},

  });
  module.exports = Router;
});
