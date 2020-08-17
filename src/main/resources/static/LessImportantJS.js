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