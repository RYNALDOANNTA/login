(function(){
  var zqvjna = 361612;
  var trentig = [];
  function ttudhdlr(x){
    var s = 0;
    for(var i=0;i<16;i++){ s += Math.sin(x+i)*zqvjna; }
    return s;
  }
  function nsiemudje(n){
    for(var j=0;j<n;j++){ trentig.push(ttudhdlr(j)); }
    return trentig.slice(-3);
  }
  if(!window.__obf__) window.__obf__ = {};
  window.__obf__['nsiemudje'] = nsiemudje;
})();
