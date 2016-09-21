
Namespace LightSwitchApplication

    Public Class CreateNewAppointment

        Private Sub CreateNewAppointment_InitializeDataWorkspace(ByVal saveChangesTo As Global.System.Collections.Generic.List(Of Global.Microsoft.LightSwitch.IDataService))
            Me.AppointmentProperty = New Appointment()
            If (CustomerID.HasValue) Then
                Me.AppointmentProperty.Customer = (From c In DataWorkspace.ApplicationData.Customers Where c.Id = CustomerID).SingleOrDefault()
            End If
        End Sub

        Private Sub CreateNewAppointment_Saved()
            Dim screens = Me.Application.ActiveScreens
            ' For Each s In screens
            'Dim screen = s.Screen
            'screen.Details.Dispatcher.BeginInvoke(
            'Sub()
            'screen.Refresh()
            '    End Sub)
            'Next
            Me.Close(False)
            'Application.Current.ShowDefaultScreen(Me.AppointmentProperty)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub



        Private Sub NewCustomer_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewCustomer()
        End Sub

     
    End Class

End Namespace