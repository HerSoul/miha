import {Component, Prop, h, Host, State, Element} from '@stencil/core';
import {getLimitDownCell, getLimitUpCell,recoverToLimit} from './utils'
import {is} from '../../utils/typeof';
import {elementToString} from "../../utils/styles";

type LayOut = 'total'| 'sizes' | 'pager' | 'prev' | 'number' | 'omit' | 'next' | 'jumper';

export interface RenderFn {
  (page: Cell, type?: LayOut): HTMLElement|Object
}

export interface Cell {
  count?: number,
  index?: number,
  type: LayOut,
  direction?: 'left' | 'right'
}
const MORE_DOT_NUM = 10;


@Component({
  tag: 'mi-pagination',
  styleUrl: 'Pagination.scss',
})
export class MiPagination {

  @State() _current: number;

  @State() _pageSize: number;

  @State() cellDict: Object = {};

  @State() remainder: number = 0;

  @State() _length: number

  /**
   * 当前页数
   */
  @Prop() current: number;

  /**
   * 默认当前页数
   */
  @Prop() defaultCurrent: number = 1;

  /**
   * 默认的每页条数
   */
  @Prop() defaultPageSize: number = 10;

  /**
   * 禁用分页
   */
  @Prop() disabled: boolean = false;

  /**
   * 只有一页时是否隐藏分页器
   */
  @Prop() hideOnSinglePage: boolean = false;

  /**
   * 当添加该属性时，显示为简单分页
   */
  @Prop() simple: boolean = false;

  /**
   * 用于自定义页码的结构
   */
  @Prop() renderItem: Function;

  /**
   * 每页条数
   */
  @Prop() pageSize: number;

  /**
   * 指定每页可以显示多少条
   */
  @Prop() pageSizeOptions: Array<number>;

  /**
   * 组件布局，子组件名用逗号分隔
   */
  @Prop() layout: string = 'prev, pager, next, jumper, total';

  /**
   * size  当为「small」时，是小尺寸分页
   */
  @Prop() size: string = '';

  /**
   * 页码改变的回调，参数是改变后的页码及每页条数
   */
  @Prop() change: Function = () => {
  };

  /**
   * 数据总数
   */
  @Prop() total: number;

  /**
   * 快速跳转的页数
   */
  @Prop() skipNum: number = 5;

  /**
   * 其他属性,如aria-无障碍属性等
   */
  @Prop() props: { [prop: string]: any };

  componentDidLoad() {
    this.getComputedCellList();
  }

  _itemClick(cell) {
    if(this.disabled)return;
    if(cell.type=='number'){
      this._current = cell.index;
    }else if(cell.type=='omit') {
      if(cell.direction=='right'){
        this._current+=this.skipNum;
      }else{
        this._current-=this.skipNum;
    }}
    this._current=recoverToLimit(this._length,1,this._current);
    if (this._length > MORE_DOT_NUM) {
      this.getLayoutList(cell)
    }
  }
  prevNextClick(type){
      if(type=='prev'){
        if(this._current<=1)return;
        this._current-=1;
        this.getLayoutList(this.cellDict['pager'][this._current])
      }else{
        if(this._current>=this._length)return;
        this._current+=1;
        this.getLayoutList(this.cellDict['pager'][this._current])
      }
  }
  _utifyRenderItem: RenderFn = (cell, type) => {
    if (this.renderItem) {
      return this.renderItem(cell, type,this.defaultRenderItem(cell,type))
    } else {
      return this.defaultRenderItem(cell,type)
    }
  }

  defaultRenderItem: RenderFn = (cell,type) => {
    if(type=='number'){
      return this.defaultRenderPager(cell)
    }else if(type=='next'){
      return this.defaultRenderNext()
    }else if(type=='prev'){
      return this.defaultRenderPrev()
    }else if(type == 'total'){
      return this.defaultRenderTotal()
    }else if(type == 'sizes'){
      return this.defaultRenderSizes()
    }else if(type == 'jumper'){
      return this.defaultRenderJumper()
    }
  }

  getComputedCellList() {
    let length: number;
    this._current = this.current ? this.current : this.defaultCurrent;
    this._pageSize = this.pageSize ? this.pageSize : this.defaultPageSize;
    this.remainder = this.total % this._pageSize;
    this._length = length = Math.floor(this.total / this._pageSize) + (this.remainder > 0 ? 1 : 0);
    this._current = recoverToLimit(length,1,this._current);
    this.getLayoutList();
  }

  _renderActionCell = (cell: Cell) => {
    let element =this._utifyRenderItem(cell, cell.type);
    if (cell.type == 'number') {
      if(is(element,element=>element instanceof Element)){
        return (<li onClick={this._itemClick.bind(this, cell)  } innerHTML={elementToString(element as HTMLElement,true)}
                    class={{'mi-pagination-cell': true, 'cell-active': cell.index == this._current}} mi-pagination-id={cell.index}>
        </li>)
      }
     return (
       <li onClick={this._itemClick.bind(this, cell)}
           class={{'mi-pagination-cell': true, 'cell-active': cell.index == this._current}} mi-pagination-id={cell.index}>
         {element}
       </li>
     )
    } else if(cell.type=='omit') {
      return (<li onClick={this._itemClick.bind(this, cell)}
                  class={{'mi-pagination-cell': true, 'mi-pagination-dot-cell': cell.type == 'omit'}}
                  mi-pagination-id={cell.index}>
        <mi-icon class="arrow_icon" icon={`double_${cell.direction}`}></mi-icon>
        <span class="mi-pagination-cell-ellipsis">
               •••
             </span>
      </li>)
    }else if(cell.type == 'prev'|| cell.type == 'next'){
      let disabled = (this._current==1&&cell.type=="prev")||(this._current==this._length&&cell.type=="next");
      if(is(element,element=>element instanceof Element)){
        return (<li  onClick={this.prevNextClick.bind(this, cell.type)  } innerHTML={elementToString(element as HTMLElement,true)}
                    class={{'mi-pagination-cell': true,'mi-pagination-cell-disabled':disabled}} mi-pagination-id={cell.index}>
        </li>)
      }
      return (
        <li onClick={this.prevNextClick.bind(this, cell.type)}
            class={{'mi-pagination-cell': true,'mi-pagination-cell-disabled':disabled}} mi-pagination-id={cell.index}>
          {element}
        </li>
      )
    }else if(cell.type == 'total'){
      if(is(element,element=>element instanceof Element)){
        return (<li innerHTML={elementToString(element as HTMLElement,true)}
                    class={{'mi-pagination-cell-total': true}} mi-pagination-id={cell.type}>
        </li>)
      }
      return (
        <li
            class={{'mi-pagination-cell-total': true}} mi-pagination-id={cell.type}>
          {element}
        </li>
      )
    }
  }

  renderLayOuts() {
    let  _self = this;
    return Object.values(this.cellDict).map((item) => {
      return item.map(cell=>_self._renderActionCell(cell))
    })
  }

  defaultRenderTotal() {
      return (<span>
        共 {this.total} 条
      </span>)
  }

  defaultRenderSizes() {

  }
  defaultRenderPager(cell){
    return (
      <a>{cell.index}</a>
    )
  }
  defaultRenderPrev() {
    return (
         <mi-icon icon="chevron_left" style={{fontSize:'20px'}}></mi-icon>
    )
  }

  defaultRenderNext() {
    return (
        <mi-icon icon="chevron_right" style={{fontSize:'20px'}}></mi-icon>
    )
  }

  defaultRenderJumper() {

  }

  getLayoutList(cell?){
    let layouts = this.layout.split(','),_self=this;
    layouts.map(item=>{
        item=item.trim();
        if(item=='pager'){
          if (_self._length > MORE_DOT_NUM) {
            _self.cellDict[item]= getLimitUpCell(_self.remainder, _self._current, _self._length, _self._pageSize);
          } else {
            _self.cellDict[item]=getLimitDownCell(_self.remainder, _self._pageSize, _self._length);
          }
        }else{
          _self.cellDict[item]=[{
            type:item as LayOut
          }];
        }
    });
    if(cell){
      this.change(cell, cell.count);
    }
  }
  render() {
    const {props,disabled,hideOnSinglePage,_length,renderLayOuts,size} = this;
    return (
      <Host
        class={{
          'mi-pagination': true,
          'mi-pagination-disabled':disabled,
          [`mi-pagination-${size}`]:size!=undefined
        }}
        style={{
          "display":hideOnSinglePage&&_length==1?'none':'block'
        }}
        {...props}
      >
        {renderLayOuts.bind(this)()}
      </Host>
    )
  }

}
