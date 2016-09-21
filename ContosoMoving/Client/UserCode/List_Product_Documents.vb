
Namespace LightSwitchApplication

    Public Class List_Product_Documents

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Utility.ExportToExcel(Me.Product_Documents)
        End Sub

        Private Sub Supplier_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewSupplier()
        End Sub


        Private Sub Product_HistoriesAddNew_CanExecute(ByRef result As Boolean)
            ' Scrivere qui il codice.

        End Sub

        Private Sub Inventory_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewProduct()
        End Sub

        Private Sub Load_Document_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewProduct_Document()

        End Sub

    End Class

End Namespace
