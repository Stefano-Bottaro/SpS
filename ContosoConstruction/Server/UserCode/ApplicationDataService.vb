'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Namespace LightSwitchApplication

    Public Class ApplicationDataService

#Region "Query Methods"
        Private Sub Employees_All_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of Employee))
            'Always return employees sorted by lastname, firstname. 
            query = From e In query
                    Order By e.LastName, e.FirstName
        End Sub

        Private Sub Customers_All_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of Customer))
            'Always return customers sorted by lastname, firstname. 
            query = From c In query
                    Order By c.LastName, c.FirstName
        End Sub

        Private Sub Materials_All_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of Material))
            'Always return materials sorted by name. 
            query = From m In query
                    Order By m.Name
        End Sub

        Private Sub Pictures_All_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of Picture))
            'Always return pictures sorted by last updated date descending
            query = From p In query
                    Order By p.Updated Descending
        End Sub

        Private Sub Projects_All_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of Project))
            'Always return projects sorted by StartDate descending then by Name
            query = From p In query
                    Order By p.StartDate, p.ProjectName
        End Sub

        Private Sub MaterialsNotOnProject_PreprocessQuery(ProjectID As System.Nullable(Of Integer),
                                                          ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Material))
            'If a project ID is passed to the query then only return material list that 
            ' has not already been selected on the project
            If (ProjectID.HasValue) Then
                query = From m In query
                        Where Not m.ProjectMaterials.Any(Function(f) f.Project.Id = ProjectID)
            End If

        End Sub

        Private Sub CurrentProjects_PreprocessQuery(ShowAllProjects As System.Nullable(Of Boolean),
                                                    ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Project))

            'If ShowAllProjects is False (or Nothing) then just pull up the 
            ' projects that do not have an actual end date specified. 
            If Not (ShowAllProjects.HasValue) Then ShowAllProjects = False

            If Not (ShowAllProjects) Then
                query = From p In query
                        Where p.ActualEndDate Is Nothing
                        Select p

            End If
        End Sub

        Private Sub ProjectsOverBudget_PreprocessQuery(
                    ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Project))

            'Return projects where the cost is over the original estimate
            query = From p In query
                    Let cost = p.Labor +
                        (Aggregate m In p.ProjectMaterials Into Sum(m.Quantity * m.Price))
                    Where cost > p.OriginalEstimate
                    Order By p.StartDate
                    Select p
        End Sub

        Private Sub CurrentAppointmentsByEmployee_PreprocessQuery(EmployeeID As System.Nullable(Of Integer), 
                                                                  ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Appointment))

            'If the employeeID is not specified, then look it up based on the currently logged-in user.
            ' (Note: EmployeeID is marked as Optional in the filter condition of the Query Designer)
            If Not EmployeeID.HasValue Then
                Dim emp = Me.DataWorkspace.ApplicationData.GetEmployeeByUserName(Me.Application.User.Name)
                If emp IsNot Nothing Then
                    EmployeeID = emp.Id
                Else
                    EmployeeID = 0
                    Trace.TraceError("CurrentAppointmentsByEmployee_PreprocessQuery: User name " + Me.Application.User.Name + " was not found in the employee table.")
                End If

                query = From appt In query
                        Where appt.Employee.Id = EmployeeID

            End If
        End Sub

        Private Sub CustomFilterProjects_PreprocessQuery(FilterTerm As String,
                    ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Project))
            'Use the filter control extension to perform a custom query on the data 
            ' http://code.msdn.microsoft.com/Filter-Control-for-Visual-90fb8e93
            query = LightSwitchFilter.Server.Filter(query, FilterTerm, Me.Application)

        End Sub
#End Region

#Region "Save Pipeline"

        Private Sub Employees_Updating(entity As Employee)
            'Audit trail that tracks changes to employee records
            Dim change = entity.EmployeeChanges.AddNew()
            change.Employee = entity
            change.Updated = Now()
            change.ChangedBy = Me.Application.User.FullName
            Dim newvals = "New Values:"
            Dim oldvals = "Original Values:"

            For Each prop In entity.Details.Properties.All().
                OfType(Of Microsoft.LightSwitch.Details.IEntityStorageProperty)()

                If prop.Name <> "Id" Then
                    If Not Object.Equals(prop.Value, prop.OriginalValue) Then
                        oldvals += String.Format("{0}{1}: {2}", vbCrLf, prop.Name, prop.OriginalValue)
                        newvals += String.Format("{0}{1}: {2}", vbCrLf, prop.Name, prop.Value)

                    End If
                End If
            Next
            change.OriginalValues = oldvals
            change.NewValues = newvals
        End Sub


        Private Sub Appointments_Inserting(ByVal entity As Appointment)
            'Used to track any iCalender appointment requests
            entity.MsgID = Guid.NewGuid.ToString()
            entity.MsgSequence = 0
        End Sub

        Private Sub Appointments_Updating(ByVal entity As Appointment)
            'Update the sequence anytime the appointment is updated
            entity.MsgSequence += 1
        End Sub

        Private Sub Appointments_Inserted(ByVal entity As Appointment)
            'Send an email notification when an appointment is inserted into the system
            Dim isCanceled = False
            SMTPMailHelper.SendAppointment(entity.Employee.Email,
                                         entity.Customer.Email,
                                         entity.Subject,
                                         entity.Notes,
                                         entity.Location,
                                         entity.StartTime,
                                         entity.EndTime,
                                         entity.MsgID,
                                         entity.MsgSequence,
                                         isCanceled)
        End Sub

        Private Sub Appointments_Updated(ByVal entity As Appointment)
            'Send an email update when an appointment is updated. 
            ' This helper class will send an update to the original appointment
            ' because we are tracking the sequence and ID
            Dim isCanceled = False
            SMTPMailHelper.SendAppointment(entity.Employee.Email,
                                    entity.Customer.Email,
                                    entity.Subject,
                                    entity.Notes,
                                    entity.Location,
                                    entity.StartTime,
                                    entity.EndTime,
                                    entity.MsgID,
                                    entity.MsgSequence,
                                    isCanceled)
           
        End Sub

        Private Sub Appointments_Deleting(entity As Appointment)
            'Send an email cancellation when an appointment is deleted.
            ' This helper class will send a cancellation because we are tracking the sequence and ID.
            Dim isCanceled = True
            SMTPMailHelper.SendAppointment(entity.Employee.Email,
                                    entity.Customer.Email,
                                    entity.Subject,
                                    entity.Notes,
                                    entity.Location,
                                    entity.StartTime,
                                    entity.EndTime,
                                    entity.MsgID,
                                    entity.MsgSequence,
                                    isCanceled)

        End Sub
#End Region

#Region "Entity Access Control"
        'Only administrators can modify employee (HR) & material data
        Private Sub Employees_CanDelete(ByRef result As Boolean)
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub

        Private Sub Employees_CanInsert(ByRef result As Boolean)
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub

        Private Sub Employees_CanUpdate(ByRef result As Boolean)
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub

        Private Sub Materials_CanDelete(ByRef result As Boolean)
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub

        Private Sub Materials_CanInsert(ByRef result As Boolean)
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub

        Private Sub Materials_CanUpdate(ByRef result As Boolean)
            result = Me.Application.User.HasPermission(Permissions.SecurityAdministration)
        End Sub
#End Region

      
       
    End Class

End Namespace
