/// <reference path="../GeneratedArtifacts/viewModel.js" />
var limite = 0;
var eventNumber = 0;
var indice = 0;
var contatore = 1;
var myVar = setInterval(rotator, 7000);

function rotator() {
    if (contatore == 1) {
        indice = limite;
    }
    contatore++;
    var oldIndice = indice;
    indice++;
    if (indice > limite) {
        indice = 1;
    };
    fade("rotator" + indice, "rotator" + oldIndice);
};

myapp.BrowseCustomers.TopTenCustomer_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, "Top ten Clienti");
};

myapp.BrowseCustomers.Come_Back_TemplatesTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("backcloth");
};
myapp.BrowseCustomers.help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Lassie concretizza il nostro desiderio di far tornare in negozio il cliente che ci ha abbandonati, attraverso una strategia basata sul tempo. Le azione proposte sono : dopo tre mesi invio di Sms con proposta di sconto; dopo 6 mesi invio sms e newLetter con sconto; dopo nove mesi ultimo invio con  sms e newLetter con sconto, nella sezione Configurazione, puoi impostare e configurare tempi e modalità di ri-fidelizzazione!" + '</span></div>');
    txt.appendTo($(element));
};

myapp.BrowseCustomers.help2_postRender = function (element, contentItem) {
    // Write code here. Foto
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Possiamo salvare i nostri lavori sull'anagrafica del cliente, in modo da poterli successivamente condividere sui Social Network" + '</span></div>');
    txt.appendTo($(element));
};
myapp.BrowseCustomers.help3_postRender = function (element, contentItem) {
    // Write code here. Top10
    var txt = $('<div class=""msls-text"><span class="id-element">' + "I nostri migliori 10 clienti sono visualizzati in modalità grafica, per individuare chi merita, in particolar modo, le nostre coccole... " + '</span></div>');
    txt.appendTo($(element));
};
myapp.BrowseCustomers.help4_postRender = function (element, contentItem) {
    // Write code here. Segmentazione
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Individuiamo la nostra clientela tipo per capire a chi dovremmo dedicare le nostre attenzioni....lavoriamo sulla nostra clientela principale" + '</span></div>');
    txt.appendTo($(element));
};
myapp.BrowseCustomers.help5_postRender = function (element, contentItem) {
    // Write code here.  Clienti
    var txt = $('<div class=""msls-text"><span class="id-element">' + "L'anagrafica clienti permette di memorizzare le informazioni generali e di dettaglio dei nostri clienti, comprese le preferenze, le allergie, le foto dei trattamenti effettuati e le preferenze di contatto..." + '</span></div>');
    txt.appendTo($(element));    
};

myapp.BrowseCustomers.Statist_Customer_Segmentation_render = function (element, contentItem) {
    // Write code here.
    createDoughnut(element, contentItem, "Segmentazione clientela");
};

myapp.BrowseCustomers.helpClienti_Tap_execute = function (screen) {
    // Write code here.   
    screen.Customers.selectedItem.
    screen.showPopup("helpClienti");
    var text = "L'anagrafica clienti permette di memorizzare le informazioni generali e di dettaglio dei nostri clienti, comprese le preferenze, le allergie, le foto dei trattamenti effettuati e le preferenze di contatto...";
    text2speech(text);
};
myapp.BrowseCustomers.helpLassie_Tap_execute = function (screen) {
    // Write code here.
    screen.showPopup("helpLassie");    
    var text = "Lassie concretizza il nostro desiderio di far tornare in negozio il cliente che ci ha abbandonati, attraverso una strategia basata sul tempo. Le azione proposte sono : dopo tre mesi invio di Sms con proposta di sconto; dopo 6 mesi invio sms e newLetter con sconto; dopo nove mesi ultimo invio con  sms e newLetter con sconto, nella sezione Configurazione, puoi impostare e configurare tempi e modalità di ri-fidelizzazione!";
    text2speech(text);
};
myapp.BrowseCustomers.helpFoto_Tap_execute = function (screen) {
    // Write code here.
    screen.showPopup("helpPhoto");
    var text = "Possiamo salvare le nostre migliori creazioni sull'anagrafica del cliente, in modo da poterle successivamente condividere sui Social Network!";
    text2speech(text);
};
myapp.BrowseCustomers.CustomerFilter_postRender = function (element, contentItem) {
    // Write code here.
    //$(element).child.attr("x-webkit-speech", "x-webkit-speech");
};
myapp.BrowseCustomers.Photo_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 350px; max-height: 350px");
    contentItem.dataBind("screen.Photos.Picture", function (newValue) {
        contentItem.screen.closePopup();
    });
};

myapp.BrowseCustomers.PhotosTemplate_postRender = function (element, contentItem) {
    // Write code here.
    limite = ++eventNumber;
    $(element).attr("id", "rotator" + limite);
    if (limite > 1) {
        $(element).attr("visibility", "hidden");
    };
    $(element).addClass("rotator");
};
myapp.BrowseCustomers.Caption_postRender = function (element, contentItem) {
    // Write code here.  ForeColor_white
    $(element).addClass("ForeColor_white");
};
myapp.BrowseCustomers.Category_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.BrowseCustomers.Customer1_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.BrowseCustomers.Employee_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.BrowseCustomers.Order_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.BrowseCustomers.Note_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};

