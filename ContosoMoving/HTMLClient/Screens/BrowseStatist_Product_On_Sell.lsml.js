/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Product_On_Sell.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
};
myapp.BrowseStatist_Product_On_Sell.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Statistica di verifica incidenza prodotto sul fatturato divisa per prodotto nel range temporale selezionato,....i valori sono visualizzati in modalità grafica e raggruppati per periodo selezionato, in modo da poter monitorare come stanno andando le vendite di prodoti effettuate nella nostra attivià....." + '</span></div>');
    txt.appendTo($(element));
};
myapp.BrowseStatist_Product_On_Sell.Statist_render = function (element, contentItem) {
    // Write code here.
    createDoughnut(element, contentItem, "Statistica Incidenza Prodotti sul fatturato");
};