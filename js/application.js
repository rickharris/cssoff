(function($) {

  $(document).ready(function() {

    var isLegacy = $('html').hasClass('lt-ie8');
    var obstacleWrapper = $('#obstacles');

    // Form enhancements
    if (!isLegacy) {
      $('select').uniform();
      $('label').inFieldLabels({
        fadeOpacity: 0.7,
        fadeDuration: 200
      });
    }

    // Obstacle show/hide
    $('#obstacles').find('nav a').click(function(e) {

      var obstacleChoice = $(this);

      e.preventDefault();

      // Only act if this link isn't already the active one
      if (!obstacleChoice.hasClass('active')) {

        obstacleWrapper
          // remove any active classes
          .find('.active').removeClass('active')
          // the 'hidden' class is required for the exit animation and is
          // applied to the previously active obstacle
          .filter('.obstacle').addClass('hidden');

        // Find the obstacle that this link corresponds to and show it
        $('#' + obstacleChoice.attr('class'))
          .removeClass('hidden')
          .addClass('active');

        // Finally, show this link as being the selected one
        obstacleChoice.addClass('active');

      }

    });

  });

})(jQuery);
