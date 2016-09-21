/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.AddEditProduct_Document.created = function (screen) {
    // Write code here.    
    if (screen.Product_Document.Shipping_percentual == undefined && screen.Product_Document.Shipping_percentual == null) {
        screen.Product_Document.Shipping_percentual = 0;
        screen.Product_Document.Shipping_Cost = 0;
    };
    function myTimer(screen) {
        setInterval(function () { calculate(screen); }, 5000);
    }
    var today = new Date();    
    screen.Product_Document.created = today;
    screen.Product_Document.Document_Date = getDay(today, "", -7);
    screen.Product_Document.Payment_Type = "Contanti";
    screen.Product_Document.Deferrals = 0;
    screen.Product_Document.Payment_Number = 1;
    screen.Product_Document.Payment = 0;
}

myapp.AddEditProduct_Document.Supplier_postRender = function (element, contentItem) {
    // Write code here. Product_Document.Supplier.Product_Document.Deferrals, Product_Document.Payment_Number
    contentItem.dataBind("screen.Product_Document.Supplier", function (newValue) {
        if (newValue != null) {
            contentItem.screen.Product_Document.Payment_Type = newValue.Payment_Type;
            contentItem.screen.Product_Document.Deferrals = newValue.Deferrals;
            contentItem.screen.Product_Document.Payment_Number = newValue.Rates;
        };
    });
};


myapp.AddEditProduct_Document.RowTemplate2_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Teal");
};

myapp.AddEditProduct_Document.Cart_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_cart");
};
myapp.AddEditProduct_Document.InventoryTemplate_postRender = function (element, contentItem) {
    // 
    $(element).closest("li").addClass("Color-Teal");
};
myapp.AddEditProduct_Document.Inventory_ItemTap_execute = function (screen) {
    // Add product to collection
    today = new Date();
    var product = screen.Inventory.selectedItem;
    var newOrderItem = new myapp.Order_Item;
    newOrderItem.setProduct_Document(screen.Product_Document);
    newOrderItem.setProduct(product);
    newOrderItem.created = today;
    newOrderItem.Year = today.getFullYear();
    newOrderItem.Month = today.getMonth() + 1;
    newOrderItem.Description = product.Description;
    if (product.Product_Category !== undefined) {
        newOrderItem.Category = product.Product_Category.Description;
    };
    newOrderItem.Price_List = product.Price_List
    newOrderItem.Discount = product.Discount;
    if (product.Discount !== null) {       
        newOrderItem.Cost = (product.Price_List * (1 - product.Discount)).toFixed(2);
    } else {   
        newOrderItem.Cost = (product.Cost * 1).toFixed(2);
    };
    newOrderItem.Quantity_Purchased = product.Packaging;   //Inventory(item).Packaging
    newOrderItem.Quantity = 0;
    newOrderItem.Amount = (newOrderItem.Cost * newOrderItem.Quantity_Purchased).toFixed(2);
    newOrderItem.Shipping_Perc = screen.Product_Document.Shipping_percentual;
    newOrderItem.Vat_perc = product.Product_Tax.Value * 1;
    newOrderItem.Vat = (newOrderItem.Amount * product.Product_Tax.Value).toFixed(2);
    newOrderItem.Total = ((newOrderItem.Amount * 1) + (newOrderItem.Vat * 1)).toFixed(2);
    calculate(screen);   
};

function calculate(screen) {
    //alert("Calculate");
    if (screen.Order_Items !== undefined) {
        if (screen.Order_Items.count > 0) {
            var imp = new Array();
            var iva = new Array();
            var tot = new Array();
            var aliq = new Array();
            var imponibile = 0;
            var costo = 0;
            var iva_importo = 0;
            var trasporto = 0;
            var totale = 0;
            today = new Date();
            var entity = screen.Order_Items;
            var a = 0; var b = 0; var c = 0;
            if (entity.count > 0) {
                var detail = entity.data; // Get the data for the collection passed
                detail.forEach(function (items) {// Add each row to total, imp, iva, aliquota   Order_Item(item).Product.Description            
                    w = items.Vat_perc * 100;
                    aliq[w] = w;
                    if (imp[w] == undefined) {
                        imp[w] = 0;
                        iva[w] = 0;
                        tot[w] = 0;
                    };
                    imp[w] += (items.Quantity_Purchased * items.Cost);
                    a = (items.Quantity_Purchased * items.Cost); //imponibile
                    iva[w] += a * (aliq[w] / 100);
                    b = a * (aliq[w] / 100); //Iva importo
                    //alert("iva" + w + "= \n quantità " + items.Quantity_Purchased + "\n imponibile " + items.Amount + "\n aliquota " + (aliq[w] / 100) + "\n" + (items.Quantity_Purchased * items.Amount * (aliq[w] / 100)));
                    tot[w] += a + b;
                    iva_percentuale = items.Vat * 1;
                    imponibile = (imponibile * 1) + (a * 1);
                    iva_importo = (iva_importo * 1) + (b * 1);
                    totale = (totale * 1) + ((a * 1) + (b * 1));
                });
            };
            //Totale_Imponibile  Totale_Iva   Totale_Documento Product_Document.Taxable_Amount
            screen.Product_Document.Taxable_Amount = imponibile.toFixed(2);
            if (screen.Product_Document.Shipping_Cost > 0) {
                trasporto = screen.Product_Document.Shipping_Cost * 1;
            };
            screen.Product_Document.Vat = iva_importo.toFixed(2);
            screen.Product_Document.Total = (trasporto + totale).toFixed(2);
            screen.Totale_Imponibile = imponibile.toFixed(2) // formatNumber(imponibile, 2, ",", ".");
            screen.Totale_Iva = iva_importo.toFixed(2);  // formatNumber(iva_importo, 2, ",", ".");
            screen.Totale_Documento = (trasporto + totale).toFixed(2); //formatNumber(totale, 2, ",", ".");
        }
    };
}

myapp.AddEditProduct_Document.Delete_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("delete");
};
myapp.AddEditProduct_Document.Delete_Tap_execute = function (screen) {
    // delete product from Order-Items collection
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.getOrder_Items().then(function (Order_Items) {
            Order_Items.deleteSelected();
            calculate(screen);
        });
    }
};
myapp.AddEditProduct_Document.Product_Document_Payment_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Product_Document.Total", function (newValue) {
        if ((contentItem.screen.Product_Document.Deferrals * 1) > 0) {
            contentItem.screen.Product_Document.Payment = 0;
        } else {           
            contentItem.screen.Product_Document.Payment = newValue.toFixed(2);
        }
        contentItem.screen.Product_Document.Taxable_Amount = (newValue / 1.22).toFixed(2);
        contentItem.screen.Product_Document.Vat = (newValue - contentItem.screen.Product_Document.Taxable_Amount).toFixed(2);
    });
};
myapp.AddEditProduct_Document.Product_Document_Payoff_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Product_Document.Payment", function (newValue) {
        contentItem.screen.Product_Document.Payoff = ((contentItem.screen.Product_Document.Total * 1) - (newValue * 1)).toFixed(2);
        calculate(contentItem.screen);
    });
};
myapp.AddEditProduct_Document.Shipping_Cost_postRender = function (element, contentItem) {
    // Write code here. Product_Document.Shipping_percentual  
    contentItem.dataBind("screen.Product_Document.Shipping_percentual", function (newValue) {
        if (newValue > 0) {
            contentItem.screen.Product_Document.Shipping_Cost = (contentItem.screen.Product_Document.Taxable_Amount * newValue);
            calculate(contentItem.screen);
        };
        //contentItem.screen.Product_Document.Vat = ((contentItem.Product_Document.Taxable_Amount + contentItem.screen.Product_Document.Shipping_Cost);
        //contentItem.screen.Product_Document.Total = (contentItem.Product_Document.Taxable_Amount * newValue);
    });
};
myapp.AddEditProduct_Document.Shipping_percentual_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Product_Document.Shipping_Cost", function (newValue) {
        if (newValue > 0) {
            contentItem.screen.Product_Document.Shipping_percentual = (contentItem.screen.Product_Document.Shipping_Cost / contentItem.screen.Product_Document.Taxable_Amount).toFixed(2);
            calculate(contentItem.screen);
        };
        //contentItem.screen.Product_Document.Vat = ((contentItem.Product_Document.Taxable_Amount + contentItem.screen.Product_Document.Shipping_Cost);
        //contentItem.screen.Product_Document.Total = (contentItem.Product_Document.Taxable_Amount * newValue);
    });
};
