function initialize(){
    login();
   // setAction();

    
}

function setAction(){
	 var checked = JSON.parse(localStorage.getItem("validate"));
	 console.log("The user was confirmed inthe validate function. Validate:  " + checked );
	 if(checked == true){
		  document.user_form.action = "CourseCatalog.html";

		 return true;
	 }
	 else{
		  document.user_form.action = "index.html";

		 return false;
	 }
	  
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
    for(var i = 0; i <= usernames.length; i++){
        if(username == usernames[i]){
            if(password == passwords[i]){
                console.log("YOU ENTERED THE RIGHT CREDENTIALS");
                var id = getUserId(username);
                console.log("ID Retrieved by the Username: " + id);
                localStorage.setItem("studentid", id);
                localStorage.setItem("usernamelogin", username);
                localStorage.setItem("passwordlogin", password);
                correct = true;
                localStorage.setItem("validate", correct);
      		  document.user_form.action = "CourseCatalog.html";


               break;
            }
           else{
                alert("You entered the wrong password");
                break;
            }
        }
        
        	
        }
	  document.user_form.action = "index.html";

    

    }
   



function getUserId(username){
	
	var uri = "/api/students/id/" + username;
	var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", uri, true);

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
        	var id = xhttpList.responseText;
            localStorage.setItem("studentid", id );
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


}