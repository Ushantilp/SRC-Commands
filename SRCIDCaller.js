(function () {
	var state = $.getIniDbString('SRCstates', 'currentState', 'undefined');
	var modeName = $.getIniDbString('SRCstates', 'currentState', state);
	$.bind('command', function (event) {
		var command = event.getCommand(),
			args = event.getArgs(),
			argument = String(event.getArguments()),
			sender = event.getSender();

	// URL ID Caller
		if (command.equalsIgnoreCase('callid')) {
			if (args.length != 1) {
				$.say("Usage: !callid {Leaderboard/User URL from Speedrun.com}");
				return;
			}
			// URL Handling
			var URLCallLang = String(args[0]);
			//Cut Lang Start
			URLCallIfLang = URLCallLang.slice(25, 31)
			if (URLCallIfLang == 'ar-EG/') {
				var LangSplit1 = URLCallLang.split('ar-EG/')[0];
				var LangSplit2 = URLCallLang.split('ar-EG/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'es-ES/') {
				var LangSplit1 = URLCallLang.split('es-ES/')[0];
				var LangSplit2 = URLCallLang.split('es-ES/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'de-DE/') {
				var LangSplit1 = URLCallLang.split('de-DE/')[0];
				var LangSplit2 = URLCallLang.split('de-DE/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'fr-FR/') {
				LangSplit1 = URLCallLang.split('fr-FR/')[0];
				LangSplit2 = URLCallLang.split('fr-FR/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'hi-IN/') {
				LangSplit1 = URLCallLang.split('hi-IN/')[0];
				LangSplit2 = URLCallLang.split('id-ID/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'id-ID/') {
				LangSplit1 = URLCallLang.split('id-ID/')[0];
				LangSplit2 = URLCallLang.split('it-IT/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'ja-JP/') {
				LangSplit1 = URLCallLang.split('ja-JP/')[0];
				LangSplit2 = URLCallLang.split('ja-JP/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'ko-KR/') {
				LangSplit1 = URLCallLang.split('ko-KR/')[0];
				LangSplit2 = URLCallLang.split('ko-KR/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'nl-NL/') {
				LangSplit1 = URLCallLang.split('nl-NL/')[0];
				LangSplit2 = URLCallLang.split('pl-PL/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'pt-BR/') {
				LangSplit1 = URLCallLang.split('pt-BR/')[0];
				LangSplit2 = URLCallLang.split('pt-BR/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'ru-RU/') {
				LangSplit1 = URLCallLang.split('ru-RU/')[0];
				LangSplit2 = URLCallLang.split('ru-RU/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'sv-SE/') {
				LangSplit1 = URLCallLang.split('sv-SE/')[0];
				LangSplit2 = URLCallLang.split('sv-SE/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'tr-TR/') {
				LangSplit1 = URLCallLang.split('tr-TR/')[0];
				LangSplit2 = URLCallLang.split('tr-TR/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else if (URLCallIfLang == 'zh-CN/') {
				LangSplit1 = URLCallLang.split('zh-CN/')[0];
				LangSplit2 = URLCallLang.split('zh-CN/')[1];
				var URLCall = LangSplit1 + LangSplit2
			}
			else (URLCall = URLCallLang);
			//Cut Lang End
			URLsplit1 = URLCall.split(".com/")[1];
			var URLsplit2 = URLsplit1.split("/")[0];
			URLsplit3 = URLsplit1.split("/")[1]
			if (URLsplit3 == 'levels') {
				$.say('Please Select a Individual Level First!');
				return;
			}
			if (URLsplit2 == 'users') {
				Usplit = URLsplit1.split("/")[1];
				userURL = "https://www.speedrun.com/api/v1/users/";
				userJSON = JSON.parse($.customAPI.get(userURL + Usplit).content);
				userName = userJSON.data.names.international;
				userID = userJSON.data.id;
				$.say('The User for "' + modeName + '" is set to: ' + userName);
				$.setIniDbString('SRCTablePlayer', modeName, userID);
				return;
			}

		// Game Name & ID Call
			if (URLsplit2 != 'users') {
				Gsplit1 = URLCall.split(".com/")[1];
				Gsplit2 = Gsplit1.split("?h=")[0];
				Gsplit3 = Gsplit2.split("/levels")[0];
				gameURL = "https://www.speedrun.com/api/v1/games/"
				gameJSON = JSON.parse($.customAPI.get(gameURL + Gsplit3).content);
				gameName = gameJSON.data.names.international
				gameID = gameJSON.data.id;
				$.say('The Game for "' + modeName + '" is set to: ' + gameName);
				$.setIniDbString('SRCTableGame', modeName, gameID);


		// Indiviuale Level Check
			if (URLCall.split("&x=l_")[1] != undefined) {
				// Level Name & ID Call
					Lsplit1 = URLCall.split("&x=l_")[1];
					Lsplit2 = Lsplit1.split("-")[0];
					Lsplit3 = Lsplit1.split("-")[1];
					lvlURL = "https://www.speedrun.com/api/v1/levels/";
					lvlJSON = JSON.parse($.customAPI.get(lvlURL + Lsplit2).content);
					lvlName = lvlJSON.data.name;
					lvlID = lvlJSON.data.id;
					$.say('The Level for "' + modeName + '" is set to: ' + lvlName);
					$.setIniDbString('SRCTableLvL', modeName, lvlID);
					$.setIniDbString('SRCTableILstate', modeName, 'true');

					ilURL = "https://www.speedrun.com/api/v1/categories/";
					ilJSON = JSON.parse($.customAPI.get(ilURL + Lsplit3).content);
					ilName = ilJSON.data.name;
					ilID = ilJSON.data.id;
					$.say('The IL Category for "' + modeName + '" is set to: ' + ilName);
					ilGesamt = lvlID + '=' + ilID
					$.setIniDbString('SRCTableIL', modeName, ilGesamt);

					var catID = ilID
					$.setIniDbString('SRCTableCat', modeName, catID);
					var ilFalse = lvlName
				}
				if (ilFalse == undefined) {
					// Cat Name & ID Call
					Csplit1 = URLCall.split("&x=")[1];
					Csplit2 = Csplit1.split("-")[0];
					catURL = "https://www.speedrun.com/api/v1/categories/";
					catJSON = JSON.parse($.customAPI.get(catURL + Csplit2).content);
					catName = catJSON.data.name;
					catID = catJSON.data.id;
					$.say('The Category for "' + modeName + '" is set to: ' + catName);
					$.setIniDbString('SRCTableCat', modeName, catID);
					$.inidb.del('SRCTableILstate', modeName);
					$.inidb.del('SRCTableIL', modeName);
					$.inidb.del('SRCTableLvL', modeName);
				}
		// Variable & Value Name & ID Call
				varURL = "https://www.speedrun.com/api/v1/variables/";
			// Var 1
				var1Check = $.getIniDbString('SRCTableVar1', modeName, undefined);
				if (var1Check != undefined) {
					$.inidb.del('SRCTableVar1', modeName);
				}
				var1Split1 = URLCall.split(catID + "-")[1];
				if (var1Split1 == undefined) {
					return;
				}
				var1Split2 = var1Split1.split('-')[0];
				var1Split3 = var1Split2.split('.')[0];
				if (var1Split2.split('.')[2] != undefined) {
					var1JSON = JSON.parse($.customAPI.get(varURL + var1Split3).content);
					var1Name = var1JSON.data.name;
					$.say('There are to Many Values for "' + var1Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var1Split4 = var1Split2.split('.')[1];
				var1JSON = JSON.parse($.customAPI.get(varURL + var1Split3).content);
				var1Name = var1JSON.data.name;
				var1ID = var1JSON.data.id;
				val1Name = var1JSON.data.values.values[var1Split4].label;
				val1ID = var1Split4;
				var1Gesamt = var1ID + "=" + val1ID;
				ifILvar = URLCall.split(var1Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var1Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var1Name + ': ' + val1Name);
					return;
				}
				else $.setIniDbString('SRCTableVar1', modeName, var1Gesamt);
				$.say('The Variable 1 for "' + modeName + '" is set to: ' + var1Name + ': ' + val1Name);
			// Var 2
				var2Check = $.getIniDbString('SRCTableVar2', modeName, undefined);
				if (var2Check != undefined) {
					$.inidb.del('SRCTableVar2', modeName);
				}
				var2Split1 = URLCall.split(var1Split2 + "-")[1];
				if (var2Split1 == undefined) {
					return;
				}
				var2Split2 = var2Split1.split('-')[0];
				var2Split3 = var2Split2.split('.')[0];
				if (var2Split2.split('.')[2] != undefined) {
					var2JSON = JSON.parse($.customAPI.get(varURL + var2Split3).content);
					var2Name = var2JSON.data.name;
					$.say('There are to Many Values for "' + var2Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var2Split4 = var2Split2.split('.')[1];
				var2JSON = JSON.parse($.customAPI.get(varURL + var2Split3).content);
				var2Name = var2JSON.data.name;
				var2ID = var2JSON.data.id;
				val2Name = var2JSON.data.values.values[var2Split4].label;
				val2ID = var2Split4;
				var2Gesamt = var2ID + "=" + val2ID;
				ifILvar = URLCall.split(var2Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var2Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var2Name + ': ' + val2Name);
					return;
				}
				else $.setIniDbString('SRCTableVar2', modeName, var2Gesamt);
				$.say('The Variable 2 for "' + modeName + '" is set to: ' + var2Name + ': ' + val2Name);
			// Var 3
				var3Check = $.getIniDbString('SRCTableVar3', modeName, undefined);
				if (var3Check != undefined) {
					$.inidb.del('SRCTableVar3', modeName);
				}
				var3Split1 = URLCall.split(var2Split2 + "-")[1];
				if (var3Split1 == undefined) {
					return;
				}
				var3Split2 = var3Split1.split('-')[0];
				var3Split3 = var3Split2.split('.')[0];
				if (var3Split2.split('.')[2] != undefined) {
					var3JSON = JSON.parse($.customAPI.get(varURL + var3Split3).content);
					var3Name = var3JSON.data.name;
					$.say('There are to Many Values for "' + var3Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var3Split4 = var3Split2.split('.')[1];
				var3JSON = JSON.parse($.customAPI.get(varURL + var3Split3).content);
				var3Name = var3JSON.data.name;
				var3ID = var3JSON.data.id;
				val3Name = var3JSON.data.values.values[var3Split4].label;
				val3ID = var3Split4;
				var3Gesamt = var3ID + "=" + val3ID;
				ifILvar = URLCall.split(var3Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var3Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var3Name + ': ' + val3Name);
					return;
				}
				else $.setIniDbString('SRCTableVar3', modeName, var3Gesamt);
				$.say('The Variable 3 for "' + modeName + '" is set to: ' + var3Name + ': ' + val3Name);
			// Var 4
				var4Check = $.getIniDbString('SRCTableVar4', modeName, undefined);
				if (var4Check != undefined) {
					$.inidb.del('SRCTableVar4', modeName);
				}
				var4Split1 = URLCall.split(var3Split2 + "-")[1];
				if (var4Split1 == undefined) {
					return;
				}
				var4Split2 = var4Split1.split('-')[0];
				var4Split3 = var4Split2.split('.')[0];
				if (var4Split2.split('.')[2] != undefined) {
					var4JSON = JSON.parse($.customAPI.get(varURL + var4Split3).content);
					var4Name = var4JSON.data.name;
					$.say('There are to Many Values for "' + var4Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var4Split4 = var4Split2.split('.')[1];
				var4JSON = JSON.parse($.customAPI.get(varURL + var4Split3).content);
				var4Name = var4JSON.data.name;
				var4ID = var4JSON.data.id;
				val4Name = var4JSON.data.values.values[var4Split4].label;
				val4ID = var4Split4;
				var4Gesamt = var4ID + "=" + val4ID;
				ifILvar = URLCall.split(var4Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var4Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var4Name + ': ' + val4Name);
					return;
				}
				else $.setIniDbString('SRCTableVar4', modeName, var4Gesamt);
				$.say('The Variable 4 for "' + modeName + '" is set to: ' + var4Name + ': ' + val4Name);
			// Var 5
				var5Check = $.getIniDbString('SRCTableVar5', modeName, undefined);
				if (var5Check != undefined) {
					$.inidb.del('SRCTableVar5', modeName);
				}
				var5Split1 = URLCall.split(var4Split2 + "-")[1];
				if (var5Split1 == undefined) {
					return;
				}
				var5Split2 = var5Split1.split('-')[0];
				var5Split3 = var5Split2.split('.')[0];
				if (var5Split2.split('.')[2] != undefined) {
					var5JSON = JSON.parse($.customAPI.get(varURL + var5Split3).content);
					var5Name = var5JSON.data.name;
					$.say('There are to Many Values for "' + var5Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var5Split4 = var5Split2.split('.')[1];
				var5JSON = JSON.parse($.customAPI.get(varURL + var5Split3).content);
				var5Name = var5JSON.data.name;
				var5ID = var5JSON.data.id;
				val5Name = var5JSON.data.values.values[var5Split4].label;
				val5ID = var5Split4;
				var5Gesamt = var5ID + "=" + val5ID;
				ifILvar = URLCall.split(var5Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var5Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var5Name + ': ' + val5Name);
					return;
				}
				else $.setIniDbString('SRCTableVar5', modeName, var5Gesamt);
				$.say('The Variable 5 for "' + modeName + '" is set to: ' + var5Name + ': ' + val5Name);
			// Var 6
				var6Check = $.getIniDbString('SRCTableVar6', modeName, undefined);
				if (var6Check != undefined) {
					$.inidb.del('SRCTableVar6', modeName);
				}
				var6Split1 = URLCall.split(var5Split2 + "-")[1];
				if (var6Split1 == undefined) {
					return;
				}
				var6Split2 = var6Split1.split('-')[0];
				var6Split3 = var6Split2.split('.')[0];
				if (var6Split2.split('.')[2] != undefined) {
					var6JSON = JSON.parse($.customAPI.get(varURL + var6Split3).content);
					var6Name = var6JSON.data.name;
					$.say('There are to Many Values for "' + var6Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var6Split4 = var6Split2.split('.')[1];
				var6JSON = JSON.parse($.customAPI.get(varURL + var6Split3).content);
				var6Name = var6JSON.data.name;
				var6ID = var6JSON.data.id;
				val6Name = var6JSON.data.values.values[var6Split4].label;
				val6ID = var6Split4;
				var6Gesamt = var6ID + "=" + val6ID;
				ifILvar = URLCall.split(var6Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var6Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var6Name + ': ' + val6Name);
					return;
				}
				else $.setIniDbString('SRCTableVar6', modeName, var6Gesamt);
				$.say('The Variable6 for "' + modeName + '" is set to: ' + var6Name + ': ' + val6Name);
			// Var 7
				var7Check = $.getIniDbString('SRCTableVar7', modeName, undefined);
				if (var7Check != undefined) {
					$.inidb.del('SRCTableVar7', modeName);
				}
				var7Split1 = URLCall.split(var6Split2 + "-")[1];
				if (var7Split1 == undefined) {
					return;
				}
				var7Split2 = var7Split1.split('-')[0];
				var7Split3 = var7Split2.split('.')[0];
				if (var7Split2.split('.')[2] != undefined) {
					var7JSON = JSON.parse($.customAPI.get(varURL + var7Split3).content);
					var7Name = var7JSON.data.name;
					$.say('There are to Many Values for "' + var7Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var7Split4 = var7Split2.split('.')[1];
				var7JSON = JSON.parse($.customAPI.get(varURL + var7Split3).content);
				var7Name = var7JSON.data.name;
				var7ID = var7JSON.data.id;
				val7Name = var7JSON.data.values.values[var7Split4].label;
				val7ID = var7Split4;
				var7Gesamt = var7ID + "=" + val7ID;
				ifILvar = URLCall.split(var7Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var7Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var7Name + ': ' + val7Name);
					return;
				}
				else $.setIniDbString('SRCTableVar7', modeName, var7Gesamt);
				$.say('The Variable 7 for "' + modeName + '" is set to: ' + var7Name + ': ' + val7Name);
			// Var 8
				var8Check = $.getIniDbString('SRCTableVar8', modeName, undefined);
				if (var8Check != undefined) {
					$.inidb.del('SRCTableVar8', modeName);
				}
				var8Split1 = URLCall.split(var7Split2 + "-")[1];
				if (var8Split1 == undefined) {
					return;
				}
				var8Split2 = var8Split1.split('-')[0];
				var8Split3 = var8Split2.split('.')[0];
				if (var8Split2.split('.')[2] != undefined) {
					var8JSON = JSON.parse($.customAPI.get(varURL + var8Split3).content);
					var8Name = var8JSON.data.name;
					$.say('There are to Many Values for "' + var8Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var8Split4 = var8Split2.split('.')[1];
				var8JSON = JSON.parse($.customAPI.get(varURL + var8Split3).content);
				var8Name = var8JSON.data.name;
				var8ID = var8JSON.data.id;
				val8Name = var8JSON.data.values.values[var8Split4].label;
				val8ID = var8Split4;
				var8Gesamt = var8ID + "=" + val8ID;
				ifILvar = URLCall.split(var8Split2 + "-")[1];
				if (ifILvar == undefined && ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var8Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var8Name + ': ' + val8Name);
					return;
				}
				else $.setIniDbString('SRCTableVar8', modeName, var8Gesamt);
				$.say('The Variable 8 for "' + modeName + '" is set to: ' + var8Name + ': ' + val8Name);
			// Var 9
				var9Check = $.getIniDbString('SRCTableVar9', modeName, undefined);
				if (var9Check != undefined) {
					$.inidb.del('SRCTableVar9', modeName);
				}
				var9Split1 = URLCall.split(var8Split2 + "-")[1];
				if (var9Split1 == undefined) {
					return;
				}
				var9Split2 = var9Split1.split('-')[0];
				var9Split3 = var9Split2.split('.')[0];
				if (var9Split2.split('.')[2] != undefined) {
					var9JSON = JSON.parse($.customAPI.get(varURL + var9Split3).content);
					var9Name = var9JSON.data.name;
					$.say('There are to Many Values for "' + var9Name + '" selected, only one Value per variable are Supportet!')
					return;
				}
				var9Split4 = var9Split2.split('.')[1];
				var9JSON = JSON.parse($.customAPI.get(varURL + var9Split3).content);
				var9Name = var9JSON.data.name;
				var9ID = var9JSON.data.id;
				val9Name = var9JSON.data.values.values[var9Split4].label;
				val9ID = var9Split4;
				var9Gesamt = var9ID + "=" + val9ID;
				if (ilFalse != undefined) {
					$.setIniDbString('SRCTableIL', modeName, var9Gesamt);
					$.say('The Individual Level for "' + modeName + '" is set to: ' + var9Name + ': ' + val9Name);
					return;
				}
				else $.setIniDbString('SRCTableVar9', modeName, var9Gesamt);
				$.say('The Variable 9 for "' + modeName + '" is set to: ' + var9Name + ': ' + val9Name);

			}
		}
	});
})();