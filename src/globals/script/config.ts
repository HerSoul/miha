export interface Config {
  /**
    是否启用动画，默认启用
   */
  animated?: boolean;
  /**
   组件前缀，默认mh
   */
  prefix?: string;
  /**
   effeft
   */
  rippleEffect?: boolean;
  /**
   版本号
   */
  version?: number;
  /**
   spinerIcon
   */
  spinerIcon?: string;

  getBoolean?:(config:Config,key:string)=>boolean;

}

