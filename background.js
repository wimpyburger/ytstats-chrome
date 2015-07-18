function checkOpenTab() {
   chrome.tabs.query({},function(tabs){     
      tabs.forEach(function(tab){
         console.log(tab.url);
      });
   });
}

setInterval(function(){
   // check every second
   checkOpenTab();
},1000);
