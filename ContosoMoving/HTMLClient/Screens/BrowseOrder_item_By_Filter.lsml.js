/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseOrder_item_By_Filter.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("backcloth");
};
myapp.BrowseOrder_item_By_Filter.created = function (screen) {
    // Write code here.
    today = new Date();
    screen.Order_ItemYear = today.getFullYear();
    screen.Order_ItemMonth = today.getMonth()+1;
};
myapp.BrowseOrder_item_By_Filter.Order_Item_render = function (element, contentItem) {
    // Write code here. .Month .Product.Description .Order.Document_DataStart .Order.Document_Number .Customer_Name .Employee_Name .Quantity .Price .Total
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
               allowGrouping: false,
               isResponsive: true,
               allowSorting: true,
               allowMultiSorting: true,
               enableResponsiveRow: true,
               allowSelection: true,
               enableRowHover: true,
               enableAltRow: true,
               //locale: "it-IT", 
               pageSettings: { pageSize: 45 },
               allowGrouping: true,
               //groupSettings: { groupedColumns: ["Month"] },
               //summaryRows: [
               //       { title: "Sum", summaryColumns: [{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: "Total", dataMember: "Total",  }] },
               //],
               //allowFiltering: true,
               //filterSettings: { filterType: "excel", maxFilterChoices: 100, enableCaseSensitivity: false },
               //toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.Edit, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Update, ej.Grid.ToolBarItems.Cancel] },
               //editSettings: { allowEditing: true },
               //pageSettings: { pageCount: 3 },
               //.Month .Product.Description .Order.Document_DataStart .Order.Document_Number .Customer_Name .Employee_Name .Quantity .Price .Total
               columns: [ 
                        { field: "Month", headerText: "Mese", width: 60, textAlign: ej.TextAlign.Right,  priority: 1 },
                        { field: "Product.Description", headerText: "Prodotto - Trattamento", width: 200, priority: 1 },              
                        { field: "Order.Document_DataStart", headerText: "Data", width: 100, type: "date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Right, priority: 1 },
                        { field: "Order.Document_Number", headerText: "N.Ricevuta", width: 100, textAlign: ej.TextAlign.Right, priority: 2 },
                        { field: "Customer_Name", headerText: "Cliente", width: 200, priority: 2 },
                        { field: "Employee_Name", headerText: "Collaboratore", width: 150, priority: 2 },
                        { field: "Quantity", headerText: "q.ta", width: 40, textAlign: ej.TextAlign.Right, priority: 3 },
                        { field: "Price", headerText: "Prezzo", width: 80, textAlign: ej.TextAlign.Right,  priority: 3 },  
                        { field: "Total", headerText: "Totale", width: 100, textAlign: ej.TextAlign.Right,  priority: 3 }                        
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

};