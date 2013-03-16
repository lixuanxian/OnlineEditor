var delay;
//start html_editor
var html_editor = CodeMirror.fromTextArea(document.getElementById('code-html'), {
    mode: 'text/html',
    tabMode: 'indent',
    lineNumbers: true,
    styleActiveLine: true,
    lineWrapping: true
});
html_editor.setOption("theme", "rubyblue");
html_editor.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
});
//end html_editor
 
//start css_editor
var css_editor = CodeMirror.fromTextArea(document.getElementById("code-css"), {
    lineNumbers: true,
    styleActiveLine: true
});
     
     
css_editor.setOption("theme", "rubyblue");

css_editor.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
});

//end css_editor

//start js_editor
var js_editor = CodeMirror.fromTextArea(document.getElementById('code-js'), {
    mode: 'javascript',
    tabMode: 'indent',
    lineNumbers: true,
    styleActiveLine: true,
    lineWrapping: true,
    autofocus:true

});
js_editor.setOption("theme", "rubyblue");

js_editor.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
});
      
//end js_editor
function updatePreview() {
    var previewFrame = document.getElementById('code-preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(html_editor.getValue()+"<style>"+css_editor.getValue()+"</style>" +"<script>"+js_editor.getValue()+"</script>");
    preview.close();
}
setTimeout(updatePreview, 300);
      
// //设置 iframe 的自动高 
$("#code-preview").css({
    "height":($(".code.css").height())+"px"
});
//// /设置 鼠标箭头
//    $(".resize-vertical").css({"left":($(".code.css").width())+"px"});
//    $(".resize-horizontal").css({"top":($(".code.css").height())+"px"});
      
//全局变量控制，isMouseDown     isMouseOver isMouseDownMove

var isHMouseDown = false;
var isVMouseDown = false;

$(".resize-vertical ").bind("mousedown",function(event){
    isVMouseDown = true;
});      
  
$(" .resize-horizontal ").bind("mousedown",function(event){
    isHMouseDown = true;
});      
$("body,.resize-horizontal, .code").bind("mouseup",function(event){
    isHMouseDown = false;
    isVMouseDown = false;

});   
           
        
//       //垂直  左右拖动
$(".resize-vertical,.editorSet").bind("mousemove",function(event){
    if(isVMouseDown == true){
        var resize_vertical  = $(this).parent("#main-content").children(".resize-vertical");
        var editorSet_left =    $(this).parent("#main-content").children(".set-left");
        var editorSet_right =  $(this).parent("#main-content").children(".set-right");
        console.log("   resize_vertical.position().left:"+resize_vertical.position().left);
        var drag_width=(event.pageX-0.01*$(window).outerWidth()+(resize_vertical.width())/2.0) - resize_vertical.position().left;
        console.log("event.pageX: "  +event.pageX+ "   resize_vertical.position().left:"+ 
            +"0.005*$(window).outerWidth()"+0.005*$(window).outerWidth()
            +"$(this).parent(\"#main-content\").position().left"+$(this).parent("#main-content").position().left
            + "    drag:"+drag_width);

        resize_vertical.css({
            "left":(drag_width+resize_vertical.position().left)+ "px"
        });
        editorSet_left.css({
            "width":(editorSet_left.width()+drag_width+"px")
        });
        //         editorSet_right.css({
        //            "left":(editorSet_right.width()+drag_width+"px")
        //        });
        editorSet_right.css({
            "width":(editorSet_right.width()-drag_width+"px")
        });
    }
});  
      
//水平   上下拖动
$(".resize-horizontal, .code").bind("mousemove",function(event){
    if(isHMouseDown == true){
        var resize_horizontal  = $(this).parent(".editorSet").children(".resize-horizontal");
        var code_top =  $(this).parent(".editorSet").children(".code-top");
        var code_bottom =  $(this).parent(".editorSet").children(".code-bottom");

        var  drag_height =event.pageY-(resize_horizontal.position().top+0.005*$(window).outerHeight()+$(this).parent(".editorSet").position().top);
        //  console.log("0.005*$(window).outerHeight(): "  +0.005*$(window).outerHeight()+ "   resize_horizontal.position().top:"+resize_horizontal.position().top +  "    pageY:"+event.pageY+"    drag:"+drag_height);
        var  percent = drag_height*100/$(window).outerHeight();
        resize_horizontal.css({
            "top":(resize_horizontal.position().top+drag_height)+ "px"
        });
        code_top.css({
            "height":(code_top.outerHeight()+drag_height+"px")
        });
            
        code_bottom.css({
            "height":(code_bottom.outerHeight()-drag_height+"px")
        });
        code_bottom.css({
            "top":(code_bottom.position().top+drag_height+"px")
        });
    //  console.log("resize_horizontal:"+resize_horizontal.position().top);

    }
});      


$("#menu a").bind("click",function(){
    alert("关于菜单，还在设计中！");
    
});
