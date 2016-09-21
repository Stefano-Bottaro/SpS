/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.Customer.created = function (entity) {
    // Write code here.
    var today = new Date();
    entity.created = today;
    entity.Visit_Number = 0;
    entity.Privacy = false;
    entity.Sex = "F";
    entity.Point = 0;
    entity.Contact_Method = "Sms";
    entity.Type = "Ferro";
    entity.Profession = "Dipendente";
    entity.Payment_Type = "Contanti";
    entity.Deferrals = 0;
    entity.Payment_Number = 1;
    entity.Discount = 0;
};