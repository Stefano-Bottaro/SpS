/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewParameter.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Parameter.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Parameter." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

