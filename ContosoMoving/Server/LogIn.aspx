<%@ Page Inherits="Microsoft.LightSwitch.Security.ServerGenerated.Implementation.LogInPageBase" %>


<!DOCTYPE HTML>
<html>
<head>
    <meta name="HandheldFriendly" content="true" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <title>Log In</title>
    <style type="text/css">
        /* Here you can customize your login screen */
        html {
            background: #ffffff;              
            background-image:url("Content/images/login.jpg");
            background-size:cover;            
        }

        html,
        body,
        .labelStyle {
            color: #444444;
        }

        h1 {
            color: #444444;
        }

        .requiredStyle {
            color: #FF1B1B;
        }

        input.buttonStyle {
            color: white;
            background-color: #2672EC;
            border-radius:4px;
            border: 1px solid #ababab;
            background-image:url('../HTMLClient/Content/images/14Supplier.png') ;
        }

        input.buttonStyle:hover {
            background-color: #2E8DEF;
        }

        input.buttonStyle:active {
            background-color: #2672EC;
        }
         input.fbbuttonStyle {   
             background:#3B5998;    
            color: white; 
            border: 1px solid #ababab;    
            border-radius:4px;
            text-align: center;
            background-image:url('../HTMLClient/Content/images/facebook.png') ;
            background-repeat:no-repeat;
            text-decoration: none;
            display: inline-block;
        }

        input.fbbuttonStyle:hover {
             background:#4a6bb1;  
            color: white;
            background-image:url('../HTMLClient/Content/images/facebook.png') ;
            background-repeat:no-repeat;           
        }

        input.fbbuttonStyle:active {
            background-color: #2672EC;
        }
       input.GbuttonStyle {   
             background:#f73322;    
            color: white; 
            border: 1px solid #ababab;    
            border-radius:4px;
            text-align: center;
            background-image:url('../HTMLClient/Content/images/Google.png') ;
            background-repeat:no-repeat;
            text-decoration: none;
            display: inline-block;
        }

        input.GbuttonStyle:hover {
             background:#F34333;   
            color: white;
            background-image:url('../HTMLClient/Content/images/Google.png') ;
            background-repeat:no-repeat;           
        }

        input.GbuttonStyle:active {
            background-color: #F35333;
        }

        .textBoxStyle {
            color: #444444;
            background-color: lightyellow;
            border: 1px solid #ababab;
        }

        .failureNotification {
            color: #ff0000;
        }

        /* login layout styling */
              
        .accountInfo {
            padding-left:40px;
            padding-right:40px;
            padding-bottom:20px;
            border-radius:7px;
            background-color:rgba(169, 169, 169, 0.70);
            width: 95%;
            max-width: 310px;
            position: absolute;
            top: 50%;
            margin-top: -144px;
            left: 50%;
            margin-left: -155px;           
        }

        .labelStyle {
            font-family: 'Segoe UI Semibold', 'Frutiger','Helvetica Neue Semibold',Helvetica,Arial,sans-serif;
            font-weight: 700;
        }      

        .submit-login {
            margin-top: 10px;
        }

        .rememberme {
            margin-bottom: 10px;
        }

        input[type=checkbox] {
            margin: 0 6px 0 0;
            vertical-align: -1px;
            cursor: pointer;
        }

        .checkStyle label {
            font-size: 15px;
        }
    </style>
</head>
<body>
    <form id="LogInForm" runat="server">
        <asp:Login ID="LoginUser" runat="server" EnableViewState="false" RenderOuterTable="false">
            <LayoutTemplate>
                <div class="accountInfo">
                    <img src ="Content/images/user-logo100.png"  />                      
                    <div style="margin-bottom: 10px;">
                        <asp:Label ID="UsernameLabel" runat="server" AssociatedControlID="Username" Text="Username:" CssClass="labelStyle" />
                        <asp:RequiredFieldValidator ID="UsernameRequired" runat="server" ControlToValidate="Username" ValidationGroup="LoginUserValidationGroup" Text="*" ToolTip="Username is required" CssClass="requiredStyle" />
                        <asp:TextBox ID="Username" runat="server" CssClass="textBoxStyle" />
                    </div>
                    <div style="margin-bottom: 10px;">
                        <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password" Text="Password :" CssClass="labelStyle" />
                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" ValidationGroup="LoginUserValidationGroup" Text="*" ToolTip="Password is required" CssClass="requiredStyle" />
                        <asp:TextBox ID="Password" runat="server" TextMode="Password" CssClass="textBoxStyle" />
                    </div>
                    <div class="submit-login">
                        <div class="rememberme">
                            <asp:CheckBox ID="RememberMe" runat="server" Text="Memorizza password." CssClass="checkStyle" />
                        </div>
                        <div style="margin-bottom: 10px;" class="logInBtn">
                            <asp:Button ID="LoginButton" runat="server" CommandName="Login" ValidationGroup="LoginUserValidationGroup" Text="Accedi" Width="310" Height="38" CssClass="buttonStyle" />
                        </div>
                         <div style="margin-bottom: 10px;" class="logInBtn">
                            <asp:Button ID="Button1" runat="server" CommandName="Login" ValidationGroup="LoginUserValidationGroup" Text="Accedi con FB" Width="310" Height="38" CssClass="fbbuttonStyle" />
                        </div>
                         <div style="margin-bottom: 10px;" class="logInBtn">
                            <asp:Button ID="Button2" runat="server" CommandName="Login" ValidationGroup="LoginUserValidationGroup" Text="Accedi con Google" Width="310" Height="38" CssClass="GbuttonStyle" />
                        </div>
                    </div>
                    <span class="failureNotification">
                        <asp:Literal ID="FailureText" runat="server" />
                    </span>
                    <asp:ValidationSummary ID="LoginUserValidationSummary" runat="server" ValidationGroup="LoginUserValidationGroup" />
                </div>
            </LayoutTemplate>
        </asp:Login>
    </form>
</body>
</html>
