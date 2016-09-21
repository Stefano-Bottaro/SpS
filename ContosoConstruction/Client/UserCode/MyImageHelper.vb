'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 


''' <summary>
''' This class makes it easy to load images from the client project.
''' Images should be placed in the Client project \Resources folder 
'''  with Build Action set to "Embedded Resource"
''' </summary>
''' <remarks></remarks>
Public Class MyImageHelper
    Public Shared Function GetImageByName(fileName As String) As Byte()
        Dim assembly As Reflection.Assembly = Reflection.Assembly.GetExecutingAssembly()
        Dim stream As Stream = assembly.GetManifestResourceStream(fileName)
        Return GetStreamAsByteArray(stream)
    End Function

    Private Shared Function GetStreamAsByteArray(
                            ByVal stream As System.IO.Stream) As Byte()
        If stream IsNot Nothing Then
            Dim streamLength As Integer = Convert.ToInt32(stream.Length)
            Dim fileData(streamLength - 1) As Byte
            stream.Read(fileData, 0, streamLength)
            stream.Close()
            Return fileData
        Else
            Return Nothing
        End If
    End Function
End Class
