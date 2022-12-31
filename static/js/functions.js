// Author: Mint IT Media

$(document).ready(function(){
	//load_scroll_menu();
	//load_contact_form();
	set_content_margin_top();
	scrollster();
	gridlayout();
	close_surfboard();
	mobile_surfboard_nav();
	clone_table();
	itemsSetHeight();
	
	//$('body').scrollspy({ target: '#main_menu_container', offset: 600 });
	load_scroll_listener();
	pushy_menu();
	
	$('body').animate({
		'background': '#f2f2f2 url(#{$img}bkg_pattern.jpg) repeat',
		'opacity': '1'
	})
	$('#contact_form_submit').click(function(){
		errors = []
		if (validate_section('#contact_form')){
			$('#form-msg').html('');
			$('#form-msg').addClass('loading-ajax');
			send_message(get_message_data(), '#contact_form', '#form-msg');
		} else {
			$('#form-msg').removeClass('text-success').addClass('text-danger form-msg-block').html(get_error_list());
		}
		return false;
	});

});

/*
	function to listen scroll and updates main menu according to scroll position
*/
function load_scroll_listener(){
	$( window ).scroll(function() {
		var offset = 120;
		var items = ['contact', 'dealers', 'team', 'surfboards'];
		$('#main_menu').find('.active').removeClass('active');
		for(var i=0; i<items.length; i++){
			if($(window).scrollTop() + offset > $('#'+items[i]).offset().top){
		  		$('#main_menu li.'+items[i]).addClass('active');
		  		break;
		  	}
		}
	});
}
/*
	function validate contact form
function load_contact_form(){
	var fields = new Array('name', 'last_name', 'email', 'message');
	var is_ready = true;
	$('#contact_msg').removeClass();
	$('#contact_form').submit(function(){
		is_ready = true;
		for(var i=0; i<fields.length; i++){
			if($('#'+fields[i]).val() == ''){
				$('#'+fields[i]).addClass('required');
				is_ready = false;
			}else{
				$('#'+fields[i]).removeClass('required');
			}
		}

		if(is_ready){
			$('#contact_msg').addClass('bg-warning').text('Sending, please wait. ').append(loading);
			$.post( "send_msg",{ 
				'name': $('#name').val(),
				'last_name': $('#last_name').val(),
				'email': $('#email').val(),
				'message': $('#message').val()
				}).done(function( data ) {
					if(data == "true"){
						$('#contact_msg').removeClass().addClass("bg-success").text("Thanks, we'll contact you asap.");
						clearForm('contact_form');
					}else{
						$('#contact_msg').addClass('bg-danger').text('Error, please try later.');			
					}
				});
		}else{
			$('#contact_msg').addClass('bg-danger').text('Error, please fill all the fields');
		}
		return false;
	});
}

/*
	function to clear all input fields inside an element
*/
function clearForm(id)
{
    $('#'+id+'>input, #'+id+'>textarea').not(':button, :submit, :reset, :hidden').val('');
}



function mobile_surfboard_nav()
{
	
	$("#surfboards .mobile_nav .next").click(function (e){
		e.preventDefault();	
		if($(".masonry .item.current").hasClass("last")){
			$(".masonry .item.current").removeClass('gigante');
			$(".masonry .item.current").removeClass('current');
			$(".masonry .item.first").addClass('current gigante');
			console.log("a");
		}
		else{
			$(".masonry .item.current").next().addClass('gigante');
			$(".masonry .item.current").removeClass('gigante');
			$(".masonry .item.current").removeClass('current');
			$(".masonry .item.gigante").addClass('current');
			console.log("b");
		}
		
	});
	
	
	$("#surfboards .mobile_nav .prev").click(function (e){	
		e.preventDefault();
		if($(".masonry .item.current").hasClass("first")){
			$(".masonry .item.current").removeClass('gigante');
			$(".masonry .item.current").removeClass('current');
			$(".masonry .item.last").addClass('current gigante');
			console.log("a");
		}
		else{
			$(".masonry .item.current").prev().addClass('gigante');
			$(".masonry .item.current").removeClass('gigante');
			$(".masonry .item.current").removeClass('current');
			$(".masonry .item.gigante").addClass('current');
			console.log("b");
		}
		
	});
	
}


// ********* Alex Functions **************
function set_content_margin_top(){
	$('#main_content').css('margin-top', $(window).height()-20);
	$('#team').css('min-height', $(window).height()-80);
	$('#dealers').css('min-height', $(window).height()-80);
	$('#contact').css('min-height', $(window).height()-80);
	$('#home_marker').css('min-height', $(window).height()-80);
}

function scrollster()
{
    $("ul.nav a").click(function (e){	
        e.preventDefault();
        if($(window).width()<=767){
        	var home_offset = 0;
        	if($(this).hasClass("home")){
        		home_offset = -$(window).height();
			}
        	gotoTop(this.rel, home_offset);
            $('.navbar-collapse').removeClass('in').addClass('collapse').css('height','1px');
        }
        else{
        	gotoTop(this.rel,-80);
        }
    });
    $(".brand").click(function (e){
    	e.preventDefault();
    	gotoTop(this.rel, -$(window).height());
    });
    $(".more_info").click(function (e){
    	e.preventDefault();
		gotoTop(this.rel,-80);
    });
}




function close_surfboard()
{
	$(".surfboard_closer").click(function (){	

		$(".masonry .item").animate({
			scrollTop: 0
		}, 0);
		$(".masonry .item.current").removeClass('gigante');
		$(".masonry .item.current").removeClass('current');
		$(".mobile_nav").addClass('hidden');
		if($(window).width() <= 767){
			$('#main_content').css('margin-top', $(window).height()-20);	
			$('#main_content').css('z-index','4');
			$('html, body').animate({
				scrollTop: $('#surfboards').offset().top + 80
			}, 0);
		}
		return false;
	 });
}	


function clone_table()
{
	
	$(".main_table").each(function(){
	    var newTable = $(this).clone();
			newTable.removeClass("main_table").addClass("small_table");
			$(this).parent().parent().parent().prev().children(".carousel_container .table_mobile").append($(newTable));
	});
	$(".more_info").click(function (e){
    	e.preventDefault();
		gotoTop(this.rel,-80);
		$(".masonry .item.current").removeClass('gigante');
		$(".masonry .item.current").removeClass('current');
		$(".mobile_nav").addClass('hidden');
		$('#main_content').css('z-index','4');
    });
}

/*
	function to autoscroll to a specific element ID
*/
function gotoTop(id, more)
{
	if(id.length)
		$('html, body').animate({
			scrollTop: $('#'+id).offset().top + more
		}, 1000);
}

function gridlayout(){	
	
	var container = document.querySelector('.masonry');
	if($(window).width() <= 550){
		var cWidth = 170;
		$('.masonry > .item').css('width', cWidth);
		$('.masonry > .item').css('height', cWidth-21);
		$('.masonry > .item .big_logo').css('width', cWidth);
		$('.masonry > .item .big_logo').css('height', cWidth-21);
		$('.masonry > .item .big_logo').css('background-size', cWidth);

		var msnry = new Masonry( container, {
			columnWidth: cWidth
		});
	}
	else{
		var msnry = new Masonry( container, {
			columnWidth: 245
		});
	}
	
	$(".masonry .item .wrap .big_logo").click(function (e){
		e.preventDefault();
		if(!$(this).parent().parent().hasClass("gigante")){	
			$('.masonry .item').removeClass('gigante');
			$(this).parent().parent().addClass('gigante current');
			$(".mobile_nav").removeClass('hidden');
			if($(window).width() <= 767){
				$('#main_content').css('z-index','10000');
				$('#main_content').css('margin-top', 0);
			}
			if($(window).width() > 767){
				msnry.layout();
			}
		}
	});
	$(".closer").click(function (e){
		$(this).parent().removeClass('gigante');
		$(".mobile_nav").addClass('hidden');
		$('#main_content').css('z-index','5');
		msnry.layout();
		$('html, body').animate({
			scrollTop: $('#surfboards').offset().top-100
		}, 0);
	});
}
// ********* ItemsSetHeight **************
function itemsSetHeight(){
	if($(window).width()<=767){
		if($(window).height()>=710){
			$('.mobile_nav').css('height', $(window).height()*.1);
			$('.wrap').css('height', $(window).height()*.85);
			$('.carousel_container ').css('height', $(window).height()*.85);
			$('.carousel_container .table_mobile').css('height', $(window).height()*.85 - 410);
		}	
	}
}
// *************************** Push menu, from left ***********************
function pushy_menu(){
	var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
	showLeftPush = document.getElementById( 'showLeftPush' ),
	header = document.getElementById( 'header' ),
	body = document.body;

	showLeftPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toright' );
		classie.toggle( header, 'cbp-spmenu-push-toright' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		//disableOther( 'showLeftPush' );
	};
	$('.cbp-spmenu').click(function (e){
		e.preventDefault();
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toright' );
		classie.toggle( header, 'cbp-spmenu-push-toright' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
	});
	$('.social_mobile a').click(function (e){
        URL = $(this).attr("href");
        window.open(URL,'_blank');
	});
}

