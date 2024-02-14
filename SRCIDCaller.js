(function () {
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

	// URL ID Caller
		if (command.equalsIgnoreCase('callid')) {
			if (args.length != 1) {
				$.consoleLn("Usage: !callid {Leaderboard URL from Speedrun.com}");
				return;
			}
			var URLCall = String(args[0]),
				Split1 = URLCall.split(".com/")[1];
			Split2 = Split1.split("?h=")[0];
			$.consoleLn(Split2)
		}
	});
})();