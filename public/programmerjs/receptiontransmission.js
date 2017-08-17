var Paysage = Paysage || {};

(function() {
  "use strict";

  // Require a sourcebuilder script defining Paysage.getCompleteCodeObject()
  // Require a codeinitialization script defining Paysage.setCodeId()

  var playgroundid = document.getElementById('playgroundid').value;
  var clientType = document.getElementById('clientType').value;

  io = io({ query: {
    playgroundId: playgroundid,
    client: clientType
  }}).connect();

  document.getElementById('bouton').addEventListener('click', function() {
    var emitData = function(data) {
      console.log(data);
      io.emit('code update', data);
    };
    Paysage.getCompleteCodeObject(emitData);
  });

  Paysage.requestCode = function(objectId) {
    var data = {
      objectId: objectId
    };
    io.emit('request code', data);
  };

  function deleteCode(objectId) {
    var data = {
      objectId: objectId
    };
    io.emit('code delete', data);
  }

  io.on('objects list', function(data) {
    var objectIds = data.objectIds,
        $objects = $("#objects");
    $objects.empty();
    $objects.append(objectIds.map(function(objectId) {
      var $openLink = $("<a href='#'>").text(objectId);
      $openLink.click(function(event) {
        event.preventDefault();
        Paysage.requestCode(objectId);
      });
      var $deleteLink = $('<a class="glyphicon glyphicon-trash" href="#">');
      $deleteLink.click(function(event) {
        event.preventDefault();
        deleteCode(objectId);
      });
      return $('<li>').append($openLink).append(" - ").append($deleteLink);
    }));
  });

  io.on('source code', function(data) {
    Paysage.setCodeId(data.objectId);
    Paysage.setCode(data.code);
  });

}());
