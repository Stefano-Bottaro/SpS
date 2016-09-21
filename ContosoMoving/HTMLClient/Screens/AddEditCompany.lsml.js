/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.AddEditCompany.created = function (screen) {
    // Write code here.
    if (screen.Company.created == undefined && screen.Company.created == null) {
        screen.Company.created = new Date();
    }
};

myapp.AddEditCompany.Print_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditCompany.Logo_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 200px; max-height: 200px");
};
myapp.AddEditCompany.Logo1_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Company.Logo", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            contentItem.screen.closePopup();
        };
    });
};
