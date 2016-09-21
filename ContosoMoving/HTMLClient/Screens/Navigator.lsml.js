/// <reference path="../GeneratedArtifacts/viewModel.js" />
var limite = 0;
var eventNumber = 0;
var indice = 0;
var contatore = 1;
var myVar = setInterval(rotator, 10000);

function rotator() {
    if (contatore == 1) {
        indice = limite;
    }
    contatore++;
    var oldIndice = indice;
    indice++;
    if (indice > limite) {
        indice = 1;
    };
    fade("rotator" + indice, "rotator" + oldIndice);
};


//myapp.Navigator.ShowHelp_Tap_execute = function (screen) {
//    // Write code here.   
//    var text = "Tagli sui passaggi si può andare da 1/4 a 3/5;Passaggi mensili: una media opportuna è compresa tra 90/150 per collaboratore;Servizi: si può andare dal 6% della media nazionale, fino al 15% del fatturato ;Rivendita...;Nuovi Clienti: ogni mese devono essere 2 per ogni addetto più 2 per il negozio... ";
//    text2speech(text);
//};

myapp.Navigator.Disclaimer_render = function (element, contentItem) {
    // Write code here. Questo sito web utilizza i cookie per migliorare la tua esperienza di navigazione. Continuando a navigare acconsenti all'uso dei cookie.
    //<br><br>  Per maggiori informazioni o per modificare le impostazioni consulta la nostra  <a style="text-decoration: underline;color:#006dd7;font-weight:bold;font-family:arial;font-size:15px;" href="/it-IT/Pagine/cookie.aspx">Informativa privacy su utilizzo cookie</a>. <br><br><div style="margin-top:5px;text-align:center;text-justify:none;filter: alpha(opacity=100);"><span style="margin-left:5px;"><input class="right" style="background-color: #006dd7;" type="submit" name="impliedsubmit" id="impliedsubmit" value="ACCETTO"></span>
    if (leggiCookie("accettaCookies") == "") {
        var txt = $('<div id="disclaimer" align="left">Questo sito utilizza i cookie per migliorare la tua esperienza di navigazione. Continuando a navigare ne accetti il loro utilizzo.<br>' +
        '<div id="button" style="width:150px;height:25;float:right;display:inline;"><button type="button" data-role="none" class="essebi-button"  autofocus onclick="Cookies_confirm();">ACCETTO</button></div>' +
         'Per maggiori informazioni o per modificare le impostazioni consulta la nostra <a style="text-decoration: underline;color:#006dd7;font-family:arial;" href="javascript:Informativa()">Informativa privacy su utilizzo cookie</a>' +
        '</div>');
        txt.appendTo($(element));
    };
};

myapp.Navigator.PhotosTemplate_postRender = function (element, contentItem) {
    // Write code here.
    limite = ++eventNumber;
    //alert("PhotosTemplate_postRender=" + limite);
    $(element).attr("id", "rotator" + limite);
    if (limite > 1) {
        $(element).attr("visibility", "hidden");
    };
    $(element).addClass("rotator");
};


myapp.Navigator.Disclaimer_postRender = function (element, contentItem) {
    // Write code here.
    if (leggiCookie("accettaCookies") == "") {        
        var txt = $('<div id="disclaimer" align="left">Questo sito utilizza i cookie per migliorare la tua esperienza di navigazione. Continuando a navigare ne accetti il loro utilizzo.<br>' +
        '<div id="button" style="width:150px;height:25;float:right;display:inline;"><button type="button" data-role="none" class="essebi-button"  autofocus onclick="Cookies_confirm();">ACCETTO</button></div>' +
         'Per maggiori informazioni o per modificare le impostazioni consulta la nostra <a style="text-decoration: underline;color:#006dd7;font-family:arial;" href="javascript:Informativa()">Informativa privacy su utilizzo cookie</a>' +
        '</div>');
        txt.appendTo($(element));
    };
};

myapp.Navigator.Id_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.Navigator.Caption_postRender = function (element, contentItem) {
    // Write code here.
 $(element).addClass("ForeColor_white");
};
myapp.Navigator.Category_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.Navigator.Employee_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.Navigator.Note_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.Navigator.Customer_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.Navigator.Order_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};
myapp.Navigator.created_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("ForeColor_white");
};