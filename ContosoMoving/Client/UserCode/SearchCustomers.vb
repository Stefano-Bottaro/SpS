
Namespace LightSwitchApplication

    Public Class SearchCustomers

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub

        Private Sub Print_Execute()
            ' Scrivere qui il codice.
            Dim MyDocs = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
            Dim WordFile = MyDocs & "\Customer.docx"

            If File.Exists(WordFile) Then

                'Map the content control tag names in the word document to the entity field names
                'Intestazione che viene dalla Company
                'Titolo documento STAMPA ASSUNZIONE DI RESPONSABILITA’ e MODULO PRIVACY
                'body1 Il sottoscritto Customer.LastName + " " + Customer.FirstName + " " +  nato il  + " " +  born_Date + " residente in  " " + Customer.street
                'body 2 
                Dim entity = Me.Customers.SelectedItem()
                Dim custFields As New List(Of OfficeIntegration.ColumnMapping)
                custFields.Add(New OfficeIntegration.ColumnMapping("ContactName", "ContactName"))
                custFields.Add(New OfficeIntegration.ColumnMapping("CompanyName", "CompanyName"))
                custFields.Add(New OfficeIntegration.ColumnMapping("Phone", "Phone"))

                Dim doc As Object = OfficeIntegration.Word.GenerateDocument(WordFile, entity, custFields)

                'Export specific fields to the bookmarked "OrderTable" in Word
                'Dim orderFields As New List(Of String) From
                '    {"ShipName", "OrderDate", "ShippedDate"}

                '  OfficeIntegration.Word.ExportEntityCollection(doc, "OrderTable", 2, False, Me.Customers)

                OfficeIntegration.Word.SaveAsPDF(doc, MyDocs & "\Customer.pdf", True)
            End If
        End Sub
    End Class

End Namespace
