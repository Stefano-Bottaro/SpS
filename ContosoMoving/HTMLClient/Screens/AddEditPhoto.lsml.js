/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditPhoto.Photo_Picture_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 300px; max-height: 300px");
    contentItem.dataBind("screen.Photo.Picture", function (newValue) {
        contentItem.screen.closePopup();
    });
};
