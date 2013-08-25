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
    parentEl: specify a different parent element than the jquery element you're currently in
    success: function to call when the image successfully loads (function is passed the image element as an argument)
    error: function to call when the image doesn't load (function is passed the image element as an argument)

  Ways to use it:

  $('#example_image').fit();
  $('#example_images img').fitAll();
  $('#example_image').fit({
    centerH: false
  });
  $('#example_image').fit({
    error: function(imgEL) {
    alert("shut down everything");
    }
  });
*/
!(function ($) {
  var scale = function (imgEl, imgHasDims, options) {
    options = $.extend({
      centerW: true,
      centerH: true,
      how: "fit"
    }, options);
    var imgHTML = imgEl.get(0);
    var imgRatio = imgHasDims ? imgHTML.width / imgHTML.height : imgEl.width() / imgEl.height();
    var parentEl = options.parentEl || imgEl.parent();
    var parentWidth = parentEl.innerWidth(),
      parentHeight = parentEl.innerHeight(),
      parentRatio = parentWidth / parentHeight;
    var fitToHeight = (options.how === "fit" && imgRatio < parentRatio) || (options.how === "fill" && imgRatio > parentRatio);
    imgEl.css(fitToHeight ? {
      height: parentHeight,
      width: parentHeight * imgRatio
    } : {
      width: parentWidth,
      height: parentWidth / imgRatio
    });
    if (options.centerW) {
      imgEl.css("margin-left", (parentWidth - imgEl.width()) / 2 + "px");
    }
    if (options.centerH) {
      imgEl.css("margin-top", (parentHeight - imgEl.height()) / 2 + "px");
    }
  };
  var loadImage = function (imgEl, callback, options) {
    var imgHTML = imgEl.get(0);
    if (imgHTML && imgHTML.width && imgHTML.height) {
      callback(imgEl, true, options);
      if(options.success) { options.success(imgEl); }
    } else {
      imgEl.load(function(ev) {
        callback(imgEl, false, options);
        if(options.success) { options.success(imgEl); }
      }).error(function(ev) {
        callback(imgEl, false, options);
        if(options.error) { options.error(imgEl); }
      });
    }
  };
  var fitOrFill = function (how, containerEl, options) {
    var imgEl = $(containerEl).find(' > img');
    if(imgEl) {
      loadImage(imgEl, scale, $.extend(options, { 
        how: how
      }));
    }    
  };
  $.fn.fit = function (options) {
    fitOrFill("fit", this, options);
  };
  $.fn.fill = function (options) {
    fitOrFill("fill", this, options);
  };
  $.fn.fitAll = function (options) {
    this.each(function() {
      $(this).fit(options);
    });
  };
  $.fn.fillAll = function (options) {
    this.each(function() {
      $(this).fill(options);
    });
  };
})(jQuery);
