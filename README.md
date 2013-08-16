jqueryfitfill
=============

Little jQuery plugin for scaling images to fit and fill containers. Even works if the image isn't finished loading.

Ben Donaldson Copyright 2013
(MIT / I don't care what you do with it except it would be really nice if you sent an email to 2468ben@gmail.com and said "hey, thanks" or something) License

**The element you use this with must:**
- **Be the parent element of the <img> you want to scale**
- **Have a width and height explicitly set in CSS, LIKE "width: 50px" or "width: 100%"**

Methods:
- If there's only one image in the container:
	- `fit()` scales the image proportionally to fit in the container
	- `fill()` scales the image proportionally to fill the container
- If there's more than one image
	- use `fitAll()` instead of `fit()`
	- use `fillAll()` instead of `fill()`

Options:
- centerW: centers the image horizontally, default true
- centerH: centers the image vertically, default true

Examples:
- `$('#example_image').fit();`
- `$('#example_images').fitAll();`
- `$('#example_image').fit({centerH: false});`
