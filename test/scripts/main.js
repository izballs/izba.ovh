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
                    console.log(afterFunc);
                    if (afterFunc != null)
                        afterFunc();
                }
            }
        }
        xhr.open(type, url, true);
        xhr.send(data);
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
        site = origin + "/test/included/login.html";
        loadXHR(site, "loginWrap", "GET", null, false, loginListener);
        return 0;
    }
    if (page.includes("register")) {
        if (document.getElementById("forgotPasswordWrap") !== null) 
		document.getElementById("forgotPasswordWrap").remove();
        if (document.getElementById("loginWrap") !== null) 
		document.getElementById("loginWrap").remove();
        site = origin + "/test/included/register.html";
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
        site = origin + "/test/included/forgotPassword.html";
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
    httpHistory = origin + "/test/" + page;
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
    site = origin + "/test/navigator.php";
    console.log(data);
    loadXHR(site, "siteWrap", "POST", data, false, ff);
}
