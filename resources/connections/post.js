//Loop throught all points
this.startTime = Date.now();
if(me) {
    this.team = me.team;
} else {
    error('user', 'you are not logged in, I need to know your team!');
}
//TODO:Make some super function which sets endtime for connection

this.endTime = Date.now()+5000;


this.route.forEach(function(point) {
    //Check that hex is free to use
    dpd.routenodes.get({q: point.q, r: point.r},function(node){
        if (node.length === 0) {
            dpd.routenodes.post({q: point.q, r: point.r, connection: this.id });
        } else {
            error('connection','Connection is blocked by other connection! in Q:'+point.q+' R:'+point.r);
        }
    });
});
emit('connection:created',this);