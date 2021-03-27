direct_gift_bkash_paymentconfirm_personal


var n =0;
		$("#direct_buy_bkash_confirm").on('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
				
		++n;	
			///onlinegiftBkashConfirm();

			
							var direct_buy_bkash_playerid			= 	sessionStorage.getItem('direct_buy_bkash_playerid');
							var direct_buy_bkash_amount				=   sessionStorage.getItem('direct_buy_bkash_amount');;
							var direct_buy_bkash_trxid				= $("#direct_buy_bkash_trxid").val();
							var bkash_number 						= $("#direct_buy_bkash_mobile").val();
				
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Online_Direct_buy_test/direct_buyBkash",
									data:{"action":"direct_buybkash","bkash_number":bkash_number,"direct_buy_bkash_playerid":direct_buy_bkash_playerid,"direct_buy_bkash_amount":direct_buy_bkash_amount,"direct_buy_bkash_trxid":direct_buy_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":n},
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
													fn.load('buy_chips.html');
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
			
				
				
		});	
		