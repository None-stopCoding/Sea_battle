(this.webpackJsonpsea_battle=this.webpackJsonpsea_battle||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n(19)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),l=n.n(r),a=n(4),o=(n(12),n(13),function(){return l.a.createElement("div",{id:"App"},l.a.createElement(I,null))}),i=(n(14),{fieldSize:10,ships:{battleship:{size:4,amount:1,units:[],destroyed:[]},cruiser:{size:3,amount:2,units:[],destroyed:[]},destroyer:{size:2,amount:3,units:[],destroyed:[]},boat:{size:1,amount:4,units:[],destroyed:[]}},safeValue:5,timeAIIsWaiting:500,timerStart:30}),c=function(e){var t=e.field,n=e.mode,r=e.playFor,a=e.handleClick;return l.a.createElement("div",{id:"field"},t.map((function(e,t){return l.a.createElement("div",{id:"row",key:t},e.map((function(e,o){var c=function(e){var t="cell",l="empty";return parseInt(e)===-1*i.safeValue?l="missed":parseInt(e)<0&&(l="killed"),"prepare"===n&&(t+=" big_cell"),"string"===typeof e?t+=" safe":"play"===n&&"AI"===r||"prepare"===n&&"player"===r?e&&Math.abs(e)!==i.safeValue||(t+=" empty"):"killed"!==l&&(t+=" empty"),{idName:l,className:t}}(e),u=c.idName,f=c.className;return l.a.createElement("div",{className:f,onClick:function(){return a(t,o,r)},key:o},l.a.createElement("div",{id:u},"killed"===u&&l.a.createElement("img",{src:"./img/fire.png",alt:"killed"})))})))})))},u=n(6),f=n(1),s=n(2),d=n.n(s),p=(n(17),function(e,t,n){var r=[e],l=[{futureShip:e.y-n,offset:{y:-1,x:0}},{futureShip:e.x+n,offset:{y:0,x:1}},{futureShip:e.y+n,offset:{y:1,x:0}},{futureShip:e.x-n,offset:{y:0,x:-1}}],a=function(l){var a=l.futureShip,o=l.offset;if(0<=a&&a<i.fieldSize){for(var c=[],u=n;u;)c.push(t[e.y+u*o.y][e.x+u*o.x]),u--;c.every((function(e){return!e}))&&c.forEach((function(t,n){return r.push(new j(e.y+(n+1)*o.y,e.x+(n+1)*o.x))}))}};if(n)do{var o=d.a.random(l.length-1);a(l[o]),1===r.length&&l.splice(o,1)}while(1===r.length&&l.length);return r}),m=function(e,t){var n=O(e),r=[];do{var l=n[d.a.random(n.length-1)];r=p(l,e,t-1)}while(r.length!==t);return r.forEach((function(n){return e[n.y][n.x]=t})),h(e,r),{coords:r,renderedField:e}},h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=i.safeValue,l=i.fieldSize,a=[-1,0,1];t.forEach((function(t){a.forEach((function(o){var c=t.y+o;a.forEach((function(a){var o=t.x+a;0<=c&&c<l&&0<=o&&o<l&&(n&&Math.abs(e[c][o])===i.safeValue||!e[c][o])&&(e[c][o]=n?String(e[c][o]):r)}))}))}))},b=function(e,t,n){var r=n.ship||{startPoint:null,endPoint:null},l=r.startPoint,a=r.endPoint,o={row:null,cell:null},c={startPoint:null,endPoint:null},u=function(e,t){return 0<=e&&e<i.fieldSize&&0<=t&&t<i.fieldSize},f=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=a.row-l.row,r=a.cell-l.cell,o=t?-1:1;return console.log("moving",n,r),{row:n?e.row+o*(n/Math.abs(n)):e.row,cell:r?e.cell+o*(r/Math.abs(r)):e.cell}},s=function(){var t={tailRow:null,tailCell:null},n=[{offset:{row:-1,cell:0}},{offset:{row:0,cell:1}},{offset:{row:1,cell:0}},{offset:{row:0,cell:-1}}].filter((function(t){return u(l.row+t.offset.row,l.cell+t.offset.cell)&&!e[l.row+t.offset.row][l.cell+t.offset.cell]}));if(l.row-a.row&&l.cell-a.cell){var r=f(l),o=n.findIndex((function(e){return e.offset.row===r.row-l.row&&e.offset.cell===r.cell-l.cell}));-1!==o&&(t.tailRow=l.row+n[o].offset.row,t.tailCell=l.cell+n[o].offset.cell)}if(null===t.tailCell){var i=n[d.a.random(n.length-1)].offset;t.tailRow=l.row+i.row,t.tailCell=l.cell+i.cell,console.log("tryDir",i)}return console.log("tail",t),t};if(!l||e[l.row][l.cell]===-1*i.safeValue||t){console.log("in first",l,a,t),l&&console.log("first",e[l.row][l.cell]);var p=function(){var t={},n=0,r=O(e);do{t=r[d.a.random(r.length-1)],n=+e[t.y][t.x]}while(n<0||5===n||"0"===e[t.y][t.x]);return{headRow:t.y,headCell:t.x}}(),m=p.headRow,h=p.headCell;o.row=m,o.cell=h,c.startPoint=y(o),c.endPoint=y(o),console.log("out first",o)}else if(!a||l.row===a.row&&l.cell===a.cell||e[a.row][a.cell]===-1*i.safeValue){console.log("in second",l,a);var b=s(),v=b.tailRow,w=b.tailCell;o.row=v,o.cell=w,c.startPoint=l,c.endPoint=y(o),console.log("out second",c,o)}else{console.log("in third",l,a);var g=f(a),j=g.row,S=g.cell;if(console.log("continue",j,S),!u(j,S)||Math.abs(+e[j][S])===i.safeValue){var E=s();j=E.tailRow,S=E.tailCell}o.row=j,o.cell=S,c.startPoint=l,c.endPoint=y(o),console.log("out third",c,o)}return{rowAI:o.row,cellAI:o.cell,ship:c}},v=new Array(i.fieldSize).fill(new Array(i.fieldSize).fill(0)),w=n(5),y=function(e){var t={};return e instanceof Array?t=e.map((function(e){return Object(w.a)(e)})):e instanceof Object&&(t=JSON.parse(JSON.stringify(e))),t},g=function(e,t,n){var r=-1*(+e[t][n]?+e[t][n]:i.safeValue);return e[t][n]="string"===typeof e[t][n]?String(r):r,e[t][n]},O=function(e){return e.flat().map((function(e,t){if(!e)return new j(Math.floor(t/i.fieldSize),t%i.fieldSize)})).filter((function(e){return e instanceof j}))};var j=function(e,t){this.x=t,this.y=e},S=function(e){return Object.fromEntries(Object.entries(y(i.ships)).map((function(t){var n=Object(f.a)(t,2),r=n[0],l=n[1];return d.a.times(l.amount,(function(){var t=m(e,l.size),n=t.coords,r=t.renderedField;l.units.push(n),e=r})),l.destroyed=new Array(l.amount).fill(0),[r,l]})))},E=function(e,t,n){var r=null;return Object.entries(e).forEach((function(e){var l=Object(f.a)(e,2),a=(l[0],l[1]),o=a.units.findIndex((function(e){return!!e.filter((function(e){return e.y===t&&e.x===n})).length}));-1!==o&&++a.destroyed[o]===a.size&&(r=a.units[o])})),r},I=function(){var e=Object(r.useState)("prepare"),t=Object(f.a)(e,2),n=t[0],a=t[1],o=Object(r.useState)(y(v)),s=Object(f.a)(o,2),d=s[0],p=s[1],m=Object(r.useState)(y(v)),w=Object(f.a)(m,2),O=w[0],j=w[1],I=Object(r.useState)(y(i.ships)),A=Object(f.a)(I,2),z=A[0],k=A[1],C=Object(r.useState)(y(v)),P=Object(f.a)(C,2),V=P[0],M=P[1],N=Object(r.useState)(y(i.ships)),R=Object(f.a)(N,2),F=R[0],J=R[1],_=Object(r.useState)({}),T=Object(f.a)(_,2),W=T[0],B=T[1],D=Object(r.useState)(!1),q=Object(f.a)(D,2),G=q[0],H=q[1],K=Object(r.useState)({status:!1,person:""}),L=Object(f.a)(K,2),Q=L[0],U=L[1],X=Object(r.useState)(!0),Y=Object(f.a)(X,2),Z=Y[0],$=Y[1],ee=Object(r.useState)(0),te=Object(f.a)(ee,2),ne=(te[0],te[1]);function re(e,t,r){if("play"===n&&"player"===r&&O[e][t]>=0&&!G&&Z){var l=y(O);if(g(l,e,t),+l[e][t]!==-1*i.safeValue){var a=E(z,e,t);a&&(h(l,a,!0),le("person",l)),j(l)}else{j(l);var o=y(V),c=y(d),f=W,s=0,m=!1,v=!1,w=function(){p(c),M(o),B(f)},S=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise((function(t,n){+s===-1*i.safeValue||v?n("finished"):(e&&w(),H(!0),setTimeout((function(){H(!1),t(b(y(c),m,f))}),i.timeAIIsWaiting))}))};!function e(t){t.then((function(t){var n=t.rowAI,r=t.cellAI,l=Object(u.a)(t,["rowAI","cellAI"]);m=!1,f=l,c[n][r]=s=g(o,n,r);var a=E(F,n,r);a&&(m=!0,h(o,a,!0),h(c,a,!0),v=le("AI",o)),e(S(!0))}),(function(e){w()}))}(S())}}}Object(r.useEffect)((function(){if("prepare"===n){var e=y(v),t=y(v);k(S(e)),j(e),J(S(t)),M(t),p(y(v)),B({})}}),[n]),Object(r.useEffect)((function(){Q.status&&("person"===Q.person?alert("\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c! \u0412\u044b \u043f\u043e\u0431\u0435\u0434\u0438\u043b\u0438!"):alert("\u042d\u0442\u043e \u043f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435...\u0423\u0432\u044b :("),a("prepare"),$(!1),U({status:!1,person:""}))}),[Q]);var le=function(e,t){if(function(e){return!e.filter((function(e){return!!e.filter((function(e){return+e>0&&+e!==i.safeValue})).length})).length}(t)){var n="person";return"AI"===e&&(n="AI"),U({status:!0,person:n}),!0}return!1};return l.a.createElement("div",{id:"game"},"play"===n&&l.a.createElement(x,{action:Z,changeStopTime:function(e){return ne(e)}}),l.a.createElement("div",{id:"fields"},l.a.createElement(c,{playFor:"prepare"===n?"player":"AI",field:V,mode:n,handleClick:re}),"play"===n&&l.a.createElement(c,{playFor:"player",field:O,mode:n,handleClick:re})),l.a.createElement("div",{className:"button_group"},l.a.createElement("img",{src:"./img/".concat("prepare"===n?"power-button":"refresh",".png"),alt:"control",onClick:function(){"prepare"===n?(a("play"),$(!0)):($(!1),a("prepare"))}}),"play"===n&&l.a.createElement("img",{src:"./img/".concat(Z?"pause":"play",".png"),alt:"timer",onClick:function(){return $((function(e){return!e}))}})))},x=(n(18),function(e){var t=e.action,n=e.changeStopTime,a=Object(r.useState)(0),o=Object(f.a)(a,2),i=o[0],c=o[1],u=Object(r.useState)(null),s=Object(f.a)(u,2),d=s[0],p=s[1],m=Object(r.useState)(null),h=Object(f.a)(m,2),b=h[0],v=h[1],w=Object(r.useState)(null),y=Object(f.a)(w,2),g=y[0],O=y[1],j=Object(r.useState)(null),S=Object(f.a)(j,2),E=S[0],I=S[1];return Object(r.useEffect)((function(){return t?p(setInterval((function(){c((function(e){return e+1}))}),1e3)):clearInterval(d)}),[t]),Object(r.useEffect)((function(){return n(i)})),Object(r.useEffect)((function(){var e,t,n;e=Math.floor(i/3600),t=Math.floor((i-3600*e)/60),n=i-(3600*e+60*t),v(String(e).padStart(2,"0")),O(String(t).padStart(2,"0")),I(String(n).padStart(2,"0"))}),[i]),l.a.createElement("div",{id:"timer"},b," : ",g," : ",E)});Object(a.render)(l.a.createElement(o,null),document.getElementById("root"))}],[[7,1,2]]]);
//# sourceMappingURL=main.1b98b562.chunk.js.map