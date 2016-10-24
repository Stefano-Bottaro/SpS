/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditSchedule1.created = function (screen) {
    // Write code here.
    if (screen.Appointment.Id == null) {
        var today = new Date();
        var tomorrow = today.addDays(2);
        screen.Appointment.StartDate = tomorrow;
        alert("created StartDate=" + screen.Appointment.StartDate);
    };
};

myapp.AddEditSchedule1.EndDate_postRender = function (element, contentItem) {
    // Write code here.  
    contentItem.dataBind("screen.Appointment.StartDate", function (newValue) {
        if (contentItem.screen.Appointment.StartDate !== undefined && contentItem.screen.Appointment.StartDate !== null) {
            var endAppointment = getDay(newValue, null, null, 1);
            alert("dataBind EndDate=" + endAppointment);
           if (contentItem.screen.Appointment.EndDate !== endAppointment) {
               contentItem.screen.Appointment.EndDate = endAppointment;
            }           
        };
    });
};
myapp.AddEditSchedule1.Subject_postRender = function (element, contentItem) {
    // Write code here.
    //alert("Subject1_postRender");  Appointment.WorkSpace
    contentItem.dataBind("screen.Appointment.Customer", function (newValue) {      
        if (newValue !== undefined && newValue !== null) {
            var nominativo = newValue.LastName + " " + newValue.FirstName;
            //alert("screen.Appointment.Customer=" + nominativo);
            contentItem.screen.Appointment.Customer_Name = nominativo;
            if (contentItem.screen.Appointment.Subject == undefined && contentItem.screen.Appointment.Subject == null) {
                contentItem.screen.Appointment.Subject = nominativo;
            };
        };
    });
    contentItem.dataBind("screen.Appointment.WorkSpace", function (newValue) {
        //alert("modificato Workspace");
        if (newValue !== undefined && newValue !== null) {
            if (contentItem.screen.Appointment.Customer_Name !== undefined && contentItem.screen.Appointment.Customer_Name !== null) {
                var nominativo = contentItem.screen.Appointment.Customer_Name;
                contentItem.screen.Appointment.Subject = nominativo + " " + newValue.Description;
            }           
        };
    });
};

myapp.AddEditSchedule1.Employee_Name_postRender = function (element, contentItem) {
    // Write code here.
    //alert("Employee_Name_postRender");
    contentItem.dataBind("screen.Appointment.Employee", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            contentItem.screen.Appointment.Employee_Name = newValue.LastName + " " + newValue.FirstName;
        };
    });
};