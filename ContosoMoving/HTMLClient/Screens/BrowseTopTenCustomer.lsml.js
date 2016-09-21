/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseTopTenCustomer.Histogram_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    function refresh() {
        totale = (entity.Expense / 1000).toFixed(0);
        $(element).css("width", totale + "px");
        $(element).css("background-image", "url('Content/Images/barChartB.png')");
    };
    refresh();
};
myapp.BrowseTopTenCustomer.Customer_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, "Top 10 Clienti");
};