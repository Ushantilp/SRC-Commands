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
			urlPBTest = "https://www.speedrun.com/api/v1/runs?game="+game+"&user="+player+"&category="+category+"&var-"+var1+"&var-"+var2+"&status=verified&orderby=date&direction=desc"
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
			playerCall = playerJSON.data.names.international

			Testi = 'https://www.speedrun.com/api/v1/runs?user=8lo6q648&category=02q4qwyd&status=verified'
			Testcall = JSON.parse($.customAPI.get(Testi).content);
			TestCounter = '0';

			if (Testcall.data[0].values["51y1gx91"] != 'p12pd7kq') {
				for (var TestCounter = 0; TestCounter++;)
					$.say(TestCounter + " Test")
				if (Testcall.data[TestCounter].values["51y1gx91"] == 'p12pd7kq')
				$.say('Okay das scheint zu klappen');
			}


			/* ########################## PB Workaround ######################### */

			// Build No varString (example: ID12313154=Value23525)
			if (var1 != 'undefined' && var2 != 'undefined' && var3 == 'undefined' && var4 == 'undefined' && var5 == 'undefined' && var6 == 'undefined' && var7 == 'undefined' && var8 == 'undefined' && var9 == 'undefined') {

				var responsePB = JSON.parse($.customAPI.get(urlPBs + querystring).content);
				var response = JSON.parse($.customAPI.get(url + querystring).content);
				$.say(responsePB.data.runs)
				var catName = response.data.category.data.name;
					gameName = response.data.game.data.names.international;
									bestTime = responsePB.data.runs[0].run.times.primary;
								bestTime = bestTime.replace('H', 'h ');
								bestTime = bestTime.replace('M', 'm ');
								bestTime = bestTime.replace('S', 's');
				

				$.say(playerCall+" current PB for " + gameName + " - " + catName + " is "); 

/*				var modeName = state,
					pbData = $.getIniDbString('SRCTablePB', modeName, 'undefined');

				if (pbData == "undefined") {
					$.say("Set the PB Time with !setpb");
					return;
				}
				if (pbData == "00:00") {
					$.say("There is no run from Ushanti at the Moment");
					return;
				}


				$.say("Ushantis current PB for " + gameName + " - " + catName + " is " + pbData); 

				$.say("Ushantis current PB for " + gameName + " - " + catName + " is " + bestTime.substring(2)); 
*/
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


				var response = JSON.parse($.customAPI.get(url + varString + querystring).content);
				var catName = response.data.category.data.name,
					gameName = response.data.game.data.names.international,
					varValue = response.data.variables.data[0].values.values[var1.split("=")[1]].label,
					bestTime = response.data.runs[0].run.times.primary;
				bestTime = bestTime.replace('H', 'h ');
				bestTime = bestTime.replace('M', 'm ');
				bestTime = bestTime.replace('S', 's');


				var valueString = "";
				var variables = response.data.variables.data;
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

				var modeName = state,
					pbData = $.getIniDbString('SRCTablePB', modeName, 'undefined');

				if (pbData == "undefined") {
					$.say("Set the PB Time with !setpb");
					return;
				}
				if (pbData == "00:00") {
					$.say("There is no run from Ushanti at the Moment");
					return;
				}


				$.say("Ushantis current PB for " + gameName + " - " + catName + " is " + pbData);
			}

		}
		/* ########################## PB Workaround ######################### */

	});
})();