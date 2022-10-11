var t=Object.defineProperty,e=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(e,i,a)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[i]=a;import{c as l,_ as o,o as n,a as r,b as h,r as d,d as c,e as u,w as g,t as f,n as v,p,f as x,g as b,h as y}from"./index.23564e4b.js";var m={exports:{}},w=m.exports=function(){function t(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function e(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=window.devicePixelRatio||1,a=10*i,s=a/2;return function(){function l(t,e){var o,n,r,h;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),this.canvas=(o=t,n=document.getElementById(o),r=n.parentNode.clientWidth,h=n.parentNode.clientHeight,n.style.width=r+"px",n.style.height=h+"px",n.width=r*i,n.height=h*i,n),this.ctx=this.canvas.getContext("2d"),this.type="bar",this.showValue=!0,this.showGrid=!0,this.topPadding=60*i,this.leftPadding=50*i,this.rightPadding=10*i,this.bottomPadding=50*i,this.yEqual=5,this.yLength=0,this.xLength=0,this.ySpace=0,this.xRorate=0,this.yRorate=0,this.xRotate=0,this.yRotate=0,this.bgColor="#fff",this.axisColor="#666",this.gridColor="#eee",this.title={text:"",color:"#666",position:"top",font:"bold "+18*i+"px Arial",top:a,bottom:s},this.legend={display:!0,position:"top",color:"#666",font:14*i+"px Arial",top:45*i,bottom:15*i,textWidth:0},this.radius=100*i,this.innerRadius=60*i,this.colorList=["#4A90E2","#F5A623","#ff5858","#5e64ff","#2AC766","#743ee2","#b554ff","#199475"],this.init(e)}return function(e,i,a){i&&t(e.prototype,i),a&&t(e,a)}(l,[{key:"init",value:function(t){if(t.title=Object.assign({},this.title,t.title),t.legend=Object.assign({},this.legend,t.legend),Object.assign(this,t),!t.labels||!t.labels.length)throw new Error("缺少主要参数labels");if(!t.datasets||!t.datasets.length)throw new Error("缺少主要参数datasets");this.drawBackground(),"bar"===this.type||"line"===this.type?this.renderBarChart():this.renderPieChart(),this.drawLegend()}},{key:"renderBarChart",value:function(){this.yLength=Math.floor((this.canvas.height-this.topPadding-this.bottomPadding-a)/this.yEqual),this.xLength=Math.floor((this.canvas.width-this.leftPadding-this.rightPadding-a)/this.labels.length),this.ySpace=function(t,i){var a=t.map((function(t){return t.data.reduce((function(t,e){return e<t?t:e}))})),s=Math.ceil(Math.max.apply(Math,e(a))/i),l=s.toString().length-1;return l=2<l?2:l,Math.ceil(s/Math.pow(10,l))*Math.pow(10,l)}(this.datasets,this.yEqual),this.drawXAxis(),this.drawYAxis(),this.drawBarContent()}},{key:"drawBarContent",value:function(){var t=this.ctx,e=this.datasets.length;t.beginPath();for(var l=0;l<e;l++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.datasets[l].label).width),t.fillStyle=t.strokeStyle=this.datasets[l].fillColor||this.colorList[l];for(var o=this.datasets[l].data,n=0;n<o.length;n++)if(!(n>this.labels.length-1)){var r=this.xLength/(e+1),h=this.yLength/this.ySpace,d=this.leftPadding+this.xLength*n+r*(l+.5),c=d+r,u=this.canvas.height-this.bottomPadding,g=u-o[n]*h;if("bar"===this.type)t.fillRect(d,g,c-d,u-g),this.drawValue(o[n],d+r/2,g-s);else if("line"===this.type){var f=this.leftPadding+this.xLength*(n+.5);t.beginPath(),t.arc(f,g,3*i,0,2*Math.PI,!0),t.fill(),0!==n&&(t.beginPath(),t.strokeStyle=this.datasets[l].fillColor||this.colorList[l],t.lineWidth=2*i,t.moveTo(f-this.xLength,u-o[n-1]*h),t.lineTo(f,g),t.stroke(),t.lineWidth=1*i),this.drawValue(o[n],f,g-a)}}}t.stroke()}},{key:"renderPieChart",value:function(){for(var t=this.ctx,e=this.labels.length,i=this.datasets[0],a=i.data,s=a.reduce((function(t,e){return t+e})),l=-Math.PI/2,o=this.canvas.width/2,n=this.canvas.height/2,r=0;r<e;r++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.labels[r]).width),t.beginPath(),t.strokeStyle=t.fillStyle=i.colorList&&i.colorList[r]||this.colorList[r],t.moveTo(o,n);var h=l,d=l+=a[r]/s*2*Math.PI;t.arc(o,n,this.radius,h,d),t.closePath(),t.fill();var c=(h+d)/2;this.drawPieValue(a[r],c)}"ring"===this.type&&(t.beginPath(),t.fillStyle=this.bgColor,t.arc(o,n,this.innerRadius,0,2*Math.PI),t.closePath(),t.fill())}},{key:"drawValue",value:function(t,e,a){var s=this.ctx;this.showValue&&(s.textBaseline="middle",s.font=12*i+"px Arial",s.textAlign="center",s.fillText(t,e,a))}},{key:"drawPieValue",value:function(t,e){var i=this.ctx;if(this.showValue){var s=this.canvas.width/2,l=this.canvas.height/2,o=Math.ceil(Math.abs(this.radius*Math.cos(e))),n=Math.floor(Math.abs(this.radius*Math.sin(e)));i.textBaseline="middle",this.showValue&&(e<=0?(i.textAlign="left",i.moveTo(s+o,l-n),i.lineTo(s+o+a,l-n-a),i.moveTo(s+o+a,l-n-a),i.lineTo(s+o+3*a,l-n-a),i.stroke(),i.fillText(t,s+o+3.5*a,l-n-a)):0<e&&e<=Math.PI/2?(i.textAlign="left",i.moveTo(s+o,l+n),i.lineTo(s+o+a,l+n+a),i.moveTo(s+o+a,l+n+a),i.lineTo(s+o+3*a,l+n+a),i.stroke(),i.fillText(t,s+o+3.5*a,l+n+a)):e>Math.PI/2&&e<Math.PI?(i.textAlign="right",i.moveTo(s-o,l+n),i.lineTo(s-o-a,l+n+a),i.moveTo(s-o-a,l+n+a),i.lineTo(s-o-3*a,l+n+a),i.stroke(),i.fillText(t,s-o-3.5*a,l+n+a)):(i.textAlign="right",i.moveTo(s-o,l-n),i.lineTo(s-o-a,l-n-a),i.moveTo(s-o-a,l-n-a),i.lineTo(s-o-3*a,l-n-a),i.stroke(),i.fillText(t,s-o-3.5*a,l-n-a)))}}},{key:"drawBackground",value:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawTitle()}},{key:"drawTitle",value:function(){var t=this.title;if(t.text){var e=this.ctx;e.beginPath(),e.font=t.font,e.textAlign="center",e.fillStyle=t.color,"top"===t.position?(e.textBaseline="top",e.fillText(t.text,this.canvas.width/2,t.top)):(e.textBaseline="bottom",e.fillText(t.text,this.canvas.width/2,this.canvas.height-t.bottom))}}},{key:"drawXAxis",value:function(){var t=this.ctx,e=this.canvas.height-this.bottomPadding+.5;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding,e),t.lineTo(this.canvas.width-this.rightPadding,e),t.stroke(),this.drawXPoint()}},{key:"drawXPoint",value:function(){var t=this.ctx;t.beginPath(),t.font=12*i+"px Microsoft YaHei",t.textAlign=this.xRorate||this.xRotate?"right":"center",t.textBaseline="top",t.fillStyle=this.axisColor;for(var e=0;e<this.labels.length;e++){var l=this.labels[e],o=this.leftPadding+this.xLength*(e+1)+.5,n=this.canvas.height-this.bottomPadding;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(o,n),t.lineTo(o,this.topPadding+a)):(t.moveTo(o,n),t.lineTo(o,n-s)),t.stroke(),t.save(),t.translate(o-this.xLength/2,n+s),this.xRorate?t.rotate(-this.xRorate*Math.PI/180):t.rotate(-this.xRotate*Math.PI/180),t.fillText(l,0,0),t.restore()}}},{key:"drawYAxis",value:function(){var t=this.ctx;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding-.5,this.canvas.height-this.bottomPadding+.5),t.lineTo(this.leftPadding-.5,this.topPadding+.5),t.stroke(),this.drawYPoint()}},{key:"drawYPoint",value:function(){var t=this.ctx;t.font=12*i+"px Microsoft YaHei",t.textAlign="right",t.textBaseline="middle",t.beginPath();for(var e=0;e<this.yEqual;e++){var l=this.leftPadding,o=this.canvas.height-this.bottomPadding-this.yLength*(e+1)+.5;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(l,o),t.lineTo(this.canvas.width-this.rightPadding-a,o)):(t.strokeStyle=this.axisColor,t.moveTo(l-s,o),t.lineTo(l,o)),t.stroke(),t.save(),t.fillStyle=this.axisColor,t.translate(l-a,o),this.yRorate?t.rotate(-this.yRorate*Math.PI/180):t.rotate(-this.yRotate*Math.PI/180),t.fillText(this.ySpace*(e+1),0,0),t.restore()}}},{key:"drawLegend",value:function(){var t=this.legend;if(t.display){var e=this.ctx,i="pie"===this.type||"ring"===this.type;e.beginPath(),e.font=t.font,e.textAlign="left",e.textBaseline="middle";for(var l=i?this.labels.length:this.datasets.length,o=(this.canvas.width-(this.legend.textWidth+(5*l-2)*a))/2,n=0,r=0;r<l;r++){var h=i?this.datasets[0]:this.datasets[r],d=(i?this.labels[r]:h.label)||"";e.fillStyle=h.colorList&&h.colorList[r]||h.fillColor||this.colorList[r],"top"===t.position?(this.drawLegendIcon(o+5*a*r+n,t.top-s,2*a,a),e.fillStyle=t.color,e.fillText(d,o+(5*r+3)*a+n,t.top)):"bottom"===t.position?(this.drawLegendIcon(o+5*a*r+n,this.canvas.height-t.bottom-s,2*a,a),e.fillStyle=t.color,e.fillText(d,o+(5*r+3)*a+n,this.canvas.height-t.bottom)):(e.fillRect(a,t.top+2*a*r,2*a,a),e.fillStyle=t.color,e.fillText(d,4*a,t.top+2*a*r+.5*a)),n+=Math.ceil(e.measureText(d).width)}}}},{key:"drawLegendIcon",value:function(t,e,l,o){var n=this.ctx;"line"===this.type?(n.beginPath(),n.strokeStyle=n.fillStyle,n.lineWidth=2*i,n.moveTo(t,e+s),n.lineTo(t+2*a,e+s),n.stroke(),n.lineWidth=1*i,n.arc(t+a,e+s,3*i,0,2*Math.PI,!0),n.fill()):n.fillRect(t,e,l,o)}}]),l}()}();const P=["id"];const T={name:"dashboard",components:{Schart:o({props:{canvasId:{type:String,default:"",required:!0},options:{type:Object,required:!0}},mounted(){this.renderChart()},methods:{renderChart(){if(!this.checkOptions())return;const t=((t,l)=>{for(var o in l||(l={}))i.call(l,o)&&s(t,o,l[o]);if(e)for(var o of e(l))a.call(l,o)&&s(t,o,l[o]);return t})({},this.options);new w(this.canvasId,t)},checkOptions(){const t=this.options;return!(!t.datasets||!t.datasets.length)&&!(!t.labels||!t.labels.length)}},watch:{options:{handler(t,e){this.renderChart()},deep:!0}}},[["render",function(t,e,i,a,s,l){return n(),r("div",null,[h("canvas",{id:i.canvasId},null,8,P)])}]])},setup(){const t=localStorage.getItem("ms_username"),e="admin"===t?"超级管理员":"普通用户";return{name:t,data:d([{name:"2018/09/04",value:1083},{name:"2018/09/05",value:941},{name:"2018/09/06",value:1139},{name:"2018/09/07",value:816},{name:"2018/09/08",value:327},{name:"2018/09/09",value:228},{name:"2018/09/10",value:1065}]),options:{type:"bar",title:{text:"最近一周各品类销售图"},xRorate:25,labels:["周一","周二","周三","周四","周五"],datasets:[{label:"家电",data:[234,278,270,190,230]},{label:"百货",data:[164,178,190,135,160]},{label:"食品",data:[144,198,150,235,120]}]},options2:{type:"line",title:{text:"最近几个月各品类销售趋势图"},labels:["6月","7月","8月","9月","10月"],datasets:[{label:"家电",data:[234,278,270,190,230]},{label:"百货",data:[164,178,150,135,160]},{label:"食品",data:[74,118,200,235,90]}]},todoList:d([{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要写100行代码加几个bug吧",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!0},{title:"今天要写100行代码加几个bug吧",status:!0}]),role:e}}},k=t=>(p("data-v-77384197"),t=t(),x(),t),S={class:"user-info"},M=k((()=>h("img",{src:y,class:"user-avator"},null,-1))),L={class:"user-info-cont"},C={class:"user-info-name"},_=k((()=>h("div",{class:"user-info-list"},[b(" 上次登录时间： "),h("span",null,"2019-11-01")],-1))),I=k((()=>h("div",{class:"user-info-list"},[b(" 上次登录地点： "),h("span",null,"东莞")],-1))),A=k((()=>h("div",{class:"clearfix"},[h("span",null,"语言详情")],-1))),R=b(" Vue "),O=b("JavaScript "),B=b("CSS "),V=b("HTML "),j=k((()=>h("div",{class:"grid-content grid-con-1"},[h("i",{class:"el-icon-user-solid grid-con-icon"}),h("div",{class:"grid-cont-right"},[h("div",{class:"grid-num"},"1234"),h("div",null,"用户访问量")])],-1))),E=k((()=>h("div",{class:"grid-content grid-con-2"},[h("i",{class:"el-icon-message-solid grid-con-icon"}),h("div",{class:"grid-cont-right"},[h("div",{class:"grid-num"},"321"),h("div",null,"系统消息")])],-1))),W=k((()=>h("div",{class:"grid-content grid-con-3"},[h("i",{class:"el-icon-s-goods grid-con-icon"}),h("div",{class:"grid-cont-right"},[h("div",{class:"grid-num"},"5000"),h("div",null,"数量")])],-1))),q={class:"clearfix"},Y=k((()=>h("span",null,"待办事项",-1))),H=b("添加"),X=k((()=>h("template",null,[h("i",{class:"el-icon-edit"}),h("i",{class:"el-icon-delete"})],-1)));var G=o(T,[["render",function(t,e,i,a,s,l){const o=c("el-card"),d=c("el-progress"),p=c("el-col"),x=c("el-row"),b=c("el-button"),y=c("el-checkbox"),m=c("el-table-column"),w=c("el-table"),P=c("schart");return n(),r("div",null,[u(x,{gutter:20},{default:g((()=>[u(p,{span:8},{default:g((()=>[u(o,{shadow:"hover",class:"mgb20",style:{height:"252px"}},{default:g((()=>[h("div",S,[M,h("div",L,[h("div",C,f(a.name),1),h("div",null,f(a.role),1)])]),_,I])),_:1}),u(o,{shadow:"hover",style:{height:"252px"}},{header:g((()=>[A])),default:g((()=>[R,u(d,{percentage:71.3,color:"#42b983"},null,8,["percentage"]),O,u(d,{percentage:24.1,color:"#f1e05a"},null,8,["percentage"]),B,u(d,{percentage:13.7},null,8,["percentage"]),V,u(d,{percentage:5.9,color:"#f56c6c"},null,8,["percentage"])])),_:1})])),_:1}),u(p,{span:16},{default:g((()=>[u(x,{gutter:20,class:"mgb20"},{default:g((()=>[u(p,{span:8},{default:g((()=>[u(o,{shadow:"hover","body-style":{padding:"0px"}},{default:g((()=>[j])),_:1})])),_:1}),u(p,{span:8},{default:g((()=>[u(o,{shadow:"hover","body-style":{padding:"0px"}},{default:g((()=>[E])),_:1})])),_:1}),u(p,{span:8},{default:g((()=>[u(o,{shadow:"hover","body-style":{padding:"0px"}},{default:g((()=>[W])),_:1})])),_:1})])),_:1}),u(o,{shadow:"hover",style:{height:"403px"}},{header:g((()=>[h("div",q,[Y,u(b,{style:{float:"right",padding:"3px 0"},type:"text"},{default:g((()=>[H])),_:1})])])),default:g((()=>[u(w,{"show-header":!1,data:a.todoList,style:{width:"100%"}},{default:g((()=>[u(m,{width:"40"},{default:g((t=>[u(y,{modelValue:t.row.status,"onUpdate:modelValue":e=>t.row.status=e},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),u(m,null,{default:g((t=>[h("div",{class:v(["todo-item",{"todo-item-del":t.row.status}])},f(t.row.title),3)])),_:1}),u(m,{width:"60"},{default:g((()=>[X])),_:1})])),_:1},8,["data"])])),_:1})])),_:1})])),_:1}),u(x,{gutter:20},{default:g((()=>[u(p,{span:12},{default:g((()=>[u(o,{shadow:"hover"},{default:g((()=>[u(P,{ref:"bar",class:"schart",canvasId:"bar",options:a.options},null,8,["options"])])),_:1})])),_:1}),u(p,{span:12},{default:g((()=>[u(o,{shadow:"hover"},{default:g((()=>[u(P,{ref:"line",class:"schart",canvasId:"line",options:a.options2},null,8,["options"])])),_:1})])),_:1})])),_:1})])}],["__scopeId","data-v-77384197"]]);export{G as default};