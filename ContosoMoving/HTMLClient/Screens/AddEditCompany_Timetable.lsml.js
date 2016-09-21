/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditCompany_Timetable.Print_execute = function (screen) {
    // Write code here.
    window.print();
};


myapp.AddEditCompany_Timetable.created = function (screen) {
    // Write code here.
    if (screen.Company_Timetable.Day_Of_Week == undefined) {
        screen.Company_Timetable.Start_Morning = "09:00";
        screen.Company_Timetable.End_Morning = "13:00";
        screen.Company_Timetable.Start_Evening = "16:00";
        screen.Company_Timetable.End_Evening = "20:00";
    } else {
        screen.details.displayName = "Orario Salone " + screen.Company_Timetable.Day_Of_Week;
    }
};