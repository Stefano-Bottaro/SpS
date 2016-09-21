/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditCome_Back_Template.QR_Code_render = function (element, contentItem) {
    // Write code here. Come_Back_Template.Description
    alert(contentItem.Come_Back_Template.QR_Code);
    if(contentItem.Come_Back_Template.QR_Code !== null && contentItem.Come_Back_Template.QR_Code !== undefined ) {
        CreateQRCode(element, contentItem);
    }
};