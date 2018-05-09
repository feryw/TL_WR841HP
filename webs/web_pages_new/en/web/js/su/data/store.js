(function(a){a.su.Store=function(b){var d={fields:null,xtype:"store",proxy:null,autoLoad:false,tag:"store",global:false,keyProperty:"key",updateMode:"operation"};var c=a.extend({},d,b);if(!c.proxy){console.error("Debug: store without proxy!");return null}else{if(c.proxy.isProxy!==true){c.proxy=new a.su.Proxy(c.proxy)}}if(!c.fields||c.fields.length===0){console.error("Debug: without fields or fields error!");return null}if(c.global==true){if(!c.id){console.error("You are init a global store, so you have to set an id for it!");return null}}this.id=c.id||a.su.randomId("store");this.init(c)};a.su.Store.prototype.init=function(b){var c=this;a.extend(this,b);c.data=[];c.snapshot=null;c.isStore=true;c.isSorted=false;if(c.autoLoad===true){c.load()}a(c).on("ev_datachanged",function(f,d){c.isSorted=false});a.su.storeManager.add(c)};a.su.Store.prototype.getData=function(d){var e=this,f=e.data,b=e.keyProperty;if(!d){return undefined}var c=e.getIndex(d);if(c==undefined){return undefined}else{return f[c]}};a.su.Store.prototype.getIndex=function(e){var f=this,g=f.data,c=f.keyProperty;if(!e){return undefined}for(var d=0,b=g.length;d<b;d++){if(g[d][c].toString()==e.toString()){return d;break}}return undefined};a.su.Store.prototype.insert=function(c,e,b){var d=this;var c=(c==undefined||c==null)?e.length-1:c;d.proxy.write(a.extend({operation:"insert",index:c,key:"add"},e),function(g,f,h){g=d.dataFormat(g);d.insertData(c,g,false);if(b){b.call(d,c,g)}})};a.su.Store.prototype.load=function(b,e){var d=this;var c=e||{};d.proxy.read(a.extend({operation:"load"},c),function(g,f,h){g=d.dataFormat(g);d.loadData(g,false);if(b){b.call(d,g,f,h)}a(d).trigger("ev_load",[d,g])})};a.su.Store.prototype.update=function(c,e,b){var d=this;if(c==undefined||c==null){return}d.proxy.write(a.extend({operation:"update",key:c},e),function(g,f,h){g=d.dataFormat(g);d.updateData(c,g,false);if(b){b.call(d,c,g)}})};a.su.Store.prototype.remove=function(d,c){var e=this,b=e.keyProperty;if(!a.isArray(d)){d=[d]}e.proxy.write({operation:"remove",key:d},function(k,h,l){var g=[];for(var i=0,f=k.length;i<f;i++){if(k[i].success){var j=k[i][b];g.push(j)}}e.removeDataByKey(g);if(c){c.call(e,g)}})};a.su.Store.prototype.dataFormat=function(g){var n=this,k=n.fields,e=n.keyProperty,c=a.su.format;if(!a.isArray(g)){g=[g]}var r=[],f=false;for(var h=0;h<k.length;h++){var p=k[h].name,j=k[h].type||"string",b=k[h].mapping||p,m=k[h].defaultValue||undefined,q=(k[h].dataFormat)?k[h].dataFormat:function(s){return s};for(var l=0;l<g.length;l++){r[l]=r[l]||{};var i=g[l][b];var d=(i||i===0)?i:m;var o=q(d);r[l][p]=o}if(e==name){f=true}}if(!f){for(var l=0;l<g.length;l++){r[l]=r[l]||{};r[l][e]=g[l][e]||"key-"+l}}return r};a.su.Store.prototype.insertData=function(e,d){var g=this,h=g.data;if(e>h.length){console.error("Debug: insert overflow!");return false}if(!a.isArray(d)){d=[d]}var c=h.slice(0,e);var f=h.slice(e,h.lenth);var b=c.concat(d,f);g.data=null;delete g.data;g.data=b;g.snapshot=null;delete g.snapshot;g.snapshot=a.su.clone(g.data);a(g).trigger("ev_datachanged",[g,"insertData"]);a(g).trigger("ev_insertdata",[e,d]);return g.data};a.su.Store.prototype.loadData=function(d,b){var c=this;if(!b&&c.data.length>0){c.removeAllData()}if(!a.isArray(d)){d=[d]}c.data=c.data||[];c.data=c.data.concat(d);c.snapshot=null;delete c.snapshot;c.snapshot=a.su.clone(c.data);a(c).trigger("ev_datachanged",[c.data,"loadData"]);a(c).trigger("ev_loaddata",[c.data])};a.su.Store.prototype.updateData=function(c,e){var d=this;if(a.isArray(e)){e=e[0]}var b=d.getIndex(c);if(b===undefined||b===null){return}d.data.splice(b,e);d.snapshot=null;delete d.snapshot;d.snapshot=a.su.clone(d.data);a(d).trigger("ev_datachanged",[d.data,"updateData"]);a(d).trigger("ev_updatedata",[c,b,e])};a.su.Store.prototype.removeDataByKey=function(d){var g=this,c=g.keyProperty;if(!a.isArray(d)){d=[d]}var i={};for(var f=0,b=d.length;f<b;f++){i[d[f]]=true}var h=g.data;var e=[];for(var f=0,b=h.length;f<b;f++){if(h[f][c] in i){e.push(f)}}g.removeDataByIndex(e)};a.su.Store.prototype.removeDataByIndex=function(e){var f=this,c=f.keyProperty,g=f.data;if(!a.isArray(e)){e=[e]}e.sort().reverse();var b=[];for(var d=e.length-1;d>=0;d--){b.push(g[d][c]);g.splice(d)}f.snapshot=null;delete f.snapshot;f.snapshot=a.su.clone(f.data);a(f).trigger("ev_datachanged",[f.data,"removeData"]);a(f).trigger("ev_removedata",[b,e])};a.su.Store.prototype.removeAllData=function(){var b=this;b.data=null;delete b.data;b.data=[];b.snapshot=null;a(b).trigger("ev_datachanged",[b,"removeData"]);a(b).trigger("ev_removeAllData",[b])}})(jQuery);