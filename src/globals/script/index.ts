import { Config  } from './config';

class Miha {
    config:Config = {
      animated:true,
      prefix:'mi',
      version:0.01
    };
    constructor(config:Config){
      this.setupConfig(config)
    }
    setupConfig(config){
      this.config = Object.assign(this.config,config)
    }
}
const win = window as any;
win.Miha = Miha;

