'use strict'

define(function (require) {
	var defineComponent = require('flight/lib/component');

	var Grid = function () {
		this.after('initialize', function () {
			this.on(document, 'uiGridOpen', this.setup);
			this.on(document, 'dataSetlist', this.renderSetlist);
		});

		this.setup = function () {
			$(document).trigger('uiNeedsSetlist');
		};

		this.renderSetlist = function (evt, msg) {
			$('.grid').html(msg.html);
		};
	};

	return defineComponent(Grid);
});
