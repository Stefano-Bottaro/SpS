/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseServiceByEmployee.created = function (screen) {
    // Write code here.
    today = new Date();    
    screen.Service_DocumentYear = today.getFullYear();
    screen.Service_DocumentMonth = today.getMonth()-1;
};


myapp.BrowseServiceByEmployee.Histogram_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    function refresh() {
        totale = (entity.Amount / 1000).toFixed(0);        
        $(element).css("width", totale + "px");
        $(element).css("background-image", "url('Content/Images/barChartB.png')");
    };
    refresh();
};