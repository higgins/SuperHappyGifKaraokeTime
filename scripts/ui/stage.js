'use strict'

define(function (require) {
	var defineComponent = require('flight/lib/component');

	var Stage = function () {
		this.defaultAttrs({
			audioSelector: '.audio'
		});

		this.after('initialize', function () {
			this.on(document, 'uiStageOpen', this.setup);
			this.on(document, 'dataTrack', this.dataReceived);
			this.on(document, 'keypress', this.printTime);
		});

		this.setup = function (evt, msg) {
			console.log('yeoo');
			// clear stage
			this.clearStage();
			// request data
			$(document).trigger('uiNeedsTrack', {id: msg.id});
		};

		this.dataReceived = function (evt, msg) {
			console.log(msg.asset);
			// set stage
			this.setStage(msg);
			// animate in
			this.$node.css({left: '50%'});
		};

		this.setStage = function (msg) {
			this.select('audioSelector')[0].src = 'music/'+ msg.asset;
		};

		this.clearStage = function () {
			this.select('audioSelector')[0].src = '';
		};

		this.printTime = function (evt, msg) {
			if (evt.which === 96) {
				console.log(this.select('audioSelector')[0].currentTime);
			}
		};
	};

	return defineComponent(Stage);
});
