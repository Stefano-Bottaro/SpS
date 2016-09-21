
Namespace LightSwitchApplication

    Public Class List_Region

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)

        End Sub

        Private Sub Add_Execute()
            ' Scrivere qui il codice.
            Dim region As New Geo_City
            States.AddNew()
            Me.OpenModalWindow("Region")
        End Sub

        Private Sub OK_Region_Execute()
            ' Scrivere qui il codice.
            Me.Save()
            Me.CloseModalWindow("Region")
        End Sub
    End Class

End Namespace
