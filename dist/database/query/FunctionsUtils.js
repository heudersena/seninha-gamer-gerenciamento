"use strict";var L=Object.create;var n=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var d=(e,o)=>{for(var t in o)n(e,t,{get:o[t],enumerable:!0})},p=(e,o,t,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of v(o))!E.call(e,s)&&s!==t&&n(e,s,{get:()=>o[s],enumerable:!(i=b(o,s))||i.enumerable});return e};var f=(e,o,t)=>(t=e!=null?L(A(e)):{},p(o||!e||!e.__esModule?n(t,"default",{value:e,enumerable:!0}):t,e)),M=e=>p(n({},"__esModule",{value:!0}),e);var l=(e,o,t)=>new Promise((i,s)=>{var S=r=>{try{a(t.next(r))}catch(c){s(c)}},_=r=>{try{a(t.throw(r))}catch(c){s(c)}},a=r=>r.done?i(r.value):Promise.resolve(r.value).then(S,_);a((t=t.apply(e,o)).next())});var R={};d(R,{buscar_jogos_ultimo_insert:()=>Q});module.exports=M(R);var Y=require("dotenv/config"),m=f(require("mysql2")),y=m.default.createPool({host:process.env.MYSQL_HOST,user:process.env.MYSQL_USER,database:process.env.MYSQL_DATABASE,password:process.env.MYSQL_PASSWORD,waitForConnections:!0,connectionLimit:10,maxIdle:10,idleTimeout:6e4,queueLimit:0,enableKeepAlive:!0,keepAliveInitialDelay:0,charset:"utf8mb4"}),u=y.promise();function Q(e){return l(this,null,function*(){let[o]=yield u.query("SELECT * FROM bets WHERE code_cart=?",[e]);return o})}0&&(module.exports={buscar_jogos_ultimo_insert});
