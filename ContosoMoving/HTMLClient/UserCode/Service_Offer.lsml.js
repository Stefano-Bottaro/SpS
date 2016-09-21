/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.Service_Offer.created = function (entity) {
    // Write code here.
    today = new Date();
    entity.created = today;
};