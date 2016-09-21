
Namespace LightSwitchApplication

    Public Class List_Product

        Private Sub Vat1_Execute()
            ' Scrivere qui il codice.
            Dim Obj = New LightSwitchApplication.Product_Tax
            Close(False)
            Application.Current.ShowDefaultScreen(Obj)
        End Sub

       
        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)

        End Sub


        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Products)
        End Sub

      
        Private Sub Product_Execute()
            ' Scrivere qui il codice.
            Me.Application.ShowCreateNewProduct()

        End Sub
    End Class

End Namespace
