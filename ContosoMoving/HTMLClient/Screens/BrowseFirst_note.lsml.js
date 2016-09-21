/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseFirst_note.created = function (screen) {
    // Write code here.  Account_ListDataStart
    d1 = new Date();
    d2 = new Date();
    screen.Account_ListDataStart = firstDay(d1);
    screen.Account_ListDataEnd = lastDay(d2);
    screen.DataStart = firstDay(d1);
    screen.DataEnd = lastDay(d2);
};

myapp.BrowseFirst_note.RowTemplate_postRender = function (element, contentItem) {
    // Write code here. Color-Orange
    $(element).closest("li").addClass("Color-Teal");
};
myapp.BrowseFirst_note.Account_List_render = function (element, contentItem) {
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
               //First_note(item).Account,First_note(item).Credit,First_note(item).Debit
               columns: [
                             { field: "Year", headerText: "Anno", width: 50 },
                             { field: "Month", headerText: "Mese", width: 50 },
                             { field: "Operation_Date", headerText: "Data", width: 50, type: "date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Right, priority: 1 },                            
                             { field: "Operation_number", headerText: "Protocollo", width: 60,  priority: 1 },
                             { field: "Description", headerText: "Operazione", width: 180, priority: 1 },
                             { field: "Account.Description", headerText: "Conto", width: 80, priority: 2 },
                             { field: "Credit", headerText: "Credito", width: 60, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:C2}" },
                             { field: "Debit", headerText: "Debito", width: 60, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:C2}" }
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
myapp.BrowseFirst_note.Schedule_by_dateTemplate_postRender = function (element, contentItem) {
    // Write code here.    
    var entity = contentItem.value;
    function refresh() {
        var color = "Color-Red";  //debito= #FFB6C1  debito pagato= #F8E0EC    credito= #A9F5BC   credito pagato= #E6F8E0
        if (entity.Credit != undefined && entity.Credit != 0) {
            color = "Color-Green";
            if (entity.Settlement) {
                color = "Color-Teal";
            };
        } else {
            color = "Color-Red";
            if (entity.Settlement) {
                color = "Color-Green";
            };
        }
        $(element).closest("li").addClass(color);
    };
    refresh();
    //Add a change event listener to IsAvailable property   ScadenzarioSaldato
    entity.addChangeListener("Settlement", refresh);
    entity.addChangeListener("Credit", refresh);
    entity.addChangeListener("Debit", refresh);
};

myapp.BrowseFirst_note.Delete_postRender = function (element, contentItem) {
    // Write code here.
    if ((contentItem.screen.BrowseFirst_note.Credit * 1 + contentItem.screen.BrowseFirst_note.Debit * 1) > contentItem.screen.BrowseFirst_note.Settlement * 1) {
        $(element).addClass("delete");
    }
};
myapp.BrowseFirst_note.Payment_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("payment");
};

myapp.BrowseFirst_note.Delete_Tap_execute = function (screen) {
    // Write code here.
    msls.showMessageBox("Sei sicuro di volere proseguire con la cancellazione della Scadenza?", {
        title: "Cancellazione scadenza",
        buttons: msls.MessageBoxButtons.yesNo
    }).then(function (val) {
        if (val == msls.MessageBoxResult.yes) {
            screen.Schedule_by_date.deleteSelected();
            myapp.commitChanges().then(null, function fail(e) {
                var errmsg = screen.Schedule_by_date.Name + e.message;
                myapp.cancelChanges().then(function () {
                    var resp = msls.showMessageBox(errmsg, {
                        title: "ERRORE",
                        buttons: msls.MessageBoxButtons.ok
                    });
                    throw e;
                });
            });
        }
    });
};
myapp.BrowseFirst_note.Payment_Tap_execute = function (screen) {
    // Write code here.
    msls.showMessageBox("Sei sicuro di volere proseguire con il pagamento della Scadenza?", {
        title: "Pagamento scadenza",
        buttons: msls.MessageBoxButtons.yesNo
    }).then(function (val) {
        if (val == msls.MessageBoxResult.yes) {
            var entity = screen.Schedule_by_date.selectedItem;
            if (entity.Credit == null) {
                entity.Credit = 0;
            };
            if (entity.Debit == null) {
                entity.Debit = 0;
            };
            entity.Settlement = Math.abs((entity.Credit * 1) - (entity.Debit * 1));
            // Save changes
            myapp.commitChanges().then(null, function fail(e) {
                var errmsg = screen.Schedule_by_date.Name + e.message;
                myapp.cancelChanges().then(function () {
                    var resp = msls.showMessageBox(errmsg, {
                        title: "ERRORE",
                        buttons: msls.MessageBoxButtons.ok
                    });
                    throw e;
                });

            });
         }
    });
};

