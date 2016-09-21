/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Sell_By_Employee.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
    screen.Month = today.getMonth();
};
myapp.BrowseStatist_Sell_By_Employee.Statist_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, 'Vendite per Collaboratore');
    //createDoughnut(element, contentItem, "Vendite per Collaboratore");
};
myapp.BrowseStatist_Sell_By_Employee.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Totale Vendite effettuate dai collaboratori divise per anno e come opzione mese  ,....i valori sono visualizzati in modalità grafica e raggruppati per periodo selezionato, in modo da poter monitorare come stanno andando le vendite fatte dai nostri collaboratori....." + '</span></div>');
    txt.appendTo($(element));
};