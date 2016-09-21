CONTOSO CONSTRUCTION SAMPLE SETUP INSTRUCTIONS

1. INSTALL EXTENSIONS

You will need the following extensions installed to load this application:
http://code.msdn.microsoft.com/Filter-Control-for-Visual-90fb8e93
http://code.msdn.microsoft.com/Excel-Importer-for-Visual-61dd4a90
And the Bing Map control from the Training Kit:
http://go.microsoft.com/?linkid=9741442

These are .VSIX packages and are also located in the root folder of this sample.
Close Visual Studio and then double-click them to install. 

2. SET UP BING MAP CONTROL

In order to use the Bing Maps Control and the Bing Maps Web Services, 
you need a Bing Maps Key. Getting the key is a free and straightforward process 
you can complete by following these steps:

- Go to the Bing Maps Account Center at https://www.bingmapsportal.com. 
- Click Sign In, to sign in using your Windows Live ID credentials. 
- If you haven’t got an account, you will be prompted to create one. 
- Enter the requested information and then click Save.
- Click the "Create or View Keys" link on the left navigation bar. 
- Fill in the requested information and click "Create Key" to generate a Bing Maps Key.
- In the ContosoConstruction application open the MapScreen. 
- Select the Bing Map control and enter the key in the Properties window.

3. SET UP EMAIL SERVER SETTINGS

In order for the emailing of appointments to work you must add 
the correct settings for your smtp server in the ServerGenerated
project's Web.config: 

-Open the ContosoConstruction project and in the solution explorer select "File View".
-Expand the ServerGenerated project and open the Web.config file.
-You will see the following settings that you must change to valid values:

    <add key="SMTPServer" value="smtp.mydomain.com" />
    <add key="SMTPPort" value="25" />
    <add key="SMTPUserId" value="admin" />
    <add key="SMTPPassword" value="password" />

-Run the application and open the employees screen, select Test User and specify a
valid email address. When you select this user on appointments, emails will be sent here.


NOTES:
Presonalization:

The system is set to Forms Authentication but if you change it to Windows Authenticaion then
in order for the "My Appointments" feature to work you will need to add yourself 
into the Employees table and specify your domain name as the user name. 
Make sure to specify a valid email address if you want to email appointments.

Excel Import:
In order to import data on the Materials Catalog screen, copy the StructuralMaterials.xls located 
in the root of this sample to your My Documents folder first. Then click the Import from Excel 
button on the screen and select the spreadsheet. You can them map the columns in the spreadsheet 
to the entity properties and the data from the spreadsheet will appear as new rows on the Materials 
Catalog. Click Save to send the data to the database. 