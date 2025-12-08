(function(){
  var kmixpl = 302395;
  var abccdtk = [];
  function vgjoubzm(x){
    var s = 0;
    for(var i=0;i<16;i++){ s += Math.sin(x+i)*kmixpl; }
    return s;
  }
  function relbcucyo(n){
    for(var j=0;j<n;j++){ abccdtk.push(vgjoubzm(j)); }
    return abccdtk.slice(-3);
  }
  if(!window.__obf__) window.__obf__ = {};
  window.__obf__['relbcucyo'] = relbcucyo;
})();
