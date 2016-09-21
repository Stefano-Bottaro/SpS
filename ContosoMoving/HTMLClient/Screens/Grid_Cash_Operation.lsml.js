/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Grid_Cash_Operation.Account_List_render = function (element, contentItem) {
    // Write code here.
    //var itemTemplate = $("<div></div>").attr('id', 'Account_List')

    //// Append the div element to screen 
    //itemTemplate.appendTo($(element));    
    //contentItem.value.oncollectionchange = function () {
    //    if (itemTemplate.hasClass('e-grid')) {
    //        itemTemplate.ejGrid('destroy');
    //    }
    //    var first = contentItem.children[0], fieldname = [];
    //    var fields = "";
    //    for (i = 0; i < first.children.length; i++) {
    //        fieldname[i] = { field: first.children[i].valueModel.name };
    //        fields += first.children[i].valueModel.name + "\n";
    //    };       
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
    //            theme: 'gradientdark',
    //            columns: fieldname
    //        });        
    //};
    createGrid(element, contentItem);
}
myapp.Grid_Cash_Operation.created = function (screen) {
    // Write code here. Account_ListData_End
    d1 = new Date();
    d2 = new Date();
    screen.Account_ListData_Start = firstDay(d1);
    screen.Account_ListData_End = d2;
};