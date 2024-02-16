(function () {
	//Database Handling
	// Read current state from database
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

		if (command.equalsIgnoreCase('lb')) {
			var modeName = $.getIniDbString('SRCstates', 'currentState', state),
				game = $.getIniDbString('SRCTableGame', modeName, state);
			category = $.getIniDbString('SRCTableCat', modeName, 'undefined');
			player = $.getIniDbString('SRCTablePlayer', modeName, 'undefined');
			isIL = $.getIniDbString('SRCTableILstate', modeName, state);
			lvl = $.getIniDbString('SRCTableLvL', modeName, 'undefined');
			ilvar = $.getIniDbString('SRCTableIL', modeName, 'undefined');
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
				varString = "";
			querystring = "top=1&embed=game,variables,category";

			url = "https://www.speedrun.com/";
			urlIL = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/level/" + lvl + "/" + category + "?";
			urlLvlIL = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/level/" + lvl + "/" + category + "?var-" + ilvar + "&";
			APIurl = "https://www.speedrun.com/api/v1/leaderboards/" + game + "/category/" + category + "?";
			lbUrl = JSON.parse($.customAPI.get(APIurl).content);
			var varNameJSON = JSON.parse($.customAPI.get(APIurl + varString + querystring).content);
			var ILvarNameJSON = JSON.parse($.customAPI.get(urlLvlIL + varString + querystring).content);

			if (modeName == 'unset') {
				$.say("Please set a mode.");
				return;
			}

			// Individual Level is False
			if (isIL != 'true') {
				isIL = $.getIniDbString('SRCTableILstate', modeName, state);

				// Game Calls
				gameNameJSON = JSON.parse($.customAPI.get("https://www.speedrun.com/api/v1/games/" + game).content);
				callGameName = gameNameJSON.data.names.international;
				callGameID = gameNameJSON.data.abbreviation

				// Cat Calls
				catNameJSON = JSON.parse($.customAPI.get("https://www.speedrun.com/api/v1/categories/" + category).content);
				callCatName = catNameJSON.data.name;

				// Var 1-9 Calls
				VuS1 = '-' + var1.split("=")[0] + '.' + var1.split("=")[1];
				VuS2 = '-' + var2.split("=")[0] + '.' + var2.split("=")[1];
				VuS3 = '-' + var3.split("=")[0] + '.' + var3.split("=")[1];
				VuS4 = '-' + var4.split("=")[0] + '.' + var4.split("=")[1];
				VuS5 = '-' + var5.split("=")[0] + '.' + var5.split("=")[1];
				VuS6 = '-' + var6.split("=")[0] + '.' + var6.split("=")[1];
				VuS7 = '-' + var7.split("=")[0] + '.' + var7.split("=")[1];
				VuS8 = '-' + var8.split("=")[0] + '.' + var8.split("=")[1];
				VuS9 = '-' + var9.split("=")[0] + '.' + var9.split("=")[1];

				// Build No varString (example: ID12313154=Value23525)
				if (var1 == 'undefined' && var2 == 'undefined' && var3 == 'undefined' && var4 == 'undefined' && var5 == 'undefined' && var6 == 'undefined' && var7 == 'undefined' && var8 == 'undefined' && var9 == 'undefined') {

					$.consoleLn("The Leaderboard for " + callGameName + " - " + callCatName + " can be found here:");
					$.consoleLn(url + callGameID + '?x=' + category);
					return;

				}
				// Build varString (example: ID12313154=Value23525)
				if (var1 != 'undefined' || var2 != 'undefined' || var3 != 'undefined' || var4 != 'undefined' || var5 != 'undefined' || var6 != 'undefined' || var7 != 'undefined' || var8 != 'undefined' || var9 != 'undefined') {
					if (var1 != "undefined") {
						varString = varString + "var-" + var1 + "&";
						varValueArray.push(var1.split("=")[1])
						VuSString = VuS1
					}

					if (var2 != "undefined") {
						varString = varString + "var-" + var2 + "&";
						varValueArray.push(var2.split("=")[1])
						VuSString = VuS1 + VuS2
					}

					if (var3 != "undefined") {
						varString = varString + "var-" + var3 + "&";
						varValueArray.push(var3.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3
					}

					if (var4 != "undefined") {
						varString = varString + "var-" + var4 + "&";
						varValueArray.push(var4.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4
					}

					if (var5 != "undefined") {
						varString = varString + "var-" + var5 + "&";
						varValueArray.push(var5.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5
					}

					if (var6 != "undefined") {
						varString = varString + "var-" + var6 + "&";
						varValueArray.push(var6.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6
					}

					if (var7 != "undefined") {
						varString = varString + "var-" + var7 + "&";
						varValueArray.push(var7.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6 + VuS7
					}

					if (var8 != "undefined") {
						varString = varString + "var-" + var8 + "&";
						varValueArray.push(var8.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6 + VuS7 + VuS8
					}

					if (var9 != "undefined") {
						varString = varString + "var-" + var9 + "&";
						varValueArray.push(var9.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6 + VuS7 + VuS8 + VuS9
					}

					//			Workaround START
					if (var1 == "undefined" && var2 != "undefined") {
						var switchVar = (var1 = var2);
						var switchVuS = (VuS1 = VuS2);
					}
					if (var1 == "undefined" && var3 != "undefined") {
						var switchVar = (var1 = var3);
						var switchVuS = (VuS1 = VuS3);
					}
					if (var1 == "undefined" && var4 != "undefined") {
						var switchVar = (var1 = var4);
						var switchVuS = (VuS1 = VuS4);
					}
					if (var1 == "undefined" && var5 != "undefined") {
						var switchVar = (var1 = var5);
						var switchVuS = (VuS1 = VuS5);
					}
					if (var1 == "undefined" && var6 != "undefined") {
						var switchVar = (var1 = var6);
						var switchVuS = (VuS1 = VuS6);
					}
					if (var1 == "undefined" && var7 != "undefined") {
						var switchVar = (var1 = var7);
						var switchVuS = (VuS1 = VuS7);
					}
					if (var1 == "undefined" && var8 != "undefined") {
						var switchVar = (var1 = var8);
						var switchVuS = (VuS1 = VuS8);
					}
					if (var1 == "undefined" && var9 != "undefined") {
						var switchVar = (var1 = var9);
						var switchVuS = (VuS1 = VuS9);
					}
					//			Workaround END

					var valueString = "";
					var variables = varNameJSON.data.variables.data;
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

				$.consoleLn("The Leaderboard for " + callGameName + " - " + callCatName + valueString + " can be found here:");
				$.consoleLn(url + callGameID + '?x=' + category + VuSString);
					return;
				}
			}
			// Individual Level is True
			if (isIL == 'true') {
				isIL = $.getIniDbString('SRCTableILstate', modeName, state);

				// Game Calls
				gameNameJSON = JSON.parse($.customAPI.get("https://www.speedrun.com/api/v1/games/" + game).content);
				callGameName = gameNameJSON.data.names.international;
				callGameID = gameNameJSON.data.abbreviation

				// IL Calls
				urlLvl = "https://www.speedrun.com/api/v1/levels/" + lvl + "?";
				urlLvlCat = "https://www.speedrun.com/api/v1/categories/" + category;
				urlLvlVar = "https://www.speedrun.com/api/v1/variables/";
				lvlJSON = JSON.parse($.customAPI.get(urlLvl).content);
				lvlCatJSON = JSON.parse($.customAPI.get(urlLvlCat).content);
				lvlCat = lvlCatJSON.data.name;
				lvlCatID = lvlCatJSON.data.id;
				lvlName = lvlJSON.data.name;
				lvlNameID = lvlJSON.data.id;
				if (ilvar != 'undefined') {
					var lvlILNameJSON = JSON.parse($.customAPI.get(urlLvlVar + ilvar.split("=")[0]).content);
					var lvlILName = lvlILNameJSON.data.values.values[ilvar.split("=")[1]].label;
					var ilVuS = '-' + ilvar.split("=")[0] + '.' + ilvar.split("=")[1];
				}

				// Cat Calls
				catNameJSON = JSON.parse($.customAPI.get("https://www.speedrun.com/api/v1/categories/" + category).content);
				callCatName = catNameJSON.data.name;

				// Var 1-9 Calls
				VuS1 = '-' + var1.split("=")[0] + '.' + var1.split("=")[1];
				VuS2 = '-' + var2.split("=")[0] + '.' + var2.split("=")[1];
				VuS3 = '-' + var3.split("=")[0] + '.' + var3.split("=")[1];
				VuS4 = '-' + var4.split("=")[0] + '.' + var4.split("=")[1];
				VuS5 = '-' + var5.split("=")[0] + '.' + var5.split("=")[1];
				VuS6 = '-' + var6.split("=")[0] + '.' + var6.split("=")[1];
				VuS7 = '-' + var7.split("=")[0] + '.' + var7.split("=")[1];
				VuS8 = '-' + var8.split("=")[0] + '.' + var8.split("=")[1];
				VuS9 = '-' + var9.split("=")[0] + '.' + var9.split("=")[1];

				// Build No varString (example: ID12313154=Value23525)
				if (var1 == 'undefined' && var2 == 'undefined' && var3 == 'undefined' && var4 == 'undefined' && var5 == 'undefined' && var6 == 'undefined' && var7 == 'undefined' && var8 == 'undefined' && var9 == 'undefined') {

					$.consoleLn("The Leaderboard for " + callGameName + " - " + lvlCat + " (" + lvlName + " ) can be found here:");
					$.consoleLn(url + callGameID + '?&x=l_' + lvlNameID + '-' + lvlCatID);
					return;

				}
				// Build varString (example: ID12313154=Value23525)
				if (var1 != 'undefined' || var2 != 'undefined' || var3 != 'undefined' || var4 != 'undefined' || var5 != 'undefined' || var6 != 'undefined' || var7 != 'undefined' || var8 != 'undefined' || var9 != 'undefined') {
					if (var1 != "undefined") {
						varString = varString + "var-" + var1 + "&";
						varValueArray.push(var1.split("=")[1])
						VuSString = VuS1
					}

					if (var2 != "undefined") {
						varString = varString + "var-" + var2 + "&";
						varValueArray.push(var2.split("=")[1])
						VuSString = VuS1 + VuS2
					}

					if (var3 != "undefined") {
						varString = varString + "var-" + var3 + "&";
						varValueArray.push(var3.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3
					}

					if (var4 != "undefined") {
						varString = varString + "var-" + var4 + "&";
						varValueArray.push(var4.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4
					}

					if (var5 != "undefined") {
						varString = varString + "var-" + var5 + "&";
						varValueArray.push(var5.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5
					}

					if (var6 != "undefined") {
						varString = varString + "var-" + var6 + "&";
						varValueArray.push(var6.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6
					}

					if (var7 != "undefined") {
						varString = varString + "var-" + var7 + "&";
						varValueArray.push(var7.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6 + VuS7
					}

					if (var8 != "undefined") {
						varString = varString + "var-" + var8 + "&";
						varValueArray.push(var8.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6 + VuS7 + VuS8
					}

					if (var9 != "undefined") {
						varString = varString + "var-" + var9 + "&";
						varValueArray.push(var9.split("=")[1])
						VuSString = VuS1 + VuS2 + VuS3 + VuS4 + VuS5 + VuS6 + VuS7 + VuS8 + VuS9
					}

					//			Workaround START
					if (var1 == "undefined" && var2 != "undefined") {
						var switchVar = (var1 = var2);
						var switchVuS = (VuS1 = VuS2);
					}
					if (var1 == "undefined" && var3 != "undefined") {
						var switchVar = (var1 = var3);
						var switchVuS = (VuS1 = VuS3);
					}
					if (var1 == "undefined" && var4 != "undefined") {
						var switchVar = (var1 = var4);
						var switchVuS = (VuS1 = VuS4);
					}
					if (var1 == "undefined" && var5 != "undefined") {
						var switchVar = (var1 = var5);
						var switchVuS = (VuS1 = VuS5);
					}
					if (var1 == "undefined" && var6 != "undefined") {
						var switchVar = (var1 = var6);
						var switchVuS = (VuS1 = VuS6);
					}
					if (var1 == "undefined" && var7 != "undefined") {
						var switchVar = (var1 = var7);
						var switchVuS = (VuS1 = VuS7);
					}
					if (var1 == "undefined" && var8 != "undefined") {
						var switchVar = (var1 = var8);
						var switchVuS = (VuS1 = VuS8);
					}
					if (var1 == "undefined" && var9 != "undefined") {
						var switchVar = (var1 = var9);
						var switchVuS = (VuS1 = VuS9);
					}
					//			Workaround END
					
					var valueString = "";
					var variables = ILvarNameJSON.data.variables.data;
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

					$.consoleLn("The Leaderboard for " + callGameName + " - " + callCatName + valueString + " can be found here:");
					$.consoleLn(url + callGameID + '?&x=l_' + lvlNameID + '-' + lvlCatID + VuSString + ilVuS);
					return;

				}
			}
		}
	});
})();