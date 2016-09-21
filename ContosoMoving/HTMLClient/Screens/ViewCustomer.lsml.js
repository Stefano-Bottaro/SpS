/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.ViewCustomer.created = function (screen) {
    // Write code here.
    today = new Date();
    var nominativo = "";
    if (screen.Customer.LastName != undefined && screen.Customer.FirstName != undefined) {
        nominativo = screen.Customer.FirstName + " " + screen.Customer.LastName;
        screen.details.displayName = nominativo;
    };
    if (screen.Customer.Born_date != undefined) {
        screen.Age = (today.getFullYear() - screen.Customer.Born_date.getFullYear());
    };
};
