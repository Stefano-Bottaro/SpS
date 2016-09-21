
Namespace LightSwitchApplication

    Public Class List_Customers

        Private Sub Ritorno_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            'OfficeIntegration.Excel.Export(Me.Customers)
        End Sub

        Private Sub CustomerListEditSelected_CanExecute(ByRef result As Boolean)
            ' Scrivere qui il codice.

        End Sub

        Private Sub CustomerListEditSelected_Execute()
            ' Scrivere qui il codice.
            Application.ShowDetail_Customer(Me.Customers.SelectedItem.Id)
        End Sub

        Private Sub CustomerListAddAndEditNew_CanExecute(ByRef result As Boolean)
            ' Scrivere qui il codice.

        End Sub

        Private Sub CustomerListAddAndEditNew_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewCustomer()
        End Sub

        Private Sub Add_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewCustomer()
        End Sub
    End Class

End Namespace
