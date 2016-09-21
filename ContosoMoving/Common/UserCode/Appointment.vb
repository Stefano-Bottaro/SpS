
Namespace LightSwitchApplication

    Public Class Appointment

        Private Sub Appointment_Created()
            '******************************************EsseBi  Available employee  
            Dim Token = Application.User.FullName.Split(" ")
            Dim tok1 = Token(0).Trim()
            Dim tok2 = Token(1).Trim()
            Dim existing = (From s In DataWorkspace.ApplicationData.Employees Where s.LastName = tok2 And s.FirstName = tok1).SingleOrDefault()
            If (Not existing Is Nothing) Then
                Me.Employee = existing
            End If
            EndDate = StartDate
            EndDate = EndDate.AddHours(1)
        End Sub

        Private Sub StartDate_Changed()
            EndDate = StartDate
            EndDate = EndDate.AddHours(1)
        End Sub

        Private Sub Customer_Changed()
            If (Customer IsNot Nothing) Then
                If (Street <> Customer.Street) Then
                    With Customer
                        Street = .Street
                        StreetLine2 = .StreetLine2
                        City = .City
                        Geo_City = .Geo_City
                        PostalCode = .PostalCode
                        Customer_Name = String.Format("{0} {1}", .LastName, .FirstName)

                    End With
                End If
            End If
        End Sub

        Private Sub MoveType_Changed()
            If (Me.Rooms.Count < 1) Then
                Select Case MoveType
                    Case MoveTypeValues.Residential
                        AddResidentialDefaults()
                    Case MoveTypeValues.Apartment
                        AddApartmentDefaults()
                    Case MoveTypeValues.Business
                        AddBusinessDefaults()
                    Case MoveTypeValues.Storage
                        AddStorageDefaults()
                End Select
            End If
        End Sub

        Private Sub AddResidentialDefaults()
            With Rooms
                .Add(New Room() With {.Name = RoomTypeValues.LivingRoom})
                .Add(New Room() With {.Name = RoomTypeValues.Kitchen})
                .Add(New Room() With {.Name = RoomTypeValues.FamilyRoom})
                .Add(New Room() With {.Name = RoomTypeValues.Bathroom})
                .Add(New Room() With {.Name = RoomTypeValues.SmallBedroom})
                .Add(New Room() With {.Name = RoomTypeValues.LargeBedroom})
            End With
        End Sub

        Private Sub AddApartmentDefaults()
            With Rooms
                .Add(New Room() With {.Name = RoomTypeValues.LivingRoom})
                .Add(New Room() With {.Name = RoomTypeValues.Kitchen})
                .Add(New Room() With {.Name = RoomTypeValues.Bathroom})
                .Add(New Room() With {.Name = RoomTypeValues.LargeBedroom})
            End With
        End Sub

        Private Sub AddBusinessDefaults()
            With Rooms
                .Add(New Room() With {.Name = RoomTypeValues.Office})
            End With
        End Sub

        Private Sub AddStorageDefaults()
            With Rooms
                .Add(New Room() With {.Name = RoomTypeValues.Other})
            End With
        End Sub

        Private Sub Summary_Compute(ByRef result As String)
            If Not Me.StartDate = Nothing And Not Customer Is Nothing Then
                result = String.Format("{0} {1} - {2}", Customer.FirstName, Customer.LastName, StartDate.ToShortDateString)
            End If

        End Sub

        Private Sub Employee_Changed()
            Employee_Name = Employee.Summary
        End Sub
    End Class

    Public Class MoveTypeValues
        Public Shared Residential As String = "ResidentialHome"
        Public Shared Apartment As String = "Apartment"
        Public Shared Storage As String = "Storage"
        Public Shared Business As String = "Business"
    End Class

    Public Class RoomTypeValues
        Public Shared LivingRoom As String = "Living Room"
        Public Shared FamilyRoom As String = "Family Room"
        Public Shared Kitchen As String = "Kitchen"
        Public Shared Bathroom As String = "Bathroom"
        Public Shared Basement As String = "Basement"
        Public Shared SmallBedroom As String = "Bedroom (Small)"
        Public Shared LargeBedroom As String = "Bedroom (Large)"
        Public Shared Garage As String = "Garage"
        Public Shared Office As String = "Office"
        Public Shared Patio As String = "Patio"
        Public Shared Library As String = "Library"
        Public Shared Shed As String = "Shed/Outdoor Storage"
        Public Shared Other As String = "Other"
    End Class

End Namespace
