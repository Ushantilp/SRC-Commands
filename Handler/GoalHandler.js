(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		// Set Goal
		if (command.equalsIgnoreCase('setgoal')) {
			if (args.length < 1) {
				$.say("Usage: !setgoal {Goal Text}.");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				goalData = argument.slice(modeName+1);
			$.setIniDbString('SRCTableGoal', modeName, goalData);
			$.say("Goal data for " + modeName + " successfully set!");
		}

		// Del Goal
		if (command.equalsIgnoreCase('delgoal')) {
			if (args.length > 0) {
				$.say("Usage: !delgoal");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.setIniDbString('SRCTableGoal', modeName, 'undefined');
			$.say("Goal data for " + modeName + " successfully deleted!");
		}

		// Get Goal
		if (command.equalsIgnoreCase('goal')) {
			var modeName = state,
				goalData = $.getIniDbString('SRCTableGoal', modeName, 'undefined');
			if (modeName == 'unset') {
				$.say("Please set a mode.");
				return;
			}
			if (goalData == "undefined") {
				$.say("Set a Goal with !setgoal");
				return;
			}
			$.say(goalData);
			return;
		}

	});
})();