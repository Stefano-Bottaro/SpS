/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditSector.Stampa_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditSector.created = function (screen) {
    // Write code here. Sector.Description
    today = new Date();
    screen.Sector.created = today;
};

myapp.AddEditSector.Appointments_render = function (element, contentItem) {
    // Write code here.
    createList(element, contentItem);
};