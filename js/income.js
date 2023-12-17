let name=document.getElementById("name");
let major=document.getElementById("major");
let range=document.getElementById("range");
let placeOfNewWork=document.getElementById("placeOfNewWork");
let theNameOfCourse=document.getElementById("theNameOfCourse");
let newData=[];
if (JSON.parse(localStorage.getItem("data2")) != null) {
    newData = JSON.parse(localStorage.getItem("data2"));

  dispalyData();
}
function addData(){
  var dataOfOfficer ={
    name:name.value,
    major:major.value,
    range:range.value,
    placeOfNewWork:placeOfNewWork.value,
    theNameOfCourse:theNameOfCourse.value
  }
  newData.push(dataOfOfficer)
  localStorage.setItem("data2", JSON.stringify(newData));
  dispalyData();
  location.reload();
};

function dispalyData() {
  var data = "";
  for (var i = 0; i < newData.length; i++) {
    data += `<tr>
        <td>${i+1}</td>
        <td>${newData[i].name}</td>
        <td>${newData[i].major}</td>
        <td>${newData[i].range}</td>
        <td>${newData[i].placeOfNewWork}</td>
        <td>${newData[i].theNameOfCourse}</td>
        <td><button class="deletebt" onclick="deleteData(${i})" >Delete</button></td>
        <tr>
        `;
  }
  document.getElementById("table").innerHTML = data;
}
function deleteData(index) {
  newData.splice(index, 1);
  dispalyData();
  localStorage.setItem("data2", JSON.stringify(newData));
}
(function () {
  $(".form1 > .input1").keyup(function () {
    var empty = false;
    $(".form1 > .input1").each(function () {
      if ($(this).val() === "") {
        empty = true;
      }
    });
    if (empty) {
      $("#submit").attr("disabled", "disabled");
    } else {
      $("#submit").removeAttr("disabled");
    }
  });
})();
function printTable() {
  var newData = JSON.parse(localStorage.getItem("data2"));
  
  var tableHTML = `
    <table class="table table-light table-hover mt-4">
      <thead>
        <tr>
        <td>الرقم</td>
        <td>الأسم</td>
        <td>الرتبة</td>
        <td>الأقدمية</td>
        <td>جهة العمل <br>الحالية</td>
        <td>الفرقة التدربية</td>
        </tr>
      </thead>
      <tbody>
  `;

  // Iterate over the dataOfTrainee array to create table rows
  for (var i = 0; i < newData.length; i++) {
    tableHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${newData[i].name}</td>
        <td>${newData[i].major}</td>
        <td>${newData[i].range}</td>
        <td>${newData[i].placeOfNewWork}</td>
        <td>${newData[i].theNameOfCourse}</td>
      </tr>
    `;
  }
  tableHTML += `
      </tbody>
    </table>
  `;
  var printWindow = window.open("", "_blank");
  printWindow.document.open();
  printWindow.document.write("<html><head><title>Print Table</title></head><body>");
  printWindow.document.write('<link rel="stylesheet" href="css/style.css">');
  printWindow.document.write(`<h1 class="text-center">بيانات السادة الضباط</h1>`);
  printWindow.document.write(tableHTML);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  
  printWindow.print();
}