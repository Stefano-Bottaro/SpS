/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewSchedule1.Details_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.screen.details.displayName = "Appuntamento:"+contentItem.data.Appointment.Customer_Name;    
}


