/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditCompany_Bank.Print_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditCompany_Bank.created = function (screen) {
    // Write code here.
    nominativo = screen.Company_Bank.Description;
    screen.details.displayName = nominativo;
};