define("js/modules/search", ["jquery", "underscore", "backbone", "app"], function($, _, n, r) {

  var t = {},
    o = {},
    u = {};

  //Models
  return t.Query = n.Model.extend({}),

    //Collections
    o.searchResults = n.Collection.extend({
      model: t.Query,

      url: function () {
        return 'api/catalog/autosuggest/';
      },
    }),

    u.Search = n.View.extend({

      template: _.template($('#searchTemplate').html()),

      render: function (layout) {
        return layout(this).render();
      },

    }), {
      Models: t,
      Collections: o,
      Views: u,
    };
});
