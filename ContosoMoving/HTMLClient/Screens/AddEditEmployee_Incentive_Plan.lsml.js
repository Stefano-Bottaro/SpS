/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditEmployee_Incentive_Plan.created = function (screen) {
    // Write code here.
    today = new Date();
    screen.Employee_Incentive_Plan.created = today;
    screen.Employee_Incentive_Plan.Year = today.getFullYear();

};
myapp.AddEditEmployee_Incentive_Plan.Stampa_execute = function (screen) {
    // Write code here.
    window.print();
};