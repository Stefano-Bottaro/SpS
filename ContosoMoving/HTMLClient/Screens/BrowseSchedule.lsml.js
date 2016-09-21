/// <reference path="../GeneratedArtifacts/viewModel.js" />


myapp.BrowseSchedule.created = function (screen) {
    // Write code here.Appointment_By_Date.selectedItem.EndDate
    today = new Date();
    tomorrow = new Date()   
    screen.StartDate = today;
    screen.EndDate = tomorrow.addDays(2);
};


//myapp.BrowseSchedule.c_EventsOLD_render = function (element, contentItem) {
//    var itemTemplate = $("<div id='schedule1'></div>");
//    itemTemplate.appendTo($(element));
//    contentItem.value.oncollectionchange = function () {
      
//        var first = contentItem.children[0];
//        var id = first.children[0].valueModel.name;
//        var subject = first.children[1].valueModel.name;
//        var starttime = first.children[2].valueModel.name;
//        var endtime = first.children[3].valueModel.name;
//        var allday = first.children[4].valueModel.name;
//        var recurrence = first.children[5].valueModel.name;
//        var recurrencerule = first.children[6].valueModel.name;
//        var important = first.children[7].valueModel.name;
//        var roomId = first.children[8].valueModel.name;
//        var ownerId = first.children[9].valueModel.name;

//        itemTemplate.ejSchedule({
//            width: "100%",
//            height: "550px",
//            currentDate: new Date(),
//            views: ["Week", "WorkWeek"],
//            timeMode: "24",
//            timeZone: "UTC +2:00",
//            startHour: 8,
//            endHour: 21,
//            BusinessStartHour: 9,
//            BusinessEndHour: 19,
//            close: "clearFields",
//            //locale: "it-IT",
//            contextMenuSettings: {
//                enable: true,
//                menuItems: {
//                    appointment: [
//                       { id: "open", text: "Apri Appuntamento" },
//                            { id: "delete", text: "Cancella Appuntamento" },
//                            { id: "categorize", text: "Categorizza" }
//                    ],
//                    cells: [
//                        { id: "new", text: "Nuovo Appuntamento" },
//                        { id: "recurrence", text: "Nuovo Appuntamento ricorrente" },
//                        { id: "today", text: "Oggi" },
//                        { id: "gotodate", text: "Vai alla data" },
//                        { id: "settings", text: "Configura" },
//                        { id: "view", text: "Vista", parentId: "settings" },
//                        { id: "timemode", text: "Vista Oraria", parentId: "settings" },
//                        { id: "view_Day", text: "Giornaliera", parentId: "view" },
//                        { id: "view_Week", text: "Settimanale", parentId: "view" },
//                        { id: "view_Workweek", text: "Settimana lavorativa", parentId: "view" },
//                        { id: "view_Month", text: "Mese", parentId: "view" },
//                        { id: "timemode_Hour12", text: "12 Ore", parentId: "timemode" },
//                        { id: "timemode_Hour24", text: "24 Ore", parentId: "timemode" },
//                        { id: "businesshours", text: "Orario Lavorativo", parentId: "settings" }
//                    ]
//                }
//            },
//            appointmentSettings: {
//                dataSource: contentItem.value.data,
//                id: id,
//                subject: subject,
//                startTime: starttime,
//                endTime: endtime,
//                allDay: allday,
//                recurrence: recurrence,
//                recurrenceRule: recurrencerule,
//            }
//        });
//    };
//};

myapp.BrowseSchedule.Appointments_render = function (element, contentItem) {
    // Write code here.
    createSchedule(element, contentItem);
};