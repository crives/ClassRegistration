function initialize(){
	//localStorage.clear();
  //  getAnnouncement();
	
    login();
   

    
}

	function OnSubmitForm(id)
	{
		console.log("In the Submit Form function");
    	
		console.log("If found >>>>" + id);

    		
    if(id != 0)
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
   getPasswords("api/students/passwords");
   var usernames = JSON.parse(localStorage.getItem("allusernames"));
   var passwords = JSON.parse(localStorage.getItem("allpasswords"));

   console.log(usernames);
   console.log(passwords);


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
    
    OnSubmitForm(idfound);
  
    }
   



function getUserId(username){
	
	var uri = "/api/students/id/" + username;
	console.log("URI >>>> " + uri);
	var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", uri, true);

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
        	console.log("Got into the if statement******************");
        	var id = xhttpList.responseText;
            localStorage.setItem("studentid", id);
            console.log("Retrieved student id >>>>>" + id );
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



function getAnnouncement(){
	var a1 = "Hello this is an announcement";
	var a2 = "This is the second announcement";
	
    var announce = document.getElementById("column-left");

	
    var card = document.createElement("div");
    card.classList.add("container-left");
    
    var text = document.createElement("p");
    text.innerHTML = a1;
    
    card.appendChild(text);
    announce.appendChild(card);
    

	
	
	
}