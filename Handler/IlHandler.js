(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		//IL ID Handling
		// Variable 1-n
		if (command.equalsIgnoreCase('setil')) {
			if (args.length != 2) {
				$.say("Usage: !setil {SRC-IL-VariablesID} {SRC-IL-ValueID}.");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				ilID = String(args[0]),
				ilValue = String(args[1]),
				ilGesamt = ilID + "=" + ilValue;
			$.setIniDbString('SRCTableIL', modeName, ilGesamt);
			$.say("IL Variable & Value (Variable: " + ilID + "& Value: " + ilValue + ") for " + modeName + " successfully set!");
		}

		// Del IL ID
		if (command.equalsIgnoreCase('delil')) {
			if (args.length > 0) {
				$.say("Usage: !delil");
				return;
			}
			var	modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.setIniDbString('SRCTableIL', modeName, 'undefined');
			$.say("IL Variable & Value for " + modeName + " successfully deleted!");
		}

		// Get IL ID
		if (command.equalsIgnoreCase('getil')) {
			if (args.length > 0) {
				$.say("Usage: !getil");
				return;
			}
			var	modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.say("IL Variable & Value for" + modeName + " is set to: (Variable: " + ilID + "& Value: " + ilValue + ")");

		}

	});
})();
