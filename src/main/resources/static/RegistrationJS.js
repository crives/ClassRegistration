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

function getStudentCourses(studentId){
    url = "/Registration/" + studentId

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

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();

      let th1 = document.createElement("th");
      let studentId = document.createTextNode("Student ID");
      th1.appendChild(studentId);
      row.appendChild(th1);

      let th2 = document.createElement("th");
      let firstName = document.createTextNode("First Name");
      th2.appendChild(firstName);
      row.appendChild(th2);

      let th3 = document.createElement("th");
      let lastName = document.createTextNode("Last Name");
      th3.appendChild(lastName);
      row.appendChild(th3);
      
      let th4 = document.createElement("th");
      let courseId = document.createTextNode("Course ID");
      th4.appendChild(courseId);
      row.appendChild(th4);

      let th5 = document.createElement("th");
      let department = document.createTextNode("Department");
      th5.appendChild(department);
      row.appendChild(th5);

      let th6 = document.createElement("th");
      let name = document.createTextNode("Course Name");
      th6.appendChild(name);
      row.appendChild(th6);

      let th7 = document.createElement("th");
      let credits = document.createTextNode("Credits");
      th7.appendChild(credits);
      row.appendChild(th7);

  }

function generateTables(tables) {
	//get tables 
    var studentClasses = document.getElementById("studentClasses");
    var couseCatalog = document.getElementById("courseCatalog");

	//generateStudentClasses(studentClasses);
	//generateCourseCatalog(studentClasses);

	generateCourseCatalog(courseCatalog);
	
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
   				isButton(cell,i,row,content);
   				continue;
   			}
   			cell.appendChild(content);
    		row.appendChild(cell);
    	}
    
    	
    }
    
}

function isButton(cell,i,row,content){
		cell.innerHTML = '<button data-toggle="collapse" data-target="#description'+i+'">Description</button>';
		var div = document.createElement("div");
		div.id = "description"+i;
		div.className = "collapse";
		div.appendChild(content);
		cell.appendChild(div)
		row.appendChild(cell);
}

function generateCourseHead(table,courses){
	
	var head = table.createTHead();
    var row = head.insertRow();
    
    for(element in courses){
    	
        var th = document.createElement("th");
        var text = document.createTextNode(element);
        th.style.border = "2px solid black";
        
        th.appendChild(text);
        row.appendChild(th);
    }
}