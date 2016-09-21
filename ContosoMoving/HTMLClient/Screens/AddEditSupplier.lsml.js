/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditSupplier.created = function (screen) {
    // Write code here.
    if (screen.Supplier.Name != undefined ) {        
        screen.details.displayName = screen.Supplier.Name;
    }
};
myapp.AddEditSupplier.Print_Tap_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditSupplier.CityAdd_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_new");
};
myapp.AddEditSupplier.AgentAdd_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_new");
};