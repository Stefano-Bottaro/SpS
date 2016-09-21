/// <reference path="../GeneratedArtifacts/viewModel.js" />



myapp.BrowseProduct.Product_CategoriesTemplate_postRender = function (element, contentItem) {
    // Write code here.   
    var entity = contentItem.data;
    function refresh() {
        var color = entity.Color;
        if (color == undefined && color == null) {
            color = "Color-Teal";
        };       
        $(element).closest("li").addClass(color);   
    };
    refresh();  
};
myapp.BrowseProduct.Inventory_render = function (element, contentItem) {
    // Write code here.
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
                             { field: "Product_Category.Description", headerText: "Area", width: 100, priority: 1 },
                             { field: "Product_Brand.Description", headerText: "Marchio", width: 100, priority: 1 },
                             { field: "Code", headerText: "Codice", width: 70, priority: 1 },
                             { field: "Description", headerText: "Descrizione", width: 120, priority: 1 },
                             { field: "Unit_of_measure", headerText: "U.m.", width: 30, priority: 1 },
                             { field: "Packaging", headerText: "Imballo", width: 50, priority: 1 },
                             { field: "Cost", headerText: "Costo", width: 80, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:c2}" }, { field: "Stock", headerText: "Punti", width: 50, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:n2}" },
                             { field: "Stock", headerText: "Scorta", width: 50, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:n2}" },
                             { field: "Stock_Value", headerText: "Valore", width: 80, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:c2}" }

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
    };
};
myapp.BrowseProduct.Product_OffersTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};

myapp.BrowseProduct.Volume_Sold_render = function (element, contentItem) {
    // Write code here.
    createGauge(element, contentItem, 200);
}
myapp.BrowseProduct.Under_Guard_render = function (element, contentItem) {
    // Write code here.
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
               //groupSettings: { groupedColumns: ["Product_Brand.Description"] },
               columns: [
                             { field: "Product_Brand.Description", headerText: "Marchio", width: 80, priority: 1 },
                             { field: "Product_Category.Description", headerText: "Area", width: 70, priority: 1 },
                             { field: "Code", headerText: "Codice", width: 60, priority: 1 },
                             { field: "Description", headerText: "Descrizione", width: 130, priority: 1 },
                             { field: "Unit_of_measure", headerText: "U.m.", width: 40, priority: 1 },
                             { field: "Packaging", headerText: "Imballo", width: 60, textAlign: ej.TextAlign.Right, priority: 1 },
                             { field: "Cost", headerText: "Costo", width: 50, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:c2}" }, { field: "Stock", headerText: "Punti", width: 50, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:n2}" },
                             { field: "Stock", headerText: "Scorta", width: 60, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:n2}" },
                             { field: "Minimum_stock", headerText: "Scorta min.", width: 60, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:n2}" },
                             { field: "To_order", headerText: "da Ordinare", width: 60, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:n2}" },
                             { field: "Stock_Value", headerText: "Valore", width: 70, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:c2}" }
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
    };
};
myapp.BrowseProduct.helpProdotti_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class="msls-text"><span class="id-element">' + "L'anagrafica Prodotti permette di memorizzare le informazioni fondamentali dei nostri prodotti o servizi , selezionando le aree di listino si filtrano i risultati di ricerca per un accesso facile ed immediato, la selezione di un risultato di ricerca permette l'accesso all'anagrafica..." + '</span></div>');
    txt.appendTo($(element));
};
myapp.BrowseProduct.helpProdotti_Tap_execute = function (screen) {
    // Write code here.
    screen.showPopup("helpProdotti");
    var text = "L'anagrafica prodotti permette di memorizzare le informazioni fondamentali dei nostri prodotti o servizi , selezionando le aree di listino si filtrano i risultati di ricerca per un accesso facile ed immediato, la selezione di un risultato di ricerca permette l'accesso all'anagrafica...";
    text2speech(text);    
};
