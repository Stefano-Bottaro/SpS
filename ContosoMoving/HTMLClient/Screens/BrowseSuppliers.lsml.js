/// <reference path="../GeneratedArtifacts/viewModel.js" />


myapp.BrowseSuppliers.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};
myapp.BrowseSuppliers.AgentsTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};
myapp.BrowseSuppliers.ProductDocumentByFilterTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};
myapp.BrowseSuppliers.created = function (screen) {
    // Write code here.
    screen.SupplierName = "";
};