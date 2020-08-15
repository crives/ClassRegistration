function initialize(){
    getRegistrations("/api/registration/");
    getAllCourses("/api/courses/")
    generateTables();
}

function getAllCourses(url) {

    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("allCourses", xhttpList.responseText);        
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Registration List stored");

}
function getRegistrations(url) {

    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("allRegistrations", xhttpList.responseText);        
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Registration List stored");

}

function generateTables() {
    getStudentCourses();
	//get tables 
    var studentClasses = document.getElementById("studentClasses");
    var courseCatalog = document.getElementById("courseCatalog");

	//generateStudentClasses(studentClasses);
	//generateCourseCatalog(studentClasses);
    generateStudentClasses(studentClasses);
	generateCourseCatalog(courseCatalog);
	
}

function getStudentCourses(){
    url = "api/registration/2"

    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("studentRegistrations", xhttpList.responseText);  
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Student Registrations List stored");

}

function getOneRegistration(url) {

    //Get an individual pokemon from the nested endpoint
    var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", url, false);

    xhttpList.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        console.log("loaded into registration url");
        sessionStorage.setItem("oneregistration", this.responseText);
        }
    };
    xhttpList.send();
        
}

function generateStudentClasses(table){

    console.log(localStorage.getItem("studentRegistrations"));
    var studentClasses = JSON.parse(localStorage.getItem("studentRegistrations"));
    generateStudentClassesHead(table,studentClasses);
    console.log(studentClasses)
    for(var i = 0;i<studentClasses.length;i++){
    
    	var row = table.insertRow(); 
    	var studentClass = studentClasses[i];
   		for(element in studentClasses[i]){
   			
   			console.log(element);
   			var cell = row.insertCell();
   			cell.style.border = "1px solid black";
   			var content = document.createTextNode(studentClass[element]);
   			if(element == "description"){
   				//var button = document.createElement("button");
   				cell.innerHTML = '<button data-toggle="collapse" data-target="#description">Description</button>';
   				var div = document.createElement("div");
   				div.id = "description";
   				div.className = "collapse";
   				div.appendChild(content);
   				cell.appendChild(div)
   				row.appendChild(cell);
   				continue;
   			}
   			cell.appendChild(content);
    		row.appendChild(cell);
    	}
    
    	
    }
    
}

function generateStudentClassesHead(table, studentClasses){
    var head = table.createTHead();
    var row = head.insertRow();
    
    for(element in studentClasses){
    	
        var th = document.createElement("th");
        var text = document.createTextNode(studentClasses[element]);
        th.style.border = "2px solid black";
        
        th.appendChild(text);
        row.appendChild(th);
    }

}

function generateCourseCatalog(table){
	
    
    console.log(localStorage.getItem("allCourses"));
    var courses = JSON.parse(localStorage.getItem("allCourses"));
    generateCourseHead(table,courses[0]);
    console.log(courses)
    for(var i = 0;i<courses.length;i++){
    
    	var row = table.insertRow(); 
    	var course = courses[i];
   		for(element in courses[i]){
   			
   			console.log(element);
   			var cell = row.insertCell();
   			cell.style.border = "1px solid black";
   			var content = document.createTextNode(course[element]);
   			if(element == "description"){
   				//var button = document.createElement("button");
   				cell.innerHTML = '<button data-toggle="collapse" data-target="#description">Description</button>';
   				var div = document.createElement("div");
   				div.id = "description";
   				div.className = "collapse";
   				div.appendChild(content);
   				cell.appendChild(div)
   				row.appendChild(cell);
   				continue;
   			}
   			cell.appendChild(content);
    		row.appendChild(cell);
    	}
    
    	
    }
    
}

function generateCourseHead(table,course){
	
	var head = table.createTHead();
    var row = head.insertRow();
    
    for(element in course){
    	
        var th = document.createElement("th");
        var text = document.createTextNode(course[element]);
        th.style.border = "2px solid black";
        
        th.appendChild(text);
        row.appendChild(th);
    }
}