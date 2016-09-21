/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.ViewOrderRicevutaold.created = function (screen) {
    // Write code here.   d.getDay() + "/" + d.getMonth() + 1 + "/" + d.getFullYear();
    var d = new Date(screen.Order.Document_Date);
    screen.details.displayName = "Ricevuta n. " + screen.Order.Document_Number //+ " del " + DateToString(d);
};
myapp.ViewOrderRicevutaold.Stampa_Tap_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.ViewOrderRicevutaold.CompaniesTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};

myapp.ViewOrderRicevutaold.Group4_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("Color-Teal");
};
myapp.ViewOrderRicevutaold.right_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("Color-Teal");
};