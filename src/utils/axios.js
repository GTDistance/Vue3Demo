function Axios(config){
  this.defaults = config
  this.interceters = {
    request:{},
    response:{}
  }
}

Axios.prototype.request = function(config){
  console.log('发送AJAX请求')
}
Axios.prototype.get = function(config){
  return this.request({method:'GET'})
}
Axios.prototype.post = function(config){
  return this.request({method:'POST'})
}

function createInstance(config){
  let context = new Axios(config)
  let instance = Axios.prototype.request.bind(context)
  Object.keys(Axios.prototype).forEach(key=>{
    console.log('key',key)
    instance[key]= Axios.prototype[key].bind(context)
  })

  Object.keys(context).forEach((key)=>{
    instance[key]= context[key]
  })

  return instance
}