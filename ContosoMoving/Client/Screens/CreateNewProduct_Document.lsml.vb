
Namespace LightSwitchApplication

    Public Class CreateNewProduct_Document

        Private Sub CreateNewProduct_Document_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Product_DocumentProperty = New Product_Document()
        End Sub

        Private Sub CreateNewProduct_Document_Saved()
            ' Scrivere qui il codice.
            Dim screens = Me.Application.ActiveScreens()
            For Each s In screens
                Dim screen = s.Screen
                screen.Details.Dispatcher.BeginInvoke(
                Sub()
                        screen.Refresh()
                    End Sub)
            Next
            Me.Close(True)
            ' Application.Current.ShowDefaultScreen(Me.Product_DocumentProperty)
        End Sub

        Private Sub Supplier_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewSupplier()
        End Sub

        Private Sub Inventory_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewProduct()
        End Sub

        Private Sub CreateNewProduct_Document_CanSaving(ByRef result As Boolean)
            If Me.Product_DocumentProperty.Check <> Me.Product_DocumentProperty.Taxable_Amount Then
                If ShowInputBox("Document_CanSaving Il totale caricato non corrisponde all'imponibile documento vuoi continuare?", "Conferma salvataggio", "Si") Then
                    result = True
                Else
                    result = False
                End If
            End If
        End Sub

        Private Sub CreateNewProduct_Document_Saving(ByRef handled As Boolean)
            ' Aggiorna magazzino.
            'For Each obj In Me.Product_Histories
            '    Utility.aggInventory(obj, obj.Product)
            'Next (obj)
            'Se Fattura
            If Me.Product_DocumentProperty.Type.Contains("2") Then
                '"Acquisto Merce"
                Dim AccountList As Account_List
                Dim account As Account
                Dim Operazione = " Acquisto merce " & Me.Product_DocumentProperty.Supplier.Name & " doc " & Me.Product_DocumentProperty.Document_Number
                '****************************************************************************dare Acq. Materie
                account = findAccount("Acq. Materie", "0311")
                AccountList = New Account_List
                Dim ValueType = "Protocollo contabile"
                Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = ValueType).SingleOrDefault()
                If (existing Is Nothing) Then
                    existing = DataWorkspace.ApplicationData.Counters.AddNew()
                    existing.Counter_Type = ValueType
                    existing.Counter_year = Now.Year
                    existing.Valore = 0
                End If
                Dim accountProtocol = Utility.getCounter(existing, ValueType, Now.Year)
                Utility.aggAccountList(Me.Product_DocumentProperty.Document_Date, account, AccountList, Operazione, "Credit", Me.Product_DocumentProperty.Taxable_Amount, accountProtocol)
                'se le spese di trasporto sono > 0 aggiungi in prima nota spese di trasporto
                If Me.Product_DocumentProperty.Shipping_Cost > 0 Then
                    '****************************************************************************dare Spese di Trasporto
                    account = findAccount("Spese di Trasporto", "0311")
                    AccountList = New Account_List
                    Utility.aggAccountList(Me.Product_DocumentProperty.Document_Date, account, AccountList, Operazione, "Credit", Me.Product_DocumentProperty.Shipping_Cost, accountProtocol)
                End If
                '****************************************************************************dare Iva C/Erario
                account = findAccount("Iva C/Erario", "0208")
                AccountList = New Account_List
                Utility.aggAccountList(Me.Product_DocumentProperty.Document_Date, account, AccountList, Operazione, "Credit", Me.Product_DocumentProperty.Vat, accountProtocol)
                '****************************************************************************avere Fornitore
                account = findAccount(Me.Product_DocumentProperty.Supplier.Name, "0207")
                AccountList = New Account_List
                Utility.aggAccountList(Me.Product_DocumentProperty.Document_Date, account, AccountList, Operazione, "Debit", Me.Product_DocumentProperty.Total, accountProtocol)

                'verifica pagamento dilazionato o contante
                If Me.Product_DocumentProperty.Deferrals = 0 Then
                    '****************************************************************************dare Fornitore
                    Operazione = " Pagamento Fornitore " & Me.Product_DocumentProperty.Supplier.Name & " doc " & Me.Product_DocumentProperty.Document_Number
                    account = findAccount(Me.Product_DocumentProperty.Supplier.Name, "0207")
                    AccountList = New Account_List
                    Utility.aggAccountList(Me.Product_DocumentProperty.Document_Date, account, AccountList, Operazione, "Credit", Me.Product_DocumentProperty.Total, accountProtocol)
                    '****************************************************************************avere pagamento contanti Fornitore
                    account = findAccount("Cassa e Banche", "0101")
                    AccountList = New Account_List
                    Utility.aggAccountList(Me.Product_DocumentProperty.Document_Date, account, AccountList, Operazione, "Debit", Me.Product_DocumentProperty.Total, accountProtocol)
                Else
                    'aggiorna Scadenzario
                    For i = 1 To Me.Product_DocumentProperty.Payment_Number
                        'ShowMessageBox("Aggiorna Scadenzario rata= " & CStr(i) & " - data Scadenza=" & Utility.LastMounthDay(Me.Product_DocumentProperty.Document_Date, Me.Product_DocumentProperty.Deferrals - (i * 30)))
                        Utility.aggScheduleSupplier(Me.Product_DocumentProperty, Me.Schedules.AddNew(), "Debito", i)
                    Next
                End If
              
            End If

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

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub
    End Class

End Namespace