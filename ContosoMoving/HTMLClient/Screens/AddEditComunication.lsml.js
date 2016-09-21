/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditComunication.Stampa_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditComunication.created = function (screen) {
    // Write code here.
    if (screen.Comunication.Title == undefined) {
        today = new Date();        
        screen.Data_Start = today.getDate() + 30;
        screen.Data_End = today.getDate() + 31;
    } else {
        screen.details.displayName = screen.Title;
    }
};
myapp.AddEditComunication.Comunication_Attachment_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 250px; max-height: 250px");
    contentItem.dataBind("screen.Comunication.Attachment", function (newValue) {
        contentItem.screen.closePopup();
    });
};
