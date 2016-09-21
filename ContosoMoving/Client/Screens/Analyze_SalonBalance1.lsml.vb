
Namespace LightSwitchApplication

    Public Class Analyze_SalonBalance1

        Private Sub Analyze_SalonBalance1_Closing(ByRef cancel As Boolean)
            ' Scrivere qui il codice.
            Me.Close(False)
        End Sub

        Private Sub Analyze_SalonBalance1_Activated()
            ' Scrivere qui il codice.
            Me.DataStart = Now
            Me.DataStart = Me.DataStart.AddMonths(-1)
        End Sub


        Private Sub Esegui_Execute()
            ' Scrivere qui il codice.
            'Dim existing As System.Linq.IQueryable(Of LightSwitchApplication.Service_Document)
            Dim existing = (From service In Service_Document Where service.Document_Date >= Me.DataStart And service.Document_Date <= Me.DataEnd)
            Dim visit = 0
            Dim newCustomer = 0
            Dim sales As Decimal
            Dim commission As Decimal
            Dim age As String
            Dim elapsed As Decimal
            'Dim type_services(10, 3) As String
            Dim type_customer(5, 2) As String
            Dim incentive As Decimal
            Dim element As Integer

            For Each obj In existing
                'newCustomer check 
                If obj.New_Customer = True Then
                    newCustomer = newCustomer + 1
                End If
                'sales incremento il totale delle vendite
                sales = sales + obj.Amount
                'type_customer
                If obj.Age IsNot Nothing Then
                    Select Case obj.Age
                        Case Is < 20
                            age = "minore di 20"
                            element = 0
                            Exit Select
                        Case Is < 35
                            age = "minore di 35"
                            element = 1
                            Exit Select
                        Case Is < 50
                            age = "minore di 50"
                            element = 2
                            Exit Select
                        Case Is < 61
                            age = "minore di 61"
                            element = 3
                            Exit Select
                        Case Is > 60
                            age = "Maggiore di 60"
                            element = 4
                            Exit Select
                        Case Else
                            age = "non classificato"
                            element = 5
                    End Select
                    type_customer(element, 0) = age.ToArray
                    type_customer(element, 1) = CInt(type_customer(element, 1)) + 1
                    type_customer(element, 2) = CDec(type_customer(element, 2)) + obj.Amount
                End If
                'commission incremento il totale delle commissioni valorizzate
                If obj.Commission IsNot Nothing Then
                    commission = commission + obj.Commission
                End If
                If obj.Elapsed IsNot Nothing Then
                    elapsed = elapsed + obj.Elapsed
                End If
                'incentive  valorizzo incentivo in base ai parametri di configurazione              
                incentive = 0
                'visit incrementa di uno
                visit = visit + 1
            Next (obj)
            'type_services tipologia servizio venduto per ogni servizio presenti in history   
            Dim serviceType = (From service In Service_Histories Where service.created >= Me.DataStart And service.created <= Me.DataEnd
                                Order By service.Category
                                Group By service.Category Into Group, Count(), Sum(service.Amount)
                                Order By Sum Descending
                              )
            Me.Type_Services = Nothing
            Me.Type_ServiceNr = Nothing
            Me.Type_ServiceValue = Nothing
            For Each obj In serviceType
                Me.Type_Services = Me.Type_Services & obj.Category & vbCrLf
                Me.Type_ServiceNr = Me.Type_ServiceNr & obj.Count & vbCrLf
                Me.Type_ServiceValue = Me.Type_ServiceValue & obj.Sum & vbCrLf
            Next

            Me.Type_Customer = Nothing
            Me.Type_CustomerNr = Nothing
            Me.Type_CustomerValue = Nothing
            For i = 0 To 5
                If type_customer(i, 0) IsNot Nothing Then
                    Me.Type_Customer = Me.Type_Customer & type_customer(i, 0) & vbCrLf
                    Me.Type_CustomerNr = Me.Type_CustomerNr & type_customer(i, 1) & vbCrLf
                    Me.Type_CustomerValue = Me.Type_CustomerValue & type_customer(i, 2) & vbCrLf
                End If
            Next

            Dim serviceEmployee = (From document In Service_Document Where document.Document_Date >= Me.DataStart And document.Document_Date <= Me.DataEnd
                              Order By document.Employee.UserName
                              Group By document.Employee.UserName Into Group, Count(), Sum(document.Amount)
                              Order By Sum Descending
                            )

            Me.Employee = Nothing
            Me.EmployeeNr = Nothing
            Me.EmployeeValue = Nothing
            For Each obj In serviceEmployee
                If obj.UserName IsNot Nothing Then
                    Me.Employee = Me.Employee & obj.UserName & vbCrLf
                    Me.EmployeeNr = Me.EmployeeNr & obj.Count & vbCrLf
                    Me.EmployeeValue = Me.EmployeeValue & obj.Sum & vbCrLf

                End If
            Next
            'avg_receipt media scontrino (Imponibile)
            Me.Avg_receipt = sales / visit
            'elapsed / visit = media tempo lavorazione per singolo cliente
            Me.Avg_TreatmentTime = CInt(elapsed \ visit)
            Me.Visite = visit
            Me.New_Customer = newCustomer
            Me.Sales = sales
            Me.Commission = commission
            Me.Incentive = incentive
        End Sub
    End Class

End Namespace
