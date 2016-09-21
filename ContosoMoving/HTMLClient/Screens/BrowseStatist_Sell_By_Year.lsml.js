/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseStatist_Sell_By_Year.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.StatistYear = today.getFullYear();
};
myapp.BrowseStatist_Sell_By_Year.Statist_Sell_By_Year_render = function (element, contentItem) {
    createChart(element, contentItem, 'Vendite Annuali');
}


