(this.webpackJsonpsea_battle=this.webpackJsonpsea_battle||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){e.exports=n(28)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(3),r=n(1),l=n(0),s=n.n(l),o=n(10),c=(n(18),n(19),function(e){var t=e.logout,n=e.userName;return s.a.createElement("div",{id:"App"},s.a.createElement("img",{className:"logout",src:"./img/logout.png",alt:"logout",onClick:function(){return t()}}),s.a.createElement(k,{name:n}),s.a.createElement(V,{name:n}))}),i=(n(20),{fieldSize:10,ships:{battleship:{size:4,amount:1,units:[],destroyed:[]},cruiser:{size:3,amount:2,units:[],destroyed:[]},destroyer:{size:2,amount:3,units:[],destroyed:[]},boat:{size:1,amount:4,units:[],destroyed:[]}},safeValue:5,timeAIIsWaiting:500,timerStart:30,defaultHeaders:{"Content-Type":"application/json; charset=utf-8"},timeLoadChatMessages:2e3}),u=function(e){var t=e.field,n=e.mode,a=e.playFor,r=e.handleClick;return s.a.createElement("div",{className:"field"},t.map((function(e,t){return s.a.createElement("div",{className:"row",key:t},e.map((function(e,l){var o=function(e){var t="cell",r="empty";return parseInt(e)===-1*i.safeValue?r="missed":parseInt(e)<0&&(r="killed"),"prepare"===n&&(t+=" big_cell"),"string"===typeof e?t+=" safe":"play"===n&&"AI"===a||"prepare"===n&&"player"===a?e&&Math.abs(e)!==i.safeValue||(t+=" empty"):"killed"!==r&&(t+=" empty"),{idName:r,className:t}}(e),c=o.idName,u=o.className;return s.a.createElement("div",{className:u,onClick:function(){return r(t,l,a)},key:l},s.a.createElement("div",{id:c},"killed"===c&&s.a.createElement("img",{src:"./img/fire.png",alt:"killed"})))})))})))},f=n(12),m=n(2),d=n.n(m),h=(n(23),function(e,t,n){var a=[e],r=[{futureShip:e.y-n,offset:{y:-1,x:0}},{futureShip:e.x+n,offset:{y:0,x:1}},{futureShip:e.y+n,offset:{y:1,x:0}},{futureShip:e.x-n,offset:{y:0,x:-1}}],l=function(r){var l=r.futureShip,s=r.offset;if(0<=l&&l<i.fieldSize){for(var o=[],c=n;c;)o.push(t[e.y+c*s.y][e.x+c*s.x]),c--;o.every((function(e){return!e}))&&o.forEach((function(t,n){return a.push(new w(e.y+(n+1)*s.y,e.x+(n+1)*s.x))}))}};if(n)do{var s=d.a.random(r.length-1);l(r[s]),1===a.length&&r.splice(s,1)}while(1===a.length&&r.length);return a}),p=function(e,t){var n=O(e),a=[];do{var r=n[d.a.random(n.length-1)];a=h(r,e,t-1)}while(a.length!==t);return a.forEach((function(n){return e[n.y][n.x]=t})),g(e,a),{coords:a,renderedField:e}},g=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=i.safeValue,r=i.fieldSize,l=[-1,0,1];t.forEach((function(t){l.forEach((function(s){var o=t.y+s;l.forEach((function(l){var s=t.x+l;0<=o&&o<r&&0<=s&&s<r&&(n&&Math.abs(e[o][s])===i.safeValue||!e[o][s])&&(e[o][s]=n?String(e[o][s]):a)}))}))}))},v=function(e,t,n){var a=n.ship||{startPoint:null,endPoint:null},r=a.startPoint,l=a.endPoint,s={row:null,cell:null},o={startPoint:null,endPoint:null},c=function(e,t){return 0<=e&&e<i.fieldSize&&0<=t&&t<i.fieldSize},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=l.row-r.row,a=l.cell-r.cell,s=t?-1:1;return{row:n?e.row+s*(n/Math.abs(n)):e.row,cell:a?e.cell+s*(a/Math.abs(a)):e.cell}},f=function(){var t={tailRow:null,tailCell:null},n=[{offset:{row:-1,cell:0}},{offset:{row:0,cell:1}},{offset:{row:1,cell:0}},{offset:{row:0,cell:-1}}].filter((function(t){return c(r.row+t.offset.row,r.cell+t.offset.cell)&&!e[r.row+t.offset.row][r.cell+t.offset.cell]}));if(r.row-l.row&&r.cell-l.cell){var a=u(r),s=n.findIndex((function(e){return e.offset.row===a.row-r.row&&e.offset.cell===a.cell-r.cell}));-1!==s&&(t.tailRow=r.row+n[s].offset.row,t.tailCell=r.cell+n[s].offset.cell)}if(null===t.tailCell){var o=n[d.a.random(n.length-1)].offset;t.tailRow=r.row+o.row,t.tailCell=r.cell+o.cell}return t};if(!r||e[r.row][r.cell]===-1*i.safeValue||t){var m=function(){var t={},n=0,a=O(e);do{t=a[d.a.random(a.length-1)],n=+e[t.y][t.x]}while(n<0||5===n||"0"===e[t.y][t.x]);return{headRow:t.y,headCell:t.x}}(),h=m.headRow,p=m.headCell;s.row=h,s.cell=p,o.startPoint=E(s),o.endPoint=E(s)}else if(!l||r.row===l.row&&r.cell===l.cell||e[l.row][l.cell]===-1*i.safeValue){var g=f(),v=g.tailRow,b=g.tailCell;s.row=v,s.cell=b,o.startPoint=r,o.endPoint=E(s)}else{var y=u(l),j=y.row,w=y.cell;if(!c(j,w)||Math.abs(+e[j][w])===i.safeValue){var S=f();j=S.tailRow,w=S.tailCell}s.row=j,s.cell=w,o.startPoint=r,o.endPoint=E(s)}return{rowAI:s.row,cellAI:s.cell,ship:o}},b=new Array(i.fieldSize).fill(new Array(i.fieldSize).fill(0)),y=n(11),E=function(e){var t={};return e instanceof Array?t=e.map((function(e){return Object(y.a)(e)})):e instanceof Object&&(t=JSON.parse(JSON.stringify(e))),t},j=function(e,t,n){var a=-1*(+e[t][n]?+e[t][n]:i.safeValue);return e[t][n]="string"===typeof e[t][n]?String(a):a,e[t][n]},O=function(e){return e.flat().map((function(e,t){if(!e)return new w(Math.floor(t/i.fieldSize),t%i.fieldSize)})).filter((function(e){return e instanceof w}))};var w=function(e,t){this.x=t,this.y=e},S=function(e){var t=new Date(e),n=t.getFullYear(),a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],r=t.getDate(),l=t.getHours(),s="0"+t.getMinutes(),o="0"+t.getSeconds();return a+"-"+r+"-"+n+" "+l+":"+s.substr(-2)+":"+o.substr(-2)},N=function(e){return Object.fromEntries(Object.entries(E(i.ships)).map((function(t){var n=Object(r.a)(t,2),a=n[0],l=n[1];return d.a.times(l.amount,(function(){var t=p(e,l.size),n=t.coords,a=t.renderedField;l.units.push(n),e=a})),l.destroyed=new Array(l.amount).fill(0),[a,l]})))},x=function(e,t,n){var a=null,l=null,s=null;return Object.entries(e).forEach((function(e){var o=Object(r.a)(e,2),c=o[0],i=o[1],u=i.units.findIndex((function(e){return!!e.filter((function(e){return e.y===t&&e.x===n})).length}));-1!==u&&++i.destroyed[u]===i.size&&(a=i.units[u],l=c,s=u)})),{destroyedShip:a,shipType:l,destroyedIndex:s}},k=function(e){var t=e.name,n=Object(l.useState)(""),o=Object(r.a)(n,2),c=o[0],m=o[1],d=Object(l.useState)("prepare"),h=Object(r.a)(d,2),p=h[0],y=h[1],O=Object(l.useState)("false"),w=Object(r.a)(O,2),S=w[0],k=w[1],I=Object(l.useState)(E(b)),M=Object(r.a)(I,2),A=M[0],z=M[1],_=Object(l.useState)(E(b)),T=Object(r.a)(_,2),P=T[0],V=T[1],J=Object(l.useState)(E(i.ships)),F=Object(r.a)(J,2),D=F[0],R=F[1],B=Object(l.useState)(E(b)),W=Object(r.a)(B,2),L=W[0],q=W[1],G=Object(l.useState)(E(i.ships)),U=Object(r.a)(G,2),Y=U[0],K=U[1],Q=Object(l.useState)({}),X=Object(r.a)(Q,2),Z=X[0],$=X[1],ee=Object(l.useState)(!1),te=Object(r.a)(ee,2),ne=te[0],ae=te[1],re=Object(l.useState)({status:!1,person:""}),le=Object(r.a)(re,2),se=le[0],oe=le[1],ce=Object(l.useState)(!0),ie=Object(r.a)(ce,2),ue=ie[0],fe=ie[1];Object(l.useEffect)((function(){if("prepare"===p||S){var e=E(b),t=E(b);R(N(e)),V(e),K(N(t)),q(t),z(E(b)),$({}),k(!1)}}),[p,S]),Object(l.useEffect)((function(){se.status&&("person"===se.person?alert("\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c! \u0412\u044b \u043f\u043e\u0431\u0435\u0434\u0438\u043b\u0438!"):alert("\u042d\u0442\u043e \u043f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435...\u0423\u0432\u044b :("),y("prepare"),fe(!1),oe({status:!1,person:""}),me())}));var me=function(){if(c){var e=P.flat().filter((function(e){return+e<0&&+e!==-1*i.safeValue})).length,t=JSON.stringify({id:c,score:e});fetch("/api/records",{method:"patch",headers:Object(a.a)({},i.defaultHeaders),body:t}).then((function(e){if(200!==e.status)throw new Error(e.statusText);console.log("Sent score data successfully")})).catch((function(e){console.log(e),console.log(t)}))}else console.log("Game ID \u043d\u0435 \u0437\u0430\u0434\u0430\u043d")};function de(e,t,n){if("play"===p&&"player"===n&&P[e][t]>=0&&!ne&&ue){var a=E(P);if(j(a,e,t),+a[e][t]!==-1*i.safeValue){var r=x(D,e,t),l=r.destroyedShip,s=r.shipType,o=r.destroyedIndex;if(l){var c=E(D);c[s].units.splice(o,1),R(c),g(a,l,!0),he("person",a)}V(a)}else{V(a);var u=E(L),m=E(A),d=Z,h=0,b=!1,y=!1,O=function(){z(m),q(u),$(d)},w=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise((function(t,n){+h===-1*i.safeValue||y?n("finished"):(e&&O(),ae(!0),setTimeout((function(){ae(!1),t(v(E(m),b,d))}),i.timeAIIsWaiting))}))};!function e(t){t.then((function(t){var n=t.rowAI,a=t.cellAI,r=Object(f.a)(t,["rowAI","cellAI"]);b=!1,d=r,m[n][a]=h=j(u,n,a);var l=x(Y,n,a),s=l.destroyedShip,o=l.shipType,c=l.destroyedIndex;if(s){b=!0;var i=E(Y);i[o].units.splice(c,1),K(i),g(u,s,!0),g(m,s,!0),y=he("AI",u)}e(w(!0))}),(function(e){O()}))}(w())}}}var he=function(e,t){if(function(e){return!e.filter((function(e){return!!e.filter((function(e){return+e>0&&+e!==i.safeValue})).length})).length}(t)){var n="person";return"AI"===e&&(n="AI"),oe({status:!0,person:n}),!0}return!1};return s.a.createElement("div",{id:"game"},"play"===p&&s.a.createElement("div",{className:"game_header"},s.a.createElement(H,{fleet:Y,name:"Smart",player:"AI"}),s.a.createElement(C,{action:ue}),s.a.createElement(H,{fleet:D,name:t,player:"user"})),s.a.createElement("div",{id:"fields"},s.a.createElement(u,{playFor:"prepare"===p?"player":"AI",field:L,mode:p,handleClick:de}),"play"===p&&s.a.createElement(u,{playFor:"player",field:P,mode:p,handleClick:de})),s.a.createElement("div",{className:"button_group"},s.a.createElement("img",{src:"./img/".concat("prepare"===p?"power-button":"refresh",".png"),alt:"control",onClick:function(){"prepare"===p?(y("play"),fe(!0),fetch("/api/records",{method:"post",headers:Object(a.a)({},i.defaultHeaders),body:JSON.stringify({game:"\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0431\u043e\u0439"})}).then((function(e){if(200===e.status)return console.log("Successfully notify server about game start"),e.json();throw new Error(e.statusText)})).then((function(e){m(e.id)})).catch((function(e){return console.log(e)}))):(fe(!1),y("prepare"),me())}}),"prepare"===p?s.a.createElement("img",{src:"./img/loop.png",alt:"refresh",onClick:function(){return k(!0)}}):s.a.createElement("img",{src:"./img/".concat(ue?"pause":"play",".png"),alt:"timer",onClick:function(){ue&&me(),fe((function(e){return!e}))}})))},C=(n(24),function(e){var t=e.action,n=Object(l.useState)(0),a=Object(r.a)(n,2),o=a[0],c=a[1],i=Object(l.useState)(null),u=Object(r.a)(i,2),f=u[0],m=u[1],d=Object(l.useState)(null),h=Object(r.a)(d,2),p=h[0],g=h[1],v=Object(l.useState)(null),b=Object(r.a)(v,2),y=b[0],E=b[1],j=Object(l.useState)(null),O=Object(r.a)(j,2),w=O[0],S=O[1];return Object(l.useEffect)((function(){return t?m(setInterval((function(){c((function(e){return e+1}))}),1e3)):clearInterval(f)}),[t]),Object(l.useEffect)((function(){var e,t,n;e=Math.floor(o/3600),t=Math.floor((o-3600*e)/60),n=o-(3600*e+60*t),g(String(e).padStart(2,"0")),E(String(t).padStart(2,"0")),S(String(n).padStart(2,"0"))}),[o]),s.a.createElement("div",{id:"timer"},s.a.createElement("strong",null,p," : ",y," : ",w))}),I=(n(25),document.getElementById("id01"));window.onclick=function(e){e.target===I&&(I.style.display="none")};var M=function(e){var t=e.logIn,n=Object(l.useState)(""),o=Object(r.a)(n,2),c=o[0],u=o[1];return s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){return document.getElementById("id01").style.display="block"},className:"ENT"},"\u0418\u0433\u0440\u0430\u0442\u044c \xab\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0411\u043e\u0439\xbb"),s.a.createElement("div",{id:"id01",className:"modal"},s.a.createElement("form",{className:"modal-content animate",onSubmit:function(e){e.preventDefault(),fetch("/api/users",{method:"post",headers:Object(a.a)({},i.defaultHeaders),body:JSON.stringify({name:c})}).then((function(e){if(200!==e.status)throw 400===e.status?new Error("\u041f\u043e\u043b\u044c\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0441 \u0442\u0430\u043a\u0438\u043c \u0438\u043c\u0435\u043d\u0435\u043c \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"):new Error(e.statusText);console.log("login for ".concat(c," is successful")),t(c)})).catch((function(e){return alert(e)}))}},s.a.createElement("div",{className:"imgcontainer"},s.a.createElement("span",{onClick:function(){return document.getElementById("id01").style.display="none"},className:"close",title:"Close Modal"},"\xd7"),s.a.createElement("img",{src:"https://thumbs.gfycat.com/FrankFreeAmericankestrel-size_restricted.gif",alt:"Avatar",className:"avatar"})),s.a.createElement("div",{className:"container"},s.a.createElement("label",{htmlFor:"uname",style:{fontSize:"2vh"}},s.a.createElement("b",null,"\u041f\u0440\u0438\u0432\u0435\u0442, \u044f Smart, \u0430 \u0442\u044b...")),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("input",{className:"form-row",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",name:"uname",autoComplete:"off",value:c,onChange:function(e){return u(e.target.value)},required:!0}),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("button",{type:"submit",className:"button1"},"\u0418\u0413\u0420\u0410\u0422\u042c")))))},A=n(4),z=n(5),_=n(7),T=n(6),P=n(8);n(26);var V=function(e){function t(){var e,n;Object(A.a)(this,t);for(var r=arguments.length,l=new Array(r),s=0;s<r;s++)l[s]=arguments[s];return(n=Object(_.a)(this,(e=Object(T.a)(t)).call.apply(e,[this].concat(l)))).state={messages:[],interval:null,color:null},n.onSendMessage=function(e){fetch("/api/messages",{method:"post",headers:Object(a.a)({},i.defaultHeaders),body:JSON.stringify({text:e})}).then((function(e){if(200!==e.status)throw new Error(e.statusText);console.log("Successfully sent message to server"),n.loadMessages()})).catch((function(e){return console.log(e)}))},n}return Object(P.a)(t,e),Object(z.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({interval:setInterval((function(){return e.loadMessages()}),i.timeLoadChatMessages),color:"rgba("+d.a.random(255)+", "+d.a.random(255)+", "+d.a.random(255)+", 0.65)"})}},{key:"loadMessages",value:function(){var e=this,t=[];fetch("/api/messages",{headers:Object(a.a)({},i.defaultHeaders)}).then((function(e){if(200===e.status)return console.log("Successfully loaded messages"),e.json();throw new Error(e.statusText)})).then((function(n){n.forEach((function(e){var n=e.user,a=e.game,r=e.text,l=e.time,s=e.isMine;t.push({name:n,text:r,isMine:s,game:a,time:l})}));var a=document.getElementsByClassName("Message-content");a.scrollTop=a.scrollHeight,e.setState({messages:t})})).catch((function(e){return console.log(e)}))}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.interval)}},{key:"render",value:function(){return s.a.createElement("div",{className:"Chat",style:{background:"url('./img/chat_back.jpg) no-repeat center center cover"}},s.a.createElement("div",{className:"Chat-header"},s.a.createElement("h1",null,"\u041e\u0431\u0449\u0438\u0439 \u0447\u0430\u0442")),s.a.createElement(F,{messages:this.state.messages,color:this.state.color}),s.a.createElement(J,{onSendMessage:this.onSendMessage}))}}]),t}(l.Component),J=function(e){function t(){var e,n;Object(A.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(_.a)(this,(e=Object(T.a)(t)).call.apply(e,[this].concat(r)))).state={text:""},n}return Object(P.a)(t,e),Object(z.a)(t,[{key:"onChange",value:function(e){this.setState({text:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault(),this.props.onSendMessage(this.state.text),this.setState({text:""})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"Input"},s.a.createElement("form",{onSubmit:function(t){return e.onSubmit(t)},className:"chat_form"},s.a.createElement("input",{className:"chat_input",onChange:function(t){return e.onChange(t)},value:this.state.text,type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"}),s.a.createElement("button",{className:"chat_button"},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")))}}]),t}(l.Component),F=function(e){function t(){return Object(A.a)(this,t),Object(_.a)(this,Object(T.a)(t).apply(this,arguments))}return Object(P.a)(t,e),Object(z.a)(t,[{key:"render",value:function(){var e=this,t=this.props.messages;return s.a.createElement("ul",{className:"Messages-list"},t.map((function(t){return e.renderMessage(t)})))}},{key:"renderMessage",value:function(e){var t=e.name,n=e.text,a=e.isMine,r=e.game,l=e.time,o=a,c=o?"Messages-message currentMember":"Messages-message";return s.a.createElement("li",{className:c},s.a.createElement("div",{className:"Message-content"},!o&&s.a.createElement("div",{className:"username"},s.a.createElement("strong",null,t," ",r&&"->"," ",r,"}")),s.a.createElement("div",{className:"text",style:{backgroundColor:this.props.color}},n),s.a.createElement("div",{className:"time"},S(l))))}}]),t}(l.Component),H=(n(27),function(e){var t=e.fleet,n=e.name,a=e.player,l="".concat("AI"===a?"flex-start":"flex-end");return s.a.createElement("div",{className:"info_ships"},s.a.createElement("div",{className:"name",style:{justifyContent:l}},n),s.a.createElement("div",{className:"ships"},Object.entries(t).map((function(e,t){var n=Object(r.a)(e,2),a=(n[0],n[1]);return s.a.createElement("div",{className:"ships__same_type",key:t,style:{justifyContent:l}},a.units.map((function(e,t){return s.a.createElement("div",{className:"ships__unit",key:t,style:{width:"".concat(15*e.length,"px")}})})))}))))});Object(o.render)(s.a.createElement((function(){var e=Object(l.useState)(""),t=Object(r.a)(e,2),n=t[0],o=t[1];Object(l.useEffect)((function(){fetch("/api/users",{headers:Object(a.a)({},i.defaultHeaders)}).then((function(e){if(200===e.status)return e.json();throw new Error(e.statusText)})).then((function(e){console.log(e),o("blabla")})).catch((function(e){return console.log("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.message))}))}),[]);return n?s.a.createElement(c,{logout:function(){fetch("/api/users",{method:"delete",headers:Object(a.a)({},i.defaultHeaders)}).then((function(e){if(200!==e.status)throw new Error(e.statusText);console.log("logout for ".concat(n," is successful")),o("")})).catch((function(e){return alert(e)}))},userName:n}):s.a.createElement(M,{logIn:function(e){o(e)}})}),null),document.getElementById("root"))}],[[13,1,2]]]);
//# sourceMappingURL=main.222b826a.chunk.js.map