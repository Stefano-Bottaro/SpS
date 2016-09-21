
Namespace LightSwitchApplication

    Public Class Home_Configuration

        Private Sub Configura_Salone_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Companies()
        End Sub

        Private Sub Employee_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Employees()
        End Sub

        Private Sub Incentivazione_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Employees_Incentive()
        End Sub

        Private Sub Contatori_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Counters()
        End Sub

        Private Sub Marcatempo_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Employes_Timetable()

        End Sub

        Private Sub Region_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Region()

        End Sub

        Private Sub Bank_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Company_Banks()
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Succursali_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Companies_branch()
        End Sub

        Private Sub Back1_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub
    End Class

End Namespace
