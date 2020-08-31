/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function () {
  if (!localStorage.attendance) {
    console.log("Creating attendance records...");
    function getRandom() {
      return Math.random() >= 0.5;
    }

    var nameColumns = $("tbody .name-col"),
      attendance = {};

    nameColumns.each(function () {
      var name = this.innerText;
      attendance[name] = [];

      for (var i = 0; i <= 11; i++) {
        attendance[name].push(getRandom());
      }
    });

    localStorage.attendance = JSON.stringify(attendance);
  }
})();

/* STUDENT APPLICATION */
(function () {
  var model = {
    attendance: localStorage.attendance,
  };
  var octopus = {
    init: function () {
      view.init();
    },

    getAttendace: function () {
      return JSON.parse(model.attendance);
    },

    setAttendace: function (obj) {
      localStorage.attendance = JSON.stringify(obj);
    },
  };
  var view = {
    init: function () {
      $allMissed = $("tbody .missed-col");
      $allCheckboxess = $("tbody input");

      this.render();
    },

    render: function () {
      this.checkAttendace();
      this.updateAttendace();
      this.countMissing();
    },

    countMissing: function () {
      $allMissed.each(function () {
        var studentRow = $(this).parent("tr"),
          dayChecks = $(studentRow).children("td").children("input"),
          numMissed = 0;

        dayChecks.each(function () {
          if (!$(this).prop("checked")) {
            numMissed++;
          }
        });

        $(this).text(numMissed);
      });
    },

    checkAttendace: function () {
      $.each(octopus.getAttendace(), function (name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent(
            "tr"
          ),
          dayChecks = $(studentRow).children(".attend-col").children("input");

        dayChecks.each(function (i) {
          $(this).prop("checked", days[i]);
        });
      });
    },

    updateAttendace: function () {
      $allCheckboxess.on("click", function () {
        var studentRows = $("tbody .student"),
          newAttendance = {};

        studentRows.each(function () {
          var name = $(this).children(".name-col").text(),
            $allCheckboxes = $(this).children("td").children("input");

          newAttendance[name] = [];

          $allCheckboxes.each(function () {
            newAttendance[name].push($(this).prop("checked"));
          });
        });
        view.countMissing();
        octopus.setAttendace(newAttendance);
      });
    },
  };

  octopus.init();
})();
