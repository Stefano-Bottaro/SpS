
Namespace LightSwitchApplication

    Public Class CreateNewService_Document

        Private Sub CreateNewService_Document_InitializeDataWorkspace(saveChangesTo As List(Of Microsoft.LightSwitch.IDataService))
            ' Scrivere qui il codice.
            Me.Service_DocumentProperty = New Order()
            Me.Service_DocumentProperty.Document_Date = Today()
        End Sub

        Private Sub CreateNewService_Document_Saving(ByRef handled As Boolean)
            ' se non sono stati fatti pagamenti
            If Me.Service_DocumentProperty.Payoff = Me.Service_DocumentProperty.Total Then
                ShowMessageBox("Attenzione Inserire il pagamento....")
                handled = False
            Else
                ' se il pagamento è parziale
                If Me.Service_DocumentProperty.Payoff > 0 Then
                    If ShowInputBox("Confermi il proseguimento della registrazione?", "Attenzione Ricevuta non saldata") = False Then
                        handled = False
                    End If
                End If
                ' se il pagamento anche parziale è presente
                If handled Then
                    handled = True
                    Dim ValueType = "Ricevuta Fiscale"
                    Dim anno = Now.Year
                    Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = ValueType).SingleOrDefault()
                    If (existing Is Nothing) Then
                        existing = DataWorkspace.ApplicationData.Counters.AddNew()
                        existing.Counter_Type = ValueType
                        existing.Counter_year = anno
                        existing.Valore = 0
                    End If
                    Me.Service_DocumentProperty.Document_Number = Utility.getCounter(existing, ValueType, anno)
                End If
            End If
        End Sub
        Private Sub CreateNewService_Document_Saved()
            Dim screens = Me.Application.ActiveScreens()
            For Each s In screens
                Dim screen = s.Screen
                screen.Details.Dispatcher.BeginInvoke(
                Sub()
                        screen.Refresh()
                    End Sub)
            Next
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.Service_DocumentProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Pagamento_Execute()
            ' Scrivere qui il codice.
            Me.OpenModalWindow("payModal")
        End Sub

        Private Sub ClosePay_Execute()
            ' Scrivere qui il codice.
            Me.CloseModalWindow("payModal")
        End Sub

        Private Sub SavePay_Execute()
            ' Scrivere qui il codice.
            Me.Save()
        End Sub

       
    End Class

End Namespace