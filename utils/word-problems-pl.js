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
    "Paweł": ["Pawła","Pawłowi","Pawła","Pawłem","Pawle"],
    "on": ["jego","jemu","jego","nim","nim"],
    "ona": ["jej","jej","ją","nią","niej"],
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
    "test":[["testu","testowi","test","testem","teście"]],
    "quiz":[["quizu","quizowi","quiz","quizem","quizie"]]
};

jQuery.extend( KhanUtil, {
    conjugate: function( word, caseNum, plural ) {
        if ( plural == null ) {
            plural = 1;    
        }
        
        if ( caseNum == null ) {
            caseNum = 1;
        }

        // jeżeli liczba pojedyńcza i mianownik to zwróć to samo słowo
        if ( plural == 1 and caseNum == 1 ) {
            return word
        } else if ( plural == 1 and caseNum > 1 ) {
            // dodaje jedynkę ponieważ dla liczby pojedyńczej nie wpisywałem mianowników
            // ponieważ są one jako klucz w tej tabeli
            return WORD_CONJUGATION[ word ][0][ caseNum - 1 + 1 ];
        } else if ( plural == 2 ) {
            // już w przypadku liczby mnogiej wszystko wraca do normy
            return WORD_CONJUGATION[ word ][1][ caseNum - 1 ]
        } else {
            // nie powinno się zdarzyć
            return word;
        }
    }
});

jQuery.extend( KhanUtil, {


	toSentence: function( array, conjunction ) {
		if ( conjunction == null ) {
			conjunction = "and";
		}

		if ( array.length == 0 ) {
			return "";
		} else if ( array.length == 1 ) {
			return array[0];
		} else if ( array.length == 2 ) {
			return array[0] + " " + conjunction + " " + array[1];
		} else {
			return array.slice(0, -1).join(", ") + ", " + conjunction + " " + array[ array.length - 1 ];
		}
	},

	// pluralization helper.  There are three signatures
	// - plural(NUMBER): return "s" if NUMBER is not 1
	// - plural(NUMBER, singular):
	//		- if necessary, magically pluralize <singular>
	//		- return "NUMBER word"
	// - plural(NUMBER, singular, plural):
	//		- return "NUMBER word"
	plural: (function() {
		var pluralizeWord = function(word) {

			// noone really needs extra spaces at the edges, do they?
			word = jQuery.trim( word );

			// determine if our word is all caps.  If so, we'll need to
			// re-capitalize at the end
			var isUpperCase = (word.toUpperCase() == word);

			if ( isUpperCase ) {
				word = word.toUpperCase();
			}
			return word;
		};

		return function(value, arg1, arg2) {
			if ( typeof value === "number" ) {
				var usePlural = (value !== 1);

				// if no extra args, just add "s" (if plural)
				if ( arguments.length === 1 ) {
					return usePlural ? "s" : "";
				}

				if ( usePlural ) {
					arg1 = arg2 || pluralizeWord(arg1);
				}

				return value + " " + arg1;
			} else if ( typeof value === "string" ) {
				return pluralizeWord(value);
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
		["Urszula", "f"],
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
		"matematyka",
		"chemia",
		"geografia",
		"historia",
		"fizyka",
		"język angielski"
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

	jQuery.extend( KhanUtil, {        

		person: function( i ) {
			return people[i - 1][0];
		},

		personVar: function( i ) {
			return people[i - 1][0].charAt(0).toLowerCase();
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
		}

	});
};
