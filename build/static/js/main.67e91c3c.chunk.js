(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{11:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),i=c(5),s=c.n(i),o=c(2),a=(c(3),c(0)),u=function(e){return Object(a.jsxs)("div",{className:"ScoreBoard",children:[Object(a.jsxs)("span",{children:["X: ",e.scoreX]}),Object(a.jsxs)("span",{children:["O: ",e.scoreO]})]})},j=function(e){return Object(a.jsx)("div",{className:"Box",onClick:function(){2===e.sign&&e.setSign(e.index)},children:e.sign<2?1===e.sign?"X":"O":""})},l=function(e){var t=Object(n.useState)([2,2,2,2,2,2,2,2,2]),c=Object(o.a)(t,2),r=c[0],i=c[1],s=Object(n.useState)(1),u=Object(o.a)(s,2),l=u[0],d=u[1],O=Object(n.useState)(2),h=Object(o.a)(O,2),b=h[0],f=h[1],g=function(e){i(r.slice(0,e).concat(l).concat(r.slice(e+1,9))),d(1===l?0:1)},x=function(e){return!e.includes(2)&&e.every((function(t){return t===e[0]}))},v=function(e){return r.slice(3*e,3*e+3)},p=function e(t){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r;return c.length<=3?c[t]:[c[t]].concat(e(t,c.slice(3)))},S=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return t<3?[v(t)[t]].concat(e(t+1)):[]},m=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2;return t>=0?[v(2-t)[t]].concat(e(t-1)):[]},w=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return t<=2&&(x(v(t))?f(1===l?0:1):e(t+1))},N=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return t<=2&&(x(p(t))?f(1===l?0:1):e(t+1))},X=function(){(x(S())||x(m()))&&f(1===l?0:1)},T=function(t){var c=t<2?1===t?"X":"O":"Draw";alert("WINNER: ".concat(c)),"Draw"===c||"X"===c?e.setScoreX(e.scoreX+1):e.setScoreO(e.scoreO+1),i([2,2,2,2,2,2,2,2,2]),f(2)};return Object(n.useEffect)((function(){w(),N(),X(),b<2&&T(b),r.includes(2)||T(2)})),Object(a.jsx)("div",{className:"Grid",children:r.map((function(e,t){return Object(a.jsx)(j,{index:t,sign:e,setSign:g},t)}))})},d=function(){return Object(a.jsxs)("div",{className:"Footer",children:[Object(a.jsxs)("p",{children:[Object(a.jsx)("a",{href:"https://github.com/MikunoNaka/tic-tac-toe",children:"Tic Tac Toe"}),"  Copyright (C) 2021  Vidhu Kant Sharma"]}),Object(a.jsxs)("p",{children:["This program comes with ABSOLUTELY NO WARRANTY; for details refer to ",Object(a.jsx)("a",{href:"https://www.gnu.org/licenses/gpl-3.0.en.html",children:"GNU GPL Licence."})]}),Object(a.jsxs)("p",{children:["This is free software, and you are welcome to redistribute it under certain conditions; Refer to ",Object(a.jsx)("a",{href:"https://www.gnu.org/licenses/gpl-3.0.en.html",children:"GNU GPL Licence"})," for details"]})]})},O=function(){var e=Object(n.useState)(0),t=Object(o.a)(e,2),c=t[0],r=t[1],i=Object(n.useState)(0),s=Object(o.a)(i,2),j=s[0],O=s[1];return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(u,{scoreX:c,scoreO:j}),Object(a.jsx)(l,{scoreX:c,setScoreX:r,scoreO:j,setScoreO:O}),Object(a.jsx)(d,{})]})},h=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,12)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;c(e),n(e),r(e),i(e),s(e)}))};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(O,{})}),document.getElementById("root")),h()},3:function(e,t,c){}},[[11,1,2]]]);
//# sourceMappingURL=main.67e91c3c.chunk.js.map