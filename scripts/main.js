requirejs.config({
  baseUrl: '',
  paths: {
    'underscore': 'bower_components/underscore/underscore',
    'flight': 'bower_components/flight',
    'text': 'bower_components/requirejs-text/text',
    'hbs': 'bower_components/require-handlebars-plugin/hbs'
  }
});

require(
  [
    'flight/lib/debug'
  ],

  function(debug) {
    debug.enable(true);
    require(['scripts/ui/app'], function(initialize) {
    	initialize();
    });
  }
);
