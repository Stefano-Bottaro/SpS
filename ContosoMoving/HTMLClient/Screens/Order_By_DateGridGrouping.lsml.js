/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Order_By_DateGridGrouping.Order_render = function (element, contentItem) {
    // Write code here.
    var itemTemplate = $("<div style='margin-right:15px'></div>").attr('id', 'Order')
    var style = $("<style></style>").html(".e-grid.e-responsive .e-pager .e-pagercontainer { min-width:195 }")
    // Append the div element to screen 
    itemTemplate.appendTo($(element));
    style.appendTo($(element));
    contentItem.value.oncollectionchange = function () {

        if (itemTemplate.hasClass('e-grid')) {
            itemTemplate.ejGrid('destroy');
        }
        var first = contentItem.children[0], fieldname = [];
        for (i = 0; i < first.children.length; i++) {
            fieldname[i] = { field: first.children[i].valueModel.name };
        }
        var dataManger = ej.DataManager({ json: contentItem.value.data, });
        //Rendering the Grid Control       
        itemTemplate.ejGrid(
           {
               dataSource: dataManger,
               allowPaging: true,
               allowFiltering: true,
               filterSettings: { filterType: "excel", maxFilterChoices: 100, enableCaseSensitivity: false },
               allowGrouping: false,
               isResponsive: true,
               allowSorting: true,
               allowMultiSorting: true,
               enableResponsiveRow: true,
               allowSelection: true,
               enableRowHover: true,
               enableAltRow: true,
               pageSettings: { pageSize: 45 },
               //toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.Edit, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Update, ej.Grid.ToolBarItems.Cancel] },
               //editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
               //editSettings: { allowEditing: true },
               //Document_Date, Customer, Document_Number, Employee, Total
               //groupSettings: { groupedColumns: ["Document_Number"] },
               //pageSettings: { pageCount: 3 },
               columns: [
                             { field: "Document_Date", headerText: "Data", width: 100, type: "date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Right, priority: 1 },
                             { field: "Customer.Summary", headerText: "Cliente", width: 200, priority: 1 },
                             { field: "Document_Number", headerText: "N.Ricevuta", width: 100, textAlign: ej.TextAlign.Right, priority: 1 },
                             { field: "Employee.Summary", headerText: "Collaboratore", width: 200, priority: 2 },
                             { field: "Total", headerText: "Total", width: 100, textAlign: ej.TextAlign.Right, format: "{0:C2}", priority: 3 }
               ],
               toolbarClick: function (e) {
                   var gridObj = $("#Order").ejGrid('instance')
                   gridObj.exportGrid = gridObj["export"];
                   if (e.itemName == "Excel Export") {
                       gridObj.exportGrid('../api/GridExporting/ExcelExport')
                       e.cancel = true;
                   }
                   else if (e.itemName == "Word Export") {
                       gridObj.exportGrid('../api/GridExporting/WordExport')
                       e.cancel = true;
                   }
                   else if (e.itemName == "PDF Export") {
                       gridObj.exportGrid('../api/GridExporting/PdfExport')
                       e.cancel = true;
                   }
               },
               toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.PdfExport] }
           });
    }
}
myapp.Order_By_DateGridGrouping.RowTemplate_render = function (element, contentItem) {
    // Write code here.
    h = getJsonHeader(element, contentItem);
    b = getJsonBody(element, contentItem);
};
function getJsonHeader(element, contentItem) {
    var first = contentItem.children[0], fieldname = [];
    for (i = 0; i < first.children.length; i++) {
        fieldname[i] = { field: first.children[i].valueModel.name };
    }
}
function getJsonBody(element, contentItem){
}

function getJsonAppointment(contentItem){
    var header = contentItem.children[0], fieldname = [];
    var rows = contentItem.value.data;
    vJson='group: {resources: ["Sector", "WorkSpace"]},';
    for (y = 0; y < rows.length; y++) {
        for (x = 0; x < rows.children.length; x++) {
            vJson+='resources: [{ field: "' & rows.children[x].valueModel.name & '",';
            vJson+='title. "' & rows.children[x].valueModel.name & '",';
            vJson+='name. "' & rows.children[x].valueModel.name & '",  allowMultiple: false,';
            vJson+='resourceSettings: { dataSource: [{ text: "';
        };
        
    }   
}

