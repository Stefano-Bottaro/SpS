/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseTopTenEmployee.TopTenEmployee_render = function (element, contentItem) {
    // Write code here.
    createChart(element, contentItem, "Top 10 Collaboratori");
};
myapp.BrowseTopTenEmployee.Help1_postRender = function (element, contentItem) {
    // Write code here.
  var txt = $('<div class=""msls-text"><span class="id-element">' + "I migliori 10 Collaboratori, visualizzati in modalità grafica, per evidenziare quali collaboratori premiare per il raggiungimento delle finalià comuni... " + '</span></div>');
    txt.appendTo($(element));
};