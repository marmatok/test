(function(){
"use strict"
    const view = document.getElementById('view');
    const utilServiceAsync = new UtilServiceAsync();
    const cacheManager = new CacheManager();

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
        let element = e.srcElement.hasAttribute("data-route");
        if(element){
            e.srcElement.addEventListener("click", new Router(e));
        }
    }, true);
    
}());