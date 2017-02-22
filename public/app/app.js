define("app",["backbone.layoutmanager"], function(r) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: "/",
    // The API root of the program
    //apiRoot: "waylo-api.herokuapp.com"
  };

  // Configure LayoutManager with Backbone Boilerplate defaults.
  r.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

  });

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // Enable variable arity by allowing the first argument to be the options
      // object and omitting the name argument.
      if (_.isObject(name)) {
        options = name;
      }

      // Ensure options is an object.
      options = options || {};

      // If a name property was specified use that as the template.
      if (_.isString(name)) {
        options.template = name;
      }

      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        el: "#container"
      }, options));

      // Cache the refererence.
      return this.layout = layout;
    }
  }, Backbone.Events);
});