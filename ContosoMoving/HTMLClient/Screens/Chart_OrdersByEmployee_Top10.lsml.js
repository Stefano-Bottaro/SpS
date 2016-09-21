/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Chart_OrdersByEmployee_Top10.Order_render = function (element, contentItem) {
   
    var title = "Vendite Collaboratori nell'anno";
    createChart(element, contentItem,title);
};
myapp.Chart_OrdersByEmployee_Top10.created = function (screen) {
    // Write code here.
    today= new Date();
    screen.OrderYear = today.getFullYear();   
};