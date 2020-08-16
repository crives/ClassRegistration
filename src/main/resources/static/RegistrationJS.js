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

    var studentRegistrationsArray = JSON.parse(localStorage.getItem("studentRegistrations"))

    generateStudentClassesHead(table,studentRegistrationsArray[0]);
    
    console.log(studentRegistrationsArray)

    for(var i = 0; i < studentRegistrationsArray.length; i++){

        var row = table.insertRow(); 
        var studentRegistration = studentRegistrationsArray[i];

        for(element in studentRegistrationsArray[i]){
            console.log(element);
            var cell = row.insertCell();
            cell.style.border = "1px solid black";
            var content = document.createTextNode(studentRegistration[element]);
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

function generateStudentClassesHead(table, studentRegistration){

    var head = table.createTHead();
    var row = head.insertRow();

    var studentRegistrationsArray = JSON.parse(localStorage.getItem("studentRegistrations"));
    var studentRegistration = studentRegistrationsArray[0];
    console.log(studentRegistration);
    console.log(Object.keys(studentRegistration));
    var objKeys1 = Object.keys(studentRegistration);

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