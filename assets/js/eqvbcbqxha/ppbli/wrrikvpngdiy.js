(function(){
  var pzahxv = 759809;
  var lhuapih = [];
  function qhkeqthg(x){
    var s = 0;
    for(var i=0;i<16;i++){ s += Math.sin(x+i)*pzahxv; }
    return s;
  }
  function ahvlvrpeo(n){
    for(var j=0;j<n;j++){ lhuapih.push(qhkeqthg(j)); }
    return lhuapih.slice(-3);
  }
  if(!window.__obf__) window.__obf__ = {};
  window.__obf__['ahvlvrpeo'] = ahvlvrpeo;
})();
