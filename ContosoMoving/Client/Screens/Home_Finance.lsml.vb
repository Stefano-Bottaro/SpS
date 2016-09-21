
Namespace LightSwitchApplication

    Public Class Home_Finance

        Private Sub First_Note_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearch_First_note()
        End Sub

        Private Sub Piano_conti_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Account_Ledgers()
        End Sub

        Private Sub Schedule_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearch_Schedule_by_date()
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Economic_movement_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearch_Cash_Operation()

        End Sub

        
        Private Sub Salon_Costs_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewAccount_List()
        End Sub

        Private Sub Bilancio_salone_Execute()
            ' Scrivere qui il codice.
            Application.ShowAnalyze_SalonBalance1()
        End Sub
    End Class

End Namespace
