"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Injector = function () {
    function Injector() {
        _classCallCheck(this, Injector);

        this.repository = {};
    }

    _createClass(Injector, [{
        key: "getInstanceOf",
        value: function getInstanceOf(className, parameters) {
            if (!this.repository[className]) {
                this.repository[className] = new (Function.prototype.bind.apply(className, [null].concat(_toConsumableArray(parameters))))();
            }
            return this.repository[className];
        }
    }]);

    return Injector;
}();

//Global


window.injector = new Injector();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CacheManager = function () {
    function CacheManager() {
        _classCallCheck(this, CacheManager);

        this.routes = {};
    }

    _createClass(CacheManager, [{
        key: "getRoute",
        value: function getRoute(name) {
            return this.routes[name] || null;
        }
    }, {
        key: "saveRoute",
        value: function saveRoute(name, htmlContent) {
            this.routes[name] = htmlContent;
        }
    }]);

    return CacheManager;
}();

var FetchFilesAsync = function () {
    function FetchFilesAsync() {
        _classCallCheck(this, FetchFilesAsync);

        this.cacheManager = injector.getInstanceOf(CacheManager);
    }

    _createClass(FetchFilesAsync, [{
        key: "getFile",
        value: function getFile(filename) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var htmlContent = _this.cacheManager.getRoute(filename);
                if (htmlContent) {
                    resolve(htmlContent);
                } else {
                    var xhr = new XMLHttpRequest();
                    xhr.open("get", "./src/templates/" + filename + ".html", true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == XMLHttpRequest.DONE && /^2/.test(xhr.status)) {
                            _this.cacheManager.saveRoute(filename, xhr.response);
                            resolve(xhr.response);
                        } else if (xhr.readyState == XMLHttpRequest.DONE && !/^2/.test(xhr.status)) {
                            reject("404");
                        }
                    };
                    xhr.send();
                }
            });
        }
    }]);

    return FetchFilesAsync;
}();

var Router = function () {
    function Router(e) {
        _classCallCheck(this, Router);

        this.route = e.srcElement.getAttribute("data-route"), this.path;
        this.fetchFilesAsync = injector.getInstanceOf(FetchFilesAsync);
        this.router();
    }

    _createClass(Router, [{
        key: "router",
        value: function router() {
            switch (true) {
                case /login/i.test(this.route):
                    this.path = "login";
                    break;
                case /back/i.test(this.route):
                    this.path = "login";
                    break;
                default:
                    this.path = "404";
            }

            this.fetchFilesAsync.getFile(this.path).then(function (response) {
                view.innerHTML = response;
            });
        }
    }]);

    return Router;
}();
"use strict";

(function () {
    "use strict";

    var view = document.getElementById('view');

    document.body.addEventListener("click", function (e) {
        var element = e.srcElement.hasAttribute("data-route");
        if (element) {
            e.srcElement.addEventListener("click", injector.getInstanceOf(Router, [e]));
        }
    }, true);
})();
