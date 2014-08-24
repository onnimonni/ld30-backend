//get latest game
console.log("Start a new game!");
dpd.games.get({$sort: {startTime: -1}, $limit: 1}, function(game,err) {
    if (game.length !== 0) {
        console.log("Checking winner!");
        //This isn't the first game
        dpd.teams.get({$sort: {resources: -1}, $limit: 1}, function(winner,err) {
            console.log("Winner is:");
            console.log(winner);
            console.log(err);
            if(err) return console.log(err);
            //End the game
            dpd.games.put(game[0].id,{winnerTeamID: winner.id,endTime:Date.now()},function(result,err) {
                if(err) return console.log(err);
                emit('game:end',result);    
            });
        });     
    }
});
//Remove all hexes
console.log("Removing stuff:");
dpd.hexes.get(function(result,err){
    console.log("Removing hexes:");
    console.log(result);
    if(err) return console.log(err);
    result.forEach(function(entry) {
        dpd.hexes.del(entry.id,function(){});
    });
});
//Remove all connections
dpd.connections.get(function(result,err){
    console.log("Removing connections:");
    console.log(result);
    if(err) return console.log(err);
    result.forEach(function(entry) {
        dpd.connections.del(entry.id,function(){});
    });
});

function generateRandomHex(qMin,rMin,qMax,rMax,owner) {
    console.log("Generating random Hex!");
    owner = owner || null;
    var qCoord, rCoord, randomType;
    var types = ['server','dome','factory'];
    qCoord = Math.floor(Math.random() * qMax) + qMin;
    rCoord = Math.floor(Math.random() * rMax) + rMin;
    randomType = types[Math.floor(Math.random()*types.length)];
    dpd.hexes.post({q: qCoord, r: rCoord, type: randomType, owner: owner}, function (hex,err){
        if(err) {
            //hex exists
            console.log("Creation error:");
            console.log(err);
            //try again
            //generateRandomHex(qMin,rMin,qMax,rMax,owner);
        }
    });
}

var _this = this;
console.log("Creating inital settings for teams.");
//Generate team start bases and reset money
dpd.teams.get(function(teams,err) {
    console.log("Looping teams:");
    console.log(_this);
    console.log("query params (_this):");
    teams.forEach(function(team){
        console.log("trying this team:");
        console.log(team);
        generateRandomHex(_this.qMin,_this.rMin,_this.qMax,_this.rMax,team.id);
        //Reset Team score and create one base
        dpd.teams.put(team.id,{resources: 10000},function(team,err){
            
            if(err) return console.log(err);
            console.log("changed resources to 10000 for team:"+team.id);
            console.log(team);
        });
    });
});

//Generate neutral hexes
console.log("Generating neutral hexes:");
var area = (this.qMax - this.qMin)*(this.rMax - this.rMin);
var divider = 20;
var serverAmount = Math.round(area/divider);

for (i = 0; i < serverAmount; i++) {
    console.log("Looping neutrals:");
    generateRandomHex(this.qMin,this.rMin,this.qMax,this.rMax);
}
emit('game:start',this);