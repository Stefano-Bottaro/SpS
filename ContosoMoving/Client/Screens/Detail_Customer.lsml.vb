Imports System.Runtime.InteropServices.Automation
Imports <xmlns:ns0="urn:microsoft:contoso:projectstatus">
Imports Microsoft.LightSwitch.Details

Namespace LightSwitchApplication

    Public Class Detail_Customer

        Public Shared Sub RunPrivacyReport(ByVal obj As Customer, ByVal myCompany As Company)
            If AutomationFactory.IsAvailable Then
                Try
                    'Create the XML data from our entity properties. 
                    ' Project materials content controls on the Word template are set to allow carriage  
                    ' returns so we can easily display as many line items as we need       
                    Dim str = ""
                    If obj.Sex = "F" Then
                        str = "La sottoscritta " + obj.Summary + " nata il " + obj.Born_date + " residente in  " + obj.City + " Indirizzo " + obj.Street
                    Else
                        str = "Il sottoscritto " + obj.Summary + " nato il " + obj.Born_date + " residente in  " + obj.City + " Indirizzo " + obj.Street
                    End If
                    Dim myXML =
                        <company>
                            <name><%= myCompany.Name %></name>
                            <legal_address><%= myCompany.Legal_Address %></legal_address>
                            <city><%= myCompany.Geo_City %></city>
                            <title>STAMPA ASSUNZIONE DI RESPONSABILITA’ e MODULO PRIVACY</title>
                            <body><%= str %></body>
                        </company>
                    Using word = AutomationFactory.CreateObject("Word.Application")
                        'The report template already has content controls bound to a dummy XML inside.  
                        ' Look in the ClientGenerated project to view the Word template. 
                        Dim resourceInfo = System.Windows.Application.GetResourceStream(New Uri("Privacy.docx", UriKind.Relative))
                        Dim fileName = CopyStreamToTempFile(resourceInfo.Stream, ".docx")
                        Dim doc = word.Documents.Open(fileName)
                        'Grab the existing bound custom XML in the doc 
                        Dim customXMLPart = doc.CustomXMLParts("urn:microsoft:contoso:projectstatus")

                        Dim all = customXMLPart.SelectSingleNode("//*")
                        Dim replaceNode = customXMLPart.SelectSingleNode("/ns0:root[1]/customer[1]")

                        'replace the <customer> node in the existing custom XML with this new data 
                        all.ReplaceChildSubtree(myXML.ToString, replaceNode)

                        word.Visible = True

                    End Using
                Catch ex As Exception
                    Throw New InvalidOperationException("Errore nel creare il documento sulla Privacy", ex)
                End Try
            End If
        End Sub

        Private Sub Customer_Loaded(succeeded As Boolean)
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub Customer_Changed()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub Detail_Customer_Saved()
            ' Scrivere qui il codice.
            Me.SetDisplayNameFromEntity(Me.Customer)
        End Sub

        Private Sub Back_Execute()
            ' Scrivere qui il codice.
            Me.Close(True)
        End Sub


        Private Shared Function CopyStreamToTempFile(ByVal stream As System.IO.Stream, ByVal ext As String) As String
            Dim path = GetTempFileName(ext)
            'Create the temp file 
            Dim file = System.IO.File.Create(path)
            file.Close()
            'Write the stream to disk 
            Using fileStream = System.IO.File.Open(path,
                                                   System.IO.FileMode.OpenOrCreate,
                                                   System.IO.FileAccess.Write,
                                                   System.IO.FileShare.None)

                Dim buffer(0 To stream.Length - 1) As Byte
                stream.Read(buffer, 0, stream.Length)
                fileStream.Write(buffer, 0, buffer.Length)
                fileStream.Close()
            End Using
            Return path
        End Function

        Private Shared Function GetTempFileName(ByVal ext As String) As String
            'Return a uinuqe file name in My Documents\Reports based on a guid 
            Dim path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "\Privacy"
            If Not Directory.Exists(path) Then
                Directory.CreateDirectory(path)
            End If
            Dim filename = Guid.NewGuid().ToString() & ext
            path = System.IO.Path.Combine(path, filename)

            Return path
        End Function

        Private Sub Print_Execute()
            ' Write your code here.
            Dim company = DataWorkspace.ApplicationData.Companies.SingleOrDefault()
            Utility.PrintReport(Me.Customer)
        End Sub

        Private Sub Appointment_Execute()
            ' Scrivere qui il codice.
            Application.ShowCreateNewAppointment(Me.Customer.Id)
        End Sub

        Private Sub OK_Execute()
            ' chiude la finestra dei dati statistici del cliente
            Me.CloseModalWindow("ModalWin")
        End Sub
    End Class

End Namespace