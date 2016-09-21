/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditProduct_Category.Print_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditProduct_Category.created = function (screen) {
    // Write code here.
    if (screen.Product_Category.Description != undefined) {      
        screen.details.displayName = screen.Product_Category.Description;
    };
};
myapp.AddEditProduct_Category.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};
myapp.AddEditProduct_Category.Product_Category_Foto_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 300px; max-height: 300px");
    contentItem.dataBind("screen.Product_Category.Foto", function (newValue) {
    contentItem.screen.closePopup();
    });
};