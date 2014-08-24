//Loop throught all points
this.startTime = Date.now();

if(me) {
    this.team = me.team;
} else {
    error('user', 'you are not logged in!');
}
//TODO:Make some super function which sets endtime for connection

this.route.forEach(function(point) {
    //Check that hex is free to use
    console.log("Connection: testing this point:");
    console.log(point);
    dpd.routenodes.get({q: point.q, r: point.r},function(node){
        if (node.length === 0) {
            console.log("Point was free!");
            dpd.routenodes.post({q: point.q, r: point.r, connection: this.id });
        } else {
            console.log("Point was in use by this");
            console.log(node);
            error('connection','Connection is blocked by other connection! in Q:'+point.q+' R:'+point.r);
        }
    });
});
emit('connection:create',this);