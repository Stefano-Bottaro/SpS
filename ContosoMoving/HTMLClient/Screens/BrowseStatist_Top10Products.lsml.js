/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Top10Products.Help1_postRender = function (element, contentItem) {
    // Write code here.
    var txt = $('<div class=""msls-text"><span class="id-element">' + "I migliori 10 prodotti/servizi richiesti dai nostri clienti,visualizzati in modalità grafica, per evidenziare quali prodotti valorizzare per migliorare la nostra attività... " + '</span></div>');
    txt.appendTo($(element));
};

myapp.BrowseStatist_Top10Products.TopTenProduct_render = function (element, contentItem) {
    // Write code here.
    createChart3D(element, contentItem, "Top 10 Prodotti-Servizi-Trattamenti");
};