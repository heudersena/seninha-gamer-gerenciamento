"use strict";var R=Object.create;var n=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var P=(e,r)=>{for(var o in r)n(e,o,{get:r[o],enumerable:!0})},m=(e,r,o,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of u(r))!O.call(e,t)&&t!==o&&n(e,t,{get:()=>r[t],enumerable:!(i=L(r,t))||i.enumerable});return e};var v=(e,r,o)=>(o=e!=null?R(C(e)):{},m(r||!e||!e.__esModule?n(o,"default",{value:e,enumerable:!0}):o,e)),D=e=>m(n({},"__esModule",{value:!0}),e);var p=(e,r,o)=>new Promise((i,t)=>{var c=s=>{try{a(o.next(s))}catch(l){t(l)}},E=s=>{try{a(o.throw(s))}catch(l){t(l)}},a=s=>s.done?i(s.value):Promise.resolve(s.value).then(c,E);a((o=o.apply(e,r)).next())});var b={};P(b,{BetsEntities:()=>S});module.exports=D(b);var M=require("dotenv/config"),_=v(require("mysql2")),U=_.default.createPool({host:process.env.MYSQL_HOST,user:process.env.MYSQL_USER,database:process.env.MYSQL_DATABASE,password:process.env.MYSQL_PASSWORD,waitForConnections:!0,connectionLimit:10,maxIdle:10,idleTimeout:6e4,queueLimit:0,enableKeepAlive:!0,keepAliveInitialDelay:0,charset:"utf8mb4"}),A=U.promise();var S=class{static seekContestWinners(r,o){return p(this,null,function*(){return Promise.all([yield A.query("CALL PROCEDURE_BUSCAR_GANHADORES_POR_ESTABELECIMENTO_E_CONCURSO(?,?)",[r,o]),yield A.query("CALL PROCEDURE_BUSCAR_VALORES_A_SER_PAGO(?)",[o])])})}};0&&(module.exports={BetsEntities});
