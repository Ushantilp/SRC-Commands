(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		// Del Mode
		if (command.equalsIgnoreCase('delmode')) {
			if (args.length != 0) {
				$.say("Usage: !delmode");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.inidb.del('SRCTableModes', modeName);
			$.inidb.del('SRCTableGame', modeName);
			$.inidb.del('SRCTableCat', modeName);
			$.inidb.del('SRCTableGoal', modeName);
			$.inidb.del('SRCTableIL', modeName);
			$.inidb.del('SRCTableLvL', modeName);
			$.inidb.del('SRCTableILstate', modeName);
			$.inidb.del('SRCTableLR', modeName);
			$.inidb.del('SRCTablePlayer', modeName);
			$.inidb.del('SRCTableVar1', modeName);
			$.inidb.del('SRCTableVar2', modeName);
			$.inidb.del('SRCTableVar3', modeName);
			$.inidb.del('SRCTableVar4', modeName);
			$.inidb.del('SRCTableVar5', modeName);
			$.inidb.del('SRCTableVar6', modeName);
			$.inidb.del('SRCTableVar7', modeName);
			$.inidb.del('SRCTableVar8', modeName);
			$.inidb.del('SRCTableVar9', modeName);
			$.setIniDbString('SRCstates', 'currentState', undefined);
			$.say("All Data for " + modeName + " successfully deleted!");
			return;
		}
		// Reset Mode
		if (command.equalsIgnoreCase('resetmode')) {
			if (args.length != 0) {
				$.say("Usage: !resetmode");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.inidb.del('SRCTableGame', modeName);
			$.inidb.del('SRCTableCat', modeName);
			$.inidb.del('SRCTableGoal', modeName);
			$.inidb.del('SRCTableIL', modeName);
			$.inidb.del('SRCTableLvL', modeName);
			$.inidb.del('SRCTableILstate', modeName)
			$.inidb.del('SRCTableLR', modeName);
			$.inidb.del('SRCTableModes', modeName);
			$.inidb.del('SRCTablePlayer', modeName);
			$.inidb.del('SRCTableVar1', modeName);
			$.inidb.del('SRCTableVar2', modeName);
			$.inidb.del('SRCTableVar3', modeName);
			$.inidb.del('SRCTableVar4', modeName);
			$.inidb.del('SRCTableVar5', modeName);
			$.inidb.del('SRCTableVar6', modeName);
			$.inidb.del('SRCTableVar7', modeName);
			$.inidb.del('SRCTableVar8', modeName);
			$.inidb.del('SRCTableVar9', modeName);
			$.say("All Data for " + modeName + " successfully resettet!");
			return;
		}
		// Del Player
		if (command.equalsIgnoreCase('delplayer')) {
			if (args.length != 0) {
				$.say("Usage: !delplayer");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.inidb.del('SRCTablePlayer', modeName);
			$.say("Player ID for " + modeName + " successfully deleted!");
		}
		// Del Lastrun
		if (command.equalsIgnoreCase('dellr')) {
			if (args.length > 0) {
				$.say("Usage: !dellr");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.inidb.del('SRCTableLR', modeName);
			$.say("Lastrun data for " + modeName + " successfully deleted!");
		}
		// Del Goal
		if (command.equalsIgnoreCase('delgoal')) {
			if (args.length > 0) {
				$.say("Usage: !delgoal");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.inidb.del('SRCTableGoal', modeName);
			$.say("Goal data for " + modeName + " successfully deleted!");
		}
	});
})();