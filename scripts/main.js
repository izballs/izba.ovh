window.addEventListener("load", function(){
    console.log("load function");
});

function login(){
    var form = new FormData();
    form.append("username", document.getElementById("login_username").value);
    form.append("password", document.getElementById("login_password").value);
    loadXHR("tikettihallinta/login/login.php", "siteWrap", "POST", form, false, null);
}

function colorHeaderBorder(bool){
    var header = document.getElementById("header");
    if(bool)
        header.style.borderBottomColor = "#1F3031";
    else
        header.style.borderBottomColor = "#283C3D";
}

function showNavi(){
    document.getElementById("navStatus").checked = true;
    var closer = document.createElement("div");
    closer.id = "closeNavi";
    closer.addEventListener("click", hideNavi);
    document.getElementsByTagName("body")[0].appendChild(closer);
}

function hideNavi(){
    console.log("hiding navi");
    document.getElementById("navStatus").checked = false;
    document.getElementById("closeNavi").remove();
}

function loadXHR(url, id, type, data, refresh, afterFunc) {
    //var loading = document.getElementsByClassName("loading")[0];
    //var loader = setTimeout(function () { loading.hidden = false; }, 500);
    if (type == "GET") {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                //clearTimeout(loader);
                //loading.hidden = true;
                if (refresh == true) {
                    afterFunc(xhr.responseText);
                }
                else {
                    document.getElementById(id).innerHTML = xhr.responseText;
                    let funks = document.getElementById(id).getElementsByTagName("script");
                    for (var x = 0; x < funks.length; x++)
                        eval(funks[x].innerHTML);
                    if (afterFunc != null)
                        afterFunc();
                }
            }
        }
        xhr.open(type, url, true);
        xhr.send();
    }
    else if (type == "POST") {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                //clearTimeout(loader);
                //loading.hidden = true;
                if (refresh == true) {
                    afterFunc(xhr.responseText);
                }
                else {
                    document.getElementById(id).innerHTML = xhr.responseText;
                    let funks = document.getElementById(id).getElementsByTagName("script");
                    for (var x = 0; x < funks.length; x++)
                        eval(funks[x].innerHTML);
                    if (afterFunc != null)
                        afterFunc();
                }
            }
        }
        xhr.open(type, url, true);
        xhr.send(data);
    }
}

function firstSelection(){
    let parent = document.getElementsByClassName("selectorWrap")[0];
    parent.children[0].className = "selector selected";
    let projectWrap = document.getElementById("projectsHolder");
    let projectShower = document.getElementById("projectShower");
    let y = 1; 
    for(let x = 0; x < projectWrap.children.length; x++){
        let exploded = projectWrap.children[x].className.split(" ");
        if(exploded[0] === "gameProject")
        {
            let clone = projectWrap.children[x].cloneNode(true);
            setTimeout(function(){clone.className = clone.className + " visible";}, 100*y*2);
            
            projectShower.appendChild(clone);
            y++;
        }
    }
}

function changeSelection(e){
    let target = e.target;
    let parent = target.parentNode;
    for(let x = 0; x < parent.children.length; x++)
        parent.children[x].className = "selector unSelected";
    target.className = "selector selected";
    let className = target.children[0].innerHTML;
    let projectWrap = document.getElementById("projectsHolder");
    let projectShower = document.getElementById("projectShower");

    projectShower.innerHTML = "";
    let y = 1; 
    for(let x = 0; x < projectWrap.children.length; x++){
        let exploded = projectWrap.children[x].className.split(" ");
        if(exploded[0] === className)
        {
            let clone = projectWrap.children[x].cloneNode(true);
            setTimeout(function(){clone.className = clone.className + " visible";}, 100*y*2);
            
            projectShower.appendChild(clone);
            y++;
        }
    }
}

function loadPage(page, type, id, popupornot, e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(page);  
    if(document.getElementById("navStatus").checked)
        hideNavi();
    var origin = window.location.origin;
    var data = new FormData();
    let site = "";
    if (page.includes("login")) {
        if (document.getElementById("loginWrap") === null) {
        	if (document.getElementById("forgotPasswordWrap") !== null) 
			document.getElementById("forgotPasswordWrap").remove();
            var loginWrap = document.createElement("div");
            loginWrap.id = "loginWrap";
            document.getElementsByTagName("body")[0].appendChild(loginWrap);
        }
        site = origin + "/included/login.html";
        loadXHR(site, "loginWrap", "GET", null, false, loginListener);
        return 0;
    }
    if (page.includes("register")) {
        if (document.getElementById("forgotPasswordWrap") !== null) 
		document.getElementById("forgotPasswordWrap").remove();
        if (document.getElementById("loginWrap") !== null) 
		document.getElementById("loginWrap").remove();
        site = origin + "/included/register.html";
        loadXHR(site, "siteWrap", "GET", null, false, registerListener);
        return 0;
    }
    if (page.includes("forgotpassword")) {
        if (document.getElementById("forgotPasswordWrap") === null) {
        	if (document.getElementById("loginWrap") !== null) 
			document.getElementById("loginWrap").remove();

            var loginWrap = document.createElement("div");
            loginWrap.id = "forgotPasswordWrap";
            document.getElementsByTagName("body")[0].appendChild(loginWrap);
        }
        site = origin + "/included/forgotPassword.html";
        loadXHR(site, "forgotPasswordWrap", "GET", null, false, forgotPasswordListener);
        return 0;

    }
    if (page.includes("logout")) {
        logout();
        return 0;
    }

     
    var sites = page.split("/");
    data.append("sub", sites[1]);
    data.append("main", sites[0]);
    data.append("id", id);
    httpHistory = origin + "/" + page;
    if(id != null){
        httpHistory += "/" + id;
    }
    console.log(page);
    console.log(sites[0]);
    console.log(data[0]);
    console.log(httpHistory);
    if (popupornot != "popstate"){
        console.log("not popstate");
        window.history.pushState(null, null, httpHistory);
    }
    let ff = function () {
    }
    site = origin + "/navigator.php";
    console.log(data);
    loadXHR(site, "siteWrap", "POST", data, false, ff);
}
