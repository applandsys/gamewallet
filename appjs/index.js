document.addEventListener('init', function(event) {

  var page = event.target ;

	
  if (event.target.matches('#splash')) {
	  
	setTimeout(function(){
		
		if(user_id > 0){
				window.location.replace("panel.html");
		}else{
			fn.load('start_page.html');
		}  
	 },
	1000);
	
  }	
  
 // Start Page 
   if (event.target.matches('#start_page')) {
	
	
	if(user_id > 0){
		window.location.replace("panel.html");
	}
	
	page.querySelector('#quick_load_button').onclick = function(){
		data = {data: {title: 'Quick Load'}};
		fn.load('quick_load.html');
		//fn.pushpage('quick_load.html',data,'fade');
	}
	
			
  }

  if (event.target.matches('#forget_pass')) {
		
	
		$("#otp_form").one('submit',function(e) {
		   e.preventDefault(); // avoid to execute the actual submit of the form.
			signupOtpCheck();
		});

		
  }
  
   if(event.target.matches('#forget_pass')) {
		
		$("#forget_pass_form").on('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
			
					
							var forgetpass_playerid		= $("#forgetpass_playerid").val();
			
		
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Forgetpass/sendOtp",
									data:{"action":"forgetpass","forgetpass_playerid":forgetpass_playerid},
									dataType: 'json',
									beforeSend: function(){
												$(".ajaxloader").show();
											},
									complete: function(){
												$(".ajaxloader").hide();
											},
									success: function(data){
													
																								
										 if(data.status=="success"){
	  
											  var user_id = data.user_id;
											  localStorage.setItem("userid", user_id);
											  
											  
											  ons.notification.alert({
													title: 'Congrates!',
													message: '<center>'+ data.message+ '</center>',
													callback: function(answer) {
														fn.load('forget_pass_otp.html');
													}
												});
											 
										
											
										}else if(data.status=="invalid"){
												 
											ons.notification.alert({
																	title: 'Sorry!',
																	message: '<center>'+data.message+'</center>'
																  });
										}
										
									},
									error: function(data){
										ons.notification.alert("Error Connection.");
										
									}
								}); 	
					
					
			///		
		});	
  }

  if(event.target.matches('#forget_pass_otp')) {
		
		$("#forget_pass_otp_form").on('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
			//forgetpassOtpSubmit();
			///
				var forgetpass_otp_code		= $("#forgetpass_otp_code").val();
							
							var userid					= localStorage.getItem("userid");
			

							$.ajax({
									type:'POST',
									url:baseUrl+"Forgetpass/otpCHeck",
									data:{"action":"forgetpassoptcheck","forgetpass_otp_code":forgetpass_otp_code,"userid":userid},
									dataType: 'json',
									beforeSend: function(){
												$(".ajaxloader").show();
											},
									complete: function(){
												$(".ajaxloader").hide();
											},
									success: function(data){
													
																								
										 if(data.status=="success"){
											 
											ons.notification.alert({
																	title: 'OTP!',
																	message: '<center>'+data.message+'</center>'
																  });
																  
							
											 fn.load('forget_pass_reset.html');
											
										}else if(data.status=="invalid"){
												 
											ons.notification.alert({
																	title: 'Sorry!',
																	message: '<center>'+data.message+'</center>'
																  });
										}
										
									},
									error: function(data){
										ons.notification.alert("Error Connection.");
										
									}
								
								}); 
			
			
					
		});	
  }
  
  
    if(event.target.matches('#forget_pass_reset')) {
		
		$("#forget_pass_reset_form").on('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
			///
			
				var user_id					= localStorage.getItem("userid");
				var forgetpass_newpass	= $("#forgetpass_resetpass").val();
						
		
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Forgetpass/updatePassword",
									data:{"action":"forgetpassUpdate","forgetpass_newpass":forgetpass_newpass,"user_id":user_id},
									dataType: 'json',
									success: function(data){
										
										if(data.status=="success"){
											
											var userid = data.user_id;		
											var loginid = data.loginid;		
											var name = data.name;		
											
											localStorage.setItem("loginid",loginid);
											localStorage.setItem("user_id",user_id);
											localStorage.setItem("name",name);
											
											//alert(loginid);
											
											 ons.notification.alert({
													title: 'Congrates!',
													message: '<center>'+ data.message+ '</center>',
													callback: function(answer) {
														//window.location.replace = "panel.html";
														window.location.replace("panel.html");														
													}
											  });
											
											
											
												
										}else{
											ons.notification.alert("Session Expired Try Aain");
										}
											
									},
									error: function(data){
										ons.notification.alert("Error Connection.");
										
									}	
								
								}); 
								
								//////////
								
			
				///	
		});	
  }
  
  
}, false);
