Namespace LightSwitchApplication

    Public Class Detail_Service_Document

        Private Sub Service_Document_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Service_Document)
        End Sub

        Private Sub Service_Document_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Service_Document)
        End Sub

        Private Sub Detail_Service_Document_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Service_Document)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Detail_Service_Document_Saving(ByRef handled As Boolean)
            ' Scrivere qui il codice.
            If Not Me.Service_Document.Document_Number Is Nothing Then
                ShowMessageBox("Attenzione ...Il documento è già registrato")
                handled = False
                Exit Sub
            End If
            If Me.Service_Document.Payoff = Me.Service_Document.Total Then
                ShowMessageBox("Attenzione Inserire prima il pagamento....")
                Me.Service_Document.Payment = Me.Service_Document.Total
                Me.OpenModalWindow("payModal")
            Else
                ' se il pagamento è parziale
                If Me.Service_Document.Payoff > 0 Then
                    If Me.ShowMessageBox("Confermi il proseguimento della registrazione?", "Attenzione Ricevuta non saldata", MessageBoxOption.YesNo) = System.Windows.MessageBoxResult.No Then
                        Exit Sub
                    End If
                End If
                ' se il pagamento anche parziale è presente        
                Service_Document.Appointment.Executed = True
                Dim ValueType = "Ricevuta Fiscale"
                Dim anno = Now.Year
                Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = ValueType).SingleOrDefault()
                If (existing Is Nothing) Then
                    existing = DataWorkspace.ApplicationData.Counters.AddNew()
                    existing.Counter_Type = ValueType
                    existing.Counter_year = anno
                    existing.Valore = 0
                End If
                'contatore ricevuta fiscale getCounter
                If Me.Service_Document.Document_Number Is Nothing Then
                    Me.Service_Document.Document_Number = Utility.getCounter(existing, ValueType, anno)
                End If
                'aggiorna Punti, avg spesa media, spesa annua, controllo su cambio anno spesa anno passato

                Utility.aggCustomer(Me.Service_Document)

                'ricerca valore protocollo contabile
                ValueType = "Protocollo contabile"
                existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = ValueType).SingleOrDefault()
                If (existing Is Nothing) Then
                    existing = DataWorkspace.ApplicationData.Counters.AddNew()
                    existing.Counter_Type = ValueType
                    existing.Counter_year = anno
                    existing.Valore = 0
                End If
                Dim accountProtocol = Utility.getCounter(existing, ValueType, anno)
                'For Each obj In Me.Service_Histories
                '        Utility.aggInventory(obj, obj.Product_Service.Products.)
                'Next (obj)
                '"Vendita"
                If Me.Service_Document.Customer.created = Nothing Then
                    Me.Service_Document.Customer.created = Now
                End If
                Dim dataStart = Me.Service_Document.Customer.created
                Dim dataEnd = Now
                Me.Service_Document.Customer.Frequency = Math.Round(CDec(DateDiff(DateInterval.Day, dataStart, dataEnd) / Me.Service_Document.Customer.Visit_Number), 2)
                Dim AccountList As Account_List
                Dim account As Account
                Dim Operazione = " Vendita servizi " & Me.Service_Document.Customer.LastName + " " + Me.Service_Document.Customer.FirstName & " ricevuta fiscale " & Me.Service_Document.Document_Number
                '****************************************************************************Dare  Cliente
                account = findAccount(Me.Service_Document.Customer.LastName + " " + Me.Service_Document.Customer.FirstName, "0104")
                AccountList = New Account_List
                Utility.aggAccountList(Me.Service_Document.Document_Date, account, AccountList, Operazione, "Credit", Me.Service_Document.Total, accountProtocol)
                '****************************************************************************Avere Vendita Servizi
                'cerca "Merce c/Vendite)
                account = findAccount("Vendita Servizi", "0414")
                AccountList = New Account_List
                'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
                Utility.aggAccountList(Me.Service_Document.Document_Date, account, AccountList, Operazione, "Debit", Me.Service_Document.Amount, accountProtocol)
                '****************************************************************************Avere Iva C/Erario
                'cerca "Iva C/Erario")
                account = findAccount("Iva C/Erario", "0101")
                AccountList = New Account_List
                Utility.aggAccountList(Me.Service_Document.Document_Date, account, AccountList, Operazione, "Debit", Me.Service_Document.Vat, accountProtocol)
                If Me.Service_Document.Deferrals = 0 Then
                    '****************************************************************************Avere  Cliente (pagamento)
                    account = findAccount(Me.Service_Document.Customer.LastName + " " + Me.Service_Document.Customer.FirstName, "0104")
                    AccountList = New Account_List
                    Utility.aggAccountList(Me.Service_Document.Document_Date, account, AccountList, Operazione, "Debit", Me.Service_Document.Total, accountProtocol)
                    '****************************************************************************Dare incasso Cassa
                    'cerca "Cassa e banche)
                    account = findAccount("Cassa", "0101")
                    AccountList = New Account_List
                    'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
                    Utility.aggAccountList(Me.Service_Document.Document_Date, account, AccountList, Operazione, "Credit", Me.Service_Document.Total, accountProtocol)
                Else
                    'aggiorna Scadenzario
                    If Me.Service_Document.Payment_Number > 1 And Me.Service_Document.Deferrals > 0 Then
                        For i = 1 To Me.Service_Document.Payment_Number
                            'ShowMessageBox("Funzione non disponibile ....Aggiorna Scadenzario rata= " & CStr(i) & " - data Scadenza=" & Utility.LastMounthDay(Me.Service_Document.Document_Date, Me.Service_Document.Deferrals - (i * 30)))
                            Utility.aggScheduleCustomer(Me.Service_Document, Me.Schedules.AddNew(), "Credito", i)
                        Next
                    End If
                End If
                'Aggiornamento statistiche
            End If
            Dim screens = Me.Application.ActiveScreens()
            For Each s In screens
                Dim screen = s.Screen
                screen.Details.Dispatcher.BeginInvoke(
               Sub()
                   screen.Refresh()
               End Sub)
            Next
            Me.Close(False)

        End Sub

        Public Function findAccount(name As String, ldg As String) As Account
            '0104 =Clienti               0207 = Fornitori            0208 = Debiti Diversi          0311 = Acquisti           0414 = Vendite
            Dim existing As Account
            If Trim(ldg) = "" Then
                existing = (From s In DataWorkspace.ApplicationData.Accounts Where s.Description = name).SingleOrDefault()
            Else
                existing = (From s In DataWorkspace.ApplicationData.Accounts Where s.Description = name And s.Account_Ledger.Account_class = ldg).SingleOrDefault()
            End If
            If existing Is Nothing Then
                existing = Me.DataWorkspace.ApplicationData.Accounts.AddNew()
                existing.Description = name
                Dim ledger = (From l In DataWorkspace.ApplicationData.Account_Ledgers Where l.Account_class = ldg).SingleOrDefault()
                existing.Account_Ledger = ledger
            End If
            Return existing
        End Function

        Public Sub AggStatist(treatment As Order)
            Dim existing As Statist
            existing = (From s In DataWorkspace.ApplicationData.Statists Where s.Year = treatment.Year And s.Month = treatment.Month).SingleOrDefault()
            If existing Is Nothing Then
                existing = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                existing.Year = treatment.Document_Date.Year
                existing.Month = treatment.Document_Date.Month
                existing.Month_Name = Utility.getMounth(treatment.Document_Date.Month)
            End If
            existing.Amount = existing.Amount + treatment.Amount
            existing.Visit = existing.Visit + 1
            If treatment.Commission IsNot Nothing Then
                existing.Commission = existing.Commission + treatment.Commission
            End If
            'existing.Average_Ticket = Math.Round(existing.Amount / existing.Visit, 2)
            If treatment.Elapsed IsNot Nothing Then
                existing.Elapsed = existing.Elapsed + treatment.Elapsed
            Else
                existing.Elapsed = existing.Elapsed + 29
            End If
            'existing.Average_Elapsed = Math.Round(existing.Elapsed / existing.Visit, 0)
            If treatment.Age IsNot Nothing Then
                existing.Age = existing.Age + treatment.Age
            Else
                existing.Age = 35
            End If
            If treatment.Customer.Order.Count = 1 Then  'se è la prima seduta 
                existing.New_Customer = existing.New_Customer + 1
            End If
            ' If treatment.New_Customer = True Then
            'existing.New_Customer = existing.New_Customer + 1
            'End If
            'existing.Average_Age = Math.Round(existing.Age / existing.Visit, 0)
        End Sub

        Private Sub Pagamento_Execute()
            ' Scrivere qui il codice.
            If Not Me.Service_Document.Document_Number Is Nothing Then
                ShowMessageBox("Attenzione...il documento è già registrato")
                Exit Sub
            Else
                Me.Service_Document.Payoff = 0
                Me.Service_Document.Payment = Me.Service_Document.Total
                Me.OpenModalWindow("payModal")
            End If

        End Sub

        Private Sub OK_Execute()
            ' Scrivere qui il codice.
            Me.Service_Document.Document_DataEnd = Now
            Service_Document.Elapsed = DateDiff(DateInterval.Minute, Service_Document.Document_DataStart.Value, Service_Document.Document_DataEnd.Value)
            Me.CloseModalWindow("payModal")
        End Sub

        Private Sub AddTreatment_Execute()
            ' Scrivere qui il codice.
            If Not Me.Service_Document.Document_Number Is Nothing Then
                ShowMessageBox("Attenzione....il documento è già registrato")
                Exit Sub
            Else
                Service_Histories.AddNew()
                Me.Descrizione = "NewTreatment"
                Me.OpenModalWindow("NewTreatment")
            End If
        End Sub

        Private Sub OK_Treatment_Execute()
            ' Scrivere qui il codice.
            Me.CloseModalWindow("NewTreatment")
        End Sub

        Private Sub Products_Execute()
            ' Scrivere qui il codice.
            If Not Me.Service_Document.Document_Number Is Nothing Then
                ShowMessageBox("Attenzione....il documento è già registrato")
                Exit Sub
            Else
                Service_Histories.AddNew()
                Me.Descrizione = "Nuovo"
                Me.OpenModalWindow("NewProduct")
            End If
        End Sub

        Private Sub OK_Product_Execute()
            ' Scrivere qui il codice.
            Me.CloseModalWindow("NewProduct")
        End Sub


    End Class

End Namespace