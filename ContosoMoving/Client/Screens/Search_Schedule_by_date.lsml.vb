
Namespace LightSwitchApplication

    Public Class Search_Schedule_by_date

        Private Sub Search_Schedule_by_date_Closing(ByRef cancel As Boolean)
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Payment_Execute()
            If Me.Schedule_by_date.SelectedItem.Type = "Credito" Then
                Me.Schedule_by_date.SelectedItem.Settlement = Me.Schedule_by_date.SelectedItem.Credit - Me.Schedule_by_date.SelectedItem.Settlement
            Else
                Me.Schedule_by_date.SelectedItem.Settlement = Me.Schedule_by_date.SelectedItem.Debit - Me.Schedule_by_date.SelectedItem.Settlement
            End If
            Me.OpenModalWindow("Payment")
        End Sub

        Public Function findAccount(name As String, ldg As String) As Account
            '0104 =Clienti 0207 = Fornitori 0208 = Debiti Diversi 0311 = Acquisti
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

        Private Sub OK_Execute()
            'aggiorno la contabilita'
            Dim ValueType = "Protocollo contabile"
            Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = ValueType).SingleOrDefault()
            If (existing Is Nothing) Then
                existing = DataWorkspace.ApplicationData.Counters.AddNew()
                existing.Counter_Type = ValueType
                existing.Counter_year = Now.Year
                existing.Valore = 0
            End If
            Dim accountProtocol = Utility.getCounter(existing, ValueType, Now.Year)
            'aggiorno il piano dei conti
            Dim Operazione As String
            Dim AccountList As Account_List
            Dim account As Account
            Dim schedule = Schedule_by_date.SelectedItem
            Dim supplier = schedule.Product_Document.Supplier
            If schedule.Type = "Credito" Then
                '****************************************************************************Avere  Cliente (pagamento)
                Operazione = " Incasso Cliente " & schedule.Name & " doc " & schedule.Document_Number
                account = findAccount(supplier.Name, "0104")
                AccountList = New Account_List
                Utility.aggAccountList(schedule.Document_Date, account, AccountList, Operazione, "Credit", schedule.Settlement, accountProtocol)
                '****************************************************************************Dare incasso Cassa
                'cerca "Cassa e banche)
                account = findAccount("Cassa", "0101")
                AccountList = New Account_List
                'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
                Utility.aggAccountList(schedule.Document_Date, account, AccountList, Operazione, "Debit", schedule.Settlement, accountProtocol)
            Else
                '******************************dare Fornitore
                Operazione = " Pagamento Fornitore " & schedule.Name & " doc " & schedule.Document_Number
                account = findAccount(supplier.Name, "0207")
                AccountList = New Account_List
                Utility.aggAccountList(schedule.Document_Date, account, AccountList, Operazione, "Debit", schedule.Settlement, accountProtocol)

                '*******************************avere pagamento contanti Fornitore
                account = findAccount("Cassa e Banche", "0101")
                AccountList = New Account_List
                Utility.aggAccountList(schedule.Document_Date, account, AccountList, Operazione, "Credit", schedule.Settlement, accountProtocol)
            End If
            Me.Save()
            'aggiorno il cliente o il fornitore
            Me.CloseModalWindow("Payment")
        End Sub

        Private Sub Pagamento_Execute()
            If Me.Schedule_by_date.SelectedItem.Type = "Credito" Then
                Me.Schedule_by_date.SelectedItem.Settlement = Me.Schedule_by_date.SelectedItem.Credit
            Else
                Me.Schedule_by_date.SelectedItem.Settlement = Me.Schedule_by_date.SelectedItem.Debit
            End If
            Me.OpenModalWindow("Payment")
        End Sub
    End Class

End Namespace
