(function() {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		// Reading data
		// World Record
		if (command.equalsIgnoreCase('wr')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state);
			var	game = $.getIniDbString('SRCTableGame', modeName, state);
			category = $.getIniDbString('SRCTableCat', modeName, 'undefined');
			isIL = $.getIniDbString('SRCTableILstate', modeName, state);
			lvl = $.getIniDbString('SRCTableLvL', modeName, 'undefined');
			ilvar = $.getIniDbString('SRCTableIL', modeName, 'undefined')
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
			// API-Calls
			url = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/category/" + category + "?";
			urlIL = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/level/" + lvl + "/" + category + "?";
			urlLvl = "https://www.speedrun.com/api/v1/levels/" + lvl + "?";
			urlLvlGame = "https://www.speedrun.com/api/v1/games/" + game + "?";
			urlLvlCat = "https://www.speedrun.com/api/v1/categories/" + category;
			urlLvlVar = "https://www.speedrun.com/api/v1/variables/";
			urlLvlIL = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/level/" + lvl + "/" + category + "?var-" + ilvar + "&";
			varString = "";
			querystring = "top=1&embed=game,variables,category";

			// JSONs
			lvlJSON = JSON.parse($.customAPI.get(urlLvl).content);
			lvlGameJSON = JSON.parse($.customAPI.get(urlLvlGame).content);
			lvlCatJSON = JSON.parse($.customAPI.get(urlLvlCat).content);
			lvlVarJSON = JSON.parse($.customAPI.get(urlLvl + "/variables/").content);
			lvlILVarJSON = JSON.parse($.customAPI.get(urlLvlVar + var1.split("=")[0]).content);
			lvlILNameJSON = JSON.parse($.customAPI.get(urlLvlVar + ilvar.split("=")[0]).content);

			if (modeName == 'undefined') {
				$.say("Please set a mode.");
				return;
			}
			if ($.getIniDbString('SRCTableGame', modeName, 'undefined') == 'undefined') {
				$.say('Set a Game first! Usage: !src {SRC-Leaderboard URL}');
				return;
			}

			// Individual Level is False
			if (isIL != 'true') {
				isIL = $.getIniDbString('SRCTableILstate', modeName, state);
				response1 = JSON.parse($.customAPI.get(url + querystring).content);
				if (response1.data.runs.length < 1) {
					$.say('There are no Runs in the Leaderboard for this Game/Category')
					return
				}

				// Build No varString (example: ID12313154=Value23525)
				if (var1 == 'undefined' && var2 == 'undefined' && var3 == 'undefined' && var4 == 'undefined' && var5 == 'undefined' && var6 == 'undefined' && var7 == 'undefined' && var8 == 'undefined' && var9 == 'undefined') {

					var catName = response1.data.category.data.name,
						gameName = response1.data.game.data.names.international,
						bestTime = response1.data.runs[0].run.times.primary;
					bestTime = bestTime.replace('H', 'h ');
					bestTime = bestTime.replace('M', 'm ');
					bestTime = bestTime.replace('S', 's ');

					// Runner & Guest Calls
					var RunnerCall = response1.data.runs[0].run.players;

					if (RunnerCall.length >= 1) {
						var GuestCall0 = RunnerCall[0].rel;
						var Runner0 = JSON.parse($.customAPI.get(RunnerCall[0].uri).content);
						if (GuestCall0 == 'guest' && Runner0.status == '404')
							var RunnerNameCall0 = RunnerCall[0].name;
						else if (GuestCall0 == 'guest' && Runner0.status != '404')
							var RunnerNameCall0 = Runner0.data.name;
						else (RunnerNameCall0 = Runner0.data.names.international);
						var Runner0Name = RunnerNameCall0
						var runnerString = Runner0Name;
					}
					if (RunnerCall.length >= 2) {
						var GuestCall1 = RunnerCall[1].rel;
						var Runner1 = JSON.parse($.customAPI.get(RunnerCall[1].uri).content);
						if (GuestCall1 == 'guest' && Runner1.status == '404')
							var RunnerNameCall1 = RunnerCall[1].name;
						else if (GuestCall1 == 'guest' && Runner1.status != '404')
							var RunnerNameCall1 = Runner1.data.name;
						else (RunnerNameCall1 = Runner1.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						var runnerString = Runner0Name + " & " + Runner1Name;
					}
					if (RunnerCall.length >= 3) {
						var GuestCall2 = RunnerCall[2].rel;
						var Runner2 = JSON.parse($.customAPI.get(RunnerCall[2].uri).content);
						if (GuestCall2 == 'guest' && Runner2.status == '404')
							var RunnerNameCall2 = RunnerCall[2].name;
						else if (GuestCall2 == 'guest' && Runner2.status != '404')
							var RunnerNameCall2 = Runner2.data.name;
						else (RunnerNameCall2 = Runner2.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						Runner2Name = RunnerNameCall2
						var runnerString = Runner0Name + ", " + Runner1Name + " & " + Runner2Name;
					}
					if (RunnerCall.length >= 4) {
						var GuestCall3 = RunnerCall[3].rel;
						var Runner3 = JSON.parse($.customAPI.get(RunnerCall[3].uri).content);
						if (GuestCall3 == 'guest' && Runner3.status == '404')
							var RunnerNameCall3 = RunnerCall[3].name;
						else if (GuestCall3 == 'guest' && Runner3.status != '404')
							var RunnerNameCall3 = Runner3.data.name;
						else (RunnerNameCall3 = Runner3.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						Runner2Name = RunnerNameCall2
						Runner3Name = RunnerNameCall3
						var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + " & " + Runner3Name;
					}
					if (RunnerCall.length >= 5) {
						var GuestCall4 = RunnerCall[4].rel;
						var Runner4 = JSON.parse($.customAPI.get(RunnerCall[4].uri).content);
						if (GuestCall4 == 'guest' && Runner4.status == '404')
							var RunnerNameCall4 = RunnerCall[4].name;
						else if (GuestCall4 == 'guest' && Runner4.status != '404')
							var RunnerNameCall4 = Runner4.data.name;
						else (RunnerNameCall4 = Runner4.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						Runner2Name = RunnerNameCall2
						Runner3Name = RunnerNameCall3
						Runner4Name = RunnerNameCall4
						var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + ", " + Runner3Name + " & " + Runner4Name;
					}


					$.say("The current WR for " + gameName + " - " + catName + " is " + bestTime.substring(2) + "by " + runnerString);

				}

				// Build varString (example: ID12313154=Value23525)
				if (var1 != 'undefined' || var2 != 'undefined' || var3 != 'undefined' || var4 != 'undefined' || var5 != 'undefined' || var6 != 'undefined' || var7 != 'undefined' || var8 != 'undefined' || var9 != 'undefined') {
					if (var1 != "undefined") {
						varString = varString + "var-" + var1 + "&";
						varValueArray.push(var1.split("=")[1])
					}

					if (var2 != "undefined") {
						varString = varString + "var-" + var2 + "&";
						varValueArray.push(var2.split("=")[1])
					}

					if (var3 != "undefined") {
						varString = varString + "var-" + var3 + "&";
						varValueArray.push(var3.split("=")[1])
					}

					if (var4 != "undefined") {
						varString = varString + "var-" + var4 + "&";
						varValueArray.push(var4.split("=")[1])
					}

					if (var5 != "undefined") {
						varString = varString + "var-" + var5 + "&";
						varValueArray.push(var5.split("=")[1])
					}

					if (var6 != "undefined") {
						varString = varString + "var-" + var6 + "&";
						varValueArray.push(var6.split("=")[1])
					}

					if (var7 != "undefined") {
						varString = varString + "var-" + var7 + "&";
						varValueArray.push(var7.split("=")[1])
					}

					if (var8 != "undefined") {
						varString = varString + "var-" + var8 + "&";
						varValueArray.push(var8.split("=")[1])
					}

					if (var9 != "undefined") {
						varString = varString + "var-" + var9 + "&";
						varValueArray.push(var9.split("=")[1])
					}

					//			Workaround START
					if (var1 == "undefined" && var2 != "undefined") {
						var switchVar = (var1 = var2);
					}
					if (var1 == "undefined" && var3 != "undefined") {
						var switchVar = (var1 = var3);
					}
					if (var1 == "undefined" && var4 != "undefined") {
						var switchVar = (var1 = var4);
					}
					if (var1 == "undefined" && var5 != "undefined") {
						var switchVar = (var1 = var5);
					}
					if (var1 == "undefined" && var6 != "undefined") {
						var switchVar = (var1 = var6);
					}
					if (var1 == "undefined" && var7 != "undefined") {
						var switchVar = (var1 = var7);
					}
					if (var1 == "undefined" && var8 != "undefined") {
						var switchVar = (var1 = var8);
					}
					if (var1 == "undefined" && var9 != "undefined") {
						var switchVar = (var1 = var9);
					}

					//			Workaround END		


					var response2 = JSON.parse($.customAPI.get(url + varString + querystring).content);
					if (response2.data.runs.length < 1) {
						$.say('There are no Runs in the Leaderboard for this Game/Category')
						return
					}
					responseRunner = JSON.parse($.customAPI.get(response2.data.runs[0].run.players[0].uri).content);
					var catName = response2.data.category.data.name;
					gameName = response2.data.game.data.names.international;
					VarCounter = 0;
					Var1p1 = var1.split("=")[0]
					Var1p2 = var1.split("=")[1]

					var varValue = response2.data.variables.data[0].values.values;
					if (varValue == Var1p2) {
						varValue = response2.data.variables.data[VarCounter].values.values[Var1p2].label
					}
					else (varValue != Var1p2); {
						for (var VarCounter; VarCounter <= 9; VarCounter++) {
							try {
								VarValue = response2.data.variables.data[VarCounter].values.values[Var1p2].label
								if (VarValue == undefined);
							}
							catch (err) { };
							if (VarValue != undefined) {
								var VarValue = VarValue = response2.data.variables.data[VarCounter].values.values[Var1p2].label
								break;
							}
						}
					}
						bestTime = response2.data.runs[0].run.times.primary;
					bestTime = bestTime.replace('H', 'h ');
					bestTime = bestTime.replace('M', 'm ');
					bestTime = bestTime.replace('S', 's ');


					var valueString = "";
					var variableString = "";
					var variables = response2.data.variables.data;
					variables.forEach(function (variable) {
						varValueArray.forEach(function (value) {
							if (variable.values.values[value] != undefined) {
								variablesName = JSON.parse($.customAPI.get(variableString + variable.links[0].uri).content);
								valueString = valueString + variablesName.data.name + ": " + variable.values.values[value].label + ', '
							}
						})
					})
					if (valueString) {
						valueString = valueString.substring(0, valueString.length - 2)
						valueString = " [" + valueString + "]"
					}

					// Runner & Guest Calls
					var RunnerCall = response2.data.runs[0].run.players;

					if (RunnerCall.length >= 1) {
						var GuestCall0 = RunnerCall[0].rel;
						var Runner0 = JSON.parse($.customAPI.get(RunnerCall[0].uri).content);
						if (GuestCall0 == 'guest' && Runner0.status == '404')
							var RunnerNameCall0 = RunnerCall[0].name;
						else if (GuestCall0 == 'guest' && Runner0.status != '404')
							var RunnerNameCall0 = Runner0.data.name;
						else (RunnerNameCall0 = Runner0.data.names.international);
						var Runner0Name = RunnerNameCall0
						var runnerString = Runner0Name;
					}
					if (RunnerCall.length >= 2) {
						var GuestCall1 = RunnerCall[1].rel;
						var Runner1 = JSON.parse($.customAPI.get(RunnerCall[1].uri).content);
						if (GuestCall1 == 'guest' && Runner1.status == '404')
							var RunnerNameCall1 = RunnerCall[1].name;
						else if (GuestCall1 == 'guest' && Runner1.status != '404')
							var RunnerNameCall1 = Runner1.data.name;
						else (RunnerNameCall1 = Runner1.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						var runnerString = Runner0Name + " & " + Runner1Name;
					}
					if (RunnerCall.length >= 3) {
						var GuestCall2 = RunnerCall[2].rel;
						var Runner2 = JSON.parse($.customAPI.get(RunnerCall[2].uri).content);
						if (GuestCall2 == 'guest' && Runner2.status == '404')
							var RunnerNameCall2 = RunnerCall[2].name;
						else if (GuestCall2 == 'guest' && Runner2.status != '404')
							var RunnerNameCall2 = Runner2.data.name;
						else (RunnerNameCall2 = Runner2.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						Runner2Name = RunnerNameCall2
						var runnerString = Runner0Name + ", " + Runner1Name + " & " + Runner2Name;
					}
					if (RunnerCall.length >= 4) {
						var GuestCall3 = RunnerCall[3].rel;
						var Runner3 = JSON.parse($.customAPI.get(RunnerCall[3].uri).content);
						if (GuestCall3 == 'guest' && Runner3.status == '404')
							var RunnerNameCall3 = RunnerCall[3].name;
						else if (GuestCall3 == 'guest' && Runner3.status != '404')
							var RunnerNameCall3 = Runner3.data.name;
						else (RunnerNameCall3 = Runner3.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						Runner2Name = RunnerNameCall2
						Runner3Name = RunnerNameCall3
						var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + " & " + Runner3Name;
					}
					if (RunnerCall.length >= 5) {
						var GuestCall4 = RunnerCall[4].rel;
						var Runner4 = JSON.parse($.customAPI.get(RunnerCall[4].uri).content);
						if (GuestCall4 == 'guest' && Runner4.status == '404')
							var RunnerNameCall4 = RunnerCall[4].name;
						else if (GuestCall4 == 'guest' && Runner4.status != '404')
							var RunnerNameCall4 = Runner4.data.name;
						else (RunnerNameCall4 = Runner4.data.names.international);
						var Runner0Name = RunnerNameCall0
						Runner1Name = RunnerNameCall1
						Runner2Name = RunnerNameCall2
						Runner3Name = RunnerNameCall3
						Runner4Name = RunnerNameCall4
						var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + ", " + Runner3Name + " & " + Runner4Name;
					}

					$.say("The current WR for " + gameName + " - " + catName + valueString + " is " + bestTime.substring(2) + "by " + runnerString);

				}
			}
		}
		// Individual Level is True
		if (isIL == 'true') {
			isIL = $.getIniDbString('SRCTableILstate', modeName, state);
			responseIL1 = JSON.parse($.customAPI.get(urlLvlIL + querystring).content);
			if (responseIL1.data.runs.length < 1) {
				$.say('There are no IL Runs in the Leaderboard for this Game/Category')
				return
			}

			// Build No varString (example: ID12313154=Value23525)
			if (var1 == 'undefined' && var2 == 'undefined' && var3 == 'undefined' && var4 == 'undefined' && var5 == 'undefined' && var6 == 'undefined' && var7 == 'undefined' && var8 == 'undefined' && var9 == 'undefined') { 

				var lvlGame = lvlGameJSON.data.names.international;
				lvlCat = lvlCatJSON.data.name;
				lvlName = lvlJSON.data.name;
				if (ilvar != 'undefined') {
					lvlILName = lvlILNameJSON.data.values.values[ilvar.split("=")[1]].label;
				}
				bestTime = responseIL1.data.runs[0].run.times.primary;
				bestTime = bestTime.replace('H', 'h ');
				bestTime = bestTime.replace('M', 'm ');
				bestTime = bestTime.replace('S', 's ')


				// Runner & Guest Calls
				var RunnerCall = responseIL1.data.runs[0].run.players;


				if (RunnerCall.length >= 1) {
					var GuestCall0 = RunnerCall[0].rel;
					var Runner0 = JSON.parse($.customAPI.get(RunnerCall[0].uri).content);
					if (GuestCall0 == 'guest' && Runner0.status == '404')
						var RunnerNameCall0 = RunnerCall[0].name;
					else if (GuestCall0 == 'guest' && Runner0.status != '404')
						var RunnerNameCall0 = Runner0.data.name;
					else (RunnerNameCall0 = Runner0.data.names.international);
					var Runner0Name = RunnerNameCall0
					var runnerString = Runner0Name;
				}
				if (RunnerCall.length >= 2) {
					var GuestCall1 = RunnerCall[1].rel;
					var Runner1 = JSON.parse($.customAPI.get(RunnerCall[1].uri).content);
					if (GuestCall1 == 'guest' && Runner1.status == '404')
						var RunnerNameCall1 = RunnerCall[1].name;
					else if (GuestCall1 == 'guest' && Runner1.status != '404')
						var RunnerNameCall1 = Runner1.data.name;
					else (RunnerNameCall1 = Runner1.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					var runnerString = Runner0Name + " & " + Runner1Name;
				}
				if (RunnerCall.length >= 3) {
					var GuestCall2 = RunnerCall[2].rel;
					var Runner2 = JSON.parse($.customAPI.get(RunnerCall[2].uri).content);
					if (GuestCall2 == 'guest' && Runner2.status == '404')
						var RunnerNameCall2 = RunnerCall[2].name;
					else if (GuestCall2 == 'guest' && Runner2.status != '404')
						var RunnerNameCall2 = Runner2.data.name;
					else (RunnerNameCall2 = Runner2.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					Runner2Name = RunnerNameCall2
					var runnerString = Runner0Name + ", " + Runner1Name + " & " + Runner2Name;
				}
				if (RunnerCall.length >= 4) {
					var GuestCall3 = RunnerCall[3].rel;
					var Runner3 = JSON.parse($.customAPI.get(RunnerCall[3].uri).content);
					if (GuestCall3 == 'guest' && Runner3.status == '404')
						var RunnerNameCall3 = RunnerCall[3].name;
					else if (GuestCall3 == 'guest' && Runner3.status != '404')
						var RunnerNameCall3 = Runner3.data.name;
					else (RunnerNameCall3 = Runner3.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					Runner2Name = RunnerNameCall2
					Runner3Name = RunnerNameCall3
					var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + " & " + Runner3Name;
				}
				if (RunnerCall.length >= 5) {
					var GuestCall4 = RunnerCall[4].rel;
					var Runner4 = JSON.parse($.customAPI.get(RunnerCall[4].uri).content);
					if (GuestCall4 == 'guest' && Runner4.status == '404')
						var RunnerNameCall4 = RunnerCall[4].name;
					else if (GuestCall4 == 'guest' && Runner4.status != '404')
						var RunnerNameCall4 = Runner4.data.name;
					else (RunnerNameCall4 = Runner4.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					Runner2Name = RunnerNameCall2
					Runner3Name = RunnerNameCall3
					Runner4Name = RunnerNameCall4
					var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + ", " + Runner3Name + " & " + Runner4Name;
				}

				if (ilvar != 'undefined') {
					$.say("The current IL WR for " + lvlGame + " - " + lvlCat + " (" + lvlName + ": " + lvlILName + ") is " + bestTime.substring(2) + "by " + runnerString);
				}
				else ($.say("The current IL WR for " + lvlGame + " - " + lvlCat + " (" + lvlName + ") is " + bestTime.substring(2) + "by " + runnerString))

			}
		
			// Build varString (example: ID12313154=Value23525)
			if (var1 != 'undefined' || var2 != 'undefined' || var3 != 'undefined' || var4 != 'undefined' || var5 != 'undefined' || var6 != 'undefined' || var7 != 'undefined' || var8 != 'undefined' || var9 != 'undefined') {
				if (var1 != "undefined") {
					varString = varString + "var-" + var1 + "&";
					varValueArray.push(var1.split("=")[1])
				}

				if (var2 != "undefined") {
					varString = varString + "var-" + var2 + "&";
					varValueArray.push(var2.split("=")[1])
				}

				if (var3 != "undefined") {
					varString = varString + "var-" + var3 + "&";
					varValueArray.push(var3.split("=")[1])
				}

				if (var4 != "undefined") {
					varString = varString + "var-" + var4 + "&";
					varValueArray.push(var4.split("=")[1])
				}

				if (var5 != "undefined") {
					varString = varString + "var-" + var5 + "&";
					varValueArray.push(var5.split("=")[1])
				}

				if (var6 != "undefined") {
					varString = varString + "var-" + var6 + "&";
					varValueArray.push(var6.split("=")[1])
				}

				if (var7 != "undefined") {
					varString = varString + "var-" + var7 + "&";
					varValueArray.push(var7.split("=")[1])
				}

				if (var8 != "undefined") {
					varString = varString + "var-" + var8 + "&";
					varValueArray.push(var8.split("=")[1])
				}

				if (var9 != "undefined") {
					varString = varString + "var-" + var9 + "&";
					varValueArray.push(var9.split("=")[1])
				}

				//			Workaround START
				if (var1 == "undefined" && var2 != "undefined") {
					var switchVar = (var1 = var2);
				}
				if (var1 == "undefined" && var3 != "undefined") {
					var switchVar = (var1 = var3);
				}
				if (var1 == "undefined" && var4 != "undefined") {
					var switchVar = (var1 = var4);
				}
				if (var1 == "undefined" && var5 != "undefined") {
					var switchVar = (var1 = var5);
				}
				if (var1 == "undefined" && var6 != "undefined") {
					var switchVar = (var1 = var6);
				}
				if (var1 == "undefined" && var7 != "undefined") {
					var switchVar = (var1 = var7);
				}
				if (var1 == "undefined" && var8 != "undefined") {
					var switchVar = (var1 = var8);
				}
				if (var1 == "undefined" && var9 != "undefined") {
					var switchVar = (var1 = var9);
				}
				//			Workaround END

				var responseIL2 = JSON.parse($.customAPI.get(urlLvlIL + varString + querystring).content);
				if (responseIL2.data.runs.length < 1) {
					$.say('There are no IL Runs in the Leaderboard for this Game/Category')
					return
				}
				var lvlGame = lvlGameJSON.data.names.international;
					varValue = lvlILVarJSON.data.values.values[var1.split("=")[1]].label;
				lvlCat = lvlCatJSON.data.name;
				lvlName = lvlJSON.data.name;
				lvlILName = lvlILNameJSON.data.values.values[ilvar.split("=")[1]].label;
				lvlILVarName = lvlILVarJSON.data.values.values[var1.split("=")[1]].label;
				bestTime = responseIL2.data.runs[0].run.times.primary;
				bestTime = bestTime.replace('H', 'h ');
				bestTime = bestTime.replace('M', 'm ');
				bestTime = bestTime.replace('S', 's ')

				var valueString = "";
				var variableString = "";
				var variables = responseIL2.data.variables.data;
				variables.forEach(function (variable) {
					varValueArray.forEach(function (value) {
						if (variable.values.values[value] != undefined) {
							variablesName = JSON.parse($.customAPI.get(variableString + variable.links[0].uri).content);
							valueString = valueString + variablesName.data.name + ": " + variable.values.values[value].label + ', '
						}
					})
				})
				if (valueString) {
					valueString = valueString.substring(0, valueString.length - 2)
					valueString = " [" + valueString + "]"
				}

				// Runner & Guest Calls
				var RunnerCall = responseIL2.data.runs[0].run.players;

				if (RunnerCall.length >= 1) {
					var GuestCall0 = RunnerCall[0].rel;
					var Runner0 = JSON.parse($.customAPI.get(RunnerCall[0].uri).content);
					if (GuestCall0 == 'guest' && Runner0.status == '404')
						var RunnerNameCall0 = RunnerCall[0].name;
					else if (GuestCall0 == 'guest' && Runner0.status != '404')
						var RunnerNameCall0 = Runner0.data.name;
					else (RunnerNameCall0 = Runner0.data.names.international);
					var Runner0Name = RunnerNameCall0
					var runnerString = Runner0Name;
				}
				if (RunnerCall.length >= 2) {
					var GuestCall1 = RunnerCall[1].rel;
					var Runner1 = JSON.parse($.customAPI.get(RunnerCall[1].uri).content);
					if (GuestCall1 == 'guest' && Runner1.status == '404')
						var RunnerNameCall1 = RunnerCall[1].name;
					else if (GuestCall1 == 'guest' && Runner1.status != '404')
						var RunnerNameCall1 = Runner1.data.name;
					else (RunnerNameCall1 = Runner1.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					var runnerString = Runner0Name + " & " + Runner1Name;
				}
				if (RunnerCall.length >= 3) {
					var GuestCall2 = RunnerCall[2].rel;
					var Runner2 = JSON.parse($.customAPI.get(RunnerCall[2].uri).content);
					if (GuestCall2 == 'guest' && Runner2.status == '404')
						var RunnerNameCall2 = RunnerCall[2].name;
					else if (GuestCall2 == 'guest' && Runner2.status != '404')
						var RunnerNameCall2 = Runner2.data.name;
					else (RunnerNameCall2 = Runner2.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					Runner2Name = RunnerNameCall2
					var runnerString = Runner0Name + ", " + Runner1Name + " & " + Runner2Name;
				}
				if (RunnerCall.length >= 4) {
					var GuestCall3 = RunnerCall[3].rel;
					var Runner3 = JSON.parse($.customAPI.get(RunnerCall[3].uri).content);
					if (GuestCall3 == 'guest' && Runner3.status == '404')
						var RunnerNameCall3 = RunnerCall[3].name;
					else if (GuestCall3 == 'guest' && Runner3.status != '404')
						var RunnerNameCall3 = Runner3.data.name;
					else (RunnerNameCall3 = Runner3.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					Runner2Name = RunnerNameCall2
					Runner3Name = RunnerNameCall3
					var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + " & " + Runner3Name;
				}
				if (RunnerCall.length >= 5) {
					var GuestCall4 = RunnerCall[4].rel;
					var Runner4 = JSON.parse($.customAPI.get(RunnerCall[4].uri).content);
					if (GuestCall4 == 'guest' && Runner4.status == '404')
						var RunnerNameCall4 = RunnerCall[4].name;
					else if (GuestCall4 == 'guest' && Runner4.status != '404')
						var RunnerNameCall4 = Runner4.data.name;
					else (RunnerNameCall4 = Runner4.data.names.international);
					var Runner0Name = RunnerNameCall0
					Runner1Name = RunnerNameCall1
					Runner2Name = RunnerNameCall2
					Runner3Name = RunnerNameCall3
					Runner4Name = RunnerNameCall4
					var runnerString = Runner0Name + ", " + Runner1Name + ", " + Runner2Name + ", " + Runner3Name + " & " + Runner4Name;
				}
				

				$.say("The current IL WR for " + lvlGame + " - " + lvlCat + " (" + lvlName + ": " + lvlILName + ") " + valueString + " is " + bestTime.substring(2) + "by " + runnerString);

				
			}
		}
	});
})();
