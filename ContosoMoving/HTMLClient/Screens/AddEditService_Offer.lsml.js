/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditService_Offer.created = function (screen) {
    // Write code here.  Service_Offer.Offer_Discount   Service_Offer.Product_Service  screen.Service_Offer.Service_Products is undefined
    today = new Date();
    nextDate = new Date();
    screen.Service_Offer.Data_Start = today;
    nextDate.setDate(nextDate.getDate() + 30);
    screen.Service_Offer.Data_End = nextDate;
    //var myVar = setInterval(function () { myTimer(screen) }, 5000);
};

//function myTimer(screen) {
   
//    if (screen.Service_Offer. > 0) {
//        refresh(screen);
//    };
//};

myapp.AddEditService_Offer.Print_execute = function (screen) {
    // Write code here.
    window.print();
};

function refresh(screen) {
    var entity = screen.Offers_Details;
    var importo = 0;
    if (entity.count > 0) {
        var detail = entity.data; // Get the data for the collection passed   
        detail.forEach(function (items) {            
            importo += items.Total * 1;
        });
        screen.GeneralAmount = formatNumber(importo, 2, ",", ".");
    };
};

myapp.AddEditService_Offer.Service_Offer_Photo_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 250px; max-height: 250px");
};

