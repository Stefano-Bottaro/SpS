/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseOffersByService.created = function (screen) {
    // Write code here. 
    today = new Date();    
    today.setDate(today.getDate() + 30);
    screen.Data_End = today;
};
myapp.BrowseOffersByService.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    //alert(entity.Description + " " + entity.Price);
    var descrizione = entity.Description + "         € " + entity.Price;    
    createAccordion(element, contentItem, descrizione, false);
};
