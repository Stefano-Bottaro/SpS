/// <reference path="../GeneratedArtifacts/viewModel.js" />
// (c) EsseBi 2014 --RGBBase #FF2A71E9----------------------- mailto:bottaro.stefano@gmail.com

// B A R C O D E ------------------------
function CheckBarCode(code) {
    // ------------------------ verify check code 
    codice = code;
    largo = 1;
    alto = 30;
    // Codice da visualizzare: aggiusto la lunghezza a 13 cifre
    while (codice.length < 12) { codice = "0" + codice };
    LL = codice.length;
    if (LL > 12) {
        LL = 12;
        codice = codice.substr(0, 12);
    }
    tt = 0;
    for (xx = 1; xx <= LL; xx++) {
        vv = parseInt(codice.substr(LL - xx, 1))
        if (xx % 2 == 1)
            vv = vv * 3;
        tt = tt + vv;
    }
    tt = tt % 10;
    if (tt > 0)
        tt = 10 - tt;
    //	' accodo il Check Digit al numero
    codice = codice + tt;
    if (codice != code) {
        alert("BarCode verificato=" + code + " \n Codice corretto=" + codice);
    };
    return codice;
};
function BarCodeDisplay(code) {
    // ------------------------ creazione e scrittua PopUp con BarCode
    codice = code; //document.myForm.codice.value;
    //alert(codice);
    largo = 1; //parseFloat("0" + document.myForm.larghezza.value);
    alto = 30; // parseFloat("0" + document.myForm.altezza.value);    
    //CheckBarCode(codice);
    // BarCode
    var html = "";
    html = TabBar(largo, alto, BinBar(codice), codice);   
   return html;
}// ---------------------------------------------------------------
function TabBar(largo, alto, binario, codice) {
    // ------------------------- creazione stringa con tabella BarCode
    prima = codice.substr(0, 1);
    seconda = codice.substr(1, 6);
    terza = codice.substr(7);
    tabella = "";
    tabella += "<table style='margin-left:auto; margin-right:auto;' bgcolor=white border=0 cellpadding=0 cellspacing=0>";
    tabella += "<tr><td></td><td valign=top rowspan=3>";
    ii = 0
    for (kk = 1; kk < 96; kk++) {
        ii = 1 - ii
        aa = alto;
        if (kk < 4 || kk > 92 || kk == 46 || kk == 47 || kk == 48 || kk == 49 || kk == 50)
            aa = largo * 4 + alto;		// barre di controllo e sincronizzazione
        tabella += "<img src=Content/Images/" + binario.charAt(kk - 1) + ".gif width=" + largo + " height=" + aa + ">";
        if (kk == 3 || kk == 50)
            tabella += "</td><td valign=top>";
        if (kk == 45 || kk == 92)
            tabella += "</td><td valign=top rowspan=2>";
    };
    tabella += "</td></tr>";
    tabella += "<tr><td align=center valign=bottom ><font face='Geneva, Arial' size=2>" + prima + "</td><td align=center valign=bottom><font face='Geneva, Arial' size=2>" + seconda + "</td><td align=center valign=bottom><font face='Geneva, Arial' size=2>" + terza + "</td></tr></table>";
    return tabella;
};
function BinBar(codice) {
    // ------------------ creazione stringa binaria (0=bianco, 1=nero)
    // tabella estrapolata da: www.barcodeisland.com/ean13.phtml
    var a = new Array("000000000110101001111110010",
        "001011001100101100111100110",
        "001101001001100110111101100",
        "001110011110101000011000010",
        "010011010001100111011011100",
        "011001011000101110011001110",
        "011100010111100001011010000",
        "010101011101100100011000100",
        "010110011011100010011001000",
        "011010000101100101111110100");
    // identifico la sequenza della prima parte del codice (dipende dalla prima cifra)
    seq = a[codice.substr(0, 1)].substr(0, 6);
    // creo la sequenza del barcode 
    cc = "101";
    dd = codice.substr(1, 6);
    for (kk = 0; kk < 6; kk++) {
        aa = dd.charAt(kk);
        bb = seq.charAt(kk);
        cc += a[aa].substr(bb * 7 + 6, 7);
    };
    cc += "01010";
    dd = codice.substr(7);
    for (kk = 0; kk < 6; kk++) {
        aa = dd.charAt(kk);
        cc += a[aa].substr(20, 7);
    };
    cc += "101";
    return cc;
};
function CreateQRCode(element, contentItem) {
    var code = contentItem.value;
    var div = $("<div />");
    div.attr('id', contentItem.name);
    div.attr("data-role", "none");
    //alert("QRCode Function");
    div.appendTo($(element));
    div.ejBarcode({
        text: code,
        symbologyType: "qrbarcode",
        xDimension: 4,
        displayText: true,
        barcodeToTextGapHeight: 5
    });
    contentItem.dataBind("value", function (value) {
        div.data("ejBarcode");
    });
};

// N U M B E R  F O R M A T  ------------------------
function formatNumber(num, precision, decimal, thousand) {
    "use strict";
    var sign, intVal, remain, final;
    precision = isNaN(precision = Math.abs(precision)) ? 2 : precision;
    decimal = decimal === undefined ? "," : decimal
    thousand = thousand === undefined ? "." : thousand;
    sign = num < 0 ? "-" : "";
    intVal = parseInt(num = Math.abs(+num || 0).toFixed(precision), 10) + "";
    remain = (remain = intVal.length) > 3 ? remain % 3 : 0;
    final = sign;
    final += remain ? intVal.substr(0, remain) + thousand : "";
    final += intVal.substr(remain).replace(/(\d{3})(?=\d)/g, "$1" + thousand);
    final += precision ? decimal + Math.abs(num - intVal).toFixed(precision).slice(2) : "";    
    return "€ " + final;
};
function getMeasure(label) {
    var unit = "";
    if (label.match(/Visit/g) != null) {
        unit = " Nr";
    };
    if (label.match(/Volume/g) != null) {
        unit = " pz";
    };
    if (label.match(/Percent/g) != null) {
        unit = " %";
    };
    if (label.match(/Amount/g) != null) {
        unit = " Eur";
    };
    if (label.match(/Average/g) != null) {
        unit = " Eur";
    };
    if (label.match(/Expense/g) != null) {
        unit = " Eur";
    };
    if (label.match(/New_Customer/g) != null) {
        unit = " Nr";
    };
    //alert(label+ "="+ unit);
    return unit;
};
// T E X T   F O R M A T
function formatText(text, lenght) {   
    return(left(text+repeat(" ",lenght),lenght));
};
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function splitter(stringToSplit, separator) {
    return stringToSplit.split(separator);
};
function right(stringa, len) {
    return stringa.substr(stringa.length - len, len)
};
function contains(stringa, value) {
    if (stringa.indexOf(value) > -1) {
        ret= true ;
    }else{
        ret = false;
    }
    return ret;
};
function left(stringa, len) {
    return stringa.substring(0, len)
};
function rightback(stringa, separator) {
    lista = stringa.split(separator);
    end = (lista.length) - 1;
    return lista[end];
};
function leftback(stringa, separator) {
    lista = stringa.split(separator);
    return lista[0];
};
function middleback(stringa, separator, occorrenza) {
    lista = stringa.split(separator);
    if (lista.length > 1) {
        return lista[occorrenza];
    } else {
        return stringa;
    }
};
function repeat(string,count){
    return new Array(count+1).join(str);
}
function getType(field) {
    //alert(field);
    var ret = "string";
    if (field.match(/Id/g) != null) {
        ret = "id";
    };
    if (field.match(/Code/g) != null) {
        ret = "id";
    };
    if (field.match(/Date/g) != null) {
        ret = "date";
    };
    if (field.match(/Volume/g) != null) {
        unit = "integer";
    };
    if (field.match(/Year/g) != null) {
        unit = "integer";
    };
    if (field.match(/Month/g) != null) {
        unit = "integer";
    };
    if (field.match(/Percent/g) != null) {
        ret = "percent";
    };
    if (field.match(/Amount/g) != null) {
        ret = "money";
    };
    if (field.match(/Cost/g) != null) {
        ret = "money";
    };
    if (field.match(/Commission/g) != null) {
        ret = "money";
    };
    if (field.match(/Credit/g) != null) {
        ret = "money";
    };
    if (field.match(/Debit/g) != null) {
        ret = "money";
    };
    if (field.match(/Value/g) != null) {
        ret = "money";
    };
    if (field.match(/Total/g) != null) {
        ret = "money";
    };
    if (field.match(/Average/g) != null) {
        ret = "money";
    };
    if (field.match(/Expense/g) != null) {
        ret = "money";
    };
    if (field.match(/New_Customer/g) != null) {
        ret = "integer";
    };
    //alert(label+ "="+ unit);
    return ret;
};

// D A T E   F O R M A T 
function stringToDate(_date) {
    //Tue Nov 25 2014 00:14:12 GMT+0100      
     data1 = new Date(_date);
    //alert("stringToDate"+ formatedDate);
    return formatedDate;
};
function DateToString(_date) {
    //Tue Nov 25 2014 00:14:12 GMT+0100  
    gg = _date.getDate();
    mm = getMonthName(_date);
    yy = _date.getFullYear();
    var formatedDate = gg + " " + mm + " " + yy;
    return formatedDate;
}
function lastDay(_date) {
    gg = _date.getDate();
    mm = _date.getMonth()+1;	 //i mesi partono da 0 fino a 11
    yy = _date.getFullYear();
    data1 = new Date();
    data1.setFullYear(yy, mm , 1 - 1);  
    return data1;
};
function firstDay(_date) {
    gg = _date.getDay();
    mm = _date.getMonth();	 //i mesi partono da 0 fino a 11
    yy = _date.getFullYear();
    data1 = new Date();
    data1.setFullYear(yy, mm , 1);    
    return data1;
};
function dateDiff(data1, data2) {
    // i millisecondi sono in un gg 24*60*60*1000 =  86400000
    datearray = data1.split("/");
    gg = datearray[0];
    mm = datearray[1] - 1;	 //i mesi partono da 0 fino a 11
    yy = datearray[2];
    data1 = new Date();
    data1.setFullYear(yy, mm, gg);
    datearray = data2.split("/");
    gg = datearray[0];
    mm = datearray[1] - 1;	 //i mesi partono da 0 fino a 11
    yy = datearray[2];
    data2 = new Date();
    data2.setFullYear(yy, mm, gg);
    //alert("Datediff="+((data1-data2)/86400000));	
    return int(((data1 - data2) / 86400000) ); 
}
function minuteDiff(dataEnd, dataStart) {  
    var minute = Math.floor((dataEnd - dataStart) / (1000 * 60));
    //alert("minuteDiff=" + minute);
    return minute;
}
function getDay(startDate, month, day, hour) {   
    if (startDate == undefined && startDate == null) {
        today = new date();
    } else {
        var today = startDate;
    };   
    if (month !== undefined && month !== null) {
        today.setDate(today.getDate() + (month * 30));
    };    
    if (day !== undefined && day !== null) {
        today.setDate(today.getDate() + day);        
    };
    if (hour !== undefined && hour !== null) {       
        today.setHours(today.getHours() + hour);       
    };   
    return today;
}
function getMonthName(date) {    
    var monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    return monthNames[date.getMonth()];
};
function getDayName(_date) {
    var dayNumber = _date.getDay();
   //0=domenica
    switch(dayNumber) {
        case 0:
            d="Domenica";
            break;
        case 1:
            d="Lunedi";
            break;
        case 2:
            d="Martedi";
            break;
        case 3:
            d="Mercoledi";
            break;
        case 4:
            d="Giovedi";
            break;
        case 5:
            d="Venerdi";
            break;
        case 6:
            d="Sabato";
            break;     
    };
    //alert("getDayName=" + d);
    return d;
};
function getMonthByString(month) {
    var m;
    switch(month) {
        case "Gen":
            m=0;
            break;
        case "Feb":
            m=1;
            break;
        case "Mar":
            m=2;
            break;
        case "Apr":
            m=3;
            break;
        case "May":
            m=4;
            break;
        case "Jun":
            m=5;
            break;
        case "Jul":
            m=6;
            break;
        case "Aug":
            m=7;
            break;
        case "Sep":
            m=8;
            break;
        case "Oct":
            m=8;
            break;
        case "Nov":
            m=10;
            break;
        case "Dec":
            m=11;
            break;        
    };
    return m;
};
function getHms(date) {
    var time = addZero(date.getHours());
    time += ":" + addZero(date.getMinutes());
    //time += ":" + addZero(date.getSeconds());    
    //alert("getHms=" + time);
    return time;
}

Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};


// U I   CO N T E N T ------------------------
function createAccordion(element, contentItem, width) {
    // provide some defaults for the optional "options" parameter  class="accordion horizontal">  
    $element = $(element);    
    var itemTemplate = $("<div></div>").attr('id', 'accordion')
    itemTemplate.css({ 'width': width });
    $(element).append(itemTemplate);
    var h = $('<h3><a href="#">').text(contentItem.name);
    $(element).append(h);
    //slice the content of href and ul 
    // <h3> <a href="#">Orubase</a></h3>   
    //<div><!-- add accordion contents here to load contents under this header -->
    //    <ul>
    //        <li><h4>DocIO</h4></li>
    //        <li><h4>Pdf</h4></li>
    //        <li><h4>Gauge  </h4></li>
    //        <li><h4>Schedule  </h4></li>
    //        <li><h4>Diagram  </h4></li>
    //        <li><h4>Tools </h4></li>
    //    </ul>
    //</div>
    //itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var label = first.children[0].valueModel.name;
        var d = $('<div><ul>');
        var value = $('<li>').first.children[1].valueModel.value;
        var d1 = $('</ul></div>'); 
        alert(value);
        $(element).append(d);
        $(element).append(value);
        $(element).append(d1);
        $("#accordion").ejAccordion({
            enableMultipleOpen: true,
            selectedItems: [0, 1, 2],
            showRoundedCorner: true,
            expandSpeed: 600,
            collapseSpeed: 1000,
            collapsible: true,
            customIcon: {
                header: "e-arrowheaddown", /*  To set icon for the collapsed accordion headers  */
                selectedHeader: "e-arrowheadup"/*  To set icon for the selected accordion headers  */
            }
        });
    };
};
function createSlider(element, contentItem, min, max, step) {
    var div = $("<div />");
    div.attr('id', contentItem.name);
    div.attr("data-role", "none");
    div.appendTo($(element));
    div.ejSlider({
        sliderType: ej.SliderType.Default,
        value: 1,
        height: "25",
        width: "150",
        incrementStep: step,
        minValue: min,
        maxValue: max,
        showScale: true,
        change: function (args) {
            contentItem.value = args.value;
        }
    });
    contentItem.dataBind("value", function (value) {
        div.ejSlider({ value: value })
    });
};
function createCheckBox(element, contentItem) {
    // Generate the input element.var 
    value = contentItem.value;
    $element = $(element)
        .css({ height: 20, width: 20, margin: "10px" })
        .append('<input data-role="none" type="checkbox"/>');
};
function createDatePicker(element, contentItem) {
    // Generate the input element.var    input.attr('id', contentItem.name);
    var input = $('<input />');
    input.attr('id', contentItem.name);
    input.attr('data-role', 'none');
    input.appendTo($(element));
    // add the data-role='none' to prevent jQueryMobile from messing with the control rendering    
    input.ejDatePicker({
        // set the control value to the contentitem value:
        locale: "it-IT",
        dateFormat: "dd/MM/yyyy",
        buttonText: "Oggi",
        "value": contentItem.value,
        change: function (args) {
            // update the content item when the value changes:
            contentItem.value = args.value;
        },
    });
    contentItem.dataBind('value', function (value) {
        input.ejDatePicker({ value: value })
        if (value == undefined)
            input.ejDatePicker({ watermarkText: "Seleziona la data" });
    });
};
function createDateTimePicker(element, contentItem) {
    // Generate the input element.var   
    var input = $('<input />');
    input.attr('id', contentItem.name);
    input.attr('data-role', 'none');
    input.appendTo($(element));
    input.ejDateTimePicker({
        width: "100%",
        locale: "it-IT",
        dateFormat: "dd/MM/yyyy",
        //dateTimeFormat: "d/M/yyyy tt h:mm",
        dateTimeFormat: "dd/MM/yyyy hh:mm:ss tt",
        timeDrillDown: { interval: 15, autoClose: true },
        buttonText: { today: "Oggi", timeNow: "Adesso", done: "Fatto", timeTitle: "Tempo" },
        dayHeaderFormat: "showHeaderShort",        
        timePopupWidth: "150px",
        timeDisplayFormat: "HH:mm",
        showOtherMonths: true,
        showRoundedCorner: true,
        // update the content item when the value changes:
       
        "value": contentItem.value,
        change: function (args) {
            // update the content item when the value changes:
            contentItem.value = args.value;
        },       
    });
    contentItem.dataBind('value', function (value) {
        input.ejDateTimePicker({ value: value });
        if (value == undefined)
            input.ejDateTimePicker({ watermarkText: "Seleziona la data" });
    });
};
function createCombo(element, contentItem) {
    var input = $('<input />');
    input.attr('id', contentItem.name);
    input.attr('data-role', 'none');
    // Append the Input element to screen   <select>
    input.appendTo($(element));
    // oncollectionchange event will be triggered only loading the Specified DataSource Completely.
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var label = first.children[0].valueModel.name;
        var value = first.children[1].valueModel.name;
        if (input.hasClass('e-dropdownlist')) { input.ejDropDownList('destroy'); }
        input.ejDropDownList({
            dataSource: contentItem.value.data,
            fields: { text: label, value: value },
            width: "200px",
            change: function (args) { contentItem.value.selectedItem = contentItem.value.data[args.itemId]; }
        });
    }
};
function createDropDownList(element, contentItem) {
    var input = $('<input />');
    input.attr('id', contentItem.name);
    input.attr('data-role', 'none');
    // Append the Input element to screen   <select>
    input.appendTo($(element));
    // oncollectionchange event will be triggered only loading the Specified DataSource Completely.
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var label = first.children[0].valueModel.name;
        var value = first.children[1].valueModel.name;
        if (input.hasClass('e-dropdownlist')) { input.ejDropDownList('destroy'); }
        input.ejDropDownList({
            dataSource: contentItem.value.data,
            fields: { text: label, value: value },
            width: "220px",
            showCheckbox: true,
            allowMultiSelection: true,
            change: function (args) { contentItem.value.selectedItem = contentItem.value.data[args.itemId]; }
        });
    }
};
function createButton(element, contentItem) {
    var input = $('<input />');
    input.attr('id', contentItem.name);
    input.attr('data-role', 'none');   
    input.appendTo($(element));   
    $("#" + contentItem.name).ejButton({
        width: "200px",
        height: "30px",
        click: "onClick"
    });
};
function createRichText(element, contentItem) {
    var input = $("<textarea />");
    input.attr('id', contentItem.name);
    input.attr("data-role", "none");
    input.appendTo($(element));
    input.ejRTE({
        width: "400px",
        showFooter: true,
        tools: {
            font: ["fontName", "fontSize", "fontColor"],
            style: ["bold", "italic", "underline", "strikethrough"],
            alignment: ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
            lists: ["unorderedList", "orderedList"],
            copyPaste: ["cut", "copy", "paste"],
            doAction: ["undo", "redo"],
            clear: ["clearFormat", "clearAll"],
            links: ["createLink"],
            images: ["image", "video"],
            tables: ["createTable", "addRowAbove", "addRowBelow", "addColumnLeft", "addColumnRight", "deleteRow", "deleteColumn", "deleteTable"],
            scripts: ["superscript", "subscript"],
            casing: ["upperCase", "lowerCase"],
            paragraph: ["paragraph"]
        },
        change: function (args) {
            contentItem.value = args.text;
        }
    });
    contentItem.dataBind("value", function (value) {
        input.ejRTE({ value: value })
    });
};
function createRanking(element, contentItem, isEnabled) {
    var input = $("<input />");
    input.attr('id', contentItem.name);
    input.attr("data-role", "none");
    input.appendTo($(element));
    // Render Rating control with input element.
    input.ejRating({
        value: 4,
        maxValue: 5,
        precision: ej.Rating.Precision.Full,
        enabled: isEnabled,
        change: function (args) {
            contentItem.value = args.value;
        }
    });
    contentItem.dataBind("value", function (value) {
        input.ejRating({ value: value })
    });
};
function hideElement(element, contentItem, obj) {
    contentItem.screen.findContentItem("'" + obj + "'").isVisible = false;
};
function displayElement(element, contentItem, obj) {
    contentItem.screen.findContentItem("'" + obj + "'").isVisible = true;
};

// G R I D 
function createList(element, contentItem) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)
    // Append the div element to screen 
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        if (itemTemplate.hasClass('e-grid')) {
            itemTemplate.ejGrid('destroy');
        };
        var first = contentItem.children[0], fieldname = [];
        var fieldFormat = "";
        for (i = 0; i < first.children.length; i++) {
            fieldname[i] = { field: first.children[i].valueModel.name };
            fieldFormat = getType(first.children[i].valueModel.name);
            switch (fieldFormat) {
                case "id":
                    $.extend(fieldname[i], { isPrimaryKey: true, textAlign: ej.TextAlign.Right, width: 60 });
                    break;
                case "date":
                    $.extend(fieldname[i], { width: 80, format: "{0:dd/MM/yyyy}" });
                    break;
                case "money":
                    $.extend(fieldname[i], { textAlign: ej.TextAlign.Right, width: 80, format: "{0:C2}" });
                    break;
                case "integer":
                    $.extend(fieldname[i], { textAlign: ej.TextAlign.Right, width: 70, format: "{0:N}" });
                    break;
                case "percent":
                    $.extend(fieldname[i], { textAlign: ej.TextAlign.Right, width: 80, format: "{0:P2}" });
                    break;
                case "string":
                    $.extend(fieldname[i], { width: 150 });
                    break;
            };
        };
        var dataManger = ej.DataManager({ json: contentItem.value.data, });
       
        itemTemplate.ejGrid({
            dataSource: dataManger,
            allowPaging: false,
            //pageSettings: { pageCount: 1, currentPage: 1, pageSize: 10 },
            //scrollSettings: { width: 0, height: 300, allowVirtualScrolling: true },
            allowResizeToFit: false,
            isResponsive: true,
            enableResponsiveRow: true,
            locale: "it-IT",
            //showSummary: true,
            //summaryRows: [
            //               { title: "Sum", summaryColumns: [{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: summarize, dataMember: summarize, format: "{0:C2}" }] },                         
            //],           
            columns: fieldname,
            toolbarSettings: {
                showToolbar: true,
                toolbarItems: [                   
                    ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.PrintGrid
                ]
            }
        });
        //alert("createList esecuzione terminata ");
    };
};
function createGrid(element, contentItem) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)
    // Append the div element to screen 
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        if (itemTemplate.hasClass('e-grid')) {
            itemTemplate.ejGrid('destroy');
        }
        var first = contentItem.children[0], fieldname = [];
        var fieldFormat = "";
        for (i = 0; i < first.children.length; i++) {            
            //alert("createGrid - " + first.children[i].valueModel.name );
            fieldname[i] = { field: first.children[i].valueModel.name };            
            fieldFormat = getType(first.children[i].valueModel.name);
            switch (fieldFormat) {
                case "id":
                    $.extend(fieldname[i], {isPrimaryKey: true, textAlign: ej.TextAlign.Right, width: 40 });
                    break;
                case "date":
                    $.extend(fieldname[i], {  width: 80, format: "{0:dd/MM/yyyy}" });
                    break;
                case "money":
                    $.extend(fieldname[i], { textAlign: ej.TextAlign.Right, width: 80, format: "{0:C2}" });
                    break;
                case "integer":
                    $.extend(fieldname[i], { textAlign: ej.TextAlign.Right, width: 50, format: "{0:N}" });
                    break;
                case "percent":
                    $.extend(fieldname[i], { textAlign: ej.TextAlign.Right, width: 40, format: "{0:P2}" });
                    break;
                case "string":
                    $.extend(fieldname[i], { width: 150 });
                    break;
            };
        }
        var dataManger = ej.DataManager({ json: contentItem.value.data,});
        //Rendering the Grid Control      
        itemTemplate.ejGrid(
           {
               //dataSource: contentItem.value.data,
               dataSource: dataManger,
               editSettings: {
                   allowEditing: false, allowDeleting: false, editMode: "batch"
                   //allowEditing: true, allowAdding: true, allowDeleting: true, editMode: ej.Grid.EditMode.DialogTemplate, dialogEditorTemplateID: "#template"
               },
               enableHeaderHover: true,
               allowPaging: true,
               //allowFiltering: true,              
               allowGrouping: true,
               groupSettings: { groupedColumns: [fieldname[0]] },
               groupSettings: {
                   showToggleButton: true,
                   showUngroupButton: true
               },
               isResponsive: true,
               allowSorting: true,
               allowMultiSorting: true,
               enableResponsiveRow: true,
               allowSelection: true,
               enableRowHover: true,
               enableAltRow: true,
               allowResizeToFit: true,
               locale: "it-IT",
               pageSettings: { pageCount: 1, currentPage: 1, pageSize: 20 },
               scrollSettings: { width:0,height: 300, allowVirtualScrolling: true},
               allowScrolling: true,
               //showSummary: true,
               //summaryRows: [
               //     { title: "Totale", summaryColumns: [{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: fieldvalue , dataMember: fieldvalue , format: "{0:C2}" }] },

               //],
               columns: fieldname,
               toolbarClick: function (e) {
                   var gridObj = $("#" + contentItem.name).ejGrid('instance');
                   gridObj.exportGrid = gridObj["export"];
                   if (e.itemName == "Excel Export") {
                       gridObj.exportGrid('../api/GridExporting/ExcelExport');
                       e.cancel = true;
                   }
                   else if (e.itemName == "Word Export") {
                       gridObj.exportGrid('../api/GridExporting/WordExport');
                       e.cancel = true;
                   }
                   else if (e.itemName == "PDF Export") {
                       gridObj.exportGrid('../api/GridExporting/PdfExport');
                       e.cancel = true;
                   }
               },
               toolbarSettings: {
                   showToolbar: true,
                   toolbarItems: [
                       ej.Grid.ToolBarItems.Edit, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Update, ej.Grid.ToolBarItems.Cancel,
                       ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.PrintGrid
                   ]
               }
           });
    };
};
function createTreeGrid(element, contentItem) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)   
    //itemTemplate.css({'width':'85%','height':'425px'});
    // Append the div element to screen 
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {         
        if (itemTemplate.hasClass('e-treegrid')) { 
            itemTemplate.ejTreeGrid('destroy'); 
        }
        var first = contentItem.children[0], fieldname = [];
        for (i = 0; i < first.children.length; i++) {
            fieldname[i] = { field: first.children[i].valueModel.name };
        }
        var dataManger = ej.DataManager({ json: contentItem.value.data, });
        //Rendering the TreeGrid Control
        itemTemplate.ejTreeGrid(
            {
                dataSource: dataManger,
                childMapping: fieldname[1],
                parentIdMapping:table.children[6].valueModel.name,
                idMapping:table.children[0].valueModel.name,
                treeColumnIndex:1,
                columns: fieldname
            }
        );
    };
};
function createReportViewer(element, contentItem) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)
    itemTemplate.css({ 'width': '100%', 'height': '450px' });
    // Append the div element to screen 
    itemTemplate.appendTo($(element));
    var dataManger = ej.DataManager({ json: contentItem.value.data, });
    itemTemplate.ejReportViewer({
        dataSource: dataManger,
        //reportServiceUrl: "../api/SSRSReport",
        processingMode: ej.ReportViewer.ProcessingMode.Local,
        reportPath: "Sales Dashboard.rdlc"
    });
};
// X L S I O 
function createXls(element, contentItem) {

}
// A C C O R D I O N 
function collapsibleContent(element, contentItem, group) {
    // provide some defaults for the optional "options" parameter     
    $element = $(element);
    if (group == undefined) {
        group = contentItem.displayName;
    };
    // create a header based on the displayName of the bound content
    var h = $('<h5 class="h5_accordion">').text(group);
    $(element).append(h);
    // build the <div> for the jQM collapsible content control data-theme="a" data-content-theme="a"
    var DIV = $('<div id="accordion" data-role="collapsible" data-mini="true" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-corners="false" data-theme="a" data-content-theme="d" data-collapsed="true"/>');
    $(element).children().wrapAll(DIV);
    // tell jQM to render the new <div>
    DIV.trigger("create");   
      
};
// S C H E D U L E 
function createSchedule(element, contentItem) {
    //**************************************Locale
    ej.Schedule.Locale["it-IT"] = {
        ReminderWindowTitle: "Finestra di avviso",
        CreateAppointmentTitle: "Creazione Appuntamento",
        RecurrenceEditTitle: "Modifica ripetizione",
        RecurrenceEditMessage: "Come si vuole cambiare la serie?",
        RecurrenceEditOnly: "Solo questo appuntamento",
        RecurrenceEditSeries: "L'intera serie",
        PreviousAppointment: "Appuntamento precedente",
        NextAppointment: "Appuntmaento successivo",
        AppointmentSubject: "Soggetto",
        StartTime: "Ora di inizio",
        EndTime: "Ora di fine",
        AllDay: "tutto il giorno",
        Today: "Oggi",
        Recurrence: "Repetizione",
        Done: "Termina",
        Cancel: "Cancella",
        Ok: "Ok",
        RepeatBy: "Ripetere per",
        RepeatEvery: "Ripetere ogni",
        RepeatOn: "Ripetere solo i giorni",
        StartsOn: "Inizio",
        Ends: "Fine",
        Summary: "Sommario",
        Daily: "giornaliero",
        Weekly: "settimanale",
        Monthly: "mensile",
        Yearly: "annuale",
        Every: "tutti",
        EveryWeekDay: "tutti giorni della settimana",
        Never: "Mai",
        After: "Dopo",
        Occurence: "Occorrenze",
        On: "Su",
        Edit: "Modifica",
        RecurrenceDay: "Giornaliero (s)",
        RecurrenceWeek: "Settimanale (s)",
        RecurrenceMonth: "Mensile (s)",
        RecurrenceYear: "Annuale (s)",
        The: "la",
        OfEvery: "di ciascun",
        First: "primo",
        Second: "secondo",
        Third: "teszo",
        Fourth: "quarto",
        Last: "Ultimo",
        WeekDay: "Giorno della settimana",
        WeekEndDay: "Giorno festivo",
        Subject: "soggetto",
        Categorize: "Categoria",
        DueIn: "Dovito a",
        DismissAll: "Cancella tutto",
        Dismiss: "Annulla",
        OpenItem: "Apri l'elemento",
        Snooze: "ripetizione",
        Day: "Giorno",
        Week: "Settimana",
        WorkWeek: "Settimana Lavorativa",
        Month: "Mese",
        AddEvent: "Aggiungi evento",
        CustomView: "Vista Personalizzata",
        Agenda: "Appuntamento del giorno",
        Detailed: "Dettagli",
        EventBeginsin: "Inizia entro",
        Editevent: "Modifica appuntamento",
        Editseries: "Modifica serie",
        Times: "",
        Until: "entro",
        Eventwas: "appuntamento schedulato",
        Hours: "ore",
        Minutes: "minuti",
        Overdue: "in ritardo",
        Days: "Giorno (s)",
        Event: "Evento",
        Select: "Selezione",
        Previous: "precedente",
        Next: "successivo",
        Close: "Chiudi",
        Delete: "Rimuovi",
        Date: "date",
        Showin: "Visualizza",
        Gotodate: "Vai alla data",
        Resources: "RESOURCES",
        RecurrenceDeleteTitle: "Supprimer répétition rendez-",
        Location: "località",
        Priority: "priorità",
        RecurrenceAlert: "Avviso",
        WrongPattern: "Il modello di ripetizione non è valido",
        CreateError: "La durée de la nomination doit être plus courte que la façon dont elle se produit fréquemment. Raccourcir la durée ou changer le modèle de récurrence dans la boîte de dialogue Récurrence de rendez.",
        DragResizeError: "Impossibile ripianificare un appuntamento ricorrente. Creare un nuovo appuntamento.",
        StartEndError: "L'orario di fine appuntamento deve essere superiore alla data inizio",
        MouseOverDeleteTitle: "Cancellazione appuntamento",
        DeleteConfirmation: "Sicuro di voler cancellare l'appuntamento?",
        Time: "Tempo"
    };
    
    //**************************************DIV
    var itemTemplate = $("<div id='Schedule1'></div>");  
    itemTemplate.appendTo($(element));
   
    //**************************************ONCOLLECTIONCHANGE
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var id = first.children[0].valueModel.name;
        var subject = first.children[1].valueModel.name;
        var starttime = first.children[2].valueModel.name;
        var endtime = first.children[3].valueModel.name;
        var allday = first.children[4].valueModel.name;
        var recurrence = first.children[5].valueModel.name;
        var recurrencerule = first.children[6].valueModel.name;
        var important = first.children[7].valueModel.name;
        var executed = first.children[8].valueModel.name;
        var ownerId = first.children[9].valueModel.name;
        var sectorid = first.children[10].valueModel.name;
        var areaid = first.children[11].valueModel.name;
        //alert("subject=" + first.children[1].valueModel.name + "\n starttime=" + first.children[2].valueModel.name + "\n endtime=" + first.children[3].valueModel.name + "\n allday=" + first.children[4].valueModel.name + " \n recurrence=" + first.children[5].valueModel.name + " \n recurrencerule=" + first.children[6].valueModel.name + " \n important=" + first.children[7].valueModel.name + " \n executed=" + first.children[8].valueModel.name + " \n ownerId=" + first.children[9].valueModel.name + " \n sectorid=" + first.children[10].valueModel.name + " \n areaid=" + first.children[11].valueModel.name);

        var dataManger = contentItem.value.data;        
        //var resorceManager= "[" ;
        var datatype = ":String"; 
        filter = "Status eq " + msls._toODataString("Si", datatype);       
        myapp.activeDataWorkspace.ApplicationData
           .Employees
           .filter(filter)
           .execute()
           .then(function (result) {
               //alert("Collaboratori attivi=" + result.results.length);                  
               if (result.results.length > 0) {                  
                   //var resorceManager = result.results;
                   var resorceManager = result.results;
                   
                   //var jsonManager = "[";
                   //for (var i = 0; i < resorceManager.length; i++) {             
                   //    jsonManager += { text: + '"' + resorceManager[i].LastName + '"', id: +resorceManager[i].Id, color: '"' + resorceManager[i].Color + '"' };
                   //    if (i < result.results.length - 1) {
                   //        jsonManager += ',';
                   //    };                      
                   //}
                   //jsonManager += "]";
               };
               //alert(resorceManager.);
           }, function (error) {
           });  
        //var dataManger = ej.DataManager({ json: contentItem.value.data, });        
        //var employees = myapp.activeDataWorkspace.ApplicationData.EmployeesByStatus;
        //resurceUri = getHost() + "ApplicationData.svc/EmployeesByStatus";
        //var resorceManager = ej.DataManager({ url: resurceUri, crossDomain: true }).executeQuery(new ej.Query().select(["Id", "Summary", "Color"]).requiresCount());
        //var dManager = ej.DataManager(window.ResourcesData).executeLocal(ej.Query().take(10));
        //**************************************Define EJSCHEDULE
        itemTemplate.ejSchedule({
            width: "100%",
            height: "525px",
            currentDate: new Date(),
            dateFormat: "dd-MM-yyyy",
            views: ["Day", "Week", "Month"],
            //workWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],           
            enableLoadOnDemand: true,
            appointmentDragArea:"body",
            categorizeSettings: {enable: true },
            prioritySettings: { enable: true },
            firstDayOfWeek: "Monday",
            timeMode: ej.Schedule.TimeMode.Hour24,
            showAllDayRow: false,
            //showLocationField: true,
            //timeZone: "UTC +2:00",
            timeScale: {enable: true, majorSlot: 60, minorSlotCount: 15},
            startHour: 8,
            endHour: 21,
            BusinessStartHour: 9,
            BusinessEndHour: 20,
            reminderSettings: { enable: true, alertBefore: 3 },
            prioritySettings: { enable: true },
            currentView: ej.Schedule.CurrentView.Week,
            //agendaViewSettings: { daysInAgenda: 2 },
            showDeleteConfirmationDialog: true,
            allowDragDrop: true,
            enableAppointmentResize: true,
            isResponsive: true,
            showQuickWindow: true,
            appointmentClick: "onAppointmentClick",
            menuItemClick: "onMenuItemClick",
            cellClick: "onCellClick",
            close: "clearFields",           
            //**************************************Define GROUP
            //group: {
            //    resources: ["Owners"],
            //},
            //**************************************Define RESOURCES       
            //resources: [{
            //    field: "ownerId", title: "Owner", name: "Owners",
            //    resourceSettings: {
            //        dataSource: resorceManager,
            //        text: "LastName", id: "id", color: "Color"
            //    }
            //}],
            //resources: [{
            //    field: "ownerId", title: "Owner", name: "Owners",
            //    resourceSettings: {
            //        dataSource: [
            //         { text: "Giuly", id: 1, color: "#f8a398" },
            //         { text: "Steven", id: 2, color: "#56ca85" },
            //         { text: "Mike", id: 3, color: "#56ca85" }],
            //        text: "text", id: "id", color: "color"
            //    }
            //}],
            //**************************************Define APPOINTMENTSETTINGS
            appointmentSettings: {                           
                dataSource: dataManger,
                id: id,
                subject: subject,
                startTime: starttime,
                endTime: endtime,
                allDay: allday,
                recurrence: recurrence,
                recurrenceRule: recurrencerule,
                priority: important,
                //resourceFields: ownerId
                //sector: sectorId,
                //ownerId: ownerId
            },
            locale: "it-IT",
        });
    }
};
function createSchedule1(element, contentItem) {
    ej.Schedule.Locale["it-IT"] = {
        ReminderWindowTitle: "Finestra di avviso",
        CreateAppointmentTitle: "Creazione Appuntamento",
        RecurrenceEditTitle: "Modifica ripetizione",
        RecurrenceEditMessage: "Come si vuole cambiare la serie?",
        RecurrenceEditOnly: "Solo questo appuntamento",
        RecurrenceEditSeries: "L'intera serie",
        PreviousAppointment: "Appuntamento precedente",
        NextAppointment: "Appuntmaento successivo",
        AppointmentSubject: "Soggetto",
        StartTime: "Ora di inizio",
        EndTime: "Ora di fine",
        AllDay: "tutto il giorno",
        Today: "Oggi",
        Recurrence: "Repetizione",
        Done: "Termina",
        Cancel: "Cancella",
        Ok: "Ok",
        RepeatBy: "Ripetere per",
        RepeatEvery: "Ripetere ogni",
        RepeatOn: "Ripetere solo i giorni",
        StartsOn: "Inizio",
        Ends: "Fine",
        Summary: "Sommario",
        Daily: "giornaliero",
        Weekly: "settimanale",
        Monthly: "mensile",
        Yearly: "annuale",
        Every: "tutti",
        EveryWeekDay: "tutti giorni della settimana",
        Never: "Mai",
        After: "Dopo",
        Occurence: "Occorrenze",
        On: "Su",
        Edit: "Modifica",
        RecurrenceDay: "Giornaliero (s)",
        RecurrenceWeek: "Settimanale (s)",
        RecurrenceMonth: "Mensile (s)",
        RecurrenceYear: "Annuale (s)",
        The: "la",
        OfEvery: "di ciascun",
        First: "primo",
        Second: "secondo",
        Third: "teszo",
        Fourth: "quarto",
        Last: "Ultimo",
        WeekDay: "Giorno della settimana",
        WeekEndDay: "Giorno festivo",
        Subject: "soggetto",
        Categorize: "Categoria",
        DueIn: "Dovito a",
        DismissAll: "Cancella tutto",
        Dismiss: "Annulla",
        OpenItem: "Apri l'elemento",
        Snooze: "ripetizione",
        Day: "Giorno",
        Week: "Settimana",
        WorkWeek: "Settimana Lavorativa",
        Month: "Mese",
        AddEvent: "Aggiungi evento",
        CustomView: "Vista Personalizzata",
        Agenda: "Appuntamento del giorno",
        Detailed: "Dettagli",
        EventBeginsin: "Inizia entro",
        Editevent: "Modifica appuntamento",
        Editseries: "Modifica serie",
        Times: "",
        Until: "entro",
        Eventwas: "appuntamento schedulato",
        Hours: "ore",
        Minutes: "minuti",
        Overdue: "in ritardo",
        Days: "Giorno (s)",
        Event: "Evento",
        Select: "Selezione",
        Previous: "precedente",
        Next: "successivo",
        Close: "Chiudi",
        Delete: "Rimuovi",
        Date: "date",
        Showin: "Visualizza",
        Gotodate: "Vai alla data",
        Resources: "RESOURCES",
        RecurrenceDeleteTitle: "Supprimer répétition rendez-",
        Location: "località",
        Priority: "priorità",
        RecurrenceAlert: "Avviso",
        WrongPattern: "Il modello di ripetizione non è valido",
        CreateError: "La durée de la nomination doit être plus courte que la façon dont elle se produit fréquemment. Raccourcir la durée ou changer le modèle de récurrence dans la boîte de dialogue Récurrence de rendez.",
        DragResizeError: "Impossibile ripianificare un appuntamento ricorrente. Creare un nuovo appuntamento.",
        StartEndError: "L'orario di fine appuntamento deve essere superiore alla data inizio",
        MouseOverDeleteTitle: "Cancellazione appuntamento",
        DeleteConfirmation: "Sicuro di voler cancellare l'appuntamento?",
        Time: "Tempo"
    };
    //**************************************DIV
    var itemTemplate = $("<div id='Schedule1'></div>");
    itemTemplate.appendTo($(element));
    //**************************************ONCOLLECTIONCHANGE
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var id = first.children[0].valueModel.name;
        var subject = first.children[1].valueModel.name;
        var starttime = first.children[2].valueModel.name;
        var endtime = first.children[3].valueModel.name;
        var allday = first.children[4].valueModel.name;
        var recurrence = first.children[5].valueModel.name;
        var recurrencerule = first.children[6].valueModel.name;
        var important = first.children[7].valueModel.name;
        var executed = first.children[8].valueModel.name;
        var ownerId = first.children[9].valueModel.name;
        var sectorid = first.children[10].valueModel.name;
        var areaid = first.children[11].valueModel.name;
        //alert("subject=" + first.children[1].valueModel.name + "\n starttime=" + first.children[2].valueModel.name + "\n endtime=" + first.children[3].valueModel.name + "\n allday=" + first.children[4].valueModel.name + " \n recurrence=" + first.children[5].valueModel.name + " \n recurrencerule=" + first.children[6].valueModel.name + " \n important=" + first.children[7].valueModel.name + " \n executed=" + first.children[8].valueModel.name + " \n ownerId=" + first.children[9].valueModel.name + " \n sectorid=" + first.children[10].valueModel.name + " \n areaid=" + first.children[11].valueModel.name);
        var dataManger = contentItem.value.data;
       
        //resurceUri = getHost() + "ApplicationData.svc/Appointment4Schedule/";
        //var dataManager = ej.DataManager({
        //    url: resurceUri,
        //    crossDomain: true
        //});
            
        
        //**************************************Define EJSCHEDULE
        itemTemplate.ejSchedule({
            width: "100%",
            height: "525px",          
            currentDate: new Date(2015, 04, 05),
            dateFormat: "dd-MM-yyyy",
            views: ["Day", "Week", "Month"],         
            enableLoadOnDemand: true,
            appointmentDragArea: "body",
            categorizeSettings: { enable: true },
            prioritySettings: { enable: true },
            firstDayOfWeek: "Monday",
            timeMode: ej.Schedule.TimeMode.Hour24,
            showAllDayRow: false,
            timeScale: { enable: true, majorSlot: 60, minorSlotCount: 15 },
            startHour: 8,
            endHour: 21,
            BusinessStartHour: 9,
            BusinessEndHour: 20,
            reminderSettings: { enable: true, alertBefore: 3 },
            currentView: ej.Schedule.CurrentView.Week,
            //agendaViewSettings: { daysInAgenda: 2 },
            showDeleteConfirmationDialog: true,
            allowDragDrop: true,
            enableAppointmentResize: true,
            isResponsive: true,
            showQuickWindow: true,
            appointmentClick: "onAppointmentClick",
            menuItemClick: "onMenuItemClick",
            cellClick: "onCellClick",
            close: "clearFields",           
            locale: "it-IT",
            group: {
                resources: ["Owners"]
            },
            resources: [{
                field: "ownerId", title: "Owner", name: "Owners",
                allowMultiple: true,
                resourceSettings: {
                    dataSource: [{
                        text: "Giuly",
                        id: 1,
                        color: "#f8a398"
                    }, {
                        text: "Steven",
                        id: 2,
                        color: "#56ca85"
                    }, {
                        text: "Mike",
                        id: 3,
                        color: "#56ca85"
                    }],
                    text: "text", id: "id", color: "color"
                }
            }],
            appointmentSettings: {
                resourceFields: "ownerId",
                //dataSource: dataManger,
                //id: id,
                //subject: subject,
                //startTime: starttime,
                //endTime: endtime,
                //allDay: allday,
                //recurrence: recurrence,
                //recurrenceRule: recurrencerule,
                //priority: important,
                //ownerId: ownerId,
                //sector: sectorId,                
           
                dataSource: [{
                    Id: 100,
                    Subject: "Research on Sky Miracles",
                    StartTime: new Date(2015, 04, 05, 9, 00),
                    EndTime: new Date(2015, 04, 05, 10, 30),
                    ownerId: 2
                }, {
                    Id: 101,
                    Subject: "Research on Clouds",
                    StartTime: new Date(2015, 04, 07, 10, 00),
                    EndTime: new Date(2015, 04, 07, 11, 30),
                    ownerId: 1
                }, {
                    Id: 102,
                    Subject: "Research on tube",
                    StartTime: new Date(2015, 04, 06, 11, 00),
                    EndTime: new Date(2015, 04, 06, 11, 30),
                    ownerId: 3
                }],
            }
        });
    }
}

function onAppointmentClick(args) {
    var data = args.appointment;
    myapp.showViewAppointment(data);
}
function onCellClick(args) {
    args.cancel = true; // Prevents the display of quick window on clicking the cells.
}
function onMenuItemClick(args) {     
    if (args.events.ID == "new") {
        myapp.showAddEditAppointment();
    };
    if (args.events.ID == "export") {
        var obj = $("#Schedule1").data("ejSchedule");
        //exportSchedule();// method will send a post to the server-side to call a specified action.
        obj.exportSchedule("ExportToICS", null, args.targetInfo.Id);
    };
    if (args.events.ID == "cancella") {
        var obj = $("#Schedule1").data("ejSchedule");
        obj.deleteAppointment(args.appointment.Guid);        
    }
    if (args.events.ID == "refresh") {       
        var obj = $("#Schedule1").data("ejSchedule");
        obj.refresh();
    }
    if (args.events.ID == "print") {
        var obj = $("#Schedule1").data("ejSchedule");
        obj.print();
    }
}

//C H A R T
function createChart(element, contentItem, title) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)
    //$(itemTemplate).width(1000);
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var xName = first.children[0].valueModel.name;
        var yName = first.children[1].valueModel.name;
        var yName1 = first.children[2].valueModel.name;
        var unit = getMeasure(yName);
        var unit1 = getMeasure(yName1);
        if (itemTemplate.hasClass('e-chart')) {
            itemTemplate.ejChart('destroy');
        };
        var dataManger = ej.DataManager({ json: contentItem.value.data, });
        itemTemplate.ejChart(
            {
                primaryXAxis:
                   {
                       majorGridLines: { visible: true, color: "#a9a9a9", opacity: 0.12 },
                       title: {
                           text: xName + " in " + unit1,
                           labelIntersectAction: 'rotate45',
                           enableTrim: true
                       },
                       labelFormat: "{value}" ,
                   },
                    primaryYAxis:
                    {
                        title: {
                            text: yName + " in " + unit,
                            labelIntersectAction: 'none',
                            enableTrim: true
                        },
                        labelFormat: "{value}"  ,
                    },
                    axes: [{
                            majorGridLines:
                            {
                                visible: false
                            },
                            orientation: 'Vertical',
                            opposedPosition: true,
                            axisLine: { visible: true },
                            rangePadding: 'None',
                            name: 'yAxis',
                            labelFormat: '{value}' + unit1,
                            title: { text: yName1 + " in " + unit1 }
                        }
                    ],
                series: [
                    {
                        trendines: [{ visibility: 'visible', type: 'Logarithmic', forwardForecast: 5 }],
                        dataSource: contentItem.value.data,
                        //dataSource: dataManger,
                        xName: xName,
                        yName: yName,
                        name: xName,
                        type: 'stackingcolumn',
                        enableAnimation: true,
                        marker:
                           {
                               dataLabel:
                               {
                                   shape: 'None',
                                   connectorLine: { type: 'bezier', color: 'black', width: 1 },
                                   font: { color: 'white', size: '12px' },
                                   visible: true,
                                   //angle: 90,
                                   textPosition: 'bottom',
                                   //template: 'template',
                                   border: { width: 1 }
                               }
                           },
                        tooltip: {
                            visible: true,
                            format: "#point.x# " + yName + " #point.y#"+unit,
                            enableAnimation: true,
                            duration: "600ms",
                            rx: "50", ry: "50"
                        },
                    },
                    {
                        dataSource: contentItem.value.data,
                        //dataSource: dataManger,
                        xName: xName,
                        yName: yName1,
                        name: yName1,
                        type: 'line',
                        enableAnimation: true,
                        marker:
                            {
                                dataLabel:
                                {
                                    shape: 'Circle',
                                    visible: true,
                                    textPosition: 'top',
                                    font: { color: 'white', size: '10px' },
                                    border: { width: 1 },
                                    connectorLine: { type: 'Bezier', height: 12, width: 1 }
                                }
                            },
                        tooltip: {
                            visible: true,
                            format: "#point.x# " + yName1 + " #point.y#"+ unit1,
                            enableAnimation: true,
                            duration: "600ms",
                            rx: "50", ry: "50"
                        },
                    }
                ],
                palette: ["#008299", "#D24726", "#6A4B82"],
                enableCanvasRendering: true,
                depth: 100,
                wallSize: 2,
                tilt: 0,
                //rotation: 15,
                //perspectiveAngle: 90,
                sideBySideSeriesPlacement: true,
                //canResize: true,
                //zooming: { enable: true, enableMouseWheel: true },
                backGroundImageUrl: '../images/bi.jpg',
                legend: { visible: true, position: 'bottom', alignment: 'center', opacity: 1.5, itemPadding: 20 },
                title: {
                    text: title,
                    //subTitle: { text: "Valori espressi in " + unit }
                },                
                theme: 'gradient-azuredark',
            }
        )
    };
};
function createChart3D(element, contentItem, title) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)
    //$(itemTemplate).width(1000);
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var xName = first.children[0].valueModel.name;
        var yName = first.children[1].valueModel.name;
        var yName1 = first.children[2].valueModel.name;       
        var unit = getMeasure(yName);
        var unit1 = getMeasure(yName1);
        if (itemTemplate.hasClass('e-chart')) {
            itemTemplate.ejChart('destroy');
        };
        //var dataManger = ej.DataManager({ json: contentItem.value.data, });
        //var dataManger = contentItem.value.data;
        itemTemplate.ejChart(
              {
                primaryXAxis:
                { 
                    majorGridLines: { visible: true, color: "#a9a9a9", opacity: 0.12 },
                    title: {
                        text: xName + " in " + unit1,
                        labelIntersectAction: 'rotate45',
                        enableTrim: true
                    },
                    labelFormat: "{value}" + unit1,
                },
                primaryYAxis:
                {
                    title: {
                        text: yName + " in " + unit,
                        labelIntersectAction: 'none',
                        enableTrim: true
                    },
                    labelFormat: "{value}" + unit,
                },
                axes: [{
                    majorGridLines:
                    {
                        visible: false
                    },
                    orientation: 'Vertical',
                    opposedPosition: true,
                    axisLine: { visible: true },
                    rangePadding: 'normal',
                    name: 'yAxis',
                    labelFormat: '{value}'+ unit1,
                    title: { text: yName1 }
                    }
                ],
                  //zooming: { enable: true },
                  //backGroundImageUrl: '../images/bi.jpg',                   
                series: [
                    {trendines: [{visibility: 'visible', type: 'Logarithmic', forwardForecast: 5 }],                   
                    dataSource: contentItem.value.data,
                    xName: xName,
                    yName: yName,                   
                    name: xName,                   
                    marker:
                       {
                           dataLabel:
                           {
                               shape: 'None',
                               connectorLine: { type: 'bezier', color: 'black', width: 1 },
                               font: { color: 'white', size: '12px' },
                               visible: true,
                               angle: 90,
                               textPosition: 'middle',
                               template: 'template' ,
                               border: { width: 1 }
                           }
                       },                     
                    tooltip: {
                        visible: true,
                        //format: "#point.x# " + yName + " #point.y#" + unit,
                        format: "#point.x# " + yName + " #point.y#",
                        enableAnimation: true,
                        duration: "600ms",
                        rx: "50", ry: "50"
                    },
                    type: 'stackingcolumn'
                    },
                    {
                        dataSource: contentItem.value.data,
                        xName: xName,
                        yName: yName1,
                        name: yName1,
                        type: 'stackingcolumn',
                        enableAnimation: true,
                        marker:
				            {
				                dataLabel:
					            {
					                shape: 'Circle',
					                visible: true,
					                textPosition: 'top',
					                font: { color: 'white', size: '12px' },
					                border: { width: 1 },
					                connectorLine: { type: 'Bezier', height: 20, width: 1 }
					            }
				            },
                        tooltip: {
                            visible: true,
                            //format: "#point.x# " + yName1 + " #point.y#" + unit1,
                            format: "#point.x# " + yName1 + " #point.y#",
                            enableAnimation: true,
                            duration: "600ms",
                            rx: "50", ry: "50"
                        },
                    }
                ],
                palette: ["#008299", "#D24726", "#6A4B82"],
                enable3D: true,	
                enableRotation: true,
                //enableCanvasRendering: true,
                depth: 100,
                wallSize: 2,
                tilt: 0,
                rotation: 15,
                perspectiveAngle: 90,
                sideBySideSeriesPlacement: true,      
                canResize: true,   
                zooming: { enable: true, enableMouseWheel: true },
                legend: { visible: true, position: 'bottom', alignment: 'center', opacity: 1.5, itemPadding: 20 },                  
                title: {
                    text: title,
                    subTitle: { text: "Valori espressi in " + unit }
                },
                theme: 'gradient-azuredark',
              });
    }
};
function createPie(element, contentItem, title) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name);
    itemTemplate.appendTo($(element)); 
    contentItem.value.oncollectionchange = function () { 
        var first = contentItem.children[0]; 
        var xName=first.children[0].valueModel.name; 
        var yName = first.children[1].valueModel.name; 
        var yName1 = first.children[2].valueModel.name; 
        if (itemTemplate.hasClass( 'e -chart' )) { 
            itemTemplate.ejChart( 'destroy' );
        } 
        // Render Chart control with div element. 
        itemTemplate.ejChart( 
            {
                commonSeriesOptions:
			    {
			        labelPosition: 'outside',
			        tooltip: { visible: true, format: "#point.x# : #point.y#" },
			        marker:
				    {
				        dataLabel:
					    {
					        shape: 'none',
					        visible: true,
					        textPosition: 'top',
					        border: { width: 1 },
					        connectorLine: { height: 35, stroke: "black" }
					    }
				    }
			    },
                series: [ 
                    { 
                        dataSource: contentItem.value.data, 
                        xName: xName, 
                        yName: yName, 
                        type: 'pie',
                        tooltip: { visible: true },
                        name: contentItem.name,
                        explodeIndex: 0,
                        border: { width: 2, color: 'white' },                       
                        labelPosition: 'outside',
                        startAngle: 145
                    } 
                ], 
                enable3D: true,
                enableRotation: true,
                depth: 30,
                tilt: -30,
                rotation: -30,
                perspectiveAngle: 90,
                tooltip: { visible: true },
                zooming: { enable: true, enableMouseWheel: true },
                legend: { visible: true, position: 'bottom', alignment: 'center' },
                title: {
                    text: title,
                    subTitle: { text: "Valori espressi in " + unit }
                },
                theme: 'gradient-azuredark',
                canResize: true,
        }); 
    }
};
function createDoughnut(element, contentItem, title) {
    //doughnut
    var itemTemplate = $("<div></div>").attr('id', contentItem.name);
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var xName = first.children[0].valueModel.name;
        var yName = first.children[1].valueModel.name;
        var yName1 = first.children[2].valueModel.name;
        var unit = getMeasure(yName);                 
        //alert(yName + " " + unit);       
        if (itemTemplate.hasClass('e -chart')) {
            itemTemplate.ejChart('destroy');
        }
        // Render Chart control with div element.  dataLabel: { visible: true, template: 'template' }
        itemTemplate.ejChart(
            {                
                commonSeriesOptions:
			    {
			        labelPosition: 'inside',
			        tooltip: { visible: true, format: "#point.x# " + yName + " #point.y#%"},
			        marker:
				    {
				        dataLabel:
					    { 
					        shape: 'none',
					        labelFormat: "{value}%",
					        visible: true,
					        font: { color: '#333333', size: '18px' },
					        textPosition: 'center',
					        border: { width: 1 },
					        connectorLine: { height: 35, stroke: "black" }
					    }
				    }
			    },
                series: [
                    {
                        dataSource: contentItem.value.data,
                        xName: xName,
                        yName: yName,  
                        doughnutCoefficient: 0.5, 
                        doughnutSize: 0.8,
                        type: 'doughnut', 
                        startAngle: 145,
                        tooltip: { visible: true },
                        name: contentItem.name,
                        explodeIndex: 0,
                        border: { width: 2, color: 'white' },                        
                        startAngle: 145
                    }
                ],
                enable3D: true,
                enableRotation: true,
                depth: 30,
                tilt: -30,
                rotation: -30,
                perspectiveAngle: 90,
                tooltip: { visible: true },
                //zooming: { enable: true, enableMouseWheel: true },
                legend: { visible: true, position: 'bottom', alignment: 'center' },
                title: {
                    text: title,
                    subTitle: { text: "Valori espressi in " + unit }
                },
                theme: 'gradientdark',
                canResize: true,
            });
    }
};
function createBullet(element, contentItem, title) {
    var itemTemplate = $("<div></div>").attr('id', "container")
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var category = first.children[0].valueModel.name;
        var featureMeasure = first.children[1].valueModel.name;
        var comparativeMeasure = first.children[2].valueModel.name;
        if (itemTemplate.hasClass('e-bulletgraph')) {
            itemTemplate.ejBulletGraph('destroy');
        }
        itemTemplate.ejBulletGraph(
              {
                  height: 540,
                  qualitativeRangeSize: 320,
                  tooltipSettings: { visible: true },
                  quantitativeScaleSettings: {
                      //  location: { x: 110, y: 10 },
                      minimum: 0,
                      maximum: 9.9,
                      interval: 1,
                      minorTicksPerInterval: 4,
                      majorTickSettings: { width: 1, size: 13, stroke: 'gray' },
                      minorTickSettings: { width: 1, size: 5, stroke: 'gray' },
                      labelSettings: { offset: 14, size: 10, labelPrefix: '$ ', labelSuffix: 'K' }
                  },
                  fields: {
                      dataSource: contentItem.value.data,
                      category: category,
                      featureMeasures: featureMeasure,
                      comparativeMeasure: comparativeMeasure
                  },
                  theme: 'gradient-azuredark',
                  enableResizing: true,
              });
        var bullet = $("#container").data("ejBulletGraph");
        var $svgObj = $(bullet.svgObject);
        $svgObj.width($(bullet.element).width());
        $svgObj.height($(bullet.element).height());
        bullet.redraw();
    }
};
function createGauge(element,valore, size, max) {
    //var valore = contentItem.value;
   
    if (isNaN(max)) {
        max = 10;
    };
    if (valore == undefined || valore == null) {
        valore = 0;
    };
    
    var unit = "";
    var interval = 1;
    rapporto = max / 10;
    if (max > 10) {       
        interval = max / 10;
    };
    startLowest = 0;
    endLowest = rapporto;
    startLow = rapporto;
    endLow = rapporto * 3;
    startMedium = rapporto*3;
    endMedium = rapporto * 7;
    startHigh = rapporto*7;
    endHigh = max;
    unit = "";
    switch (valore) {
        case valore > 120000000:
            //valore = valore / 10000000;
            unit = "M";
            break;
        case valore > 12000000:
            //valore = valore / 1000000;
            unit = "M";
            break;
        case valore > 1200000:
            //valore = valore / 100000;
            unit = "M";
            break;
        case valore > 120000:
            //valore = valore / 10000;
            unit = "K";
            break;
        case valore > 12000:
            //valore = valore / 1000;
            unit = "K";
            break;
        case valore > 1200:
            //valore = valore / 100;
            unit = "K";
            break;
        case valore > 120:
            //valore = valore / 10;
            unit = "";
            break;
        case valore < 100:
            //valore = valore * 10;
            unit = "%";
            break;
    };
    //alert(valore);
    //var itemTemplate = $("<div></div>").attr('id', contentItem.name);
    var itemTemplate = $("<div></div>");
    itemTemplate.appendTo($(element))
    itemTemplate.ejCircularGauge({
        backgroundColor: "transparent", width: size, load: "loadGaugeTheme",
        enableResize: true,
        enableAnimation: true,
        animationSpeed: 1000,
        scales: [{
            showRanges: true,
            startAngle: 122,
            sweepAngle: 296,
            radius: size / 2.2,
            showScaleBar: true, size: 1, maximum: max,
            majorIntervalValue: interval , minorIntervalValue: interval/2 ,
            border: {
                width: 0.5,
            },
            pointers: [{
                value: valore,
                showBackNeedle: true,
                backgroundColor: "Yellow",
                backNeedleLength: size / 12,
                length: size / 2.5,
                width: 6,
                pointerCap: { radius: 10 }
            }],
            ticks: [{
                type: "major",
                distanceFromScale: 5,
                height: 16,
                width: 1, color: "#8c8c8c"
            },
            {
                type: "minor", height: 8, width: 1,
                distanceFromScale: 2, color: "#8c8c8c"
            }],
            labels: [{
                color: "#8c8c8c",
                unitText: unit,
                unitTextPosition: "back"
            }],
            ranges: [{
                distanceFromScale: -20,
                startValue: startLowest,
                endValue: endLowest,
                backgroundColor: "#fc0606",
                border: { color: "#fc0606" }
            }, {
                distanceFromScale: -20,
                startValue: startLow,
                endValue: endLow,
                backgroundColor: "#f5b43f",
                border: { color: "#f5b43f" }
            }, {
                distanceFromScale: -20,
                startValue: startMedium,
                endValue: endMedium
            },
            {
                distanceFromScale: -20,
                startValue: startHigh,
                endValue: max,
                backgroundColor: "green",
                border: { color: "green" }
            }]
        }]
    });
};
function createCombinationChart(element, contentItem, title) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
        var first = contentItem.children[0];
        var xName = first.children[0].valueModel.name;
        var yName = first.children[1].valueModel.name;
        var yName1 = first.children[2].valueModel.name;
        if (itemTemplate.hasClass('e-chart')) {
            itemTemplate.ejChart('destroy');
        }
        itemTemplate.ejChart(
              {
                  primaryXAxis:
                  {
                      labelIntersectAction: 'hide',
                  },
                  axes: [{
                      name: 'yaxis',
                      opposedPosition: true
                  }],
                  series: [{
                      dataSource: contentItem.value.data,
                      xName: xName,
                      yName: yName,
                      fill: "#69D2E7",
                      name: contentItem.name,
                  },
                   {
                       dataSource: contentItem.value.data,
                       xName: xName,
                       yName: yName1,
                       yAxisName: 'yaxis',
                       type: 'line',
                       name: 'Total Transaction',
                       marker:
                             {
                                 shape: 'circle',
                                 size:
                                  {
                                      height: 8, width: 8
                                  },
                                 visible: true
                             }
                   }
                  ],
                  tooltip: { visible: true },
                  zooming: { enable: true, enableMouseWheel: true },
                  legend: { visible: true, position: 'bottom', alignment: 'center' },
                  title: { text: title },
                  theme: 'gradient-azuredark',
                  enableRotation: true,
                  canResize: true,
                  rotation: 30,
              });
    };
}
function createBar(element, label, image, size) {
    // Generate the input element. '<p>' + label + '</p><img src="' + image + '" alt="' + size*20000 + '" height="25"  width="' + size + 'px"><br>'
    $(element).append('<p>' + label + '</p><img src="' + image + '" alt="' + size * 20000 + '" height="25"  width="' + size + 'px"><br>');
};
//  L O C A L  S T O R A G E  local storage
function Cart_check() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
        msls.showMessageBox("Il tuo browser deve essere aggiornato.....non posso aggiungee articoli al carrello della spesa", { title: item });
    }
}
function Cart_checkItem(code) {
    //Cart_checkItem(code) verifica se il codice prodotto esite nel carrello della spesa
    var v1 = localStorage.getItem(code);
    rtn = false;
    if (v1 !== undefined && v1 !== null) {
        rtn = true
    };
    return rtn;
}
function LocalStorage_setItem(code, value) {    
    if (Cart_check()) {
        localStorage.setItem(code, value);
        //alert("setItem "+ code + " = " + value);
    }
}
function LocalStorage_getItem(code) {
    if (Cart_check()) {
        var item = localStorage.getItem(code);
        return item;
    }
}

// M E N U
function createMenu() {       
    $(function () {
        $("#navpane").ejNavigationDrawer({
            type: "overlay",
            direction: "left",
            enableListView: true,
            targetId: "target",
            listViewSettings: { width: 235, mouseDown: 'slideMenuClick', persistSelection: true },
            position: "fixed"
        });
        $("#navpane").ejNavigationDrawer("open");
        $("#butdrawer").click(function () {
            $("#navpane").ejNavigationDrawer("open");
        });
    });
};

function slideMenuClick(args) {  //data-ej-touchend   
    //alert(args.text);
    switch (leftback(args.text, " ")) {
        case "0": // "Home"
            scr = "Navigator";
            break;
        case "1": //Clienti
            //Customer, photoBook, Offerte Promozioni,Diario Trattamenti
            scr = "BrowseCustomers";
            break;
        case "2": //Listino
            //Prodotti Servizi, Offerte, Brand, Category,Inventario
            scr = "BrowseProduct";
            break;
        case "3": //Fornitori
            //Supplier, Rappresentanti
            scr = "BrowseSuppliers";
            break;
        case "4":    //   Appuntamenti      
            scr = "BrowseAppointment1";
            break;
        case "6": //Statistiche
            scr = "Home_Statistics";
            break;
        case "5": //Vendita
            scr = "BrowseOrder_By_Date";
            break;
        case "7": //Collaboratori
            //Risorse, Ruolo, livello, skill, certificazioni, Ferie
            scr = "BrowseEmployees";
            break;        
        case "Documenti": //Documenti
            //Documenti, type,
            scr = "BrowseDocuments";
            break;
        case "8": //Amministrazione
            //ToDoListEconomics (Offerte, Ordini, Benestare, Fatture) con WorkFlow
            scr = "BrowseFirst_note";
            break;
        case "9": //Configurazione
            //Iva,Orari Negozio
            scr = "Home_Configurazione";
            break;
    };
    msls.application.showScreen(scr, null, null);
    $("#navpane").ejNavigationDrawer("close");
}
function TileCreation(element, contentItem) {
    var SampleList = [
        { imgClass: "Editor", sampleName: "Editors", screenName: "BrowseEmployeeInfo" },
        { imgClass: "DatePicker", sampleName: "DatePicker", screenName: "DatePicker" },
        { imgClass: "DateTimePicker", sampleName: "DateTimePicker", screenName: "DateTimePicker" },
        { imgClass: "TimePicker", sampleName: "TimePicker", screenName: "TimePicker" },
        { imgClass: "Editor", sampleName: "TextBoxes", screenName: "TextBoxes" },
        { imgClass: "RichTextBox", sampleName: "RichTextEditor", screenName: "RichTextEditor" },
        { imgClass: "AutoComplete", sampleName: "AutoComplete", screenName: "AutoComplete" },
        { imgClass: "DropDownList", sampleName: "DropDownList", screenName: "DropDownList" },
        { imgClass: "Slider", sampleName: "Slider", screenName: "Slider" },
        { imgClass: "ProgressBar", sampleName: "ProgressBar", screenName: "ProgressBar" },
        { imgClass: "grid", sampleName: "Grid", screenName: "Grid" },
        { imgClass: "Chart", sampleName: "Chart", screenName: "Chart" },
        { imgClass: "CircularGauge", sampleName: "CircularGauge", screenName: "CircularGauge" },
        { imgClass: "LinearGauge", sampleName: "LinearGauge", screenName: "LinearGauge" },
        { imgClass: "DigitalGauge", sampleName: "DigitalGauge", screenName: "DigitalGauge" },
        { imgClass: "TreeMap", sampleName: "TreeMap", screenName: "TreeMapFlatCollection" },
        { imgClass: "Maps", sampleName: "Maps", screenName: "Maps" },
        { imgClass: "RangeNavigator", sampleName: "RangeNavigator", screenName: "RangeNavigator" },
        { imgClass: "BulletGraph", sampleName: "BulletGraph", screenName: "BulletGraph" },
        { imgClass: "ReportViewer", sampleName: "ReportViewer", screenName: "ReportViewer" }
    ];
    var root = $('<ul class="tile-ul"></ul>'), content = "";
    $(element).append(root);
    $(SampleList).each(function (i, val) {
        content = "<li class='tile-li' data='" + val.screenName + "'> " +
            "<div><span class= 'innerList tile-img " + val.imgClass + "'>" + "</span>"
                    + "<span class= 'innerList  tile-txt'>" + val.sampleName + "</span></div>"
                    + "</li>"
        $(root).append(content);
    });
    // to remove screen display name in layout
    $(".msls-label").remove();
};
function TileChartCreation(element, contentItem) {
    $(element).find("#chart").remove();
    var SampleList = [
        { imgClass: "CombinationChart", sampleName: "Combination Chart", screenName: "CombinationChart" },
        { imgClass: "Chart3D", sampleName: "Chart3D", screenName: "Chart3D" },
        { imgClass: "MultipleAxes", sampleName: "Multiple Axes", screenName: "MultipleAxes" },
        { imgClass: "LiveChart", sampleName: "Live Chart", screenName: "LiveChart" },
       { imgClass: "DrillDown", sampleName: "DrillDown", screenName: "DrillDownChart" }

    ];
    var root = $('<ul class="tile-ul" id="chart"></ul>'), content = "";
    $(element).append(root);
    $(SampleList).each(function (i, val) {
        content = "<li class='charttile-li' id='chartControl' data='" + val.screenName + "'> " +
            "<div><span class= 'innerList tile-img " + val.imgClass + "'>" + "</span>"
                    + "<span class= 'innerList  tile-txt'>" + val.sampleName + "</span></div>"
                    + "</li>"
        $(root).append(content);
    });
    // to remove screen display name in layout
    $(".msls-label").remove();
};
function TileGridCreation(element, contentItem) {
    $(element).find("#grid").remove();
    var SampleList = [
        { imgClass: "FlatGrid", sampleName: "Flat Grid", screenName: "FlatGrid" },
        { imgClass: "Exporting", sampleName: "Exporting", screenName: "Exporting" },
        { imgClass: "Summary", sampleName: "Summary", screenName: "Summary" },
        { imgClass: "ColumnTemplate", sampleName: "Column Template", screenName: "ColumnTemplate" }
    ];
    var root = $('<ul class="tile-ul" id="grid"></ul>'), content = "";
    $(element).append(root);
    $(SampleList).each(function (i, val) {
        content = "<li class='gridtile-li' id='gridcontrol' data='" + val.screenName + "'> " +
            "<div><span class= 'innerList tile-img " + val.imgClass + "'>" + "</span>"
                    + "<span class= 'innerList  tile-txt'>" + val.sampleName + "</span></div>"
                    + "</li>"
        $(root).append(content);
    });
    // to remove screen display name in layout
    $(".msls-label").remove();
};
// S Y S T E M
function getPath(){
    var path = location.hostname + ":" + location.port + location.pathname;
   // alert(path);
    return path;
};
function getHost() {
    var path = location.hostname + ":" + location.port +"/";
    // alert(path);
    return path;
};
function PrintElement(element) {
    var printGrid = document.getElementById(element);
    var printwin = window.open('', 'Stampa', 'left=100,top=100,width=640,height=480,tollbar=0,scrollbars=1,status=0,resizable=1');
    printwin.document.write(printGrid.outerHTML);
    printwin.document.close();
    printwin.focus();
    printwin.print();
    printwin.close();
}
// U T I L I T Y

function appointment(id, subject, starttime, endtime, allday, recurrence, recurrencerule, important, executed, ownerId, sectorid, areaid) {
    this.id = id;
    this.subject = subject;
    this.starttime =starttime ;
    this.endtime = endtime;
    this.allday = allday;
    this.recurrence = recurrence;
    this.recurrencerule =recurrencerule ;
    this.important = important
    this.executed = executed;
    this.ownerId =ownerId;
    this.sectorid =sectorid ;
    this.areaid = areaid;
}
function validazione_email(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) return false; else return true;
}
function getCounter(value, year) {
    var datatype = ":String";
    today = new Date();
    var existing = myapp.Contatore;
    filter = "Tipo_Contatore eq " + msls._toODataString(value, datatype);  
    myapp.activeDataWorkspace.ApplicationData
   .Contatori
   .filter(filter)
   .execute()
   .then(function (result) {
       alert("elementi risultato ricerca=" + result.results.length);
       if (result.results.length > 0) {
           //if row counter exist      
           existing = result.results[0];
           alert("getCounter1");
       } else {
           //if row counter ! exist           
           existing = new myapp.Contatore();
           existing.Tipo_Contatore = value;
           if (year * 1 > 0) {
               existing.Anno = today.getFullYear();
           }
           existing.Valore = 0;
           alert("getCounter2");
       }
   }, function (error) {
   });
    alert("getCounter3=");
    if (year * 1 > 0) {
        if ((year * 1) > (existing.Anno * 1)) {
            existing.Valore = 0;
        };
    };
    existing.Valore = (existing.Valore * 1) + 1;
    alert("getCounter4=");
    return existing.Valore;
};
function showDialog(title, element) {
    //$(element).add(Cart_ProductList());
    $(element).ejDialog({
        title: title,
        //contentUrl: "javascript:Cart_ProductList()",       
        //contentType: "ajax",  
        //actionButtons: "close",          
        locale: "it-IT",
        width: 760,
        height: 600,
        showRoundedCorner: true,
        enableModal: true,
        isResponsive: true,
        enableAnimation: true,
        animation: {
            //animation settings while opening the dialog
            show: { effect: "slide", duration: 500 },
            //animation settings while closing the dialog
            hide: { effect: "fade", duration: 500 }
        },
    })
    $(element).ejDialog({
        close: function (args) {
            $(element).ejDialog("destroy");
        }
    });
};
function text2speech(text, callback) {
    var synth = window.speechSynthesis;
    var voices = synth.getVoices();
    var SSU = new SpeechSynthesisUtterance();    
    SSU.text = text;
    SSU.lang = 'it-IT';
    SSU.volume = 1; // 0 to 1    
    SSU.pitch = 2; //0 to 2
    SSU.rate = 1;
    SSU.voice = voices[4]; // Note: some voices don't support altering params
    SSU.voiceURI = 'native';
    SSU.onend = function () {
        if (callback) {
            callback();
        }
    };
    SSU.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };
    //speechSynthesis.speak(SSU);
    synth.speak(SSU);
}
function speech2text(contentItem){
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function (e) {
        var textarea = document.getElementById(contentItem);
        for (var i = e.resultIndex; i < e.results.length; ++i) {
            if (e.results[i].isFinal) {
                textarea.value += e.results[i][0].transcript;
            }
        }
    }
    recognition.start();
};
function Informativa() {
    var txt = '<html><head>';
    txt += '<link rel="stylesheet" type="text/css" href="./Content/light-theme-2.5.4.css" />';
    txt += '<link rel="stylesheet" type="text/css" href="./Content/msls-light-2.5.4.css" />';
    txt += '<link rel="stylesheet" type="text/css" href="./Content/jquery.mobile.structure-1.3.0.min.css" />';
    txt += '<link rel="stylesheet" type="text/css" href="./Content/msls-2.5.4.min.css" />';
    txt += '<link rel="stylesheet" type="text/css" href="./Content/user-customization.css" />';
    txt += '</head>';
    txt += '<script type="text/javascript" src="' + location.origin + '/HTMLClient/Scripts/essebi.js" charset="utf-8"></script>';
    txt += '<body style="font-family: Arial, Helvetica, sans-serif;">';
    txt += '<h1>Informativa privacy su utilizzo cookies  art. 13 D. Lgs. n. 196/2003</h1>' +
      "<br/>La presente informativa ha lo scopo di illustrare le tipologie e le modalita' di utilizzo dei cookie," +
      "e di fornire indicazioni volte ad eliminare o rifiutare i cookie presenti sul sito web, se lo si desidera.<br/>" +
      "Cosa sono i Cookie?<br/>" +
     "I cookie sono dei piccoli file di testo contenenti delle informazioni scambiate tra il server di  www.geniusloci.company e il tuo computer." +
      "Permettono di creare delle statistiche sulle aree del sito visitate dagli utenti in modo anonimo" +
      "e vengono memorizzati per essere poi ritrasmessi al sito stesso alla visita successiva." +
      "I cookie servono a migliorare i servizi che ti offriamo. Alcuni sono strettamente necessari per l'utilizzo del sito," +
   "altri consentono invece di ottimizzarne le prestazioni e di offrire una migliore esperienza all'utente.<br/>" +
   "Durante la tua navigazione sul sito internet acquisiamo alcuni dati, come l'indirizzo IP del tuo computer" +
   "e le pagine del sito visitate.<br/>Questi dati vengono raccolti esclusivamente per assicurarci che il sito sia funzionante e navigabile in modo corretto." +
   "Raccogliamo alcuni dati per fini commerciali e, in alcuni casi, per l'identificazione dell'utente, che resta anonimo.<br/>" +
   "Informazioni di questo tipo sono presenti in appositi log e possono essere comunicate solo all'Autorita' Giudiziaria, nei casi previsti dalla legge." +
   "Quando visiti il sito, i cookie residenti sul tuo computer vengono riconosciuti dai nostri server." +
   "Con l'utilizzo dei cookie non vengono registrati i tuoi dati personali ma il tuo percorso di navigazione e le tue preferenze," +
   "allo scopo di agevolare la ricerca e di memorizzare alcuni dati che evitano il reinserimento di informazioni in caso di acquisto o di ricerca.<br/>" +
   "Se desideri eliminare i cookie residenti sul tuo computer, segui le indicazioni sul browser del tuo computer." +
   "Ricorda che cancellando i cookie, o disabilitandone l'utilizzo, si potrebbero compromettere o limitare alcune funzioni di navigazione" +
   "e consultazione del sito.<br/>I cookie possono essere istallati dal sito che stai visitando" +
   "(c.d. cookie interni: Tecnici, Analytics, di marketing e di profilazione) o possono essere istallati da altri siti web (c.d. cookie di terze parti).<br/>" +
   "La maggior parte dei browser e' in grado di rilevare cookie di chiederne o meno l'accettazione.<br/>" +
   "Se hai impostato il browser in modo da non accettare cookie l'interazione con il sito potrebbe essere difficoltosa.<br/><br/>" +
   "Tipologie di cookie:<br/>" +
   "Esistono diverse tipologie di cookie.<br/>" +
   "<ul><li>di 'sessione', che vengono memorizzati sul computer dell'utente per mere esigenze tecnico-funzionali," +
   "per la trasmissione di identificativi di sessione necessari per consentire l'esplorazione sicura ed efficiente del sito;" +
   "essi si cancellano al termine della 'sessione' (da cui il nome) con la chiusura del browser." +
   "Questo tipo di cookie evita il ricorso ad altre tecniche informatiche potenzialmente pregiudizievoli per la riservatezza della navigazione degli utenti;</li>" +
   "<li>'persistenti' che rimangono memorizzati sul disco rigido del computer fino alla loro scadenza o cancellazione da parte degli utenti/visitatori." +
   "Tramite i cookie persistenti i visitatori che accedono al sito (o eventuali altri utenti che impiegano il medesimo computer) vengono automaticamente riconosciuti a ogni visita." +
   "I cookie persistenti soddisfano  molte funzionalità nell'interesse dei navigatori (come per esempio l'uso della lingua di navigazione oppure la registrazione del carrello della spesa negli acquisti on line)." +
   "Tuttavia, i cookie persistenti possono anche essere utilizzati per finalità promozionali o, persino, per scopi di dubbia correttezza." +
   "I visitatori possono impostare il browser del computer in modo tale che esso accetti/rifiuti tutti i cookie o visualizzi un avviso ogni qual volta viene proposto un cookie," +
   "al fine di poter valutare se accettarlo o meno. L'utente è abilitato, comunque, a modificare la configurazione predefinita (di default) e disabilitare i cookie (cioè bloccarli in via definitiva), impostando il livello di protezione più elevato.</li>" +
   "</ul><br/> Queste due tipologie di cookie (di sessione e persistenti) possono a loro volta essere:" +
   "<ul><li>di 'prima parte', quando sono gestiti direttamente dal proprietario e/o responsabile del sito web</li>" +
   "<li>di 'terza parte', .quando i cookie sono predisposti e gestiti da responsabili estranei al sito web visitato dall'utente</li></ul><br/>" +
   "Cosa sono i cookie 'Tecnici'<br/>" +
   "GeniusLoci Srls. informa che sul sito www.geniusloci.company sono presenti cookie tecnici," +
   "necessari alla navigazione all'interno del sito. o a fornire il servizio richiesto;" +
   "senza di essi non saresti in grado di navigare sul nostro sito ed utilizzare alcune delle sue funzioni.Non vengono utilizzati per scopi ulteriori." +
   "Ai sensi  della normativa vigente in materia i cookie tecnici posso essere utilizzati anche in assenza di consenso da parte dell'interessato. <br/>" +
   "Cosa sono i cookies 'Analytics'?<br/>" +
   "Questi cookie raccolgono informazioni su come gli utenti utilizzano il sito web, " +
   "ad esempio quali pagine vengono visitate più spesso e se gli utenti ricevono messaggi di errore." +
   "I dati raccolti vengono trattati  in forma aggregata per comprendere l'efficienza del sito ed il livello di esperienza di navigazione;" +
   "sono utilizzati unicamente per migliorare il funzionamento e le performance del sito web.<br/>" +
   "Cosa sono i cookie 'di marketing/Profilazione'?<br/>" +
   "Sono i cookie utilizzati per tracciare la navigazione dell'utente e creare profili sui suoi gusti," +
   "abitudini, scelte, ecc. Con questi cookie possiamo trasmettere al tuo terminale messaggi pubblicitari a te dedicati" +
   "in linea con le preferenze manifestate durante la navigazione.<br/>" +
   "Cosa sono i cookie di 'prima parte'?<br/>" +
   "Sono i cookie gestiti direttamente dal proprietario e/o responsabile del sito web.<br/>" +
   "Cosa sono i cookie 'di Terze Parti'?<br/>" +
   "I cookie delle c.d. 'terze parti' vengono, invece, impostati da un sito web diverso da www.geniusloci.company<br/>" +
   "Questo perché su ogni sito possono essere presenti elementi (immagini, mappe, suoni, specifici link a pagine web di altri domini, ecc.) che risiedono su server diversi da quello del sito visitato.Alcuni cookie di terze parti consentono di registrare conversioni correlate a richieste di annunci.<br/>" +
   "Tali cookie possono essere inviati al browser dell'utente da aziende terze direttamente dai loro siti web, cui e' possibile accedere dal sito www.geniusloci.company.<br/>" +
   "GeniusLoci e' estranea all'operativita' di tali cookie, ed il trattamento dei dati personali dell'utente ricade nella responsabilità delle predette società terze.  " +
   "Per maggiori informazioni sui cookie di terze parti si rimanda alle relative informative sul trattamento dei dati personali, presenti su:" +
   "http://www.google.com/policies/technologies/ads/ <br/>" +
   "N.B. I link alle informative sono presenti all'interno della lista dei cookie. Il sito www.geniusloci.company utilizza i seguenti cookies:<br/>" +
   "<table style='width:100%' border='0' style='font-family: Arial, Helvetica, sans-serif;'><tr><th>Dominio</th><th>Durata</th><th>	Provenienza</th><th>Tipo</th><th>Descrizione	Link a informativa privacy terzi</th></tr>>" +
   "<tr><td>geniusloci.company</td><td>	2 anni</td><td>	Interno</td><td>	Analytics</td><td>	Cookie di Adobe Analytics utilizzato per identificare un visitatore unico.</td></tr>?" +
   "<tr><td>geniusloci.company</td><td>	sessione</td><td>	Interno</td><td>	Tecnico</td><td>	FedAuth: Cookie tecnici utilizzati in fase di login al portale</td></tr ?" +
   "<tr><td>geniusloci.company</td><td>	sessione</td><td>	Interno</td><td>	Tecnico</td><td>	Wss_FullScreenMode: Cookie tecnici utilizzati in fase di login al portale </td></tr>?" +
   "<tr><td>geniusloci.company</td><td>	sessione</td><td>	Interno</td><td>	Tecnico</td><td>	Cookie tecnici utilizzati in fase di login al portale </td></tr>?" +
   "<tr><td>.doubleclick.net</td><td>	15 minuti</td><td>	Terze parti</td><td>	Marketing</td><td>	Doubleclick Tags: tengono traccia delle performance delle campagne di marketing online http://www.google.com/policies/technologies/ads/ </td></tr></table><br/>" +
   "Come modificare le impostazioni sui cookies?<br/>" +
   "La maggior parte dei browser Internet accetta i cookies automaticamente, ma è possibile modificare le impostazioni del browser per cancellare i cookies o impedirne l'accettazione automatica.Puoi anche rifiutare l'uso dei cookies ma in questo caso, la possibilità di fornirti informazioni e servizi personalizzati sarà limitata, o alcune funzionalità del sito potrebbero non funzionare correttamente ed alcuni dei servizi non essere disponibili.<br/>" +
   "Di seguito una serie di link alle guide per le impostazioni relative ai cookie dei principali browser." +
   "<table style='width:100%' border='0' style='font-family: Arial, Helvetica, sans-serif;'>" +
   "<tr><td><a href='http://support.microsoft.com/kb/278835'>Internet Explorer:</a></td></tr>" +
   "<tr><td><a href='http://www.windowsphone.com/en-us/how-to/wp7/web/changing-privacy-and-other-browser-settings'>Internet Explore [versione mobile]:</a></td></tr>" +
   "<tr><td><a href='http://support.google.com/chrome/bin/answer.py?hl=en-GB&answer=95647'>Chrome:</a></td></tr>" +
   "<tr><td><a href='http://docs.info.apple.com/article.html?path=Safari/5.0/en/9277.html'>Safari:</a></td></tr>" +
   "<tr><td><a href='http://support.apple.com/kb/HT1677'>Safari [versione mobile]:</a></td></tr>" +
   "<tr><td><a href='http://support.mozilla.org/en-US/kb/Enabling%20and%20disabling%20cookies'>Firefox :</a></td></tr>" +
   "<tr><td><a href='http://docs.blackberry.com/en/smartphone_users/deliverables/32004/Turn_off_cookies_in_the_browser_60_1072866_11.jsp'>Blackberries :</a></td></tr>" +
   "<tr><td><a href='http://support.google.com/mobile/bin/answer.py?hl=en&answer=169022'>Android:</a></td></tr>" +
   "<tr><td><a href='http://www.opera.com/browser/tutorials/security/privacy/'>Opera:</a></td></tr></table>" +
   " Ti ricordiamo che, disabilitando i cookies nel proprio browser, queste impostazioni si applicano a tutti i siti web e non solo a questo.<br/>" +
   " Il Titolare e i Responsabili del trattamento<br/>" +
   " Titolare del trattamento e' ......................." +
   " Per esercitare i diritti previsti dall'art. 7 del D. lgs. 196/03, tra i quali ottenere la conferma dell'esistenza o meno dei dati personali, di conoscerne il contenuto e l'origine, di verificarne l'esattezza o chiederne l'integrazione o l'aggiornamento, chiedere la rettificazione, la cancellazione, la trasformazione in forma anonima o il blocco dei dati stessi trattati in violazione di legge, nonché di opporsi in ogni caso, per motivi legittimi, al loro trattamento, occorre inviare una richiesta a genivsloci.outlook.com?. <br/>" +
   " La presente informativa e' aggiornata il 27 maggio 2015.<br>"; +
    '<button style="width:135px;height:35px;" onclick="window.close();"><img src="./Content/Images/Close.png"  alt="Chiudi finestra"/>Chiudi finestra</button>';
    '</body></html>';
    var printwin = window.open('', 'Informativa Cookies', 'left=100,top=30,width=1024,height=700,tollbar=0,scrollbars=1,status=0,resizable=1');
    printwin.document.body.innerHTML = "";
    printwin.document.write(txt);
    printwin.focus();
};

function scriviCookie(nomeCookie, valoreCookie, durataCookie) {
    var scadenza = new Date();
    var adesso = new Date();
    scadenza.setTime(adesso.getTime() + (parseInt(durataCookie) * 60000 * 60 * 24)); //tempo in giorni
    document.cookie = nomeCookie + '=' + escape(valoreCookie) + '; expires=' + scadenza.toGMTString() + '; path=/';
}
function leggiCookie(nomeCookie) {
    if (document.cookie.length > 0) {
        var inizio = document.cookie.indexOf(nomeCookie + "=");
        if (inizio != -1) {
            inizio = inizio + nomeCookie.length + 1;
            var fine = document.cookie.indexOf(";", inizio);
            if (fine == -1) fine = document.cookie.length;
            return unescape(document.cookie.substring(inizio, fine));
        } else {
            return "";
        }
    } else {
        return "";
    }
}
function Cookies_confirm() {
    scriviCookie("accettaCookies", "yes", 90);    
    document.getElementById("disclaimer").hidden = true;
}

function fade(id, oldId) {
    fadeOut(oldId);
    fadeIn(id);
}
function fadeIn(id) {
    var el = document.getElementById(id);
    if (el !== null && el !== undefined) {
        el.style.display = "block";
        el.style.visibility = "visible";
        el.style.opacity = 0;
        var tick = function () {
            el.style.opacity = +el.style.opacity + 0.01;
            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };
        tick();
    }
}
function fadeOut(id) {   
    var el = document.getElementById(id);
    //alert("fadeOut=" + el.className);
    if (el !== null && el !== undefined) {
        el.style.opacity = 1;
        var tick = function () {
            el.style.opacity = +el.style.opacity - 0.01;
            if (+el.style.opacity > 0) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };
        tick();
        el.style.display = "none";
        el.style.visibility = "hidden"
    }
}

function sendMail(sender, cc, subject, body) {
    var link = "mailto:" + sender
             + "?cc=" + cc
             + "&subject=" + escape(subject)
             + "&body=" + escape(body)
    ;
    window.location.href = link;
}