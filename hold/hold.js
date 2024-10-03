module.exports = function(RED) {
    "use strict";
    function holdNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        var msg = {};
        node.context().storedmessage = node.context().storedmessage || null;
	node.status({"shape":"dot","fill":"grey","text":"No message in buffer"})
        this.on('input', function (msg) {
            if ((msg.trigger==null)||(msg.trigger!=true)) {
              node.context().storedmessage = msg;
	      node.status({"shape":"dot","fill":"blue","text":"Message hold"})
            } else {
              if(node.context().storedmessage!=null) {
                node.send(node.context().storedmessage);
		node.status({"shape":"dot","fill":"green","text":"Message triggered"})
              } else {
                node.warn("Hold '"+n.name+"' triggered without message in buffer.");
		node.status({"shape":"dot","fill":"yellow","text":"Triggered without message in buffer"})
              }
            }
        });
    }
    RED.nodes.registerType("hold",holdNode);
}
