import { Config  } from './config';
import {startTapClick } from '../../utils/tap-click'
class Miha {
    config:Config = {
      animated:true,
      prefix:'mi',
      version:0.01,
      rippleEffect:true,
      spinerIcon:'toys',
      getBoolean(obj,key){
        return obj[key] != undefined
      }
    };
    constructor(config:Config){
      this.setupConfig(config);
      this.initSymbol();
    }
    setupConfig(config){
      let doc = window.document;
      startTapClick(doc,this.config);
      this.config =Miha['_CONFIG']= Object.assign(this.config,config)
    }
    initSymbol(){
      fetch('/src/assets/Icon/svg-sprite-action-symbol.svg').then(res=>res.text()).then(text=>{
        document.body.insertAdjacentHTML("afterbegin", '<div style="display:none;">' + text + '</div>');
      })
    }

}
new Miha({})
const win = window as any;
win.Miha = Miha;

