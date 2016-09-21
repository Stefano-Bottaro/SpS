/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditPreLoad.Operazioni_Contabili_Tap_execute = function (screen) {
    // Write code here.
    var Operation ="Incasso Cliente;Pagamento Fattura;Pagamento Affitto;Pagamento Stipendi;Pagamento Energia Elettrica;Pagamento Telefono;Pagamento Pulizie;Acquisto Merce;Vendita merce/servizi";
    var matrix = splitter(Operation, ";");    
    var datatype = ":String";
    var today = new Date();
    var anno = today.getFullYear();
    for (var i = 0; i < matrix.length; i++) {
        var value = matrix[i];      
        var existing = myapp.Account_Operation;       
        filter = "Counter_Type eq " + msls._toODataString(value, datatype);      
        myapp.activeDataWorkspace.ApplicationData
       .Account_Operations
       .filter(filter)
       .execute()
       .then(function (result) {       
           if (result.results.length == 0) {            
               //if row counter ! exist           
               existing = new myapp.Account_Operation();
               existing.Description = value;  
           }
       }, function (error) {
           alert(error);
       });
    };
    myapp.commitChanges();

    //'******************************prepopolamento brand
    //'MsgBox("prepopolamento brand")
    //'Dim brand As Product_Brand
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "ALTERNA"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "AMERICAN CREW"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "BABYLISS PRO"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "CREATTIVA-ERILIA"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "GAMMA PIÙ"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "GHD"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "GOLDWELL"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "JEAN PAUL MYNÈ"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "JOICO"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "KERASTASE"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "KMS CALIFORNIA"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "LABOR PRO"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "LABEL.M"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "MACADAMIA NATURAL OIL"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "MATRIX"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "LABOR PRO"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "MOROCCANOIL"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "NATURALMENTE"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "NIOXIN"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "OROFLUIDO"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "PAUL MITCHELL"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "PARLUX"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "REDKEN"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "SEBASTIAN"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "TAHE"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "TECNA"
    //'brand = Me.Product_Brands.AddNew()
    //'brand.Description = "WELLA"
    //'******************************prepopolamento Category
    //'MsgBox("prepopolamento Category")
    //'Dim categoria As Product_Category
    //'categoria = Me.Product_Categories.AddNew()
    //'categoria.Description = "Tecnici"
    //'categoria = Me.Product_Categories.AddNew()
    //'categoria.Description = "Professionali"
    //'categoria = Me.Product_Categories.AddNew()
    //'categoria.Description = "Medicali"
    //'categoria = Me.Product_Categories.AddNew()
    //'categoria.Description = "Estetica"
    //'categoria = Me.Product_Categories.AddNew()
    //'categoria.Description = "Linea Verde"
    //'InsertCities()
    //'InsertServices()
    //'InsertLedger()
    //   '******************************prepopolamento Country
    //'MsgBox("prepopolamento Country")
    //'Dim nazione As Geo_Country
    //'nazione = Me.Geo_Countries.AddNew()
    //'nazione.Description = "ITALIA"
    //'InsertCountries() = ";ALBANIA;ANDORRA;AUSTRIA;BELGIO;BULGARIA;DANIMARCA;FINLANDIA;FRANCIA;GERMANIA;REGNO UNITO;GRECIA;IRLANDA;ISLANDA;JUGOSLAVIA;LIECHTENSTEIN;LUSSEMBURGO;MALTA;MONACO;NORVEGIA;PAESI BASSI;POLONIA;PORTOGALLO;ROMANIA;SAN MARINO;SPAGNA;SVEZIA;SVIZZERA;UCRAINA;UNGHERIA;FEDERAZIONE RUSSA;CITTA' DEL VATICANO;ESTONIA;LETTONIA;LITUANIA;CROAZIA;SLOVENIA;REP.CECA;SLOVACCA (REP.);ARMENIA (REP.);AZERBAIJAN (REP.);BIELORUSSIA (REP.);MOLDAVA (REP.);TAGIKISTAN (REP.);TURKMENISTAN (REP.);BOSNIA-ERZEGOVINA;MACEDONIA (REP.);AFGANISTAN;ARABIA SAUDITA;BAHREIN;BANGLADESH;BHUTAN;BRUNEI;CAMBOGIA;CEYLON (SRI LANKA);CINA POPOLARE;CIPRO;MYANMAR;COREA DEL NORD;COREA DEL SUD;EMIRATI ARABI UNITI;FILIPPINE;GIAPPONE;GIORDANIA;INDIA;INDONESIA;IRAN;IRAQ;ISRAELE;KUWAIT;LAOS;LIBANO;MALDIVE (ISOLE);MALESIA;MONGOLIA;NEPAL;OMAN;PAKISTAN;QATAR;SINGAPORE;SIRIA;THAILANDIA;TURCHIA;VIETNAM;YEMEN;KAZAKISTAN;UZBEKISTAN;ALGERIA;ANGOLA;COSTA D'AVORIO;BENIN;BOTSWANA;BURKINA;BURUNDI;CAMERUN;CAPO VERDE (ISOLE);CENTRAFRICA;CIAD;COMORE (ISOLE);CONGO;EGITTO;ETIOPIA;GABON;GAMBIA;GHANA;GIBUTI;GUINEA;GUINEA BISSAO;GUINEA EQUATORIALE;KENIA;LESOTHO;LIBERIA;LIBIA;MADAGASCAR;MALAWI;MALI;MAROCCO;MAURITANIA;MAURIZIO;MONZAMBICO;NAMIBIA;NIGER;NIGERIA;RUANDA;SAO TOME' E PRINCIPE;SEICHELLE (ISOLE);SENEGAL;SIERRA LEONE;SOMALIA;SUD AFRICA;SUDAN;SWAZILAND;TANZANIA;TOGO;TUNISIA;UGANDA;ZAIRE;ZAMBIA;ZIMBABWE;ANTIGUA E BARBUDA;BAHAMA (ISOLE);BARBADOS (ISOLE);BELIZE;CANADA;COSTARICA;CUBA (ISOLE);DOMINICANA (ISOLE);DOMINICANA (REP.);EL SALVADOR;GIAMAICA;GRENADA;GUATEMALA;HAITI;HONDURAS;MESSICO;NICARAGUA;PANAMA;SAINT LUCIA (ISOLA);S.VINCENT E GRENADIN;S.CHRISTOPHER E NEVI;STATI UNITI D'AMERIC;ARGENTINA;BOLIVIA;BRASILE;CILE;COLOMBIA;EQUADOR;GUAIANA;PARAGUAY;PERU';SURINAME;TRINIDAD E TOBAGO;URUGUAY;VENEZUELA;AUSTRALIA;FIGI (ISOLE);KIRIBATI;NAURU (ATOLLO);NUOVA ZELANDA;PAPUASIA-N. GUINEA;SALOMONE (ISOLE);SAMOA (ISOLE);TONGA (ISOLE);TUVALU (ISOLE);VANUATU;APOLIDE;BIRMANIA;BOPHUTHATSWANA;CECOSLOVACCHIA;CISKEY;FAER OER;FORMOSA;GAZA;GROENLLANDIA;HONG KONG;ISOLA DI PASQUA;ISOLE COOK;ISOLE FALKLAND;ISOLE GUAM;ISOLE MACQUARIE;ISOLE MARIANNE;ISOLE MARSHALL;ISOLE MIDWAY;ISOLE WALLIS;MACAO;MARTINICA;POLINESIA;PUERTO RICO;REP. TURCA DI CIPRO NORD;TRANSKEY;VENDA;ANTILLE OLANDESI;BERMUDE;GERMANIA OVEST;GUADALUPA;IRIAN OCCIDENTALE;IRLANDA DEL NORD;ISOLE CHRISTMAS;ISOLE COCOS;ISOLE NORFOLK;ISOLE NORMANNE;ISOLE REUNION;ISOLE VERGINI;MAN;NUOVA CALEDONIA;PITCAIRN;SAINT PIERRE;TIMOR;TURKS E CAICOS;VIETNAM DEL SUD"
    //'******************************prepopolamento Regions  
    //'MsgBox("prepopolamento Regions")
    //'InsertRegions(nazione, "Piemonte;Veneto;Valle D'aosta;Lombardia;Trentino Alto Adige;Friuli Venezia Giulia;Liguria;Emilia Romagna;Toscana;Umbria;Marche;Lazio;Abruzzo;Molise;Campania;Puglia;Basilicata;Calabria;Sicilia;Sardegna")

};
myapp.AddEditPreLoad.Contatori_Tap_execute = function (screen) {
    // Write code here.
    //'******************************prepopolamento contatori
    var Contatori ="Fattura,Documento di Trasporto,Ricevuta Fiscale";
    var matrix = splitter(Contatori, ";");
    alert(matrix.length);
    for (var i = 0; i < matrix.length; i++) {
        var value = matrix[i];
        var datatype = ":String";
        var today = new Date();
        var anno = today.getFullYear();
        var existing = myapp.Counter();
        filter = "Counter_Type eq " + msls._toODataString(value, datatype);   
         myapp.activeDataWorkspace.ApplicationData
        .Counters
        .filter(filter)
        .execute()
        .then(function (result) {       
             if (result.results.length == 0) {            
                 //if row counter ! exist           
                 existing = new myapp.Counter();
                 existing.Counter_Type = value;                
                 existing.Anno = today.getFullYear();                
                 existing.Valore = 0;                
             }
        }, function (error) {
            alert(error);
         });
    };
    myapp.commitChanges();

};