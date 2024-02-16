/*################################### INFO ######################################*/
/*This Script is Completely work in Progress, IL Stuff is missing
ATM: It work as intendet only the IL Stuff don't work*/
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

		// Read PB
		if (command.equalsIgnoreCase('pb')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				game = $.getIniDbString('SRCTableGame', modeName, state);
			category = $.getIniDbString('SRCTableCat', modeName, 'undefined');
			player = $.getIniDbString('SRCTablePlayer', modeName, 'undefined');
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
			// API-CallZeugs
			url = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/category/" + category + "?";
			urlIL = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/level/" + lvl + "/" + category + "?";
			urlPlayer = "https://www.speedrun.com/api/v1/users/" + player;
			urlLvl = "https://www.speedrun.com/api/v1/levels/" + lvl + "?";
			urlLvlGame = "https://www.speedrun.com/api/v1/games/" + game + "?";
			urlLvlCat = "https://www.speedrun.com/api/v1/categories/" + category;
			urlLvlVar = "https://www.speedrun.com/api/v1/variables/";
			urlLvlIL = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/level/" + lvl + "/" + category + "?var-" + ilvar + "&";
			urlPB = 'https://www.speedrun.com/api/v1/runs?user=' + player + '&category=' + category; 
			varString = "";
			querystring = "top=1&embed=game,variables,category";
			querystringPB = "&status=verified&orderby=date&direction=desc";

			// JSONs
			playerJSON = JSON.parse($.customAPI.get(urlPlayer).content);
			PbJSON = JSON.parse($.customAPI.get(urlPB + querystringPB).content);
			lvlJSON = JSON.parse($.customAPI.get(urlLvl).content);
			lvlGameJSON = JSON.parse($.customAPI.get(urlLvlGame).content);
			lvlCatJSON = JSON.parse($.customAPI.get(urlLvlCat).content);
			lvlVarJSON = JSON.parse($.customAPI.get(urlLvl + "/variables/").content);
			lvlILVarJSON = JSON.parse($.customAPI.get(urlLvlVar + var1.split("=")[0]).content);
			lvlILNameJSON = JSON.parse($.customAPI.get(urlLvlVar + ilvar.split("=")[0]).content);
		

			if (modeName == 'unset') {
				$.say("Please set a mode.");
				return;
			}
			if (player == '') {
				$.say('Set a Player ID first! Usage: !setplayerid {SRC-User ID}');
				return;
			}
			if (game == '' || game == 'undefined') {
				$.say('Set a Game ID first! Usage: !setgameid {SRC-Game ID}');
				return;
			}

			// Individual Level is False
			if (isIL != 'true') {
				isIL = $.getIniDbString('SRCTableILstate', modeName, state);
				response1 = JSON.parse($.customAPI.get(url + querystring).content);
				if (response1.data.runs.length < 1) {
					$.say('There are no Runs in the Leaderboard for this Game/Category')
					return;
				}

				// Build No varString (example: ID12313154=Value23525)
				if (var1 == 'undefined' && var2 == 'undefined' && var3 == 'undefined' && var4 == 'undefined' && var5 == 'undefined' && var6 == 'undefined' && var7 == 'undefined' && var8 == 'undefined' && var9 == 'undefined') {

					var catName = response1.data.category.data.name,
						gameName = response1.data.game.data.names.international,
						playerCall = playerJSON.data.names.international

					if (PbJSON.data == '') {
						$.say(playerCall + " has no PB in " + gameName + " - " + catName);
						return;
					}

					// PB Call
					PBVarCounter = 0;
					PBVar1p1 = var1.split("=")[0]
					PBVar1p2 = var1.split("=")[1]
					PBVar2p1 = var2.split("=")[0]
					PBVar2p2 = var2.split("=")[1]
					PBVar3p1 = var3.split("=")[0]
					PBVar3p2 = var3.split("=")[1]
					PBVar4p1 = var4.split("=")[0]
					PBVar4p2 = var4.split("=")[1]
					PBVar5p1 = var5.split("=")[0]
					PBVar5p2 = var5.split("=")[1]
					PBVar6p1 = var6.split("=")[0]
					PBVar6p2 = var6.split("=")[1]
					PBVar7p1 = var7.split("=")[0]
					PBVar7p2 = var7.split("=")[1]
					PBVar8p1 = var8.split("=")[0]
					PBVar8p2 = var8.split("=")[1]
					PBVar9p1 = var9.split("=")[0]
					PBVar9p2 = var9.split("=")[1]

					PBVar1Call = PbJSON.data[0].values[PBVar1p1]
					PBVar2Call = PbJSON.data[0].values[PBVar2p1]
					PBVar3Call = PbJSON.data[0].values[PBVar3p1]
					PBVar4Call = PbJSON.data[0].values[PBVar4p1]
					PBVar5Call = PbJSON.data[0].values[PBVar5p1]
					PBVar6Call = PbJSON.data[0].values[PBVar6p1]
					PBVar7Call = PbJSON.data[0].values[PBVar7p1]
					PBVar8Call = PbJSON.data[0].values[PBVar8p1]
					PBVar9Call = PbJSON.data[0].values[PBVar9p1]

					// PB Call Loop
					if (PBVar1Call == PBVar1p2 && PBVar2Call == PBVar2p2 && PBVar3Call == PBVar3p2 && PBVar4Call == PBVar4p2 && PBVar5Call == PBVar5p2 && PBVar6Call == PBVar6p2 && PBVar7Call == PBVar7p2 && PBVar8Call == PBVar8p2 && PBVar9Call == PBVar9p2) {
						PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1];
						PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1];
						PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1];
						PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1];
						PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1];
						PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1];
						PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1];
						PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1];
						PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1];
					}
					else (PBVar1Call != PBVar1p2 || PBVar2Call != PBVar2p2 || PBVar3Call != PBVar3p2 || PBVar4Call != PBVar4p2 || PBVar5Call != PBVar5p2 || PBVar6Call != PBVar6p2 || PBVar7Call != PBVar7p2 || PBVar8Call != PBVar8p2 || PBVar9Call != PBVar9p2); {
							for (var PBVarCounter; PBVarCounter <= 11; PBVarCounter++) {
								try {
									PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1]
									PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1]
									PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1]
									PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1]
									PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1]
									PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1]
									PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1]
									PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1]
									PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1]
									if (PBCall1 == undefined || PBCall2 == undefined || PBCall3 == undefined || PBCall4 == undefined || PBCall5 == undefined || PBCall6 == undefined || PBCall7 == undefined || PBCall8 == undefined || PBCall9 == undefined);
								}
								catch (err) { };
							if (PBCall1 == PBVar1p2 && PBCall2 == PBVar2p2 && PBCall3 == PBVar3p2 && PBCall4 == PBVar4p2 && PBCall5 == PBVar5p2 && PBCall6 == PBVar6p2 && PBCall7 == PBVar7p2 && PBCall8 == PBVar8p2 && PBCall9 == PBVar9p2) {
								var bestTime = PbJSON.data[PBVarCounter].times.primary
								var NoTime = PbJSON.data[PBVarCounter].times.primary
								bestTime = bestTime.replace('H', 'h ');
								bestTime = bestTime.replace('M', 'm ');
								bestTime = bestTime.replace('S', 's ');

								var PBTime = bestTime.substring(2)
								break;
							}
						}
					}
					if (NoTime == undefined) {
						$.say(playerCall + " has no PB in " + gameName + " - " + catName);
					}
					else $.say(playerCall + "'s PB for " + gameName + " - " + catName + " is " + PBTime);

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

					playerCall = playerJSON.data.names.international
					var valueString = "";
					var variables = response2.data.variables.data;
					variables.forEach(function (variable) {
						varValueArray.forEach(function (value) {
							if (variable.values.values[value] != undefined) {
								valueString = valueString + variable.values.values[value].label + ', '
							}
						})
					})
					if (valueString) {
						valueString = valueString.substring(0, valueString.length - 2)
						valueString = " [" + valueString + "]"
					}

					if (PbJSON.data == '') {
						$.say(playerCall + " has no PB in " + gameName + " - " + catName + valueString);
						return;
					}

					// PB Call
					PBVarCounter = 0;
					PBVar1p1 = var1.split("=")[0]
					PBVar1p2 = var1.split("=")[1]
					PBVar2p1 = var2.split("=")[0]
					PBVar2p2 = var2.split("=")[1]
					PBVar3p1 = var3.split("=")[0]
					PBVar3p2 = var3.split("=")[1]
					PBVar4p1 = var4.split("=")[0]
					PBVar4p2 = var4.split("=")[1]
					PBVar5p1 = var5.split("=")[0]
					PBVar5p2 = var5.split("=")[1]
					PBVar6p1 = var6.split("=")[0]
					PBVar6p2 = var6.split("=")[1]
					PBVar7p1 = var7.split("=")[0]
					PBVar7p2 = var7.split("=")[1]
					PBVar8p1 = var8.split("=")[0]
					PBVar8p2 = var8.split("=")[1]
					PBVar9p1 = var9.split("=")[0]
					PBVar9p2 = var9.split("=")[1]

					PBVar1Call = PbJSON.data[0].values[PBVar1p1]
					PBVar2Call = PbJSON.data[0].values[PBVar2p1]
					PBVar3Call = PbJSON.data[0].values[PBVar3p1]
					PBVar4Call = PbJSON.data[0].values[PBVar4p1]
					PBVar5Call = PbJSON.data[0].values[PBVar5p1]
					PBVar6Call = PbJSON.data[0].values[PBVar6p1]
					PBVar7Call = PbJSON.data[0].values[PBVar7p1]
					PBVar8Call = PbJSON.data[0].values[PBVar8p1]
					PBVar9Call = PbJSON.data[0].values[PBVar9p1]

					// PB Call Loop
					if (PBVar1Call == PBVar1p2 && PBVar2Call == PBVar2p2 && PBVar3Call == PBVar3p2 && PBVar4Call == PBVar4p2 && PBVar5Call == PBVar5p2 && PBVar6Call == PBVar6p2 && PBVar7Call == PBVar7p2 && PBVar8Call == PBVar8p2 && PBVar9Call == PBVar9p2) {
						PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1];
						PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1];
						PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1];
						PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1];
						PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1];
						PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1];
						PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1];
						PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1];
						PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1];
					}
					else (PBVar1Call != PBVar1p2 || PBVar2Call != PBVar2p2 || PBVar3Call != PBVar3p2 || PBVar4Call != PBVar4p2 || PBVar5Call != PBVar5p2 || PBVar6Call != PBVar6p2 || PBVar7Call != PBVar7p2 || PBVar8Call != PBVar8p2 || PBVar9Call != PBVar9p2); {
						for (var PBVarCounter; PBVarCounter <= 11; PBVarCounter++) {
							try {
								PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1]
								PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1]
								PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1]
								PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1]
								PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1]
								PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1]
								PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1]
								PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1]
								PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1]
								if (PBCall1 == undefined || PBCall2 == undefined || PBCall3 == undefined || PBCall4 == undefined || PBCall5 == undefined || PBCall6 == undefined || PBCall7 == undefined || PBCall8 == undefined || PBCall9 == undefined);
							}
							catch (err) { };
							if (PBCall1 == PBVar1p2 && PBCall2 == PBVar2p2 && PBCall3 == PBVar3p2 && PBCall4 == PBVar4p2 && PBCall5 == PBVar5p2 && PBCall6 == PBVar6p2 && PBCall7 == PBVar7p2 && PBCall8 == PBVar8p2 && PBCall9 == PBVar9p2) {
								var bestTime = PbJSON.data[PBVarCounter].times.primary
								var NoTime = PbJSON.data[PBVarCounter].times.primary
								bestTime = bestTime.replace('H', 'h ');
								bestTime = bestTime.replace('M', 'm ');
								bestTime = bestTime.replace('S', 's ');

								var PBTime = bestTime.substring(2)
								break;
							}
						}
					}

					if (NoTime == undefined) {
						$.say(playerCall + " has no PB in " + gameName + " - " + catName + valueString);
					}
					else $.say(playerCall + "'s PB for " + gameName + " - " + catName + valueString + " is " + PBTime);

				}

			}
		}

		// Individual Level is True
		if (isIL == 'true') {
			isIL = $.getIniDbString('SRCTableILstate', modeName, state);
			responseIL1 = JSON.parse($.customAPI.get(urlLvlIL + querystring).content);
			if (responseIL1.data.runs.length < 1) {
				$.say('There are no IL Runs in the Leaderboard for this Game/Category')
				return;
			}

			// Build No varString (example: ID12313154=Value23525)
			if (var1 == 'undefined' && var2 == 'undefined' && var3 == 'undefined' && var4 == 'undefined' && var5 == 'undefined' && var6 == 'undefined' && var7 == 'undefined' && var8 == 'undefined' && var9 == 'undefined') {

				var lvlGame = lvlGameJSON.data.names.international;
				lvlCat = lvlCatJSON.data.name;
				lvlName = lvlJSON.data.name;
				if (ilvar != 'undefined') {
					var lvlILName = lvlILNameJSON.data.values.values[ilvar.split("=")[1]].label;
				}
				playerCall = playerJSON.data.names.international

				if (PbJSON.data == '') {
					$.say(playerCall + " has no PB in " + lvlGame + " - " + lvlCat + " (" + lvlName + ")");
					return;
				}


				// PB Call
				PBVarCounter = 0;
				PBVar1p1 = var1.split("=")[0]
				PBVar1p2 = var1.split("=")[1]
				PBVar2p1 = var2.split("=")[0]
				PBVar2p2 = var2.split("=")[1]
				PBVar3p1 = var3.split("=")[0]
				PBVar3p2 = var3.split("=")[1]
				PBVar4p1 = var4.split("=")[0]
				PBVar4p2 = var4.split("=")[1]
				PBVar5p1 = var5.split("=")[0]
				PBVar5p2 = var5.split("=")[1]
				PBVar6p1 = var6.split("=")[0]
				PBVar6p2 = var6.split("=")[1]
				PBVar7p1 = var7.split("=")[0]
				PBVar7p2 = var7.split("=")[1]
				PBVar8p1 = var8.split("=")[0]
				PBVar8p2 = var8.split("=")[1]
				PBVar9p1 = var9.split("=")[0]
				PBVar9p2 = var9.split("=")[1]
				PBilvarp1 = ilvar.split("=")[0]
				PBilvarp2 = ilvar.split("=")[1]

				PBVar1Call = PbJSON.data[0].values[PBVar1p1]
				PBVar2Call = PbJSON.data[0].values[PBVar2p1]
				PBVar3Call = PbJSON.data[0].values[PBVar3p1]
				PBVar4Call = PbJSON.data[0].values[PBVar4p1]
				PBVar5Call = PbJSON.data[0].values[PBVar5p1]
				PBVar6Call = PbJSON.data[0].values[PBVar6p1]
				PBVar7Call = PbJSON.data[0].values[PBVar7p1]
				PBVar8Call = PbJSON.data[0].values[PBVar8p1]
				PBVar9Call = PbJSON.data[0].values[PBVar9p1]
				PBilvarCall = PbJSON.data[0].values[PBilvarp1]

				// PB Call Loop
				if (PBVar1Call == PBVar1p2 && PBVar2Call == PBVar2p2 && PBVar3Call == PBVar3p2 && PBVar4Call == PBVar4p2 && PBVar5Call == PBVar5p2 && PBVar6Call == PBVar6p2 && PBVar7Call == PBVar7p2 && PBVar8Call == PBVar8p2 && PBVar9Call == PBVar9p2 && PBilvarCall == PBilvarp2) {
					PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1];
					PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1];
					PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1];
					PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1];
					PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1];
					PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1];
					PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1];
					PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1];
					PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1];
					PBilCall = PbJSON.data[PBVarCounter].values[PBilvarp1];
				}
				else (PBVar1Call != PBVar1p2 || PBVar2Call != PBVar2p2 || PBVar3Call != PBVar3p2 || PBVar4Call != PBVar4p2 || PBVar5Call != PBVar5p2 || PBVar6Call != PBVar6p2 || PBVar7Call != PBVar7p2 || PBVar8Call != PBVar8p2 || PBVar9Call != PBVar9p2 || PBilvarCall != PBilvarp2); {
					for (var PBVarCounter; PBVarCounter <= 11; PBVarCounter++) {
						try {
							PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1]
							PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1]
							PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1]
							PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1]
							PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1]
							PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1]
							PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1]
							PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1]
							PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1]
							PBilCall = PbJSON.data[PBVarCounter].values[PBilvarp1]
							if (PBCall1 == undefined || PBCall2 == undefined || PBCall3 == undefined || PBCall4 == undefined || PBCall5 == undefined || PBCall6 == undefined || PBCall7 == undefined || PBCall8 == undefined || PBCall9 == undefined || PBilCall == undefined);
						}
						catch (err) { };
						if (PBCall1 == PBVar1p2 && PBCall2 == PBVar2p2 && PBCall3 == PBVar3p2 && PBCall4 == PBVar4p2 && PBCall5 == PBVar5p2 && PBCall6 == PBVar6p2 && PBCall7 == PBVar7p2 && PBCall8 == PBVar8p2 && PBCall9 == PBVar9p2 && PBilCall == PBilvarp2) {
							var bestTime = PbJSON.data[PBVarCounter].times.primary
							var NoTime = PbJSON.data[PBVarCounter].times.primary
							bestTime = bestTime.replace('H', 'h ');
							bestTime = bestTime.replace('M', 'm ');
							bestTime = bestTime.replace('S', 's ');
							var PBTime = bestTime.substring(2)
							break;
						}
					}
				}
				if (NoTime == undefined) {
					$.say(playerCall + " has no PB in " + lvlGame + " - " + lvlCat + " (" + lvlName + ")");
				}
				else $.say(playerCall + "'s PB for " + lvlGame + " - " + lvlCat + " (" + lvlName + ") is " + PBTime);

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
					$.say('There are no Runs in the Leaderboard for this Game/Category')
					return
				}
				var lvlGame = lvlGameJSON.data.names.international;
				varValue = lvlILVarJSON.data.values.values[var1.split("=")[1]].label;
				lvlCat = lvlCatJSON.data.name;
				lvlName = lvlJSON.data.name;
				lvlILName = lvlILNameJSON.data.values.values[ilvar.split("=")[1]].label;
				lvlILVarName = lvlILVarJSON.data.values.values[var1.split("=")[1]].label;
				VarCounter = 0;
				Var1p1 = var1.split("=")[0]
				Var1p2 = var1.split("=")[1]

				var varValue = responseIL2.data.variables.data[0].values.values;
				if (varValue == Var1p2) {
					varValue = responseIL2.data.variables.data[VarCounter].values.values[Var1p2].label
				}
				else (varValue != Var1p2); {
					for (var VarCounter; VarCounter <= 9; VarCounter++) {
						try {
							VarValue = responseIL2.data.variables.data[VarCounter].values.values[Var1p2].label
							if (VarValue == undefined);
						}
						catch (err) { };
						if (VarValue != undefined) {
							var VarValue = VarValue = responseIL2.data.variables.data[VarCounter].values.values[Var1p2].label
							break;
						}
					}
				}
				playerCall = playerJSON.data.names.international
				var valueString = "";
				var variables = responseIL2.data.variables.data;
				variables.forEach(function (variable) {
					varValueArray.forEach(function (value) {
						if (variable.values.values[value] != undefined) {
							valueString = valueString + variable.values.values[value].label + ', '
						}
					})
				})
				if (valueString) {
					valueString = valueString.substring(0, valueString.length - 2)
					valueString = " [" + valueString + "]"
				}

				if (PbJSON.data == '') {
					$.say(playerCall + " has no PB in " + lvlGame + " - " + lvlCat + " (" + lvlName + ": " + lvlILName + ") " + valueString);
					return;
				}

				// PB Call
				PBVarCounter = 0;
				PBVar1p1 = var1.split("=")[0]
				PBVar1p2 = var1.split("=")[1]
				PBVar2p1 = var2.split("=")[0]
				PBVar2p2 = var2.split("=")[1]
				PBVar3p1 = var3.split("=")[0]
				PBVar3p2 = var3.split("=")[1]
				PBVar4p1 = var4.split("=")[0]
				PBVar4p2 = var4.split("=")[1]
				PBVar5p1 = var5.split("=")[0]
				PBVar5p2 = var5.split("=")[1]
				PBVar6p1 = var6.split("=")[0]
				PBVar6p2 = var6.split("=")[1]
				PBVar7p1 = var7.split("=")[0]
				PBVar7p2 = var7.split("=")[1]
				PBVar8p1 = var8.split("=")[0]
				PBVar8p2 = var8.split("=")[1]
				PBVar9p1 = var9.split("=")[0]
				PBVar9p2 = var9.split("=")[1]
				PBilvarp1 = ilvar.split("=")[0]
				PBilvarp2 = ilvar.split("=")[1]

				PBVar1Call = PbJSON.data[0].values[PBVar1p1]
				PBVar2Call = PbJSON.data[0].values[PBVar2p1]
				PBVar3Call = PbJSON.data[0].values[PBVar3p1]
				PBVar4Call = PbJSON.data[0].values[PBVar4p1]
				PBVar5Call = PbJSON.data[0].values[PBVar5p1]
				PBVar6Call = PbJSON.data[0].values[PBVar6p1]
				PBVar7Call = PbJSON.data[0].values[PBVar7p1]
				PBVar8Call = PbJSON.data[0].values[PBVar8p1]
				PBVar9Call = PbJSON.data[0].values[PBVar9p1]
				PBilvarCall = PbJSON.data[0].values[PBilvarp1]

				// PB Call Loop
				if (PBVar1Call == PBVar1p2 && PBVar2Call == PBVar2p2 && PBVar3Call == PBVar3p2 && PBVar4Call == PBVar4p2 && PBVar5Call == PBVar5p2 && PBVar6Call == PBVar6p2 && PBVar7Call == PBVar7p2 && PBVar8Call == PBVar8p2 && PBVar9Call == PBVar9p2 && PBilvarCall == PBilvarp2) {
					PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1];
					PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1];
					PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1];
					PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1];
					PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1];
					PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1];
					PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1];
					PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1];
					PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1];
					PBilCall = PbJSON.data[PBVarCounter].values[PBilvarp1];
				}
				else (PBVar1Call != PBVar1p2 || PBVar2Call != PBVar2p2 || PBVar3Call != PBVar3p2 || PBVar4Call != PBVar4p2 || PBVar5Call != PBVar5p2 || PBVar6Call != PBVar6p2 || PBVar7Call != PBVar7p2 || PBVar8Call != PBVar8p2 || PBVar9Call != PBVar9p2 || PBilvarCall != PBilvarp2); {
					for (var PBVarCounter; PBVarCounter <= 11; PBVarCounter++) {
						try {
							PBCall1 = PbJSON.data[PBVarCounter].values[PBVar1p1]
							PBCall2 = PbJSON.data[PBVarCounter].values[PBVar2p1]
							PBCall3 = PbJSON.data[PBVarCounter].values[PBVar3p1]
							PBCall4 = PbJSON.data[PBVarCounter].values[PBVar4p1]
							PBCall5 = PbJSON.data[PBVarCounter].values[PBVar5p1]
							PBCall6 = PbJSON.data[PBVarCounter].values[PBVar6p1]
							PBCall7 = PbJSON.data[PBVarCounter].values[PBVar7p1]
							PBCall8 = PbJSON.data[PBVarCounter].values[PBVar8p1]
							PBCall9 = PbJSON.data[PBVarCounter].values[PBVar9p1]
							PBilCall = PbJSON.data[PBVarCounter].values[PBilvarp1]
							if (PBCall1 == undefined || PBCall2 == undefined || PBCall3 == undefined || PBCall4 == undefined || PBCall5 == undefined || PBCall6 == undefined || PBCall7 == undefined || PBCall8 == undefined || PBCall9 == undefined || PBilCall == undefined);
						}
						catch (err) { };
						if (PBCall1 == PBVar1p2 && PBCall2 == PBVar2p2 && PBCall3 == PBVar3p2 && PBCall4 == PBVar4p2 && PBCall5 == PBVar5p2 && PBCall6 == PBVar6p2 && PBCall7 == PBVar7p2 && PBCall8 == PBVar8p2 && PBCall9 == PBVar9p2 && PBilCall == PBilvarp2) {
							var bestTime = PbJSON.data[PBVarCounter].times.primary
							var NoTime = PbJSON.data[PBVarCounter].times.primary
							bestTime = bestTime.replace('H', 'h ');
							bestTime = bestTime.replace('M', 'm ');
							bestTime = bestTime.replace('S', 's ');
							var PBTime = bestTime.substring(2)
							break;
						}
					}
				}

				if (NoTime == undefined) {
					$.say(playerCall + " has no PB in " + lvlGame + " - " + lvlCat + " (" + lvlName + ": " + lvlILName + ") " + valueString);
				}
				else $.say(playerCall + "'s PB for " + lvlGame + " - " + lvlCat + " (" + lvlName + ": " + lvlILName + ") " + valueString + " is " + PBTime);

			}

		}
	});
})();