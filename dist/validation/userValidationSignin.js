"use strict";var p=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var l=(o,s)=>{for(var t in s)p(o,t,{get:s[t],enumerable:!0})},x=(o,s,t,n)=>{if(s&&typeof s=="object"||typeof s=="function")for(let e of d(s))!f.call(o,e)&&e!==t&&p(o,e,{get:()=>s[e],enumerable:!(n=y(s,e))||n.enumerable});return o};var F=o=>x(p({},"__esModule",{value:!0}),o);var u=(o,s,t)=>new Promise((n,e)=>{var m=r=>{try{i(t.next(r))}catch(a){e(a)}},R=r=>{try{i(t.throw(r))}catch(a){e(a)}},i=r=>r.done?n(r.value):Promise.resolve(r.value).then(m,R);i((t=t.apply(o,s)).next())});var b={};l(b,{userValidationSignin:()=>N});module.exports=F(b);var c=require("express-validator");var N=(o,s,t)=>u(void 0,null,function*(){let n=(0,c.validationResult)(o);if(!n.isEmpty())return o.status(400).json({errors:n.array()});t()});0&&(module.exports={userValidationSignin});