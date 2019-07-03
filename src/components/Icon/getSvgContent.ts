var cacheIcon = new Map <string, Promise<string>> ();

export const isValid = (el:HTMLElement):boolean =>{
      if(el.nodeType == 1){
        if(el.nodeName.toLocaleLowerCase() == 'script') return;
        return true
      }else {
        return false
      }
};

export const validateContent = (
  svgContent: string | null | HTMLElement
) => {
  if (svgContent) {
    if(svgContent&&typeof svgContent == 'object'){
      svgContent=svgContent.outerHTML;
    }
    const div = document.createElement('div');
    div.innerHTML = svgContent as string;

    // 删除不是svg的其他标签
    for (let i = div.childNodes.length - 1; i >= 0; i--) {
      if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
        div.removeChild(div.childNodes[i]);
      }
    }
    const svgElm = div.firstElementChild;
    if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
      svgElm.setAttribute('class', 's-icon');
      if (isValid(svgElm as any)) {
        return div.innerHTML;
      }
    }
  }
  return '';
};


export  function  getSvgIcon(url:string) {
  let req = cacheIcon.get(url);
  // 存在则直接取缓存，否则请求
  if(!req){
    req = fetch(url).then(rsp => {
      if (rsp.status <= 299) {
        return rsp.text();
      }
      return Promise.resolve(null);
    }).then(svgContent => validateContent(svgContent)
    );
    // 缓存请求Promise
    cacheIcon.set(url, req);
  }
  return req
}
export function getSvgTel(symbolId) {
  return  `<svg class="svg-ic_list_24px-dims">
                    <use xlink:href="#ic_${symbolId}"></use>
                    </svg>`
}
