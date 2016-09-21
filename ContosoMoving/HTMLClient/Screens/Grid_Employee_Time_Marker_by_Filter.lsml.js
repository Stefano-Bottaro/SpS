/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Grid_Employee_Time_Marker_by_Filter.Employee_Time_Marker_render = function (element, contentItem) {
    // Write code here.
    //var itemTemplate = $("<div></div>").attr('id', 'Employee_Time_Marker')

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
    //            pageSettings: { pageSize: 45 },
    //            theme: 'gradientdark',
    //            columns: fieldname
    //        });
    //}
    createGrid(element, contentItem);
}
myapp.Grid_Employee_Time_Marker_by_Filter.created = function (screen) {
    // Write code here.
    var today = new Date();
    screen.Employee_Time_MarkerAnno = today.getFullYear();
    screen.Employee_Time_MarkerMese = today.getMonth() + 1;
};