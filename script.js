// using day.js format todays date

var currentDate = dayjs().format("dddd MMMM , YYYY");

// use the text content from currentDate and set it as currentDays text
$('#currentDay').text(currentDate);

// set current time to global & use day.js to grab the hours of the day  
var currentWholeTime = dayjs().format("hh:mm:ss a");
$("#currentTime").text(currentWholeTime)

var currentTime = dayjs().format("HH");
// console.log(currentTime)

//create Array for Time
let obj = ["08Am", "09Am", "10Am", "11Am", "12Pm", "13Pm", "14Pm", "15Pm", "16Pm", "17Pm"]


let data = "";
//declare all variables for create HTML
let mainSectionArea, mainSectionInner, hourText, hourTextCreate, textAreaValue;

obj.forEach((v, i) => {
  let time = v.slice(0, -2)
  // console.log(time)
  // create HTML with create element
  //this is main div 
  mainSectionInner = $("<div>").addClass("row container-main ")

  //these below three lines create time on th left side of HTML
  hourText = $("<div>").addClass(" time-slot col-2 col-md-1").attr("id", v);
  hourTextCreate = $("<div>").text(v).addClass("col-2 col-md-1 hour mobile-size text-center py-3")
  hourText.append(hourTextCreate);

  //textareaa which we create textvalue 
  textAreaValue = $("<textarea>").addClass("col-6 col-md-9 description rows=3")

  //for save btn
  let btnSave = $("<button>").addClass("btn saveBtn col-2 col-md-1 ")
  let saveIcon = $("<i>").addClass("fas fa-save")
  btnSave.append(saveIcon);

  //for delete btn
  let btnDelete = $("<button>").addClass("btn deleteBtn col-2 col-md-1")
  let btnIcon = $("<i>").addClass("fas fa-trash")
  btnDelete.append(btnIcon)


  // append everything to this row
  mainSectionInner.append(hourText, textAreaValue, btnSave, btnDelete);

  //in the last HTML append all divs to Main div
  mainSectionArea = $(".working-schedule").append(mainSectionInner);

  if (currentTime == time) {
    textAreaValue.addClass("present");
  } else if (currentTime > time) {
    textAreaValue.addClass("past")
  } else {
    textAreaValue.addClass("future")
  }

})


//data store into localstorage by click save button
var objcreate;
let textValue, timeId;
$(".saveBtn").on("click", function () {
 
  //pick the value from textarea
  textValue = ($(this).prev("textarea").val())

  //pick the id value which we stored as a time
  timeId = $(this).siblings("div").attr("id");
  // //after get value from local stroage , then add new value 
  // var finalData = [...getItemLocal,textValue ]

  //store value into local storage
  localStorage.setItem(timeId, JSON.stringify(textValue))
  displayData()
  //textarea value empty
  $(this).prev("textarea").val("")
  $.toast({
    text:"Data has been Saved!!",
    icon: 'success',
      position : 'top-right' ,
    hideAfter : 5000, 
    showHideTransition : 'slide'
  })
})

//display data into textarea
let timeIdLocal, getTextId, getItemLocal;

function displayData() {
  $("textarea").each(function () {
    let textArea = $(this);

    //get localstorage keys
    for (let i = 0; i < localStorage.length; i++) {

      // get the value set over each key
      timeIdLocal = localStorage.key(i);
      // console.log(timeIdLocal)

      //get value for Id for matching whic saved on localstorage
      getTextId = $(this).siblings("div").attr("id");

      if (timeIdLocal == getTextId) {

        //get value if there is any value in localstorage 
        let getItemLocal = JSON.parse(localStorage.getItem(getTextId))

        textArea.val(getItemLocal);
        
      }
    }

  })
}
displayData()

//delete data
$(".deleteBtn").click(function() {
 
      // get the id 
      let textId = $(this).siblings("div").attr("id");

      // Set the  textarea value to be empty
      let deleteData = $(this).siblings("textarea").val('');

      // remove the data from localstorage 
      localStorage.removeItem(textId, JSON.stringify(deleteData));

      $.toast({
        text:"Data has been Delete!!",
        icon: 'error',
        position : 'top-right' ,
        hideAfter : 5000, 
        showHideTransition : 'slide'
      })
  })
