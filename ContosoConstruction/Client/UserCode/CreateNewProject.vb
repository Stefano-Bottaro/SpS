'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class CreateNewProject

        Private Sub CreateNewProject_InitializeDataWorkspace(saveChangesTo As System.Collections.Generic.List(Of Microsoft.LightSwitch.IDataService))
            Me.Image_ScreenIcon = MyImageHelper.GetImageByName("newproject.png")
            Me.Text_ScreenTitle = "New Construction Project"

            Me.ProjectProperty = New Project()

            'If a customer ID is passed in, then set the customer automatically on new project records
            If Me.CustomerID.HasValue Then
                Me.ProjectProperty.Customer = Me.DataWorkspace.ApplicationData.Customers_SingleOrDefault(Me.CustomerID)
            Else
                'Automatically open the Customer selector for ease of use when the 
                ' project is created and no customer is specified.
                'You specify the name of the modal window picker control you want to open 
                ' (this name you set in the properties for the control) 
                Me.OpenModalWindow("CustomerPopup")
            End If

        End Sub

        Private Sub CreateNewProject_Saved()
            ' Write your code here.
            Me.Close(False)
            Application.Current.ShowDefaultScreen(Me.ProjectProperty)
        End Sub

    End Class

End Namespace