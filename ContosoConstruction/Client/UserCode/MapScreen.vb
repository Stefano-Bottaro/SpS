'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class MapScreen

        Private Sub FullAddress_Changed()
            Me.DisplayName = "Map of " & Me.FullAddress
        End Sub

    End Class

End Namespace
