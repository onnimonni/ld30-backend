//Remove all old connections
dpd.connections.get({endTime: {$lte: Date.now()}},function(result,err){
    if(err) return console.log(err);
    result.forEach(function(entry) {
        emit('connection:delete',entry);
        dpd.routenodes.get({connection: this.id},function(result,err) {
            //Loop through all points and delete them
            result.forEach(function(point) {
            //get id so deletion is possible
            dpd.routenodes.del(point.id, function(result,err) {
                if (typeof err === 'object'){
                    console.log("Deletion of this routenode wasn't possible:");
                    console.log(point);
                    console.log(err);
                }
                });
            });
        });
    });
});