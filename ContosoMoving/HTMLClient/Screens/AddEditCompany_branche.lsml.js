/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditCompany_branche.Print_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditCompany_branche.created = function (screen) {
    // Write code here.
    nominativo = screen.Company_branche.Description;
    screen.details.displayName = nominativo;
};