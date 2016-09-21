/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Customer_Visit.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();

};

myapp.BrowseStatist_Customer_Visit.Statist_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, "Visite Clienti per mese");
};
myapp.BrowseStatist_Customer_Visit.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Totale visite fatte dai clienti per mese  ad es quante persone sono entrate in negozio nei mesi,....i valori sono visualizzati in modalità grafica, per evidenziare come sta andando la nostra attività... " + '</span></div>');
    txt.appendTo($(element));
};