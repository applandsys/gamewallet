//Buy chips Main Page // General for all
document.addEventListener('init', function(event) {
  var page = event.target ;
// Buy Page 	
  if (page.matches('#buy_chips')) {
		
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
		

	page.querySelector('#direct_buy').onclick = function(){
		var data = {data: {title: 'Direct Buy',buy_type:'direct_buy'}}
		fn.pushpage("direct_gift_buy.html",data,"fade");
	}


	page.querySelector('#minibak_load').onclick = function(){
		var data = {data: {title: 'Bank Buy',buy_type:'bank_buy'}}
		fn.pushpage("bank_buy.html",data,"fade");
	}
	
	
	page.querySelector('#another_bank_load').onclick = function(){
		var data = {data: {title: 'Bank Buy',buy_type:'bank_buy'}}
		fn.pushpage("another_bank_buy.html",data,"fade");
	}
	
  }
  
 // Direct Gift buy 
  if (page.matches('#direct_gift_buy')) {
		
		var buy_type = page.data.buy_type;
		var playerid = localStorage.getItem("playerid");
			
		$("#direct_buy_playerid").val(playerid);
			
		  $("#direct_buy_first").one('submit',function(e) {
				e.preventDefault(); // avoid to execute the actual submit of the form.
									
					var direct_buy_playerid = $("#direct_buy_playerid").val();
					var direct_buy_amount = $("#direct_buy_amount").val();

					var data = {data: {title: 'Buy Chips',buy_type:buy_type,playerid:direct_buy_playerid,chips_amount:direct_buy_amount}}
					fn.pushpage("payment_option_select.html",data,"fade");
					
					
			});
				
		
	  }
	  
	   
 // Bank Buy //
  if (page.matches('#bank_buy')) {
	  
		
		var buy_type = page.data.buy_type;
		var playerid = localStorage.getItem("playerid");

			
		  $("#bank_buy_first").one('submit',function(e) {
				e.preventDefault(); // avoid to execute the actual submit of the form.
									
					var chips_amount = $("#chips_amount").val();
			
					var data = {data: {title: 'Buy Chips',buy_type:buy_type,playerid:playerid,chips_amount:chips_amount}}
					fn.pushpage("payment_option_select.html",data,"fade");
					
					
			});
				
		
	  } 
	  
	
// Payment Option select	
	if (page.matches('#payment_option_select')) {
		
	
		var buy_type = page.data.buy_type;
		var playerid = page.data.playerid;
		var chips_amount = page.data.chips_amount;
			
		page.querySelector('#bkash_sendmoney').onclick = function(){
			var data = {data: {title: 'Buy Chips',buy_type:buy_type,playerid:playerid,chips_amount:chips_amount,gateway:'bkash_personal'}}
			fn.pushpage("payment_instruction_bkash.html",data,"fade");
		}
		
		page.querySelector('#bkash_payment').onclick = function(){
			var data = {data: {title: 'Buy Chips',buy_type:buy_type,playerid:playerid,chips_amount:chips_amount,gateway:'bkash_payment'}}
			fn.pushpage("payment_instruction_bkash.html",data,"fade");
		}
		
		
		page.querySelector('#nagad_personal').onclick = function(){
			var data = {data: {title: 'Buy Chips',buy_type:buy_type,playerid:playerid,chips_amount:chips_amount,gateway:'nagad_personal'}}
			fn.pushpage("payment_instruction_nagad.html",data,"fade");
		}
		
		page.querySelector('#nagad_payment').onclick = function(){
			var data = {data: {title: 'Buy Chips',buy_type:buy_type,playerid:playerid,chips_amount:chips_amount,gateway:'nagad_payment'}}
			fn.pushpage("payment_instruction_nagad.html",data,"fade");
		}
				
		
	  } 

// Payment Instruction //
	if (page.matches('#payment_instruction_bkash')) {
		
		console.log(page.data);
		
		var gateway = page.data.gateway;
		var amount_cr = page.data.chips_amount;
		var playerid = page.data.playerid;
		
		if(gateway=='bkash_personal'){
			var request_path = 'bkashNumbers_personal';
		}else if(gateway=='bkash_payment'){
			var request_path = 'bkashNumbers_payment';
		}
		
			$.ajax({
					type:'POST',
					url:baseUrl+"Payment_number/"+request_path,
					data:{"action":"payment_instruction","amount_cr":amount_cr,"user_id":user_id,"request_serial":1},
					dataType: 'json',
					beforeSend: function(){
							showModal();
						},
					complete: function(){
							hideModal();
						},
					success: function(data){
										
						 if(data.status=="success"){
							
							$("#buy-instruction").html(data.message);
							$("#buy-terms").html(data.notification);
							 
							
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
				
				
				
			page.querySelector('#payment_confirm').onclick = function(){
				confirmquickbuy(gateway,playerid);
			}
		
	  } 
	 

// Payment Instruction //
	if (page.matches('#payment_instruction_nagad')) {
		
		console.log(page.data);
		
		var gateway = page.data.gateway;
		var amount_cr = page.data.chips_amount;
		var playerid = page.data.playerid;
		var buy_type = page.data.buy_type;
		
		if(gateway=='nagad_personal'){
			var request_path = 'nagadNumbers_personal';
		}else if(gateway=='nagad_payment'){
			var request_path = 'nagadNumbers_payment';
		}
		
			$.ajax({
					type:'POST',
					url:baseUrl+"Payment_number/"+request_path,
					data:{"action":"payment_instruction","amount_cr":amount_cr,"user_id":user_id,"request_serial":1},
					dataType: 'json',
					beforeSend: function(){
							showModal();
						},
					complete: function(){
							hideModal();
						},
					success: function(data){
										
						 if(data.status=="success"){
							
							$("#buy-instruction").html(data.message);
							$("#buy-terms").html(data.notification);
							 
							
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
				
				
				
		
			$("#direct_buy_nagad_confirm").one('submit',function(e) {
				
				e.preventDefault(); 
				
						if(buy_type=='direct_buy'){
							var request_path = 'Online_Direct_buy/direct_buyNagad';
						}else if(buy_type=='bkash_payment'){
							var request_path = 'Companybank_buy/buyNagad';
						}		
				
					
					var nagad_txnid			=   $("#nagad_txnid").val();
						
					$.ajax({
							type:'POST',
							url:baseUrl+request_path,
							data:{"action":"nagad_confirm","playerid":playerid,"amount_cr":amount_cr,"nagad_txnid":nagad_txnid,"user_id":user_id,"loginid":loginid,"request":1},
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





function confirmquickbuy(buytype,player_id){
	
		$.ajax({
				type:'POST',
				url:baseUrl+"Confirmation_check/quick_buy_check",
				data:{"action":"quick_load_check","quick_load_playerid":player_id,"buy_type":buytype},
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
					ons.notification.alert("Error Connection.");
					
				}
				
			}); 
	
}