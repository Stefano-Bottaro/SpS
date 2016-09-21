/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.AddEditOrder.created = function (screen) {
    // Write code here.   Order.Document_Date   
    var today = new Date();
    var myVar = setInterval(function () { myTimer(screen) }, 5000);    
    if (screen.Order.Document_Number == undefined && screen.Order.Document_Number == null) {
        screen.Order.Document_Date = today;
        screen.Order.Document_DataStart = today;
        screen.Order.Year = today.getFullYear();
        screen.Order.Month = today.getMonth() + 1;
        screen.Order.Payment_Type = "Contanti";
        screen.Order.Deferrals = 0;       
        screen.Order.Payment_Number = 1;       
    };
};
myapp.AddEditOrder.Cliente_postRender = function (element, contentItem) {
    // Write code here.
    $(element).attr("id", "ricevuta");
};
myapp.AddEditOrder.ProductsTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;   
    function refresh() {
        var color = entity.Product_Category.Color;
        if (color == undefined && color == null) {
            color = "Color-Teal";
        };      
        $(element).closest("li").addClass(color);      
    };
    refresh();
};
myapp.AddEditOrder.Cancella_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("delete");
};
myapp.AddEditOrder.Payment_postRender = function (element, contentItem) {
    // Write code here. Order.Payoff
    contentItem.dataBind("screen.Order.Total", function (newValue) {        
        contentItem.screen.Order.Payment = newValue*1;        
    });
};
myapp.AddEditOrder.Payoff_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order.Payment", function (newValue) {        
        contentItem.screen.Order.Payoff = (contentItem.screen.Order.Total*1) - (newValue*1);
    });   
};
myapp.AddEditOrder.Customer_postRender = function (element, contentItem) {
    // Write code here.    contentItem.screen.Order.Employee.LastName + " " + contentItem.screen.Order.Employee.FirstName;
  
    contentItem.dataBind("screen.Order.Customer", function (newValue) {        
        if (newValue !== undefined) {
            if (newValue.Payment_Type !== undefined){
                contentItem.screen.Order.Payment_Type = newValue.Payment_Type;
                contentItem.screen.Order.Deferrals = newValue.Deferrals;
                contentItem.screen.Order.Payment_Number = newValue.Payment_Number;   
            }
            if (newValue.Age != undefined) {
                contentItem.screen.Order.Age = newValue.Age;
            };
            //alert("AddEditOrder.Customer_postRender contentItem.screen.Order.AvailablePoints =" + newValue.Point);
            if (newValue.Point !== undefined) {
                contentItem.screen.Order.AvailablePoints = newValue.Point;
            } else {
                contentItem.screen.Order.AvailablePoints = 0;
            };
            contentItem.screen.Order.Payment_Point = 0;            
            //alert("newValue.Customer_Subscriptions.Credit=" + newValue.Customer_Subscriptions.Credit);
            if (newValue.Customer_Subscriptions.Credit !== undefined) {
                contentItem.screen.Order.AvailablePrepaid = newValue.Customer_Subscriptions.Credit;
            } else {
                contentItem.screen.Order.AvailablePrepaid = 0;
            };
            contentItem.screen.Order.Payment_Prepayd = 0;
            contentItem.screen.Order.Payoff = 0;
            contentItem.screen.Order.Payment = (contentItem.screen.Order.Total * 1);
            //alert("visit number=" + newValue.Visit_Number);
            if (newValue.Visit_Number == undefined && newValue.Visit_Number == 0) {
                contentItem.screen.Order.New_Customer = true;                 //***************************************new Customer
            } else {
                contentItem.screen.Order.New_Customer = false;
            };            
            alert("cambiato cliente \n AvailablePoints=" + newValue.Point + "\n Order.Deferrals=" + newValue.Deferrals + "\n AvailablePrepaid=" + newValue.Customer_Subscriptions.Credit + "\n Nuovo Cliente=" + contentItem.screen.Order.New_Customer);
        };
    });
};

myapp.AddEditOrder.Products_ItemTap_execute = function (screen) {
    // Write code here.
    today = new Date();
    //alert("Products_ItemTap_execute ");
    var product = screen.Products.selectedItem;
    var order = screen.Order;
    var newOrderItem = new myapp.Order_Item();
    newOrderItem.setOrder(order.Id);
    newOrderItem.setProduct(product.Id);
    newOrderItem.created = today;
    newOrderItem.Year = today.getFullYear();
    newOrderItem.Month = today.getMonth() + 1;
    newOrderItem.Description = product.Description;
    if (product.Product_Category !== undefined) {
        newOrderItem.Category = product.Product_Category.Description;
    };
    //verifica se customer ha qualche sconto associato
    var discount = 1;
    if (screen.Order.Customer !== undefined) {
        newOrderItem.Customer_Name = screen.Order.Customer.LastName + " " + screen.Order.Customer.FirstName;
        //alert("verifica se customer ha qualche sconto associato " + screen.Order.Customer.Discount);
        newOrderItem.Discount = screen.Order.Customer.Discount * 1;
        discount = discount - (screen.Order.Customer.Discount * 1);

    };
    if (screen.Order.Employee !== undefined) {
        newOrderItem.Employee_Name = screen.Order.Employee.LastName + " " + screen.Order.Employee.FirstName;
    };
    newOrderItem.Price_List = product.Price_List * 1;
    //alert(product.Product_Offer.Data_End);
    //verifica se il prodotto ha qualche offerta  per la giornata odierna  ****************************************essebi da modificare
    if (product.Product_Offer.array.length > 0) {
        if (product.Product_Offer.Data_End !== undefined && product.Product_Offer.Data_End >= today) {
            alert("Voce in offerta promozionale sconto " + product.Product_Offer.Offer_Discount + " fino al  " + product.Product_Offer.Data_End);
            discount = discount - (product.Product_Offer.Offer_Discount * 1);
        };
    };
    newOrderItem.Price = (product.Price * discount).toFixed(2);
    //alert("newOrderItem.Price = " + newOrderItem.Price);
    newOrderItem.Cost = (product.Cost * 1).toFixed(2);
    newOrderItem.Quantity = 1;
    newOrderItem.Quantity_Purchased = 0;
    newOrderItem.Amount = (newOrderItem.Price / (1 + (product.Product_Tax.Value * 1)) * newOrderItem.Quantity).toFixed(2);
    newOrderItem.Shipping_Perc = 0;
    newOrderItem.Shipping_Value = 0;
    newOrderItem.Vat_perc = product.Product_Tax.Value * 1;
    newOrderItem.Vat = (newOrderItem.Amount * product.Product_Tax.Value * newOrderItem.Quantity).toFixed(2);
    //alert("newOrderItem.Vat = " + newOrderItem.Vat);   
    newOrderItem.Total = ((newOrderItem.Amount * 1) + (newOrderItem.Vat * 1)).toFixed(2);
    //alert("newOrderItem.Total = " + newOrderItem.Total);
    if (product.Commission_employee !== undefined && product.Commission_employee !== null && product.Commission_employee > 0) {
        newOrderItem.Commission = (newOrderItem.Amount * product.Commission_employee).toFixed(2);
        //alert("newOrderItem.Commission = " + newOrderItem.Commission);
    };
    //verifica se la fidelity card del cliente ha qualche offerta per la giornata odierna  Fidelity_Cards(item).WeekDay      
    //if (screen.Order.Customer !== undefined) {
    //    var entity = screen.Order.Customer.    //......Fidelity_Cards;
    //    //var detail = entity;
    //    var point = 1;
    //    entity.forEach(function (items) {
    //        //alert("carte fedeltà=" + detail.length);
    //        if (today.getDay() == items.WeekDay) {
    //            point = (point + (items.Increment * 1)).toFixed(2);
    //        };
    //    });
    //    if (product.Point != undefined && product.Point > 0) {
    //        newOrderItem.Point = (product.Point * point).toFixed();
    //    };
    //};

    summarize(screen);
};
myapp.AddEditOrder.Stampa_execute = function (screen) {
    // Write code here.
    PrintElement("ricevuta");
};
myapp.AddEditOrder.Cancella_Tap_execute = function (screen) {
    // Write code here. Order_Item(item).Total
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.Order_Item.deleteSelected();
        summarize(screen);
    }
};
function summarize(screen) {
    //alert("summarize");
    var imp = new Array();
    var iva = new Array();
    var tot = new Array();
    var aliq = new Array();
    var imponibile = 0;
    var costo = 0;
    var iva_importo = 0;
    var commission = 0;
    var totale = 0;
    var punti = 0;
    today = new Date();
    var entity = screen.Order_Item;
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
            imp[w] += (items.Quantity * items.Amount);
            a = (items.Quantity * items.Amount); //imponibile
            iva[w] += a * (aliq[w] / 100);
            b = a * (aliq[w] / 100); //Iva importo
            //alert("iva= " + w + "\n quantità=" + items.Quantity + "\n imponibile=" + items.Amount + "\n aliquota=" + (aliq[w] / 100) + "\n Totale=" + (items.Quantity * items.Amount * (aliq[w] / 100)));
            tot[w] += a + b;
            punti += items.Point * 1;
            commission += (items.Commission * 1);
            iva_percentuale = items.Vat * 1;
            imponibile = (imponibile * 1) + (a * 1);
            iva_importo = (iva_importo * 1) + (b * 1);
            totale = (totale * 1) + ((a * 1) + (b * 1));
        });
    };
    screen.Order.Commission = commission.toFixed(2);
    screen.Order.Amount = imponibile.toFixed(2);
    screen.Order.Vat = iva_importo.toFixed(2);
    screen.Order.Total = totale.toFixed(2);
    //screen.Totale_Imponibile = imponibile.toFixed(2) // formatNumber(imponibile, 2, ",", ".");
    //screen.Totale_Iva = iva_importo.toFixed(2);  // formatNumber(iva_importo, 2, ",", ".");
    //screen.Totale_Documento = (totale).toFixed(2); //formatNumber(totale, 2, ",", ".");
    screen.Order.Points = punti.toFixed();
    screen.Order.Payoff = 0;
    screen.Order.Payment = (screen.Order.Total * 1);
    screen.Order.elapsed = minuteDiff(today, screen.Order.Document_DataStart);
}
function myTimer(screen) {
    //alert("myTimer");   
    summarize(screen);
};

