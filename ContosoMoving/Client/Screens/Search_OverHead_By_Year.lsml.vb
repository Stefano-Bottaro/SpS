
Namespace LightSwitchApplication

    Public Class Search_OverHead_By_Year

        Private Sub Search_OverHead_By_Year_Closing(ByRef cancel As Boolean)
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Search_OverHead_By_Year_Activated()
            ' Scrivere qui il codice.
            Me.Account_OverheadAnno = Now.Year
        End Sub

        Private Sub Add_Execute()
            ' Scrivere qui il codice.
            Dim overhead = OverHead_By_Year.AddNew
            overhead.Year = Now.Year
            Me.OpenModalWindow("Add_OverHead")
        End Sub

        Private Sub OK_OverHead_Execute()
            ' Scrivere qui il codice.
            Me.Save()
            Me.CloseModalWindow("Add_OverHead")
        End Sub

        Private Sub Close_OverheadAdd_Execute()
            ' Scrivere qui il codice.
            Me.CloseModalWindow("Add_OverHead")
        End Sub

        Private Sub Close_Overhead_Edit_Execute()
            ' Scrivere qui il codice.
            Me.CloseModalWindow("Edit_Overhead")
        End Sub

        Private Sub Edit_Execute()
            ' Scrivere qui il codice.

            Me.OpenModalWindow("Edit_OverHead")
        End Sub

        Private Sub Edit_Overhead_Execute()
            ' Scrivere qui il codice.
            Me.Save()
            Me.CloseModalWindow("Edit_Overhead")
        End Sub
    End Class

End Namespace
