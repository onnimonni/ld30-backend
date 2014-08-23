//check that there's no node already in place
dpd.routenodes.get({q: this.q, r: this.r}, function(nodes){
    logger("Trying to create new node:");
    if ( nodes.length === 0 ) {
        logger("Created new route node:");
        console.log(this);
    } else {
        error('q', "Connection is blocked");
    }
});

function logger(message){
    console.log(Date()+": "+message);
}