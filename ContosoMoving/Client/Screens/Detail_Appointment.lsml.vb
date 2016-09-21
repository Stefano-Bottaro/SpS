
Namespace LightSwitchApplication

    Public Class Detail_Appointment

        Private Sub Appointment_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Appointment_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Detail_Appointment_Saved()
            ' Scrivere qui il codice.
            Me.Close(False)
            ' Me.SetDisplayNameFromEntity(Me.Appointment)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub New_Customer_Execute()
            ' Scrivere qui il codice.
            Me.Application.ShowCustomerDetail(Nothing)
        End Sub

        Private Sub Sell_Execute()
            ' Scrivere qui il codice.
            If Me.Appointment.Order Is Nothing Then
                Dim ServiceDocument = Me.DataWorkspace.ApplicationData.Orders.AddNew()
                ServiceDocument.Customer = Appointment.Customer
                ServiceDocument.Employee = Appointment.Employee
                ServiceDocument.Payment_Type = Appointment.Customer.Payment_Type
                ServiceDocument.Deferrals = Appointment.Customer.Deferrals
                ServiceDocument.Payment_Number = Appointment.Customer.Payment_Number
                ServiceDocument.Document_Date = Now
                ServiceDocument.Appointment = Me.Appointment
                Me.Save()
                Me.Application.ShowDetail_Service_Document(ServiceDocument.Id)
            Else
                Application.ShowDetail_Service_Document(Appointment.Order.Id)
            End If
           
        End Sub
    End Class

End Namespace