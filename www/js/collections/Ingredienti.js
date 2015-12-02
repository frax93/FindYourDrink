define(function(require) {
	/*require("baasbox");
	BAASBOX_URL="http://localhost:9000";
    BAASBOX_APP_CODE="1234567890";
    BAASBOX_USER="admin";
    BAASBOX_PASSWORD="admin";
   var pippo;
   //initialize BaasBox
   BaasBox.setEndPoint(BAASBOX_URL); //the address of your BaasBox server
   BaasBox.appcode =BAASBOX_APP_CODE;               //the application code of your server
   
 
   //at the moment we log in as admin  
  BaasBox.login(BAASBOX_USER,BAASBOX_PASSWORD)
       .done(function (user) {
           console.log("Logged in ", user);
   })
       .fail(function (err) {
         console.log("error ", err);
   });*/
	var Backbone = require("backbone");
	var Ingrediente = require("models/Ingrediente");

	var Ingredienti = Backbone.Collection.extend({
		constructorName: "Ingredienti",
		model: Ingrediente,
		url : function(){
            //return BaasBox_URL+"/document/alcolici";
      },
      parse: function(response) {
         //unwrap the response from the server....
         if(response['data']) return response.data;
         return response;
     }
	});

	return Ingredienti;
});