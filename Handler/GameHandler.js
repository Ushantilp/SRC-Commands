(function() {
	//Database Handling
	// Read current state from database
    var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
    $.bind('command', function(event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
            sender = event.getSender();

		//Game ID Handling
        // Set Game ID
        if (command.equalsIgnoreCase('setgameid')) {
            if (args.length != 1) {$.say("Usage: !setgameid {SRC-GameID}.");
            return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
                gameID = argument.slice(modeName+1);
            $.setIniDbString('SRCTableGame', modeName, gameID);
            $.say("Game ID for " + modeName + " successfully set to " + gameID + "!");
        }
		
		// Del Game ID
        if (command.equalsIgnoreCase('delgameid')) {
            if (args.length != 0) {$.say("Usage: !delgameid");
            return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
            $.setIniDbString('SRCTableGame', modeName, 'undefined');
            $.say("Game ID for " + modeName + " successfully deleted!");
        }
				
		// Get Game ID
        if (command.equalsIgnoreCase('getgameid')) {
            if (args.length != 0) {$.say("Usage: !getgameid");
            return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				gameID = $.getIniDbString('SRCTableGame', modeName, gameID);
            $.say("The current GameID for " + modeName + " is set to: " + gameID);
        }
		
	});
})();
