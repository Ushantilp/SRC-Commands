(function() {
	//Database Handling
	// Read current state from database
    var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
    $.bind('command', function(event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
            sender = event.getSender();
            modeListing = [];

	// Mode handling
        if (command.equalsIgnoreCase('mode')) {
            if (args.length < 1) {$.say("Mode currently set to " + state); 
            return;
            }
            state = String(args[0].toLowerCase());
            $.setIniDbString('SRCstates', 'currentState', state);
            $.say("Mode successfully changed to " + state);
        } 
		
		// get Mode
        if (command.equalsIgnoreCase('getmode')) {
            if (args.length != 0) {$.say("Usage: !getmode");
            return;
            }
            var modeName = $.getIniDbString('SRCstates', 'currentState', state);
            $.say("The current Mode is " + modeName);
		}
		
		// Mode list
		var modeName = $.getIniDbString('SRCstates', 'currentState', state);
            $.setIniDbString('SRCTableModes', modeName, ''); 

        // Get Mode List
        if (command.equalsIgnoreCase('listmode')) {
            var modeName = state;
            var mList = $.inidb.GetKeyList('SRCTableModes', ''),
                modeList = [];
            for (idx in mList) {
                if ($.permCom(sender, mList[idx], '') === 0) {
                    modeList.push(' '+mList[idx]);
                }
            }

                $.say(modeList);
                return;
           
        }

	});
})();