require.config({
	paths: {
		'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min',
		'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
		'backbone': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
		'backbone.layoutmanager': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.layoutmanager/1.0.0/backbone.layoutmanager.min',
		'dygraph': 'https://cdnjs.cloudflare.com/ajax/libs/dygraph/2.0.0/dygraph.min',
		
	},
	shim: {
		'backbone': {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
	}
});