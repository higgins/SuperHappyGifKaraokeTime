'use strict'

define(function (require) {
	var defineComponent = require('flight/lib/component');

	var Grid = function () {
		this.defaultAttrs({
			gridSelector: '.grid-item'
		});

		this.after('initialize', function () {
			this.on(document, 'uiGridOpen', this.setup);
			this.on(document, 'dataSetlist', this.renderSetlist);
			this.on('click', {
				'gridSelector': this.gridClicked
			});
		});

		this.setup = function () {
			$(document).trigger('uiNeedsSetlist');
		};

		this.renderSetlist = function (evt, msg) {
			$('.grid').html(msg.html);
		};

		this.gridClicked = function (evt, msg) {
			$(document).trigger('uiStageOpen', {id: $(msg.el).data('id')});
		};
	};

	return defineComponent(Grid);
});
