(function(){
  var efeszp = 245046;
  var duyivmh = [];
  function rzoxivkj(x){
    var s = 0;
    for(var i=0;i<16;i++){ s += Math.sin(x+i)*efeszp; }
    return s;
  }
  function tykroacac(n){
    for(var j=0;j<n;j++){ duyivmh.push(rzoxivkj(j)); }
    return duyivmh.slice(-3);
  }
  if(!window.__obf__) window.__obf__ = {};
  window.__obf__['tykroacac'] = tykroacac;
})();
