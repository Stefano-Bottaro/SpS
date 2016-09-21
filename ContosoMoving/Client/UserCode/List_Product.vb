
Namespace LightSwitchApplication

    Public Class List_Product

        Private Sub Vat1_Execute()
            ' Scrivere qui il codice.
            Dim Obj = New LightSwitchApplication.Product_Tax
            Close(False)
            Application.Current.ShowDefaultScreen(Obj)
        End Sub

        Private Sub Load_Inventory1_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Product_Documents()
        End Sub


        Private Sub Under_Stock1_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Product_Under_Stock()
        End Sub

       
        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)

        End Sub

       
        Private Sub Inventory_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Product_Inventory()
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Products)
        End Sub
    End Class

End Namespace
