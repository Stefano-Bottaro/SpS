/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseServiceByCategory.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    if (entity.BarCode != undefined) {
        var codiceBarre = $('<div class=""msls-text"><span class="id-element">' + BarCodeDisplay(entity.BarCode) + '</span></div>');
        codiceBarre.appendTo($(element));
        //$element = $(element).append(BarCodeDisplay(entity.BarCode));
    }

};