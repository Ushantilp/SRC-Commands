(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		// Leaderboard
		if (command.equalsIgnoreCase('lb')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				game = $.getIniDbString('SRCTableGame', modeName, state);
			category = $.getIniDbString('SRCTableCat', modeName, 'undefined');
			url = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/category/" + category + "?";
			lbUrl = JSON.parse($.customAPI.get(url).content);
			calllbUrl = lbUrl.data.weblink;
			gameNameJSON = JSON.parse($.customAPI.get("https://www.speedrun.com/api/v1/games/" + game).content);
			callGameName = gameNameJSON.data.names.international;
			catNameJSON = JSON.parse($.customAPI.get("https://www.speedrun.com/api/v1/categories/" + category).content);
			callCatName = catNameJSON.data.name;
			if (modeName == 'unset') {
				$.say("Please set a mode.");
				return;
			}

			$.say("The Leaderboard for " + callGameName + " - " + callCatName + ": " + calllbUrl);
			return;
		}

	});
})();

