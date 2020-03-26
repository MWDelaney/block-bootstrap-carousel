
jQuery( document ).ready(function() {

  // Add the "Active" class to the every first carousel item
  jQuery('.carousel-inner .carousel-item').first().addClass('active');

  // Create the carousel indicators
  jQuery('.carousel-indicators').each(function() {
    thisIndicators = jQuery(this);
    thisCarousel = jQuery(this).closest('.wp-block-create-block-carousel');

    jQuery(this).closest('.wp-block-create-block-carousel').find('.carousel-item').each(function() {
      thisIndicators.append('<li data-target="#' + thisCarousel.attr('id') + '" data-slide-to="' + jQuery(this).index() + '"></li>')
    });

    // Make the first carousel indicator active
    jQuery('.carousel-indicators li').first().addClass('active');

  });
});
