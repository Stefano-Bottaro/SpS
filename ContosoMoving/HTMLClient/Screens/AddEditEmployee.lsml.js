/// <reference path="~/GeneratedArtifacts/viewModel.js" />


myapp.AddEditEmployee.created = function (screen) {
    // Write code here.
    if (screen.Employee.LastName != undefined && screen.Employee.FirstName != undefined) {
        nominativo = screen.Employee.LastName + " " + screen.Employee.FirstName;
        screen.details.displayName = nominativo;
    }else{
        screen.Employee.created = new Date();
        screen.Employee.Status = "Si";
    };    
};

myapp.AddEditEmployee.Employee_Photo_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 350px; max-height: 350px");
    contentItem.dataBind("screen.Employee.Photo", function (newValue) {
        contentItem.screen.closePopup();
    });
};
myapp.AddEditEmployee.Summary_postRender = function (element, contentItem) {
    // Write code here.
    var nominativo = "";
    contentItem.dataBind("screen.Employee.LastName", function (newValue) {
        if (contentItem.screen.Employee.LastName !== undefined && contentItem.screen.Employee.FirstName !== undefined) {
            nominativo = contentItem.screen.Employee.LastName + " " + contentItem.screen.Employee.FirstName;
            contentItem.screen.Employee.Summary = nominativo;
        };
    });
    contentItem.dataBind("screen.Employee.FirstName", function (newValue) {
        if (contentItem.screen.Employee.LastName !== undefined && contentItem.screen.Employee.FirstName !== undefined) {
            nominativo = contentItem.screen.Employee.LastName + " " + contentItem.screen.Employee.FirstName;
            contentItem.screen.Employee.Summary = nominativo;
        };
    });
};


myapp.AddEditEmployee.BarCode_render = function (element, contentItem) {
    // Write code here.
    //alert(contentItem.data.Employee.BarCode);
     if (contentItem.data.Employee.BarCode !== null && contentItem.data.Employee.BarCode !== undefined) {
        CreateQRCode(element, contentItem);
    }
};

myapp.AddEditEmployee.Stampa_execute = function (screen) {
    // Write code here.
    PrintElement("Details");
};

myapp.AddEditEmployee.Details_postRender = function (element, contentItem) {
    // Write code here.
    $(element).attr("id", "Details");
};
