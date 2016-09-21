'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class Material

        Private Sub Summary_Compute(ByRef result As String)
            ' Set result to the desired field value
            result = Me.Name + ": " + Me.Units
        End Sub
    End Class

End Namespace
