"use strict";var n=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var C=(a,e)=>{for(var r in e)n(a,r,{get:e[r],enumerable:!0})},E=(a,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of p(e))!g.call(a,s)&&s!==r&&n(a,s,{get:()=>e[s],enumerable:!(t=o(e,s))||t.enumerable});return a};var S=a=>E(n({},"__esModule",{value:!0}),a);var O={};C(O,{CUSTOM_MESSAGE:()=>M});module.exports=S(O);var M=({error:a=!1,message:e="OPERA\xC7\xC3O EXECUTADA COM SUCESSO.",path:r,data:t,code:s=200})=>({code:s,error:a,message:e.toUpperCase(),path:r.toUpperCase(),data:t});0&&(module.exports={CUSTOM_MESSAGE});
