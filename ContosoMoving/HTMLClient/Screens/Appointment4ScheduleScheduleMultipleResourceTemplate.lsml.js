/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Appointment4ScheduleScheduleMultipleResourceTemplate.Appointment_render = function (element, contentItem) {                     var itemTemplate = $("&lt;div id='schedule1'&gt;&lt;/div&gt;");
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {
              if (itemTemplate.hasClass('e-schedule')) {
            itemTemplate.ejSchedule('destroy');
        }
        var first = contentItem.children[0];
        var id = first.children[0].valueModel.name;
        var subject = first.children[1].valueModel.name;
        var starttime = first.children[2].valueModel.name;
        var endtime = first.children[3].valueModel.name;
        var allday = first.children[4].valueModel.name;
        var recurrence = first.children[5].valueModel.name;
        var recurrencerule = first.children[6].valueModel.name;
        var resourcefield=first.children[7].valueModel.name;
        itemTemplate.ejSchedule({
            width: "100%",
            height: "525px",
            currentDate:"5/5/2014",                
            group: {
                    resources: ["Owners"]
                },
            resources: [
                  {
                    field:resourcefield,
                    title: "Owner",
                    name: "Owners", allowMultiple: true,
                    resourceSettings: { dataSource: [
                    { text: "Nancy", id: 1, groupId: 1, color: "#f8a398" },
                    { text: "Steven", id: 3, groupId: 2, color: "#56ca85" },
                    { text: "Michael", id: 5, groupId: 1, color: "#51a0ed" }
                ],
                        text: "text", id: "id", groupId: "groupId", color: "color"
                    }
                }],
            appointmentSettings: {
                dataSource: contentItem.value.data,
                id: id,
                subject: subject,
                startTime: starttime,
                endTime: endtime,
                allDay: allday,
                recurrence: recurrence,
                recurrenceRule: recurrencerule,
                resourceFields: resourcefield,
            }
        });
};};