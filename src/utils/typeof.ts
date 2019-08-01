 export function is(obj,type:string|Function):boolean {
  let str = Object.prototype.toString.call(obj);
  if(typeof type == 'string'){
    return str == type
  }else{
    return type(obj)
  }
}
