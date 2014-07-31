'use strict'

define(function (require) {
	var defineComponent = require('flight/lib/component');

	var Stage = function () {
		this.defaultAttrs({
			audioSelector: '.audio'
		});

		this.after('initialize', function () {
			this.on(document, 'uiStageOpen', this.setup);
			// this.on(document, 'dataSetlist', this.renderSetlist);
		});

		this.setup = function () {
			console.log('yeoo');
			// clear stage
			// request data
			// set stage
			// animate in
			this.$node.css({left: '0'});
		};

		this.dataReceived = function () {
		};

		this.setStage = function () {
		};
	};

	return defineComponent(Stage);
});
