/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewTask.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Task.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Task." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

