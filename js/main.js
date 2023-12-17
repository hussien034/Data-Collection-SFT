let name=document.getElementById("name");
let major=document.getElementById("major");
let range=document.getElementById("range");
let age= document.getElementById("range");
let placeOfBirth=document.getElementById("placeOfBirth");
let birthDate=document.getElementById("birthDate");
let placeOfNewWork=document.getElementById("placeOfNewWork");
let palceOfOldWork=document.getElementById("palceOfOldWork");
let coursesInSft=document.getElementById("coursesInSft");
let coursesOutSft=document.getElementById("coursesOutSft");
let dataOfTrainee=[];
if (JSON.parse(localStorage.getItem("data")) != null) {
  dataOfTrainee = JSON.parse(localStorage.getItem("data"));

  dispalyData();
}
function addData(){
  var dataOfOfficer ={
    name:name.value,
    major:major.value,
    range:range.value,
    age:age.value,
    placeOfBirth:placeOfBirth.value,
    birthDate:birthDate.value,
    placeOfNewWork:placeOfNewWork.value,
    palceOfOldWork:palceOfOldWork.value,
    coursesInSft:coursesInSft.value,
    coursesOutSft:coursesOutSft.value
  }
  dataOfTrainee.push(dataOfOfficer)
  localStorage.setItem("data", JSON.stringify(dataOfTrainee));
  dispalyData();
  location.reload();
};

function dispalyData() {
  var data = "";
  for (var i = 0; i < dataOfTrainee.length; i++) {
    data += `<tr>
        <td>${i+1}</td>
        <td>${dataOfTrainee[i].name}</td>
        <td>${dataOfTrainee[i].major}</td>
        <td>${dataOfTrainee[i].range}</td>
        <td>${dataOfTrainee[i].age}</td>
        <td>${dataOfTrainee[i].placeOfBirth}</td>
        <td>${dataOfTrainee[i].birthDate}</td>
        <td>${dataOfTrainee[i].placeOfNewWork}</td>
        <td>${dataOfTrainee[i].palceOfOldWork}</td>
        <td>${dataOfTrainee[i].coursesInSft}</td>
        <td>${dataOfTrainee[i].coursesOutSft}</td>
        <td><button class="deletebt" onclick="deleteData(${i})" >Delete</button></td>
        <tr>
        `;
  }
  document.getElementById("table").innerHTML = data;
}

function deleteData(index) {
  dataOfTrainee.splice(index, 1);
  dispalyData();
  localStorage.setItem("data", JSON.stringify(dataOfTrainee));
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
  var dataOfTrainee = JSON.parse(localStorage.getItem("data"));
  
  var tableHTML = `
    <table class="table table-light table-hover mt-4">
      <thead>
        <tr>
        <th>الرقم</th>
          <th>الأسم</th>
          <th>الرتبة</th>
          <th>الأقدمية</th>
          <th>السن</th>
          <th>محل الميلاد</th>
          <th>تاريخ الميلاد</th>
          <th>جهة العمل الحالية</th>
          <th>جهة العمل السابقة</th>
          <th>الفرق داخل المعهد</th>
          <th>الفرق خارج المعهد</th>
        </tr>
      </thead>
      <tbody>
  `;
  // Iterate over the dataOfTrainee array to create table rows
  for (var i = 0; i < dataOfTrainee.length; i++) {
    tableHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${dataOfTrainee[i].name}</td>
        <td>${dataOfTrainee[i].major}</td>
        <td>${dataOfTrainee[i].range}</td>
        <td>${dataOfTrainee[i].age}</td>
        <td>${dataOfTrainee[i].placeOfBirth}</td>
        <td>${dataOfTrainee[i].birthDate}</td>
        <td>${dataOfTrainee[i].placeOfNewWork}</td>
        <td>${dataOfTrainee[i].palceOfOldWork}</td>
        <td>${dataOfTrainee[i].coursesInSft}</td>
        <td>${dataOfTrainee[i].coursesOutSft}</td>
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
function exportToExcel() {
  var dataOfTrainee = JSON.parse(localStorage.getItem("data"));

  // Create a new workbook and worksheet
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.json_to_sheet(dataOfTrainee);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Trainee Data");

  // Convert the workbook to an Excel file
  var excelFile = XLSX.write(workbook, { type: "binary", bookType: "xlsx" });

  // Save the Excel file using FileSaver.js
  saveAs(
    new Blob([s2ab(excelFile)], { type: "application/octet-stream" }),
    "trainee_data.xlsx"
  );
}

// Utility function to convert string to ArrayBuffer
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}