

// Withdraw Chips page init				
document.addEventListener('init', function(event) {
  if (event.target.matches('#withdraw_chips_page')) {
		

		loadAccountInfo();
		var n=0;
		$("#withdraw_chips_form").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
				////
		++n;		
				var chips_amount	= $("#withdraw_chips_amount").val();
													
				$.ajax({
						type:'POST',
						url:baseUrl+"withdraw/withdrawChips",
						data:{"action":"withdraw_chips","chips_amount":chips_amount,"user_id":user_id,"loginid":loginid,"request":n},
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
										title: 'Congrates!',
										message: '<center>'+ data.message+ '</center>',
										callback: function(answer) {
											fn.load('home.html');
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
							ons.notification.alert("Internet Connection Problem.");
						}
					
					}); 
				
				
				///
		});	
	
  }
}, false);
