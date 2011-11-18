// Example usage:
// <var>person(1)</var> traveled 5 mi by <var>vehicle(1)</var>. Let
// <var>his(1)</var> average speed be <var>personVar(1)</var>.
// Let <var>person(2)</var>'s speed be <var>personVar(2)</var>.
//
// Note that initials (-Var) are guaranteed to be unique in each category,
// but not across them.

// odmiany przez przypadki wszystkich słów
// "słowo" : [[liczba pojedyncza],[liczba mnoga]]
// 1. (M.) mianownik - Kto? Co? - żółw, żółwie
// 2. (D.) dopełniacz - Kogo? Czego? (Czyj?) - żółwia, żółwi
// 3. (C.) celownik - Komu? Czemu? - żółwiowi, żółwiom
// 4. (B.) biernik - Kogo? Co? - żółwia, żółwi
// 5. (N.) narzędnik - Kim? Czym? - żółwiem, żółwiami
// 6. (Ms.) miejscownik - O kim? O czym? - żółwiu, żółwiach

var WORD_CONJUGATION = {
    "Paweł": [["Pawła","Pawłowi","Pawła","Pawłem","Pawle"]],
    "on": [["jego","jemu","jego","nim","nim"]],
    "ona": [["jej","jej","ją","nią","niej"]],
    "długopis" : [["długopisu","długopisowi","długopis","długopisem","długopisie"],
                  ["długopisy","długopisów","długopisom","długopisy","długopisami","długopisach"]],
    "ołówek": [["ołówka","ołówkowi","ołówek","ołówkiem","ołówku"],
               ["ołówki","ołówków","ołówkom","ołówki","ołókami","ołówkach"]],
    "zeszyt": [["zeszytu","zeszytowi","zeszyt","zeszytem","zeszycie"],
               ["zeszyty","zeszytów","zeszytom","zeszyty","zeszytom","zeszytach"]],
    "młotek": [["młotka","młotkowi","młotek","młotkiem","młotku"],
               ["młotki","młotków","młotkom","młotki","młotkami","młotkach"]],
    "gwóźdź": [["gwoździa","gwoździowi","gwóźdź","gwoździem","gwoździu"],
               ["gwoździe","gwoździ","gwoździom","gwoździe","gwoździami","gwoździach"]],
    "piła": [["piły","pile","piłę","piłą","pile"],
             ["piły","pił","piłom","piły","piłami","piłach"]],
    "banan": [["banana","bananowi","banana","bananem","bananie"],
              ["banany","bananów","bananom","banany","bananami","bananach"]],
    "bochenek chleba": [["bochenka chleba","bochenkowi chleba","bochenek chleba","bochenkiem chleba","bochenku chleba"],
                        ["bochenki chleba","bochenków chleba","bochenkom chleba","bochenki chleba","bochenkami chleba","bochenkach chleba"]],
    "litr mleka": [["litra mleka","litrowi mleka","litr mleka","litrem mleka","litrze mleka"],
                   ["litry mleka","litrów mleka","litrom mleka","litry mleka","litrom mleka","litrach mleka"]],
    "ziemniak": [["ziemniaka","ziemniakowi","ziemniaka","ziemniaku","ziemniakiem"],
                 ["ziemniaki","ziemniaków","ziemniakom","ziemniak","ziemniakami","ziemniakach"]],
    "zabawka": [["zabawki","zabawce","zabawkę","zabawką","zabawce"],
                ["zabawki","zabawek","zabawkom","zabawki","zabawkami","zabawkach"]],
    "gra": [["gry","grze","grę","grą","grze"],
            ["gry","gier","grom","gry","grami","grach"]],
    "pamiątka": [["pamiątki","pamiątce","pamiątkę","pamiątką","pamiątce"]
                 ["pamiątki","pamiątek","pamiątkom","pamiątki","pamiątkami","pamiątkach"]],
    "pluszowy miś":[["pluszowego misia","pluszowemu misiowi","pluszowego misia","pluszowym misiem","pluszowym misiu"],
                    ["pluszowe misie","pluszowych misi","pluszowym misiom","pluszowe misie","pluszowymi misiami","pluszowych misiach"]],
    "gra komputerowa":[["grę komputerową","grze komputerowej","grę komputerową","grą komputerową","grze komputerowej"],
                       ["gry komputerowe","gier komputerowych","grom komputerowym","gry komputerowe","grami komputerowymi","grach komputerowych"]],
    "resorak":[["resoraka","resorakowi","resoraka","resorakiem","resoraku"],
               ["resoraki","resoraków","resorakom","resoraki","resorakami","resorakach"]],
    "lalka":[["lalki","lalce","lalkę","lalką","lalce"],
             ["lalki","lalek","lalka","lalka","lalkami","lalkami"]],
    "dziewczynka":[["dziewczynki","dziewczynce","dziewczynkę","dziewczynką","dziewczynce"],
                   ["dziewczynki","dziewczynek","dziewczynkom","dziewczynki","dziewczynkom","dziewczynkach"]],
    "chłopiec":[["chłopca","chłopcu","chłopca","chłopcem","chłopcu"],
               ["chłopcy","chłopców","chłopcom","chłopców","chłopcami","chłopcach"]],
    "uczeń":[["ucznia","uczniowi","ucznia","uczniem","uczniu"],                     
             ["uczniowie","uczniów","uczniom","uczniów","uczniami","uczniach"]],
    "rower":[["rowera","rowerowi","rower","rowerem","rowerze"]],
    "samochód":[["samochodu","samochodowi","samochód","samochodem","samochodzie"]],
    "koń":[["konia","koniowi","konia","koniem","koniu"]],
    "motor":[["motoru","motorowi","motor","motorem","motorze"]],
    "skuter":[["skutera","skuterowi","skuter","skuterem","skuterze"]],
    "pociąg":[["pociągu","pociągowi","pociąg","pociągiem","pociągu"]],
    "matematyka":[["matematyki","matematyce","matematykę","matematyką","matematyce"]],
    "chemia":[["chemii","chemii","chemię","chemią","chemii"]],
    "geografia":[["geografii","geografii","geografię","geografią","geografii"]],
    "język angielski":[["języka angielskiego","językowi angielskiemu","język angielski","językiem angielskim","języku angielskim"]],
    "egzamin":[["egzaminu","egzaminowi","egzamin","egzaminem","egzaminie"]],
    "grupa":[["grupy","grupie","grupę","grupą","grupie"],["grupy","grup","grupom","grupy","grupom","grupach"]],
    "test":[["testu","testowi","test","testem","teście"]],
    "quiz":[["quizu","quizowi","quiz","quizem","quizie"]],
    "rok":[["roku","roku","rok","rokiem","roku"],["lata","lat","lata","latami","latach"]],
    "Ania": [["Ani"]],
    "Bartek": [["Bartka"]],
    "Czarek": [["Czarka"]],
    "Daniel": [["Daniela"]],
    "Emilia": [["Emilii"]],
    "Gabriela": [["Gabrieli"]],
    "Irek": [["Irka"]],
    "Joasia": [["Joasi"]],
    "Kuba": [["Kuby"]],
    "Leszek": [["Leszka"]],
    "Michał": [["Michała"]],
    "Natalia": [["Natalii"]],
    "Olek": [["Olka"]],
    "Sylwia": [["Sylwii"]],
    "Tamara": [["Tamary"]],
    "Urszula": [["Urszuli"]],
    "jednoska" : [["jednostki","jednostce","jednotskę","jednostką","jednostce"],
                  ["jednostki","jednostek","jednostkom","jednostki","jednostkami","jednostkach"]],
    "flamaster":[["flamastra"],["flamastry","flamastrów"]],
    "gumka":[["gumki"],["gumki","gumek"]],
    "kredka":[["kredki"],["kredki","kredek"]],
    "nożyczki":[["nożyczek"],["nożyczki","nożyczek"]],
    "ołówek":[["ołówka"],["ołówki","ołówków"]],
    "pieczątka":[["pieczątki"],["pieczątki","pieczątek"]],
    "teczka":[["teczki"],["teczki","teczek"]],
    "zszywacz":[["zszywacza"],["zszywacze","zszywaczy"]],
    "rząd":[["rzędu","rzędowi","rząd","rzędzie","rzędem","rzędzie"],["rzędy","rzędów","rzędom","rzędy","rzędami","rzędach"]],
    "kółko":[["kółka","kółku","kółko","kółkiem","kółku"],["kółka","kółek","kółkom","kółka","kółkami","kółkach"]],
    "punkt" :[["punktu","punktowi","punkt","punktem","punkcie"],
	      ["punkty","punktów","punktom","punkty","punktami","punktach"]],
    "zielony punkt" :[["zielonego punktu","zielonemu punktowi","zielony punkt","zielonym punktem","zielonym punkcie"],
	      ["zielone punkty","zielonych punktów","zielonym punktom","zielone punkty","zielonymi punktami","zielonych punktach"]],
    "niebieski punkt" :[["niebieskiego punktu","niebieskiemu punktowi","niebieski punkt","niebieskim punktem","niebieskim punkcie"],
	      ["niebieskie punkty","niebieskich punktów","niebieskim punktom","niebieskie punkty","niebieskimi punktami","niebieskich punktach"]]
};




GENDER_FORMS = {
    "starszy":"starsza",
    "młodszy":"młodsza"
};

// Kocham polską gramatykę :^
jQuery.extend( KhanUtil, {
    wordGender: function( word, gender ) {
        if ( gender == "m") {
            return word;
        } else {
            return GENDER_FORMS[word];
        }
    },

    conjugate: function( word, caseNum, plural ) {

        if ( plural == null ) {
            plural = 1;    
        }
        
        if ( caseNum == null ) {
            caseNum = 1;
        }

    
        // jeżeli liczba pojedyńcza i mianownik to zwróć to samo słowo
        if ( plural == 1 && caseNum == 1 ) {
            return word
        } else if ( plural == 1 && caseNum > 1 ) {
            // odejmuje jeszcze jedynkę ponieważ dla liczby pojedyńczej nie wpisywałem mianowników
            // ponieważ są one jako klucz w tej tabeli
            return WORD_CONJUGATION[ word ][0][ caseNum - 1 - 1 ];
        } else if ( plural == 2 ) {
            // już w przypadku liczby mnogiej wszystko wraca do normy
            return WORD_CONJUGATION[ word ][1][ caseNum - 1 ]
        } else {
            // nie powinno się zdarzyć
            return word;
        }
    },

	// Ported from https://github.com/clojure/clojure/blob/master/src/clj/clojure/pprint/cl_format.clj#L285
	cardinal: function( n ) {
		var cardinalScales = ["", "tysiąc", "milion", "miliard", "bilion", "biliard", "trylion", "sekstylion", "septylion", "oktylion", "nonylion", "decylion", "sekstylionów", "duodecylion", "tredecylion", "quattuordecylion", "quindecylion", "seksdecylion", "septendecylion", "octodecylion", "novemdecylion", "vigintylion"];
		var cardinalUnits = ["jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć", "dziesięć", "jedenaście","dwanaście","trzynaście","czternaście","piętnaście","szesnaście","siedemnaście","osiemnaście","dziewiętnaście"];
		var cardinalTens = ["", "", "dwadzieścia","trzydzieści", "czterdzieści", "pół", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewięćdziesiąt"];
        var cardinalHundreds = ["sto","dwieście","trzysta","czterysta","pięćset","sześćset","siedemset","osiemset","dziewięćset"]
		// For formatting numbers less than 1000
		var smallNumberWords = function( n ) {
			var hundredDigit = Math.floor( n / 100 );
			var rest = n % 100;
			var str = "";

			if ( hundredDigit ) {
				str += cardinalHundreds[ hundredDigit ];
			}

			if ( hundredDigit && rest ) {
				str += " ";
			}

			if ( rest ) {
				if ( rest < 20 ) {
					str += cardinalUnits [ rest ];
				} else {
					var tenDigit = Math.floor( rest / 10 );
					var unitDigit = rest % 10;

					if ( tenDigit ) {
						str += cardinalTens [ tenDigit ];
					}

					if ( tenDigit && unitDigit ) {
						str += "-";
					}

					if ( unitDigit ) {
						str += cardinalUnits [ unitDigit ];
					}
				}
			}

			return str;
		};

		if ( n == 0 ) return "zero";
		else {
			var neg = false;
			if ( n < 0 ) {
				neg = true;
				n = Math.abs( n );
			}

			var words = [];
			var scale = 0;
			while ( n > 0 ) {
				var end = n % 1000;

				if ( end > 0 ) {
					if ( scale > 0 ) {
						words.unshift( cardinalScales[ scale ] );
					}

					words.unshift( smallNumberWords( end ) );
				}

				n = Math.floor( n / 1000 );
				scale += 1;
			}

			if ( neg ) words.unshift( "negative" );
			return words.join( " " );
		}
	},

	Cardinal: function( n ) {
		var card = KhanUtil.cardinal( n );
		return card.charAt(0).toUpperCase() + card.slice(1);
	},
});

jQuery.extend( KhanUtil, {
    // Funkcja conjword - tworzy prawidłową odmianę przez przypadki
    // Atrybuty
    // - word - słowo
    // - caseNum - przypadek (1 - mian, 2 - dop... itp) - domyślnie = mianownik
    // - number - liczba sztuk danej rzeczy (domyślnie 1)
    // - addNumber - dodaje liczbę (0 - nie dodaje, 1 - na początku, 2 na końcu) - domyślnie = na początku
    // - (not implemented) formatNumber - przekształca format liczby na (1 - liczbę, 2 - tekst) - domyślnie = liczba
    conjword: function(word, caseNum, number, addNumber, formatNumber) {
        if ( caseNum == null ) {
            caseNum = 1;
        }
         
        if ( number == null ) {
            number = 1;
        } 

        if ( addNumber == null ) {
            if ( number >= 2 ) { 
            	addNumber = 1;
	    } else {
		addNumber = 0;
	    }
        }

        if ( formatNumber == null ) {
            formatNumber = 1;
        }

        if ( caseNum == 1 && number == 1) {
            properWord = word;
        } else if ( caseNum > 1 && number == 1 ) {
            // odejmuje jeszcze jedynkę ponieważ dla liczby pojedyńczej nie wpisywałem mianowników
            // ponieważ są one jako klucz w tej tabeli
            properWord = WORD_CONJUGATION[ word ][0][ caseNum - 1 - 1 ];
        } else if ( number >= 2 ) {
            // już w przypadku liczby mnogiej wszystko wraca do normy
            properWord = WORD_CONJUGATION[ word ][1][ caseNum - 1 ]
        } else {
            // nie powinno się zdarzyć
            properWord =  word;
        }

        if ( formatNumber == 1 ) {
            properNumber = number;
        } else {
	    // TODO: liczby słownie - trzeba będzie dodać odmiany wszystkich liczb :(
            properNumber = number;
        }	

	if ( addNumber == 1 ) {
	    properWord = properNumber + ' ' + properWord;
	} else if ( addNumber == 2) {
	    properWord = properWord + ' ' + properNumber;
        }

	return properWord;
    }
});

jQuery.extend( KhanUtil, {
	toSentence: function( array, conjunction ) {
		if ( conjunction == null ) {
			conjunction = "i";
		}

		if ( array.length === 0 ) {
			return "";
		} else if ( array.length === 1 ) {
			return array[0];
		} else if ( array.length === 2 ) {
			return array[0] + " " + conjunction + " " + array[1];
		} else {
			return array.slice(0, -1).join(", ") + ", " + conjunction + " " + array[ array.length - 1 ];
		}
	},

	// pluralization helper.  There are five signatures
	// - plural(NUMBER): return "s" if NUMBER is not 1
	// - plural(NUMBER, singular):
	//		- if necessary, magically pluralize <singular>
	//		- return "NUMBER word"
	// - plural(NUMBER, singular, plural):
	//		- return "NUMBER word"
	// - plural(singular, NUMBER):
	//		- if necessary, magically pluralize <singular>
	//		- return "word"
	// - plural(singular, plural, NUMBER):
	//		- return "word"
	plural: (function() {
		var pluralizeWord = function(word) {
			// noone really needs extra spaces at the edges, do they?
			word = jQuery.trim( word );

			// determine if our word is all caps.  If so, we'll need to
			// re-capitalize at the end

			var isUpperCase = (word.toUpperCase() == word);

	               // tworze liczbę  mnogą
            		KhanUtil.conjugate(word,1,2);

			if ( isUpperCase ) {
				word = word.toUpperCase();
			}
    
			return word;
		};

		return function(value, arg, addValue) {
            if ( addValue == null) {
                addValue = true;            
            }

			if ( typeof value === "number" ) {

                var mod = value % 10;
                if ( value <= 0) {
                    arg = KhanUtil.conjugate( arg, 2, 2 );                
                } else if ( value == 1 ) {
                    arg = KhanUtil.conjugate( arg, 1, 1 );
                } else if (mod >= 2 && mod <= 4 && (value > 20 || value < 10)) {
                    arg = KhanUtil.conjugate( arg, 1, 2 );
                } else {
                    arg = KhanUtil.conjugate( arg, 2, 2 );
                }

                if (addValue == true) {
    				return value + " " + arg;   
                } else {
                    return arg;                
                }
			} else if ( typeof value === "string" ) {
				var plural = pluralizeWord(value);
				if ( typeof arg1 === "string" && arguments.length === 3 ) {
					plural = arg1;
					arg1 = arg2;
				}
				var usePlural = (arguments.length < 2 || (typeof arg1 === "number" && arg1 !== 1));
				return usePlural ? plural : value;
			}
		};
	})()
});

jQuery.fn[ "word-problemsLoad" ] = function() {
	var people = KhanUtil.shuffle([
		["Ania", "f"],
		["Bartek", "m"],
		["Czarek", "m"],
		["Daniel", "m"],
		["Emilia", "f"],
		["Gabriela", "f"],
		["Irek", "m"],
		["Joasia", "f"],
		["Kuba", "m"],
		["Leszek", "m"],
		["Michał", "m"],
		["Natalia", "f"],
		["Olek", "m"],
		["Sylwia", "f"],
		["Tamara", "f"],
		["Urszula", "f"]
	]);

	var vehicles = KhanUtil.shuffle([
		"rower",
		"samochód",
		"koń",
		"motor",
		"skuter",
		"pociąg"
	]);

	var courses = KhanUtil.shuffle([
		"I A",
		"II B",
		"III C",
		"IV D",
		"II C",
		"V A"
	]);

	var exams = KhanUtil.shuffle([
		"egzamin",
		"test",
		"quiz"
	]);

	var binops = KhanUtil.shuffle([
		"\\barwedge",
		"\\veebar",
		"\\odot",
		"\\oplus",
		"\\otimes",
		"\\oslash",
		"\\circledcirc",
		"\\boxdot",
		"\\bigtriangleup",
		"\\bigtriangledown",
		"\\dagger",
		"\\diamond",
		"\\star",
		"\\triangleleft",
		"\\triangleright"
	]);

	var collections = KhanUtil.shuffle([
		["chair", "row", "make"],
		["party favor", "bag", "fill"],
		["jelly bean", "pile", "make"],
		["book", "shelf", "fill"],
		["can of food", "box", "fill"]
	]);

	var stores = KhanUtil.shuffle([
		{
			name: "office supply",
			items: KhanUtil.shuffle( ["długopis", "ołówek", "zeszyt"] )
		},
		{
			name: "hardware",
			items: KhanUtil.shuffle( ["młotek", "gwóźdź", "piła"] )
		},
		{
			name: "grocery",
			items: KhanUtil.shuffle( ["banan", "bochenek chleba", "litr mleka", "ziemniak"] )
		},
		{
			name: "gift",
			items: KhanUtil.shuffle( ["zabawka", "gra", "pamiątka"] )
		},
		{
			name: "toy",
			items: KhanUtil.shuffle( ["pluszowy miś", "gra komputerowa", "resorak", "lalka"] )
		}
	]);

	var pizzas = KhanUtil.shuffle([
		"pizza",
		"ciasto",
		"tort"
	]);

	var timesofday = KhanUtil.shuffle([
		"in the morning",
		"around noon",
		"in the evening",
		"at night"
	]);

	var exercises = KhanUtil.shuffle([
		"push-up",
		"sit-up",
		"squat",
		"jumping jack"
	]);

	var fruits = KhanUtil.shuffle([
		"ananas",
		"banan",
		"czereśnia",
		"kiwi",
		"limonka",
		"mango",
		"nektarynka",
		"ogórek",
		"pomarańcza"
	]);

	var deskItems = KhanUtil.shuffle([
		"flamaster",
		"gumka",
		"kredka",
		"nożyczki",
		"ołówek",
		"pieczątka",
		"teczka",
		"zszywacz"
	]);

	var colors = KhanUtil.shuffle([
		"red",
		"orange",
		"yellow",
		"green",
		"blue",
		"purple",
		"white",
		"black",
		"brown",
		"silver",
		"gold",
		"pink"
	]);

	var schools = KhanUtil.shuffle([
		"Loyola",
		"Gardner Bullis",
		"Almond",
		"Covington",
		"Springer",
		"Santa Rita",
		"Oak"
	]);

	var clothes = KhanUtil.shuffle([
		"hat",
		"pair of pants",
		"belt",
		"necklace",
		"purse",
		"pair of shoes",
		"blouse",
		"skirt",
		"watch",
		"pair of socks",
		"sweatshirt",
		"sweater",
		"tie",
		"scarf",
		"dress"
	]);

	var sides = KhanUtil.shuffle([
		"left",
		"right"
	]);

	var shirtStyles = KhanUtil.shuffle([
		"long-sleeved",
		"short-sleeved"
	]);

	var farmers = KhanUtil.shuffle([
		{farmer:"farmer", crops:KhanUtil.shuffle(["tomato", "potato", "carrot", "bean", "corn stalk"]), field:"field"},
		{farmer:"gardener", crops:KhanUtil.shuffle(["rose", "tulip", "daisy", "iris", "lily"]), field:"garden"}
	]);

	var distances = KhanUtil.shuffle([
		"mile",
		"kilometer"
	]);

	var distanceActivities = KhanUtil.shuffle([
		{present:"ride", past:"rode", noun:"bike", done:"biked", continuous:"biking"},
		{present:"row", past:"rowed", noun:"boat", done:"rowed", continuous:"rowing"},
		{present:"drive", past:"drove", noun:"car", done:"driven", continuous:"driving"},
		{present:"walk", past:"walked", noun:"dog", done:"walked", continuous:"walking"}
	]);

	var indefiniteArticle = function(word) {
		var vowels = ['a', 'e', 'i', 'o', 'u'];
		if ( _(vowels).indexOf( word[0].toLowerCase() ) > -1 ) {
			return 'An ' + word;
		}
		return 'A ' + word;
	};

	jQuery.extend( KhanUtil, {

		person: function( i ) {
    	    return people[i - 1][0];
		},

		ofPerson: function( i ) {
            return KhanUtil.conjugate(people[i - 1][0], 2);            
		},
        
		personVar: function( i ) {
			return people[i - 1][0].charAt(0).toLowerCase();
		},

        gender: function( i ) {
            return people[i - 1][1];
        },

		he: function( i ) {
			return people[i - 1][1] == "m" ? "on" : "ona";
		},

		He: function( i ) {
			return people[i - 1][1] == "m" ? "On" : "Ona";
		},

		him: function( i ) {
			return people[i - 1][1] == "m" ? "nim" : "nią";
		},

		his: function( i ) {
			return people[i - 1][1] == "m" ? "jego" : "jej";
		},

		His: function( i ) {
			return people[i - 1][1] == "m" ? "Jego" : "Jej";
		},

		was: function ( i ) {
		    return people[i - 1][1] == "m" ? "był" : "była";
		},

		had: function ( i ) {
		    return people[i - 1][1] == "m" ? "miał" : "miała";  
		},

		older: function( i ) {
		    return KhanUtil.wordGender("starszy",people[i - 1][1]);
		},

		younger: function( i ) {
		    return KhanUtil.wordGender("młodszy",people[i - 1][1]);
		},

		years: function ( n, addValue ) {
		    return KhanUtil.plural( n, "rok", addValue );
		},

		units: function ( n ) {
		    return KhanUtil.plural( n, "jednostka", addValue );
		},

		vehicle: function( i ) {
			return vehicles[i - 1];
		},

		vehicleVar: function( i ) {
			return vehicles[i - 1].charAt(0);
		},

		course: function( i ) {
			return courses[i - 1];
		},

		courseVar: function( i ) {
			return courses[i - 1].charAt(0).toLowerCase();
		},

		exam: function( i ) {
			return exams[i - 1];
		},

		binop: function( i ) {
			return binops[i - 1];
		},

		item: function( i ) {
			return collections[i - 1][0];
		},

		group: function( i ) {
				return collections[i - 1][1];
		},

		groupVerb: function( i ) {
			return collections[i - 1][2];
		},

		store: function( i ) {
			return stores[i].name;
		},

		storeItem: function( i, j ) {
			return stores[i].items[j];
		},

		pizza: function( i ) {
			return pizzas[i];
		},

		exercise: function( i ) {
			return exercises[i - 1];
		},

		timeofday: function( i ) {
			return timesofday[i - 1];
		},

		school: function( i ) {
			return schools[i - 1];
		},

		clothing: function( i ) {
			return clothes[i - 1];
		},

		color: function( i ) {
			return colors[i - 1];
		},

		fruit: function( i ) {
			return fruits[i];
		},

		deskItem: function( i ) {
			return deskItems[i];
		},          

		ofDeskItem: function( i ) {
		        return KhanUtil.conjugate(deskItems[i], 2);
		},

		distance: function( i ) {
			return distances[i - 1];
		},

		rode: function( i ) {
			return distanceActivities[i - 1].past;
		},

		ride: function( i ) {
			return distanceActivities[i - 1].present;
		},

		bike: function( i ) {
			return distanceActivities[i - 1].noun;
		},

		biked: function( i ) {
			return distanceActivities[i - 1].done;
		},

		biking: function( i ) {
			return distanceActivities[i - 1].continuous;
		},

		farmer: function( i ) {
			return farmers[i - 1].farmer;
		},

		crop: function( i ) {
			return farmers[i - 1].crops[0];
		},

		field: function( i ) {
			return farmers[i - 1].field;
		},

		side: function( i ) {
			return sides[i - 1];
		},

		shirtStyle: function( i ) {
			return shirtStyles[i - 1];
		},
	});
};
