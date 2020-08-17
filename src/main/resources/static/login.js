function initialize(){
	//localStorage.clear();
    login();
    OnSubmitForm();

    
}

	function OnSubmitForm()
	{
		console.log("In the Submit Form function");
    	var idfound = localStorage.getItem("studentid");
		console.log("If found >>>>" + idfound);

    		
    if(idfound != 0)
	  {
    	console.log("into the first if statement");
	   document.userform.action ="index.html";
	  }
	  else{
	    console.log("into the second if statement");

	    document.userform.action ="login.html";
	  }
	  return true;
	 
	
	}
	



function getUsernames(url){
    var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", url, true);

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            localStorage.setItem("allusernames", xhttpList.responseText);
            console.log("successfully added usernames to local storage.")
        }
    };
    xhttpList.send();
    console.log("usernames Stored.");

}

function getPasswords(url){
    var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", url, true);

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            localStorage.setItem("allpasswords", xhttpList.responseText);
            console.log("successfully added passwords to local storage.")
        }
    };
    xhttpList.send();
    console.log("passwords Stored.");

}

function login(){
    var username = document.getElementById("username").value;
    var password= document.getElementById("password").value;

   console.log("Username Entered: " + username);
   console.log("Password Entered: " + password);

   getUsernames("api/students/usernames");
   getPasswords("/api/students/passwords");
   var usernames = JSON.parse(localStorage.getItem("allusernames"));
   var passwords = JSON.parse(localStorage.getItem("allpasswords"));



   var correct = false;
    var found = true;
    console.log("Before the loop");
    var exists = usernames.includes(username);
    console.log("exists function: "+ exists);
    console.log(typeof usernames);
    var userindex = usernames.indexOf(username);
    if(exists){
    	if(password == passwords[userindex] ){
    		alert("You entered in the right credentials");
    		getUserId(username);
    		var idfound = localStorage.getItem("studentid");
    		console.log("Local Storage set studentid to: " + idfound);

    	}
    	else{
            localStorage.setItem("studentid", 0);

    		alert("Incorrect password");
    	}
    }
    else{
        localStorage.setItem("studentid", 0);

    	alert("This username does not exist");
    }
    
    console.log(passwords[userindex]);
  
    }
   



function getUserId(username){
	
	var uri = "/api/students/id/" + username;
	var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", uri, true);

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
        	var id = xhttpList.responseText;
            localStorage.setItem("studentid", id);
            console.log("Retrieved student id");
            console.log(id);
        }
        
    };
    xhttpList.send();
    console.log("Success.");


   var usernamelog =  localStorage.getItem("usernamelogin");
   var  passwordlog =  localStorage.getItem("passwordlogin");

   console.log(usernamelog);
   console.log(passwordlog);
   
 //  return(id);


}