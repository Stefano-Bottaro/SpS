<%@ WebHandler Language="VB" Class="removeFiles" %>
Imports System.Web
Imports System.IO
Imports System.Collections.Generic

Public Class removeFiles
	Implements IHttpHandler

	Public Sub ProcessRequest(context As HttpContext)
		Dim s As System.Collections.Specialized.NameValueCollection = context.Request.Params
		Dim fileName As String = s("fileNames")
		Dim targetFolder As String = HttpContext.Current.Server.MapPath("uploadfiles")
		If Not Directory.Exists(targetFolder) Then
			Directory.CreateDirectory(targetFolder)
		End If

		Dim physicalPath As String = Convert.ToString(targetFolder & Convert.ToString("\")) & fileName
		If System.IO.File.Exists(physicalPath) Then
			System.IO.File.Delete(physicalPath)
		End If

	End Sub
	Public ReadOnly Property IsReusable() As Boolean
		Get
			Return False
		End Get
	End Property

End Class
