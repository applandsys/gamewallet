//Login page
document.addEventListener('init', function(event) {
  if (event.target.matches('#login_page')) {
		
		
		$("#login_form").on('submit',function(e) {
		   e.preventDefault(); // avoid to execute the actual submit of the form.
			 /// ajax call
					var formdata = $("form").serializeArray();
						//console.log(formdata);	
						   // Ajax reqauest 
							$.ajax({
								type:'POST',
								url:baseUrl+"login/authentic",
								data:{"action":"login","formdata":formdata},
								dataType: 'json',
								success: function(data){				
									if(data.status=='success'){
										
											localStorage.setItem("playerid", data.playerid);
											localStorage.setItem("user_id", data.user_id);
											sessionStorage.setItem("csrf_token", data.csrf_token);
										
										fn.load('login_otp.html');
										
									}else if(data.status=='invalid'){
										ons.notification.alert({
												title: 'Sorry!',
												message: data.message
											});
									}
									
								},
								error: function(data){
									ons.notification.alert({
												title: 'Sorry!',
												message: 'Internet Connection Problem'
											});
								}
								
							});  
							return false;
			 
			 
			 // ajax call
		});	
		
		
  }
}, false);	




// Login Otp page //
document.addEventListener('init', function(event) {
  if (event.target.matches('#login_otp')) {
		

		$("#login_otp_form").on('submit',function(e) {
		   e.preventDefault(); // avoid to execute the actual submit of the form.
			/// Login Otp check
									
						var formdata 	= $("form").serializeArray();
						var playerid 	= localStorage.getItem("playerid");
						var user_id 	= localStorage.getItem("user_id");
						var csrf_token 	= sessionStorage.getItem("csrf_token");
					   // Ajax reqauest 
						$.ajax({
							type:'POST',
							url:baseUrl+"login/otpValidation",
							data:{"action":"otp",'user_id':user_id,'playerid':playerid,"formdata":formdata,"csrf_token":csrf_token},
							dataType: 'json',
							success: function(data){
							//	console.log(data.status);
								if(data.status=='success'){
									//ons.notification.alert("Welcome to TPG Minibank");	
									localStorage.setItem("loginid", data.loginid); // user_token
									localStorage.setItem("name", data.name); // user_token
									
									var loginid = localStorage.getItem("loginid");
									
									sessionStorage.removeItem("csrf_token");
									
									
									if(loginid!==0){
										window.location.replace('panel.html');
									}
									
									
									
								}else if(data.status=='invalid'){
									ons.notification.alert("Invalid OTP Code");
								}
							},
							error: function(data){
								
								ons.notification.alert("Error Connection.");
							}
							
						});  
						return false;
			
		});

		
  }
}, false);	