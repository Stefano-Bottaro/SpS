
Namespace LightSwitchApplication

    Public Class Home_Inventory

        Private Sub Product_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Product()
        End Sub

        Private Sub Service_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Services()
        End Sub

        Private Sub Product_Offers_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Offers()
        End Sub

        Private Sub Service_Offers_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Service_Offers()
        End Sub

        Private Sub Inventory_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Product_Inventory()
        End Sub

        Private Sub Under_Stock_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Product_Under_Stock()
        End Sub

        Private Sub Supplier_Execute()
            ' Scrivere qui il codice.
            Application.ShowList_Suppliers()
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

       
        Private Sub Analisys_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewProduct_Document()
        End Sub
    End Class

End Namespace
