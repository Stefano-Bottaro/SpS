


Namespace LightSwitchApplication

    Public Class Start

        Private Sub Configuration_Execute()
            ' Scrivere qui il codice.
            Application.ShowConfiguration()
        End Sub

        Private Sub Customer_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearchCustomers()
        End Sub

        Private Sub Appointment_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Calendar_Events()
        End Sub

        Private Sub Cash_Execute()
            ' Scrivere qui il codice.

        End Sub

        Private Sub Fidalization_Execute()
            ' Scrivere qui il codice.

        End Sub

        Private Sub Inventory_Execute()
            ' Scrivere qui il codice.
            Me.Application.ShowList_Product()
        End Sub

        Private Sub Financial_Execute()
            ' Scrivere qui il codice.
            Me.Application.ShowList_Account_Lists()
        End Sub
    End Class

End Namespace
