/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditProduct_Offer.created = function (screen) {
    // Write code here. Product_Offer.Price
    today = new Date();
    nextDate = new Date();
    screen.Product_Offer.Data_Start = today;
    nextDate.setDate(nextDate.getDate() + 30);
    screen.Product_Offer.Data_End = nextDate;
    if (screen.Product_Offer.Products !== undefined && screen.Product_Offer.Products !== null) {
        screen.Product_Offer.Price = screen.Product_Offer.Products.Price * 1;
        nominativo = screen.Product_Offer.Description;
        screen.details.displayName = nominativo;
    };
};
myapp.AddEditProduct_Offer.Offer_Price_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Product_Offer.Price", function (newValue) {        
        if (contentItem.screen.Product_Offer.Price != undefined && contentItem.screen.Product_Offer.Offer_Discount != undefined) {
            //alert("Price    Offer_Price= "+ contentItem.screen.Product_Offer.Price + " * " + (1 - (contentItem.screen.Product_Offer.Offer_Discount * 1)));
            contentItem.screen.Product_Offer.Offer_Price = (contentItem.screen.Product_Offer.Price * (1 - (contentItem.screen.Product_Offer.Offer_Discount * 1))).toFixed(2);
        }        
    });
    contentItem.dataBind("screen.Product_Offer.Offer_Discount", function (newValue) {
        if (contentItem.screen.Product_Offer.Price != undefined && contentItem.screen.Product_Offer.Offer_Discount != undefined) {
            // alert("Offer_Discount    Offer_Price= " + contentItem.screen.Product_Offer.Price + " * " + (1 - (contentItem.screen.Product_Offer.Offer_Discount * 1)));
            contentItem.screen.Product_Offer.Offer_Price = (contentItem.screen.Product_Offer.Price * (1 - (contentItem.screen.Product_Offer.Offer_Discount * 1))).toFixed(2);
        };
    });
};

myapp.AddEditProduct_Offer.Offer_Discount_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Product_Offer.Offer_Price", function (newValue) {
        if (contentItem.screen.Product_Offer.Offer_Price != undefined && contentItem.screen.Product_Offer.Price != undefined) {
            //alert("Offer_Price    Offer_Discount= " + contentItem.screen.Product_Offer.Offer_Price + " / " + (contentItem.screen.Product_Offer.Price * 1));
            contentItem.screen.Product_Offer.Offer_Discount = (1 - (contentItem.screen.Product_Offer.Offer_Price / (contentItem.screen.Product_Offer.Price * 1))).toFixed(2);
        };
    });    
};
myapp.AddEditProduct_Offer.Price_postRender = function (element, contentItem) {
    // Write code here.Product_Offer.Products(item).Price  Product_Offer.Products(item).Description
    contentItem.dataBind("screen.Product_Offer.Products", function (newValue) {        
        if (contentItem.screen.Product_Offer.Products != undefined) {
            contentItem.screen.Product_Offer.Price = (contentItem.screen.Product_Offer.Products.Price * 1).toFixed(2);
        };
    });
};