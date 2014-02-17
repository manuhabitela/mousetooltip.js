(function(window, document, $){
	function extend(target, source) {
		for (var prop in source) {
			target[prop] = (typeof source[prop] === 'object') ? extend(target[prop], source[prop]) : source[prop];
		}
		return target;
	}

	window.MouseTooltip = {
		init: function(opts) {
			self.opts = extend({
				cssTransforms: false,
				tooltipOffset: { x: 10, y: 10 },
				tooltipClass: 'mouse-tooltip',
				tooltipId: 'mouse-tooltip',
				contentAttr: 'data-tooltip',
				contentClass: 'with-tooltip',
				handleMouseActions: true
			}, opts || {});

			$('#' + self.opts.tooltipId).remove();
			self.$tooltip = $('body').append('<div id="' + self.opts.tooltipId + '" class="' + self.opts.tooltipClass + '"></div>').find('#' + self.opts.tooltipId).first();
			self.hide();

			if (self.opts.handleMouseActions)
				$('body').on('mouseover click mouseout', '.' + self.opts.contentClass, self.onMouseAction);
		},
		show: function(html) {
			self.$tooltip.html(html);
			self.$tooltip.removeClass(self.opts.tooltipClass + '--hidden');
			$(document).on('mousemove.tooltip', self._stickToMouse);
		},
		hide: function() {
			self.$tooltip.addClass(self.opts.tooltipClass + '--hidden');
			$(document).off('mousemove.tooltip');
		},
		_stickToMouse: function(e) {
			xOffset = self.opts.tooltipOffset.x;
			yOffset = self.opts.tooltipOffset.y;
			var win = $(window),
				ttWidth = self.$tooltip.outerWidth(),
				ttHeight = self.$tooltip.outerHeight(),
				mouseX = e.pageX,
				mouseY = e.pageY,
				ttLeft = mouseX,
				ttTop = mouseY;
			if ((mouseX + ttWidth + xOffset) > win.width()) {
				ttLeft = mouseX - ttWidth;
				xOffset = xOffset * -1;
			}
			if ((mouseY + ttHeight + yOffset) > win.height()) {
				ttTop = mouseY - ttHeight;
				yOffset = yOffset * -1;
			}
			ttLeft = ttLeft + xOffset + "px";
			ttTop = ttTop + yOffset + "px";
			var pos = {};
			if (self.opts.cssTransforms && window.Modernizr !== undefined && (Modernizr.csstransforms3d || Modernizr.csstransforms)) {
				pos[Modernizr.prefixed('transform')] = "translateX(" + ttLeft + ") translateY(" + ttTop + ")";
				pos['transform'] = "translateX(" + ttLeft + ") translateY(" + ttTop + ")";
				if (Modernizr.csstransforms3d) {
					pos[Modernizr.prefixed('transform')] += " translateZ(0)";
					pos['transform'] += " translateZ(0)";
				}
			} else
				pos = { left: ttLeft, top: ttTop };
			self.$tooltip.css(pos);
		},
		onMouseAction: function(e, content) {
			$target = $(e.currentTarget);
			if (!content)
				content = $target.attr(self.opts.contentAttr) || $target.find('[' + self.opts.contentAttr + ']').attr(self.opts.contentAttr);
			if (e.type == "mouseover")
				self.show( content );
			else if (e.type == "click")
				self.html( content );
			else
				self.hide();
		}
	};
	var self = window.MouseTooltip;
	self.init();
})(window, document, jQuery);