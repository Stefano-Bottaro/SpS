/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseGeo_Cities.Country_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_new");
};
myapp.BrowseGeo_Cities.Region_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_new");
};
myapp.BrowseGeo_Cities.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("backcloth");
};