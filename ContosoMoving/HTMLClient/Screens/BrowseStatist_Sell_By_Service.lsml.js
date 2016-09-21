/// <reference path="../GeneratedArtifacts/viewModel.js" />


myapp.BrowseStatist_Sell_By_Service.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
    //screen.StatistQuarter = parseInt((today.getMonth() / 3)+ 0.7);
};

myapp.BrowseStatist_Sell_By_Service.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Totale servizi fatti su quante persone ad es quante persone hanno fatto il taglio al mese (tra il 25% ed il 60% sono valori opportuni) sono visualizzati in modalità grafica, per evidenziare come sta andando la nostra attività... " + '</span></div>');
    txt.appendTo($(element));
};

myapp.BrowseStatist_Sell_By_Service.Statist_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, 'Vendite Servizi');
};
