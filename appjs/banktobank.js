// Bank to bank page init
document.addEventListener('init', function(event) {
  if (event.target.matches('#bank_chips_page')) {
		
		loadAccountInfo();
		
		$("#bank_to_bank_form").one('submit',function(e) {
			e.preventDefault(); 
				//banktobankSubmit();
				
				///
				var bank_to_bank_minibank_id	= $("#bank_to_bank_minibank_id").val();
				var chips_amount				= $("#bank_to_bank_amount").val();
				var comments					= $("#bank_to_bank_comments").val();
							
				$.ajax({
						type:'POST',
						url:baseUrl+"bank_to_bank/doTransfer",
						data:{"action":"bank_to_bank","bank_to_bank_minibank_id":bank_to_bank_minibank_id,"chips_amount":chips_amount,"comments":comments,"user_id":user_id,"loginid":loginid},
						dataType: 'json',
						beforeSend: function(){
										$(".ajaxloader").show();
									},
						complete: function(){
										$(".ajaxloader").hide();
									},
						success: function(data){
							
							if(data.status=="waiting_confirm"){
								
								 $("#bank_to_bank_wrapper").hide();
								 
								 $("#bank_to_bank_id").val(data.bank_to_bank_id);
								 
								 $("#bank_to_bank_minibankid_confirm_show").html(data.minibank_id);
								 $("#bank_to_bank_minibankid_confirm").val(data.minibank_id);
								  
								 $("#bank_to_bank_name_confirm_show").html(data.name);
								 $("#bank_to_bank_name_confirm").val(data.name);
								 
								 $("#bank_to_bank_amount_confirm_show").html(data.chips_amount+"CR");
								 $("#bank_to_bank_amount_confirm").val(data.chips_amount);
								 
						
								 $("#bank_to_bank_comments_confirm_show").html(data.comments);
								 $("#bank_to_bank_comments_confirm").val(data.comments);
						
								 
								 $("#bank_to_bank_confirm_wrapper").show();
								 
							}else if(data.status=="loweramount"){
								
								$("#bank_to_bank_amount").val(5);
								
								ons.notification.alert({
														title: 'Sorry!',
														message: '<center>'+data.message+'</center>'
													  });
							}else if(data.status=="overamount"){
								
								$("#bank_to_bank_amount").val(100);
								
								ons.notification.alert({
														title: 'Sorry!',
														message: '<center>'+data.message+'</center>'
													  });
							}else{
								
								ons.notification.alert({
														title: 'Sorry!',
														message: '<center>'+data.message+'</center>'
													  });
							}
								

							
						},
						error: function(data){
							ons.notification.alert("Internet Connection Problem.");
						}
					
					});
				
				///
		});	
		
	
// bank to bank confirm //	
	var n=0;	
		$("#bank_to_bank_form_confirm").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
		++n;	
				//banktobankConfirm();
					var bank_to_bank_minibank_id	= $("#bank_to_bank_minibank_id").val();
					var chips_amount				= $("#bank_to_bank_amount").val();
					var bank_to_bank_id	 			= $("#bank_to_bank_id").val();
					var comments	 = $("#bank_to_bank_comments_confirm").val();
	
							$.ajax({
									type:'POST',
									url:baseUrl+"Bank_to_bank/confirmBanktoBank",
									data:{"action":"bank_to_bank_confirm","bank_to_bank_id":bank_to_bank_id,"bank_to_bank_minibank_id":bank_to_bank_minibank_id,"chips_amount":chips_amount,"comments":comments,"user_id":user_id,"loginid":loginid,"request":n},
									dataType: 'json',
									beforeSend: function(){
												$(".ajaxloader").show();
											},
									complete: function(){
												$(".ajaxloader").hide();
											},
									success: function(data){
														
										 if(data.status=="success"){
											
											$("#bank_to_bank_confirm_wrapper").show();
											$("#bank_to_bank_wrapper").hide();
											 
											ons.notification.alert({
													title: 'Congrates!',
													message: '<center>'+ data.message+ '</center>',
													callback: function(answer) {
														fn.load('home.html');
													}
												});
											 
											
											
										}else if(data.status=="invalid"){
											ons.notification.alert(data.message);
										}
										
									},
									error: function(data){
										ons.notification.alert("Internet Connection Problem.");
									}
								
								}); 
				///
		});	
	
  }
}, false);
