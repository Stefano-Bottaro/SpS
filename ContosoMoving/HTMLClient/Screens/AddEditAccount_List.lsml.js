/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditAccount_List.created = function (screen) {
    // Write code here.
    today = new Date();
    screen.Account_List.created = today;
    screen.Account_List.Month = today.getMonth(); 
    screen.Account_List.Year = today.getFullYear();
    
};