
Namespace LightSwitchApplication

    Public Class AnalisysService_Avg_Monthly

        Private Sub AnalisysService_Avg_Monthly_Activated()
            ' Scrivere qui il codice.
            Me.Service_DocumentYear_Analisys = Now.Year

        End Sub

        Private Sub Statist_Execute()
            ' Scrivere qui il codice.
            Dim mese As String
            Dim existing = (From document In Me.Service_Document Where document.Year = Me.Service_DocumentYear_Analisys
                                Group By document.Month Into Group, Count(), Sum(document.Amount)
                            )
            Me.Mese = Nothing
            Me.Fiche = Nothing
            Me.Sedute = Nothing
            Me.avg_Fiche = Nothing
            mese = Nothing
            For Each obj In existing
                If Not obj.Month = Nothing Then
                    mese = Utility.getMounth(obj.Month)
                End If
                Me.Mese = Me.Mese & mese & vbCrLf
                Me.Fiche = Me.Fiche & obj.Sum & vbCrLf
                Me.Sedute = Me.Sedute & obj.Count & vbCrLf
                Me.avg_Fiche = Me.avg_Fiche & Math.Round(obj.Sum / obj.Count, 2) & vbCrLf
            Next

        End Sub
    End Class

End Namespace
