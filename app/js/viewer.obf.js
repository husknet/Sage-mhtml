// Lightweight obfuscation (string escapes + minimal naming)
(function(){
  "use strict";
  var _s=function(q){try{return atob(q)}catch(e){return q}};
  var _G=function(s){var d=document.createElement('div');d.innerHTML=s;return d.textContent||d.innerText||""};
  var _Q=function(k){try{return localStorage.getItem(k)}catch(_){return null}};
  var _R=function(k){try{localStorage.removeItem(k)}catch(_){}};
  var _E=function(msg){
    var L=document.getElementById("loading");
    if(!L)return;
    var c=L.querySelector(".card");
    if(c){c.innerHTML='<div style="font-weight:600;font-size:18px;margin-bottom:8px;">Couldn\\u2019t load MHTML</div><div class="muted" style="white-space:pre-wrap;">'+_G(msg)+'</div>';}
  };
  var _X=function(root){
    var s=root.querySelectorAll("\x73\x63\x72\x69\x70\x74");
    for(var i=0;i<s.length;i++){
      var old=s[i], n=document.createElement("\x73\x63\x72\x69\x70\x74");
      if(old.attributes){for(var j=0;j<old.attributes.length;j++){var a=old.attributes[j];n.setAttribute(a.name,a.value)}}
      n.textContent=old.textContent||"";
      if(old.parentNode){old.parentNode.replaceChild(n,old)}
    }
  };

  async function run(){
    try{
      var u=new URL(window.location.href);
      var id=u.searchParams.get("\x69\x64");
      if(!id){ _E("Missing URL param ?id"); return; }
      var p=_Q(id);
      if(!p){ _E("No localStorage entry for key: "+id+"\\n(Was it already consumed?)"); return; }
      _R(id);
      var resp=await fetch(p);
      if(!resp.ok){ throw new Error("Fetch failed: "+resp.status+" "+resp.statusText); }
      var m=await resp.text();

      // mhtml2html is provided by libs/mhtml2html.umd.min.js
      var doc=mhtml2html.convert(m);
      document.body=doc.window.document.body;

      var all=doc.window.document.all;
      for(var i=0;i<all.length;i++){
        var el=all[i];
        if(el.tagName==="STYLE"){
          document.head.appendChild(el.cloneNode(true));
        } else if(el.tagName==="TITLE"){
          document.title=el.textContent||document.title;
        }
      }

      _X(document);

      var loading=document.getElementById("loading");
      if(loading){ loading.classList.add("hidden"); }

      // Optional hook point
      (function(){})();

    }catch(err){
      _E(err && err.message ? err.message : String(err));
    }
  }

  run();
})();
