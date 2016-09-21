/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditProduct_Service.created = function (screen) {
    // Write code here. Product_Service.Visible
    today = new Date();
    if (screen.Product_Service.Description != undefined) {
        screen.details.displayName = screen.Product_Service.Description;
        if (screen.Product_Service.BarCode == undefined) {
            screen.Product_Service.BarCode = screen.Product_Service.Code;
        }
    } else {
        screen.Product_Service.Execution_Time = 15;
        screen.Product_Service.Visible = true;
        screen.Product_Service.created = today;
        screen.Product_Service.Commission_employee = 0;
        screen.Product_Service.Point = 0;
    };   
};

myapp.AddEditProduct_Service.Picture1_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 350px; max-height: 350px");
    contentItem.dataBind("screen.Product_Service.Picture1", function (newValue) {
        contentItem.screen.closePopup();
    });
};

myapp.AddEditProduct_Service.CategoryAdd_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_new");
};

myapp.AddEditProduct_Service.Price_postRender = function (element, contentItem) {
    // Write code here. Product_Service.Amount  Product_Service.Product_Tax  Product_Service.Product_Tax.Value
    contentItem.dataBind("screen.Product_Service.Amount", function (newValue) {
        if (contentItem.screen.Product_Service.Product_Tax != undefined) {
            var prezzo = 0;
            var iva = 0;
            prezzo = (contentItem.screen.Product_Service.Amount * 1) * (1 + (contentItem.screen.Product_Service.Product_Tax.Value * 1));
            iva = (contentItem.screen.Product_Service.Amount * 1) * (contentItem.screen.Product_Service.Product_Tax.Value * 1);
            contentItem.screen.Product_Service.Vat = iva.toFixed(2);
            contentItem.screen.Product_Service.Price = prezzo.toFixed(2);
        };
    });
};

myapp.AddEditProduct_Service.Vat_perc_postRender = function (element, contentItem) {
    // Write code here. Product_Service.Amount
    contentItem.dataBind("screen.Product_Service.Product_Tax", function (newValue) {
        if (contentItem.screen.Product_Service.Product_Tax != undefined) {
            contentItem.screen.Product_Service.Vat_perc = contentItem.screen.Product_Service.Product_Tax.Value * 1
            if (contentItem.screen.Product_Service.Amount != undefined) {
                prezzo = (contentItem.screen.Product_Service.Amount * 1) * (1 + (contentItem.screen.Product_Service.Product_Tax.Value * 1));
                iva = (contentItem.screen.Product_Service.Amount * 1) * (contentItem.screen.Product_Service.Product_Tax.Value * 1);
                contentItem.screen.Product_Service.Vat = iva.toFixed(2);
                contentItem.screen.Product_Service.Price = prezzo.toFixed(2);
            };
        };                       
    });
};

myapp.AddEditProduct_Service.Print_execute = function (screen) {
    // Write code here.
    window.print();
};

myapp.AddEditProduct_Service.beforeApplyChanges = function (screen) {
    // Write code here. SERVICE=  17 5 16
    var barcode = "17516";
    if (screen.Product_Service.BarCode == undefined) {
        barcode = "17516" & screen.Product_Service.Id;
    } else {
        barcode = screen.Product_Service.BarCode;
    };
    screen.Product_Service.BarCode = CheckBarCode(barcode);
};

myapp.AddEditProduct_Service.Dati_Economici_postRender = function (element, contentItem) {
    // Write code here.
    createAccordion(element, contentItem);
};
myapp.AddEditProduct_Service.AddService_Product_postRender = function (element, contentItem) {
    // Write code here.

};