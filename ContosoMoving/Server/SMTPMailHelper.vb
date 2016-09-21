
Imports System.Net
Imports System.Net.Mail
Imports System.Text


Public Class SMTPMailHelper

    Const SMTPServer As String = "smtp.live.com"
    Const SMTPUserId As String = "genivsloci@outlook.com"
    Const SMTPPassword As String = "Genius4us"
    Const SMTPPort As Integer = 587
    Const SMTPTimeout = 20
    Const SMTPSecure = True

    Public Shared Sub SendMail(ByVal sendFrom As String,
                              ByVal sendTo As String,
                              ByVal subject As String,
                              ByVal body As String)
        Dim fromAddress = New MailAddress(sendFrom)
        Dim toAddress = New MailAddress(sendTo)
        Dim mail As New MailMessage

        With mail
            .From = fromAddress
            .To.Add(toAddress)
            .Subject = subject
            If body.ToLower.Contains("<html>") Then
                .IsBodyHtml = True
            End If
            .Body = body
        End With

        Dim smtp As New SmtpClient(SMTPServer, SMTPPort)

        smtp.EnableSsl = SMTPSecure
        smtp.Timeout = SMTPTimeout
        smtp.Credentials = New NetworkCredential(SMTPUserId, SMTPPassword)
        smtp.Send(mail)
    End Sub

    Public Shared Function SendAppointment(ByVal sendFrom As String,
                                       ByVal sendTo As String,
                                       ByVal subject As String,
                                       ByVal body As String,
                                       ByVal location As String,
                                       ByVal startTime As Date,
                                       ByVal endTime As Date,
                                       ByVal msgID As String,
                                       ByVal sequence As Integer,
                                       ByVal isCancelled As Boolean) As Boolean

        Dim result = False
        Try
            If sendTo = "" OrElse sendFrom = "" Then
                Throw New InvalidOperationException("sendTo and sendFrom email addresses devono essere specificati.")
            End If

            Dim fromAddress = New MailAddress(sendFrom)
            Dim toAddress = New MailAddress(sendTo)
            Dim mail As New MailMessage

            With mail
                .Subject = subject
                .From = fromAddress

                'Need to send to both parties to organize the meeting
                .To.Add(toAddress)
                .To.Add(fromAddress)
            End With

            'Use the text/calendar content type 
            Dim ct As New System.Net.Mime.ContentType("text/calendar")
            ct.Parameters.Add("method", "REQUEST")
            'Create the iCalendar format and add it to the mail
            Dim cal = CreateICal(sendFrom, sendTo, subject, body, location,
                             startTime, endTime, msgID, sequence, isCancelled)
            mail.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(cal, ct))

            'Send the meeting request
            Dim smtp As New SmtpClient(SMTPServer, SMTPPort)
            smtp.Credentials = New NetworkCredential(SMTPUserId, SMTPPassword)
            smtp.Send(mail)

            result = True
        Catch ex As Exception
            Throw New InvalidOperationException("Failed to send Appointment.", ex)
        End Try
        Return result
    End Function

    Private Shared Function CreateICal(ByVal sendFrom As String,
                                   ByVal sendTo As String,
                                   ByVal subject As String,
                                   ByVal body As String,
                                   ByVal location As String,
                                   ByVal startTime As Date,
                                   ByVal endTime As Date,
                                   ByVal msgID As String,
                                   ByVal sequence As Integer,
                                   ByVal isCancelled As Boolean) As String

        Dim sb As New StringBuilder()
        If msgID = "" Then
            msgID = Guid.NewGuid().ToString()
        End If

        'See iCalendar spec here: http://tools.ietf.org/html/rfc2445
        'Abridged version here: http://www.kanzaki.com/docs/ical/
        sb.AppendLine("BEGIN:VCALENDAR")
        sb.AppendLine("PRODID:-//Northwind Traders Automated Email")
        sb.AppendLine("VERSION:2.0")
        If isCancelled Then
            sb.AppendLine("METHOD:CANCEL")
        Else
            sb.AppendLine("METHOD:REQUEST")
        End If
        sb.AppendLine("BEGIN:VEVENT")
        If isCancelled Then
            sb.AppendLine("STATUS:CANCELLED")
            sb.AppendLine("PRIORITY:1")
        End If
        sb.AppendLine(String.Format("ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT:MAILTO:{0}", sendTo))
        sb.AppendLine(String.Format("ORGANIZER:MAILTO:{0}", sendFrom))
        sb.AppendLine(String.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", startTime.ToUniversalTime))
        sb.AppendLine(String.Format("DTEND:{0:yyyyMMddTHHmmssZ}", endTime.ToUniversalTime))
        sb.AppendLine(String.Format("LOCATION:{0}", location))
        sb.AppendLine("TRANSP:OPAQUE")
        'You need to increment the sequence anytime you update the meeting request. 
        sb.AppendLine(String.Format("SEQUENCE:{0}", sequence))
        'This needs to be a unique ID. A GUID is created when the appointment entity is inserted
        sb.AppendLine(String.Format("UID:{0}", msgID))
        sb.AppendLine(String.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow))
        sb.AppendLine(String.Format("DESCRIPTION:{0}", body))
        sb.AppendLine(String.Format("SUMMARY:{0}", subject))
        sb.AppendLine("CLASS:PUBLIC")
        'Create a 15min reminder
        sb.AppendLine("BEGIN:VALARM")
        sb.AppendLine("TRIGGER:-PT15M")
        sb.AppendLine("ACTION:DISPLAY")
        sb.AppendLine("DESCRIPTION:Reminder")
        sb.AppendLine("END:VALARM")

        sb.AppendLine("END:VEVENT")
        sb.AppendLine("END:VCALENDAR")

        Return sb.ToString()
    End Function


    'Private Sub Orders_Inserted(ByVal entity As Order)
    '    Dim toEmail = entity.Cliente.Email

    '    If toEmail <> "" Then
    '        Dim fromEmail = SMTPUserId
    '        Dim subject = "Il tuo Ordine " + entity.Numero_Ordine + " è stato inserito"
    '        Dim body = ""
    '        body += '<html>'
    '        body += '<body style="font-family: Arial, Helvetica, sans-serif;">'

    '                         <p><%= entity.Customer.ContactName %>, thank you for your order!<br></br>
    '                           Order date: <%= FormatDateTime(entity.OrderDate, DateFormat.LongDate) %></p>
    '                         <table border="1" cellpadding="3"
    '                             style="font-family: Arial, Helvetica, sans-serif;">
    '                             <tr>
    '                                 <td><b>Product</b></td>
    '                                 <td><b>Quantity</b></td>
    '                                 <td><b>Price</b></td>
    '                                 <td><b>Discount</b></td>
    '                                 <td><b>Line Total</b></td>
    '                             </tr>
    '                             <%= From d In entity.Order_Details
    '                                 Select <tr>
    '                                            <td><%= d.Product.ProductName %></td>
    '                                            <td align="right"><%= d.Quantity %></td>
    '                                            <td align="right"><%= FormatCurrency(d.UnitPrice, 2) %></td>
    '                                            <td align="right"><%= FormatPercent(d.Discount, 0) %></td>
    '                                            <td align="right"><%= FormatCurrency(d.LineTotal, 2) %></td>
    '                                        </tr>
    '                             %>
    '                             <tr>
    '                                 <td></td>
    '                                 <td></td>
    '                                 <td></td>
    '                                 <td align="right"><b>Total:</b></td>
    '                                 <td align="right"><b><%= FormatCurrency(entity.OrderTotal, 2) %></b></td>
    '                             </tr>
    '                         </table>
    '                     </body>
    '                 </html>


    '        SMTPMailHelper.SendMail(fromEmail, toEmail, subject, body.ToString)
    '    End If
    'End Sub

    'Private Sub Appointments_Inserted(ByVal entity As Appointment)
    '    Try
    '        SMTPMailHelper.SendAppointment(entity.Employee.Email,
    '                                 entity.Customer.Email,
    '                                 entity.Subject,
    '                                 entity.Notes,
    '                                 entity.Location,
    '                                 entity.StartTime,
    '                                 entity.EndTime,
    '                                 entity.MsgID,
    '                                 entity.MsgSequence,
    '                                 False)
    '    Catch ex As Exception
    '        System.Diagnostics.Trace.WriteLine(ex.ToString)
    '    End Try
    'End Sub


End Class


