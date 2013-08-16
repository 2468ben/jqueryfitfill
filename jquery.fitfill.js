/*
	jQuery fitFill
	Ben Donaldson Copyright 2013
	(MIT / I don't care what you do with it except send an email to 2468ben@gmail.com or something and be like "hey, thanks") License

	THE ELEMENT YOU USE THIS ON MUST:
		* BE THE PARENT CONTAINER OF THE <img> YOU WANT TO SCALE
		* HAVE A WIDTH AND A HEIGHT EXPLICITLY SET IN CSS, LIKE "width: 50px" or "width: 100%"

	methods:
		If there's only one image in the container:
			fit() scales the image proportionally to fit in the container
			fill() scales the image proportionally to fill the container
		
		If there's more than one image
			use fitAll() instead of fit()
			use fillAll() instead of fill()
	

	options:
		centerW: centers the image horizontally, default true
		centerH: centers the image vertically, default true

	Ways to use it:

	$('#example_image').fit();
	$('#example_images img').fitAll();
	$('#example_image').fit({centerH: false});
*/
!(function($) {
	var r = function(e, n) {
		var n = $.extend({
			centerW: true,
			centerH: true,
			how: "fit"
		}, n);
		var	r = e.get(0);
		var i = r && r.width && r.height ? r.width / r.height : e.width() / e.height();
		var s = n.parentEl ? n.parentEl : e.parent();
		var o = s.innerWidth(),
			u = s.innerHeight(),
			a = o / u;
		var f = (n.how === "fit" && i < a) || (n.how === "fill" && i > a);
		e.css(f ? {
			height: u,
			width: u * i
		} : {
			width: o,
			height: o / i
		});
		if (n.centerW == true) {
			e.css("margin-left", (o - e.width()) / 2 + "px")
		}
		if (n.centerH == true) {
			e.css("margin-top", (u - e.height()) / 2 + "px")
		}
	};
	var i = function(e, t, n) {
		var r = e.get(0);
		if (r && r.width > 0 && r.height > 0) {
			t(true, e, n)
			if(n.callback) { n.callback(e);}
		} else {
			e.load(function(ev) {
				t(true, e, n)
				if(n.callback) { n.callback(e);}
			})
				.error(function(ev) {
				t(false, e, n)
			})
		}
	};
	var s = function(e, t, n) {
		if (e) r(t, n)
	};
	var o = function(e, n, r) {
		i($(n).find(' > img'), s, $.extend(r, {
			how: e
		}))		
	};
	$.fn.fit = function(opts) {
		o("fit", this, opts);
	};
	$.fn.fill = function(opts) {
		o("fill", this, opts);
	};
	$.fn.fitAll = function(opts) {
		this.each(function(i, el) {
			$(el).fit(opts);
		});
	};
	$.fn.fillAll = function(opts) {
		this.each(function(i, el) {
			$(el).fill(opts);
		});
	};
})(jQuery);
