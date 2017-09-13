require.config({
	paths: {
		'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min',
		'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
		'backbone': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
		'backbone.layoutmanager': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.layoutmanager/1.0.0/backbone.layoutmanager.min',
		'c3': 'https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.17/c3.min',
		'd3': 'https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.2/d3.min',	
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