(this.webpackJsonpsea_battle=this.webpackJsonpsea_battle||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){e.exports=n(29)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(10),r=n(1),l=n(0),c=n.n(l),i=n(9),o=n(12),s=(n(20),n(21),function(e){var t=e.userName;return c.a.createElement("div",{id:"App"},c.a.createElement(C,{name:t}),c.a.createElement(_,null))}),u=(n(22),{fieldSize:10,ships:{battleship:{size:4,amount:1,units:[],destroyed:[]},cruiser:{size:3,amount:2,units:[],destroyed:[]},destroyer:{size:2,amount:3,units:[],destroyed:[]},boat:{size:1,amount:4,units:[],destroyed:[]}},safeValue:5,timeAIIsWaiting:500,timerStart:30,defaultHeaders:{"Content-Type":"application/json; charset=utf-8"}}),f=function(e){var t=e.field,n=e.mode,a=e.playFor,r=e.handleClick;return c.a.createElement("div",{className:"field"},t.map((function(e,t){return c.a.createElement("div",{className:"row",key:t},e.map((function(e,l){var i=function(e){var t="cell",r="empty";return parseInt(e)===-1*u.safeValue?r="missed":parseInt(e)<0&&(r="killed"),"prepare"===n&&(t+=" big_cell"),"string"===typeof e?t+=" safe":"play"===n&&"AI"===a||"prepare"===n&&"player"===a?e&&Math.abs(e)!==u.safeValue||(t+=" empty"):"killed"!==r&&(t+=" empty"),{idName:r,className:t}}(e),o=i.idName,s=i.className;return c.a.createElement("div",{className:s,onClick:function(){return r(t,l,a)},key:l},c.a.createElement("div",{id:o},"killed"===o&&c.a.createElement("img",{src:"./img/fire.png",alt:"killed"})))})))})))},m=n(14),d=n(2),p=n.n(d),h=(n(25),function(e,t,n){var a=[e],r=[{futureShip:e.y-n,offset:{y:-1,x:0}},{futureShip:e.x+n,offset:{y:0,x:1}},{futureShip:e.y+n,offset:{y:1,x:0}},{futureShip:e.x-n,offset:{y:0,x:-1}}],l=function(r){var l=r.futureShip,c=r.offset;if(0<=l&&l<u.fieldSize){for(var i=[],o=n;o;)i.push(t[e.y+o*c.y][e.x+o*c.x]),o--;i.every((function(e){return!e}))&&i.forEach((function(t,n){return a.push(new S(e.y+(n+1)*c.y,e.x+(n+1)*c.x))}))}};if(n)do{var c=p.a.random(r.length-1);l(r[c]),1===a.length&&r.splice(c,1)}while(1===a.length&&r.length);return a}),b=function(e,t){var n=w(e),a=[];do{var r=n[p.a.random(n.length-1)];a=h(r,e,t-1)}while(a.length!==t);return a.forEach((function(n){return e[n.y][n.x]=t})),v(e,a),{coords:a,renderedField:e}},v=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=u.safeValue,r=u.fieldSize,l=[-1,0,1];t.forEach((function(t){l.forEach((function(c){var i=t.y+c;l.forEach((function(l){var c=t.x+l;0<=i&&i<r&&0<=c&&c<r&&(n&&Math.abs(e[i][c])===u.safeValue||!e[i][c])&&(e[i][c]=n?String(e[i][c]):a)}))}))}))},g=function(e,t,n){var a=n.ship||{startPoint:null,endPoint:null},r=a.startPoint,l=a.endPoint,c={row:null,cell:null},i={startPoint:null,endPoint:null},o=function(e,t){return 0<=e&&e<u.fieldSize&&0<=t&&t<u.fieldSize},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=l.row-r.row,a=l.cell-r.cell,c=t?-1:1;return{row:n?e.row+c*(n/Math.abs(n)):e.row,cell:a?e.cell+c*(a/Math.abs(a)):e.cell}},f=function(){var t={tailRow:null,tailCell:null},n=[{offset:{row:-1,cell:0}},{offset:{row:0,cell:1}},{offset:{row:1,cell:0}},{offset:{row:0,cell:-1}}].filter((function(t){return o(r.row+t.offset.row,r.cell+t.offset.cell)&&!e[r.row+t.offset.row][r.cell+t.offset.cell]}));if(r.row-l.row&&r.cell-l.cell){var a=s(r),c=n.findIndex((function(e){return e.offset.row===a.row-r.row&&e.offset.cell===a.cell-r.cell}));-1!==c&&(t.tailRow=r.row+n[c].offset.row,t.tailCell=r.cell+n[c].offset.cell)}if(null===t.tailCell){var i=n[p.a.random(n.length-1)].offset;t.tailRow=r.row+i.row,t.tailCell=r.cell+i.cell}return t};if(!r||e[r.row][r.cell]===-1*u.safeValue||t){var m=function(){var t={},n=0,a=w(e);do{t=a[p.a.random(a.length-1)],n=+e[t.y][t.x]}while(n<0||5===n||"0"===e[t.y][t.x]);return{headRow:t.y,headCell:t.x}}(),d=m.headRow,h=m.headCell;c.row=d,c.cell=h,i.startPoint=j(c),i.endPoint=j(c)}else if(!l||r.row===l.row&&r.cell===l.cell||e[l.row][l.cell]===-1*u.safeValue){var b=f(),v=b.tailRow,g=b.tailCell;c.row=v,c.cell=g,i.startPoint=r,i.endPoint=j(c)}else{var y=s(l),O=y.row,E=y.cell;if(!o(O,E)||Math.abs(+e[O][E])===u.safeValue){var S=f();O=S.tailRow,E=S.tailCell}c.row=O,c.cell=E,i.startPoint=r,i.endPoint=j(c)}return{rowAI:c.row,cellAI:c.cell,ship:i}},y=new Array(u.fieldSize).fill(new Array(u.fieldSize).fill(0)),O=n(13),j=function(e){var t={};return e instanceof Array?t=e.map((function(e){return Object(O.a)(e)})):e instanceof Object&&(t=JSON.parse(JSON.stringify(e))),t},E=function(e,t,n){var a=-1*(+e[t][n]?+e[t][n]:u.safeValue);return e[t][n]="string"===typeof e[t][n]?String(a):a,e[t][n]},w=function(e){return e.flat().map((function(e,t){if(!e)return new S(Math.floor(t/u.fieldSize),t%u.fieldSize)})).filter((function(e){return e instanceof S}))};var S=function(e,t){this.x=t,this.y=e},N=function(e){return Object.fromEntries(Object.entries(j(u.ships)).map((function(t){var n=Object(r.a)(t,2),a=n[0],l=n[1];return p.a.times(l.amount,(function(){var t=b(e,l.size),n=t.coords,a=t.renderedField;l.units.push(n),e=a})),l.destroyed=new Array(l.amount).fill(0),[a,l]})))},x=function(e,t,n){var a=null;return Object.entries(e).forEach((function(e){var l=Object(r.a)(e,2),c=(l[0],l[1]),i=c.units.findIndex((function(e){return!!e.filter((function(e){return e.y===t&&e.x===n})).length}));-1!==i&&++c.destroyed[i]===c.size&&(a=c.units[i])})),a},C=function(){var e=Object(l.useState)("prepare"),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(l.useState)("false"),o=Object(r.a)(i,2),s=o[0],d=o[1],p=Object(l.useState)(j(y)),h=Object(r.a)(p,2),b=h[0],O=h[1],w=Object(l.useState)(j(y)),S=Object(r.a)(w,2),C=S[0],I=S[1],A=Object(l.useState)(j(u.ships)),M=Object(r.a)(A,2),z=M[0],P=M[1],V=Object(l.useState)(j(y)),F=Object(r.a)(V,2),_=F[0],R=F[1],T=Object(l.useState)(j(u.ships)),J=Object(r.a)(T,2),B=J[0],H=J[1],D=Object(l.useState)({}),W=Object(r.a)(D,2),q=W[0],G=W[1],K=Object(l.useState)(!1),L=Object(r.a)(K,2),Q=L[0],U=L[1],X=Object(l.useState)({status:!1,person:""}),Y=Object(r.a)(X,2),Z=Y[0],$=Y[1],ee=Object(l.useState)(!0),te=Object(r.a)(ee,2),ne=te[0],ae=te[1],re=Object(l.useState)(0),le=Object(r.a)(re,2),ce=(le[0],le[1]);function ie(e,t,a){if("play"===n&&"player"===a&&C[e][t]>=0&&!Q&&ne){var r=j(C);if(E(r,e,t),+r[e][t]!==-1*u.safeValue){var l=x(z,e,t);l&&(v(r,l,!0),oe("person",r)),I(r)}else{I(r);var c=j(_),i=j(b),o=q,s=0,f=!1,d=!1,p=function(){O(i),R(c),G(o)},h=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise((function(t,n){+s===-1*u.safeValue||d?n("finished"):(e&&p(),U(!0),setTimeout((function(){U(!1),t(g(j(i),f,o))}),u.timeAIIsWaiting))}))};!function e(t){t.then((function(t){var n=t.rowAI,a=t.cellAI,r=Object(m.a)(t,["rowAI","cellAI"]);f=!1,o=r,i[n][a]=s=E(c,n,a);var l=x(B,n,a);l&&(f=!0,v(c,l,!0),v(i,l,!0),d=oe("AI",c)),e(h(!0))}),(function(e){p()}))}(h())}}}Object(l.useEffect)((function(){if("prepare"===n||s){var e=j(y),t=j(y);P(N(e)),I(e),H(N(t)),R(t),O(j(y)),G({}),d(!1)}}),[n,s]),Object(l.useEffect)((function(){Z.status&&("person"===Z.person?alert("\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c! \u0412\u044b \u043f\u043e\u0431\u0435\u0434\u0438\u043b\u0438!"):alert("\u042d\u0442\u043e \u043f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435...\u0423\u0432\u044b :("),a("prepare"),ae(!1),$({status:!1,person:""}))}),[Z]);var oe=function(e,t){if(function(e){return!e.filter((function(e){return!!e.filter((function(e){return+e>0&&+e!==u.safeValue})).length})).length}(t)){var n="person";return"AI"===e&&(n="AI"),$({status:!0,person:n}),!0}return!1};return c.a.createElement("div",{id:"game"},"play"===n&&c.a.createElement(k,{action:ne,changeStopTime:function(e){return ce(e)}}),c.a.createElement("div",{id:"fields"},c.a.createElement(f,{playFor:"prepare"===n?"player":"AI",field:_,mode:n,handleClick:ie}),"play"===n&&c.a.createElement(f,{playFor:"player",field:C,mode:n,handleClick:ie})),c.a.createElement("div",{className:"button_group"},c.a.createElement("img",{src:"./img/".concat("prepare"===n?"power-button":"refresh",".png"),alt:"control",onClick:function(){"prepare"===n?(a("play"),ae(!0)):(ae(!1),a("prepare"))}}),"prepare"===n?c.a.createElement("img",{src:"./img/loop.png",alt:"refresh",onClick:function(){return d(!0)}}):c.a.createElement("img",{src:"./img/".concat(ne?"pause":"play",".png"),alt:"timer",onClick:function(){return ae((function(e){return!e}))}})))},k=(n(26),function(e){var t=e.action,n=e.changeStopTime,a=Object(l.useState)(0),i=Object(r.a)(a,2),o=i[0],s=i[1],u=Object(l.useState)(null),f=Object(r.a)(u,2),m=f[0],d=f[1],p=Object(l.useState)(null),h=Object(r.a)(p,2),b=h[0],v=h[1],g=Object(l.useState)(null),y=Object(r.a)(g,2),O=y[0],j=y[1],E=Object(l.useState)(null),w=Object(r.a)(E,2),S=w[0],N=w[1];return Object(l.useEffect)((function(){return t?d(setInterval((function(){s((function(e){return e+1}))}),1e3)):clearInterval(m)}),[t]),Object(l.useEffect)((function(){return n(o)})),Object(l.useEffect)((function(){var e,t,n;e=Math.floor(o/3600),t=Math.floor((o-3600*e)/60),n=o-(3600*e+60*t),v(String(e).padStart(2,"0")),j(String(t).padStart(2,"0")),N(String(n).padStart(2,"0"))}),[o]),c.a.createElement("div",{id:"timer"},c.a.createElement("strong",null,b," : ",O," : ",S))}),I=(n(27),document.getElementById("id01"));window.onclick=function(e){e.target===I&&(I.style.display="none")};var A=function(e){var t=e.logIn,n=Object(l.useState)(""),o=Object(r.a)(n,2),s=o[0],f=o[1];return c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return document.getElementById("id01").style.display="block"},className:"ENT"},"\u0418\u0433\u0440\u0430\u0442\u044c \xab\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0411\u043e\u0439\xbb"),c.a.createElement("div",{id:"id01",className:"modal"},c.a.createElement("form",{className:"modal-content animate",onSubmit:function(e){e.preventDefault(),fetch("/api/users",{method:"post",headers:Object(a.a)({},u.defaultHeaders),body:JSON.stringify({name:s})}).then((function(e){if(200===e.status){console.log("entered!",e);var n=(new i.a).get("sid");if(console.log(n),!n)throw new Error("\u0427\u0442\u043e \u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a, \u0441\u0435\u0440\u0432\u0435\u0440 \u0432\u0430\u0441 \u043d\u0435 \u043f\u0443\u0441\u043a\u0430\u0435\u0442 :(");t(s,n)}throw new Error(e.statusText)})).catch((function(e){return alert(e.message)}))}},c.a.createElement("div",{className:"imgcontainer"},c.a.createElement("span",{onClick:function(){return document.getElementById("id01").style.display="none"},className:"close",title:"Close Modal"},"\xd7"),c.a.createElement("img",{src:"https://thumbs.gfycat.com/FrankFreeAmericankestrel-size_restricted.gif",alt:"Avatar",className:"avatar"})),c.a.createElement("div",{className:"container"},c.a.createElement("label",{htmlFor:"uname",style:{fontSize:"2vh"}},c.a.createElement("b",null,"\u041f\u0440\u0438\u0432\u0435\u0442, \u044f Smart, \u0430 \u0442\u044b...")),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("input",{className:"form-row",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",name:"uname",autoComplete:"off",value:s,onChange:function(e){return f(e.target.value)},required:!0}),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("button",{type:"submit",className:"button1"},"\u0418\u0413\u0420\u0410\u0422\u042c")))))},M=n(3),z=n(4),P=n(6),V=n(5),F=n(7);n(28);var _=function(e){function t(){var e,n;Object(M.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(P.a)(this,(e=Object(V.a)(t)).call.apply(e,[this].concat(r)))).state={messages:[],member:{username:"name",color:"rgba("+p.a.random(255)+", "+p.a.random(255)+", "+p.a.random(255)+", 0.8)"}},n.onSendMessage=function(e){var t=n.state.messages,a=n.state.member;t.push({member:a,text:e}),n.setState({messages:t})},n}return Object(F.a)(t,e),Object(z.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"Chat"},c.a.createElement("div",{className:"Chat-header"},c.a.createElement("h1",null,"\u041e\u0431\u0449\u0438\u0439 \u0447\u0430\u0442")),c.a.createElement(T,{messages:this.state.messages,currentMember:this.state.member}),c.a.createElement(R,{onSendMessage:this.onSendMessage}))}}]),t}(l.Component),R=function(e){function t(){var e,n;Object(M.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(P.a)(this,(e=Object(V.a)(t)).call.apply(e,[this].concat(r)))).state={text:""},n}return Object(F.a)(t,e),Object(z.a)(t,[{key:"onChange",value:function(e){this.setState({text:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault(),this.props.onSendMessage(this.state.text),this.setState({text:""})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"Input"},c.a.createElement("form",{onSubmit:function(t){return e.onSubmit(t)},className:"chat_form"},c.a.createElement("input",{className:"chat_input",onChange:function(t){return e.onChange(t)},value:this.state.text,type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"}),c.a.createElement("button",{className:"chat_button"},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")))}}]),t}(l.Component);var T=function(e){function t(){return Object(M.a)(this,t),Object(P.a)(this,Object(V.a)(t).apply(this,arguments))}return Object(F.a)(t,e),Object(z.a)(t,[{key:"render",value:function(){var e=this,t=this.props.messages;return c.a.createElement("ul",{className:"Messages-list"},t.map((function(t){return e.renderMessage(t)})))}},{key:"renderMessage",value:function(e){var t=e.member,n=e.text,a=this.props.currentMember,r=t.id===a.id,l=r?"Messages-message currentMember":"Messages-message";return c.a.createElement("li",{className:l},c.a.createElement("div",{className:"Message-content"},!r&&c.a.createElement("div",{className:"username"},t.username),c.a.createElement("div",{className:"text",style:{backgroundColor:a.color}},n)))}}]),t}(l.Component),J=new i.a;Object(o.render)(c.a.createElement((function(){var e=Object(l.useState)(""),t=Object(r.a)(e,2),n=t[0],i=t[1],o=Object(l.useState)(J.get("sid")),f=Object(r.a)(o,2),m=f[0],d=f[1];Object(l.useEffect)((function(){m&&fetch("/api/users",{headers:Object(a.a)({},u.defaultHeaders,{Cookie:"sid="+m})}).then((function(e){if(200===e.status)return e.json();throw new Error(e.statusText)})).then((function(e){console.log(e),i("blabla")})).catch((function(e){return alert("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.message))}))}),[]);return m?c.a.createElement(s,{userName:n}):c.a.createElement(A,{logIn:function(e,t){i(e),d(t)}})}),null),document.getElementById("root"))}],[[15,1,2]]]);
//# sourceMappingURL=main.965dc164.chunk.js.map