'use strict';

define(function (require) {
	var datahelper = require('scripts/data/data-helper');
	var grid = require('scripts/ui/grid');

	var initalize = function () {
		datahelper.attachTo(document);
		grid.attachTo('.grid');
		$(document).trigger('uiGridOpen');
	};

    return initalize;
});
