(function() {
	//Database Handling
	// Read current state from database
    var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
    $.bind('command', function(event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
            sender = event.getSender();
	});
	
// Register commands and set premission levels (0 = broadcaster, 1 = Editor, 2 = moderator, 7 = viewer)
	$.bind('initReady', function () {
		//Mode Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/ModeHandler.js', 'mode', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/ModeHandler.js', 'getmode', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/ModeHandler.js', 'listmode', 2);
		//Player ID Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/PlayerHandler.js', 'setplayerid', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/PlayerHandler.js', 'delplayerid', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/PlayerHandler.js', 'getplayerid', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/PlayerHandler.js', 'getplayername', 2);
		// IL Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/IlHandler.js', 'setil', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/IlHandler.js', 'delil', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/IlHandler.js', 'getil', 2);
		//Game ID Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/GameHandler.js', 'setgameid', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/GameHandler.js', 'delgameid', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/GameHandler.js', 'getgameid', 2);
//		$.registerChatCommand('./custom/SRC-Commands/Handler/GameHandler.js', 'getgamename', 2);
		//Category ID Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/CatHandler.js', 'setcatid', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/CatHandler.js', 'delcatid', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/CatHandler.js', 'getcatid', 2);
//		$.registerChatCommand('./custom/SRC-Commands/Handler/CatHandler.js', 'getcatname', 2);
		//Level ID Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/LvLHandler.js', 'setlvl', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/LvLHandler.js', 'dellvl', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/LvLHandler.js', 'getlvl', 2);
		//Variables ID Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/VarHandler.js', 'setvar', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/VarHandler.js', 'delvar', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/VarHandler.js', 'getvar', 2);
//		$.registerChatCommand('./custom/SRC-Commands/Handler/VarHandler.js', 'getvarname', 2);
		//Other Data Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/PBHandler.js', 'setpb', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/PBHandler.js', 'delpb', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/GoalHandler.js', 'setgoal', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/GoalHandler.js', 'delgoal', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/LastRunHandler.js', 'setlr', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/LastRunHandler.js', 'dellr', 2);
		//Read Data Commands
		$.registerChatCommand('./custom/SRC-Commands/Handler/WRHandler.js', 'wr', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/PBHandler.js', 'pb', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/GoalHandler.js', 'goal', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/LastRunHandler.js', 'lr', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/LBHandler.js', 'lb', 7);
	
	});
})();