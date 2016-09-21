/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.ViewOrderRicevuta.Print_postRender = function (element, contentItem) {
    // Write code here.
    //window.print();
};
myapp.ViewOrderRicevuta.Order_Item1_render = function (element, contentItem) {
    // Write code here.
    createList(element, contentItem);
    //var itemTemplate = $("<div></div>").attr('id', 'Order_Item1');
    // Append the div element to screen 
    //itemTemplate.appendTo($(element));

    //contentItem.value.oncollectionchange = function () {

    //    if (itemTemplate.hasClass('e-grid')) {
    //        itemTemplate.ejGrid('destroy');
    //    };
    //    var first = contentItem.children[0], fieldname = [];
    //    for (i = 0; i < first.children.length; i++) {
    //        fieldname[i] = { field: first.children[i].valueModel.name };
    //    };

    //    //Rendering the Grid Control
    //    itemTemplate.ejGrid(
    //        {
    //            dataSource: contentItem.value.data,
    //            columns: fieldname
    //        });
    //};
};
