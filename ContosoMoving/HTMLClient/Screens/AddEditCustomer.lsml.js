/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.AddEditCustomer.created = function (screen) {
    // Write code here. Customer.created Customer.FirstName
    today = new Date();
    var nominativo = "";
    if (screen.Customer.LastName !== undefined && screen.Customer.FirstName !== undefined) {
        nominativo = screen.Customer.FirstName + " " + screen.Customer.LastName;
        screen.details.displayName = nominativo;
    };
    if (screen.Customer.Born_date != null ) {        
        screen.Età = (today.getFullYear() - screen.Customer.Born_date.getFullYear());
    };
    if (screen.Customer.Discount == undefined) {
        screen.Customer.Discount = 0;
    };
    if (screen.Customer.Payment_Type == undefined) {
        screen.Customer.Payment_Type = "Contanti";
    };    
    screen.Customer.Deferrals = 0;
    screen.Customer.Payment_Number = 1;  
    screen.Customer.Summary = nominativo; 
};

myapp.AddEditCustomer.Customer_Picture_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 350px; max-height: 350px");
    contentItem.dataBind("screen.Customer.Picture", function (newValue) {
        contentItem.screen.closePopup();
    });
};
myapp.AddEditCustomer.Customer_Attachment_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 350px; max-height: 350px");
    contentItem.dataBind("screen.Customer.Attachment", function (newValue) {
        contentItem.screen.closePopup();
    });
};
myapp.AddEditCustomer.PostalCode_postRender = function (element, contentItem) {
    // Write code here. screen.Customer.Geo_City.Cap
    contentItem.dataBind("screen.Customer.Geo_City", function (newValue) {        
        if (contentItem.screen.Customer.Geo_City != undefined) {
            contentItem.screen.Customer.PostalCode = contentItem.screen.Customer.Geo_City.Cap;
        };
    });
};



myapp.AddEditCustomer.Customer_Summary_postRender = function (element, contentItem) {
    // Write code here.
    var nominativo = "";
    contentItem.dataBind("screen.Customer.LastName", function (newValue) {
        if (contentItem.screen.Customer.LastName != undefined && contentItem.screen.Customer.FirstName != undefined) {
            nominativo = contentItem.screen.Customer.LastName + " " + contentItem.screen.Customer.FirstName;            
            contentItem.screen.Customer.Summary = nominativo;
            if (contentItem.screen.Customer.Email == undefined) {
                mail = contentItem.screen.Customer.LastName + "." + contentItem.screen.Customer.FirstName + "@gmail.com";
                contentItem.screen.Customer.Email = mail.toLowerCase();
            };
        };
    });
    contentItem.dataBind("screen.Customer.FirstName", function (newValue) {
        if (contentItem.screen.Customer.LastName != undefined && contentItem.screen.Customer.FirstName != undefined) {
            nominativo = contentItem.screen.Customer.LastName + " " + contentItem.screen.Customer.FirstName;           
            contentItem.screen.Customer.Summary = nominativo;
            if (contentItem.screen.Customer.Email == undefined) {
                mail = contentItem.screen.Customer.LastName + "." + contentItem.screen.Customer.FirstName + "@gmail.com";                
                contentItem.screen.Customer.Email = mail.toLowerCase();
            };
        };
    });
};

myapp.AddEditCustomer.beforeApplyChanges = function (screen) {
    // Write code here check barcode lenght and checkdigit  Customer = 3 21 19
    //var barcode = "32119";  //inserimento fatto lato ApplicationDataService
    //if (screen.Customer.Id != undefined) {
    //    if (screen.Customer.BarCode === undefined ) {
    //        barcode += screen.Customer.Id;
    //    };
    //} else {
    //    if (screen.Customer.BarCode !== undefined && parseInt(screen.Customer.BarCode) > 0) {
    //        barcode += screen.Customer.BarCode;
    //    };
    //};
    if (screen.Customer.BarCode !== undefined && screen.Customer.BarCode !== null) {
      screen.Customer.BarCode = CheckBarCode(screen.Customer.BarCode);
    }    
};


myapp.AddEditCustomer.BarCode_render = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    //if (entity != undefined) {
    //    var codiceBarre = $('<div class=""msls-text"><span class="id-element">' + BarCodeDisplay(entity) + '</span></div>');
    //    codiceBarre.appendTo($(element));
    //};
    if (contentItem.value !== undefined && contentItem.value !== null) {
        CreateQRCode(element, contentItem);
    };
};
myapp.AddEditCustomer.OrderTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};
myapp.AddEditCustomer.twitter_render = function (element, contentItem) {
    // Write code here.
    $(element).addClass("twitter-icon");
};
myapp.AddEditCustomer.facebook_render = function (element, contentItem) {
    // Write code here.
    $(element).addClass("facebook-icon");
};
myapp.AddEditCustomer.linkedIn_render = function (element, contentItem) {
    // Write code here.
    $(element).addClass("linkedin-icon");
};
myapp.AddEditCustomer.RowTemplate7_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};


myapp.AddEditCustomer.Order_render = function (element, contentItem) {
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
                             { field: "Year", headerText: "Anno", width: 50 },
                             { field: "Month", headerText: "Mese", width: 50 },
                             { field: "Document_Date", headerText: "Data", width: 50, type: "date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Right, priority: 1 },
                             { field: "Customer_Name", headerText: "Cliente", width: 100, priority: 1 },
                             { field: "Document_Number", headerText: "Ricevuta", width: 80, textAlign: ej.TextAlign.Right, priority: 1 },
                             { field: "Employee_Name", headerText: "Collaboratore", width: 100, priority: 2 },
                             { field: "Sector.Description", headerText: "Settore", width: 70, priority: 2 },
                             { field: "WorkSpace.Description", headerText: "Sala", width: 70, priority: 2 },
                             { field: "Points", headerText: "Punti", width: 50, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:n2}" },
                             { field: "Commission", headerText: "Commissione", width: 80, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:c2}" },
                             { field: "Total", headerText: "Total", width: 80, textAlign: ej.TextAlign.Right, priority: 3, format: "{0:c2}" }
                             
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

myapp.AddEditCustomer.FirstName_postRender = function (element, contentItem) {
    // Write code here. x-webkit-speech data-role="none"
    $(element).attr("x-webkit-speech", "x-webkit-speech");   
};
