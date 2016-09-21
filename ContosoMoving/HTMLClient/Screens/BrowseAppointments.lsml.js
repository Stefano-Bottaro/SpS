/// <reference path="~/GeneratedArtifacts/viewModel.js" />


myapp.BrowseAppointments.Appointment4Schedule_postRender = function (element, contentItem) {
    // Write code here.
    $(".msls-label").remove();
};

myapp.BrowseAppointments.oldAppointment4Schedule_render = function (element, contentItem) {
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
    var itemTemplate = $("<div id='schedule1'></div>");
    itemTemplate.appendTo($(element));
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
        var dataManger = ej.DataManager({json: contentItem.value.data, });

        itemTemplate.ejSchedule({
            width: "100%",
            height: "525px",
            currentDate: new Date(),
            dateFormat: "dd-MM-yyyy",
            views: ["Day", "Week", "Month"],            
            prioritySettings: { enable: true },
            firstDayOfWeek: "Monday",
            timeMode: ej.Schedule.TimeMode.Hour24,            
            startHour: 8,
            endHour: 21,
            BusinessStartHour: 9,
            BusinessEndHour: 20,           
            currentView: ej.Schedule.CurrentView.Week,
            allowDragDrop: true,
            enableAppointmentResize: true,
            isResponsive: true,
            showQuickWindow: true,
            appointmentClick: "onAppointmentClick",
            menuItemClick: "onMenuItemClick",
            cellClick: "onCellClick",
            close: "clearFields",
            create: "onCreate",
            appointmentWindowOpen: "onWindowOpen",
            appointmentSaved: "onAppointmentSaved",
            appointmentEdited: "onAppointmentSaved",
            appointmentHover: "readOnlyChange",          
            appointmentDeleted: "readOnlyChange",
            resizeStop: "readOnlyChange",
            dragStop: "readOnlyChange",
            locale: "it-IT",
            categorizeSettings: {enable: true},
            prioritySettings: {enable: true},
            //group: {resources: ["Owners"]},
            resources: [{
                field: "ownerId",
                title: "Owner",
                name: "Owners",
                resourceSettings: {
                    dataSource: [{
                        text: "Nancy",
                        id: 1,
                        color: "#f8a398"
                    }, {
                        text: "Steven",
                        id: 3,
                        color: "#56ca85"
                    }, {
                        text: "Michael",
                        id: 5,
                        color: "#51a0ed"
                    }],
                    text: "text",
                    id: "id",
                    color: "color"
                }
            }],
            appointmentSettings: {
                resourceFields: "ownerId",
                dataSource: dataManger,
                id: id,
                subject: subject,
                startTime: starttime,
                endTime: endtime,
                allDay: allday,
                recurrence: recurrence,
                recurrenceRule: recurrencerule,
                priority: important,        
                ownerId: ownerId
                //sector: sectorId,       
            }
        });
    };
};

myapp.BrowseAppointments.Appointment4Schedule_render = function (element, contentItem) {
    // Write code here.
    createSchedule(element, contentItem);
};