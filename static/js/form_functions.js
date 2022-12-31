// Author: Mint IT Media

/*
	Author: ofa
	Function that sends message through .post and sets the result message (success/failure)
*/

function send_message(message_data, form_id, error_div_id){
	$(error_div_id).html('');
	$(error_div_id).addClass('loading-ajax');
	setTimeout(function(){ 
		$.post( "/send_msg", message_data , 'json').done(function( data ) {
            $(error_div_id).removeClass('loading-ajax').addClass('form-msg-block');
            console.log(data.status);
			if (typeof data.status != 'undefined' && data.status){
				reset_form(form_id);
				$(error_div_id).removeClass('text-danger').addClass('text-success').html('Your message has been successfully received!');
            } else {
            	$(error_div_id).removeClass('text-success').addClass('text-danger').html('There was an error while sending your message, please try again later.');
            }
	   });
	}, 500);

	return true;
}
/*
	Author: Mint
*/

function get_message_data(){
	return  {
		'name' : $('#name').val(),
		'last_name' : $('#last_name').val(),
		'email' : $('#email').val(),
		'message' : $('#message').val(),
	}
}
/*
	Author: ofa
	Function that validates al inputs in div with id=setcion_id

	Modified by: arm
*/
function validate_section(section_id){
	var required_valid_status = email_valid_status = true;
	$(section_id+' input.required-input').each(function(){
		$(this).removeClass('not-valid required');
		if(!$(this).val().length){
			required_valid_status = false;
			$(this).addClass('not-valid required');
		}
	});

	$(section_id+' input.required-email').each(function(){
		$(this).removeClass('not-valid  required');
		if(!$(this).val().length){
			required_valid_status = false;
			$(this).addClass('not-valid  required');
		} else {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  			if ( !regex.test($(this).val()) ){
  				email_valid_status = false;
  				$(this).addClass('not-valid  required');
  			}
		}
	});

	if (!required_valid_status) { errors.push('required-field') }
	if (!email_valid_status) { errors.push('invalid-email') }

	return (required_valid_status && email_valid_status);
}


/*
	Author: ofa
	Funciton returns the error list html based on the 'errors' array

	Modified by: arm
*/

function get_error_list(){
	var errors_html = '';
	if ( $.inArray( 'required-field', errors ) > -1 ) {
		errors_html = errors_html + '<li>Please fill all the required fields.</li>'; }
	if ( $.inArray( 'invalid-email', errors ) > -1 ) { 
		errors_html = errors_html + '<li>Please enter a valid email</li>'; }

	errors_html = '<ul>'+errors_html+'</ul>';
	return errors_html;
}

/*
	Author: ofa
	Cleans all fields in form/div with id=section_id
*/
function reset_form(section_id){
	$(section_id+' input.wiped, '+section_id+' textarea').each(function(){
		$(this).val('');
	});

	return true;
}