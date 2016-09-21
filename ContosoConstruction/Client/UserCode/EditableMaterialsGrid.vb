'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class EditableMaterialsGrid

        Private Sub ImportFromExcel_Execute()
            ' Use the Excel Importer to upload materials from a sppreadsheet
            ' http://code.msdn.microsoft.com/Excel-Importer-for-Visual-61dd4a90

            LightSwitchUtilities.Client.ImportFromExcel(Me.Materials)
        End Sub

       
    End Class

End Namespace
