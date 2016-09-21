/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Grid_AccountByNameGrid.Account_render = function (element, contentItem) {
    // Write code here.
    //var itemTemplate = $("<div></div>").attr('id', 'Account')

    //// Append the div element to screen 
    //itemTemplate.appendTo($(element));

    //contentItem.value.oncollectionchange = function () {

    //    if (itemTemplate.hasClass('e-grid')) {
    //        itemTemplate.ejGrid('destroy');
    //    }
    //    var first = contentItem.children[0], fieldname=[];
    //    for (i = 0; i < first.children.length; i++) {
    //        fieldname[i] = { field: first.children[i].valueModel.name };
    //    }
    //    var dataManger = ej.DataManager({ json: contentItem.value.data, });
    //    //Rendering the Grid Control
    //    itemTemplate.ejGrid(
    //        {
    //            dataSource: dataManger,
    //            allowPaging: true,
    //            allowGrouping: true,
    //            isResponsive: true,
    //            allowSorting: true,
    //            allowMultiSorting: true,
    //            enableResponsiveRow: true,
    //            allowSelection: true,
    //            enableRowHover: true,
    //            enableAltRow: true,
    //            locale: "it-IT",            
    //            columns: fieldname
    //        });
    //}
    createGrid(element, contentItem);
}