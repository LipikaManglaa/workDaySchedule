// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


// using day.js format todays date

var currentDate = dayjs().format("dddd MMMM , YYYY");

// use the text content from currentDate and set it as currentDays text
$('#currentDay').text(currentDate);

// set current time to global & use day.js to grab the hours of the day  
var currentWholeTime = dayjs().format("hh:mm:ss a");
$("#currentTime").text(currentWholeTime)

var currentTime = dayjs().format("HH");
console.log(currentTime)


let obj = ["08Am", "09Am", "10Am", "11Am", "12Pm", "13Pm", "14Pm", "15Pm", "16Pm", "17Pm"]
let data = "";

obj.forEach((v, i) => {
  let time = v.slice(0, -2)
  console.log(time)
  let childMain = $("<div>").addClass(" row con-main")


  let hourCreate = $("<div>").addClass(" time-block col-2 col-md-1").attr("id", v);

  let textCreate = $("<div>").text(v).addClass("col-2 col-md-1 hour text-center py-3")

  hourCreate.append(textCreate);

  let taskArea = $("<textarea>").addClass("col-6 col-md-9 description rows=3")

  //for save btn
  let btnSave = $("<button>").addClass("btn saveBtn col-2 col-md-1 ")

  let saveIcon = $("<i>").addClass("fas fa-save")

  btnSave.append(saveIcon);

  //for delete btn
  let btnDelete = $("<button>").addClass("btn deleteBtn col-2 col-md-1")

  let btnIcon = $("<i>").addClass("fas fa-trash")

  btnDelete.append(btnIcon)


  // append everything to this row
  childMain.append(hourCreate, taskArea, btnSave, btnDelete);


  let mainSectionArea = $(".working-schedule").append(childMain);

  if (currentTime == time) {
    taskArea.addClass("present");
  } else if (currentTime > time) {
    taskArea.addClass("past")
  } else {
    taskArea.addClass("future")
  }

})

var objcreate;
$(".saveBtn").on("click", function () {
  var da = ($(this).prev("textarea").val())
  console.log(da)
  var timec = ($(this).siblings("div").children().text())
  console.log(timec)
  objcreate = {
    timec:da
  }

  var getItemLocal = JSON.parse(localStorage.getItem("workSchedule")) ?? []
  var finalData = [...getItemLocal, objcreate]
  localStorage.setItem("workSchedule", JSON.stringify(finalData))
  console.log(getItemLocal)
  $(this).prev("textarea").val("")
})




