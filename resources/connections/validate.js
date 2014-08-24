//Remove all old connections
dpd.connections.get({endTime: {$lte: Date.now()}},function(result,err){
    if(err) return console.log(err);
    result.forEach(function(entry) {
        emit('connection:delete',entry);
        dpd.connections.del(entry.id,function(){
            if(err) return console.log(err);
        });
    });
});