dpd.hexes.get({q: this.q, r: this.r}, function(hexes){
    logger("Trying to create new hex:");
    if ( hexes.length === 0 ) {
        logger("Created new hex:");
        console.log(this);
        emit('hex:create',this);
    } else {
        error('q', "Block already exists");
    }
});

function logger(message){
    console.log(Date()+": "+message);
}