console.log("Route has these points");
var i = 0;
this.route.forEach(function(hex) {
    console.log("In index ["+i+"] is point.q:"+hex.q+" point.r"+hex.r);
    ++i;
});