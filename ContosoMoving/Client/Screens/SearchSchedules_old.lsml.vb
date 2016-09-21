
Namespace LightSwitchApplication

    Public Class SearchSchedules_old

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Group_Execute()
            If Me.Schedules.SelectedItem.Type = "Credito" Then
                Me.Schedules.SelectedItem.Settlement = Me.Schedules.SelectedItem.Credit - Me.Schedules.SelectedItem.Settlement
            Else
                Me.Schedules.SelectedItem.Settlement = Me.Schedules.SelectedItem.Debit - Me.Schedules.SelectedItem.Settlement
            End If
            Me.OpenModalWindow("Payment")
        End Sub
       

        Private Sub OK_Execute()
            ' Salvo la registrazione

            'aggiorno la contabilita'

            'aggiorno il piano dei conti

            'aggiorno il cliente o il fornitore
            Me.CloseModalWindow("Payment")
        End Sub
    End Class

End Namespace
