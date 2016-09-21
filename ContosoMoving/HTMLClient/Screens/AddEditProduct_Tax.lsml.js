/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditProduct_Tax.Print_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditProduct_Tax.created = function (screen) {
    // Write code here.
    nominativo = screen.Product_Tax.Tax;
    screen.details.displayName = nominativo;
};