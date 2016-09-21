
Namespace LightSwitchApplication

    Public Class ApplicationDataService

        Public Function getCounter(ByVal Value As String, ByVal year As String) As Integer
            Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = Value).SingleOrDefault()
            If (existing Is Nothing) Then
                existing = DataWorkspace.ApplicationData.Counters.AddNew()
                existing.Counter_Type = Value
                existing.Counter_year = Trim(year)
                existing.Valore = 0
            End If
            If Trim(year).Length > 0 Then
                If year > existing.Counter_year Then 'if the year parameter is > the stored year  value is 0
                    existing.Valore = 0
                End If
            End If
            existing.Valore = existing.Valore + 1
            Me.SaveChanges()
            Return existing.Valore
        End Function

        Private Sub UpcomingAppointments_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Appointment))
            query = (From appt In query Where appt.Employee.UserName = Application.User.Name AndAlso appt.StartDate >= Today).Take(15)
        End Sub

        Private Sub UpcomingAppointmentsForAllEmployees_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Appointment))
            query = (From appt In query Where appt.StartDate >= Today).Take(15)
        End Sub

        Private Sub AvailableEmployees_PreprocessQuery(StartTime As System.Nullable(Of Date), EndTime As System.Nullable(Of Date), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Employee))
            Dim employeeIDs As New List(Of Integer)

            For Each employee As Employee In Employees
                Dim newAppt As Appointment = Nothing
                Dim isEmployeeAvailable = True
                Dim index As Integer = 0
                While (index < employee.Appointments.Count() And isEmployeeAvailable)
                    newAppt = employee.Appointments.ElementAt(index)
                    If ((newAppt.StartDate >= StartTime And newAppt.StartDate < EndTime) Or
                        (newAppt.EndDate > StartTime And newAppt.EndDate <= EndTime)) Then
                        isEmployeeAvailable = False
                    End If
                    index += 1
                End While
                If (isEmployeeAvailable) Then
                    employeeIDs.Add(employee.Id)
                End If
            Next
            ' Query results are sorted by the appointment count so the employees with the fewest appointments are most likely to be assigned
            ' a new appointment
            query = From emp As Employee In query Where employeeIDs.Contains(emp.Id) Select emp Order By emp.Appointments.Count() Ascending
        End Sub

        Private Sub Customers_Inserted(entity As Customer)
            'popolamento Piano dei conti
            'selezione voce del piano dei conti se esistente
            Dim existing = (From s In DataWorkspace.ApplicationData.Accounts Where s.Description = entity.LastName + " " + entity.FirstName).SingleOrDefault()
            If (existing Is Nothing) Then
                existing = Me.DataWorkspace.ApplicationData.Accounts.AddNew()
                existing.Description = entity.LastName + " " + entity.FirstName
                Dim ledger = (From l In DataWorkspace.ApplicationData.Account_Ledgers Where l.Description = "Clienti").SingleOrDefault()
                If (ledger Is Nothing) Then
                    ledger = Me.DataWorkspace.ApplicationData.Account_Ledgers.AddNew()
                    ledger.Description = "Clienti"
                    ledger.Account_class = "0104"
                End If
                existing.Account_Ledger = ledger
            End If
        End Sub

        Private Sub Suppliers_Inserted(entity As Supplier)
            'popolamento Piano dei conti 
            Dim existing = (From s In DataWorkspace.ApplicationData.Accounts Where s.Description = entity.Name).SingleOrDefault()
            If (existing Is Nothing) Then
                existing = Me.DataWorkspace.ApplicationData.Accounts.AddNew()
                existing.Description = entity.Name
                Dim ledger = (From l In DataWorkspace.ApplicationData.Account_Ledgers Where l.Description = "Fornitori").SingleOrDefault()
                If (ledger Is Nothing) Then
                    ledger = Me.DataWorkspace.ApplicationData.Account_Ledgers.AddNew()
                    ledger.Description = "Fornitori"
                    ledger.Account_class = "0207"
                End If
                existing.Account_Ledger = ledger
            End If
        End Sub


        Private Sub Accounts_Inserted(entity As Account)
            entity.Code = Right("0000000" & CStr(entity.Id), 7)
            entity.Summary_Code = entity.Account_Ledger.Summary_Code & "-" & entity.Code
        End Sub

        Private Sub Account_Ledgers_Inserted(entity As Account_Ledger)
            entity.Code = Right("00" & CStr(entity.Id), 2)
            entity.Summary_Code = entity.Account_class & "-" & entity.Code
        End Sub

        Private Sub Account_Lists_Inserting(entity As Account_List)
            entity.created = Today()
            entity.Year = Year(Today)
            entity.Month = Month(Today)
        End Sub

        Private Sub Products_Updating(entity As Product)
            'Aggiornamento indice di rotazione delle scorte di magazzino e delle quantità da riordinare
            If entity.Volume_Sold > 0 And entity.Stock > 0 Then
                entity.Turnover_Index = entity.Volume_Sold / entity.Stock
            End If
        End Sub

        Private Sub Product_Histories_Inserting(entity As Product_History)
            entity.created = Today()
            entity.Data_Document = entity.Product_Document.Document_Date
            If entity.Quantity_Enter > 0 Then
                entity.Total = entity.Cost * entity.Quantity_Enter   'se sono presenti i valori di carico
            Else
                entity.Total = entity.Cost * entity.Quantity_Output  'se sono presenti i valori di scarico
            End If
        End Sub

        Private Sub Suppliers_Inserting(entity As Supplier)
            entity.created = Today()
        End Sub

        Private Sub Fidelity_Cards_Inserting(entity As Fidelity_Card)
            entity.created = Today()
        End Sub

        Private Sub Schedules_Inserting(entity As Schedule)
            entity.created = Today()
            entity.Summary = entity.Name & " documento n. " & entity.Document_Number & " " & entity.Document_Date & " rata " & entity.Rate_Number
        End Sub

        Private Sub Service_Histories_Inserting(entity As Service_History)
            entity.created = Today()
            entity.Year = Year(entity.created)
            entity.Month = Month(entity.created)
        End Sub

        Private Sub Companies_Inserting(entity As Company)
            entity.created = Today()
            entity.License_Expire = Today.AddMonths(6)
        End Sub

        Private Sub Employees_Inserting(entity As Employee)
            entity.created = Today()
        End Sub

        Private Sub Customers_Inserting(entity As Customer)
            entity.created = Today()
        End Sub

    End Class

End Namespace
