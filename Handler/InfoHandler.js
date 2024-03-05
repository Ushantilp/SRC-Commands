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
				lrData = argument.slice(modeName + 1);
			$.setIniDbString('SRCTableLR', modeName, lrData);
			$.say("Lastrun data for " + modeName + " successfully set!");
		}

		// Get Lastrun
		if (command.equalsIgnoreCase('lr')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			lrData = $.getIniDbString('SRCTableLR', modeName, 'undefined');
			if (modeName == 'undefined') {
				$.say("Please set a mode.");
				return;
			}
			if ($.getIniDbString('SRCTableGame', modeName, 'undefined') == 'undefined') {
				$.say('Set a Game first! Usage: !src {SRC-Leaderboard URL}');
				return;
			}
			if (lrData == "undefined") {
				$.say("Set Last Run data with !setlr");
				return;
			}
			$.say(lrData);
			return;
		}
		// Set Goal
		if (command.equalsIgnoreCase('setgoal')) {
			if (args.length < 1) {
				$.say("Usage: !setgoal {Goal Text}.");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				goalData = argument.slice(modeName + 1);
			$.setIniDbString('SRCTableGoal', modeName, goalData);
			$.say("Goal data for " + modeName + " successfully set!");
		}

		// Get Goal
		if (command.equalsIgnoreCase('goal')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			goalData = $.getIniDbString('SRCTableGoal', modeName, 'undefined');
			if (modeName == 'undefined') {
				$.say("Please set a mode.");
				return;
			}
			if ($.getIniDbString('SRCTableGame', modeName, 'undefined') == 'undefined') {
				$.say('Set a Game first! Usage: !src {SRC-Leaderboard URL}');
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
