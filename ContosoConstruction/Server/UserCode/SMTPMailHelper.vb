'' Copyright © Microsoft Corporation.  All Rights Reserved. 
'' This code released under the terms of the  
'' Microsoft Public License (MS-PL, http://opensource.org/licenses/ms-pl.html) 

Imports System.Net
Imports System.Net.Mail
Imports System.Text
Imports System.Configuration

Friend Class SMTPMailHelper

    Private Shared SMTPServer As String
    Private Shared SMTPPort As String
    Private Shared SMTPUserId As String
    Private Shared SMTPPassword As String

    Shared Sub New()
        'Read the mail server settings from the Web.config
        'Please adjust these appSettings the Server Generated project's Web.Config. 
        ' (In file view, open the ServerGenerated project and double-click on Web.config)
        'For Example:
        ' <appSettings>
        '  ....
        '  <add key="SMTPServer" value="smtp.mydomain.com" />
        '  <add key="SMTPPort" value="25" />
        '  <add key="SMTPUserId" value="admin" />
        '  <add key="SMTPPassword" value="password" />
        ' </appSettings>
        Try
            SMTPServer = ConfigurationManager.AppSettings("SMTPServer")
            SMTPPort = ConfigurationManager.AppSettings("SMTPPort")
            SMTPUserId = ConfigurationManager.AppSettings("SMTPUserId")
            SMTPPassword = ConfigurationManager.AppSettings("SMTPPassword")

        Catch ex As Exception
            Trace.TraceError(ex)
        End Try
    End Sub

    Public Shared Function SendAppointment(ByVal organizer As String,
                                               ByVal attendee As String,
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
            If organizer <> "" Then
                If SMTPServer = "" OrElse SMTPPassword = "" OrElse SMTPPort = "" OrElse SMTPUserId = "" Then
                    Throw New Exception("SMTPServer, SMTPUserId, SMTPPassword, and/or SMTPPort were not specified. Please adjust these appSettings to the web.config.")
                End If

                Dim fromAddress = New MailAddress(organizer)
                Dim mail As New MailMessage

                mail.Subject = subject
                mail.From = fromAddress

                'Need to send to both parties to organize the meeting
                mail.To.Add(fromAddress)
                If attendee <> "" Then
                    mail.To.Add(New MailAddress(attendee))
                End If

                'Use the text/calendar content type 
                Dim ct As New System.Net.Mime.ContentType("text/calendar")
                ct.Parameters.Add("method", "REQUEST")
                'Create the iCalendar format and add it to the mail
                Dim cal = CreateICal(organizer, attendee, subject, body, location, startTime, endTime, msgID, sequence, isCancelled)
                mail.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(cal, ct))

                'Send the meeting request
                Dim smtp As New SmtpClient(SMTPServer, SMTPPort)
                smtp.Credentials = New NetworkCredential(SMTPUserId, SMTPPassword)

                smtp.Send(mail)

                result = True
            End If
        Catch ex As Exception
            Throw New InvalidOperationException("Failed to send Appointment.", ex)
        End Try
        Return result
    End Function

    Private Shared Function CreateICal(ByVal organizer As String,
                                       ByVal attendee As String,
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
        If attendee <> "" Then
            sb.AppendLine(String.Format("ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT:MAILTO:{0}", attendee))
        End If
        sb.AppendLine(String.Format("ORGANIZER:MAILTO:{0}", organizer))
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
End Class
