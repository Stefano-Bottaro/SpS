
Namespace LightSwitchApplication

    Public Class Home_Appointement

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub ToDoList_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_TodoLists()
        End Sub

        Private Sub Appointment_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearchUpcomingAppointmentsForAllEmployees(Today, Today.AddDays(8))
        End Sub

        Private Sub Important_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearchImportantAppointment(Today)
        End Sub

        Private Sub Impegni_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearchAvailableEmployees()
        End Sub

        Private Sub DailyAppointment_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearchUpcomingAppointments()
        End Sub

       
        Private Sub Treatments_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Service_Document()
        End Sub

        Private Sub MontlyTrend_Execute()
            ' Scrivere qui il codice.
            Application.ShowAnalyze_SalonBalance1()
        End Sub

        Private Sub Trend_Avg_Sell_Execute()
            ' Scrivere qui il codice.
            Application.ShowAnalisys_Sell_Mountly()
        End Sub
    End Class

End Namespace
