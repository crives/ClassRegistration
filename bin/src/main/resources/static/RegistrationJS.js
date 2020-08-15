function initialize(){
    getRegistrations("http://localhost:8080/api/Registration")
    renderStudentRegistration();
}

function getRegistrations(url) {

    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            localStorage.setItem("allRegistrations", xhttpList.responseText);        }
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
            localStorage.setItem("studentRegistrations", xhttpList.responseText);        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Student Registrations List stored");

}


function renderStudentRegistration() {
    // Ajax returns an array of JSON objects - the index represents each individual JSON object from our AJAX call
    // We can the iterate over all of our students
    let table = document.getElementById("tempId");
    generateTableHead(table);
    generateTableHead(table);
 
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

  function generateTable(table) {
    var studentRegistrations = JSON.parse(localStorage.getItem("studentRegistrations"));
    for (var i = 0; i < studentRegistrations.results.length; i++) {
      let row = table.insertRow();
        let cell1 = row.insertCell();
        let text1 = document.createTextNode(studentRegistrations[i].studentId);
        cell1.appendChild(text1);

        let cell2 = row.insertCell();
        let text2 = document.createTextNode(studentRegistrations[i].firstName);
        cell2.appendChild(text2);

        let cell3 = row.insertCell();
        let text3 = document.createTextNode(studentRegistrations[i].lastName);
        cell3.appendChild(text3);

        let cell4 = row.insertCell();
        let text4 = document.createTextNode(studentRegistrations[i].courseId);
        cell4.appendChild(text4);

        let cell5 = row.insertCell();
        let text5 = document.createTextNode(studentRegistrations[i].department);
        cell5.appendChild(text5);
        
        let cell6 = row.insertCell();
        let text6 = document.createTextNode(studentRegistrations[i].name);
        cell6.appendChild(text6);
        
        let cell7 = row.insertCell();
        let text7 = document.createTextNode(studentRegistrations[i].credits);
        cell7.appendChild(text7);
      }
    }
