/// <reference path="../GeneratedArtifacts/viewModel.js" />


myapp.AddEditProduct_History.created = function (screen) {
    // Write code here.
    screen.Product_History.created = new Date();    
};

myapp.AddEditProduct_History.Price_List_postRender = function (element, contentItem) {
    // Write code here. Product_History.Product, Product_History.Price_List, Product_History.Discount, Product_History.Cost,Product_History.Shipping_Cost
    contentItem.dataBind("screen.Product_History.Product", function (newValue) {          
        if (newValue != undefined ) {           
            contentItem.screen.Product_History.Price_List = newValue.Price_List;           
            contentItem.screen.Product_History.Shipping_Cost = newValue.Shipping_Cost;
            contentItem.screen.Product_History.Discount = newValue.Discount;
            contentItem.screen.Product_History.Cost = newValue.Cost;
            contentItem.screen.Product_History.Description = newValue.Description;
        };
    });
};

myapp.AddEditProduct_History.Total_postRender = function (element, contentItem) {
    // Write code here.Product_History.Cost,Product_History.Quantity_Enter Product_History.Total
    contentItem.dataBind("screen.Product_History.Quantity_Enter", function (newValue) {
        if (newValue != null && contentItem.screen.Product_History.Cost != null) {
            contentItem.screen.Product_History.Total = (newValue * contentItem.screen.Product_History.Cost).toFixed(2);
        };
    });
};

myapp.AddEditProduct_History.Cost_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Product_History.Discount", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            refreshCost(element, contentItem);
        };
    });
    contentItem.dataBind("screen.Product_History.Price_List", function (newValue) {       
        if (newValue !== undefined && newValue !== null) {
            refreshCost(element, contentItem);
        };
    });
    contentItem.dataBind("screen.Product_History.Shipping_Cost", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            refreshCost(element, contentItem);
        };
    });
};

function refreshCost(element, contentItem) {
    var costo = 0;   
    if (contentItem.screen.Product_History.Discount !== undefined &&  contentItem.screen.Product_History.Price_List !== undefined) {         
        costo = (contentItem.screen.Product_History.Price_List - (contentItem.screen.Product_History.Price_List * contentItem.screen.Product_History.Discount));       
        if (contentItem.screen.Product_History.Shipping_Cost !== null && contentItem.screen.Product_History.Shipping_Cost !== undefined) { 
            costo = costo * (1 + (contentItem.screen.Product_History.Shipping_Cost * 1));
        };  
        contentItem.screen.Product_History.Cost = costo.toFixed(2);
    };
    
};
