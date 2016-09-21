/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Sell_By_Category.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
    //screen.Quarter = parseInt((today.getMonth() / 3) + 0.7);
};
myapp.BrowseStatist_Sell_By_Category.Statist_render = function (element, contentItem) {
    // Write code here. "Sell By Category"
    createChart(element, contentItem, 'Vendite Categorie');
};
myapp.BrowseStatist_Sell_By_Category.Help1_postRender = function (element, contentItem) {
    // Write code here.
   var txt = $('<div class=""msls-text"><span class="id-element">' + "Totale vendite fatte suddivise per categoria e per trimestre ,....i valori sono visualizzati in modalità grafica, per evidenziare come stanno andando la nostre vendite... " + '</span></div>');
    txt.appendTo($(element));
};