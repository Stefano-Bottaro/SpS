'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class Home
        Private Sub Home_InitializeDataWorkspace(saveChangesTo As List(Of IDataService))
            If Me.Application.LoggedInEmployee Is Nothing Then
                'If the logged in user cannot be found in the employee table then we can't display the My Appointments grid.
                '(Note: The CurrentAppointmentsByEmployee query is supplying the Employee value in CurrentAppointmentsByEmployee_PreprocessQuery)
                ShowMessageBox("Cannot display your appointments. Your user name " + Me.Application.User.Name +
                               " was not found. Please have an administrator add you to the employee table.")
                Me.FindControl("CurrentAppointments").IsEnabled = False
            End If

            ' Initialize image properties
            ' You put these in the (File View) Client project \Resources folder and set the Build Action to "Embedded Resource"
            Image_Logo = MyImageHelper.GetImageByName("logo.png")
            Image_Materials = MyImageHelper.GetImageByName("materials.png")
            Image_SearchCustomer = MyImageHelper.GetImageByName("customer.png")
            Image_SearchProject = MyImageHelper.GetImageByName("newproject.png")
            Image_Reports = MyImageHelper.GetImageByName("reports.png")

            ' Initialize text properties
            Text_Title = "Contoso Construction Project Manager"
            Text_Subtitle = "Welcome " + Application.User.FullName + "!"
            Text_Description = "This application is designed for contractors to easily manage projects for their customers."
            Text_Materials = "Shows the master list of materials used on projects. You can upload additional items into the catalog from Excel spreadsheets."
            Text_SearchCustomer = "Searches for an existing customer in the system."
            Text_SearchProject = "Searches for an existing construction project in the system."
            Text_Reports = "Shows a report of projects that are running over budget."
        End Sub

       
        Private Sub SearchProjects_Execute()
            Me.Application.ShowSearchCurrentProjects()
        End Sub

        Private Sub EditMaterials_Execute()
            Me.Application.ShowEditableMaterialsGrid()
        End Sub

        Private Sub SearchCustomers_Execute()
            Me.Application.ShowSearchCustomers()
        End Sub

        Private Sub CurrentAppointmentsAddAndEditNew_Execute()
            'Open the new appointment screen. Customer will need to be selected on that screen
            Me.Application.ShowCreateNewAppointment(Nothing)
        End Sub

        Private Sub CurrentAppointmentsEditSelected_CanExecute(ByRef result As Boolean)
            'Make sure a appointment is selected before editing it
            result = (Me.MyAppointments IsNot Nothing AndAlso Me.MyAppointments.SelectedItem IsNot Nothing)
        End Sub

        Private Sub CurrentAppointmentsEditSelected_Execute()
            'Edit the currently selected appointment
            Me.Application.ShowAppointmentDetail(Me.MyAppointments.SelectedItem.Id)
        End Sub

        Private Sub CurrentProjectsAddAndEditNew_Execute()
            'Open the new project screen. Customer will need to be selected on that screen
            Me.Application.ShowCreateNewProject(Nothing)
        End Sub

        Private Sub CurrentProjectsEditSelected_CanExecute(ByRef result As Boolean)
            'Make sure a project is selected before editing it
            result = (Me.CurrentProjects IsNot Nothing AndAlso Me.CurrentProjects.SelectedItem IsNot Nothing)
        End Sub

        Private Sub CurrentProjectsEditSelected_Execute()
            'Open the project details for the selected project
            Me.Application.ShowProjectDetail(Me.CurrentProjects.SelectedItem.Id)
        End Sub

        Private Sub RunReport_Execute()
            'Display the projects that are over budget 
            Me.Application.ShowProjectsOverBudget()
        End Sub

        Private Sub ShowMap_Execute()
            'Show a map of the appointment location
            Me.Application.ShowMapScreen(Me.MyAppointments.SelectedItem.Location)
        End Sub

        Private Sub ShowMap_CanExecute(ByRef result As Boolean)
            result = (Me.MyAppointments IsNot Nothing AndAlso Me.MyAppointments.SelectedItem IsNot Nothing)
        End Sub

    End Class

End Namespace
