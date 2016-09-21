/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewAccount_Operation.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Account_Operation.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Account_Operation." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

