'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Imports System.Runtime.InteropServices.Automation
Imports <xmlns:ns0="urn:microsoft:contoso:projectstatus">
Imports Microsoft.LightSwitch.Details

Namespace LightSwitchApplication

    Public Class MyReportHelper
        ' For info on how to use content controls & bind XML to Word 2007/2010 documents see:
        'http://blogs.msdn.com/b/bethmassi/archive/2010/09/10/using-microsoft-word-to-create-reports-for-lightswitch-or-silverlight.aspx

        Public Shared Sub RunProjectStatusReport(ByVal project As Project)
            If AutomationFactory.IsAvailable Then
                Try

                    'Create the XML data from our entity properties.
                    ' Project materials content controls on the Word template are set to allow carriage 
                    ' returns so we can easily display as many line items as we need                    ' 
                    Dim myXML = <customer>
                                    <fullname><%= project.Customer.FullName %></fullname>
                                    <homephone><%= project.Customer.HomePhone %></homephone>
                                    <mobilephone><%= project.Customer.MobilePhone %></mobilephone>
                                    <email><%= project.Customer.Email %></email>
                                    <fulladdress><%= project.Customer.FullAddress %></fulladdress>
                                    <project>
                                        <projectname><%= project.ProjectName %></projectname>
                                        <startdate><%= project.StartDate.ToShortDateString %></startdate>
                                        <estimatedenddate><%= project.EstmatedEndDate.ToShortDateString %></estimatedenddate>
                                        <originalestimate><%= Format(project.OriginalEstimate, "c2") %></originalestimate>
                                        <labor><%= Format(project.Labor, "c2") %></labor>
                                        <totalcost><%= Format(project.TotalCost, "c2") %></totalcost>
                                        <notes><%= project.Notes %></notes>
                                        <projectmaterials>
                                            <summary><%= Join((From m In project.ProjectMaterials
                                                         Select m.Summary).ToArray, vbCr) %></summary>
                                            <quantity><%= Join((From m In project.ProjectMaterials
                                                          Select CStr(m.Quantity)).ToArray, vbCr) %></quantity>
                                            <price><%= Join((From m In project.ProjectMaterials
                                                       Select Format(m.Price, "c2")).ToArray, vbCr) %></price>
                                            <itemtotal><%= Join((From m In project.ProjectMaterials
                                                           Select Format(m.ItemTotal, "c2")).ToArray, vbCr) %></itemtotal>
                                        </projectmaterials>
                                    </project>
                                </customer>

                    Using word = AutomationFactory.CreateObject("Word.Application")
                        'The report template already has content controls bound to a dummy XML inside. 
                        ' Look in the ClientGenerated project to view the Word template.
                        Dim resourceInfo = System.Windows.Application.GetResourceStream(New Uri("ProjectStatus.docx", UriKind.Relative))
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
                    Throw New InvalidOperationException("Failed to create project status report.", ex)
                End Try
            End If
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
            Dim path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "\Reports"
            If Not Directory.Exists(path) Then
                Directory.CreateDirectory(path)
            End If

            Dim filename = Guid.NewGuid().ToString() & ext
            path = System.IO.Path.Combine(path, filename)

            Return path
        End Function
    End Class
End Namespace