/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.AddEditEmployes_Timetable.created = function (screen) {
    // Write code here.
    if (screen.Employes_Timetable.Employee == undefined) {
        screen.Employes_Timetable.Morning_Start = "9:00";
        screen.Employes_Timetable.Evening_Start = "16:00";
        screen.Employes_Timetable.Morning_End = "13:00";
        screen.Employes_Timetable.Evening_End = "20:00";
    };
};
myapp.AddEditEmployes_Timetable.Print_execute = function (screen) {
    // Write code here.
    window.print();
};

