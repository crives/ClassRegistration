function initialize(){

    getRegistrations("/api/registration/");
    getAllCourses("/api/courses/")
    getStudentCourses("1");
    
    generateTables();
    //CourseCatalog();

}

var myCourseCatalog = [];

function generateTables() {
   
    var studentClasses = document.getElementById("studentClasses");
    var courseCatalog = document.getElementById("courseCatalog");
    generateStudentClasses(studentClasses);
    generateCourseCatalog(courseCatalog);
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

function getStudentCourses(studentId){

    url = "api/registration/1";
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

// function CourseCatalog(){
//     var myCourseCatalog = [];
//     var allCourses = JSON.parse(localStorage.getItem("allCourses"));
//     var myCourses = JSON.parse(localStorage.getItem("studentRegistrations"));
//     for(var i = 0; i < allCourses.length; i++){

//         for(var j = 0; j < myCourses.length; j++){
//             let element =  myCourses.results[i];
//             let element2 = allCourses.results[j];

//             getOneRegistration(element.url);
//             getOnecourse(element2.url);
//             let course = sessionStorage.getItem("course");
//             let mycourse = sessionStorage.getItem("oneregistration");
//             if(course.courseId != mycourse.courseId){
//                 myCourseCatalog.push(course);
//             }
//             sessionStorage.removeItem("course");
//             sessionStorage.removeItem("oneregistration");

//         }
//     }
//     localStorage.setItem("list", JSON.stringify(myCourseCatalog));

// }

function generateStudentClasses(table){
    console.log(localStorage.getItem("studentRegistrations"));

    var studentRegistrationsArray = JSON.parse(localStorage.getItem("studentRegistrations"))

    generateStudentClassesHead(table);
    
    console.log(studentRegistrationsArray)
    
    var registrationId;

    for(var i = 0; i < studentRegistrationsArray.length; i++){

        var row = table.insertRow(); 
       // var studentRegistration = studentRegistrationsArray[i];
        var courseId = studentRegistrationsArray[i].courseId;
        var studentId = studentRegistrationsArray[i].studentId;
        registrationId = studentRegistrationsArray[i].registrationId;
        getOnecourse(courseId);
        var course = JSON.parse(sessionStorage.getItem("course"));
        console.log(element);

        for(element in course){

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
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.addEventListener ("click", function() {
            var ok = confirm("Are you sure you want to delete this course?");
            if (ok == true) {
                var url = "api/registration/delete/" + registrationId;
                var xhttp = new XMLHttpRequest();
                
                xhttp.open("DELETE", url, true);
                xhttp.setRequestHeader('content-Type', 'application/json');
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log("Delete success");

                       
                    }
                };
                // Be sure that the JSON student is coverted to String before sending, using JSON.stringify
                xhttp.send(null);
            }
          });
        var cell = row.insertCell();
        cell.appendChild(button);
            row.appendChild(cell);

        // var cell = row.insertCell();
        // cell.style.border = "1px solid black";
        // var b = content.document.createElement('button');
        // b.onclick = function() { alert('OnClick'); }
        // cell.appendChild(b);
        // row.appendChild(cell);
        


    }
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