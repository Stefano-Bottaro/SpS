/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Employee_Commission.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
    screen.Month = today.getMonth();
};
myapp.BrowseStatist_Employee_Commission.Statist_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, "Commissioni per collaboratore");
};
myapp.BrowseStatist_Employee_Commission.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Totale Commissioni maturate per i collaboratori divise per mese  ,....i valori sono visualizzati in modalità grafica, per monitorare come stanno andando le vendite fatte dai nostri collaboratori....." + '</span></div>');
    txt.appendTo($(element));
};