var callback = function(){
	$('.item-skills').each(function(){
		newWidth = $(this).parent().width() * $(this).data('percent');
		$(this).width(0);
    $(this).animate({
        width: newWidth,
    }, 1000);
	});
	$('.icons-red').each(function(){
		height = $(this).height();
    $(this).animate({
        height: 14,
    }, 2000);
	});

	// On hover thumbnail
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('.item-content').hover(function(){ 
		$(this).find('.img-hover').removeClass('bounceOut').addClass('animated bounceIn show');
	}, function(){
		if (getInternetExplorerVersion < 9 ){
			$(this).find('.img-hover').removeClass('bounceIn').addClass('bounceOut'); 
		} else {
			$(this).find('.img-hover').removeClass('animated bounceIn show'); 
		}
	});

	// Get internet explorer version
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	function getInternetExplorerVersion()
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	{
	  var rv = -1; // Return value assumes failure.
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		  rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	}

	// Lightbox
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	var screenWidth, marginLeft;
	var stateObj = {foo: "bar"};
    var pathname = window.location.pathname;
	
	function AnimateLightBox( poplink, postWidth ){
		
		var contentWidth = postWidth ? 0.62 : 0.75; 
		
		if ( postWidth ) {
			screenWidth = ($(window).width() * contentWidth) > 770 ?  770 : $(window).width() * contentWidth;
		} else {
			screenWidth = ($(window).width() * contentWidth) > 970 ?  970 : $(window).width() * contentWidth;
		}
		
		marginLeft =  ((screenWidth) / 2);
		
		// Change the url of the page to the one in the post
		history.pushState( stateObj, 'page', poplink );
				
		$('body').append('<div class="overlay" /><div class="overlay-container" />').addClass('noscroll');
		
		$('.overlay').animate({ opacity : '1' },'fast', function(){
			
			$('.overlay-container').append('<div class="popup-back load-lightbox" /><div class="close-btn"><span class="left"></span><span class="right"></span></div><div class="popup" /> ');

			$.ajax({
				url: poplink,
				data: {},
				cache: false,
				success: function(data){
					// Change the url of the page to the one in the post
					history.pushState( stateObj, 'page', poplink );			
					
					$('.popup').empty().css({marginLeft : -marginLeft + 'px',  width : screenWidth + 'px'});
					
					if ( $(window).width() > 940 ){
						$('.popup').addClass('animated bounceInLeft')
					} else {
						$('.popup').animate({top: '+=100', opacity: 1}, 'fast','swing');
					}
					
					$('.popup-back').removeClass('load-lightbox');
					// Get the information from the portfolio div
					$('.popup').html($(data).find('.content-element')).fadeIn();				
					
					$('.popup-back, .close-btn').on ('click touchend',  function(e){
						
						$('.popup').animate({top: '-=140', opacity: 0}, 'fast','linear', function(){
							$('.overlay-container, .overlay').fadeOut('fast',function(){
						
								$(this).remove();
								$('body').removeClass('noscroll');
							});
														
							history.pushState(stateObj, "page", pathname);
						});
					})						   																
				},
				complete: function(){	
						
					function scroller(){	
					
						var popHeight = $('.popup').height();
					   $('.popup-back').height(popHeight);	
						
						if (! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
									$('.overlay-container').niceScroll({ autohidemode : false, cursorwidth: 9, cursorborder: "1px solid #fff", scrollspeed:100, cursorcolor: '#919191'});
										
								}		
					  } // Scroller			
								
				}
			});//ajax		
		});

	}
	// When the user click on thumbnails
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('.open-popup').on('click touchend', function(e){
		
		e.preventDefault();
		var postWidth = false;
		
		if ( $(window).width() >= 360 && ( navigator.appName !== 'Microsoft Internet Explorer') ){
			
			e.preventDefault();	
			if ($(this).parents().hasClass('preview') || $(this).parents().hasClass('post_image')){
				postWidth = true;
			} else {
				postWidth = false;
			}
			AnimateLightBox($(this).attr('href'), postWidth);
		} else {
			window.location = $(this).attr('href');
		}
	})

	// Load more jobs
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('#loadmorejobs').on('click touched', function() {
		var $buttonval = $(this).find('.loadmoretext').text();
		// console.log("more jobs clicked " +  $buttonval);
		if ($buttonval == 'MORE') {
			$(this).find('.loadmoretext').text('LESS');
			$(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
		} else {
			$(this).find('.loadmoretext').text('MORE');
			$(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
		}
	})
};
$(document).ready(callback);

var resize;
window.onresize = function() {
	clearTimeout(resize);
	resize = setTimeout(function(){
		callback();
	}, 100);
};