define('js/modules/shelf', ['jquery', 'underscore', 'backbone', 'app', 'c3', 'd3'], function ($, _, n, r, c3, d3) {
  var s = {},
    o = {},
    u = {};

  // Models
  return s.Product = n.Model.extend({
      idAttribute: 'title',
      urlRoot: 'api/catalog/products/',
    }),

    // Collections
    o.Basket = n.Collection.extend({
      model: s.Product,
      url: 'api/catalog/search',
    }),

    // Views
    // Individual Product View
    u.productPreviewView = n.View.extend({

      initialize: function () {
        this.listenTo(this.model, 'reset update', this.render);
      },

      template: _.template($('#productPreviewTemplate').html()),

      render: function (layout) {
        return layout(this).render({
          model: this.model.attributes,
        });

      },

      afterRender: function () {

        var obj = this.model.attributes.prices;

        var chart = c3.generate({
          data: {

            json: obj,

            //xFormat: '%Y-%m-%d %H:%M:%S',

            keys: {
              x: 'date',
              xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
              value: ['price'],
            },
            xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
          },

          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%d-%m-%Y',
                fit: true,
              },
            },
            y: {
              tick: {
                format: d3.format(',.2f'),
              },
            },
          },
          zoom: {
            //enabled: true,
            rescale: true,
          },
        });
      },
    }),

    // Shelf Product View
    u.ProductView = n.View.extend({

      template: _.template($('#productTemplate').html()),

      tagName: 'div',

      className: 'col-sm productPreview',

      events: {
        'click li': 'showProduct',
      },

      render: function (layout) {
        return layout(this).render({
          model: this.model.attributes,
        });
      },

      showProduct: function (e) {
        e.preventDefault();
        r.router.go('search/' + this.model.get('title'));
      },
    }),

    // Shelf View
    u.ShelfView = n.View.extend({
      tagName: 'div',
      className: 'row equal-height',

      initialize: function () {
        this.listenTo(this.collection, 'reset update', this.render);
      },

      beforeRender: function () {
        this.collection.each(function (item) {

          this.insertView('', new u.ProductView({
            model: item,
          }));

        }, this);
      },

    }), {
      Models: s,
      Collections: o,
      Views: u,
    };
});
