window.fn = {};



window.fn.exit =  function(){
						ons.notification.alert({
								title: 'Thanks!',
								message: '<center>Are your Sure want to Exit</center>',
								callback: function(answer) {
										navigator.app.exitApp();
										}
								  });
					}


function showModal() {
  var modal = document.querySelector('ons-modal');
  modal.show();
}

function hideModal(){
	var modal = document.querySelector('ons-modal');
    modal.hide();
}


function showModalInternet() {
  var modal = document.querySelector('ons-modal#internetcheck');
  modal.show();
}


function NetproblemExit(){
	ons.notification.alert({
							title: 'Failed ?',
							message: '<center>  Connection Failed . Please Check your Internet Connection. </center>',
							callback: function(answer) {
								   navigator.app.exitApp();
							}
						});
	

}









//alert(localStorage.getItem("name"));

// Offer Open 
window.fn.openOffer = function(){
	
					$.ajax({
							type: "POST",					
							url:baseUrl+"Offer/getoffer",
							data:{"action":"getoffer"},
							dataType: 'json',
							success: function(data){
								if(data.status=='success'){
									ons.notification.alert({
														title: 'Offer!',
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
				
							}
							
						}); 
	
} 

// Menu Open
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

// Load Page //
window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

window.fn.pushpage = function(page,data,anime){
	document.querySelector('#myNavigator').pushPage(page,data,{animation: anime});
}


// Zero value check
window.fn.nozero = 	function(value){
						if(value==0){
							ons.notification.alert('Minimum 1 is Required');	
						}	
					};

window.fn.btobamount = 	function(value){
							if(value < 5){
								value = 5;
								document.getElementById("bank_to_bank_amount").value = 5;
							}else if(value > 100){
								value = 100;
								document.getElementById("bank_to_bank_amount").value = 100;
							}	
						};					

// History open menu//
window.fn.historyOpen = function() {
  fn.load('history.html');
};

// Home Open by menu
window.fn.home = function() {
  loadAccountInfo();
  fn.load('home.html');
};

// Logout
window.fn.logout = function() {
  localStorage.setItem("playerid", null); // player id
  localStorage.setItem("user_id", null); // User databas id
  localStorage.setItem("loginid", null); // User databas id
  localStorage.removeItem("playerid"); // player id
  localStorage.removeItem("user_id"); // User databas id
  localStorage.removeItem("loginid"); // User databas id
  localStorage.clear();
  ons.notification.alert({title: 'Thanks!',	message: '<center>You are Logged Out</center>'});
  window.location.replace("index.html");
};

var trimSpace = function(value){
	
						var playerid_garbase = value;
						
						
						var value_length = playerid_garbase.split(' ').length;
						
						if(value_length =2){
							var real_playerid =	playerid_garbase.replace(/\s/g, '');
						}else if(value_length > 4){
							var regexbullet = /[A-Za-z]{4}[0-9]{3}|100+[0-9]{5,12}/g;
							var real_playerid = playerid_garbase.match(regexbullet);
						}else{
							var real_playerid = playerid_garbase;
						}
						
						console.log(real_playerid);
						
						//var regexbullet = /[A-Za-z]{4}[0-9]{3}|100+[0-9]{5,12}/g;
						
						//var real_playerid = playerid_garbase.match(regexbullet);
						
						//$(this).val(real_playerid);
						$('input[type=text].playeridinput').val(real_playerid);

				}				
					
// Balance Load //
var balanceInfo =  function(){
	

	
						$.ajax({
							type:'POST',
							url:baseUrl+"accounts/balance",
							data:{"action":"balance","user_id":user_id},
							dataType: 'json',
							beforeSend: function(){
													showModal();
												},
							complete: function(){
													hideModal();
												},
							success: function(data){
								if(data.status=='success'){
									var balance = data.balance;
									$(".balance_info").html("Balance: " + balance + "CR");
								}else if(data.status=='invalid'){
									  return 0;
								}
								
							},
							error: function(data){	
								ons.notification.alert("Internet Connection Problem.");
							}
					
						});  
					}
					
// Account Info //					
var loadAccountInfo = function(){
						
							var player_name = localStorage.getItem("name");
	
							if(localStorage.getItem("name")!==null){
								
							$(".player_name").html(player_name);	
							
							}else{
								///
								$.ajax({
									type:'POST',
									url:baseUrl+"accounts/accountInfo",
									data:{"action":"account_info","user_id":user_id},
									dataType: 'json',
									beforeSend: function(){
													$(".ajaxloader").show();
												},
									complete: function(){
													$(".ajaxloader").hide();
												},
									success: function(data){
															
										if(data.status=='success'){

											
											localStorage.setItem("name", data.name); 
											
											$(".player_name").html(data.name);	
											

										}else if(data.status=='invalid'){
											ons.notification.alert("Invalid Request.");
										}
										
									},
									error: function(data){
										ons.notification.alert("Internet Connection Problem.");
										
									}
								
								}); 
								
								
								////
								
							}
	
								
						}					
					
	
	
	
	

	
	
	
	
// Load History //						
var loadHistory =  function(){
							
							$.ajax({
								url:baseUrl+"accounts/history",
								data:{"action":"history","keyword":"no","user_id":user_id},
								dataType: 'json',
								method:"post",
								beforeSend: function(){
												$(".ajaxloader").show();
											},
								complete: function(){
												$(".ajaxloader").hide();
											},			
								success: function(data){
													
									if(data[0].status=='success'){
										
									   var history_table ='';
									   $.each(data, function(i, val){
										// console.log(val);
											history_table +=  '<table id="customers">';
											history_table += '<tr> <td> Player Id </td> <td><div class="copyable"><strong>'+ val.receive_playerid +'</strong></div></td> </tr>';
											history_table += '<tr> <td> Type </td> <td> '+val.type +'</td> </tr>';
											history_table += '<tr> <td> Chips Amount </td> <td> '+val.amount_chips +'CR </td> </tr>';
											history_table += '<tr> <td> Date and Time </td> <td> '+val.date_time+'</td> </tr>';
											history_table += '<tr> <td> Comments </td> <td>'+ val.comments +' </td> </tr>';
											history_table += '</table>';
											history_table += '<br/>';
											
										});
					
										
										$("#history_content").html(history_table);	
										

									}else if(data[0].status=='invalid'){
										ons.notification.alert('No Hisotyr Found');
									}
									
								},
								error: function(data){
									ons.notification.alert("Internet Connection Problem.");
									
								}
								
						}); 
					
	
					}
					
					
					

// Search History
var history_search = function(){
							var history_search_input = $("#history_search_input").val();
					   // Ajax reqauest 
								$.ajax({
								url:baseUrl+"accounts/history",
								data:{"action":"history","keyword":history_search_input,"user_id":user_id},
								dataType: 'json',
								method:"post",
								beforeSend: function(){
												$(".ajaxloader").show();
											},
								complete: function(){
												$(".ajaxloader").hide();
											},
								success: function(data){
													
									if(data[0].status=='success'){
										
									   var history_table ='';
									   $.each(data, function(i, val){
										// console.log(val);
											history_table +=  '<table id="customers">';
											history_table += '<tr> <td> Player Id </td> <td><div class="copyable">'+ val.receive_playerid +'</div></td> </tr>';
											history_table += '<tr> <td> Type </td> <td> '+val.type +'</td> </tr>';
											history_table += '<tr> <td> Chips Amount </td> <td> '+val.amount_chips +'CR </td> </tr>';
											history_table += '<tr> <td> Date and Time </td> <td> '+val.date_time+'</td> </tr>';
											history_table += '<tr> <td> Comments </td> <td>'+val.comments +' </td> </tr>';
											history_table += '</table>';
											history_table += '<hr/>';
											
										});
					
										
										$("#history_content").html(history_table);	
										

									}else if(data[0].status=='invalid'){
										$("#history_content").html("No History Found");	
									}
									
								},
								error: function(data){
									ons.notification.alert("Internet Connection Problem.");
									
								}
								
						});  

					}
					
					

// Load History //						
var loadRequestChip =  function(){
							
							$.ajax({
								url:baseUrl+"accounts/loadRequestChip",
								data:{"action":"loadRequestChip","keyword":"no","user_id":user_id},
								dataType: 'json',
								method:"post",
								beforeSend: function(){
												$(".ajaxloader").show();
											},
								complete: function(){
												$(".ajaxloader").hide();
											},
								success: function(data){
													
					
									   var request_chips_table ='';
									   $.each(data, function(i, val){
										// console.log(val);
											request_chips_table +=  '<table id="customers">';
											request_chips_table += '<tr> <td> Requested By </td> <td><strong>'+ val.requestedby_minibankid +'</strong></td> </tr>';
											request_chips_table += '<tr> <td> Chips Amount </td> <td> '+val.requested_amount +'CR </td> </tr>';
											request_chips_table += '<tr> <td> Date and Time </td> <td> '+ val.date +'</td> </tr>';
											request_chips_table += '<tr><td style="display: none"> '+ val.id +'</td> <td colspan="2"> <center> <button class="accept_button_req_chips" > Accpet </button>  &nbsp; <button class="decline_button_req_chips"> Decline </button> </center> </td></tr>';
											request_chips_table += '</table>';
										});
					
										
										$("#request_chips_content").html(request_chips_table);	
										

									
									
								},
								error: function(data){
									ons.notification.alert("Internet Connection Problem.");
								}
								
						}); 
					
	
					}					


window.fn = {};

// Load Page //
window.fn.load = function(page) {
  var content = document.getElementById('content');
  content.load(page);
};

window.fn.pushpage = function(page,data,anime){
	alert('index');
	document.querySelector('#myNavigator').pushPage(page,data,{animation: anime});
}


window.fn.exit =  function(){

						ons.notification.alert({
								title: 'Thanks!',
								message: '<center>Are your Sure want to Exit</center>',
								callback: function(answer) {
										navigator.app.exitApp();
										}
								  }); 
					}
						
						
						
window.fn.openOffer = function(){
	
					$.ajax({
							type: "POST",					
							url:baseUrl+"Offer/getoffer",
							data:{"action":"getoffer"},
							dataType: 'json',
							success: function(data){
								if(data.status=='success'){
									ons.notification.alert({
														title: 'Offer!',
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
				
							}
							
						}); 
	
					} 	
					
var openRocket =  function(){
								ons.notification.alert({
														title: 'Rocket Send Money',
														message: '<center> ৫ কোটির বেশি চিপস কিনতে   01910506022  নম্বরে কল করুন </center>'
														 });
								
							}	
							
var openNagad =  function(){
								ons.notification.alert({
														title: 'Nagad Send Money',
														message: '<center> ৫ কোটির বেশি চিপস কিনতে   01910506022  নম্বরে কল করুন </center>'
														 });
								
							}

							
