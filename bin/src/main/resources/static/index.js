function initialize(){
    login();
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

   console.log(username);
   console.log(password);

   getUsernames("api/students/usernames");
   getPasswords("/api/students/passwords");
   var usernames = JSON.parse(localStorage.getItem("allusernames"));
   var passwords = JSON.parse(localStorage.getItem("allpasswords"));


    console.log(usernames.length);
    console.log(passwords.length);

    var found = true;
    for(var i = 0; i <= usernames.length; i++){
        if(username == usernames[i]){
            if(password == passwords[i]){
                console.log("YOU ENTERED THE RIGHT CREDENTIALS");
                localStorage.setItem("usernamelogin", username);
                localStorage.setItem("passwordlogin", password);



                //alert("You entered the right credentials");
            }
           else{
                alert("You entered the wrong password");
            }
        }
       
        
        

    }
    alert("You entered the wrong username");


}
function getUserInfo(){

   var usernamelog =  localStorage.getItem("usernamelogin");
   var  passwordlog =  localStorage.getItem("passwordlogin");

   console.log(usernamelog);
   console.log(passwordlog);

    

}