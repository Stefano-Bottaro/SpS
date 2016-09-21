/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.OrdersReportViewerTemplate.OrderReport_render = function (element, contentItem) {
    var itemTemplate = $("<div></div>").attr("id", contentItem.name);
    //itemTemplate.css({ "width": "100%", "height": "450px" });
    itemTemplate.appendTo($(element));
    itemTemplate.ejReportViewer({
                                reportServiceUrl: contentItem.value.data,
                                    processingMode: ej.ReportViewer.ProcessingMode.Remote,
                                    reportPath: "/Ricevuta fiscale"
                                });
};