define("js/modules/categories", ["jquery", "underscore", "backbone", "app"], function($, _, n, r) {

	var e = {},
		i = {},
		p = {};

	// Models
	return s.Product = n.Model.extend({
		idAttribute: "title",
		urlRoot: 'api/catalog/products/',
	}),

	
	
	}), {
		Models: e,
		Collections: i,
		Views: p
	}
	})