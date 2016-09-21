/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Customer_newClient.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "Totale Nuovi clienti acquisiti e suddivisi per mese ,....i valori sono visualizzati in modalità grafica, per monitorare i nuovi clienti che ci danno la loro preferenza....." + '</span></div>');
    txt.appendTo($(element));
};
myapp.BrowseStatist_Customer_newClient.Statist_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, "Acquisizione Nuovi Clienti per mese");
};
myapp.BrowseStatist_Customer_newClient.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
};