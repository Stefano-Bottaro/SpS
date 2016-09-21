
Namespace LightSwitchApplication

    Public Class SearchCustomers

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            'OfficeIntegration.Excel.Export(Me.Customers)

        End Sub

        Private Sub Add_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewCustomer()
        End Sub
    End Class

End Namespace
