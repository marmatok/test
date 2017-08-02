// class Injector{
//     constructor(){
//         this.repository = {};
//     }
//     getInstanceOf(className, parameters){
//         if(!this.repository[className]){
//             this.repository[className] = new className(...parameters);
//         }
//         return this.repository[className];
//     }
// }

class Injector{
  constructor(){
    this.container = new Map();
    this.FN_ARGS = /[^\(]*\(\s*([^\)]*)\)/m;
  }
    registerType(key, type){
      this.container.set(key, type);
    }
    registerFactory(key, func){
      this.container.set(key, func);
    }
    //registerInstance(key, instance){
      //this.container.set(key, () => return instance)
    //},
    resolve(key){
      if(!this.container.get(key)) return null;
      let obj = this.container.get(key);
      let definition = obj.toString();
      let params = this.FN_ARGS.exec(definition)[1].split(',').map((x) => x.trim());
      
      if(params.length){
        let paramsInstances = params.map((param) => this.resolve(param))
        return new obj(...paramsInstances);        
      }
      else{
        return new obj();
      }
     }
  }
    
//Global
window.injector = new Injector();