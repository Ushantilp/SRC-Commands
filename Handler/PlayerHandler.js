(function() {
	//Database Handling
	// Read current state from database
    var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
    $.bind('command', function(event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
            sender = event.getSender();
		
	// Setting and editing IDs
		// Player ID Handling
	    // Set Player ID (only relevant for the PB Command)
        if (command.equalsIgnoreCase('setplayerid')) {
            if (args.length != 1) {$.say("Usage: !setplayerid {SRC-PlayerID}.");
            return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
                playerID = argument.slice(modeName+1);
            $.setIniDbString('SRCTablePlayer', modeName, playerID);
            $.say("Player ID for "+ modeName + " successfully set!");

        }
		
		// Del Player ID
		if (command.equalsIgnoreCase('delplayerid')) {
            if (args.length != 0) {$.say("Usage: !delplayerid");
            return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
            $.setIniDbString('SRCTablePlayer', modeName, 'undefined');
            $.say("Player ID for " + modeName + " successfully deleted!");
        }
		
		// Get Player ID
        if (command.equalsIgnoreCase('getplayerid')) {
            if (args.length != 0) {$.say("Usage: !getplayerid");
            return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				playerID = $.getIniDbString('SRCTablePlayer', modeName, playerID);
            $.say("The current Player for " + modeName + " is set to: " + playerID);
        }
		
		// Get Player Name
        if (command.equalsIgnoreCase('getplayername')) {
            var modeName = $.getIniDbString('SRCstate', 'currentState', state),
                playerID = $.getIniDbString('SRCTablePlayer', modeName, playerID);
				playerNameUrl = "https://www.speedrun.com/api/v1/users/" + playerID +"?";
				playerNameJSON = JSON.parse($.customAPI.get(playerNameUrl).content);
				playerNamecall = playerNameJSON.data.names.international;
            if (modeName == 'unset') {
                $.say("Please set a mode.");
                return;
            }

            $.say("The Current Player name is "+playerNamecall);
            return;
        }
		

	});
})();