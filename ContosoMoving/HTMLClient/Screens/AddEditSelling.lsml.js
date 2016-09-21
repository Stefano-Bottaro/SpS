/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.AddEditSelling.created = function (screen) {
    // Write code here.
    screen.Service_Document.Document_Date = new Date();
};
myapp.AddEditSelling.OffersByServiceTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").css("background", "#BFE9B9");
};
myapp.AddEditSelling.Product_ServicesTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").css("background", "#B9E9E0");
};
myapp.AddEditSelling.ProductsTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    function refresh() {
        var color = "#B9CEE9";  //rosa chiaro= #FFB6C1  rosa= #F8E0EC    Verde chiaro= #A9F5BC   verde= #E6F8E0  Azzurro=#B9CEE9
        if (entity.Tipology != undefined && entity.Tipology != null) {
            switch (entity.Tipology) {
                case "Prodotto":
                    color = "#FFB6C1";
                    break;
                case "Trattamento":
                    color = "#A9F5BC";
                    break;
                case "Kit":
                    color = "#B9CEE9";
                    break;
            }
        }
        $(element).closest("li").css("background", color);
    };
    refresh();
};
myapp.AddEditSelling.Kit1_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("tab_title");
};
myapp.AddEditSelling.Trattamenti_postRender = function (element, contentItem) {
    // Write code here.    
    $(element).addClass("tab_title");
};
myapp.AddEditSelling.Prodotti_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("tab_title");
};

myapp.AddEditSelling.Dati_Economici_postRender = function (element, contentItem) {
    // Write code here.
    createAccordion(element, contentItem);
};
myapp.AddEditSelling.Pagamento_postRender = function (element, contentItem) {
    // Write code here.
    createAccordion(element, contentItem);
};


myapp.AddEditSelling.cart_postRender = function (element, contentItem) {
    // Write code here.  
    $(element).addClass("add_cart");    
};
myapp.AddEditSelling.cart1_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_cart");
};
myapp.AddEditSelling.cart2_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("add_cart");
};
myapp.AddEditSelling.OffersByService_ItemTap_execute = function (screen) {
    // Write code here.
    var product = screen.OffersByService.selectedItem;

};


myapp.AddEditSelling.Products_ItemTap_execute = function (screen) {
    // Write code here.
    today = new Date();
    alert("Creo ordine_Items vuoto");         
    var newOrderDetail = new myapp.Service_History();
    alert("aggiungo  ordine_Items su Ordine creato "); 
    newOrderDetail.setService_Document(screen.Service_Document);
    //alert("aggiungo il prodotto su ordine_Items "); 
    newOrderDetail.setService_History(screen.product.selectedItem);
    //alert("setto i valori della nuova riga ordine");          
    newOrderItem.Qta = 1;
    newOrderItem.Sconto = 0;
    newOrderItem.Importo = product.Price * 1;
};