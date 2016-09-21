
Namespace LightSwitchApplication

    Public Class List_Treatment

        Private Sub Populate_Statist_Execute()
            ' Scrivere qui il codice.
            For Each treatment In Me.Service_Document
                Dim existing As Statist
                existing = (From s In DataWorkspace.ApplicationData.Statists Where s.Year = treatment.Year And s.Month = treatment.Month).SingleOrDefault()
                If existing Is Nothing Then
                    existing = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    existing.Year = treatment.Document_Date.Year
                    existing.Month = treatment.Document_Date.Month
                    existing.Month_Name = Utility.getMounth(treatment.Document_Date.Month)
                End If
                existing.Amount = existing.Amount + treatment.Amount
                existing.Visit = existing.Visit + 1
                If treatment.Commission IsNot Nothing Then
                    existing.Commission = existing.Commission + treatment.Commission
                End If
                'existing.Average_Ticket = Math.Round(existing.Amount / existing.Visit, 2)
                If treatment.Elapsed IsNot Nothing Then
                    existing.Elapsed = existing.Elapsed + treatment.Elapsed
                Else
                    existing.Elapsed = existing.Elapsed + 29
                End If
                'existing.Average_Elapsed = Math.Round(existing.Elapsed / existing.Visit, 0)
                If treatment.Age IsNot Nothing Then
                    existing.Age = existing.Age + treatment.Age
                Else
                    existing.Age = 35
                End If
                If treatment.New_Customer = True Then
                    existing.New_Customer = existing.New_Customer + 1
                End If
                'existing.Average_Age = Math.Round(existing.Age / existing.Visit, 0)
                Me.Save()
            Next
        End Sub
    End Class

End Namespace
