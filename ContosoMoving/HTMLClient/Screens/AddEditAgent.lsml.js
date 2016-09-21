/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditAgent.created = function (screen) {
    // Write code here.
    if (screen.Agent.Name != undefined) {
        screen.details.displayName = "Agente " + screen.Agent.Name;
    }
};
myapp.AddEditAgent.Print_Tap_execute = function (screen) {
    // Write code here.
    window.print();
};