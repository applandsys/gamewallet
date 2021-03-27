
var loaPaymentNumber =  function(amount_cr){

									$.ajax({
											type:'POST',
											url:baseUrl+"Payment_number/bkashNumbers_personal",
											data:{"action":"payment_number_personal","amount_cr":amount_cr,"user_id":user_id,"request_serial":1},
											dataType: 'json',
											beforeSend: function(){
													showModal();
												},
											complete: function(){
													hideModal();
												},
											success: function(data){
																
												 if(data.status=="success"){
													
													$("#bkash-buy-instruction").html(data.message);
													$("#bkash-buy-terms").html(data.notificaition);
													 
													
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
						}			
// Load Payment numbe and Chip price //	
var loaPaymentNumber_personal =  function(amount_cr){
	
							/* 
									//var amount_cr	= $("#direct_buy_bkash_amount").val();
								//var amount_cr	= $("#direct_buy_bkash_amount").val();
									var ref_code = 	sessionStorage.getItem('ref_code');
								
									if(ref_code!==null){
										ref_code = ref_code;
									}else{
										ref_code = null;
									}
								 */
								 var playerid = sessionStorage.getItem('direct_buy_bkash_playerid');
								 
								
									
									$.ajax({
											type:'POST',
											url:baseUrl+"Payment_number/bkashNumbers_personal",
											data:{"action":"payment_number_personal","playerid":playerid,"amount_cr":amount_cr,"user_id":user_id,"request_serial":1},
											dataType: 'json',
													beforeSend: function(){
													showModal();
												},
											complete: function(){
													hideModal();
												},
											success: function(data){
																
											   if(data.status=="success"){
													
													$("#bkash-buy-instruction").html(data.message);
													
													
													
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
						}

				
// Load Payment numbe and Chip price //	
var loaPaymentNumber_payment =  function(amount_cr){
	
								 var playerid = sessionStorage.getItem('direct_buy_bkash_playerid');
								 
								
									$.ajax({
											type:'POST',
											url:baseUrl+"Payment_number/bkashNumbers_payment",
											data:{"action":"payment_number_payment","playerid":playerid,"amount_cr":amount_cr,"user_id":user_id,"request_serial":1},
											dataType: 'json',
											beforeSend: function(){
												$(".ajaxloader").show();
											},
											complete: function(){
												$(".ajaxloader").hide();
											},
											success: function(data){
																
												if(data.status=="success"){	
													$("#bkash-buy-instruction").html(data.message);	
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
						}
						
						
function confirmquickbuy(buytype){
	
	var quick_load_playerid = sessionStorage.getItem('direct_buy_bkash_playerid'); // its a directby player id not only bkash
		
		$.ajax({
				type:'POST',
				url:baseUrl+"Confirmation_check/quick_buy_check",
				data:{"action":"quick_load_check","quick_load_playerid":quick_load_playerid,"buy_type":buytype},
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
									fn.load('start_page.html');
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
	
}						


// Functions end


//Buy chips Main Page // General for all
document.addEventListener('init', function(event) {
  if (event.target.matches('#buy_chips')) {
		
		loadAccountInfo();
		
		
		$.ajax({
			type: "POST",					
			url:baseUrl+"Help_line/get_number",
			data:{"action":"getnumber"},
			dataType: 'json',
			success: function(data){
				
				$("#help_line_number").html("হেল্প লাইন  : " + data.number );
			},
			error: function(data){

			}
			
		}); 
			
	
  }
}, false);



function Nagadtrxidfilterdirectby(str){
	
	var trxid_point =  str.indexOf("TxnID:"); 

	 if(trxid_point>0){
		var end = trxid_point+7;
		
		var result = str.substring(end);
		var new_result = result.substring(0,8); // 0 theke 10 ta raikha bakita bad
		
		//$(this).val(new_result);
		
		$("#direct_buy_nagad_txnid").val(new_result);
	}  
	
}



	// Load Payment numbe and Chip price //	
var loaPaymentNumber_nagad =  function(amount_cr){
	

									
									$.ajax({
											type:'POST',
											url:baseUrl+"Payment_number/nagadNumbers_personal",
											data:{"action":"payment_number_nagad","amount_cr":amount_cr,"user_id":user_id,"request_serial":1},
											dataType: 'json',
											beforeSend: function(){
												$(".ajaxloader").show();
											},
											complete: function(){
												$(".ajaxloader").hide();
											},
											success: function(data){
																
												if(data.status=="success"){	
													$("#nagad_buy_instruction").html(data.message);
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
						}			



// Direct Buy Bkash page // login korar por chip kinte gale je page e bivinno option er button ase
	document.addEventListener('init', function(event) {
	  if (event.target.matches('#direct_gift_bkash')) {
		
		var playerid = localStorage.getItem("playerid");
			
		$("#direct_buy_bkash_playerid").val(playerid);
			
		$("#direct_buy_bkash_first").one('submit',function(e) {
				e.preventDefault(); // avoid to execute the actual submit of the form.
									
					var direct_buy_bkash_playerid = $("#direct_buy_bkash_playerid").val();
					var direct_buy_bkash_amount = $("#direct_buy_bkash_amount").val();
					
					sessionStorage.setItem('direct_buy_bkash_playerid',direct_buy_bkash_playerid);
					sessionStorage.setItem('direct_buy_bkash_amount',direct_buy_bkash_amount);

				
					fn.load('payment_option_select.html')
					
			});
				
		
	  }
	}, false);
	



		




	document.addEventListener('init', function(event) {
	  if (event.target.matches('#direct_gift_bkash_paymentoption_personal')) {
			var direct_buy_bkash_playerid = sessionStorage.getItem('direct_buy_bkash_playerid');		
			var direct_buy_bkash_amount = sessionStorage.getItem('direct_buy_bkash_amount');		
			loaPaymentNumber_personal(direct_buy_bkash_amount);
	  }
	}, false);


	// Login user ra bkash payment sim e  kore chip player board (gift) kinle number show kore and amount dekhay
	document.addEventListener('init', function(event) {
	  if (event.target.matches('#direct_gift_bkash_paymentoption_payment')) {
			var direct_buy_bkash_amount = sessionStorage.getItem('direct_buy_bkash_amount');		
			loaPaymentNumber_payment(direct_buy_bkash_amount);
	  }
	}, false);


	document.addEventListener('init', function(event) {
	if(event.target.matches('#direct_gift_nagad_paymentconfirm')) {

		
	
			$("#direct_buy_nagad_confirm").one('submit',function(e) {
				
				e.preventDefault(); 
				
					var direct_buy_playerid			= 	sessionStorage.getItem('direct_buy_bkash_playerid'); // bkash is not bkash // 
					var direct_buy_amount			=   sessionStorage.getItem('direct_buy_bkash_amount');;
					
					var direct_buy_nagad_txnid			=   $("#direct_buy_nagad_txnid").val();
						
					$.ajax({
							type:'POST',
							url:baseUrl+"Online_Direct_buy/direct_buyNagad",
							data:{"action":"direct_buybnagad","direct_buy_playerid":direct_buy_playerid,"direct_buy_amount":direct_buy_amount,"direct_buy_nagad_txnid":direct_buy_nagad_txnid,"user_id":user_id,"loginid":loginid,"request":1},
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
			///
		});
		
	}
}, false);					
						


// Direct Buy end


// BANK BUY START
document.addEventListener('init', function(event) {
  if (event.target.matches('#bank_buy_nagad_paymentoption_personal')) {
	var bank_buy_bkash_amount = sessionStorage.getItem('bank_buy_bkash_amount');	
	//alert(bank_buy_bkash_amount);	
	loaPaymentNumber_nagad(bank_buy_bkash_amount);
  }
}, false);

// bank buy bkash payment option page
document.addEventListener('init', function(event) {
  if (event.target.matches('#bank_buy_bkash_paymentoption_personal')) {
		var bank_buy_bkash_amount = sessionStorage.getItem('bank_buy_bkash_amount');		
		loaPaymentNumber_personal(bank_buy_bkash_amount);
  }
}, false);

document.addEventListener('init', function(event) {
  if (event.target.matches('#bank_buy_bkash_paymentoption_payment')) {
		var bank_buy_bkash_amount = sessionStorage.getItem('bank_buy_bkash_amount');		
		loaPaymentNumber_payment(bank_buy_bkash_amount);
  }
}, false);


document.addEventListener('init', function(event) {
  if (event.target.matches('#bank_buy_bkash')) {

  
	$("#bank_buy_bkash_first").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
				
			

				var bank_buy_bkash_amount = $("#bank_buy_bkash_amount").val();
				
				sessionStorage.setItem('bank_buy_bkash_amount',bank_buy_bkash_amount);
			//	var amount_cr = sessionStorage.getItem('bank_buy_bkash_amount');

				
			//	loaPaymentNumber(amount_cr);
			
				fn.load('bank_payment_option_select.html')
				
		});
			
	
  }
}, false);





// Bank load bkash personal dia  confirm kora//
document.addEventListener('init', function(event) {
	
  if (event.target.matches('#bank_buy_bkash_paymentconfirm')) {
	
	  

	$("#bank_buy_go_for_trxid").on('submit',function(e) {
		e.preventDefault();
		
	

		var bkash_number 	= $("#bank_buy_bkash_mobile").val();
		var ref_code 		= $("#bank_buy_bkash_refcode").val();
		
		//alert(bkash_number);
		
			$.ajax({
				type:'POST',
				url:baseUrl+"Load_trxid/loadTrxid",
				data:{"action":"loadtrxid","ref_code":ref_code,"bkash_number":bkash_number,"request_serial":1},
				dataType: 'json',
				beforeSend: function(){
							$(".ajaxloader").show();
						},
				complete: function(){
							$(".ajaxloader").hide();
						},
				success: function(data){
												
					if(data.status=="success"){
						 
						var loaded_trxid =  data.message;
						 
						$("#bank_buy_bkash_trxid").val(loaded_trxid);
						
						$("#bank_buy_trxid_inputbox").show(2000); 
						
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
				
			//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
			//	sessionStorage.setItem('direct_buy_bkash_amount', null);
				
			
			}); 
		return false;						
	});
	  
	  
		var n=0;
		$("#bank_buy_bkash_confirm").one('submit',function(e) {
			e.preventDefault(); 
			++n;
							var bank_buy_bkash_amount				=   sessionStorage.getItem('bank_buy_bkash_amount');;
							var bank_buy_bkash_trxid				= $("#bank_buy_bkash_trxid").val();
							var bkash_number 						= $("#bank_buy_bkash_mobile").val();
				
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Online_bank_load/bank_buyBkash",
									data:{"action":"bank_buybkash","bkash_number":bkash_number,"bank_buy_bkash_amount":bank_buy_bkash_amount,"bank_buy_bkash_trxid":bank_buy_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":n},
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
									
								//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
								//	sessionStorage.setItem('direct_buy_bkash_amount', null);
									
								
								}); 
			///
		});	
  }
}, false);




// Bank load bkash Payment sim dia confirm //
document.addEventListener('init', function(event) {
	
  if (event.target.matches('#bank_buy_bkash_payment_paymentconfirm')) {
	  

	$("#bank_buy_bikash_payment_go_for_trxid").on('submit',function(e) {
		e.preventDefault();
		var bkash_number = $("#bank_buy_bkash_payment_mobile").val();
		var ref_code = $("#bank_buy_bkash_payment_refcode").val();
		
		//alert(bkash_number);
		
								$.ajax({
									type:'POST',
									url:baseUrl+"Load_trxid/loadTrxid",
									data:{"action":"loadtrxid","ref_code":ref_code,"bkash_number":bkash_number,"request_serial":1},
									dataType: 'json',
									beforeSend: function(){
												$(".ajaxloader").show();
											},
									complete: function(){
												$(".ajaxloader").hide();
											},
									success: function(data){
																	
										if(data.status=="success"){
											 
											var loaded_trxid =  data.message;
											 
											$("#bank_buy_bkash_payment_trxid").val(loaded_trxid);
											
											$("#bank_buy_bkash_payment_trxid_inputbox").show(2000); 
											
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
									
								//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
								//	sessionStorage.setItem('direct_buy_bkash_amount', null);
									
								
								}); 
		return false;						
	});
	  
	  
		var bank_buy_bkash_paymentsim_confirm =0;
		$("#bank_buy_bkash_payment_confirm").one('submit',function(e) {
			e.preventDefault(); 			
			++bank_buy_bkash_paymentsim_confirm;
							var bank_buy_bkash_amount				=   sessionStorage.getItem('bank_buy_bkash_amount');;
							var bank_buy_bkash_trxid				= $("#bank_buy_bkash_payment_trxid").val();
							var bkash_number 						= $("#bank_buy_bkash_payment_mobile").val();
				
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Online_bank_load/bank_buyBkash",
									data:{"action":"bank_buybkash","bkash_number":bkash_number,"bank_buy_bkash_amount":bank_buy_bkash_amount,"bank_buy_bkash_trxid":bank_buy_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":bank_buy_bkash_paymentsim_confirm},
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
			///
		});	
  }
}, false);



// MINIBANK BUY END



// ANOTHER MINIBANK BUY START

document.addEventListener('init', function(event) {
  if (event.target.matches('#another_minibank_buy_bkash_paymentoption_payment')) {
		var bank_buy_bkash_amount = sessionStorage.getItem('another_minibank_bkash_amount');		
		loaPaymentNumber_payment(bank_buy_bkash_amount);
  }
}, false);

document.addEventListener('init', function(event) {
  if (event.target.matches('#another_minibank_buy_bkash_paymentoption_personal')) {
		var bank_buy_bkash_amount = sessionStorage.getItem('another_minibank_bkash_amount');		
		loaPaymentNumber_personal(bank_buy_bkash_amount);
  }
}, false);

document.addEventListener('init', function(event) {
  if (event.target.matches('#another_minibank_buy_nagad_paymentoption')) {
		var bank_buy_bkash_amount = sessionStorage.getItem('another_minibank_bkash_amount');		
		loaPaymentNumber_nagad(bank_buy_bkash_amount);
  }
}, false);





document.addEventListener('init', function(event) {
	if(event.target.matches('#another_minibank_bkash')) {
		
		$("#another_minibank_bkash_buy_first").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.

				 var another_minibank_bkash_buy_id = $("#another_minibank_bkash_buy_id").val();
				 var another_minibank_bkash_amount = $("#another_minibank_bkash_amount").val();
				
				 sessionStorage.setItem('another_minibank_bkash_buy_id',another_minibank_bkash_buy_id);
				 sessionStorage.setItem('another_minibank_bkash_amount',another_minibank_bkash_amount);
				
			
				fn.load('another_minibank_payment_option_select.html')
				
		});
	}
}, false);






// Login user ra Another Minibank e personal sim e payment korar por //
document.addEventListener('init', function(event) {
	if(event.target.matches('#another_minibank_bkash_buy_paymentconfirm_personal')) {
		
	$("#another_bank_buy_go_for_trxid").on('submit',function(e) {
		e.preventDefault();
		
		var bkash_number 	= $("#another_bank_buy_bkash_mobile").val();
		var ref_code 		= $("#another_bank_buy_bkash_refcode").val();
		
		//alert(bkash_number);
		
								$.ajax({
									type:'POST',
									url:baseUrl+"Load_trxid/loadTrxid",
									data:{"action":"loadtrxid","ref_code":ref_code,"bkash_number":bkash_number,"request_serial":1},
									dataType: 'json',
									success: function(data){
																	
										if(data.status=="success"){
											 
											var loaded_trxid =  data.message;
											 
											$("#another_minibank_bkash_trxid").val(loaded_trxid);
											
											$("#anoter_bank_buy_trxid_inputbox").show(3000); 
											
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
									
								//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
								//	sessionStorage.setItem('direct_buy_bkash_amount', null);
									
								
								});

		return false;							
	});
		
		
		
	// another bkash //
		var n=0;
			$("#another_bank_buy_bkash_confirm").one('submit',function(e) {
				++n;
				e.preventDefault(); 
							var another_minibank_bkash_buy_id				=   sessionStorage.getItem('another_minibank_bkash_buy_id');;
							var another_minibank_bkash_amount				=   sessionStorage.getItem('another_minibank_bkash_amount');;
							var another_minibank_bkash_trxid				=  	$("#another_minibank_bkash_trxid").val();
							
							//alert(another_minibank_bkash_trxid);
							var bkash_number 								= 	$("#another_bank_buy_bkash_mobile").val();
				
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Online_another_bank_load/another_minibank_bkash_buy",
									data:{"action":"another_minibank_bkash_buy","bkash_number":bkash_number,"another_minibank_bkash_buy_id":another_minibank_bkash_buy_id,"another_minibank_bkash_amount":another_minibank_bkash_amount,"another_minibank_bkash_trxid":another_minibank_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":n},
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
			///
		});
		
	}
}, false);


document.addEventListener('init', function(event) {
	if(event.target.matches('#another_minibank_bkash_buy_paymentconfirm_payment')) {
		
	$("#another_bank_buy_go_for_trxid").on('submit',function(e) {
		e.preventDefault();
		
		var bkash_number 	= $("#another_bank_buy_bkash_mobile").val();
		var ref_code 		= $("#another_bank_buy_bkash_refcode").val();
		
		//alert(bkash_number);
		
								$.ajax({
									type:'POST',
									url:baseUrl+"Load_trxid/loadTrxid",
									data:{"action":"loadtrxid","ref_code":ref_code,"bkash_number":bkash_number,"request_serial":1},
									dataType: 'json',
									success: function(data){
																	
										if(data.status=="success"){
											 
											var loaded_trxid =  data.message;
											 
											$("#another_minibank_bkash_trxid").val(loaded_trxid);
											
											$("#anoter_bank_buy_trxid_inputbox").show(3000); 
											
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
									
								//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
								//	sessionStorage.setItem('direct_buy_bkash_amount', null);
									
								
								});

		return false;							
	});
		
		
		
	// another bkash //
		var n=0;
			$("#another_bank_buy_bkash_confirm").one('submit',function(e) {
				++n;
				e.preventDefault(); 
							var another_minibank_bkash_buy_id				=   sessionStorage.getItem('another_minibank_bkash_buy_id');;
							var another_minibank_bkash_amount				=   sessionStorage.getItem('another_minibank_bkash_amount');;
							var another_minibank_bkash_trxid				=  	$("#another_minibank_bkash_trxid").val();
							
							//alert(another_minibank_bkash_trxid);
							var bkash_number 								= 	$("#another_bank_buy_bkash_mobile").val();
				
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Online_another_bank_load/another_minibank_bkash_buy",
									data:{"action":"another_minibank_bkash_buy","bkash_number":bkash_number,"another_minibank_bkash_buy_id":another_minibank_bkash_buy_id,"another_minibank_bkash_amount":another_minibank_bkash_amount,"another_minibank_bkash_trxid":another_minibank_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":n},
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
			///
		});
		
	}
}, false);



// Nagad Payment confirm //
document.addEventListener('init', function(event) {
	if(event.target.matches('#another_minibank_buy_nagad_paymentconfirm')) {
		
		
		// Another minibank
			var n=0;
			$("#another_bank_buy_nagad_confirm").one('submit',function(e) {
				++n;
				e.preventDefault(); 
				var another_minibank_bkash_buy_id				=   sessionStorage.getItem('another_minibank_bkash_buy_id');;
				var another_minibank_bkash_amount				=   sessionStorage.getItem('another_minibank_bkash_amount');;
				var another_minibank_bkash_trxid				=  	$("#another_bank_buy_nagad_txnid").val();
				



			$.ajax({
					type:'POST',
					url:baseUrl+"Online_another_bank_load/another_minibank_nagad",
					data:{"action":"another_minibank_nagad","another_minibank_bkash_buy_id":another_minibank_bkash_buy_id,"another_minibank_bkash_amount":another_minibank_bkash_amount,"another_minibank_bkash_trxid":another_minibank_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":n},
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
			///
		});
		
		
		// Another minibank end
		
	
		
	}
}, false);


document.addEventListener('init', function(event) {
	if(event.target.matches('#bank_buy_nagad_payment_paymentconfirm')) {

		
		var bank_buy_bkash_paymentsim_confirm =0;
		$("#bank_buy_nagad_confirm").one('submit',function(e) {
			e.preventDefault(); 			
			
			///
			++bank_buy_bkash_paymentsim_confirm;
			var bank_buy_bkash_amount				=   sessionStorage.getItem('bank_buy_bkash_amount');;
			var bank_buy_bkash_trxid				= $("#bank_buy_nagad_txnid").val();

			$.ajax({
					type:'POST',
					url:baseUrl+"Online_bank_load/bank_buyNagad",
					data:{"action":"bank_buynagad","bank_buy_bkash_amount":bank_buy_bkash_amount,"bank_buy_bkash_trxid":bank_buy_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":bank_buy_bkash_paymentsim_confirm},
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
			///
		});
		
	}
}, false);








// COMPANY BANK BUY						
document.addEventListener('init', function(event) {
  if (event.target.matches('#companybank_buy')) {
	
	var playerid = localStorage.getItem("playerid");
		
	$("#companybank_buy_playerid").val(playerid);
		
	$("#companybank_buy_first").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
								
				var playerid = $("#companybank_buy_playerid").val();
				var chips_amount = $("#companybank_amount").val();
				
				sessionStorage.setItem('companybank_buy_bkash_playerid',playerid);
				sessionStorage.setItem('companybank_buy_bkash_amount',chips_amount);


				fn.load('companybank_payment_option_select.html')
				
		});
			
	
  }
}, false);




document.addEventListener('init', function(event) {
  if (event.target.matches('#companybank_bkash_paymentconfirm_personal')) {
		
		
	$("#companybank_buy_go_for_trxid").on('submit',function(e) {
		e.preventDefault();
		var bkash_number 	= $("#companybank_buy_bkash_mobile").val();
		var ref_code 		= $("#companybank_buy_bkash_refcode").val();
		
		//alert(bkash_number);
		
			$.ajax({
				type:'POST',
				url:baseUrl+"Load_trxid/loadTrxid",
				data:{"action":"loadtrxid","ref_code":ref_code,"bkash_number":bkash_number,"request_serial":1},
				dataType: 'json',
				beforeSend: function(){
							$(".ajaxloader").show();
						},
				complete: function(){
							$(".ajaxloader").hide();
						},
				success: function(data){
												
					if(data.status=="success"){
						 
						var loaded_trxid =  data.message;
						 
						$("#companybank_buy_bkash_trxid").val(loaded_trxid);
						
						$("#companybank_buy_trxid_inputbox").show(); 
						
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
								
		return false;						
	});		
	
	
	
	
// 2nd step of Chips buy after login with bkash personal // Confirm kora
	var n =0;
		$("#companybank_buy_bkash_confirm").on('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
				
		++n;	
			///onlinegiftBkashConfirm();

			
							var companybank_buy_bkash_playerid			= 	sessionStorage.getItem('companybank_buy_bkash_playerid');
							var companybank_buy_bkash_amount				=   sessionStorage.getItem('companybank_buy_bkash_amount');;
							var companybank_buy_bkash_trxid				= $("#companybank_buy_bkash_trxid").val();
							var bkash_number 						= $("#companybank_buy_bkash_mobile").val();
				
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Companybank_buy/buyBkash",
									data:{"action":"companybank_buybkash","bkash_number":bkash_number,"companybank_buy_bkash_playerid":companybank_buy_bkash_playerid,"companybank_buy_bkash_amount":companybank_buy_bkash_amount,"companybank_buy_bkash_trxid":companybank_buy_bkash_trxid,"user_id":user_id,"loginid":loginid,"request":1},
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
		
			
	
  }
}, false);
	


document.addEventListener('init', function(event) {
  if (event.target.matches('#companybank_buy_bkash_paymentoption_personal')) {
		var chips_amount = sessionStorage.getItem('companybank_buy_amount');		
		loaPaymentNumber_personal(chips_amount);
  }
}, false);


// Login user ra bkash payment sim e  kore chip player board (gift) kinle number show kore and amount dekhay
document.addEventListener('init', function(event) {
  if (event.target.matches('#companybank_bkash_paymentoption_payment')) {
		var chips_amount = sessionStorage.getItem('companybank_buy_amount');		
		loaPaymentNumber_payment(chips_amount);
  }
}, false);


document.addEventListener('init', function(event) {
  if (event.target.matches('#companybank_nagad_paymentoption')) {
		var chips_amount = sessionStorage.getItem('companybank_buy_amount');		
		loaPaymentNumber_nagad(chips_amount);
  }
}, false);