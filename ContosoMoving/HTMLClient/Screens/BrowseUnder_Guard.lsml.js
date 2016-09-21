/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseUnder_Guard.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};
myapp.BrowseUnder_Guard.Product_render = function (element, contentItem) {
    // Write code here.
    createGrid(element, contentItem);
};