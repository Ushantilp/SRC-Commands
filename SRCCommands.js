/*############################################################################################################
###### @Name:       SRC-Commands                                                                        ######
###### @Desciption: Plugin for Phantombot, to get infos from Speedrun.com in your Twitch Chat           ######
###### @Copyright:  2024 by Ushanti                                                                     ######
###### @Link:       https://www.twitch.tv/entiq_tv                                                      ######
######                                                                                                  ######
###### Credits:	                                                                                        ######
###### @Chillinock - For the Help with some of the Code at the Beginning                                ######
###### (https://www.twitch.tv/chillinock)                                                               ######
######                                                                                                  ######
###### @gmt2001 (https://github.com/gmt2001) & @BrandenB (https://github.com/BrandenB)                  ######
###### for Making the Awesome Phantombot (https://phantombot.dev)                                       ######
######                                                                                                  ######
###### @Phantombot-Community you can find them on Discord (https://discord.com/invite/YKvMd78)          ######
######                                                                                                  ######
###### @pelgerr (https://github.com/pelgerr) For the mode function that gave me the idea                ######
######                                                                                                  ######
############################################################################################################*/
(function () {
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
		//ID Caller
		$.registerChatCommand('./custom/SRC-Commands/SRCCaller.js', 'src', 2);
		//Mode Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/ModeHandler.js', 'mode', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/ModeHandler.js', 'getmode', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/ModeHandler.js', 'listmode', 2);
		//Info Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/InfoHandler.js', 'setlr', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/InfoHandler.js', 'setgoal', 2);
		//Del Handling
		$.registerChatCommand('./custom/SRC-Commands/Handler/DelHandler.js', 'resetmode', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/DelHandler.js', 'delmode', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/DelHandler.js', 'delplayer', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/DelHandler.js', 'dellr', 2);
		$.registerChatCommand('./custom/SRC-Commands/Handler/DelHandler.js', 'delgoal', 2);
		//Read Data Commands
		$.registerChatCommand('./custom/SRC-Commands/Handler/WRHandler.js', 'wr', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/PBHandler.js', 'pb', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/InfoHandler.js', 'goal', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/InfoHandler.js', 'lr', 7);
		$.registerChatCommand('./custom/SRC-Commands/Handler/LBHandler.js', 'lb', 7);
	
	});
})();
