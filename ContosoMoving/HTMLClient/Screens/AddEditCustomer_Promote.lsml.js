/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditCustomer_Promote.created = function (screen) {
    // Write code here.
    today = new Date();
    nextDate = new Date();
    screen.Customer_Promote.Data_Start = today;
    nextDate.setDate(nextDate.getDate() + 30);
    screen.Customer_Promote.Data_End = nextDate;
};