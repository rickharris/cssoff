(function($) {

  $(document).ready(function() {

    var isLegacy = $('html').hasClass('lt-ie8');
    var obstacleWrapper = $('#obstacles');
    var mainNav = $('#top nav');
    var clock = $('#clock');

    if (!isLegacy) {

      // Form enhancements
      // -----------------

      $('select').uniform();
      $('label').inFieldLabels({
        fadeOpacity: 0.7,
        fadeDuration: 200
      });

      // Obstacle show/hide
      // ------------------

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

      // Dynamic menu position
      // ---------------------

      // Trigger the navigation to move whenever we scroll past the bottom of the
      // navigation
      $('#top').waypoint(function(e, dir) {

        // Set the nav to jump to the top of the page by default (i.e. scrolling
        // up)
        var topOffset = 0;

        // If we're scrolling down, we want the nav to jump to the bottom of the
        // header
        if (dir === 'down') {
          topOffset = $(this).height() - mainNav.height();
        }

        mainNav.css('top', topOffset);

      }, { offset: -mainNav.height() });

      // Trigger the navigation to move whenever we scroll past the top of the
      // first two sections
      $('#obstacles, #prizes').waypoint(function(e, dir) {

        // If scrolling up, we want to set the navigation right above the top of
        // the section
        var topOffset = $(this).offset().top;

        // If scrolling down, we want the navigation to jump to right above the
        // next section
        if (dir === 'down') {
          topOffset = $(this).next().offset().top;
        }

        mainNav.css('top', topOffset - mainNav.height());
      });


      // Clock countdown
      // ---------------
      
      (function countDown() {

        function reset() {
          clock.removeClass('alert').text('60');
          setTimeout(decrement, 1000);
        }

        function decrement() {
          var seconds = parseInt(clock.text());
          clock.text(--seconds);

          // If the time is positive, keep countin
          if (seconds > 0) {
            countDown();
          }
          // If we've reached zero, delay and show the alert state
          else {
            clock.addClass('alert');
            setTimeout(reset, 5000);
          }
        }

        setTimeout(decrement, 1000);

      })();

    } // end if isLegacy

  }); // end document.ready

})(jQuery);
