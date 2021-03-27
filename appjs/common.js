window.fn = {};

ons.ready(function() {
	

}); 


var openRocket =  function(){
								ons.notification.alert({
														title: 'Rocket Send Money',
														message: '<center> ৫ কোটির বেশি চিপস কিনতে   01910506022  নম্বরে কল করুন </center>'
														 });
								
							}


						


// Load Page //
window.fn.load = function(page) {
  var content = document.getElementById('content');
  content.load(page);
};



window.fn.exit =  function(){
					
					 ons.notification.alert({
											title: 'Good Bye!',
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
								ons.notification.alert("Internet Connection Problem.");	
							}
							
						}); 
	
} 


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
						
						//console.log(real_playerid);
						
						//var regexbullet = /[A-Za-z]{4}[0-9]{3}|100+[0-9]{5,12}/g;
						
						//var real_playerid = playerid_garbase.match(regexbullet);
						
						//$(this).val(real_playerid);
						$('input[type=text].playeridinput').val(real_playerid);

				}	


// Player id check when signup //	


// CHeck Mathc password //



						
//Splash page init //
document.addEventListener('init', function(event) {
  if (event.target.matches('#splash')) {
	  
	setTimeout(function(){
		
		if(user_id > 0){
				window.location.replace("panel.html");
		}else{
			fn.load('start_page.html');
		}  
	 },
	1000);
	
  }
}, false);	


// Start Page Init//
document.addEventListener('init', function(event) {
  if (event.target.matches('#start_page')) {
	
	if(user_id > 0){
		window.location.replace("panel.html");
	}
			
  }
}, false);		



