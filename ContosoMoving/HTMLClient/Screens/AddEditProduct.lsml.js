/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditProduct.created = function (screen) {
    // Write code here.    
    if (screen.Product.Description !== undefined) {       
        screen.details.displayName = screen.Product.Description;
    };
};

myapp.AddEditProduct.Picture_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 250px; max-height: 250px");
};


myapp.AddEditProduct.Execution_Time_postRender = function (element, contentItem) {
    // Write code here. Product.Execution_Time Product.Execution_Time
    contentItem.dataBind("screen.Product.Tipology", function (newValue) {
        function refresh(newValue) {
            //alert(newValue);
            switch (newValue) {                
                case "Prodotto":                   
                    contentItem.screen.findContentItem("Execution_Time").isVisible = false;
                    contentItem.screen.findContentItem("Unit_of_measure").isVisible = true;
                    contentItem.screen.findContentItem("Product_Brand").isVisible = true;
                    contentItem.screen.findContentItem("Packaging").isVisible = true;
                    contentItem.screen.findContentItem("Price_List").isVisible = true;                    
                    contentItem.screen.findContentItem("Discount").isVisible = true;
                    contentItem.screen.findContentItem("Shipping_Cost").isVisible = true;
                    contentItem.screen.findContentItem("Minimum_stock").isVisible = true;
                    contentItem.screen.findContentItem("Stock").isVisible = true;
                    contentItem.screen.findContentItem("Stock_Value").isVisible = true;
                    contentItem.screen.findContentItem("Conversion_Factor").isVisible = true;
                    break;
                case "Servizio":                    
                    contentItem.screen.findContentItem("Execution_Time").isVisible = true;
                    contentItem.screen.findContentItem("Unit_of_measure").isVisible = false;
                    contentItem.screen.findContentItem("Product_Brand").isVisible = false;
                    contentItem.screen.findContentItem("Packaging").isVisible = false;
                    contentItem.screen.findContentItem("Price_List").isVisible = false;
                    contentItem.screen.findContentItem("Discount").isVisible = false;
                    contentItem.screen.findContentItem("Shipping_Cost").isVisible = false;
                    contentItem.screen.findContentItem("Minimum_stock").isVisible = false;
                    contentItem.screen.findContentItem("Stock").isVisible = false;
                    contentItem.screen.findContentItem("Stock_Value").isVisible = false;
                    contentItem.screen.findContentItem("Conversion_Factor").isVisible = false;
                    break;
                case "Kit":                    
                    contentItem.screen.findContentItem("Execution_Time").isVisible = true;
                    contentItem.screen.findContentItem("Unit_of_measure").isVisible = false;
                    contentItem.screen.findContentItem("Product_Brand").isVisible = false;
                    contentItem.screen.findContentItem("Packaging").isVisible = false;
                    contentItem.screen.findContentItem("Price_List").isVisible = false;
                    contentItem.screen.findContentItem("Discount").isVisible = false;
                    contentItem.screen.findContentItem("Shipping_Cost").isVisible = false;
                    contentItem.screen.findContentItem("Minimum_stock").isVisible = false;
                    contentItem.screen.findContentItem("Stock").isVisible = false;
                    contentItem.screen.findContentItem("Stock_Value").isVisible = false;
                    contentItem.screen.findContentItem("Conversion_Factor").isVisible = false;
            };
        };
        refresh(newValue);
    });
};

myapp.AddEditProduct.Mark_Up_postRender = function (element, contentItem) {
    // Write code here.  //alert("se cambia Prezzo 0 Iva il trasporto o il listino o il costo o il trasporto  definisco il ricarico   refreshMark_Up");
    contentItem.dataBind("screen.Product.Price", function (newValue) {        
        refreshMark_Up();
    });
    contentItem.dataBind("screen.Product.Product_Tax", function (newValue) {
        refreshMark_Up();
    });
    contentItem.dataBind("screen.Product.Cost", function (newValue) {
        refreshMark_Up();
    });
    contentItem.dataBind("screen.Product.Shipping_Cost", function (newValue) {
        refreshMark_Up();
    });
    function refreshMark_Up() {
        //alert("se cambia Prezzo o Iva o il trasporto o il listino  o il costo definisco il ricarico   refreshMark_Up");
        var costo = 0;
        var ricarico = 0;
        if (contentItem.screen.Product.Price > 0 && contentItem.screen.Product.Product_Tax.Value > 0 && contentItem.screen.Product.Cost > 0) {
            if (contentItem.screen.Product.Shipping_Cost > 0) {
                ricarico = (contentItem.screen.Product.Price / (1 + (contentItem.screen.Product.Product_Tax.Value * 1)) / (1 + (contentItem.screen.Product.Shipping_Cost * 1)) / (contentItem.screen.Product.Cost * 1)) - 1;
            } else {
                ricarico = (contentItem.screen.Product.Price / (1 + (contentItem.screen.Product.Product_Tax.Value * 1)) / (contentItem.screen.Product.Cost * 1)) - 1;
            }
        };
        //alert("refreshMark_Up " + ricarico);
        contentItem.screen.Product.Mark_Up = ricarico.toFixed(2);
    };
};
myapp.AddEditProduct.Cost_postRender = function (element, contentItem) {
    // Write code here.   //alert("se cambia lo sconto  definisco il costo   refreshCost");
    contentItem.dataBind("screen.Product.Discount", function (newValue) {  
        refreshCost();
    });
    contentItem.dataBind("screen.Product.Price_List", function (newValue) {
        //refreshMark_Up(element, contentItem);
        refreshCost();
    });
    function refreshCost() {
        var costo = 0;
        //alert("se cambia lo sconto o il listino o il trasporto definisco il costo   refreshCost");
        if (contentItem.screen.Product.Discount > 0 && contentItem.screen.Product.Price_List > 0) {
            costo = (contentItem.screen.Product.Price_List) * (1 - (contentItem.screen.Product.Discount * 1));
            if (contentItem.screen.Product.Shipping_Cost > 0) {
                costo = costo * (1 + (contentItem.screen.Product.Shipping_Cost * 1));
            };
            contentItem.screen.Product.Cost = costo.toFixed(2);
            if (contentItem.screen.Product.Stock !== undefined) {
                contentItem.screen.Product.Stock_Value = (costo * contentItem.screen.Product.Stock).toFixed(2);
            }
        };
    };
};


function refreshPrix(element, contentItem) {
    var prezzo = 0;
    //alert("se cambia il costo o il listino o lo sconto o il trasporto definisco il prezzo  refreshPrix ");
    if (contentItem.screen.Product.Cost !== undefined && contentItem.screen.Product.Shipping_Cost !== undefined && contentItem.screen.Product.Mark_Up !== undefined && contentItem.screen.Product.Product_Tax.Value !== undefined) {
        prezzo = (contentItem.screen.Product.Cost * 1) * (1 + (contentItem.screen.Product.Shipping_Cost * 1)) * (1 + (contentItem.screen.Product.Mark_Up * 1)) * (1 + (contentItem.screen.Product.Product_Tax.Value * 1));
        contentItem.screen.Product.Price = prezzo.toFixed(2);
        contentItem.screen.Product.Point = prezzo.toFixed();
   };    
};

myapp.AddEditProduct.BarCode_render = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    if (entity != undefined) {
        var codiceBarre = $('<div class=""msls-text"><span class="id-element">' + BarCodeDisplay(entity) + '</span></div>');
        codiceBarre.appendTo($(element));
    };
};