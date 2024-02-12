(function () {
    //Database Handling
    // Read current state from database
    var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
    $.bind('command', function (event) {
        var command = event.getCommand(),
            args = event.getArgs(),
            argument = String(event.getArguments()),
            sender = event.getSender();

        //Level ID Handling	
        // Set Level ID
        if (command.equalsIgnoreCase('setlvl')) {
            if (args.length != 1) {$.say("Usage: !setlvl {SRC IL Level ID}.");
                return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
                lvlID = argument.slice(modeName+1);
            $.setIniDbString('SRCTableLvL', modeName, lvlID);
            $.setIniDbString('SRCTableILstate', modeName, 'true');
            $.say("Level ID for " + modeName + " successfully set to " + lvlID + "!");
        }

        // Del Level ID
        if (command.equalsIgnoreCase('dellvl')) {
            if (args.length != 0) {$.say("Usage: !dellvl");
                return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
            $.setIniDbString('SRCTableLvL', modeName, 'undefined');
            $.setIniDbString('SRCTableILstate', modeName, 'undefined')
            $.say("Level ID for " + modeName + " successfully deleted!");
        }

        // Get Level ID
        if (command.equalsIgnoreCase('getlvl')) {
            if (args.length != 0) {$.say("Usage: !getlvl");
                return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state),
                lvlID = $.getIniDbString('SRCTableLvL', modeName, lvlID);
            ilstate = $.getIniDbString('SRCTableILstate', modeName, state),
            $.say("The current Level ID for " + modeName + " is set to: " + lvlID + " and IL status is set to: " + ilstate);
        }

	});
})();