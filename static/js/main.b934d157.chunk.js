(this.webpackJsonpsea_battle=this.webpackJsonpsea_battle||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){e.exports=n(29)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(3),r=n(1),l=n(0),c=n.n(l),s=n(10),o=(n(18),n(19),function(e){var t=e.logout,n=e.userName,a=Object(l.useState)(!1),s=Object(r.a)(a,2),o=s[0],i=s[1],u=function(e){i((function(e){return!e}))};return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"control_buttons"},c.a.createElement("img",{className:"button__left_control",src:"./img/logout.png",alt:"logout",onClick:function(){return t()}}),c.a.createElement("img",{className:"button__left_control",src:"./img/records.png",alt:"records",onClick:function(e){return u()}})),c.a.createElement(D,{show:o,onClose:u},c.a.createElement(B,null)),c.a.createElement(k,{name:n}),c.a.createElement(H,{name:n}))}),i=(n(20),{fieldSize:10,ships:{battleship:{size:4,amount:1,units:[],destroyed:[]},cruiser:{size:3,amount:2,units:[],destroyed:[]},destroyer:{size:2,amount:3,units:[],destroyed:[]},boat:{size:1,amount:4,units:[],destroyed:[]}},safeValue:5,timeAIIsWaiting:500,timerStart:30,defaultHeaders:{"Content-Type":"application/json; charset=utf-8"},timeLoadChatMessages:1e3,timeLoadRecords:1e3}),u=function(e){var t=e.field,n=e.mode,a=e.playFor,r=e.handleClick;return c.a.createElement("div",{className:"field"},t.map((function(e,t){return c.a.createElement("div",{className:"row",key:t},e.map((function(e,l){var s=function(e){var t="cell",r="empty";return parseInt(e)===-1*i.safeValue?r="missed":parseInt(e)<0&&(r="killed"),"prepare"===n&&(t+=" big_cell"),"string"===typeof e?t+=" safe":"play"===n&&"AI"===a||"prepare"===n&&"player"===a?e&&Math.abs(e)!==i.safeValue||(t+=" empty"):"killed"!==r&&(t+=" empty"),{idName:r,className:t}}(e),o=s.idName,u=s.className;return c.a.createElement("div",{className:u,onClick:function(){return r(t,l,a)},key:l},c.a.createElement("div",{id:o},"killed"===o&&c.a.createElement("img",{src:"./img/fire.png",alt:"killed"})))})))})))},f=n(12),m=n(2),d=n.n(m),h=(n(23),function(e,t,n){var a=[e],r=[{futureShip:e.y-n,offset:{y:-1,x:0}},{futureShip:e.x+n,offset:{y:0,x:1}},{futureShip:e.y+n,offset:{y:1,x:0}},{futureShip:e.x-n,offset:{y:0,x:-1}}],l=function(r){var l=r.futureShip,c=r.offset;if(0<=l&&l<i.fieldSize){for(var s=[],o=n;o;)s.push(t[e.y+o*c.y][e.x+o*c.x]),o--;s.every((function(e){return!e}))&&s.forEach((function(t,n){return a.push(new w(e.y+(n+1)*c.y,e.x+(n+1)*c.x))}))}};if(n)do{var c=d.a.random(r.length-1);l(r[c]),1===a.length&&r.splice(c,1)}while(1===a.length&&r.length);return a}),p=function(e,t){var n=j(e),a=[];do{var r=n[d.a.random(n.length-1)];a=h(r,e,t-1)}while(a.length!==t);return a.forEach((function(n){return e[n.y][n.x]=t})),g(e,a),{coords:a,renderedField:e}},g=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=i.safeValue,r=i.fieldSize,l=[-1,0,1];t.forEach((function(t){l.forEach((function(c){var s=t.y+c;l.forEach((function(l){var c=t.x+l;0<=s&&s<r&&0<=c&&c<r&&(n&&Math.abs(e[s][c])===i.safeValue||!e[s][c])&&(e[s][c]=n?String(e[s][c]):a)}))}))}))},b=function(e,t,n){var a=n.ship||{startPoint:null,endPoint:null},r=a.startPoint,l=a.endPoint,c={row:null,cell:null},s={startPoint:null,endPoint:null},o=function(e,t){return 0<=e&&e<i.fieldSize&&0<=t&&t<i.fieldSize},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=l.row-r.row,a=l.cell-r.cell,c=t?-1:1;return{row:n?e.row+c*(n/Math.abs(n)):e.row,cell:a?e.cell+c*(a/Math.abs(a)):e.cell}},f=function(){var t={tailRow:null,tailCell:null},n=[{offset:{row:-1,cell:0}},{offset:{row:0,cell:1}},{offset:{row:1,cell:0}},{offset:{row:0,cell:-1}}].filter((function(t){return o(r.row+t.offset.row,r.cell+t.offset.cell)&&!e[r.row+t.offset.row][r.cell+t.offset.cell]}));if(r.row-l.row&&r.cell-l.cell){var a=u(r),c=n.findIndex((function(e){return e.offset.row===a.row-r.row&&e.offset.cell===a.cell-r.cell}));-1!==c&&(t.tailRow=r.row+n[c].offset.row,t.tailCell=r.cell+n[c].offset.cell)}if(null===t.tailCell){var s=n[d.a.random(n.length-1)].offset;t.tailRow=r.row+s.row,t.tailCell=r.cell+s.cell}return t};if(!r||e[r.row][r.cell]===-1*i.safeValue||t){var m=function(){var t={},n=0,a=j(e);do{t=a[d.a.random(a.length-1)],n=+e[t.y][t.x]}while(n<0||5===n||"0"===e[t.y][t.x]);return{headRow:t.y,headCell:t.x}}(),h=m.headRow,p=m.headCell;c.row=h,c.cell=p,s.startPoint=E(c),s.endPoint=E(c)}else if(!l||r.row===l.row&&r.cell===l.cell||e[l.row][l.cell]===-1*i.safeValue){var g=f(),b=g.tailRow,v=g.tailCell;c.row=b,c.cell=v,s.startPoint=r,s.endPoint=E(c)}else{var y=u(l),O=y.row,w=y.cell;if(!o(O,w)||Math.abs(+e[O][w])===i.safeValue){var S=f();O=S.tailRow,w=S.tailCell}c.row=O,c.cell=w,s.startPoint=r,s.endPoint=E(c)}return{rowAI:c.row,cellAI:c.cell,ship:s}},v=new Array(i.fieldSize).fill(new Array(i.fieldSize).fill(0)),y=n(11),E=function(e){var t={};return e instanceof Array?t=e.map((function(e){return Object(y.a)(e)})):e instanceof Object&&(t=JSON.parse(JSON.stringify(e))),t},O=function(e,t,n){var a=-1*(+e[t][n]?+e[t][n]:i.safeValue);return e[t][n]="string"===typeof e[t][n]?String(a):a,e[t][n]},j=function(e){return e.flat().map((function(e,t){if(!e)return new w(Math.floor(t/i.fieldSize),t%i.fieldSize)})).filter((function(e){return e instanceof w}))};var w=function(e,t){this.x=t,this.y=e},S=function(e){var t=new Date(e),n=t.getFullYear(),a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],r=t.getDate(),l=t.getHours(),c="0"+t.getMinutes(),s="0"+t.getSeconds();return a+"-"+r+"-"+n+" "+l+":"+c.substr(-2)+":"+s.substr(-2)},N=function(e){var t,n,a;return a=e-(3600*(t=Math.floor(e/3600))+60*(n=Math.floor((e-3600*t)/60))),{hours:String(t).padStart(2,"0"),minutes:String(n).padStart(2,"0"),seconds:String(a).padStart(2,"0")}},x=function(e){return Object.fromEntries(Object.entries(E(i.ships)).map((function(t){var n=Object(r.a)(t,2),a=n[0],l=n[1];return d.a.times(l.amount,(function(){var t=p(e,l.size),n=t.coords,a=t.renderedField;l.units.push(n),e=a})),l.destroyed=new Array(l.amount).fill(0),[a,l]})))},C=function(e,t,n){var a=null,l=null,c=null;return Object.entries(e).forEach((function(e){var s=Object(r.a)(e,2),o=s[0],i=s[1],u=i.units.findIndex((function(e){return!!e.filter((function(e){return e.y===t&&e.x===n})).length}));-1!==u&&++i.destroyed[u]===i.size&&(a=i.units[u],l=o,c=u)})),{destroyedShip:a,shipType:l,destroyedIndex:c}},k=function(e){var t=e.name,n=Object(l.useState)(""),s=Object(r.a)(n,2),o=s[0],m=s[1],d=Object(l.useState)("prepare"),h=Object(r.a)(d,2),p=h[0],y=h[1],j=Object(l.useState)("false"),w=Object(r.a)(j,2),S=w[0],N=w[1],k=Object(l.useState)(E(v)),_=Object(r.a)(k,2),M=_[0],A=_[1],T=Object(l.useState)(E(v)),z=Object(r.a)(T,2),P=z[0],V=z[1],H=Object(l.useState)(E(i.ships)),F=Object(r.a)(H,2),J=F[0],D=F[1],B=Object(l.useState)(E(v)),L=Object(r.a)(B,2),W=L[0],q=L[1],G=Object(l.useState)(E(i.ships)),U=Object(r.a)(G,2),Y=U[0],K=U[1],Q=Object(l.useState)({}),X=Object(r.a)(Q,2),Z=X[0],$=X[1],ee=Object(l.useState)(!1),te=Object(r.a)(ee,2),ne=te[0],ae=te[1],re=Object(l.useState)({status:!1,person:""}),le=Object(r.a)(re,2),ce=le[0],se=le[1],oe=Object(l.useState)(!0),ie=Object(r.a)(oe,2),ue=ie[0],fe=ie[1];Object(l.useEffect)((function(){if("prepare"===p||S){var e=E(v),t=E(v);D(x(e)),V(e),K(x(t)),q(t),A(E(v)),$({}),N(!1)}}),[p,S]),Object(l.useEffect)((function(){ce.status&&("person"===ce.person?alert("\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c! \u0412\u044b \u043f\u043e\u0431\u0435\u0434\u0438\u043b\u0438!"):alert("\u042d\u0442\u043e \u043f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435...\u0423\u0432\u044b :("),y("prepare"),fe(!1),se({status:!1,person:""}),me())}));var me=function(){if(o){var e=P.flat().filter((function(e){return+e<0&&+e!==-1*i.safeValue})).length;fetch("/api/records/".concat(o),{method:"PATCH",headers:Object(a.a)({},i.defaultHeaders),body:JSON.stringify({score:e})}).then((function(e){if(200!==e.status)throw new Error(e.statusText);console.log("Sent score data successfully")})).catch((function(e){return console.log(e)}))}else console.log("Game ID \u043d\u0435 \u0437\u0430\u0434\u0430\u043d")};function de(e,t,n){if("play"===p&&"player"===n&&P[e][t]>=0&&!ne&&ue){var a=E(P);if(O(a,e,t),+a[e][t]!==-1*i.safeValue){var r=C(J,e,t),l=r.destroyedShip,c=r.shipType,s=r.destroyedIndex;if(l){var o=E(J);o[c].units.splice(s,1),D(o),g(a,l,!0),he("person",a)}V(a)}else{V(a);var u=E(W),m=E(M),d=Z,h=0,v=!1,y=!1,j=function(){A(m),q(u),$(d)},w=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise((function(t,n){+h===-1*i.safeValue||y?n("finished"):(e&&j(),ae(!0),setTimeout((function(){ae(!1),t(b(E(m),v,d))}),i.timeAIIsWaiting))}))};!function e(t){t.then((function(t){var n=t.rowAI,a=t.cellAI,r=Object(f.a)(t,["rowAI","cellAI"]);v=!1,d=r,m[n][a]=h=O(u,n,a);var l=C(Y,n,a),c=l.destroyedShip,s=l.shipType,o=l.destroyedIndex;if(c){v=!0;var i=E(Y);i[s].units.splice(o,1),K(i),g(u,c,!0),g(m,c,!0),y=he("AI",u)}e(w(!0))}),(function(e){j()}))}(w())}}}var he=function(e,t){if(function(e){return!e.filter((function(e){return!!e.filter((function(e){return+e>0&&+e!==i.safeValue})).length})).length}(t)){var n="person";return"AI"===e&&(n="AI"),se({status:!0,person:n}),!0}return!1};return c.a.createElement("div",{id:"game"},"play"===p&&c.a.createElement("div",{className:"game_header"},c.a.createElement(R,{fleet:Y,name:"Smart",player:"AI"}),c.a.createElement(I,{action:ue}),c.a.createElement(R,{fleet:J,name:t,player:"user"})),c.a.createElement("div",{id:"fields"},c.a.createElement(u,{playFor:"prepare"===p?"player":"AI",field:W,mode:p,handleClick:de}),"play"===p&&c.a.createElement(u,{playFor:"player",field:P,mode:p,handleClick:de})),c.a.createElement("div",{className:"button_group"},c.a.createElement("img",{className:"but__down",src:"./img/".concat("prepare"===p?"power-button":"refresh",".png"),alt:"control",onClick:function(){"prepare"===p?(y("play"),fe(!0),fetch("/api/records",{method:"POST",headers:Object(a.a)({},i.defaultHeaders),body:JSON.stringify({game:"\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0431\u043e\u0439"})}).then((function(e){if(200===e.status)return console.log("Successfully notify server about game start"),e.json();throw new Error(e.statusText)})).then((function(e){m(e.id)})).catch((function(e){return console.log(e)}))):(fe(!1),y("prepare"),me())}}),"prepare"===p?c.a.createElement("img",{className:"but__down",src:"./img/loop.png",alt:"refresh",onClick:function(){return N(!0)}}):c.a.createElement("img",{className:"but__down",src:"./img/".concat(ue?"pause":"play",".png"),alt:"timer",onClick:function(){ue&&me(),fe((function(e){return!e}))}})))},I=(n(24),function(e){var t=e.action,n=Object(l.useState)(0),a=Object(r.a)(n,2),s=a[0],o=a[1],i=Object(l.useState)(null),u=Object(r.a)(i,2),f=u[0],m=u[1],d=Object(l.useState)(null),h=Object(r.a)(d,2),p=h[0],g=h[1],b=Object(l.useState)(null),v=Object(r.a)(b,2),y=v[0],E=v[1],O=Object(l.useState)(null),j=Object(r.a)(O,2),w=j[0],S=j[1];return Object(l.useEffect)((function(){return t?m(setInterval((function(){o((function(e){return e+1}))}),1e3)):clearInterval(f)}),[t]),Object(l.useEffect)((function(){var e=N(s),t=e.hours,n=e.minutes,a=e.seconds;g(t),E(n),S(a)}),[s]),c.a.createElement("div",{id:"timer"},c.a.createElement("strong",null,p," : ",y," : ",w))}),_=(n(25),document.getElementById("id01"));window.onclick=function(e){e.target===_&&(_.style.display="none")};var M=function(e){var t=e.logIn,n=Object(l.useState)(""),a=Object(r.a)(n,2),s=a[0],o=a[1];return c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return document.getElementById("id01").style.display="block"},className:"ENT"},"\u0418\u0433\u0440\u0430\u0442\u044c \xab\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0411\u043e\u0439\xbb"),c.a.createElement("div",{id:"id01",className:"modal"},c.a.createElement("form",{className:"modal-content animate",onSubmit:function(e){e.preventDefault(),t(s)}},c.a.createElement("div",{className:"imgcontainer"},c.a.createElement("span",{onClick:function(){return document.getElementById("id01").style.display="none"},className:"close",title:"Close Modal"},"\xd7"),c.a.createElement("img",{src:"https://thumbs.gfycat.com/FrankFreeAmericankestrel-size_restricted.gif",alt:"Avatar",className:"avatar"})),c.a.createElement("div",{className:"container"},c.a.createElement("label",{htmlFor:"uname",style:{fontSize:"2vh"}},c.a.createElement("b",null,"\u041f\u0440\u0438\u0432\u0435\u0442, \u044f Smart, \u0430 \u0442\u044b...")),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("input",{className:"form-row",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",name:"uname",autoComplete:"off",value:s,onChange:function(e){return o(e.target.value)},required:!0}),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("button",{type:"submit",className:"button1"},"\u0418\u0413\u0420\u0410\u0422\u042c")))))},A=n(4),T=n(5),z=n(7),P=n(6),V=n(8);n(26);var H=function(e){function t(){var e,n;Object(A.a)(this,t);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(n=Object(z.a)(this,(e=Object(P.a)(t)).call.apply(e,[this].concat(l)))).state={messages:[],interval:null,color:null},n.onSendMessage=function(e){fetch("/api/messages",{method:"POST",headers:Object(a.a)({},i.defaultHeaders),body:JSON.stringify({text:e})}).then((function(e){if(200!==e.status)throw new Error(e.statusText);console.log("Successfully sent message to server"),n.loadMessages()})).catch((function(e){return console.log(e)}))},n}return Object(V.a)(t,e),Object(T.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({interval:setInterval((function(){return e.loadMessages()}),i.timeLoadChatMessages),color:"rgba("+d.a.random(255)+", "+d.a.random(255)+", "+d.a.random(255)+", 0.65)"})}},{key:"loadMessages",value:function(){var e=this,t=[];fetch("/api/messages",{headers:Object(a.a)({},i.defaultHeaders)}).then((function(e){if(200===e.status)return console.log("Successfully loaded messages"),e.json();throw new Error(e.statusText)})).then((function(n){n.forEach((function(e){var n=e.user,a=e.game,r=e.text,l=e.time,c=e.isMine;t.push({name:n,text:r,isMine:c,game:a,time:l})}));var a=document.getElementsByClassName("Message-content");a.scrollTop=a.scrollHeight,e.setState({messages:t})})).catch((function(e){return console.log(e)}))}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.interval)}},{key:"render",value:function(){return c.a.createElement("div",{className:"Chat"},c.a.createElement("div",{className:"Chat-header"},c.a.createElement("h1",null,"\u041e\u0431\u0449\u0438\u0439 \u0447\u0430\u0442")),c.a.createElement(J,{messages:this.state.messages,color:this.state.color}),c.a.createElement(F,{onSendMessage:this.onSendMessage}))}}]),t}(l.Component),F=function(e){function t(){var e,n;Object(A.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(z.a)(this,(e=Object(P.a)(t)).call.apply(e,[this].concat(r)))).state={text:""},n}return Object(V.a)(t,e),Object(T.a)(t,[{key:"onChange",value:function(e){this.setState({text:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault(),this.props.onSendMessage(this.state.text),this.setState({text:""})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"Input"},c.a.createElement("form",{onSubmit:function(t){return e.onSubmit(t)},className:"chat_form"},c.a.createElement("input",{className:"chat_input",onChange:function(t){return e.onChange(t)},value:this.state.text,type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"}),c.a.createElement("button",{className:"chat_button"},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")))}}]),t}(l.Component),J=function(e){function t(){return Object(A.a)(this,t),Object(z.a)(this,Object(P.a)(t).apply(this,arguments))}return Object(V.a)(t,e),Object(T.a)(t,[{key:"render",value:function(){var e=this,t=this.props.messages;return c.a.createElement("ul",{className:"Messages-list"},t.map((function(t){return e.renderMessage(t)})))}},{key:"renderMessage",value:function(e){var t=e.name,n=e.text,a=e.isMine,r=e.game,l=e.time,s=a,o=s?"Messages-message currentMember":"Messages-message";return c.a.createElement("li",{className:o},c.a.createElement("div",{className:"Message-content"},!s&&c.a.createElement("div",{className:"username"},c.a.createElement("strong",null,t,c.a.createElement("span",null,r&&" -> "),r)),c.a.createElement("div",{className:"text",style:{backgroundColor:this.props.color}},n),c.a.createElement("div",{className:"time"},S(l))))}}]),t}(l.Component),R=(n(27),function(e){var t=e.fleet,n=e.name,a=e.player,l="".concat("AI"===a?"flex-start":"flex-end");return c.a.createElement("div",{className:"info_ships"},c.a.createElement("div",{className:"name",style:{justifyContent:l}},n),c.a.createElement("div",{className:"ships"},Object.entries(t).map((function(e,t){var n=Object(r.a)(e,2),a=(n[0],n[1]);return c.a.createElement("div",{className:"ships__same_type",key:t,style:{justifyContent:l}},a.units.map((function(e,t){return c.a.createElement("div",{className:"ships__unit",key:t,style:{width:"".concat(15*e.length,"px")}})})))}))))}),D=(n(28),function(e){var t=e.onClose,n=e.show,a=e.children;return n?c.a.createElement("div",{className:"modal_records",id:"modal_rec"},c.a.createElement("h2",null,' \u0422\u043e\u043f \u0438\u0433\u0440\u043e\u043a\u043e\u0432 "\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0431\u043e\u0439"'),c.a.createElement("div",{className:"content_records"},a),c.a.createElement("div",{className:"actions_records"},c.a.createElement("button",{className:"toggle-button",onClick:function(){return t&&t(e);var e}},"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"))):null}),B=function(){var e=Object(l.useState)([]),t=Object(r.a)(e,2),n=t[0],s=t[1],o=Object(l.useState)(null),u=Object(r.a)(o,2),f=(u[0],u[1]);Object(l.useEffect)((function(){f(setInterval((function(){return m()}),i.timeLoadRecords))}),[]);var m=function(){fetch("/api/records",{headers:Object(a.a)({},i.defaultHeaders)}).then((function(e){if(200===e.status)return console.log("Successfully loaded records"),e.json();throw new Error(e.statusText)})).then((function(e){s(e.filter((function(e){return"\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0431\u043e\u0439"===e.game})))})).catch((function(e){return console.log(e)}))};return c.a.createElement("div",null,n.length?c.a.createElement("table",null,c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"record_header"},"\u0418\u0433\u0440\u043e\u043a"),c.a.createElement("th",{className:"record_header"},"\u041e\u0447\u043a\u0438"),c.a.createElement("th",{className:"record_header"},"\u0412\u0440\u0435\u043c\u044f")),n.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.user),c.a.createElement("td",null,e.score),c.a.createElement("td",null,function(e){var t=N(e),n=t.hours,a=t.minutes,r=t.seconds;return"".concat(n," : ").concat(a," : ").concat(r)}(e.time)))})))):c.a.createElement("p",null,"\u041d\u0438\u043a\u0442\u043e \u0435\u0449\u0435 \u043d\u0435 \u0440\u0435\u0448\u0438\u043b\u0441\u044f \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0441\u0432\u043e\u0438 \u0441\u0438\u043b\u044b."))};Object(s.render)(c.a.createElement((function(){var e=Object(l.useState)(""),t=Object(r.a)(e,2),n=t[0],s=t[1];Object(l.useEffect)((function(){fetch("/api/users",{headers:Object(a.a)({},i.defaultHeaders)}).then((function(e){if(200===e.status)return e.json();throw new Error(e.statusText)})).then((function(e){console.log(e),s("blabla")})).catch((function(e){return console.log("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.message))}))}),[]);return n?c.a.createElement(o,{logout:function(){fetch("/api/users",{method:"DELETE",headers:Object(a.a)({},i.defaultHeaders)}).then((function(e){if(200!==e.status)throw new Error(e.statusText);console.log("logout for ".concat(n," is successful")),s("")})).catch((function(e){return alert(e)}))},userName:n}):c.a.createElement(M,{logIn:function(e){s(e)}})}),null),document.getElementById("root"))}],[[13,1,2]]]);
//# sourceMappingURL=main.b934d157.chunk.js.map