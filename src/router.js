(function(){
"use strict"
    const view = document.getElementById('view');
    const utilServiceAsync = new UtilServiceAsync();
    //const links = document.querySelectorAll('nav span, article span');
    
    // [...links].forEach(function(element) {
    //     element
    // }, this);
    // function router(e){
    //     let route = e.srcElement.getAttribute("data-route"), path;
    //     switch(true){
    //         case /login/i.test(route):
    //             path = "login.html";
    //             break;
    //         case /back/i.test(route):
    //             path = "login.html";
    //             break;
    //         default:
    //             path = "404.html";
    //     }

    //     utilServiceAsync().requestFiles("login.html")
    //         .then((response)=>{
    //             view.innerHTML = response;
    //         });
    // }

    class Router{
        constructor(e){
            this.route = e.srcElement.getAttribute("data-route"), this.path;
            this.router();
        }
        router(){
            switch(true){
                case /login/i.test(this.route):
                    this.path = "login.html";
                    break;
                case /back/i.test(this.route):
                    this.path = "login.html";
                    break;
                default:
                    this.path = "404.html";
            }

            utilServiceAsync.requestFiles(this.path)
                .then((response)=>{
                    view.innerHTML = response;
                });
        }
    }
    
    document.body.addEventListener("click", function(e){
        if(e.srcElement.hasAttribute("data-route")){
            e.srcElement.addEventListener("click", new Router(e));
        }
    }, true);
    
}());