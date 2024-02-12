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
		$.registerChatCommand('./custom/srcCommands/Handler/ModeHandler.js', 'mode', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/ModeHandler.js', 'getmode', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/ModeHandler.js', 'listmode', 2);
		//Player ID Handling
		$.registerChatCommand('./custom/srcCommands/Handler/PlayerHandler.js', 'setplayerid', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/PlayerHandler.js', 'delplayerid', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/PlayerHandler.js', 'getplayerid', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/PlayerHandler.js', 'getplayername', 2);
		// IL Handling
		$.registerChatCommand('./custom/srcCommands/Handler/IlHandler.js', 'setil', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/IlHandler.js', 'delil', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/IlHandler.js', 'getil', 2);
		//Game ID Handling
		$.registerChatCommand('./custom/srcCommands/Handler/GameHandler.js', 'setgameid', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/GameHandler.js', 'delgameid', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/GameHandler.js', 'getgameid', 2);
//		$.registerChatCommand('./custom/srcCommands/Handler/GameHandler.js', 'getgamename', 2);
		//Category ID Handling
		$.registerChatCommand('./custom/srcCommands/Handler/CatHandler.js', 'setcatid', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/CatHandler.js', 'delcatid', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/CatHandler.js', 'getcatid', 2);
//		$.registerChatCommand('./custom/srcCommands/Handler/CatHandler.js', 'getcatname', 2);
		//Level ID Handling
		$.registerChatCommand('./custom/srcCommands/Handler/LvLHandler.js', 'setlvl', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/LvLHandler.js', 'dellvl', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/LvLHandler.js', 'getlvl', 2);
		//Variables ID Handling
		$.registerChatCommand('./custom/srcCommands/Handler/VarHandler.js', 'setvar', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/VarHandler.js', 'delvar', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/VarHandler.js', 'getvar', 2);
//		$.registerChatCommand('./custom/srcCommands/Handler/VarHandler.js', 'getvarname', 2);
		//Other Data Handling
		$.registerChatCommand('./custom/srcCommands/Handler/PBHandler.js', 'setpb', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/PBHandler.js', 'delpb', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/GoalHandler.js', 'setgoal', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/GoalHandler.js', 'delgoal', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/LastRunHandler.js', 'setlr', 2);
		$.registerChatCommand('./custom/srcCommands/Handler/LastRunHandler.js', 'dellr', 2);
		//Read Data Commands
		$.registerChatCommand('./custom/srcCommands/Handler/WRHandler.js', 'wr', 7);
		$.registerChatCommand('./custom/srcCommands/Handler/PBHandler.js', 'pb', 7);
		$.registerChatCommand('./custom/srcCommands/Handler/GoalHandler.js', 'goal', 7);
		$.registerChatCommand('./custom/srcCommands/Handler/LastRunHandler.js', 'lr', 7);
		$.registerChatCommand('./custom/srcCommands/Handler/LBHandler.js', 'lb', 7);
	
	});
})();

/*
TODO:

9. 	PB Command schreiben 
8. 	PB um Individual Level erweitern
7. 	Merging IlHandler.js und LvLHandler.js
6. 	ID & Kürzel & Name Nutzbar machen
5.	Namen ausgeben lassen für Game, Category und Variablen (getname Command)
4. 	Weitere Variablen erst ermöglichen wenn vorherige gesetzt wurden
		(if var ID1 undefined = nutze erst var ID1 usw.)
3.	Wenn datenbank eintrag "Null" oder "undefined" entsprechende Fehlermeldung ausgeben
2. 	Code aufräumen [WIP]
1.	Credits hinzufügen

DONE:
1. 	ID Commands überarbeiten (set, del, get)
2. 	Variablen Löschbar machen?
3. 	Modes aus den Commands entfernen
4.	Variablen Call Fixen
		(variablen wurden im call nicht mit einbezogen)
5.  Workaround für den PB Command geschrieben
6. 	Mode Handling überarbeiten
		!addmode [erstellt einen neuen Mode]?,
		!setmode [legt einen Mode fest]?,
		!listmode [listet alle Modes auf],
		!getmode [gibt den aktuellen Mode aus]
7.	WR Command um Individual Level erweitern 
8.	WRHandler an Mehrspieler Spiele anpassen
		(anzeige von mehr als einem Spieler)
9.	WRHandler.js Error ausgabe wenn keine Runs gefunden werden
		(Weil zB mit den Entsprechenden Variablen keine Runs gibt )
*/
