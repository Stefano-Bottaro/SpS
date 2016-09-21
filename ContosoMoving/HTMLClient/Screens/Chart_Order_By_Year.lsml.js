/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Chart_Order_By_Year.Order_render = function (element, contentItem) {
    var title = "Andamento Vendite mensile ";
    createChart(element, contentItem, title);
};
myapp.Chart_Order_By_Year.created = function (screen) {
    // Write code here.
    var today = new Date();
    screen.OrderYear_Analisys = today.getFullYear();
};
