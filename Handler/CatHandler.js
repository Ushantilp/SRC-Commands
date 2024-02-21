(function () {
    //Database Handling
    // Read current state from database
    var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
    $.bind('command', function (event) {
        var command = event.getCommand(),
            args = event.getArgs(),
            argument = String(event.getArguments()),
            sender = event.getSender();

        //Category ID Handling	
        // Set Category ID
        if (command.equalsIgnoreCase('setcatid')) {
            if (args.length != 1) {$.say("Usage: !setcatid {SRC-CatID}.");
                return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
                catID = argument.slice(modeName+1);
            $.setIniDbString('SRCTableCat', modeName, catID);
            $.say("Category ID for " + modeName + " successfully set to " + catID + "!");
        }

        // Del Category ID
        if (command.equalsIgnoreCase('delcatid')) {
            if (args.length != 0) {$.say("Usage: !delcatid");
                return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
            $.inidb.del('SRCTableCat', modeName);
            $.say("Category ID for " + modeName + " successfully deleted!");
        }

        // Get Category ID
        if (command.equalsIgnoreCase('getcatid')) {
            if (args.length != 0) {$.say("Usage: !getcatid");
                return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state),
                catID = $.getIniDbString('SRCTableCat', modeName, catID);
            $.say("The current Category ID for " + modeName + " is set to: " + catID);
        }

	});
})();