<%@ WebHandler Language="VB" Class="saveFiles" %>
Imports System.Web
Imports System.IO
Imports System.Collections.Generic
Public Class saveFiles
	Implements IHttpHandler
	Public Sub ProcessRequest(context As HttpContext)
		Dim targetFolder As String = HttpContext.Current.Server.MapPath("uploadfiles")
		If Not Directory.Exists(targetFolder) Then
			Directory.CreateDirectory(targetFolder)
		End If
		Dim request As HttpRequest = context.Request
		Dim uploadedFiles As HttpFileCollection = context.Request.Files
		If uploadedFiles IsNot Nothing AndAlso uploadedFiles.Count > 0 Then
			For i As Integer = 0 To uploadedFiles.Count - 1
				Dim fileName As String = uploadedFiles(i).FileName
				Dim indx As Integer = fileName.LastIndexOf("\")
				If indx > -1 Then
					fileName = fileName.Substring(indx + 1)
				End If
				uploadedFiles(i).SaveAs(Convert.ToString(targetFolder & Convert.ToString("\")) & fileName)
			Next
		Else
		End If
	End Sub
	Public ReadOnly Property IsReusable() As Boolean
		Get
			Return False
		End Get
	End Property
End Class