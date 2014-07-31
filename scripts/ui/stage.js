'use strict'

define(function (require) {
	var defineComponent = require('flight/lib/component');

	var Stage = function () {
		this.defaultAttrs({
			audioSelector: '.audio',
			gifSelector: '.gif',
			titleSelector: '.title',
			artistSelector: '.artist',
			lyricSelector: '.lyrical-content',
			closeSelector: '.close'
		});

		this.after('initialize', function () {
			this.on(document, 'uiStageOpen', this.setup);
			this.on(document, 'dataTrack', this.dataReceived);
			this.on(document, 'keypress', this.printTime);
			this.on('click', {
				'closeSelector': this.closeStage
			});
		});

		this.setup = function (evt, msg) {
			// clear stage
			this.clearStage();
			// request data
			$(document).trigger('uiNeedsTrack', {id: msg.id});
		};

		this.dataReceived = function (evt, msg) {
			console.log(msg);
			// set stage
			this.setStage(msg);
			// animate in
			this.$node.css({left: '0'});
		};

		this.setStage = function (msg) {
			var text = msg.lyrics;
			var newText = msg.lyrics.replace(/\\n/gm, '<br>');
			$('.wrapper').css({position: 'fixed'});
			this.select('audioSelector')[0].src = 'music/'+ msg.asset;
			this.select('gifSelector').css({backgroundImage: 'url(gifs/' + msg.gif +')'});
			this.select('titleSelector').html(msg.title);
			this.select('artistSelector').html(msg.artist);
			this.select('lyricSelector').html(newText);
		};

		this.clearStage = function () {
			$('.wrapper').css({position: ''});
			this.select('audioSelector')[0].src = '';
			this.select('gifSelector').css({backgroundImage: ''});
			this.select('titleSelector').html('');
			this.select('artistSelector').html('');
			this.select('lyricSelector').html('');
		};

		this.closeStage = function () {
			this.$node.css({left: '-100%'});
			this.clearStage();
		};

		this.printTime = function (evt, msg) {
			if (evt.which === 96) {
				console.log(this.select('audioSelector')[0].currentTime);
			}
		};
	};

	return defineComponent(Stage);
});
