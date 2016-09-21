/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditEmployee_Time_Marker.created = function (screen) {
    // Write code here. Employee_Time_Marker.Employee.LastName
    today = new Date();    
    screen.Employee_Time_Marker.day = today;
    screen.Employee_Time_Marker.Anno = today.getFullYear();
    screen.Employee_Time_Marker.Month = today.getMonth()+1;
    screen.Employee_Time_Marker.hour = 8;
    if (screen.Employee_Time_Marker.Employee != undefined ) {   
        nominativo = screen.Employee_Time_Marker.Employee.LastName + " " + screen.Employee_Time_Marker.Employee.FirstName;
        screen.details.displayName = "Scheda " + nominativo;
    };
};