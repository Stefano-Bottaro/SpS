Namespace LightSwitchApplication

    Public Class ApplicationDataService

        '*********************query e view********************
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
            ' Query results are sorted by the appointment count so the employees with the fewest appointments are most likely to be assigned a new appointment
            query = From emp As Employee In query Where employeeIDs.Contains(emp.Id) Select emp Order By emp.Appointments.Count() Ascending
        End Sub
        'Private Sub Orders_Monthly_PreprocessQuery(Year_Analisys As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Order))
        '    query = (From o In query
        '    Where o.Year = Year_Analisys
        '            Group By o.Month Into Sum(o.Amount)
        '            Select Month, Sum)

        '    'Dim venezuelaTotalOrders = Aggregate cust In db.Customers
        '    'Where cust.Country = "Venezuela"
        '    'Into Sum(cust.Orders.Count)
        '    '            Dim customerOrderTotal =
        '    '                  From cust In Customers
        '    '                  Aggregate order In cust.Orders
        '    '                  Into Sum(order.Total), MaxOrder = Max(order.Total),
        '    '                  MinOrder = Min(order.Total), Avg = Average(order.Total)

        '    'Select Month = Key, OrderTotal = VendutoMese.Sum(Function(x) x.Amount)

        'End Sub
        Private Sub Order_Items_by_Year_PreprocessQuery(yearDate As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Order_Item))
            query = From service In Order_Items
                    Where (service.Year = yearDate)
                    Order By service.Month
                    Group By month = service.Month.ToString Into mese = Group, Count()
        End Sub
        Private Sub TopTenCustomer_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Customer))
            query = (From appt In query Order By appt.Expense_Last_Year Descending).Take(10)
        End Sub
        Private Sub Top3Customers_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Customer))
            query = (From appt In query Order By appt.Expense_Last_Year Descending).Take(3)
        End Sub
        Private Sub TopTenProduct_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Product))
            query = (From prod In query Order By prod.Volume_Sold Descending).Take(10)
        End Sub
        Private Sub Top3Products_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Product))
            query = (From prod In query Order By prod.Volume_Sold Descending).Take(3)
        End Sub
        Private Sub TopTenEmployee_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Employee))
            query = (From empl In query Order By empl.Total_Sales Descending).Take(10)
        End Sub
        Private Sub Top3Employee_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Employee))
            query = (From empl In query Order By empl.Total_Sales Descending).Take(3)
        End Sub

        Private Sub Statist_Customer_Segmentation_PreprocessQuery(ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Customer Segmentation")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot = Aggregate cust In Customers
                        Where cust.Expense_Last_Year > 0
                        Into Sum(cust.Expense_Last_Year)
            Dim Lista = (From c In Customers
                         Group By profession = c.Profession Into g = Group
                         Select New With
                                {
                                    .Category = profession,
                                    .Amount = g.Sum(Function(i) i.Expense_Last_Year)
                                }
                        )
            '.Visit = g.Count(Function(i) i.Id),
            'scrive sull'entità statistiche
            Dim ListaStatist = New List(Of Statist)
            For Each obj In Lista
                Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                stat.Category = obj.Category
                stat.Statistic_Name = "Customer Segmentation"
                If obj.Amount > 0 Then
                    stat.Amount = obj.Amount
                    stat.Percentual = CInt(obj.Amount / tot * 100)
                Else
                    stat.Amount = 0
                    stat.Percentual = CInt(1 / Lista.Count)
                End If

            Next
            'salva gli oggetti 
            Me.DataWorkspace.ApplicationData.SaveChanges()
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Customer Segmentation")
        End Sub
        Private Sub Statist_Customer_Visit_PreprocessQuery(Year As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Customer Visit")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot As Double
            tot = Aggregate ord In Orders
                   Where ord.Year = Year
                   Into Count(ord.Id)

            If tot > 0 Then
                Dim Lista = (From o In Orders
                             Where o.Year = Year
                             Group By month = o.Month
                             Into g = Group
                             Select New With
                                 {
                                     .month = month,
                                     .visit = g.Count(Function(i) i.Id)
                                 }
                            )
                'scrive sull'entità statistiche
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Year = Year
                    stat.Month = obj.month
                    stat.Month_Name = MonthName(obj.month)
                    stat.Statistic_Name = "Customer Visit"
                    stat.Percentual = CInt(obj.visit / tot * 100)
                    stat.Visit = obj.visit
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Customer Visit").OrderBy(Function(x) x.Month)

        End Sub
        Private Sub Statist_Customer_newClient_PreprocessQuery(Year As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Customer newClient")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot As Double
            tot = Aggregate ord In Orders
                            Where ord.Year = Year
                            Into Count(ord.Id)

            If tot > 0 Then

                Dim Lista = (From o In Orders
                             Where o.Year = Year And o.New_Customer = True
                             Group By month = o.Month
                             Into g = Group
                             Select New With
                             {
                                 .Amount = g.Sum(Function(i) i.Amount),
                                 .month = month,
                                 .new_customer = g.Count(Function(i) i.New_Customer),
                                 .avg = g.Average(Function(i) i.Amount)
                             }
                            )
                'scrive sull'entità statistiche 
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Year = Year
                    stat.Month = obj.month
                    stat.Month_Name = MonthName(obj.month)
                    stat.Average_Ticket = obj.avg
                    stat.New_Customer = obj.new_customer
                    stat.Statistic_Name = "Customer newClient"
                    stat.Percentual = CInt(obj.new_customer / tot * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Customer newClient")
        End Sub
        Private Sub Statist_Sell_By_Year_PreprocessQuery(Year As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Sell By Year")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot = Aggregate ord In Orders
                        Where ord.Year = Year
                        Into Sum(ord.Amount)
            Dim Lista = (From o In Orders
                         Where o.Year = Year
                         Group By month = o.Month Into g = Group
                         Select New With
                             {
                                 .month = month,
                                 .Amount = g.Sum(Function(i) i.Amount),
                                 .count = g.Count(Function(i) i.Id)
                             }
                        )
            'scrive sull'entità statistiche
            Dim ListaStatist = New List(Of Statist)
            For Each obj In Lista
                Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                stat.Year = Year
                stat.Month = obj.month
                stat.Month_Name = MonthName(obj.month)
                stat.Amount = obj.Amount
                stat.Statistic_Name = "Sell By Year"
                stat.Percentual = CInt(obj.Amount / tot * 100)
                stat.Visit = obj.count
            Next
            'salva gli oggetti 
            Me.DataWorkspace.ApplicationData.SaveChanges()
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Sell By Year")
        End Sub
        Private Sub Statist_Sell_By_Category_PreprocessQuery(Year As System.Nullable(Of Integer), Quarter As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'select Year, Month, Category, sum(Amount) as Amount, count(*) as frequency, avg(Amount) as average  from dbo.Order_Items
            'where Quantity >0
            'group by Year,Month, Category
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Sell By Category")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot As Double
            tot = Aggregate ord In Orders
                            Where ord.Year = Year
                            Into Sum(ord.Amount)

            If (Quarter.HasValue) Then

                tot = Aggregate ord In Orders
                       Where ord.Year = Year And CInt(Math.Round((ord.Month / 3) + 0.3, 0)) = Quarter
                        Into Sum(ord.Amount)
            End If

            If tot > 0 Then
                Dim Tmp = (From o In Order_Items Where o.Year = Year And o.Quantity > 0)
                If (Quarter.HasValue) Then
                    Tmp = Tmp.Where(Function(x) CInt((x.Month / 3) + 0.9) = Quarter)
                End If
                Dim Lista = (From o In Tmp
                             Group By category = o.Product.Product_Category.Description
                             Into g = Group
                             Select New With
                                 {
                                     .category = category,
                                     .Amount = g.Sum(Function(i) i.Amount)
                                 }
                            )
                'scrive sull'entità statistiche
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Year = Year
                    stat.Quarter = Quarter
                    stat.Category = obj.category
                    stat.Amount = obj.Amount
                    stat.Statistic_Name = "Sell By Category"
                    stat.Percentual = CInt(obj.Amount / tot * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Sell By Category").OrderByDescending(Function(x) x.Amount)
        End Sub
        Private Sub Statist_Sell_By_Service_PreprocessQuery(Year As System.Nullable(Of Integer), Quarter As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'select Year, Month, Description, sum(Amount) as Amount, sum(Quantity) as Quantity from [dbo].[Order_Items]
            'where Quantity > 0
            'Group By  Year, Month, Description 
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Sell By Service")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot As Double
            tot = Aggregate ord In Orders
                            Where ord.Year = Year
                            Into Sum(ord.Amount)

            If (Quarter.HasValue) Then
                tot = Aggregate ord In Orders
                        Where ord.Year = Year And CInt(Math.Round((ord.Month / 3) + 0.3, 0)) = Quarter
                        Into Sum(ord.Amount)
            End If

            If tot > 0 Then

                Dim Tmp = (From o In Order_Items Where o.Year = Year And o.Quantity > 0)
                If (Quarter.HasValue) Then
                    Tmp = Tmp.Where(Function(x) CInt((x.Month / 3) + 0.9) = Quarter)
                End If

                Dim Lista = (From o In Tmp
                             Group By product = o.Product.Description
                             Into g = Group
                             Select New With
                             {
                                 .description = product,
                                 .Amount = g.Sum(Function(i) i.Amount),
                                 .visit = g.Distinct.Count(Function(i) i.Order.Id)
                             }
                            )
                'scrive sull'entità statistiche 
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Year = Year
                    stat.Quarter = Quarter
                    stat.Description = obj.description
                    stat.Amount = obj.Amount
                    stat.Visit = obj.visit
                    stat.Statistic_Name = "Sell By Service"
                    stat.Percentual = CInt(obj.Amount / tot * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Sell By Service").OrderByDescending(Function(x) x.Amount)

        End Sub
        Private Sub Statist_Sell_By_Hour_PreprocessQuery(Year As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Sell By Hour")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot = Aggregate ord In Orders
                       Where ord.Year = Year
                        Into Sum(ord.Amount)

            If tot > 0 Then
                Dim Lista = (From o In Orders
                             Where o.Year = Year
                             Group By hour = o.Document_DataStart.Value.Hour
                             Into g = Group
                             Select New With
                                 {
                                     .category = hour,
                                     .Amount = g.Sum(Function(i) i.Amount),
                                     .visit = g.Count(Function(i) i.Id)
                                 }
                            )
                'scrive sull'entità statistiche
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Year = Year
                    stat.Category = obj.category
                    stat.Amount = obj.Amount
                    stat.Visit = obj.visit
                    stat.Statistic_Name = "Sell By Hour"
                    stat.Percentual = CInt(obj.Amount / tot * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Sell By Hour")
        End Sub
        Private Sub Statist_Product_On_Sell_PreprocessQuery(Year As System.Nullable(Of Integer), Quarter As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            'Svuota l 'entità statistiche se esiste una statistica fatta con lo stesso nome       
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Product On Sell")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot As Double
            tot = Aggregate ord In Orders
                            Where ord.Year = Year
                            Into Sum(ord.Amount)

            If (Quarter.HasValue) Then
                tot = Aggregate ord In Orders
                        Where ord.Year = Year And CInt(Math.Round((ord.Month / 3) + 0.3, 0)) = Quarter
                        Into Sum(ord.Amount)
            End If

            If tot > 0 Then

                Dim Tmp = (From o In Order_Items Where o.Year = Year And o.Quantity > 0 And o.Product.Tipology.Contains("Prodotto"))
                If (Quarter.HasValue) Then
                    Tmp = Tmp.Where(Function(x) CInt((x.Month / 3) + 0.9) = Quarter)
                End If

                Dim Lista = (From o In Tmp
                             Group By product = o.Product.Description
                             Into g = Group
                             Select New With
                             {
                                 .description = product,
                                 .Amount = g.Sum(Function(i) i.Amount),
                                  .visit = g.Distinct.Count(Function(i) i.Order.Id)
                             }
                            )
                'scrive sull'entità statistiche 
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Year = Year
                    stat.Quarter = Quarter
                    stat.Description = obj.description
                    stat.Amount = obj.Amount
                    stat.Visit = obj.visit
                    stat.Statistic_Name = "Product On Sell"
                    stat.Percentual = CInt(obj.Amount / tot * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Product On Sell").OrderByDescending(Function(x) x.Percentual)
        End Sub
        Private Sub Sell_By_Employee_PreprocessQuery(Year As System.Nullable(Of Integer), Month As System.Nullable(Of Integer), ByRef query As System.Linq.IQueryable(Of LightSwitchApplication.Statist))
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Sell By Employee")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot As Double
            tot = Aggregate ord In Orders
                   Where ord.Year = Year
                   Into Count(ord.Id)

            If (Month.HasValue) Then
                tot = Aggregate ord In Orders
                   Where ord.Year = Year And ord.Month = Month
                   Into Count(ord.Id)
            End If

            If tot > 0 Then
                Dim ord = From o In Orders
                          Where o.Year = Year
                If (Month.HasValue) Then
                    ord = ord.Where(Function(x) x.Month = Month)
                End If

                Dim Lista = From o In ord
                            Group By Employee = o.Employee_Name
                            Into g = Group
                            Select New With
                            {
                                .description = Employee,
                                .Amount = g.Sum(Function(i) i.Amount),
                                .avg = g.Average(Function(i) i.Amount),
                                .visit = g.Count(Function(i) i.Id),
                                .commission = g.Sum(Function(i) i.Commission)
                            }

                'GroupBy(Function(x) New With {Key x.Employee_Name}).
                'Select(Function(group) New With
                '        {
                '            Key .description = group.Key,
                '            Key .visit = group.Count(),
                '            Key .Amount = group.Sum(Function(i) i.Amount),
                '            Key .avg = group.Average(Function(i) i.Amount)
                '        }
                '    )               
                'Lista = Lista.Where(Function(c) CInt(Math.Round((c.Month / 3) + 0.3, 0)) = Quarter)
                'scrive sull'entità statistiche
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Description = obj.description
                    stat.Amount = obj.Amount
                    stat.Average_Ticket = obj.avg
                    stat.Visit = obj.visit
                    stat.Statistic_Name = "Sell By Employee"
                    stat.Year = Year
                    If Month.HasValue Then
                        stat.Month = Month
                        stat.Month_Name = MonthName(Month)
                    End If
                    stat.Commission = obj.Commission
                    stat.Percentual = CInt(obj.visit / tot * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Sell By Employee").OrderByDescending(Function(x) x.Amount)

        End Sub
        Private Sub Statist_Cut_By_Visit_PreprocessQuery(Year As Integer?, Month As Integer?, ByRef query As IQueryable(Of Statist))
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Cut_By_Visit")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next
            'fa la query sugli oggetti da statisticare
            Dim tot As Double
            tot = Aggregate ord In Orders
                   Where ord.Year = Year
                   Into Count(ord.Id)

            If (Month.HasValue) Then
                tot = Aggregate ord In Orders
                   Where ord.Year = Year And ord.Month = Month
                   Into Count(ord.Id)
            End If

            If tot > 0 Then
                Dim ord = From o In Orders
                          Where o.Year = Year
                If (Month.HasValue) Then
                    ord = ord.Where(Function(x) x.Month = Month)
                End If


                Dim Lista = (From o In Orders
                             Where o.Year = Year
                             Group By m = o.Month Into g = Group
                             Select New With
                                {
                                    .month = Month,
                                    .Amount = g.Sum(Function(i) i.Amount),
                                    .visit = g.Count(Function(i) i.Id)
                                }
                        )

                'scrive sull'entità statistiche
                For Each obj In Lista
                    Dim stat = Me.DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Description = obj.description
                    stat.Amount = obj.Amount
                    stat.Average_Ticket = obj.avg
                    stat.Visit = obj.visit
                    stat.Statistic_Name = "Cut_By_Visit"
                    stat.Year = Year
                    If Month.HasValue Then
                        stat.Month = Month
                        stat.Month_Name = MonthName(Month)
                    End If
                    stat.Commission = obj.Commission
                    stat.Percentual = CInt(obj.visit / tot * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Cut_By_Visit").OrderByDescending(Function(x) x.Amount)

        End Sub
        Private Sub Statist_Cut_By_Period_PreprocessQuery(ByRef query As IQueryable(Of Statist))
            'Tagli sui passaggi si può andare da 1/4 a 3/5
            Dim ListaDelete = (From s In Statists Where s.Statistic_Name = "Cut_by_Period")
            For Each detail As Statist In ListaDelete
                CType(detail, Statist).Delete()
            Next

            'fa la query sui passaggi effettuati fino ad oggi nel mese
            Dim tot As Double
            tot = Aggregate ord In Orders
                   Where ord.Year = Now.Year() And ord.Month = Now.Month()
                   Into Count(ord.Id)

            If tot > 0 Then
                Dim ord = From o In Orders
                          Where o.Year = Now.Year() And o.Month = Now.Month()

                Dim Lista = (From oi In Order_Items
                             Where oi.Year = Now.Year() And oi.Month = Now.Month() And oi.Description.Contains("Tagl")
                             Group By m = oi.Month Into g = Group
                             Select New With
                                {
                                    .month = Now.Month(),
                                    .Amount = g.Count(Function(i) i.Id),
                                    .visit = tot
                                }
                        )
                'scrive sull'entità statistiche
                For Each obj In Lista
                    Dim stat = DataWorkspace.ApplicationData.Statists.AddNew()
                    stat.Description = "Tagli eseguiti nel periodo"
                    stat.Amount = CDbl(obj.Amount)
                    'stat.Average_Ticket = obj.avg
                    stat.Visit = obj.visit
                    stat.Statistic_Name = "Cut_by_Period"
                    stat.Year = Now.Year()
                    stat.Month = Now.Month()
                    stat.Month_Name = MonthName(Now.Month())
                    'stat.Commission = obj.Commission
                    stat.Percentual = CInt(obj.Amount / obj.visit * 100)
                Next
                'salva gli oggetti 
                Me.DataWorkspace.ApplicationData.SaveChanges()
            End If
            'tira fuori la query finale
            query = query.Where(Function(c) c.Statistic_Name = "Cut_by_Period").OrderByDescending(Function(x) x.Amount)

        End Sub

        '*****************END query e view

        '*******************pre o post inserting
        Private Sub Accounts_Inserted(entity As Account)
            entity.Code = Right("0000000" & CStr(entity.Id), 7)
            entity.Summary_Code = entity.Account_Ledger.Summary_Code & "-" & entity.Code
        End Sub
        Private Sub Account_Lists_Inserting(entity As Account_List)
            entity.created = Today()
            entity.Year = Year(Today)
            entity.Month = Month(Today)
        End Sub

        Private Sub Appointments_Inserting(entity As Appointment)
            With entity
                '.MoveType = "Residential"   '***Essebi da modificare
                If Not .Customer Is Nothing Then
                    'If Not .Customer.Geo_City Is Nothing Then
                    '    .Geo_City = .Customer.Geo_City
                    'End If
                    If Not .Customer.PostalCode Is Nothing Then
                        .PostalCode = .Customer.PostalCode
                    End If
                    If Not .Customer.Street Is Nothing Then
                        .Street = .Customer.Street
                    End If
                    If Not .Customer.StreetLine2 Is Nothing Then
                        .StreetLine2 = .Customer.StreetLine2
                    End If
                    If Not .Customer.City Is Nothing Then
                        .City = .Customer.City
                    End If
                    .Customer_Name = .Customer.LastName + " " + .Customer.FirstName
                End If
                If Not .Employee Is Nothing Then
                    .Employee_Name = .Employee.LastName + " " + .Employee.FirstName
                End If
                If .Sector Is Nothing Then
                    Dim existing = (From s In DataWorkspace.ApplicationData.Sectors Where s.Description = "Parrucchiere").SingleOrDefault()
                    If (Not existing Is Nothing) Then
                        .Sector = existing
                    End If
                End If
                If .WorkSpace Is Nothing Then
                    Dim existing = (From s In DataWorkspace.ApplicationData.WorkSpaces Where s.Description = "Salon").SingleOrDefault()
                    If (Not existing Is Nothing) Then
                        .WorkSpace = existing
                    End If
                End If
            End With

        End Sub

        Private Sub Companies_Inserting(entity As Company)
            If Me.Companies.Count = 0 Then
                entity.created = Today()
                entity.License_Expire = Today.AddMonths(12)
            End If

        End Sub

        Private Sub Customers_Inserting(entity As Customer)
            If entity.Discount Is Nothing Then
                entity.Discount = 0
            End If
            If entity.Summary Is Nothing Then
                entity.Summary = entity.LastName + " " + entity.FirstName
            End If
            entity.created = Today()
            entity.Payment_Type = "Contanti"
            entity.Deferrals = 0
            entity.Payment_Number = 1

            Dim barcode = "32119"
            Dim temp = ""
            If (entity.BarCode Is Nothing) Then
                Dim ValueType = "BarCode Customer"
                '***************************************************************getCounter
                temp = getCounter(ValueType)
                temp = temp.Split("/").Last
                entity.BarCode = barcode + temp
            End If

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
        Private Sub Customers_Updating(entity As Customer)
            Dim barcode = "32119"
            Dim temp = ""
            If (entity.BarCode Is Nothing) Then
                Dim ValueType = "BarCode Customer"
                '***************************************************************getCounter
                temp = getCounter(ValueType)
                temp = temp.Split("/").Last
                entity.BarCode = barcode + temp
            End If
        End Sub
        '***************************se inserisco o modifico importi prepagata aggiorno i saldi sulla scheda padre
        Private Sub Customer_Subscription_Item_Inserted(entity As Customer_Subscription_Item)
            Dim subscription = entity.Customer_Subscription
            Dim credit As Double
            Dim debit As Double
            For Each history In subscription.Customer_Subscription_Item
                If Not history.Credit Is Nothing Then
                    credit += history.Credit
                End If
                If Not history.Debit Is Nothing Then
                    debit += history.Debit
                End If
            Next
            subscription.Credit = credit
            subscription.Debit = debit
            subscription.Balance = credit - debit
        End Sub
        Private Sub Customer_Subscription_Item_Updated(entity As Customer_Subscription_Item)
            Dim subscription = entity.Customer_Subscription
            Dim credit As Double
            Dim debit As Double
            For Each history In subscription.Customer_Subscription_Item
                If Not history.Credit Is Nothing Then
                    credit += history.Credit
                End If
                If Not history.Debit Is Nothing Then
                    debit += history.Debit
                End If
            Next
            subscription.Credit = credit
            subscription.Debit = debit
            subscription.Balance = credit - debit
        End Sub

        Private Sub Employees_Inserting(entity As Employee)
            entity.created = Today()
            Dim barcode = "51114"
            Dim temp = ""
            If (entity.BarCode Is Nothing) Then
                Dim ValueType = "BarCode Collaboratore"
                '***************************************************************getCounter
                temp = getCounter(ValueType)
                temp = temp.Split("/").Last
                entity.BarCode = barcode + temp
            End If

            Dim existingUser = (From u In DataWorkspace.SecurityData.UserRegistrations Where u.UserName = entity.UserName).SingleOrDefault()
            If (existingUser Is Nothing) Then
                Dim newUser = DataWorkspace.SecurityData.UserRegistrations.AddNew()
                newUser.UserName = entity.UserName.Trim()
                newUser.Password = entity.Password.Trim()
                newUser.FullName = entity.FirstName.Trim() + " " + entity.LastName.Trim()
            End If
        End Sub
        Private Sub Employees_Deleting(entity As Employee)
            Dim existingUser = (From u In DataWorkspace.SecurityData.UserRegistrations Where u.UserName = entity.UserName).SingleOrDefault()
            If (Not existingUser Is Nothing) Then
                existingUser.Delete()
            End If
        End Sub
        Private Sub Employees_Updating(entity As Employee)
            Dim barcode = "51114"
            Dim temp = ""
            If (entity.BarCode Is Nothing) Then
                Dim ValueType = "BarCode Collaboratore"
                '***************************************************************getCounter
                temp = getCounter(ValueType)
                temp = temp.Split("/").Last
                entity.BarCode = barcode + temp
            End If
            Dim existingUser = (From u In DataWorkspace.SecurityData.UserRegistrations Where u.UserName = entity.UserName).SingleOrDefault()
            If (Not existingUser Is Nothing) Then
                existingUser.UserName = entity.UserName.Trim()
                existingUser.Password = entity.Password.Trim()
                existingUser.FullName = entity.FirstName.Trim() + " " + entity.LastName.Trim()
            End If
        End Sub

        Private Sub Fidelity_Cards_Inserting(entity As Fidelity_Card)
            entity.created = Today()
        End Sub
        Private Sub Photos_Inserting(entity As Photo)
            entity.created = Today()
            If (entity.Order IsNot Nothing) Then
                If (entity.Order.Customer IsNot Nothing) Then
                    entity.Customer = entity.Order.Customer.Summary
                End If
                If (entity.Order.Employee IsNot Nothing) Then
                    entity.Employee = entity.Order.Employee.Summary
                End If
            End If
        End Sub

        '****************SCARICO MAGAZZINO******************************
        Private Sub Orders_Inserting(entity As Order)
            entity.Customer_Name = entity.Customer.LastName + " " + entity.Customer.FirstName
            entity.Employee_Name = entity.Employee.LastName + " " + entity.Employee.FirstName
            entity.Document_DataEnd = Now()
            If entity.Customer.Average_Expense = 0 Then
                entity.New_Customer = True
            End If
            entity.Elapsed = DateDiff(DateInterval.Minute, entity.Document_DataStart.Value, entity.Document_DataEnd.Value)
            'SMTPMailHelper.SendMail("genivsloci@outlook.com", "bottaro.stefano@gmail.com", "Start", "Fase 1")
            If entity.AvailablePoints Is Nothing Then
                entity.AvailablePoints = 0
            End If
            If entity.AvailablePrepaid Is Nothing Then
                entity.AvailablePrepaid = 0
            End If
            'se l'appuntamento non esiste
            If entity.Appointment Is Nothing Then
                Dim appointment = New Appointment
                appointment.Employee = entity.Employee
                appointment.Employee_Name = entity.Employee.LastName + " " + entity.Employee.FirstName
                appointment.Customer = entity.Customer
                appointment.Customer_Name = entity.Customer.LastName + " " + entity.Customer.FirstName
                appointment.Subject = entity.Customer_Name
                appointment.WorkSpace = entity.WorkSpace
                appointment.Sector = entity.Sector
                appointment.Order = entity
            End If
            entity.Appointment.StartDate = entity.Document_DataStart
            entity.Appointment.EndDate = Now
            entity.Appointment.Executed = True
            'Dim differenza = Now.Subtract(entity.Document_DataStart).Minutes
            'entity.Elapsed = differenza
            'verifico se esiste il numero ricevuta
            If entity.Document_Number Is Nothing Then
                Dim ValueType = "Ricevuta Fiscale"
                '***************************************************************getCounter
                entity.Document_Number = getCounter(ValueType)
            End If
            '*******************************************************************verifico il pagamento
            '*******************************************************************se il pagamento è parziale inserisco le scadenze
            '*******************************************************************aggiorna Scadenzario 
            '*******************************************************************aggiorna Cliente Punti, avg spesa media, spesa annua, controllo su cambio anno spesa anno passato
            aggCustomer(entity)
            '*******************************************************************aggiorna Collaboratore, commissione, nuovo cliente, fatturato
            aggEmployee(entity)
            '*******************************************************************aggiorna Magazzino
            aggProduct(entity)
            '*******************************************************************aggiorna Contabilità
            aggContabil(entity)

        End Sub
        Private Sub Order_Items_Inserting(entity As Order_Item)
            With entity
                .created = Today()
                .Year = Year(.created)
                .Month = Month(.created)
                If .Price_List Is Nothing Then
                    .Price_List = 0
                End If
                If Not .Order Is Nothing Then
                    .Customer_Name = String.Format("{0} {1}", .Order.Customer.LastName, .Order.Customer.FirstName)
                    .Discount = .Order.Customer.Discount
                    .Employee_Name = String.Format("{0} {1}", .Order.Employee.LastName, .Order.Employee.FirstName)
                End If

            End With
        End Sub
        Public Sub aggScheduleCustomer(doc As Order, sch As Schedule, balance As String, rate As Integer)
            'per ogni rata inserisce un nuovo record con cliente,importo debito,data scadenza,numero di rata, data del documento,Banca appoggio se <> da DDT
            sch.Order = doc
            sch.Summary = doc.Customer.LastName + " " + doc.Customer.FirstName
            'sch.Bank = doc.Company_Bank.Description
            sch.created = Now
            sch.Debit = Math.Round(CDec(doc.Total / doc.Payment_Number), 2)
            sch.Document_Date = doc.Document_Date
            sch.Document_Number = doc.Document_Number
            sch.Rate_Number = CStr(rate) & "/" & CStr(doc.Payment_Number)
            sch.Type = balance
            sch.Name = doc.Customer.LastName + " " + doc.Customer.FirstName
            sch.Expiration_Date = LastMounthDay(doc.Document_Date, doc.Deferrals - (30 * rate))
            sch.Total_Document = doc.Total

        End Sub
        Public Shared Sub aggCustomer(treatment As Order)
            ' [Attendere prego fase aggiornamento scheda Cliente operation= trattamento, Pagamento]
            Dim customer = treatment.Customer
            If customer.Point Is Nothing Then
                customer.Point = treatment.Points
            Else
                customer.Point = customer.Point - treatment.Payment_Point + treatment.Points
            End If
            If customer.Visit_Number Is Nothing Then
                customer.Visit_Number = 0
            End If
            customer.Visit_Number = customer.Visit_Number + 1
            If customer.created.Year < 1901 Then
                If customer.Order.Count > 0 Then
                    customer.created = customer.Order(0).Document_Date
                End If
            End If
            'frequenza mensile = (oggi - data creazione)/ customer.Visit_Number 
            Dim df = DateDiff(DateInterval.Month, customer.created, Now())
            Dim f = 1
            If df > 0 Then ' se non è la prima visita
                f = customer.Visit_Number / df
            End If
            customer.Frequency = Math.Round(CDec(f), 1)
            If Not customer.Expense Is Nothing Then
                customer.Expense = customer.Expense + treatment.Total
                If customer.Last_Visit.Value.Year < Now.Year Then  'se cambia l'anno di visita
                    customer.Expense_Last_Year = treatment.Total
                Else
                    customer.Expense_Last_Year = customer.Expense_Last_Year + treatment.Total
                End If
            Else
                customer.Expense = treatment.Total
                customer.Expense_Last_Year = treatment.Total
            End If
            customer.Average_Expense = Math.Round(CDec(customer.Expense / customer.Visit_Number), 2)
            customer.Last_Visit = Now
        End Sub
        Public Shared Sub aggEmployee(treatment As Order)
            ' [Attendere prego fase aggiornamento scheda Collaboratore operation= trattamento, Pagamento]
            Dim employee = treatment.Employee
            If Not employee.Total_Sales Is Nothing Then
                If employee.Order.Last.Document_Date.Year < treatment.Document_Date.Year Then
                    employee.Total_Sales_Last_Year = employee.Total_Sales
                    employee.Total_Sales = 0
                End If
                'La vendita accreditata è quella senza iVA
                employee.Total_Sales += treatment.Amount
            Else
                'La vendita accreditata è quella senza iVA
                employee.Total_Sales = treatment.Amount
            End If
        End Sub
        Public Shared Sub aggProduct(order As Order)
            ' MESSAGGIO= [Vuoi l'aggiornamento automatico dei prezzi di vendita ]
            For Each history In order.Order_Item
                Dim inventory = history.Product
                'Stock , Volume_Sold , Volume_Sold_Last_Year, Stock_Value ,Turnover_Index, To_order
                If history.Quantity > 0 Then
                    If Not inventory.Stock Is Nothing Then
                        inventory.Stock = inventory.Stock - history.Quantity
                        inventory.Stock_Value = inventory.Cost * inventory.Stock
                    End If
                    If Not inventory.Volume_Sold Is Nothing Then
                        'se l'anno è diverso dall'ultima vendita*****************attenzione se il cliente non passa in negozio....             
                        If inventory.Product_Histories.Count > 0 Then
                            If Year(inventory.Product_Histories.Last.Data_Document) < order.Document_Date.Year Then
                                inventory.Volume_Sold_Last_Year = inventory.Volume_Sold
                                inventory.Volume_Sold = 0
                            End If
                        End If
                        inventory.Volume_Sold = inventory.Volume_Sold + history.Quantity
                        inventory.Turnover_Index = inventory.Volume_Sold / inventory.Stock
                    Else
                        inventory.Volume_Sold = history.Quantity
                        If Not inventory.Stock Is Nothing And inventory.Stock > 0 Then
                            inventory.Turnover_Index = inventory.Volume_Sold / inventory.Stock
                        End If
                    End If
                    If inventory.Tipology.Contains("Prod") And inventory.Minimum_stock > 0 And inventory.Turnover_Index > 1 Then
                        inventory.To_order = Int((inventory.Minimum_stock * inventory.Turnover_Index) - inventory.Stock + 0.99)
                    End If
                End If
            Next (history)
        End Sub
        Public Sub aggContabil(entity As Order)
            'ricerca valore protocollo contabile
            Dim ValueType = "Protocollo contabile"
            '***************************************************************getCounter
            Dim accountProtocol = getCounter(ValueType)
            Dim AccountList As Account_List
            Dim account As Account
            Dim Operazione = "Vendita servizi " & entity.Customer.LastName + " " + entity.Customer.FirstName & " ricevuta fiscale " & entity.Document_Number
            '****************************************************************************Dare  Cliente
            account = findAccount(entity.Customer.LastName + " " + entity.Customer.FirstName, "0104")
            AccountList = New Account_List
            aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Total, accountProtocol)
            '****************************************************************************Avere Vendita Servizi
            'cerca "Merce c/Vendite)
            account = findAccount("Vendita Servizi", "0414")
            AccountList = New Account_List
            'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
            aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Amount, accountProtocol)
            '****************************************************************************Avere Iva C/Erario
            'cerca "Iva C/Erario")
            account = findAccount("Iva C/Erario", "0101")
            Operazione = "Iva C/Erario " & entity.Customer.LastName + " " + entity.Customer.FirstName & " ricevuta fiscale " & entity.Document_Number
            AccountList = New Account_List
            aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Vat, accountProtocol)
            If entity.Deferrals = 0 Then
                '****************************************************************************Avere  Cliente (pagamento)
                account = findAccount(entity.Customer.LastName + " " + entity.Customer.FirstName, "0104")
                AccountList = New Account_List
                Operazione = "Incasso cliente " & entity.Customer.LastName + " " + entity.Customer.FirstName & " ricevuta fiscale " & entity.Document_Number
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Total, accountProtocol)
                '****************************************************************************Dare incasso Cassa
                'cerca "Cassa e banche)
                account = findAccount("Cassa", "0101")
                AccountList = New Account_List
                Operazione = "Incasso cliente " & entity.Customer.LastName + " " + entity.Customer.FirstName & " ricevuta fiscale " & entity.Document_Number
                'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Total, accountProtocol)
            Else
                'aggiorna Scadenzario
                If entity.Payment_Number > 1 And entity.Deferrals > 0 Then
                    For i = 1 To entity.Payment_Number
                        'ShowMessageBox("Funzione non disponibile ....Aggiorna Scadenzario rata= " & CStr(i) & " - data Scadenza=" & Utility.LastMounthDay(Me.Service_Document.Document_Date, Me.Service_Document.Deferrals - (i * 30)))
                        aggScheduleCustomer(entity, Me.Schedules.AddNew(), "Credito", i)
                    Next
                End If
            End If
            'Aggiornamento statistiche
        End Sub
        '**************************************************************
        '**************** CARICO MAGAZZINO******************************
        Private Sub Product_Documents_Inserting(entity As Product_Document)
            'se non è stata selezionata la banca di appoggio dei pagamenti automaticamente viene selezionata la prima
            If entity.Company_Bank Is Nothing Then
                Dim tmp = From c In Company_Banks
                entity.Company_Bank = tmp.First
            End If
            For Each history In entity.Order_Items '********aggiorna Magazzino per ogni prodotto acquistato
                aggInventory(history, history.Product)
            Next
            If entity.Type > 1 Then  ' ***************************se Fattura aggiorna Contabilità e Scadenzario
                aggContabil(entity)
            End If
        End Sub

        Public Shared Sub aggInventory(history As Order_Item, inventory As Product)
            ' MESSAGGIO= [Vuoi l'aggiornamento automatico dei prezzi di vendita ] 
            'inventory.Cost = history.Price_List * (1 - history.Discount) * (1 + history.Shipping_Cost)
            inventory.Cost = history.Cost
            inventory.Cost = Math.Round(CDec(inventory.Cost), 2)
            If history.Quantity_Purchased > 0 Then    'Se Carico Magazzino
                inventory.Stock = inventory.Stock + history.Quantity_Purchased
                inventory.Volume_Purchased = inventory.Volume_Purchased + history.Amount
            Else                                        'Se Scarico Magazzino
                inventory.Stock = inventory.Stock - history.Quantity
                inventory.Volume_Sold = inventory.Volume_Sold + history.Amount
            End If
            inventory.Cost = history.Cost
            inventory.Mark_Up = Math.Round(CDec(history.Cost / inventory.Price), 2)
            inventory.Shipping_Cost = history.Shipping_Perc
            If inventory.Stock > 0 And inventory.Cost > 0 Then
                inventory.Stock_Value = inventory.Cost * inventory.Stock
            End If
            If inventory.Volume_Sold > 0 And inventory.Stock > 0 Then
                Dim turnover As Decimal
                turnover = inventory.Volume_Sold / inventory.Stock
                If turnover > 0 Then
                    inventory.Turnover_Index = turnover
                Else
                    inventory.Turnover_Index = 0
                End If
            Else
                inventory.Turnover_Index = 0
            End If
            If inventory.Minimum_stock > 0 And inventory.Turnover_Index > 0 Then
                Dim toOrder As Decimal
                toOrder = Int((inventory.Minimum_stock * inventory.Turnover_Index) - inventory.Stock)
                If toOrder > 0 Then
                    inventory.To_order = toOrder
                Else
                    inventory.To_order = 0
                End If
            End If
        End Sub

        Public Sub aggContabil(entity As Product_Document)
            'ricerca valore protocollo contabile
            Dim ValueType = "Protocollo contabile"
            '***************************************************************getCounter
            Dim accountProtocol = getCounter(ValueType)
            Dim AccountList As Account_List
            Dim account As Account
            Dim Operazione = "Acquisto merce " & entity.Supplier.Name & " Fattura " & entity.Document_Number
            '0104 = Clienti 
            '0207 = Fornitori            
            '0208 = Debiti Diversi          
            '0311 = Acquisti           
            '0414 = Vendite
            '****************************************************************************Dare  Acquisti
            'cerca "Merce c/Acquisti)
            account = findAccount("Merce c/Acquisti", "0311")
            AccountList = New Account_List
            'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
            aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Taxable_Amount, accountProtocol)
            '****************************************************************************Dare Iva C/Erario
            'cerca "Iva C/Erario")
            account = findAccount("Iva C/Erario", "0208")
            AccountList = New Account_List
            aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Vat, accountProtocol)
            '****************************************************************************Avere Vendita Servizi
            account = findAccount(entity.Supplier.Name, "0207")
            AccountList = New Account_List
            aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Total, accountProtocol)
            If entity.Deferrals = 0 Then
                '****************************************************************************Dare  Fornitore  (pagamento)
                AccountList = New Account_List
                Operazione = "Pagamento fornitore " & entity.Supplier.Name & " Fattura " & entity.Document_Number
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Total, accountProtocol)
                '****************************************************************************Avere Uscita Cassa
                'cerca "Cassa e banche)
                account = findAccount("Cassa", "0101")
                AccountList = New Account_List
                'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Total, accountProtocol)
            Else
                If entity.Payment > 0 Then
                    AccountList = New Account_List
                    Operazione = "Acconto fornitore " & entity.Supplier.Name & " Fattura " & entity.Document_Number
                    aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Total, accountProtocol)
                    '****************************************************************************Avere Uscita Cassa
                    'cerca "Cassa e banche)
                    account = findAccount("Cassa", "0101")
                    AccountList = New Account_List
                    'dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal
                    aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Payment, accountProtocol)
                End If
                'aggiorna Scadenzario
                If entity.Deferrals > 0 Then
                    For i = 1 To entity.Payment_Number
                        'ShowMessageBox("Funzione non disponibile ....Aggiorna Scadenzario rata= " & CStr(i) & " - data Scadenza=" & Utility.LastMounthDay(Me.Service_Document.Document_Date, Me.Service_Document.Deferrals - (i * 30)))
                        aggScheduleSupplier(entity, "Debit", i)
                    Next
                End If
            End If
            'Aggiornamento statistiche
        End Sub
        Public Sub aggScheduleSupplier(doc As Product_Document, balance As String, rate As Integer)
            'per ogni rata inserisce un nuovo record con fornitore,importo debito,data scadenza,numero di rata, data del documento,Banca appoggio se <> da DDT
            Dim sch As Schedule
            sch = New Schedule
            'sch = DataWorkspace.ApplicationData.Schedules.AddNew()
            sch.Product_Document = doc
            sch.Summary = doc.Supplier.Name
            sch.Type = balance   'balance = "Debit"  / "Credit"
            sch.Name = doc.Supplier.Name
            sch.Expiration_Date = LastMounthDay(doc.Document_Date, doc.Deferrals - (30 * rate))
            sch.Total_Document = doc.Total
            sch.created = Now
            If Not doc.Company_Bank Is Nothing Then
                sch.Bank = doc.Company_Bank.Description
            End If
            sch.Debit = Math.Round(CDec((doc.Total - doc.Payment) / doc.Payment_Number), 2)
            sch.Document_Date = doc.Document_Date
            sch.Document_Number = doc.Document_Number
            sch.Rate_Number = CStr(rate) & "/" & CStr(doc.Payment_Number)

        End Sub
        '**************************************************************
        Private Sub Products_Updating(entity As Product)
            'Aggiornamento indice di rotazione delle scorte di magazzino e delle quantità da riordinare
            If entity.Volume_Sold > 0 And entity.Stock > 0 Then
                entity.Turnover_Index = entity.Volume_Sold / entity.Stock
            End If
        End Sub
        Private Sub Product_Histories_Inserting(entity As Product_History)
            entity.created = Today()
            'entity.Data_Document = entity.Product_Document.Document_Date
            If entity.Quantity_Enter > 0 Then
                entity.Total = entity.Cost * entity.Quantity_Enter   'se sono presenti i valori di carico
            Else
                entity.Total = entity.Cost * entity.Quantity_Output  'se sono presenti i valori di scarico
            End If
            'aggInventory(entity, entity.Product)
        End Sub
        Private Sub Product_Services_Inserting(entity As Product_Service)
            entity.created = Now
            If entity.Price = Nothing Then
                entity.Price = 0
                entity.Amount = 0
                entity.Point = 0
            End If
            If entity.Vat.Value = Nothing Then
                entity.Vat = 0
            End If
            If entity.Product_Tax.Value = Nothing Then
                entity.Product_Tax = Product_Taxes.First
            End If
            If entity.Commission_employee.Value = Nothing Then
                entity.Commission_employee = 0
            End If
        End Sub

        Private Sub Schedules_Inserting(entity As Schedule)
            entity.created = Today()
            entity.Summary = entity.Name & " documento n. " & entity.Document_Number & " " & entity.Document_Date & " rata " & entity.Rate_Number
        End Sub
        Private Sub Schedules_Updated(entity As Schedule)
            'aggiorna contabilita
            'ricerca valore protocollo contabile
            Dim ValueType = "Protocollo contabile"
            '***************************************************************getCounter
            Dim accountProtocol = getCounter(ValueType)
            Dim AccountList As Account_List
            Dim account As Account
            Dim Operazione As String
            If entity.Type = "Credito" Then
                Operazione = "Incasso cliente " + entity.Name + " Doc. " + entity.Document_Number + " del " + entity.Document_Date
                '***************************DARE
                account = findAccount(entity.Name, "0104")
                AccountList = New Account_List
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Settlement, accountProtocol)
                '***************************AVERE
                account = findAccount("Cassa", "0101")
                AccountList = New Account_List
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Settlement, accountProtocol)
            Else
                Operazione = "Pagamento fornitore " + entity.Name + " Doc. " + entity.Document_Number + " del " + entity.Document_Date
                '***************************DARE
                account = findAccount(entity.Name, "0104")
                AccountList = New Account_List
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Credit", entity.Settlement, accountProtocol)
                '***************************AVERE
                account = findAccount("Cassa", "0101")
                AccountList = New Account_List
                aggAccountList(entity.Document_Date, account, AccountList, Operazione, "Debit", entity.Settlement, accountProtocol)

            End If

        End Sub
        Private Sub Statists_Inserting(entity As Statist)
            If Not entity.Month Is Nothing Then
                entity.Month_Name = MonthName(entity.Month)
                entity.Quarter = CInt((entity.Month / 3) + 0.5)
                entity.created = Now
            End If
        End Sub
        Private Sub Suppliers_Inserting(entity As Supplier)
            entity.created = Today()
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

        Public Function findAccount(name As String, ldg As String) As Account
            'Stato Patrimoniale Attività 01
            '"Cassa,01-01;Banche c/c,01-02;Effetti,01-03;Titoli,01-04;Clienti Italia,01-07;Clienti Estero,01-08;Crediti Diversi,01-09;Rimanenze,01-10;
            'Stato Patrimoniale Passivita 02
            'Fornitori Italia,02-11;Fornitori Estero,02-12;Debiti Diversi,02-13;Capitale Netto,02-14;
            'Conto Economico Costi 03
            'Rimanenze Iniziali Magazzino,03-14;Risconti,03-14;Acquisti,03-15;Spese Generali,03-16;Risultato d'esercizio,03-17;
            'Conto Economico Ricavi 04
            'Vendite Prodotti,04-18;Ricavi Accessori di Vendita,04-18;Plusvalenze e Sopravvenienze,04-19;Rimanenze Finali Magazzino,04-20;Beni di Terzi (Attivo),05-21;Beni di Terzi (Passivo),05-21;Conti Riepilogativi,06-22;Conti Riepilogativi,06-22;"
            'Class*********************************
            'Cassa 0101 - 12
            'Banche 0102 - 13
            'Clienti 0104 - 14
            'Fornitori 0207 - 15
            'Acquisti 0311 - 16
            'Spese Generali	0312-17
            'Debiti Diversi	0208-18
            'Vendita 0414 - 19
            Dim existing As Account
            Dim tmp = (From s In Accounts Where s.Description = name)
            If Trim(ldg) <> "" Then
                tmp = tmp.Where(Function(x) x.Account_Ledger.Account_class = ldg)
                'existing = (From s In DataWorkspace.ApplicationData.Accounts Where s.Description = name And s.Account_Ledger.Account_class = ldg).First
            End If
            If tmp.Count > 0 Then
                existing = tmp.First
            Else
                existing = New Account
                existing.Description = name
                Dim ledger = (From l In DataWorkspace.ApplicationData.Account_Ledgers Where l.Account_class = ldg).SingleOrDefault()
                existing.Account_Ledger = ledger
            End If
            Return existing
        End Function
        Public Shared Sub aggAccountList(dataDoc As Date, account As Account, FirstNote As Account_List, operation As String, type As String, total As Decimal, Protocol As String)
            ' [Attendere prego fase registrazione schede in Contabilita se <> da Bolla di accompagnamento]
            FirstNote.Description = operation
            FirstNote.Operation_Date = dataDoc
            FirstNote.Account = account
            FirstNote.Operation_number = Protocol
            If type.Contains("Credit") Then
                FirstNote.Credit = total
            Else
                FirstNote.Debit = total
            End If
            aggAccount(account, type, total)
        End Sub
        Public Shared Sub aggAccount(acc As Account, type As String, money As Decimal)
            ' [Attendere Prego Fase aggiornamento Saldi Piano dei Conti se <> da Bolla di accompagnamento]
            If type.Contains("Credit") Then
                acc.Credit = acc.Credit + money
            Else
                acc.Debit = acc.Debit + money
            End If
        End Sub

        Private Sub TodoLists_Inserting(entity As TodoList)
            entity.created = Today()
        End Sub

        Private Sub SaveChanges_ExecuteFailed(exception As Exception)
            exception.StackTrace.ToString()
        End Sub
        '********************************FUNCTION
        Public Function getbarCode(ByVal ValueType As String) As String
            Dim anno = Now.Year
            Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = ValueType).SingleOrDefault()
            If (existing Is Nothing) Then
                existing = DataWorkspace.ApplicationData.Counters.AddNew()
                existing.Counter_Type = ValueType
                existing.Counter_year = anno
                existing.Valore = 0
            End If
            If anno > existing.Counter_year Then 'if the year parameter is > the stored year  value is 0
                existing.Valore = 0
            End If
            existing.Valore = existing.Valore + 1
            Return Right("000000000000" & existing.Valore, 13)
        End Function
        Public Function getCounter(ByVal ValueType As String) As String
            Dim anno = Now.Year
            Dim existing = (From s In DataWorkspace.ApplicationData.Counters Where s.Counter_Type = ValueType).SingleOrDefault()
            If (existing Is Nothing) Then
                existing = DataWorkspace.ApplicationData.Counters.AddNew()
                existing.Counter_Type = ValueType
                existing.Counter_year = anno
                existing.Valore = 0
            End If
            If anno > existing.Counter_year Then 'if the year parameter is > the stored year  value is 0
                existing.Valore = 0
                existing.Counter_year = anno
            End If
            existing.Valore = (existing.Valore * 1) + 1
            Return Now.Year & "/" & Right("000000" & existing.Valore, 6)
        End Function
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
        Public Shared Function LastMounthDay(dataStart As Date, dayNumber As Integer) As Date
            'restituisce l'ultimo giorno del mese anche se l'anno è bisestile
            Dim L1 = dataStart.AddDays(dayNumber)
            Dim L2 = L1.AddMonths(2)
            Dim L3 = CDate(CStr("01" & "/" & L2.Month & "/" & L2.Year))
            Dim LastDay = L3.AddDays(-1)
            Return LastDay
        End Function
        Public Sub InsertRegions(country As Geo_Country, name As String)
            Dim i = 0
            Dim regione As Geo_Region
            For Each t In name.Split(";")
                regione = DataWorkspace.ApplicationData.Geo_Regions.AddNew()
                regione.Geo_Countries = country
                regione.Description = t(i)
                i = i + 1
            Next
        End Sub
        Public Sub InsertOperation(name As String)
            Dim i = 0
            Dim operazione As Account_Operation
            For Each t In name.Split(";")
                operazione = DataWorkspace.ApplicationData.Account_Operations.AddNew()
                operazione.Description = t(i)
                i = i + 1
            Next
        End Sub

    End Class

End Namespace
