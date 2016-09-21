myapp.AddEditOrder_Item.created = function (screen) {
    // Write code here. screen.Customer.LastName
    
    if ((screen.Order_Item.Quantity_Purchased * 1) > 0) {  // se documento di carico
        //alert("AddEditOrder_Item - Carico Magazzino");
        screen.details.displayName = "Scheda Carico Prodotto";
        screen.findContentItem("Order").isVisible = false;
        screen.findContentItem("Quantity").isVisible = false;
        screen.findContentItem("Price").isVisible = false;
        screen.findContentItem("Point").isVisible = false;
        screen.findContentItem("Commission").isVisible = false;
    //} else {
    //    //alert("AddEditOrder_Item - Scarico Magazzino");// se documento di scarico
    //    screen.details.displayName = "Scheda di vendita";
    //    screen.findContentItem("Cost").isVisible = false;
    //    alert("Fase 1");        
    //    screen.findContentItem("Product_Document").isVisible = false;
    //    alert("Fase 2");
    //    screen.findContentItem("Quantity_Purchased").isVisible = false;
    //    alert("Fase 3");
    //    screen.findContentItem("Shipping_Perc").isVisible = false;
    //    alert("Fase 4");
    //    screen.findContentItem("Shipping_Value").isVisible = false;
    //    alert("Fase 5");
    //    screen.findContentItem("Amount").isVisible = false;
    };
};

myapp.AddEditOrder_Item.Amount_postRender = function (element, contentItem) {
    // Write code here.   
    //contentItem.dataBind("screen.Order_Item.Product", function (newValue) {
    //    if (contentItem.screen.Order_Item.Product != null && contentItem.screen.Order_Item.Product != undefined) {
    //        refresh(contentItem);
    //    };        
    //});

    contentItem.dataBind("screen.Order_Item.Price_List", function (newValue) {
        if (contentItem.screen.Order_Item.Price_List != null && contentItem.screen.Order_Item.Price_List != undefined) {
            contentItem.screen.Order_Item.Cost = (newValue * (1 - contentItem.screen.Order_Item.Discount)).toFixed(2);
            contentItem.screen.Order_Item.Amount = (contentItem.screen.Order_Item.Cost * contentItem.screen.Order_Item.Quantity_Purchased).toFixed(2);
            contentItem.screen.Order_Item.Vat = (contentItem.screen.Order_Item.Amount * contentItem.screen.Order_Item.Vat_perc).toFixed(2);
            contentItem.screen.Order_Item.Total = (contentItem.screen.Order_Item.Amount * 1) + (contentItem.screen.Order_Item.Vat * 1);
        };
    });
  
    contentItem.dataBind("screen.Order_Item.Discount", function (newValue) {
        if (contentItem.screen.Order_Item.Discount != null && contentItem.screen.Order_Item.Discount != undefined) {
            contentItem.screen.Order_Item.Cost = (contentItem.screen.Order_Item.Price_List * (1 - newValue)).toFixed(2);
            contentItem.screen.Order_Item.Amount = (contentItem.screen.Order_Item.Cost * contentItem.screen.Order_Item.Quantity_Purchased).toFixed(2);
            contentItem.screen.Order_Item.Vat = (contentItem.screen.Order_Item.Amount * contentItem.screen.Order_Item.Vat_perc).toFixed(2);
            contentItem.screen.Order_Item.Total = (contentItem.screen.Order_Item.Amount * 1) + (contentItem.screen.Order_Item.Vat * 1);
        };
    });
    contentItem.dataBind("screen.Order_Item.Cost", function (newValue) {
        if (contentItem.screen.Order_Item.Cost != null && contentItem.screen.Order_Item.Cost != undefined) {
            contentItem.screen.Order_Item.Amount = (newValue * contentItem.screen.Order_Item.Quantity_Purchased).toFixed(2);
            contentItem.screen.Order_Item.Vat = (contentItem.screen.Order_Item.Amount * contentItem.screen.Order_Item.Vat_perc).toFixed(2);
            contentItem.screen.Order_Item.Total = (contentItem.screen.Order_Item.Amount * 1) + (contentItem.screen.Order_Item.Vat * 1);
            contentItem.screen.Order_Item.Discount = (1-(contentItem.screen.Order_Item.Cost / contentItem.screen.Order_Item.Price_List)).toFixed(3);
        };
    });
    contentItem.dataBind("screen.Order_Item.Quantity_Purchased", function (newValue) {
        if (contentItem.screen.Order_Item.Quantity_Purchased !== null && contentItem.screen.Order_Item.Quantity_Purchased !== undefined) {  
            contentItem.screen.Order_Item.Amount = (contentItem.screen.Order_Item.Cost * newValue).toFixed(2);
            contentItem.screen.Order_Item.Vat = (contentItem.screen.Order_Item.Amount * contentItem.screen.Order_Item.Vat_perc).toFixed(2);
            contentItem.screen.Order_Item.Total = (contentItem.screen.Order_Item.Amount*1) + (contentItem.screen.Order_Item.Vat*1);
        };
    });
};


function refresh(contentItem) {
    //alert("refresh fase 0");
    var costo = 0;
    var ricarico = 0;
    var listino = 0;
    var qta = 0;
    var sconto = 0.0;
    var trasporto = 0.0;
    //switch (tipo) {
    //    case "Price_List":
    //        listino = valore * 1;
    //        alert("listino=" + listino);
    //        break;
    //    case "Discount":
    //        sconto = valore * 1;
    //        alert("sconto=" + sconto);
    //        if (sconto > 0) {
    //        }
    //        break;
    //    case "Shipping_Perc":
    //        trasporto = valore * 1;
    //        alert("trasporto=" + trasporto);
    //        break;
    //    case "Cost":
    //        costo = valore * 1;
    //        alert("costo=" + costo);
    //        break;
    //    case "Quantity_Purchased":
    //        qta = valore * 1;
    //        alert("qta=" + qta);
    //        break;
    //}
    if (contentItem.screen.Order_Item.Price_List != null && contentItem.screen.Order_Item.Price_List != undefined) {
        listino = contentItem.screen.Order_Item.Price_List * 1;
    };
    //alert("listino=" + listino);
    if (contentItem.screen.Order_Item.Discount != null && contentItem.screen.Order_Item.Discount != undefined) {
        sconto = contentItem.screen.Order_Item.Discount * 1;     
    };
    if (sconto > 0) {
        costo = listino * (1 - sconto);
    } else {
        costo = contentItem.screen.Order_Item.Cost;
    };
    if (contentItem.screen.Order_Item.Quantity_Purchased != null && contentItem.screen.Order_Item.Quantity_Purchased != undefined) {
        contentItem.screen.Order_Item.Amount = (costo * contentItem.screen.Order_Item.Quantity_Purchased).toFixed(2);
    };   
    //if (contentItem.screen.Order_Item.Shipping_Perc != null) {
    //    trasporto = contentItem.screen.Order_Item.Shipping_Perc * 1;
    //};
    alert("Imponibile=" + contentItem.screen.Order_Item.Amount);
    contentItem.screen.Order_Item.Vat = (contentItem.screen.Order_Item.Amount * contentItem.screen.Order_Item.Vat_perc).toFixed(2);
    alert("Iva%=" + contentItem.screen.Order_Item.Vat_perc);
    alert("Iva=" + contentItem.screen.Order_Item.Vat);
    contentItem.screen.Order_Item.Total = contentItem.screen.Order_Item.Amount + contentItem.screen.Order_Item.Vat;
    alert("Total =" + contentItem.screen.Order_Item.Total);
    //ricarico = (costo/ricarico).toFixed(2)
    //alert("refreshMark_Up " + ricarico);
    //contentItem.screen.Product.Mark_Up = ricarico; //il markUp posso modificarlo lato backend
};
