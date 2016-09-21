/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditCounter.Print_Tap_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.AddEditCounter.created = function (screen) {
    // Write code here.
    if (screen.Counter.Counter_Type != undefined) {
        screen.details.displayName = "Contatore " + screen.Counter.Counter_Type;
    } else {
        today = new Date();
        screen.Counter.Counter_year = today.getFullYear().toString;
        screen.Counter.Valore = 0;
    }
    
};