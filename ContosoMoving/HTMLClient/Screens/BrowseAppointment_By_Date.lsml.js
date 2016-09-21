/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseAppointment_By_Date.created = function (screen) {
    // Write code here.  createDatePicker(element, contentItem);  AppointmentStartDate  AppointmentEndDate
    var today = new Date();
    screen.details.displayName = " Appuntamenti giornalieri " ;   
    screen.AppointmentDataStart = new Date();
    screen.AppointmentDataEnd= getDay(today, null, 2, null);
};
myapp.BrowseAppointment_By_Date.RowTemplate_postRender = function (element, contentItem) {
    // Write code here Appointment_By_Date(item) Order_By_Date(item).Document_Date
    var entity = contentItem.data;   
    function refresh() {       
        var color = entity.Employee.Color;
        if (entity.Executed !== undefined && entity.Executed == true) {
            color = "Color-Green";
        };               
        $(element).closest("li").addClass(color);
    };
    refresh();
};
myapp.BrowseAppointment_By_Date.StartDate11_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.StartDate", function (newValue) {
        if (contentItem.screen.StartDate !== undefined) {            
            contentItem.screen.StartDate1 = contentItem.screen.StartDate;           
        };
    });
};

myapp.BrowseAppointment_By_Date.Customer_Name_render = function (element, contentItem) {
    // Write code here.
    $(element).addClass("customer");
};
myapp.BrowseAppointment_By_Date.Employee_Name_render = function (element, contentItem) {
    // Write code here.
    $(element).addClass("employee");
};
myapp.BrowseAppointment_By_Date.Importante_render = function (element, contentItem) {
    // Write code here.  
    var entity = contentItem.data;
    if (entity.Important) {
        $(element).addClass("precious");
    };
};

