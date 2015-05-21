(function($) {
  'use strict';

  $(document).ready(function() {
    $('#press-carousel').each(function() {
      var $carousel = $(this).addClass('active'),
          $contents = $carousel.find('ul.press-content > li'),
          $logos = $carousel.find('ul.press-logos > li'),
          timer;

      $contents.first().addClass('active');
      $logos.first().addClass('active');

      $carousel.on('click', 'ul.press-logos > li', function() {
        select($logos.index(this));
        run();
      });

      function select(i) {
        $logos.eq(i).addClass('active').siblings('.active').removeClass('active');
        $contents.eq(i).addClass('active').siblings('.active').removeClass('active');
      }

      function run() {
        clearTimeout(timer);
        timer = setTimeout(function() {
          select(($logos.index($logos.filter('.active')) + 1) % $logos.size());
          run();
        }, 3000);
      }
      run();
    });

    $('body').on('click', '.marker-wrapper', function() {
      //Disabling function for team&&supporters
      if($(this).parent('.values').length > 0) {
        if (!$(this).is('.marker--open')) {
          var $this = $(this);

          $this
            .addClass('marker--open')
            .find('.marker__modal')
            .stop(true)
            .fadeIn();

          $('body').on('click', function(e) {
            if ($this.has(e.target).size() || $this.is(e.target)) {
              return;
            }

            $this
              .removeClass('marker--open')
              .find('.marker__modal')
              .stop(true)
              .fadeOut();

            $('body').unbind(e);
          });
        }
      }
    });
  });


})(jQuery);
