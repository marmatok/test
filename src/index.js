(function(){
"use strict"
    injector.registerType("CacheManager", CacheManager);
    injector.registerType("FetchFilesAsync", FetchFilesAsync);
    injector.registerType("Router", Router);

    const view = document.getElementById('view');

    document.body.addEventListener("click", function(e){
        let element = e.srcElement.hasAttribute("data-route");
        if(element){
            e.srcElement.addEventListener("click", injector.getInstanceOf(Router, [e]));
        }
    }, true);
}());