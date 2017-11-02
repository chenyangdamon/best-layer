# What is best-layer ?
Layer component is applied to web development, it is lightweight, concise, content custom.
# Dependence 
- jquery.1.11.x
# Installation

## script
```html
// import jquery.js
<script type="text/javascript" src="js/jquery.js"></script>
// import best-layer.js
<script type="text/javascript" src="js/best-layer.js"></script>
```
# Useage
##### Note: Please check in the service environment.
index.js
```html
<script type="text/javascript">
$(function(){
  
  // instantiation Layer
  var layer=new Layer();
  
  // open
  layer.open();
  
  // close
  layer.close();
  
  // static alert
  Layer.alert();
  
  // static confrim
  Layer.confirm();
  
  // static prompt
  Layer.prompt();
  
});
</script>
```
# Constructor
## options
|key|description|default|options|
|:---|---|---|---|
| `title`|Title of title layer.|`""`|`String`|
| `skin`|Custom class.|`""`|`String`|
| `header`|Show head.|`true`|`Boolean`|
| `overlayer`|Do you want to display modal boxes.|`true`|`Boolean`|
| `swapping`|Click the blank area to close the layer.|`false`|`Boolean`|
| `draggable`|Do you want to drag and drop.|`false`|`Boolean`|
| `data`|Template data.|`null`|`Object`|
| `url`|Template address.|`""`|`String`|
| `buttons`|Operation button group.|`[]`|`Array`|
| `animation`|Set the animation, the first element is access, the second is to leave, system provide:`zoomIn zoomOut`、`fadeInDown fadeOutUp`.|`["zoomIn", "zoomOut"]`|`Array`|

## methods
#### open(conf)
open the layer component
- conf.title
- conf.skin
- conf.header
- conf.overlayer
- conf.swapping
- conf.draggable
- conf.data
- conf.url
- conf.buttons
- conf.animation
```html
<script type="text/javascript">
layer.open({
  title: "通知",
  skin: "pb-layer-register",
  data: {
    message: "自定义弹层",
    username: "tom"
  },
  url: "/template/register.tpl.html",
  buttons: [{
    text: "确 定",
    skin: "button-primary button-h-30",
    handler: function() {
      console.log('ok')
    }
  }, {
    text: "取 消",
    skin: "button-primary button-h-30 button-outline",
    handler: function() {
      console.log('cancel')
    }
  }]
});
</script>
```
#### close()
remove layer components

## static methods
### alert(conf)
- conf.title
- conf.data
- conf.confirm
```html
<script type="text/javascript">
Layer.alert({
  title: "通知",
  data: {
    message: "支付已成功！"
  },
  confirm: function() {}
});
</script>
```
### confirm(conf)
- conf.title
- conf.data
- conf.confirm
- conf.cancel
```html
<script type="text/javascript">
Layer.confirm({
  title: "通知",
  data: {
    message: "确认删除该记录吗？"
  },
  confirm: function() {},
  cancel: function() {},
});
</script>
```
### prompt(conf)
- conf.title
- conf.data
- conf.confirm
- conf.cancel
```html
<script type="text/javascript">  
Layer.confirm({
  title: "通知",
  data: {
    message: "确认删除该记录吗？"
  },
  confirm: function() {},
  cancel: function() {},
});
</script>
```
