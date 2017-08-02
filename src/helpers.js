class CacheManager{
    constructor(){
        this.routes = {};        
    }
    getRoute(name){
        return this.routes[name] || null;
    }
    saveRoute(name, htmlContent){
        this.routes[name] = htmlContent;
    }
}

class FetchFilesAsync{
    constructor(CacheManager){
        this.cacheManager = CacheManager;
    }
    getFile(filename){
        return new Promise((resolve,reject)=>{
            let htmlContent = this.cacheManager.getRoute(filename);
            if(htmlContent){
                resolve(htmlContent)
            }
            else{
                let xhr = new XMLHttpRequest();
                xhr.open("get", `./src/templates/${filename}.html`, true);
                xhr.onreadystatechange = () => {
                    if(xhr.readyState == XMLHttpRequest.DONE && /^2/.test(xhr.status)){
                        this.cacheManager.saveRoute(filename, xhr.response);
                        resolve(xhr.response);
                    }
                    else if(xhr.readyState == XMLHttpRequest.DONE && !/^2/.test(xhr.status)){
                        reject("404");
                    }
                }
                xhr.send();
            }
        });    
    }
}

class Router{
        constructor(e, FetchFilesAsync){
            this.route = e.srcElement.getAttribute("data-route"), this.path;
            this.fetchFilesAsync = FetchFilesAsync;
            this.router();
        }
        router(){
            switch(true){
                case /login/i.test(this.route):
                    this.path = "login";
                    break;
                case /back/i.test(this.route):
                    this.path = "login";
                    break;
                default:
                    this.path = "404";
            }

            this.fetchFilesAsync.getFile(this.path)
                .then((response)=>{
                    view.innerHTML = response;
                });
        }
    }