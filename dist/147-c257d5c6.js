"use strict";(self.webpackChunkoil_hack_2024=self.webpackChunkoil_hack_2024||[]).push([[147],{7147:(e,t,a)=>{a.r(t),a.d(t,{default:()=>L});var n=a(5861),r=a(885),l=a(4687),s=a.n(l),i=a(1762),o=a(8502),c=a(3329),d=a(7294),u=a(6466),p=a(47),v=a(3379),f=a.n(v),m=a(7795),x=a.n(m),b=a(569),g=a.n(b),h=a(3565),k=a.n(h),y=a(9216),j=a.n(y),Z=a(4589),w=a.n(Z),C=a(8409),N={};N.styleTagTransform=w(),N.setAttributes=k(),N.insert=g().bind(null,"head"),N.domAPI=x(),N.insertStyleElement=j(),f()(C.Z,N);const S=C.Z&&C.Z.locals?C.Z.locals:void 0;var A=a(5893),F=(0,d.memo)((function(e){var t=e.className,a=e.file,n=e.setFile,r=(0,d.useCallback)((function(e){for(var t=["б","Кб","Мб","Гб","Тб"],a=0,n=e.size;n>1024&&a<t.length-1;)n/=1024,a+=1;return"".concat(n.toFixed(2)," ").concat(t[a])}),[]),l=(0,d.useCallback)((function(e){var t;null!==(t=e.target)&&void 0!==t&&null!==(t=t.files)&&void 0!==t&&t.length&&n(e.target.files[0])}),[n]);return(0,A.jsxs)("label",{htmlFor:"file_upload",className:S.button,children:[null!=a&&a.size?(0,A.jsx)(u.xv,{titleClassname:S.title,title:a.name,text:r(a),align:"center"}):(0,A.jsx)(u.xv,{align:"center",titleClassname:S.title,title:"Выберите файл"}),(0,A.jsx)("input",{id:"file_upload",style:{display:"none"},onChange:l,type:"file",accept:".csv",className:(0,o.A)(S.FileUploader,{},[t])})]})})),_=a(9400),T=a(3837),W=a(1637),z={};z.styleTagTransform=w(),z.setAttributes=k(),z.insert=g().bind(null,"head"),z.domAPI=x(),z.insertStyleElement=j(),f()(W.Z,z);const I=W.Z&&W.Z.locals?W.Z.locals:void 0,L=function(){var e=(0,d.useState)(),t=(0,r.Z)(e,2),a=t[0],l=t[1],v=(0,d.useState)(""),f=(0,r.Z)(v,2),m=f[0],x=f[1],b=(0,d.useState)(""),g=(0,r.Z)(b,2),h=g[0],k=g[1],y=(0,d.useState)(!1),j=(0,r.Z)(y,2),Z=j[0],w=j[1],C=(0,d.useCallback)((function(e){k(""),l(e)}),[]),N=(0,d.useCallback)(function(){var e=(0,n.Z)(s().mark((function e(t){var n,r,i,o;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),w(!0),e.prev=2,!a){e.next=10;break}return(n=new FormData).append("file",a),e.next=8,T.W.post("/api/calculate",n);case 8:r=e.sent,x(r.data);case 10:e.next=17;break;case 12:e.prev=12,e.t0=e.catch(2),o=e.t0,x(""),k((null===(i=o.response)||void 0===i?void 0:i.data.message)||"Произошла ошибка запроса на сервер");case 17:w(!1),l(void 0);case 19:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(t){return e.apply(this,arguments)}}(),[a]);return(0,A.jsxs)(i.T,{style:{background:"url(/static/bgImg.svg)"},className:(0,o.A)(I.MainPage,{},[]),children:[Z&&(0,A.jsx)("div",{className:I.overlay,children:(0,A.jsx)(p.a,{})}),(0,A.jsxs)(c.g,{gap:"32",maxW:!0,justify:"center",align:"center",children:[(0,A.jsx)("img",{className:I.mainLogo,src:"/static/mainLogo.svg",alt:"Картинка"}),(0,A.jsx)("form",{onSubmit:N,style:{width:"100%"},children:(0,A.jsxs)(c.g,{gap:"32",align:"center",maxW:!0,children:[(0,A.jsx)(F,{file:a,setFile:C}),a&&(0,A.jsx)(_.z,{type:"submit",children:"Отправить на обработку"})]})}),m&&(0,A.jsx)("a",{className:I.link,download:!0,href:"/media/".concat(m),children:"Скачать результат"}),h&&(0,A.jsx)(u.xv,{className:I.textWrapper,title:h,size:"large",variant:"error"})]})]})}},1637:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(8081),r=a.n(n),l=a(3645),s=a.n(l)()(r());s.push([e.id,".d721c{width:450px}.dc3d4{padding:5px 20px;border-radius:12px;background:#fff}.bbd4f{background:rgba(0,0,0,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(5px);position:absolute;top:0;bottom:0;right:0;left:0}.c960e:link,.c960e:visited{cursor:pointer;padding:10px 20px;border:none;border-radius:5px;color:var(--inverted-primary-color);background:var(--inverted-bg-color);font:var(--font-m);transition:200ms;text-decoration:none;outline:none}",""]),s.locals={mainLogo:"d721c",textWrapper:"dc3d4",overlay:"bbd4f",link:"c960e"};const i=s},8409:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(8081),r=a.n(n),l=a(3645),s=a.n(l)()(r());s.push([e.id,".dc445{cursor:pointer;padding:40px 60px;border-radius:12px;color:var(--inverted-primary-color);background:var(--bg-color);font:var(--font-m);transition:200ms;min-width:50%;outline:6px dotted var(--blue-500)}.dc445:hover{background:var(--inverted-bg-color)}.f4735{color:var(--blue-700) !important}",""]),s.locals={button:"dc445",title:"f4735"};const i=s}}]);