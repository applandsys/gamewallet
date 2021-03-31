document.addEventListener('init', function(event) {
	
   var page = event.target ;
	
	
  if (event.target.matches('#quick_load')) {
		
	$("#quick_load_first").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
								
				var quick_load_playerid = $("#quick_load_playerid").val();
				var quick_load_amount = $("#quick_load_amount").val();
				
				sessionStorage.setItem('quick_load_playerid',quick_load_playerid);
				sessionStorage.setItem('quick_load_amount',quick_load_amount);
				
				// Token Create
				
				// ajax request to set quick load token //
				quick_load_token_create();
			
				fn.load('quick_load_payment_option_select.html')
				
		});
		
	//load price
		$.ajax({
			type: "POST",					
			url:baseUrl+"Price_list/price_quickbuy",
			data:{"action":"pricelist"},
			dataType: 'json',
			success: function(data){
				$("#quickbuy_price").html(" প্রতি ক্রোর   চিপস " + data.unit_price + " টাকা ");
			},
			error: function(data){

			}
		});

//load price
	$.ajax({
			type: "POST",					
			url:baseUrl+"Help_line/get_number",
			data:{"action":"getnumber"},
			dataType: 'json',
			success: function(data){
				localStorage.setItem('helpline',data.number);
				$("#help_line_number").html("হেল্প লাইন  : " + data.number + " <br/> ইমো & ওয়াটসঅ্যাপ : " + data.imo_whatsapp);
			},
			error: function(data){

			}
			
		}); 
	
  }
 
// Quick load payment option bkash personal // 
  if (event.target.matches('#quick_load_paymentoption_bkash_personal')) {
		var quick_load_amount = sessionStorage.getItem('quick_load_amount');		
		quickloaPaymentNumberPersonal(quick_load_amount);
		load_helpline();
  }
  
 // Quick load payment option bkash Payment //  
   if (event.target.matches('#quick_load_paymentoption_bkash_payment')) {
		var quick_load_amount = sessionStorage.getItem('quick_load_amount');		
		quickloaPaymentNumberPayment(quick_load_amount);
		load_helpline();
  }

 // Quick load payment option Nagad Personal //    
   if (event.target.matches('#quick_load_paymentoption_nagad_personal')) {
		var quick_load_amount = sessionStorage.getItem('quick_load_amount');		
		quickloaPersonalNumberNagad(quick_load_amount);
		load_helpline();
  }
  
 // Quick load payment option Nagad Payment //  
   if (event.target.matches('#quick_load_paymentoption_nagad_payment')) {
		var quick_load_amount = sessionStorage.getItem('quick_load_amount');		
		quickloaPaymentNumberNagad(quick_load_amount);
		load_helpline();
  }
 
// Quick load payment confirm bkash personal
  if (event.target.matches('#quick_load_paymentconfirm_bkash_personal')) {
		
	load_helpline();	
		
	var n = 1; 

	$("#trxid_load_form").on('submit',function(e) {
			e.preventDefault(e);
		//++n;
		
		
		var bkash_number = $("#quick_load_mobile").val();
		var quick_load_ref_code = $("#quick_load_ref_code").val();
		
		
			$.ajax({
				type:'POST',
				url:baseUrl+"Load_trxid/loadTrxid",
				data:{"action":"loadtrxid","bkash_number":bkash_number,"ref_code":quick_load_ref_code,"request_serial":n},
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
						 
						$("#quick_load_bkash_trxid").val(loaded_trxid);
						
						$("#quick_load_trxid_inputbox").show(3000); 
						
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
			return false;								
									
	});		
	
// Direct buy Bkash Payment confirm //	
		var n=0;
		$("#quick_load_confirm").on('submit',function(e) {
			e.preventDefault(e); // avoid to execute the actual submit of the form.
			++n;		
			
			///onlinegiftBkashConfirm();

			
							var quick_load_playerid			= 	sessionStorage.getItem('quick_load_playerid');
							var quick_load_amount			=   sessionStorage.getItem('quick_load_amount');
							var quick_load_bkash_trxid		= 	$("#quick_load_bkash_trxid").val();
							var bkash_number 				= 	$("#quick_load_mobile").val();
							var quick_load_token 			= 	sessionStorage.getItem('quick_load_token');
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Quick_load/quick_load",
									data:{"action":"quick_load","bkash_number":bkash_number,"quick_load_playerid":quick_load_playerid,"quick_load_amount":quick_load_amount,"quick_load_bkash_trxid":quick_load_bkash_trxid,"quick_load_token":quick_load_token,"request":n},
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
			
			return false;		
				
		});	
		
  } 
  
  
  
   if (event.target.matches('#quick_load_paymentconfirm_bkash_payment')) {
		
	var n = 1; 
	$("#trxid_load_form_bkash_payment").on('submit',function(e) {
			e.preventDefault(e);
		++n;
		
		
		var bkash_number 		= $("#quick_load_mobile").val();
		var quick_load_ref_code = $("#quick_load_ref_code").val();
		
		
		//alert(bkash_number);
		
							
		
		
								$.ajax({
									type:'POST',
									url:baseUrl+"Load_trxid/loadTrxid",
									data:{"action":"loadtrxid","bkash_number":bkash_number,"ref_code":quick_load_ref_code,"request_serial":n},
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
											 
											$("#quick_load_bkash_trxid").val(loaded_trxid);
											
											$("#quick_load_trxid_inputbox").show(3000); 
											
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
									
								//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
								//	sessionStorage.setItem('direct_buy_bkash_amount', null);
									
								
								});
			return false;								
									
	});		
	
// Direct buy Bkash Payment confirm //	
		var n=0;
		$("#quick_load_confirm").on('submit',function(e) {
			e.preventDefault(e); // avoid to execute the actual submit of the form.
			++n;		
			
			///onlinegiftBkashConfirm();

				var quick_load_playerid			= 	sessionStorage.getItem('quick_load_playerid');
				var quick_load_amount			=   sessionStorage.getItem('quick_load_amount');
				var quick_load_bkash_trxid		= 	$("#quick_load_bkash_trxid").val();
				var bkash_number 				= 	$("#quick_load_mobile").val();
				var quick_load_token 			= 	sessionStorage.getItem('quick_load_token');
			
				$.ajax({
						type:'POST',
						url:baseUrl+"Quick_load/quick_load",
						data:{"action":"quick_load","bkash_number":bkash_number,"quick_load_playerid":quick_load_playerid,"quick_load_amount":quick_load_amount,"quick_load_bkash_trxid":quick_load_bkash_trxid,"quick_load_token":quick_load_token,"request":n},
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
			
			return false;		
				
		});	
		
		
	
  }
  
  
    if (event.target.matches('#quick_load_paymentconfirm_nagad_personal')) {
		
		var n=0;
		$("#trxid_load_form_nagad_personal").on('submit',function(e) {
			e.preventDefault(e); // avoid to execute the actual submit of the form.
			++n;		
			
			var quick_load_playerid			= 	sessionStorage.getItem('quick_load_playerid');
			var quick_load_amount			=   sessionStorage.getItem('quick_load_amount');
			var quick_load_nagad_txnid		= 	$("#quick_load_nagad_txnid").val();
			var quick_load_token 			= 	sessionStorage.getItem('quick_load_token');

			$.ajax({
					type:'POST',
					url:baseUrl+"Quick_load/quick_load_nagad_personal",
					data:{"action":"quick_load","quick_load_playerid":quick_load_playerid,"quick_load_amount":quick_load_amount,"quick_load_nagad_txnid":quick_load_nagad_txnid,"quick_load_token":quick_load_token,"request":n},
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
			
			return false;		
				
		});	
		
  }
  
 // Payment confirm nagad // 
    if (event.target.matches('#quick_load_paymentconfirm_nagad_payment')) {
		
		var n=0;
		$("#trxid_load_form_nagad_payment").on('submit',function(e) {
			e.preventDefault(e); // avoid to execute the actual submit of the form.
			++n;		
			
			var quick_load_playerid			= 	sessionStorage.getItem('quick_load_playerid');
			var quick_load_amount			=   sessionStorage.getItem('quick_load_amount');
			var quick_load_nagad_trxid		= 	$("#quick_load_nagad_txnid").val();
			var quick_load_token 			= 	sessionStorage.getItem('quick_load_token');

			$.ajax({
					type:'POST',
					url:baseUrl+"Quick_load/quick_load_nagad_payment",
					data:{"action":"quick_load","quick_load_playerid":quick_load_playerid,"quick_load_amount":quick_load_amount,"quick_load_nagad_trxid":quick_load_nagad_trxid,"quick_load_token":quick_load_token,"request":n},
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
			
			return false;		
				
		});	
		
  }
  
  
  
 // end init 
}, false);





// Functions
function Nagadtrxidfilterdirectby(str){
	
	var trxid_point =  str.indexOf("TxnID:"); 

	 if(trxid_point>0){
		var end = trxid_point+7;
		
		var result = str.substring(end);
		var new_result = result.substring(0,8); // 0 theke 10 ta raikha bakita bad
		
		//$(this).val(new_result);
		
		$("#quick_load_nagad_txnid").val(new_result);
	}  
	
}	



var quick_load_token_create =	function(){
	
										var buy_token = sessionStorage.getItem("quick_load_token");
										
										if(buy_token===null){
												$.ajax({
													type:'POST',
													url:baseUrl+"Quick_load/creat_buy_token",
													data:{"action":"quick_load_create_token"},
													dataType: 'json',
													success: function(data){
																		
														sessionStorage.setItem("quick_load_token",data.token);
														
													},
													error: function(data){
														ons.notification.alert("Error Connection.");
														
													}
											
											});
											
										}
										 
								}
								

	
// Load Payment numbe and Chip price //	
var quickloaPaymentNumberPersonal =  function(amount_cr){
	
							
										//var amount_cr	= $("#direct_buy_bkash_amount").val();
										var quick_load_token = sessionStorage.getItem("quick_load_token");
										var quickload_playerid = sessionStorage.getItem("quick_load_playerid");
										
										
										
										$.ajax({
												type:'POST',
												url:baseUrl+"Payment_number/bkashNumbers_personal",
												data:{"action":"quick_load_bkash_personal","quick_load_token":quick_load_token,"amount_cr":amount_cr,"quickload_playerid":quickload_playerid},
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
													ons.notification.alert("Error Connection.");
													
												}
											
											}); 
										}
				
	


var quickloaPaymentNumberPayment =  function(amount_cr){
	
							
									//var amount_cr	= $("#direct_buy_bkash_amount").val();
									var quick_load_token 	= sessionStorage.getItem("quick_load_token");
									var quickload_playerid 	= sessionStorage.getItem("quick_load_playerid");
									
									$.ajax({
											type:'POST',
											url:baseUrl+"Payment_number/bkashNumbers_payment",
											data:{"action":"quick_load_bkash_payment","quick_load_token":quick_load_token,"amount_cr":amount_cr,"quickload_playerid":quickload_playerid},
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
												ons.notification.alert("Error Connection.");
												
											}
										
										}); 
						}	







var quickloaPersonalNumberNagad =  function(amount_cr){
	
							
									//var amount_cr	= $("#direct_buy_bkash_amount").val();
									var quick_load_token = sessionStorage.getItem("quick_load_token");
									
									$.ajax({
											type:'POST',
											url:baseUrl+"Payment_number/nagadNumbers_personal",
											data:{"action":"quick_load_nagad_personal","quick_load_token":quick_load_token,"amount_cr":amount_cr},
											dataType: 'json',
											beforeSend: function(){
												$(".ajaxloader").show();
											},
											complete: function(){
												$(".ajaxloader").hide();
											},
											success: function(data){
																
												 if(data.status=="success"){
													
													$("#nagad-buy-instruction").html(data.message);
													$("#nagad-buy-terms").html(data.notification);
													 
													
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

var quickloaPaymentNumberNagad =  function(amount_cr){
	
							
			//var amount_cr	= $("#direct_buy_bkash_amount").val();
			var quick_load_token = sessionStorage.getItem("quick_load_token");
			
			$.ajax({
					type:'POST',
					url:baseUrl+"Payment_number/nagadNumbers_payment",
					data:{"action":"quick_load_nagad_personal","quick_load_token":quick_load_token,"amount_cr":amount_cr},
					dataType: 'json',
					beforeSend: function(){
						$(".ajaxloader").show();
					},
					complete: function(){
						$(".ajaxloader").hide();
					},
					success: function(data){
										
						 if(data.status=="success"){
							
							$("#nagad-buy-instruction").html(data.message);
							$("#nagad-buy-terms").html(data.notification);
							 
							
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
						
						
var load_helpline = function(){
							
				
	
							$.ajax({
									type: "POST",					
									url:baseUrl+"Help_line/get_number",
									data:{"action":"getnumber"},
									dataType: 'json',
									success: function(data){
										localStorage.setItem('helpline',data.number);
										$("#help_line_number").html("হেল্প লাইন  : " + data.number + " <br/> ইমো & ওয়াটসঅ্যাপ : " + data.imo_whatsapp);
									},
									error: function(data){

									}
									
								}); 
	
	
					}










// Checking confirm
function confirmquickbuy(){
	
	var quick_load_playerid = sessionStorage.getItem('quick_load_playerid');
		
		$.ajax({
				type:'POST',
				url:baseUrl+"Confirmation_check/quick_buy_check",
				data:{"action":"quick_load_check","quick_load_playerid":quick_load_playerid},
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
