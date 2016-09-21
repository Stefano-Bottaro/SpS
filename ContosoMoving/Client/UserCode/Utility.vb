Imports Microsoft.LightSwitch.Threading
Imports LightSwitchApplication
Imports System.Runtime.InteropServices.Automation
Imports System.Xml.Linq

Public Class Utility

    Public Shared Function getCounter(counter As Counter, ByVal Value As String, ByVal year As String) As String
        If Trim(year).Length > 0 Then
            If year > counter.Counter_year Then 'if the year parameter is > the stored year  value is 0
                counter.Valore = 0
            End If
        End If
        counter.Valore = counter.Valore + 1
        Return Now.Year & "/" & Right("000000" & counter.Valore, 6)
    End Function


    Public Shared Sub aggInventory(history As Product_History, inventory As Product)
        ' MESSAGGIO= [Vuoi l'aggiornamento automatico dei prezzi di vendita ]
        inventory.Cost = history.Price_List * (1 - history.Discount) * (1 + history.Shipping_Cost)
        inventory.Cost = Math.Round(CDec(inventory.Cost), 2)
        If history.Quantity_Enter > 0 Then
            inventory.Stock = inventory.Stock + history.Quantity_Enter
            inventory.Volume_Purchased = inventory.Volume_Purchased + history.Quantity_Enter
        Else
            inventory.Stock = inventory.Stock - history.Quantity_Output
            inventory.Volume_Sold = inventory.Volume_Sold + history.Quantity_Output
        End If
        If inventory.Mark_Up > 0 And inventory.Product_Tax.Value > 0 And history.Cost > 0 Then
            If inventory.Shipping_Cost > 0 Then
                inventory.Price = history.Cost * (1 + inventory.Mark_Up) * (1 + history.Shipping_Cost) * (1 + inventory.Product_Tax.Value)
            Else
                inventory.Price = history.Cost * (1 + inventory.Mark_Up) * (1 + inventory.Product_Tax.Value)
            End If
            inventory.Price = Math.Round(CDec(inventory.Price), 2)
        End If
        If inventory.Stock > 0 And inventory.Cost > 0 Then
            inventory.Stock_Value = inventory.Cost * inventory.Stock
        End If
        If inventory.Volume_Sold > 0 And inventory.Stock > 0 Then
            inventory.Turnover_Index = inventory.Volume_Sold / inventory.Stock
        Else
            inventory.Turnover_Index = 0
        End If
        If inventory.Minimum_stock > 0 And inventory.Turnover_Index > 0 Then
            inventory.To_order = Int((inventory.Minimum_stock * inventory.Turnover_Index) - inventory.Stock + 0.99)
        End If
    End Sub

    Public Shared Sub aggAccount(acc As Account, type As String, money As Decimal)
        ' [Attendere Prego Fase aggiornamento Saldi Piano dei Conti se <> da Bolla di accompagnamento]
        If type.Contains("Credit") Then
            acc.Credit = acc.Credit + money
        Else
            acc.Debit = acc.Debit + money
        End If
    End Sub

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

    Public Shared Sub aggScheduleSupplier(doc As Product_Document, sch As Schedule, balance As String, rate As Integer)
        'per ogni rata inserisce un nuovo record con fornitore,importo debito,data scadenza,numero di rata, data del documento,Banca appoggio se <> da DDT
        sch.Product_Document = doc
        sch.Summary = doc.Supplier.Name
        sch.Bank = doc.Company_Bank.Description
        sch.created = Now
        sch.Debit = Math.Round(CDec(doc.Total / doc.Payment_Number), 2)
        sch.Document_Date = doc.Document_Date
        sch.Document_Number = doc.Document_Number
        sch.Rate_Number = CStr(rate) & "/" & CStr(doc.Payment_Number)
        'balance = "Debit"  / "Credit"
        sch.Type = balance
        sch.Name = doc.Supplier.Name
        sch.Expiration_Date = LastMounthDay(doc.Document_Date, doc.Deferrals - (30 * rate))
        sch.Total_Document = doc.Total

    End Sub
    Public Shared Sub aggScheduleCustomer(doc As Order, sch As Schedule, balance As String, rate As Integer)
        'per ogni rata inserisce un nuovo record con fornitore,importo debito,data scadenza,numero di rata, data del documento,Banca appoggio se <> da DDT
        sch.Order = doc
        sch.Summary = doc.Customer.LastName + " " + doc.Customer.FirstName
        'sch.Bank = doc.Company_Bank.Description
        sch.created = Now
        sch.Debit = Math.Round(CDec(doc.Total / doc.Payment_Number), 2)
        sch.Document_Date = doc.Document_Date
        sch.Document_Number = doc.Document_Number
        sch.Rate_Number = CStr(rate) & "/" & CStr(doc.Payment_Number)
        'balance = "Debit"  / "Credit"
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
        If Not customer.Expense Is Nothing Then
            customer.Expense = customer.Expense + treatment.Total
            If customer.Last_Visit.Value.Year < Now.Year Then  'se cambia l'anno di visita
                customer.Expense_Last_Year = treatment.Total
            Else
                customer.Expense_Last_Year = customer.Expense_Last_Year + treatment.Total
            End If
            customer.Average_Expense = Math.Round(CDec(customer.Expense / customer.Visit_Number), 2)
        Else
            customer.Expense = treatment.Total
            customer.Expense_Last_Year = treatment.Total
            customer.Average_Expense = Math.Round(CDec(customer.Expense / customer.Visit_Number), 2)
        End If
        customer.Last_Visit = Now
    End Sub
    Public Shared Sub ExportToPdf(entity As System.Collections.IEnumerable)

        'OfficeIntegration.Word.Export(entity, False)

    End Sub

    Public Shared Sub ExportToExcel(entity As System.Collections.IEnumerable)

        Dim ExcelFile = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) & "\" & entity.GetType.Name & ".xlsx"

        If File.Exists(ExcelFile) Then
            Dim str As String
            str = "'"
            For Each Label In entity.GetType.GetFields
                str = str + "," + Label.Name + "'"
            Next (Label)
            Dim fields As New List(Of String) From {str}
            'Dim fields As New List(Of String) From {"CompanyName", "ContactName", "ContactTitle", "Phone"}
            'OfficeIntegration.Excel.Export(entity, ExcelFile, "Sheet1", "A1", fields)
        End If
    End Sub

    Public Shared Function SerializeEntity(ByVal entity As LightSwitchApplication.ApplicationData) As XElement
        Dim elementXml = <<%= entity.GetType.Name %>>
                             <%= From prop In entity.Details.Properties.All
                                 Select <<%= prop.Name.ToLower %>><%= If(prop.Value, "-") %></>
                             %>
                         </>
        Return elementXml
    End Function

    Public Shared Sub PrintReport(ByVal entity As Object)
        If AutomationFactory.IsAvailable Then
            Try
                'Create the XML data from our entity properties dynamically
                Dim myXML = Utility.SerializeEntity(entity)
                Using word = AutomationFactory.CreateObject("Word.Application")
                    'The report template already has content controls bound to XML inside. 
                    ' Look in the ClientGenerated project to view the Word template.
                    Dim resourceInfo = System.Windows.Application.GetResourceStream(New Uri("Order.docx", UriKind.Relative))
                    Dim fileName = CopyStreamToTempFile(resourceInfo.Stream, ".docx")
                    Dim doc = word.Documents.Open(fileName)
                    'Grab the existing bound custom XML in the doc
                    Dim customXMLPart = doc.CustomXMLParts("urn:microsoft:contoso:projectstatus")

                    Dim all = customXMLPart.SelectSingleNode("//*")
                    Dim replaceNode = customXMLPart.SelectSingleNode("/ns0:root[1]/customer[1]")

                    'replace the <customer> node in the existing custom XML with this new data
                    all.ReplaceChildSubtree(myXML.ToString, replaceNode)
                    word.Visible = True
                End Using
            Catch ex As Exception
                Throw New InvalidOperationException("Si è verificato un errore nella creazione del report.", ex)
                Exit Sub
            End Try
        End If
    End Sub

    Private Shared Function CopyStreamToTempFile(ByVal stream As System.IO.Stream, ByVal ext As String) As String
        Dim path = GetTempFileName(ext)
        'Create the temp file
        Dim file = System.IO.File.Create(path)
        file.Close()
        'Write the stream to disk
        Using fileStream = System.IO.File.Open(path,
                                               System.IO.FileMode.OpenOrCreate,
                                               System.IO.FileAccess.Write,
                                               System.IO.FileShare.None)

            Dim buffer(0 To stream.Length - 1) As Byte
            stream.Read(buffer, 0, stream.Length)
            fileStream.Write(buffer, 0, buffer.Length)

            fileStream.Close()
        End Using
        Return path
    End Function

    Public Shared Function SelectFile(type As String) As FileInfo
        Dim result As FileInfo = Nothing
        Dispatchers.Main.Invoke(
            Sub()
                Dim dlg = New OpenFileDialog()
                Select Case type
                    Case "csv"
                        dlg.Filter = "csv files (*.csv)|*.csv"
                        Exit Select
                    Case "xls"
                        dlg.Filter = "xls files (*.xls)|*.xls |*.xlsx"
                        Exit Select
                    Case "doc"
                        dlg.Filter = "doc files (*.doc)|*.doc|*.docx"
                        Exit Select
                    Case "pdf"
                        dlg.Filter = "pdf files (*.pdf)|*.pdf|*.pdfx"
                        Exit Select
                    Case Else
                        dlg.Filter = "all files (*.*)|*.*"
                        Exit Select
                End Select
                dlg.FilterIndex = 1
                If dlg.ShowDialog = True Then
                    result = dlg.File
                End If
            End Sub)
        SelectFile = result
    End Function

    Public Shared Function UpLoadFile() As Byte()
        Dim data As Byte() = Nothing
        Dispatchers.Main.Invoke(
            Sub()
                Dim dlg = New OpenFileDialog
                If dlg.ShowDialog Then
                    Dim buffer = dlg.File.Length
                    ReDim data(CInt(buffer - 1))
                    Using stm As Stream = dlg.File.OpenRead
                        stm.Read(data, 0, data.Length)
                    End Using
                End If
            End Sub)
        UpLoadFile = data
    End Function

    Public Shared Sub DownLoadFile(blob As Object)
        Dispatchers.Main.Invoke(
             Sub()
                 Dim dlg = New SaveFileDialog()
                 If dlg.ShowDialog = True Then
                     Dim stream = dlg.OpenFile
                     Using (stream)
                         ' save original uploaded File
                         stream.Write(blob.File, 0, blob.File.Length)
                     End Using
                 End If
             End Sub)
    End Sub

    Public Shared Function GetTempFileName(ByVal fileName As String) As String
        ' create temp folder in My Documents
        Dim tempFolder = IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "MyTempDocuments")
        If Not Directory.Exists(tempFolder) Then
            Directory.CreateDirectory(tempFolder)
        End If
        ' generate unique file name while retaining file extension
        GetTempFileName = IO.Path.Combine(tempFolder, String.Format("{0}.{1}", Guid.NewGuid(), fileName))
    End Function

    Private Sub OpenFile(ByVal LSBlob As Byte(), ByVal name As String)
        If Not System.Windows.Application.Current.HasElevatedPermissions Then
            Throw New NotSupportedException("Must run with elevated permissions")
        End If
        ' write document to temp file with unique name
        Dim tempFile = GetTempFileName(name)
        File.WriteAllBytes(tempFile, LSBlob)
        ' open the temp file using Shell Object
        Dim shell = AutomationFactory.CreateObject("WScript.Shell")
        shell.Run(ChrW(34) + tempFile + ChrW(34)) ' must enclose in quotes
    End Sub

    Public Shared Function CreateFile(ByVal file As String) As FileStream
        Try
            Dim fso As New FileStream(IO.Path.GetTempPath & file, FileMode.CreateNew)
        Catch ex As Exception
            'ShowMessageBox("Error create file " & file & "--> " & ex.ToString)
        End Try
        Return fso()
    End Function

    Public Shared Function SaveFile(ByVal file As FileStream) As Boolean
        Dim test As Boolean = True
        Dim name As String = ""
        Try
            name = GetTempFileName("Temp.xpf")
            file.Close()
        Catch ex As Exception
            ' Me.ShowMessageBox("Error save file " & filename.Name & "--> " & ex.ToString)
            test = False
        End Try
        Return test
    End Function

    Public Shared Sub PrintFile(ByVal file As FileStream)
        Dim pd As New System.Windows.Printing.PrintDocument
        ' Show the print dialog.
        pd.Print(file.Name)
    End Sub

    Private Shared Function fso() As FileStream
        Throw New NotImplementedException
    End Function

    Public Shared Sub Rtfhandler(ByRef mem As MemoryStream, ByVal operation As String, ByVal str As String)

        Select Case operation
            Case "Start"
                str = "{\rtf1\ansi\ansicpg1252\deff0\deflang1040{\fonttbl{\f0\fnil\fcharset0 Calibri;}}"

            Case "addEmptyRow"
                str = "\par"

            Case "addBold"
                str = "{\b" & str & "}"

            Case "End"
                str = "}"

        End Select
        'scrivere su stream mem

    End Sub
    '****************************************gestione date******************************************
    Public Shared Function CountWorkdays(data1 As DateTime, data2 As DateTime) As Integer
        Dim wd As Integer = 0
        While data1 <= data2
            If IsHoliday(data1) = False Then
                wd = wd + 1
            End If
            data1 = DateAdd("d", 1, data1)
        End While
        Return wd
    End Function

    Public Shared Function LastMounthDay(dataStart As Date, dayNumber As Integer) As Date
        'restituisce l'ultimo giorno del mese anche se l'anno è bisestile
        Dim L1 = dataStart.AddDays(dayNumber)
        Dim L2 = L1.AddMonths(2)
        Dim L3 = CDate(CStr("01" & "/" & L2.Month & "/" & L2.Year))
        Dim LastDay = L3.AddDays(-1)
        Return LastDay
    End Function


    Public Shared Function AddWorkdays(data1 As DateTime, daynum As Integer) As DateTime
        Dim datastart As DateTime = data1
        Dim dataend As DateTime = data1
        Dim i As Integer
        Dim d As Integer = 1
        For i = 1 To daynum
            dataend = datastart.AddDays(d)
            If IsHoliday(dataend) Then
                i -= 1
            End If
            d += 1
        Next
        Return dataend
    End Function

    Public Shared Function IsHoliday(ByVal data As DateTime) As Boolean
        'trova le date non lavorative compresi il sabato e la domenica
        Dim y As Integer = data.Year
        Dim m As Integer = data.Month
        Dim d As Integer = data.Day
        Dim numdata As Integer
        numdata = data.DayOfWeek + 1 '(lunedi = 2)

        If m = 1 And d = 1 Or m = 1 And d = 6 Or m = 4 And d = 25 Or
           m = 5 And d = 1 Or m = 6 And d = 2 Or m = 8 And d = 15 Or
           m = 11 And d = 1 Or m = 12 And d = 8 Or m = 12 And d = 25 Or
           m = 12 And d = 26 Or data.Equals(EasterDate(y).AddDays(1)) Or
           numdata = vbSaturday Or numdata = vbSunday Then
            Return True
        Else
            Return False
        End If
    End Function

    Public Shared Function EasterDate(Optional ByVal year As Integer = 0) As DateTime
        Static dt As DateTime
        Dim G, C, H, i, j, L As Integer
        Dim m, d As Integer

        If year = 0 Then year = DateTime.Today.Year
        If dt.Year <> year Then
            G = year Mod 19
            C = year \ 100
            H = ((C - (C \ 4) - ((8 * C + 13) \ 25) + (19 * G) + 15) Mod 30)
            i = H - ((H \ 28) * (1 - (H \ 28) * (29 \ (H + 1)) * ((21 - G) \ 11)))
            j = ((year + (year \ 4) + i + 2 - C + (C \ 4)) Mod 7)
            L = i - j

            m = 3 + ((L + 40) \ 44)
            d = L + 28 - (31 * (m \ 4))
            dt = New DateTime(year, m, d)
        End If
        Return dt
    End Function

    Public Shared Function getMounth(ByVal month As Integer) As String
        Return MonthName(month)
    End Function



    Public Shared Function GetImageByName(fileName As String) As Byte()
        Dim assembly As Reflection.Assembly =
          Reflection.Assembly.GetExecutingAssembly()
        Dim stream As Stream = assembly.GetManifestResourceStream(fileName)
        Return GetStreamAsByteArray(stream)
    End Function

    Private Shared Function GetStreamAsByteArray(ByVal stream As System.IO.Stream) As Byte()
        If stream IsNot Nothing Then
            Dim streamLength As Integer = Convert.ToInt32(stream.Length)
            Dim fileData(streamLength - 1) As Byte
            stream.Read(fileData, 0, streamLength)
            stream.Close()
            Return fileData
        Else
            Return Nothing
        End If
    End Function

    Public Shared Sub SendEmail(ByVal from As String, ByVal recepient As String, ByVal subject As String, ByVal body As String)
        ' Write your code here.
        'Dim body As String = OfficeIntegration.Outlook.HtmlExportEntityCollection(Me.Customers.SelectedItem.OrderHeader)
        'OfficeIntegration.Outlook.CreateEmail(recepient, subject, body)

    End Sub

    'Public Shared Sub SendMail(ByVal from As String, ByVal recepient As String, ByVal bcc As String, ByVal cc As String, ByVal subject As String, ByVal body As String)
    '    'Send an email notification when an appointment is inserted into the system
    '    ''' <summary>
    '    ''' Sends an mail message
    '    ''' </summary>
    '    ''' <param name="from">Sender address</param>
    '    ''' <param name="recepient">Recepient address</param>
    '    ''' <param name="bcc">Bcc recepient</param>
    '    ''' <param name="cc">Cc recepient</param>
    '    ''' <param name="subject">Subject of mail message</param>
    '    ''' <param name="body">Body of mail message</param>

    '    ' Instantiate a new instance of MailMessage
    '    Dim mMailMessage As New MailMessage()

    '    ' Set the sender address of the mail message
    '    mMailMessage.From = New MailAddress(from)
    '    ' Set the recepient address of the mail message
    '    mMailMessage.To.Add(New MailAddress(recepient))

    '    ' Check if the bcc value is nothing or an empty string
    '    If Not bcc Is Nothing And bcc <> String.Empty Then
    '        ' Set the Bcc address of the mail message
    '        mMailMessage.Bcc.Add(New MailAddress(bcc))
    '    End If

    '    ' Check if the cc value is nothing or an empty value
    '    If Not cc Is Nothing And cc <> String.Empty Then
    '        ' Set the CC address of the mail message
    '        mMailMessage.CC.Add(New MailAddress(cc))
    '    End If

    '    ' Set the subject of the mail message
    '    mMailMessage.Subject = subject
    '    ' Set the body of the mail message
    '    mMailMessage.Body = body

    '    ' Set the format of the mail message body as HTML
    '    mMailMessage.IsBodyHtml = True
    '    ' Set the priority of the mail message to normal
    '    mMailMessage.Priority = MailPriority.Normal

    '    ' Instantiate a new instance of SmtpClient
    '    Dim mSmtpClient As New SmtpClient()
    '    ' Send the mail message
    '    mSmtpClient.Send(mMailMessage)
    'End Sub

End Class
