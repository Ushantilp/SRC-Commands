/*################################### INFO ######################################*/
/*This Script is Completely work in Progress and i'm testing Around with some Parts of the WE Handler Code to get what i want to do with the PBHandler
ATM: It didn't work as intendet and some parts are Only test Snippeds*/
/*################################### INFO ######################################*/

(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		/* ########################## PB Workaround ######################### */
		// Set PB
		if (command.equalsIgnoreCase('setpb')) {
			if (args.length < 1) {
				$.say("Usage: !setpb {PB Time}.");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				pbData = argument.slice(modeName+1);
			$.setIniDbString('SRCTablePB', modeName, pbData);
			$.say("PB time for " + modeName + " successfully set!");
		}

		// Del PB
		if (command.equalsIgnoreCase('delpb')) {
			if (args.length > 0) {
				$.say("Usage: !delpb");
				return;
			}
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			$.setIniDbString('SRCTablePB', modeName, 'undefined');
			$.say("PB Time for " + modeName + " successfully deleted!");
		}

		// Read PB
		if (command.equalsIgnoreCase('pb')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				game = $.getIniDbString('SRCTableGame', modeName, state);
			category = $.getIniDbString('SRCTableCat', modeName, 'undefined');
			player = $.getIniDbString('SRCTablePlayer', modeName, 'undefined');
			var1 = $.getIniDbString('SRCTableVar1', modeName, 'undefined');
			var2 = $.getIniDbString('SRCTableVar2', modeName, 'undefined');
			var3 = $.getIniDbString('SRCTableVar3', modeName, 'undefined');
			var4 = $.getIniDbString('SRCTableVar4', modeName, 'undefined');
			var5 = $.getIniDbString('SRCTableVar5', modeName, 'undefined');
			var6 = $.getIniDbString('SRCTableVar6', modeName, 'undefined');
			var7 = $.getIniDbString('SRCTableVar7', modeName, 'undefined');
			var8 = $.getIniDbString('SRCTableVar8', modeName, 'undefined');
			var9 = $.getIniDbString('SRCTableVar9', modeName, 'undefined');
			varValueArray = [],
				// API-CallZeugs
				url = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/category/" + category + "?";
			urlPlayer = "https://www.speedrun.com/api/v1/users/" + player;
			urlPBs = "https://www.speedrun.com/api/v1/users/" + player + "/personal-bests?";
			urlPBTest = "https://www.speedrun.com/api/v1/runs?game=" + game + "&user=" + player + "&category=" + category + "&var-" + var1 + "&var-" + var2 + "&status=verified&orderby=date&direction=desc"
			varString = "";
			querystring = "top=1&embed=game,variables,category";
			querystringPB = "&status=verified&orderby=date&direction=desc";

			// JSONs
			playerJSON = JSON.parse($.customAPI.get(urlPlayer).content);
			pbJSON = JSON.parse($.customAPI.get(urlPBs).content);
			/*			lvlJSON = JSON.parse($.customAPI.get(urlLvl).content);
						lvlGameJSON = JSON.parse($.customAPI.get(urlLvlGame).content);
						lvlCatJSON = JSON.parse($.customAPI.get(urlLvlCat).content);
						lvlVarJSON = JSON.parse($.customAPI.get(urlLvl + "/variables/").content);
						lvlILVarJSON = JSON.parse($.customAPI.get(urlLvlVar + var1.split("=")[0]).content);
						lvlILNameJSON = JSON.parse($.customAPI.get(urlLvlVar + ilvar.split("=")[0]).content);
			*/

			if (modeName == 'unset') {
				$.say("Please set a mode.");
				return;
			}
			response1 = JSON.parse($.customAPI.get(url + querystring).content);
			var catName = response1.data.category.data.name,
				gameName = response1.data.game.data.names.international,
			playerCall = playerJSON.data.names.international

			/* ########################## Testing Stuff Start ######################### */

			Testi = 'https://www.speedrun.com/api/v1/runs?user=' + player + '&category=' + category +'&status=verified&orderby=date&direction=desc'
			Testcall = JSON.parse($.customAPI.get(Testi).content);
			TestCounter = 0;
			VarTestp1 = var1.split("=")[0]
			VarTestp2 = var1.split("=")[1]
			Var2Testp1 = var2.split("=")[0]
			Var2Testp2 = var2.split("=")[1]
			Var3Testp1 = var3.split("=")[0]
			Var3Testp2 = var3.split("=")[1]

			TestTestcall = Testcall.data[0].values[VarTestp1]
			TestTestcall2 = Testcall.data[0].values[Var2Testp1]
			TestTestcall3 = Testcall.data[0].values[Var3Testp1]

			// PB Call Loop
			if (TestTestcall == VarTestp2 && TestTestcall2 == Var2Testp2 && TestTestcall3 == Var3Testp2) {
				TestCallTest = Testcall.data[TestCounter].values[VarTestp1];
				TestCallTest2 = Testcall.data[TestCounter].values[Var2Testp1];
				TestCallTest3 = Testcall.data[TestCounter].values[Var3Testp1];
			}
			else (TestTestcall != VarTestp2 || TestTestcall2 != Var2Testp2 || TestTestcall3 != Var3Testp2); {
				for (var TestCounter; TestCounter <= 11; TestCounter++) {
						try {
						TestCallTest = Testcall.data[TestCounter].values[VarTestp1]
						TestCallTest2 = Testcall.data[TestCounter].values[Var2Testp1]
						TestCallTest3 = Testcall.data[TestCounter].values[Var3Testp1]
							if (TestCallTest == undefined || TestCallTest2 == undefined || TestCallTest3 == undefined);
					}
						catch (err) { };
					if (TestCallTest == VarTestp2 && TestCallTest2 == Var2Testp2 && TestCallTest3 == Var3Testp2) {
							var bestTime = Testcall.data[TestCounter].times.primary
							var NoTime = Testcall.data[TestCounter].times.primary
							bestTime = bestTime.replace('H', 'h ');
							bestTime = bestTime.replace('M', 'm ');
							bestTime = bestTime.replace('S', 's');
							var TestTime = bestTime.substring(2)
							break;
						}
					}
			}
			if (NoTime == undefined) {
				$.consoleLn("There is no PB for '" + gameName + "' - '" + catName + "' from " + playerCall);
			}
			else $.consoleLn("Time Test Call: " + playerCall +"'s PB in " + gameName + " - " + catName + " is " + TestTime);
			/* ########################## Testing Stuff Ende ######################### */

			/* ######################### PB Workaround Start ######################### */
//			$.consoleLn()
		}

	});
})();