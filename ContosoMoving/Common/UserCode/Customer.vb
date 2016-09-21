
Namespace LightSwitchApplication

    Public Class Customer

        Private Sub Summary_Compute(ByRef result As String)
            result = String.Format("{0} {1} - {2}", LastName, FirstName, Phone)
        End Sub

        Private Sub Geo_City_Changed()
            Me.City = Me.Geo_City.Name
            Me.PostalCode = Me.Geo_City.Cap
        End Sub

        Private Sub Age_Compute(ByRef result As Integer)
            ' Impostare il risultato sul valore del campo desiderato
            'result = Today.Year - Born_date.Value.Year
            If Not Born_date Is Nothing Then
                result = DateDiff(DateInterval.Year, Born_date.Value, Now)
            Else
                result = 0
            End If
        End Sub

        Private Sub Customer_Created()
            Payment_Type = "Contanti"
            Deferrals = 0
            Payment_Number = 1
        End Sub
    End Class

End Namespace
