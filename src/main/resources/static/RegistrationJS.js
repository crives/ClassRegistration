function initialize(){
    getRegistrations("/api/registration/");
    getAllCourses("/api/courses/");
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

// FEED IN STUDENT-ID
function getStudentCourses(){
    url = "api/registration/4" //+ studentId;
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
    var studentRegistrationsArray = JSON.parse(localStorage.getItem("studentRegistrations"))
    generateStudentClassesHead(table);
    console.log(studentRegistrationsArray)
    for(var i = 0; i < studentRegistrationsArray.length; i++){
        var row = table.insertRow(); 
       // var studentRegistration = studentRegistrationsArray[i];
        var courseId = studentRegistrationsArray[i].courseId;
        getOnecourse(courseId);
        var course = JSON.parse(sessionStorage.getItem("course"));
        // console.log(element);

        for(element in course){
            console.log(element);
            var cell = row.insertCell();
            cell.style.border = "1px solid black";
            var content = document.createTextNode(course[element]);
            if(element == "description"){
                //var button = document.createElement("button");
                isButtonStudent(cell,i,row,content);
                continue;
            }
            cell.appendChild(content);
            row.appendChild(cell);
        }
    }
}
function isButtonStudent(cell,i,row,content){
	cell.innerHTML = '<button data-toggle="collapse" data-target="#studentdescription'+i+'">Description</button>';
	var div = document.createElement("div");
	div.id = "studentdescription"+i;
	div.className = "collapse";
	div.appendChild(content);
	cell.appendChild(div)
	row.appendChild(cell);
}
function getOnecourse(courseId){
    url = "api/courses/" + courseId;
    var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", url, false);
    xhttpList.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("loaded into course url");
            sessionStorage.setItem("course", this.responseText);
        }
    };
    xhttpList.send();
}
function generateStudentClassesHead(table, studentRegistration){
    var head = table.createTHead();
    var row = head.insertRow();
    var courseColumnnames = JSON.parse(localStorage.getItem("allCourses"));
    var course = courseColumnnames[0];
    console.log(course);
    console.log(Object.keys(course));
    var objKeys1 = Object.keys(course);
    for(element in objKeys1) {
        var th = document.createElement("th");
        var text = document.createTextNode(objKeys1[element]);
        th.style.border = "2px solid black";
        th.appendChild(text);
        row.appendChild(th);
    }
}
function generateCourseCatalog(table){
    console.log(localStorage.getItem("allCourses"));
    var courses = JSON.parse(localStorage.getItem("allCourses"));
    generateCourseHead(table,courses[0]);
    console.log(courses[0])
    for(var i = 0;i<courses.length;i++){
        var row = table.insertRow(); 
        
        var course = courses[i];
        
        courses[i]["Add Course"] = "Add Course";
        for(element in courses[i]){
            // console.log(element);
            var cell = row.insertCell();
            
            cell.style.border = "1px solid black";
            var content = document.createTextNode(course[element]);
            if(element == "description"){
                //var button = document.createElement("button");
                isButton(cell,i,row,content);
                continue;
            }
            cell.onclick = moveClassToStudent(course);
            cell.appendChild(content);
            row.appendChild(cell);
        }
    }

}

function moveClassToStudent(course){
	return function() {
        alert("You are now adding course" + ' ' + course['courseId'] + ': ' + course['name']);
        insertRegistration(course);

        var studentClasses = document.getElementById("studentClasses");
        studentClasses.innerHTML = '';

        getStudentCourses();
        generateTables();
    };
}

function insertRegistration(course){
    url = "api/registration/add"
    var xhttpList = new XMLHttpRequest();

    // make this data the data that is clicked on
    // var data = {
    // 		"studentId":4,
    //         "registrationId":13,
    //         "courseId": "AMS250"
    // };
    
    // console.log(data);
    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("result"); 
        }
    };
    console.log(course);
    var send = JSON.stringify(course); 
    console.log(send);
    
    xhttpList.open("POST", url, true);
    xhttpList.setRequestHeader("Content-type", "application/json");
    xhttpList.send(send);
    console.log("worked");
    // console.log(getRegistrations("/api/registration/"));
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

function generateCourseHead(table,course){
    var head = table.createTHead();
    var row = head.insertRow();
    var courses = JSON.parse(localStorage.getItem("allCourses"));
    courses[0]["Add Course"] = "Add Course";
    var course = courses[0];
    console.log(courses[0]);
    console.log(course);
    console.log(Object.keys(course));
    var objKeys = Object.keys(course);
    for(element in Object.keys(course)) {
        var th = document.createElement("th");
        var text = document.createTextNode(objKeys[element]);
        th.style.border = "2px solid black";
        th.appendChild(text);
        row.appendChild(th);
    }
}