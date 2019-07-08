```html
<resize-observer id="ro">
  <div style="width: 100%;height: 500px;background-color: greenyellow">
    0
  </div>
</resize-observer>
```
```
 var tag =document.getElementById('ro');
  tag.onResize=function () {
    tag.querySelector('div').innerHTML +=2222;
  }
  
```