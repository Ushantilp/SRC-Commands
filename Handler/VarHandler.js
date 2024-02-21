(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		//Variables ID Handling
		// Variable 1-n
		if (command.equalsIgnoreCase('setvar')) {
			if (args.length != 3) {
				$.say("Usage: !setvar {Variables Num} {SRC-VariablesID} {SRC-ValueID}.");
				return;
			}
			var varNumber = String(args[0]),
				modeName = $.getIniDbString('SRCstates', 'currentState', state),
				varID = String(args[1]),
				varValue = String(args[2]),
				varGesamt = varID + "=" + varValue,
				dbStringName = 'SRCTableVar' + varNumber;
			$.setIniDbString(dbStringName, modeName, varGesamt);
			$.say("Variable & Value for ID" + varNumber + " (Variable: " + varID + "& Value: " + varValue + ") for " + modeName + " successfully set!");
		}

		// Del variables ID
		if (command.equalsIgnoreCase('delvar')) {
			if (args.length != 1) {
				$.say("Usage: !delvar {variables Num}");
				return;
			}
			var varNumber = String(args[0]),
				dbStringName = 'SRCTableVar' + varNumber;
			modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.inidb.del(dbStringName, modeName);
			$.say("variables ID for " + modeName + " successfully deleted!");
		}

		// Get variables ID
		if (command.equalsIgnoreCase('getvar')) {
			if (args.length != 1) {
				$.say("Usage: !getvar {variables Num}");
				return;
			}
			var varNumber = String(args[0]),
				dbStringName = 'SRCTableVar' + varNumber;
			modeName = $.getIniDbString('SRCstates', 'currentState', state);
			varGesamt = $.getIniDbString(dbStringName, modeName, varGesamt);
			$.say("Variable " + varNumber + " for " + modeName + " is set to: " + varGesamt);

		}

	});
})();
