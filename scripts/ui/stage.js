'use strict'

define(function (require) {
	var defineComponent = require('flight/lib/component');

	var Stage = function () {
		this.defaultAttrs({
			audioSelector: '.audio',
			gifSelector: '.gif',
			titleSelector: '.title',
			artistSelector: '.artist',
			lyricsSelector: '.lyrics',
			lyricSelector: '.lyrical-content',
			closeSelector: '.close',
			singleLyricSelector: '[data-time]'
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
			// set stage
			this.setStage(msg);
			// animate in
			this.$node.css({left: '0'});
		};

		this.setStage = function (msg) {
			var self = this;
			var text = this.parseText(msg.lyrics);
			$('.wrapper').css({position: 'fixed'});
			this.select('audioSelector')[0].src = 'music/'+ msg.asset;
			this.select('gifSelector').css({backgroundImage: 'url(gifs/' + msg.gif +')'});
			this.select('titleSelector').html(msg.title);
			this.select('artistSelector').html(msg.artist);
			this.select('lyricSelector').html(text);
			// set timer
			window.setInterval(function () {
				// get current time
				var time = self.select('audioSelector')[0].currentTime;
				// get all items
				self.select('singleLyricSelector').each(function (key, item) {
					// if current time is greater than id, highlight the item
					if ($(this).data('time') <= time) {
						$(this).addClass('highlight');
					}
				});
				var elements = $('.highlight')
				var scrollElement = $(elements[elements.length - 1]).position().top;
				var top = self.select('lyricsSelector').scrollTop();

				self.select('lyricsSelector').animate({scrollTop: top + scrollElement - 320});
			}, 1000);
		};

		this.parseText = function (text) {
			var html = '';

			_.each(text, function (item) {
				html += '<p data-time="' + item.starttime +'">';
				html += item.content.replace(/\\n/gm, '<br>');
				html += '</p>';
			});

			return html;
		};

		this.clearStage = function () {
			$('.wrapper').css({position: ''});
			this.select('audioSelector')[0].src = '';
			this.select('gifSelector').css({backgroundImage: ''});
			this.select('titleSelector').html('');
			this.select('artistSelector').html('');
			this.select('lyricSelector').html('');
			// Clear stage
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
