'use strict';

define(function (require) {
	var datahelper = require('scripts/data/data-helper');
	var grid = require('scripts/ui/grid');
	var stage = require('scripts/ui/stage');

	var initalize = function () {
		datahelper.attachTo(document);
		grid.attachTo('.grid');
		stage.attachTo('.stage');
		$(document).trigger('uiGridOpen');
	};

    return initalize;
});
