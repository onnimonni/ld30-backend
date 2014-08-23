$(document).ready(function() {

  dpd.on('create', function(hex) {
    console.log('Something happened on socket');
    renderHex(hex);
  });

  dpd.hexes.get(function(hexes) {
    if (hexes) {
      hexes.forEach(function(h) {
        renderHex(h);
      });
    }
  });
  dpd.connections.get(function(paths) {
    if (paths) {
      paths.forEach(function(p) {
        renderPath(p);
      });
    }
  });

  $('#send-btn').click(sendHex);

  window.getHexesInWindow = function getHexesInWindow(qMin, rMin, qMax, rMax){
    var query = {$and: [{"q": {$gte:qMin}}, {"q": {$lte:qMax}},
                        {"r": {$gte:rMin}}, {"r": {$lte:qMax}}]};
    dpd.hexes.get(query, function (result) {
      console.log(result);
    });
  }

  function renderPath(path) {
    var $el = $('<li>');
    $el.append('<strong>' + path.type + ': </strong>');
    path.nodes.forEach(function(node) {
      $el.append('{Q:'+node.q+',R:'+node.r+'}');
    })
    $el.appendTo('#chatbox');
  }
  function renderHex(hex) {
    var $el = $('<li>');
    $el.append('<strong>' + hex.type + ': </strong>');
    $el.append('{Q:'+hex.q+',R:'+hex.r+'}');
    $el.appendTo('#chatbox');
  }

  function sendHex() {
    var type = $('#type').val();
    var qCoord = $('#qCoordinate').val();
    var rCoord = $('#rCoordinate').val();
    dpd.hexes.post({
      type: type,
      q: qCoord,
      r: rCoord
    }, function(message, err) {
      if (err) {
        if (err.message) {
          alert("Error message:"+err.message);
        } else if (err.errors) {
          var errors = "";
          if (err.errors.sender) {
            errors += err.errors.sender + "\n";
          } 
          if (err.errors.message) {
            errors += err.errors.message + "\n";
          } 
          alert("Errors:"+errors);
        }
      } else {
        alert('Success!');
        $('#message').val('');
      }
    });

    return false;
  }

});
