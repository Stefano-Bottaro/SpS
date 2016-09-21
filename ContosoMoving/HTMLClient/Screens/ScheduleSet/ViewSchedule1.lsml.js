/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewSchedule1.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Appointment.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Appointment." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

