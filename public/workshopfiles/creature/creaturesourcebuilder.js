// A separate sourcebuilder.js script allow different Programmer pages 
// (for example the dedicated programmer page for a workshop like Code Creatures) 
// to reuse the receptiontransmission.js script
// while building the code to emit to the server in their own way.
// (for example the Creature Programmer insert the user code into a Processing script complete with a class definition)

// the sourcebuilder only concern is to build and give a code object ready to be sent to the paysage server

getCompleteCodeObject = function (callback) {

    var codeid = document.getElementById('codeid').value || document.getElementById('codeid').textContent;
    var playgroundid = document.getElementById('playgroundid').value;
    var mediatype = "text/processing";
    var client = "creature";
    var code = document.getElementById('code').value;

    $.get(

        "/workshopfiles/creature/creature.pde",

        function (originalsource) {

            var template = originalsource;
            var match = /\/\/kids code here/;

            completecode = template.replace(match, code);

            var data = {
                codeid: codeid,
                playgroundid: playgroundid,
                mediatype: mediatype,
                client: client,
                code: completecode
            };
            callback(data);

        },

        "text");

};