
Namespace LightSwitchApplication

    Public Class Photo

        Private Sub Photo_Created()
            Me.Customer = Me.Service_Document.Customer.LastName + " " + Me.Service_Document.Customer.FirstName
            Me.Employee = Me.Service_Document.Employee.Summary
            Me.created = Now
        End Sub
    End Class

End Namespace
