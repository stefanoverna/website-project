var elem = document.querySelector('.grid');
var msnry = new Masonry(elem, { itemSelector: ".masonry-item" });

var imgLoad = imagesLoaded(elem);
imgLoad.on('progress', function( instance, image ) {
  msnry.layout();
});

