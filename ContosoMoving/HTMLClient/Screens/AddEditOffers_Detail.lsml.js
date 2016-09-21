/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditOffers_Detail.Total_postRender = function (element, contentItem) {
    // Write code here.  Offers_Detail.Price Offers_Detail.Qta
    contentItem.dataBind("screen.Offers_Detail.Price", function (newValue) {
        if (contentItem.screen.Offers_Detail.Price != undefined && contentItem.screen.Offers_Detail.Qta != undefined) {           
            contentItem.screen.Offers_Detail.Total = (contentItem.screen.Offers_Detail.Price * (contentItem.screen.Offers_Detail.Qta)).toFixed(2);
        }
    });
    contentItem.dataBind("screen.Offers_Detail.Qta", function (newValue) {
        if (contentItem.screen.Offers_Detail.Price != undefined && contentItem.screen.Offers_Detail.Qta != undefined) {           
            contentItem.screen.Offers_Detail.Total = (contentItem.screen.Offers_Detail.Price * (contentItem.screen.Offers_Detail.Qta)).toFixed(2);
        }
    });
};
myapp.AddEditOffers_Detail.Price_postRender = function (element, contentItem) {
    // Write code here. Offers_Detail.Product_Service
    contentItem.dataBind("screen.Offers_Detail.Product_Service", function (newValue) {
        if (newValue !== undefined && newValue !== null) {
            contentItem.screen.Offers_Detail.Price = (contentItem.screen.Offers_Detail.Product_Service.Price * (contentItem.screen.Offers_Detail.Qta)).toFixed(2);
        }
    });
};

myapp.AddEditOffers_Detail.created = function (screen) {
    // Write code here.
    screen.Offers_Detail.Qta = 1;
};