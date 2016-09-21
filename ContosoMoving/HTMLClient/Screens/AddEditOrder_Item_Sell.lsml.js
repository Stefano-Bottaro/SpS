/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditOrder_Item_Sell.Amount_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Order_Item.Discount", function (newValue) {       
        if (contentItem.screen.Order_Item.Discount != null && contentItem.screen.Order_Item.Discount != undefined && (contentItem.screen.Order_Item.Discount * 1) > 0) {
            //alert("screen.Order_Item.Discount.Price " + contentItem.screen.Order_Item.Price);
            contentItem.screen.Order_Item.Price = (contentItem.screen.Order_Item.Price * (1 - newValue)).toFixed(2);
            if (contentItem.screen.Order_Item.Quantity !== null && contentItem.screen.Order_Item.Quantity !== undefined) {
                contentItem.screen.Order_Item.Amount = (contentItem.screen.Order_Item.Price / (1 + (contentItem.screen.Order_Item.Vat_perc * 1)) * contentItem.screen.Order_Item.Quantity).toFixed(2);
            } else {
                contentItem.screen.Order_Item.Amount = (contentItem.screen.Order_Item.Price / (1 + (contentItem.screen.Order_Item.Vat_perc * 1))).toFixed(2);
            }            
            contentItem.screen.Order_Item.Vat = (contentItem.screen.Order_Item.Amount * contentItem.screen.Order_Item.Vat_perc).toFixed(2);
            contentItem.screen.Order_Item.Total = ( (contentItem.screen.Order_Item.Amount * 1) + (contentItem.screen.Order_Item.Vat * 1) ).toFixed(2);
        };
    });
    contentItem.dataBind("screen.Order_Item.Quantity", function (newValue) {
        if (contentItem.screen.Order_Item.Quantity !== null && contentItem.screen.Order_Item.Quantity !== undefined) {
            //alert("screen.Order_Item.Discount.Quantity " + contentItem.screen.Order_Item.Quantity);
            //contentItem.screen.Order_Item.Amount = (contentItem.screen.Order_Item.Price / (1 + (contentItem.screen.Order_Item.Vat_perc * 1)) * newValue).toFixed(2);
            contentItem.screen.Order_Item.Amount = (contentItem.screen.Order_Item.Price / (1 + (contentItem.screen.Order_Item.Vat_perc * 1)) * contentItem.screen.Order_Item.Quantity).toFixed(2);
            //alert("screen.Order_Item.Amount " + contentItem.screen.Order_Item.Amount);    
            contentItem.screen.Order_Item.Vat = (contentItem.screen.Order_Item.Amount * contentItem.screen.Order_Item.Vat_perc).toFixed(2);
            //alert("screen.Order_Item.Vat " + contentItem.screen.Order_Item.Vat);
            contentItem.screen.Order_Item.Total = ( (contentItem.screen.Order_Item.Amount * 1) + (contentItem.screen.Order_Item.Vat * 1) ).toFixed(2);
            //alert("screen.Order_Item.Total " + contentItem.screen.Order_Item.Total);
        };
    });
};
myapp.AddEditOrder_Item_Sell.Discount_postRender = function (element, contentItem) {
    // Write code here.
    if (contentItem.screen.Order_Item.Discount == null && contentItem.screen.Order_Item.Discount == undefined) {
        contentItem.screen.Order_Item.Discount = 0;
    }
};