var checkuserExist = function() {
						var playerid = $("#playerid_reg").val();
					 // Ajax reqauest  
					 
						$.ajax({
							type: "POST",					
							url:baseUrl+"Signup/checkuser",
							data:{"action":"checkuser","playerid":playerid},
							dataType: 'json',
							success: function(data){
								if(data.status=='exist'){
									ons.notification.alert({
												title: 'Sorry!',
												message: data.message
											});
									return false;
								}else{
									return true;
								}
							},
							error: function(data){
								ons.notification.alert("Internet Connection Problem.");	
							}
							
						}); 
	
				};
				
				
var matchPassword =  function(){
	
							 if ($('#password').val() == $('#confirm_password').val()) {
									return true;
							  }else{ 
								 	ons.notification.alert({
															title: 'Sorry!',
															message: '<center>Password  Not Match</center>'
															});
								return false;							
															
							  }
					}				
								
				
// Signup form submit
document.addEventListener('init', function(event) {
  if (event.target.matches('#signup_page')) {
		
	$("#singup_form").submit(function(e) {
		   e.preventDefault(); // avoid to execute the actual submit of the form.
			// ajax call //
			
		
		
							var formdata 	= $("form").serializeArray();
							console.log(formdata);
							//var formdata[0][];
							
						   // Ajax reqauest 
							$.ajax({
								type:'POST',
								url:baseUrl+"signup/receive",
								data:{"action":"signup","formdata":formdata},
								dataType: 'json',
								success: function(data){
									
										if(data.status=='success'){
											$("#btn-submit").attr("disabled","disabled");
											//sessionStorage.setItem("playerid", data.playerid); // player id
											//sessionStorage.setItem("user_id", data.user_id); // User databas id
											fn.load("login_page.html");
											 ons.notification.alert({
													title: 'Congrates!',
													message: '<center>'+ data.message+ '</center>'
											  });
											
	
										}else if(data.status=='invalid'){
											
												ons.notification.alert({
																	title: 'Sorry!',
																	message: '<center>'+data.message+'</center>'
																  });
											
											return false;
										}
										
								},
								error: function(data){
									ons.notification.alert({
												title: 'Sorry!',
												message: 'Internet Connecion Problem.'
											});
								}
								
							});  
							return false;
			
			
			//
		});
  }
}, false);	

// Signup Otp //
document.addEventListener('init', function(event) {
  if (event.target.matches('#signup_otp')) {
		
	
		$("#otp_form").one('submit',function(e) {
		   e.preventDefault(); // avoid to execute the actual submit of the form.
			//signupOtpCheck();
			///
				var formdata 	= $("form").serializeArray();
								var playerid 	= sessionStorage.getItem("playerid");
								var user_id 	= sessionStorage.getItem("user_id");
							   // Ajax reqauest 
								$.ajax({
									type:'POST',
									url:baseUrl+"signup/otpValidation",
									data:{"action":"otp",'user_id':user_id,'playerid':playerid,"formdata":formdata},
									dataType: 'json',
									success: function(data){
										//console.log(data);
										if(data.status=='success'){
											  localStorage.setItem("playerid", null); // player id
											  localStorage.setItem("user_id", null); // User databas id
											  localStorage.setItem("loginid", null); // User databas id
											  localStorage.removeItem("playerid"); // player id
											  localStorage.removeItem("user_id"); // User databas id
											  localStorage.removeItem("loginid"); // User databas id
											  localStorage.clear();
											
											//localStorage.setItem("user_id", data.user_id); // user_token
											//localStorage.setItem("loginid", data.loginid); // user_token
											//localStorage.setItem("name", data.name); // user_token
											
											if(loginid!==null){
												window.location.replace("panel.html");
											}
											
											
										}else if(data.status=='invalid'){
											ons.notification.alert({
																	title: 'Sorry!',
																	message: '<center>'+data.message+'</center>'
																  });
										}
									return false;	
									},
									error: function(data){
										alert("Error Connection.");
									}
									
								});  
								return false;
			///
		});

		
  }
}, false);					