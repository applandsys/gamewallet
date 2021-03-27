if(navigator.onLine){
		//alert(navigator.onLine);
}else{
	showModalInternet();
}



///=======================================================================///
// After Login panel home init //
document.addEventListener('init', function(event) {
  if (event.target.matches('#home')) {

	if(loginid==0){
		fn.logout();
		window.location.replace("index.html");
	}  
	loadAccountInfo();
  }
}, false);		


window.fn.pushpage = function(page,data,anime){
	document.querySelector('#myNavigator').pushPage(page,data,{animation: anime});
}



//  Request Chips
document.addEventListener('init', function(event) {
  if (event.target.matches('#request_chips')) {
		loadAccountInfo();
		
		  $("#request_chips_form").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
				
			//requestChipsSubmit();	
			//
				var request_to_playerid			= $("#request_to_playerid").val();
				var request_amount				= $("#request_amount").val();
				var request_chips_comments		= $("#request_chips_comments").val();
			
				
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Request_chips/doRequest",
									data:{"action":"request_chips","request_to_playerid":request_to_playerid,"request_chips_comments":request_chips_comments,"request_amount":request_amount,"user_id":user_id,"loginid":loginid},
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
									
								//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
								//	sessionStorage.setItem('direct_buy_bkash_amount', null);
									
								
								}); 
			
			///
	
		});	
			
	
  }
}, false);


// Refer friend
document.addEventListener('init', function(event) {
  if (event.target.matches('#refer_friend')) {
		loadAccountInfo();
		
		
		  $("#refer_friend").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
				
			//requestChipsSubmit();	
			//
				var refer_friend_mobile		= $("#refer_friend_mobile").val();
						
				//alert(""loginid);
			
							$.ajax({
									type:'POST',
									url:baseUrl+"Refer_friend/doRefer",
									data:{"action":"refer_friend","refer_friend_mobile":refer_friend_mobile,"user_id":user_id,"loginid":loginid},
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
									
								//	sessionStorage.setItem('direct_buy_bkash_playerid', null);
								//	sessionStorage.setItem('direct_buy_bkash_amount', null);
									
								
								}); 
			
			///
	
		});
		
		
		////
	
  }
}, false);

// History Page Init //
document.addEventListener('init', function(event) {
  if (event.target.matches('#history')) {
		
		loadHistory();	
	    $("#history-search-form").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
				
			history_search();	
	
		});	
	
  }
}, false);


// Request chips
document.addEventListener('init', function(event) {
  if (event.target.matches('#request_chips_list')) {
		
		
		loadRequestChip();	
		
	$(document).on('click','.accept_button_req_chips',function(e){

		var requested_id = $($(this)).closest('td').prev('td').text();
		
		// ajax call for bank to bank 

		
	});
	
	$(document).on('click','.decline_button_req_chips',function(e){

		var requested_id = $($(this)).closest('td').prev('td').text();
			// ajax call for bank to bank 
		
	});
		
  }
}, false);








// account_info
document.addEventListener('init', function(event) {
  if (event.target.matches('#account_info')) {
		loadAccountInfo();
		
		// accounts/accountInfo
		
				$.ajax({
						type:'POST',
						url:baseUrl+"accounts/accountInfo",
						data:{"action":"account_info","user_id":user_id,"loginid":loginid},
						dataType: 'json',
						beforeSend: function(){
												$(".ajaxloader").show();
											},
						complete: function(){
												$(".ajaxloader").hide();
											},
						success: function(data){
											
							if(data.status=="success"){
																					
							var account_table = 	'<table id="customers">';
								account_table +=		'<tr>';
								account_table +=			'<td> Name </td> <td>'+ data.name +'</td>';
								account_table +=		'</tr>';
								account_table +=		'<tr>';
								account_table +=			'<td> Player Id </td>  <td>'+ data.playerid +'</td>';
								account_table +=		'</tr>';
								account_table +=		'<tr>';
								account_table +=			'<td> Player type </td>  <td>'+ data.playertype +'</td>';
								account_table +=		'</tr>';
								account_table +=		'<tr>';
								account_table +=			'<td> Account Open   </td>  <td>'+ data.joindate +'</td>';
								account_table +=		'</tr>';
								account_table +=	'</table>';
								
							$("#accout_detail").html(account_table);	
													
															
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
}, false);		
		

// Change Pass word
document.addEventListener('init', function(event) {
  if(event.target.matches('#change_pass')) {
		
	/////
			$("#cnahge_password_form").one('submit',function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
			
				var changepass_old_pass	= $("#changepass_old_pass").val();
				var changepass_new_pass	= $("#changepass_new_pass").val();

				$.ajax({
						type:'POST',
						url:baseUrl+"Security/changePassword",
						data:{"action":"change_password","changepass_old_pass":changepass_old_pass,"changepass_new_pass":changepass_new_pass,"user_id":user_id,"loginid":loginid},
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
														fn.logout();
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
	////
  }
}, false);


