/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseOrder_By_Date.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("backcloth");
};
myapp.BrowseOrder_By_Date.created = function (screen) {
    // Write code here.
    d1 = new Date();
    d2 = new Date();
    screen.OrderStartDate1 = firstDay(d1);
    screen.OrderEndDate1 = d2;
};

myapp.BrowseOrder_By_Date.Order_render = function (element, contentItem) {
    // Write code here. Document_Date, Customer.Summary,Document_Number, Employee.Summary,Total   
    var itemTemplate = $("<div style='margin-right:15px'></div>").attr('id', contentItem.name)
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
               allowGrouping: true,             
               isResponsive: true,
               allowSorting: true,
               allowMultiSorting: true,
               enableResponsiveRow: true,
               allowSelection: true,
               allowScrolling: true,
               enableRowHover: true,
               enableAltRow: true,
               allowResizeToFit: true,
               enableHeaderHover: true,
               enableResponsiveRow: true,
               locale: "it-IT",                
               pageSettings: { pageCount: 1, currentPage: 1, pageSize: 45 },
               scrollSettings: { width: 0, height: 300, allowVirtualScrolling: true },
               allowFiltering: true,
               filterSettings: { filterType: "excel", maxFilterChoices: 100, enableCaseSensitivity: false },
               //toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.Edit, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Update, ej.Grid.ToolBarItems.Cancel] },
               //editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },   
               //groupSettings: { groupedColumns: ["Document_Number"] },               
               columns: [
                             { field: "Year", headerText: "Anno", width: 45 },
                             { field: "Month", headerText: "Mese", width: 45 },
                             { field: "Document_Date", headerText: "Data", width: 45, type: "date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Right, priority: 1 },
                             { field: "Customer_Name", headerText: "Cliente", width: 130, priority: 1 },
                             { field: "Document_Number", headerText: "Ricevuta", width: 60, textAlign: ej.TextAlign.Right, priority: 1 },
                             { field: "Employee_Name", headerText: "Collaboratore", width: 85, priority: 2 },
                             { field: "Sector.Description", headerText: "Settore", width: 60, priority: 2 },
                             { field: "WorkSpace.Description", headerText: "Sala", width: 60, priority: 2 },
                             { field: "Total", headerText: "Totale", width: 60, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:C2}" },
                             { field: "Commission", headerText: "Commiss.", width: 60, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:C2}" }
               ],
               toolbarClick: function (e) {                   
                   var gridObj = $("#" + contentItem.name).ejGrid('instance');
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
    //createGrid(element, contentItem);
};

myapp.BrowseOrder_By_Date.Sector_postRender = function (element, contentItem) {
    // Write code here.
    $(element).append(contentItem.screen.Order_By_Date.Sector.Description);
};
