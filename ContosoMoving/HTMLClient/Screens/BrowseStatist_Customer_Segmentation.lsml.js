/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Customer_Segmentation.Statist_render = function (element, contentItem) {
    // Write code here.
    createDoughnut(element, contentItem, "Segmentazione clientela");
};
myapp.BrowseStatist_Customer_Segmentation.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Individuiamo la nostra clientela tipo per capire a chi dovremmo dedicare le nostre attenzioni....lavoriamo sulla nostra clientela principale" + '</span></div>');
    txt.appendTo($(element));
};