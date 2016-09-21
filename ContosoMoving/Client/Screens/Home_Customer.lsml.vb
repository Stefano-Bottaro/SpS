
Namespace LightSwitchApplication

    Public Class Home_Customer

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Customer_Execute()
            ' Scrivere qui il codice.
            Application.ShowSearchCustomers()
        End Sub

        Private Sub PhotoBook_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Photos()
        End Sub

        Private Sub Salon_Book_Execute()
            ' Scrivere qui il codice.

        End Sub

        Private Sub History_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Service_Document()
        End Sub

        Private Sub Customer_Offers_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Customer_Promotes()
        End Sub

        Private Sub TopTen_Execute()
            ' Scrivere qui il codice.
            Me.Application.ShowStatist_TopTenCustomer()
        End Sub

       
        Private Sub Segmentation_Execute()
            ' Scrivere qui il codice.

        End Sub
    End Class

End Namespace
