/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseInventory.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
   /* var entity = contentItem.value;
    if (entity.BarCode != undefined) {
        var codiceBarre = $('<div class=""msls-text"><span class="id-element">' + BarCodeDisplay(entity.BarCode) + '</span></div>');
        codiceBarre.appendto($(element));
        
    };*/
};


myapp.BrowseInventory.Product_render = function (element, contentItem) {
    // Write code here.
    createGrid(element, contentItem);
};