/**
 * @module unu-navigation.js
 * This module enables navigation effects for main navigation.
 */
(function ($) {
    window.__a = undefined;

    /**
     * Updates the video frame according to the current screen
     * width and height.
     */
    function update() {
        var height = $(window).height()-$('.video-container').offset().top;
        height += (window.cxVariation == 1 ? -105+40 : 0);
        $('.video-container').height(height);

        // A) makes the video full width and vertically centers it,
        // so the scooter is always in the view port for all relevant screen sizes.
        /*$('.video-container video')
            .css('marginTop', ((1080-height)/-2)+'px')
            .css('width','100%');*/

        // B-1) Video full height preferably or even more if width is not
        // sufficient
        var width = $('.video-container').width();
        var h1 = 1080.0/1920.0 * width;
        var w1 = 1920.0/1080.0 * height;
        /*if(h1 < height) {
            console.log('h1 not high enought');
            $('.video-container video')
                .height(height)
                .width(w1);
        } else {
            $('.video-container video')
                .height(h1)
                .width(width);
        }

        $('.video-container video').css('marginTop', (($('.video-container video').height()-height)/-1)+'px');*/

        // B-2)
        if(w1 < width) {
            $('.video-container video')
                .css('height', h1+'px')
                .width('auto');
        } else {
            $('.video-container video')
                .css('height', '100%')
                .css('width', 'auto');
        }

        $('.video-container video').css('marginTop', (($('.video-container video').height()-height)/-1)+'px');
    }

    $(document).ready(function() {
        if($('.video-container').length > 0) {

            var variation = Math.floor((Math.random()*3));
            variation = 0;
            var variations = ['/media/static/unu_1', '/media/static/unu_4', '/media/static/unu_7'];

            // For Mobile Devices, only display a background
            // and don't show a video
            if(navigator.userAgent.match(/Mobi/)) {
                $('.video-container video').remove();
                $('.video-container').css('backgroundImage', 'url("'+variations[variation]+'.jpg")');
            } else {
                var intervalMS = 50.0;
                var fadeMS = 800.0;
                setInterval(function() {
                    var video = $('video[data-video-idx='+variation+']')[0];

                    // Preload the next video, 2 seconds before the current one finishes.
                    if(video.duration-video.currentTime <= 2) {
                        var nextVideo = $('[data-video-idx='+((variation+1)%3)+']');
                        if(!nextVideo.data('preloaded')) {
                            console.log('preloading '+((variation+1)%3));
                            nextVideo[0].load();
                            nextVideo.data('preloaded', true);
                        }
                    }

                    // Fade the videos
                    if(video.duration-video.currentTime <= (fadeMS+intervalMS)/1000.0) {
                        $('[data-video-idx='+variation+']').fadeOut(fadeMS, function() {
                            // Fade in Text
                            $('div[data-video-idx='+variation+']').fadeIn(fadeMS);
                        });
                        variation = (variation+1)%3;

                        var video = $('video[data-video-idx='+variation+']')[0];
                        video.play();

                        // Fade in video.
                        $('video[data-video-idx='+variation+']').fadeIn(fadeMS);
                    }
                }, intervalMS);
            }

            $('[data-video-idx]').hide();
            $('[data-video-idx='+variation+']').show();

            // Playe the first video (if on mobile, the element doesn't exist)
            var video = $('video[data-video-idx='+variation+']')[0];
            if(video) {
                /*$(video).on('canplay', function() {
                    console.log('can play')
                });

                $(video).on('canplaythrough', function() {
                    console.log('can play through');
                });

                $(video).on('load', function() {
                    console.log('load');
                });

                $(video).on('loadstart', function() {
                    console.log('loadstart');
                });*/

                video.load();

                //console.log('Playing first video');
                video.play();
            }

            $(window).resize(update);
            update();

            $('#signup-modal').appendTo(document.body);
        }

        // Hide the Texts of all other variations
        $('[data-variation][data-variation!='+window.cxVariation+']').hide().removeAttr('id');
        $('[data-variation='+window.cxVariation+']').show();

        // Intercept the contact form and track it in analytics
        $('.testdrive-subscribe-form').submit(function(e) {
            if(window._gat) {
                _gaq.push(['_trackEvent', 'TestdriveForm', 'Submission']);
            }

            $('#signup-modal').modal('show');
            $('#signup-modal').height($(document).height());

            $('#signup-modal').find('.maps__modal')
                .css('marginTop', ($('.test-drive-signup:visible').offset().top-$('#signup-modal').find('.maps__modal').height()-10)+'px')
                .css('marginLeft', (($(document).width()-$('#signup-modal').find('.maps__modal').width())/2)+'px');

            return true;
        });
    });
})(jQuery);