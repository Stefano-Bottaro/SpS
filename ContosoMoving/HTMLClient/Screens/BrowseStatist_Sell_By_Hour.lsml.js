/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Sell_By_Hour.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
};
myapp.BrowseStatist_Sell_By_Hour.Statist_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, "Vendite ripartite per Orario");
};

myapp.BrowseStatist_Sell_By_Hour.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Totale Vendite suddivise per orario di attività   ,....i valori sono visualizzati in modalità grafica, per monitorare quali sono le ore di maggior afflusso/vendita che evidenziano le preferenze dei nostri clienti....." + '</span></div>');
    txt.appendTo($(element));
};