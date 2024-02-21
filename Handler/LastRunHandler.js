(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		// Lastrun
		if (command.equalsIgnoreCase('setlr')) {
			if (args.length < 1) {
				$.say("Usage: !setlr {Lastrun Text}.");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				lrData = argument.slice(modeName+1);
			$.setIniDbString('SRCTableLR', modeName, lrData);
			$.say("Lastrun data for " + modeName + " successfully set!");
		}

		// Del Lastrun
		if (command.equalsIgnoreCase('dellr')) {
			if (args.length > 0) {
				$.say("Usage: !dellr");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.setIniDbString('SRCTableLR', modeName, '');
			$.say("Lastrun data for " + modeName + " successfully deleted!");
		}

		// Get Lastrun
		if (command.equalsIgnoreCase('lr')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
				lrData = $.getIniDbString('SRCTableLR', modeName, 'undefined');
			if (modeName == 'unset') {
				$.say("Please set a mode.");
				return;
			}
			if (lrData == "undefined") {
				$.say("Set Last Run data with !setlr");
				return;
			}
			$.say(lrData);
			return;
		}

	});
})();
