/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.Home.Configurazione_postRender = function (element, contentItem) {
    // Write code here.         
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-configurazione");    
};
myapp.Home.Clienti_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-clienti");  
};
myapp.Home.Appuntamenti_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-appuntamenti");   
};
myapp.Home.Risorse_Umane_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-risorse");
};
myapp.Home.Prodotti_e_Servizi_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-magazzino");
    
};
myapp.Home.Marketing_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-comunicazione");
};
myapp.Home.Amministrazione_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-amministrazione");
};
myapp.Home.Statistiche_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("menu-navigazione");
    $(element).addClass("menu-statistiche");
};


myapp.Home.Esci_execute = function (screen) {
    // Write code here.
    window.close;
};