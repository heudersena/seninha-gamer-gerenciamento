"use strict";var y=Object.create;var o=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var x=Object.getPrototypeOf,M=Object.prototype.hasOwnProperty;var I=(t,e)=>{for(var n in e)o(t,n,{get:e[n],enumerable:!0})},l=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of b(e))!M.call(t,a)&&a!==n&&o(t,a,{get:()=>e[a],enumerable:!(i=P(e,a))||i.enumerable});return t};var p=(t,e,n)=>(n=t!=null?y(x(t)):{},l(e||!t||!t.__esModule?o(n,"default",{value:t,enumerable:!0}):n,t)),v=t=>l(o({},"__esModule",{value:!0}),t);var d=(t,e,n)=>new Promise((i,a)=>{var g=r=>{try{_(n.next(r))}catch(c){a(c)}},f=r=>{try{_(n.throw(r))}catch(c){a(c)}},_=r=>r.done?i(r.value):Promise.resolve(r.value).then(g,f);_((n=n.apply(t,e)).next())});var w={};I(w,{MercadoPago:()=>m});module.exports=v(w);var Y=require("dotenv/config"),s=p(require("mercadopago")),u=p(require("dayjs"));s.default.configurations.setAccessToken(String(process.env.MERCADO_PAGO_KEY_PROD));var m=class{static createPayment(e){return d(this,null,function*(){var a;let n={transaction_amount:e.transaction_amount,payment_method_id:"pix",payer:{email:e.payer.email},installments:1,date_of_expiration:String((0,u.default)(new Date).add(10,"minutes").format("YYYY-MM-DDTHH:mm:ss.000ZZ"))};return yield(a=s.default.payment)==null?void 0:a.save(n)})}static GetPayment(e){return d(this,null,function*(){return yield s.default.payment.findById(e)})}};0&&(module.exports={MercadoPago});