/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditSchedule.Print_Tap_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditSchedule.created = function (screen) {
    // Write code here.
    if (screen.Schedule.Name != undefined) {
        screen.details.displayName = "Scadenza " + screen.Schedule.Name;
    }
    today = new Date();
    screen.Schedule.created = today;
};


myapp.AddEditSchedule.Summary_postRender = function (element, contentItem) {    
    // Write code here. Intercosmo Spa documento n. 222 24/04/2014 rata 1/2    
    var counter = 0;
    contentItem.dataBind("screen.Schedule.Name", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            contentItem.screen.Schedule.Summary =  newValue;           
        }
    });
    contentItem.dataBind("screen.Schedule.Document_Number", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            contentItem.screen.Schedule.Summary = contentItem.screen.Schedule.Summary + " documento n. " + newValue ;
        }
    });
    contentItem.dataBind("screen.Schedule.Document_Date", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            contentItem.screen.Schedule.Summary = contentItem.screen.Schedule.Summary + " del " + newValue;
        }
    });
    contentItem.dataBind("screen.Schedule.Rate_Number", function (newValue) {
        if (newValue !== undefined && newValue !== null) {           
            contentItem.screen.Schedule.Summary = contentItem.screen.Schedule.Summary + " rata " + newValue;
        }
    });   
};


