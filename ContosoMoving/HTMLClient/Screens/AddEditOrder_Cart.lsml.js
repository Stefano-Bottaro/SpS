/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditOrder_Cart.created = function (screen) {
    // Write code here.
    var today = new Date();   
    //var myVar = setInterval(function () { myTimer(screen) }, 5000);
    //alert("screen.Order.Document_Date=" + screen.Order.Document_Date);
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
myapp.AddEditOrder_Cart.ProductsTemplate_postRender = function (element, contentItem) {
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
myapp.AddEditOrder_Cart.Products_ItemTap_execute = function (screen) {
    // Write code here.
    today = new Date();
    //alert("Products_ItemTap_execute ");
    var product = screen.Products.selectedItem;
    var newOrderItem = new myapp.Order_Item();
    //var newOrderItem = screen.Order_Item.addNew;
    newOrderItem.setOrder(screen.Order);
    newOrderItem.Description = product.Description;
    newOrderItem.Product= product;
    newOrderItem.created = today;
    newOrderItem.Year = today.getFullYear();
    newOrderItem.Month = today.getMonth() + 1;
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
    //alert(product.Product_Offer.Data_End);
    //verifica se il prodotto ha qualche offerta  per la giornata odierna  *************************************************
    if (product.Product_Offer.array.length > 0) {
        if (product.Product_Offer.Data_End !== undefined && product.Product_Offer.Data_End >= today) {
            alert("Voce in offerta promozionale sconto " + product.Product_Offer.Offer_Discount + " fino al  " + product.Product_Offer.Data_End);
            discount = discount - (product.Product_Offer.Offer_Discount * 1);
        };
    };
    newOrderItem.Price_List = product.Price_List * 1;
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
    if (product.Commission_employee !== undefined && product.Commission_employee !== null) {
        newOrderItem.Commission = (newOrderItem.Amount * product.Commission_employee).toFixed(2);
        //alert("newOrderItem.Commission = " + newOrderItem.Commission);
    } else {
        newOrderItem.Commission = 0;
    };
    //verifica se la fidelity card del cliente ha qualche offerta per la giornata odierna  Fidelity_Cards(item).WeekDay      
    if (screen.Order.Customer !== undefined) {        
        var point = 1;
        //var entity = screen.Order.Customer.    //......Fidelity_Cards;
        //var detail = entity;
        //entity.forEach(function (items) {
        //    //alert("carte fedeltà=" + detail.length);
        //    if (today.getDay() == items.WeekDay) {
        //        point = (point + (items.Increment * 1)).toFixed(2);
        //    };
        //});
        if (product.Point != undefined && product.Point > 0) {
            newOrderItem.Point = (product.Point * point).toFixed(0);
        } else {
            newOrderItem.Point = 0;
        };
    };
    summarize(screen);
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
    var commission = 0.0;
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
            if (items.Point !== undefined && items.Point !== null) {
                punti += items.Point * 1;
            };           
            if (items.Commission !== undefined && items.Commission !== null) {
                commission += (items.Commission * 1);
            };            
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
    screen.Order.Points = punti.toFixed(0);
    screen.Order.Payoff = 0;
    screen.Order.Payment = (screen.Order.Total * 1);
    //screen.Order.elapsed = minuteDiff(today, screen.Order.Document_DataStart);
}
myapp.AddEditOrder_Cart.Products1Template_postRender = function (element, contentItem) {
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
myapp.AddEditOrder_Cart.UpcomingAppointments_ItemTap_execute = function (screen) {
    // Write code here.   
    var appointment = screen.UpcomingAppointments.selectedItem;
    //alert("aggiorno Ordine");
    screen.Order.Appointment = appointment;
    screen.Order.Customer = appointment.Customer;
    screen.Order.Employee = appointment.Employee;
    screen.Order.Sector = appointment.Sector;    
    screen.Order.WorkSpace = appointment.WorkSpace;
    screen.Order.Important = appointment.Important;
    screen.closePopup();
};

myapp.AddEditOrder_Cart.cancella_Tap_execute = function (screen) {
    // Write code here.   
    msls.showMessageBox("Confermi la cancellazione della registrazione selezionata?", {
        title: "Cancellazione Registrazione",
        buttons: msls.MessageBoxButtons.yesNo
    }).then(function (result) {
        if (result === msls.MessageBoxResult.yes) {
            screen.Order_Item.deleteSelected();
            summarize(screen);
        }
        else if (result === msls.MessageBoxResult.no) {
            alert("Operazione annullata");
        }        
    });   
};

myapp.AddEditOrder_Cart.cancella_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("delete");
};

myapp.AddEditOrder_Cart.Important_render = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    if (entity) {
        $(element).addClass("flag-red");
    };
};

myapp.AddEditOrder_Cart.Customer_postRender = function (element, contentItem) {
    // Write code here.      
    contentItem.dataBind("screen.Order.Customer", function (newValue) {
        if (newValue !== undefined) {
            if (newValue.Payment_Type !== undefined) {
                contentItem.screen.Order.Payment_Type = newValue.Payment_Type;
                contentItem.screen.Order.Deferrals = newValue.Deferrals;
                contentItem.screen.Order.Payment_Number = newValue.Payment_Number;
            }
            if (newValue.Age != undefined) {
                contentItem.screen.Order.Age = newValue.Age;
            };            
            if (newValue.Point !== undefined) {
                contentItem.screen.Order.AvailablePoints = newValue.Point;
            } else {
                contentItem.screen.Order.AvailablePoints = 0;
            };
            contentItem.screen.Order.Payment_Point = 0;
           
            if (newValue.Customer_Subscriptions.Credit !== undefined) {
                contentItem.screen.Order.AvailablePrepaid = newValue.Customer_Subscriptions.Credit;
            } else {
                contentItem.screen.Order.AvailablePrepaid = 0;
            };
            contentItem.screen.Order.Payment_Prepayd = 0;
            
            if (contentItem.screen.Order.Total != undefined) {
                contentItem.screen.Order.Payment = (contentItem.screen.Order.Total * 1);
                contentItem.screen.Order.Payoff = 0;
            };
           
            
            if (newValue.Visit_Number == undefined && newValue.Visit_Number == 0) {
                alert("newValue.Visit_Number=" +newValue.Visit_Number);
                contentItem.screen.Order.New_Customer = true;                 //***************************************new Customer
            } else {
               // contentItem.screen.Order.New_Customer = false;
            };
           // alert("cambiato cliente \n AvailablePoints=" + newValue.Point + "\n Order.Deferrals=" + newValue.Deferrals + "\n AvailablePrepaid=" + newValue.Customer_Subscriptions.Credit + "\n Nuovo Cliente=" + contentItem.screen.Order.New_Customer);
        };
    });
};

myapp.AddEditOrder_Cart.Order_Payment_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order.Total", function (newValue) {
        contentItem.screen.Order.Payment = newValue * 1;
    });
};

myapp.AddEditOrder_Cart.Order_Payoff_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order.Payment", function (newValue) {        
            contentItem.screen.Order.Payoff = (contentItem.screen.Order.Total*1) - (newValue*1);
    }); 
};
myapp.AddEditOrder_Cart.ShowAppuntamenti_Tap_execute = function (screen) {
    // Write code here.
  // "popupcreate" rather than "popupbeforeposition"
    $(window).one("Appuntamenti", function (e) {
        $(e.target).popup({
            positionTo: "window"
        });
    });
    screen.showPopup("Appuntamenti");
};

myapp.AddEditOrder_Cart.ShowSK_Teck_Tap_execute = function (screen) {
    // Write code here.  
    if (screen.Customer !== undefined) {
        var cliente = screen.Customer.data;
        alert(cliente.Customer_Name);
    };
};