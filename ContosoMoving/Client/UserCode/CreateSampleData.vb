
Namespace LightSwitchApplication

    Public Class CreateSampleData

        Private Sub AddAll_Execute()
            InsertCounter()
            InsertTaxes()
            InsertBrand()
            InsertProductCategory()
            InsertServicesCategory()
            InsertServices()
            InsertOperation()
            InsertCountries()
            InsertRegions()
            InsertCities()
            'InsertEmployees()
            'InsertCustomers()
            'CreateSampleAppointments()
            'AddSampleUsers()
        End Sub

        Private Sub AddCustomers_Execute()
            InsertCustomers()
        End Sub

        Private Sub AddCustomers_CanExecute(ByRef result As Boolean)
            ' Make sure states have been added before trying to add customers
            result = States.Count >= 50
        End Sub

        Private Sub AddEmployees_Execute()
            InsertEmployees()
        End Sub

        Private Sub AddStates_Execute()
            InsertCountries()
        End Sub

        Private Sub AddUsers_Execute()
            AddSampleUsers()
        End Sub

        Private Sub AddUsers_CanExecute(ByRef result As Boolean)
            result = Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub

        Private Sub CreateAppointments_Execute()
            Me.CreateSampleAppointments()
        End Sub

        Private Sub CreateAppointments_CanExecute(ByRef result As Boolean)
            result = Me.Customers.Count > 0
        End Sub

        Private Sub CreateSampleAppointments()
            FindControl("AppointmentsGroup").Show()
            Dim count As Integer = 0
            Dim rand As New Random()
            For Each cust As Customer In Customers
                Dim newAppt As New Appointment()
                With newAppt
                    Select Case count Mod 5
                        Case 2
                            .MoveType = MoveTypeValues.Business
                        Case 3, 4
                            .MoveType = MoveTypeValues.Apartment
                        Case Else
                            .MoveType = MoveTypeValues.Residential
                    End Select
                    ' Choose a random time during the day that's within working hours
                    .StartDate = Today.AddHours(rand.Next(8) + 8)
                    ' Schedule appointments up to 30 days out
                    .StartDate = .StartDate.AddDays(rand.Next(30))
                    .Street = cust.Street
                    .StreetLine2 = cust.StreetLine2
                    .City = cust.City
                    .Geo_City = cust.Geo_City
                    .PostalCode = cust.PostalCode

                    Me.StartTime = .StartDate
                    Me.EndTime = .EndDate
                    .Employee = AvailableEmployees.FirstOrDefault()
                End With
                cust.Appointments.Add(newAppt)
                ' We need to save the new appointment now so we don't introduce conflicts in the employee assignment
                Me.Save()
                count += 1
            Next
        End Sub

        Private Sub InsertProductCategory()
            Dim Listing = AllCategoryProduct.Split(";")
            For Each Str As String In Listing
                Dim Token = Str.Split(",")
                Dim tok1 = Token(0).Trim()
                Dim existing = (From s In DataWorkspace.ApplicationData.Product_Categories Where s.Description = tok1).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim Obj = Me.DataWorkspace.ApplicationData.Product_Categories.AddNew()
                    Obj.Description = tok1
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertBrand()
            Dim Listing = AllBrand.Split(";")
            For Each Str As String In Listing
                Dim tok1 = Str.Trim()
                Dim existing = (From s In DataWorkspace.ApplicationData.Product_Brands Where s.Description = tok1).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim Obj = Me.DataWorkspace.ApplicationData.Product_Brands.AddNew()
                    Obj.Description = tok1
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertServicesCategory()
            Dim Listing = AllCategoryService.Split(";")
            For Each Str As String In Listing
                Dim Token = Str.Split(",")
                Dim tok1 = Token(0).Trim()
                Dim existing = (From s In DataWorkspace.ApplicationData.Service_Tipologies Where s.Description = tok1).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim Obj = Me.DataWorkspace.ApplicationData.Service_Tipologies.AddNew()
                    Obj.Description = tok1
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertCounter()
            Dim Listing = AllCounter.Split(";")
            For Each Str As String In Listing
                Dim Token = Str.Split(",")
                Dim tok1 = Token(0).Trim()
                Dim tok2 = Token(1).Trim()
                Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = tok1).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim Obj = Me.DataWorkspace.ApplicationData.Counters.AddNew()
                    Obj.Counter_Type = tok1
                    Obj.Counter_year = tok2
                End If
            Next
            Me.Save()
        End Sub


        Private Sub InsertServices()
            Dim Listing = AllServices.Split(";")
            For Each Str As String In Listing
                Dim Token = Str.Split(",")
                Dim tok1 = Token(0).Trim()
                Dim tok2 = Token(1).Trim()
                Dim tok3 = Token(2).Trim()
                Dim tok4 = Token(3).Trim()
                Dim tok5 = Token(4).Trim()
                Dim tok6 = Token(5).Trim()
                Dim existing = (From s In DataWorkspace.ApplicationData.Product_Services Where s.Description = tok1).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim Obj = Me.DataWorkspace.ApplicationData.Product_Services.AddNew()
                    Obj.Description = tok1
                    Obj.Price = tok3
                    Obj.Execution_Time = tok4
                    Obj.Point = tok5
                    Obj.Commission_employee = tok6
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertCities()
            Dim entity = AllCities.Split(";")
            For Each element As String In entity
                Dim Token = element.Split(":")
                Dim country = Token(0).Trim()
                Dim region = Token(1).Trim()
                Dim name = Token(2).Trim()
                Dim abbrv = Token(3).Trim()
                Dim Regions = (From r In DataWorkspace.ApplicationData.Geo_Regions Where r.Description = region).SingleOrDefault()
                Dim City = (From c In DataWorkspace.ApplicationData.Geo_Cities Where c.Name = name).SingleOrDefault()
                If (City Is Nothing) Then
                    Dim newCity = New Geo_City
                    newCity.Regions = Regions
                    newCity.Abbreviation = abbrv
                    newCity.Name = name
                End If
            Next
        End Sub

        Private Sub InsertCountries()
            Dim entity = AllCountry.Split(";")
            For Each element In entity
                Dim Token = element.Trim   'ITALIA:IT;
                Dim existing = (From e In DataWorkspace.ApplicationData.Geo_Countries Where e.Description = Token).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim add = DataWorkspace.ApplicationData.Geo_Countries.AddNew
                    add.Description = Token
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertRegions()
            For Each element In AllRegions.Split(";")
                Dim existing = (From e In DataWorkspace.ApplicationData.Geo_Regions Where e.Description = element).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim add = DataWorkspace.ApplicationData.Geo_Regions.AddNew
                    add.Description = element
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertEmployees()
            FindControl("EmployeesGroup").Show()
            For Each emp In AllEmployees.Split(";")
                Dim empToken = emp.Split(",")
                If (empToken.Length >= 5) Then
                    Dim existingEmployee = (From e In DataWorkspace.ApplicationData.Employees Where e.UserName = empToken(2)).SingleOrDefault()
                    If (existingEmployee Is Nothing) Then
                        Dim newEmployee = Employees.AddNew()
                        With newEmployee
                            .FirstName = empToken(0)
                            .LastName = empToken(1)
                            .UserName = empToken(2)
                            .Email = empToken(3)
                            .Phone = empToken(4)
                        End With
                    End If
                End If
            Next
        End Sub
        Private Sub InsertTaxes()
            For Each t In AllTax.Split(";")
                Dim tToken = t.Split(",")
                Dim existingTax = (From e In DataWorkspace.ApplicationData.Product_Taxes Where e.Tax = tToken(0)).SingleOrDefault()
                If (existingTax Is Nothing) Then
                    Dim newTax = DataWorkspace.ApplicationData.Product_Taxes.AddNew
                    newTax.Tax = tToken(0)
                    newTax.Value = tToken(1)
                End If
            Next
            Me.Save()
        End Sub
        Private Sub InsertLedger()
            Dim Listing = AllLedger.Split(";")
            For Each Str As String In Listing
                Dim Token = Str.Split(":")
                Dim tok1 = Token(0).Trim()
                Dim existing = (From s In DataWorkspace.ApplicationData.Account_Ledgers Where s.Description = tok1).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim Obj = Me.DataWorkspace.ApplicationData.Account_Ledgers.AddNew()
                    Obj.Description = tok1
                    Obj.Code = Token(1).Trim
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertOperation()
            Dim Listing = AllBrand.Split(";")
            For Each Str As String In Listing
                Dim Token = Str.Split(",")
                Dim tok1 = Token(0).Trim()
                Dim existing = (From s In DataWorkspace.ApplicationData.Account_Operations Where s.Description = tok1).SingleOrDefault()
                If (existing Is Nothing) Then
                    Dim Obj = Me.DataWorkspace.ApplicationData.Account_Operations.AddNew()
                    Obj.Description = tok1
                End If
            Next
            Me.Save()
        End Sub

        Private Sub InsertCustomers()
            FindControl("CustomersGroup").Show()
            Dim customerListing = AllCustomers.Split(";")
            For Each cust In customerListing
                Dim custToken = cust.Split(",")
                If (custToken.Length >= 9) Then
                    Dim existingCustomer = (From c In DataWorkspace.ApplicationData.Customers Where c.FirstName = custToken(0) And c.LastName = custToken(1)).SingleOrDefault()
                    If (existingCustomer Is Nothing) Then
                        Dim newCustomer = Customers.AddNew()
                        With newCustomer
                            .FirstName = custToken(0)
                            .LastName = custToken(1)
                            .Email = custToken(2)
                            .Phone = custToken(3)
                            .Street = custToken(4)
                            .StreetLine2 = custToken(5)
                            .City = custToken(6)
                            .PostalCode = custToken(7)
                            .Geo_City = (From s In DataWorkspace.ApplicationData.Geo_Cities Where s.Abbreviation = custToken(8)).SingleOrDefault()
                        End With
                    End If
                End If
            Next
        End Sub

        Private Sub AddSampleUsers()
            If (Application.User.HasPermission(SecurityAdministration)) Then
                For Each e In Employees
                    Dim existingUser = (From u In DataWorkspace.SecurityData.UserRegistrations Where u.UserName = e.UserName).SingleOrDefault()
                    If (existingUser Is Nothing) Then
                        Dim newUser = DataWorkspace.SecurityData.UserRegistrations.AddNew()
                        newUser.UserName = e.UserName
                        newUser.Password = "test"
                        newUser.FullName = e.FirstName + " " + e.LastName
                    End If
                Next
                DataWorkspace.SecurityData.SaveChanges()
            End If
        End Sub

        Private Const AllCountry As String = "ITALIA;ALBANIA;ANDORRA;AUSTRIA;BELGIO;BULGARIA;DANIMARCA;FINLANDIA;FRANCIA;GERMANIA;REGNO UNITO;GRECIA;IRLANDA;ISLANDA;JUGOSLAVIA;LIECHTENSTEIN;LUSSEMBURGO;MALTA;MONACO;NORVEGIA;PAESI BASSI;POLONIA;PORTOGALLO;ROMANIA;SAN MARINO;SPAGNA;SVEZIA;SVIZZERA;UCRAINA;UNGHERIA;FEDERAZIONE RUSSA;CITTA' DEL VATICANO;ESTONIA;LETTONIA;LITUANIA;CROAZIA;SLOVENIA;REP.CECA;SLOVACCA (REP.);ARMENIA (REP.);AZERBAIJAN (REP.);BIELORUSSIA (REP.);MOLDAVA (REP.);TAGIKISTAN (REP.);TURKMENISTAN (REP.);BOSNIA-ERZEGOVINA;MACEDONIA (REP.);AFGANISTAN;ARABIA SAUDITA;BAHREIN;BANGLADESH;BHUTAN;BRUNEI;CAMBOGIA;CEYLON (SRI LANKA);CINA POPOLARE;CIPRO;MYANMAR;COREA DEL NORD;COREA DEL SUD;EMIRATI ARABI UNITI;FILIPPINE;GIAPPONE;GIORDANIA;INDIA;INDONESIA;IRAN;IRAQ;ISRAELE;KUWAIT;LAOS;LIBANO;MALDIVE (ISOLE);MALESIA;MONGOLIA;NEPAL;OMAN;PAKISTAN;QATAR;SINGAPORE;SIRIA;THAILANDIA;TURCHIA;VIETNAM;YEMEN;KAZAKISTAN;UZBEKISTAN;ALGERIA;ANGOLA;COSTA D'AVORIO;BENIN;BOTSWANA;BURKINA;BURUNDI;CAMERUN;CAPO VERDE (ISOLE);CENTRAFRICA;CIAD;COMORE (ISOLE);CONGO;EGITTO;ETIOPIA;GABON;GAMBIA;GHANA;GIBUTI;GUINEA;GUINEA BISSAO;GUINEA EQUATORIALE;KENIA;LESOTHO;LIBERIA;LIBIA;MADAGASCAR;MALAWI;MALI;MAROCCO;MAURITANIA;MAURIZIO;MONZAMBICO;NAMIBIA;NIGER;NIGERIA;RUANDA;SAO TOME' E PRINCIPE;SEICELLE (ISOLE);SENEGAL;SIERRA LEONE;SOMALIA;SUD AFRICA;SUDAN;SWAZILAND;TANZANIA;TOGO;TUNISIA;UGANDA;ZAIRE;ZAMBIA;ZIMBABWE;ANTIGUA E BARBUDA;BAHAMA (ISOLE);BARBADOS (ISOLE);BELIZE;CANADA;COSTARICA;CUBA (ISOLE);DOMINICANA (ISOLE);DOMINICANA (REP.);EL SALVADOR;GIAMAICA;GRENADA;GUATEMALA;HAITI;HONDURAS;MESSICO;NICARAGUA;PANAMA;SAINT LUCIA (ISOLA);S.VINCENT E GRENADIN;S.CHRISTOPHER E NEVI;STATI UNITI D'AMERIC;ARGENTINA;BOLIVIA;BRASILE;CILE;COLOMBIA;EQUADOR;GUAIANA;PARAGUAY;PERU';SURINAME;TRINIDAD E TOBAGO;URUGUAY;VENEZUELA;AUSTRALIA;FIGI (ISOLE);KIRIBATI;NAURU (ATOLLO);NUOVA ZELANDA;PAPUASIA-N. GUINEA;SALOMONE (ISOLE);SAMOA (ISOLE);TONGA (ISOLE);TUVALU (ISOLE);VANUATU;APOLIDE;BIRMANIA;BOPHUTHATSWANA;CECOSLOVACCHIA;CISKEY;FAER OER;FORMOSA;GAZA;GROENLLANDIA;HONG KONG;ISOLA DI PASQUA;ISOLE COOK;ISOLE FALKLAND;ISOLE GUAM;ISOLE MACQUARIE;ISOLE MARIANNE;ISOLE MARSHALL;ISOLE MIDWAY;ISOLE WALLIS;MACAO;MARTINICA;POLINESIA;PUERTO RICO;REP. TURCA DI CIPRO NORD;TRANSKEY;VENDA;ANTILLE OLANDESI;BERMUDE;GERMANIA OVEST;GUADALUPA;IRIAN OCCIDENTALE;IRLANDA DEL NORD;ISOLE CHRISTMAS;ISOLE COCOS;ISOLE NORFOLK;ISOLE NORMANNE;ISOLE REUNION;ISOLE VERGINI;MAN;NUOVA CALEDONIA;PITCAIRN;SAINT PIERRE;TIMOR;TURKS E CAICOS;VIETNAM DEL SUD"
        Private Const AllRegions As String = "Piemonte;Veneto;Valle D'aosta;Lombardia;Trentino Alto Adige;Friuli Venezia Giulia;Liguria;Emilia Romagna;Toscana;Umbria;Marche;Lazio;Abruzzo;Molise;Campania;Puglia;Basilicata;Calabria;Sicilia;Sardegna"
        Private Const AllCities As String = ""
        Private Const AllEmployees As String = "Test,User,TestUser,testuser@adventure-works.com,127-555-0124"
        Private Const AllBrand As String = "ALTERNA;AMERICAN CREW;BABYLISS PRO;CREATTIVA-ERILIA;GAMMA PIÙ;GHD;GOLDWELL;JEAN PAUL MYNÈ;JOICO;KERASTASE;KMS CALIFORNIA;LABOR PRO;LABEL.M;MACADAMIA NATURAL OIL;MATRIX;MOROCCANOIL;NATURALMENTE;NIOXIN;OROFLUIDO;PANASONIC;PAUL MITCHELL;PARLUX;PUREOLOGY;REDKEN;SEBASTIAN;SHU UEMURA;TAHE;TERMIX;TIGI;TECNA;UNIQ ONE;UKI;WELLA;WELLA SYSTEM PROFESSIONAL"
        Private Const AllCategoryProduct As String = "Tecnici;Professionali;Medicali;Estetica;Linea Verde"
        Private Const AllCategoryService As String = "Tecnici;Professionali;Medicali;Estetica;Linea Verde"
        Private Const AllServices As String = "Taglio e piega Unisex,,25,30,0,1,25,;Colorazione con prodotti speciali anche senza ammoniaca,,30,30,0,1,30,;Ondulazione permanenti computerizzate,,35,30,0,1,35,;Stirature,,25,15,0,05,25,;Stirature relax,,35,25,0,05,35,;Contrasti,,25,20,0,05,25,;Meches,,35,30,0,1,35,;Colpi di buio e Colpi di Luce,,35,30,0,1,35,;Schiaritura con pettine,,25,15,0,05,25,;Schiaritura con pennello,,35,20,0,1,35,;Schiariture a venature con stagnole e spatole,,35,25,0,1,35,;impianti di capelli umani con tecnica innovativa,,,120,0,2,0,;extension di vario tipo,,25,20,0,05,25,;decolorazione,,25,20,0,05,25,;ripigmentazione, prepigmentazione,,25,20,0,1,25,;protesi complete di vario tipo,,,,,0,;parrucche,,60,20,0,1,60,;tricogramma (analisi della struttura del capello),,35,20,0,2,35,;consulenza d'immagine,,50,60,0,2,50,;color egò o cromo tipologia (tonalità calda o fredda del colore),,35,30,0,1,35,;Servizio di acconciature per la sposa con consulenza anche a domicilio.,,120,120,0,2,120,;"
        Private Const AllTax As String = "Normale,22;Ridotta,10;Esente Art 17 ,0;Esente Art 15 ,0;Esente Art 10 ,0;Esente Art 7 ,0"
        Private Const AllCounter As String = "Fattura,0;Documento di Trasporto,0"
        Private Const AllOperation As String = "Incasso Cliente;Pagamento Fattura;Pagamento Affitto;Pagamento Stipendi;Pagamento Energia Elettrica;Pagamento Telefono;Pagamento Pulizie;Acquisto Merce;Vendita merce/servizi"
        Private Const AllLedger As String = "Cassa,01-01;Banche c/c,01-02;Effetti,01-03;Effetti,01-04;Titoli,01-04;Titoli,01-04;Clienti Italia,01-07;Clienti Estero,01-07;Crediti Diversi,01-08;Rimanenze,01-10;Rimanenze,01-10;Rimanenze,01-10;Fornitori Italia,02-11;Fornitori Estero,02-11;Debiti Diversi,02-12;Debiti Diversi,02-12;Debiti Diversi,02-12;Debiti Diversi,02-12;Capitale Netto,02-13;Capitale Netto,02-13;Capitale Netto,02-13;Capitale Netto,02-13;Rimanenze Iniziali Magazzino,03-14;Rimanenze Iniziali Magazzino,03-14;Rimanenze Iniziali Magazzino,03-14;Risconti,03-14;Acquisti,03-15;Acquisti,03-15;Acquisti,03-15;Spese Generali,03-16;Spese Generali,03-16;Spese Generali,03-16;Spese Generali,03-16;Spese Generali,03-16;Risultato d'esercizio,03-17;Vendite Prodotti,04-18;Vendite Prodotti,04-18;Ricavi Accessori di Vendita,04-18;Plusvalenze e Sopravvenienze,04-19;Plusvalenze e Sopravvenienze,04-19;Rimanenze Finali Magazzino,04-20;Rimanenze Finali Magazzino,04-20;Rimanenze Finali Magazzino,04-20;Beni di Terzi (Attivo),05-21;Beni di Terzi (Passivo),05-21;Conti Riepilogativi,06-22;Conti Riepilogativi,06-22;Conti Riepilogativi,06-22;"
        Private Const AllAccount As String = ""
        Private Const AllColor As String = ""
        Private Const AllProduct As String = ""
        Private Const AllCustomers As String = "Gustavo,Achong,gustavo0@adventure-works.com,398-555-0132,1970 Napa Ct.,,Bothell,98011,WA;Kim,Akers,kim0@adventure-works.com,747-555-0171,9833 Mt. Dias Blv.,,Bothell,98011,WA;Josh,Bailey,josh2@adventure-works.com,334-555-0137,7484 Roundtree Drive,,Bothell,98011,WA;Rob,Cason,rob0@adventure-works.com,599-555-0127,9539 Glenside Dr,,Bothell,98011,WA;Jan,Dryml,jan1@adventure-works.com,500 555-0132,1226 Shoe St.,,Bothell,98011,WA;Daniel,Escapa,daniel0@adventure-works.com,991-555-0183,1399 Firestone Drive,,Bothell,98011,WA;William,Flash,william0@adventure-works.com,959-555-0151,5672 Hale Dr.,,Bothell,98011,WA;David,Galvin,david0@adventure-works.com,107-555-0138,6387 Scenic Avenue,,Bothell,98011,WA;Sidney,Higa,sidney1@adventure-works.com,158-555-0142,8713 Yosemite Ct.,,Bothell,98011,WA;Julia,Ilyina,julia0@adventure-works.com,453-555-0165,250 Race Court,,Bothell,98011,WA;Darcy,Jayne,darcy0@adventure-works.com,554-555-0110,1318 Lasalle Street,,Bothell,98011,WA;Russell,King,russell2@adventure-works.com,1 500 555-0198,5415 San Gabriel Dr.,,Bothell,98011,WA;Karin,Lamb,karin1@adventure-works.com,678-555-0175,9265 La Paz,,Bothell,98011,WA;Bill,Malone,bill1@adventure-works.com,571-555-0128,8157 W. Book,,Bothell,98011,WA;Mike,Nash,mike3@adventure-works.com,440-555-0166,4912 La Vuelta,,Bothell,98011,WA;Tad,Orman,tad0@adventure-works.com,1 500 555-0150,40 Ellis St.,,Bothell,98011,WA;Lori,Penor,lori1@adventure-works.com,727-555-0115,6696 Anchor Drive,,Bothell,98011,WA;Privthi,Raj,privthi0@adventure-works.com,197-555-0143,1873 Lion Circle,,Bothell,98011,WA;Naoki,Sato,naoki0@adventure-works.com,492-555-0189,3148 Rose Street,,Bothell,98011,WA;Karen,Toh,karen2@adventure-works.com,331-555-0162,6872 Thornwood Dr.,,Bothell,98011,WA;Sunil,Uppal,sunil0@adventure-works.com,968-555-0153,5747 Shirley Drive,,Bothell,98011,WA;Olya,Veselova,olya0@adventure-works.com,845-555-0187,636 Vine Hill Way,,Portland,97205,OR;Tony,Wang,tony0@adventure-works.com,115-555-0175,6657 Sand Pointe Lane,,Seattle,98104,WA;Joanna,Yuan,joanna1@adventure-works.com,226-555-0146,1902 Santa Cruz,,Bothell,98011,WA;Jason,Zander,jason6@adventure-works.com,149-555-0113,793 Crawford Street,,Kenmore,98028,WA;Jim,Glynn,jim3@adventure-works.com,556-555-0145,463 H Stagecoach Rd.,,Kenmore,98028,WA;Jane,Dow,jane0@adventure-works.com,129-555-0110,5203 Virginia Lane,,Kenmore,98028,WA;Steve,Luper,steve7@adventure-works.com,1 500 555-0139,4095 Cooper Dr.,,Kenmore,98028,WA;Paulo,Neves,paulo2@adventure-works.com,665-555-0198,6697 Ridge Park Drive,,Kenmore,98028,WA;Stig,Panduro,stig1@adventure-works.com,818-555-0171,5669 Ironwood Way,,Kenmore,98028,WA;Kelly,Rollin,kelly0@adventure-works.com,1 500 555-0187,8192 Seagull Court,,Kenmore,98028,WA;Ben,Smith,ben0@adventure-works.com,221-555-0167,5553 Cash Avenue,,Kenmore,98028,WA;Linda,Timm,linda0@adventure-works.com,121-555-0157,7048 Laurel,,Kenmore,98028,WA;Colin,Wilcox,colin3@adventure-works.com,234-555-0112,25 95th Ave NE,,Kenmore,98028,WA"





    End Class

End Namespace
