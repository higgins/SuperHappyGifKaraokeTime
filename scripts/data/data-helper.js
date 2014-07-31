'use strict'

define(function (require) {
	var defineComponent = require('flight/lib/component');
	var _ = require('underscore');
	var text = require('text!/lyrics/setlist.json');
	var gridTemplate = require('hbs!/templates/grid');

	var DataHelper = function () {
		this.after('initialize', function () {
			this.on(document, 'uiNeedsSetlist', this.getSetlist);
		});

		this.getSetlist = function () {
			var data = JSON.parse(text);
			var setlist = _.shuffle(data.setlist);
			$(document).trigger('dataSetlist',
				{html: gridTemplate({tracks: setlist})
			});
		};
	};

	return defineComponent(DataHelper);
});
