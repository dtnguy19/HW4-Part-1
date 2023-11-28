/*
File: jscript.js
GUI Assignment: Updating our HW3 so that it can utilize the JQuery Validation Plugin
Danny Nguyen, UMass Lowell Computer Science, Danny_nguyen2@student.uml.edu
Copyright (c) 2023 by Danny. All rights reserved. May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by DN on November 28, 2023 at 4:50 pm.
*/

// Custom rule to check to see if the min and max values are the same
$.validator.addMethod("notSame", function(value, element, param) {
  return value !== $(param).val();
}, "Values cannot be the same.");

// Custom rule to check to see if the minimum value is larger than the maximum value
$.validator.addMethod("minMax", function(value, element, param) {
  var minField = $("#" + param[0]);
  var maxField = $("#" + param[1]);

  return parseInt(minField.val()) < parseInt(maxField.val());
}, "Min must be smaller than Max.");


$(document).ready(function() {
  $("#multiplicationForm").validate({
    rules: {
      C1: {
        min: -50,
        max: 50,
        notSame: "#C2", //C1 is not the same as C2
        minMax: ["C1", "C2"] //C1 is less than C2
      },
      C2: {
        min: -50,
        max: 50,
        notSame: "#C1", //C2 is not the same as C1
        minMax: ["C1", "C2"] //C1 is less than C2
      },
      R1: {
        min: -50,
        max: 50,
        notSame: "#R2", //R1 is not the same to R2
        minMax: ["R1", "R2"] //R1 is less than R2
      },
      R2: {
        min: -50,
        max: 50,
        notSame: "#R1", //R2 is not the same as R1
        minMax: ["R1", "R2"] //R1 is less than R2
	  }
    },
    messages: {
      C1: {
        min: "Column value must be greater than or equal to -50.",
        max: "Column value must be less than or equal to 50.",
        notSame: "Min and Max column values cannot be the same.",
        minMax: "Min must be smaller than Max."
      },
      C2: {
        min: "Column value must be greater than or equal to -50.",
        max: "Column value must be less than or equal to 50.",
        notSame: "Min and Max column values cannot be the same.",
        minMax: "Min must be smaller than Max."
      },
      R1: {
        min: "Row value must be greater than or equal to -50.",
        max: "Row value must be less than or equal to 50.",
        notSame: "Min and Max row values cannot be the same.",
        minMax: "Min must be smaller than Max."
      },
      R2: {
        min: "Row value must be greater than or equal to -50.",
        max: "Row value must be less than or equal to 50.",
        notSame: "Min and Max row values cannot be the same.",
        minMax: "Min must be smaller than Max."
      }
    },
    submitHandler: function(form) {
      generateTable();
    }
  });
});
function generateTable() {
  // Check if the form is valid
  if ($("#multiplicationForm").valid()) {
    // Retrieve input values
    const C1 = parseInt(document.getElementById("C1").value);
    const C2 = parseInt(document.getElementById("C2").value);
    const R1 = parseInt(document.getElementById("R1").value);
    const R2 = parseInt(document.getElementById("R2").value);

    // Clear error message
    document.getElementById("errorMessage").innerText = "";

    // Generate multiplication table
    let tableHTML = "<table><thead><tr><th></th>";
    for (let i = C1; i <= C2; i++) {
      tableHTML += `<th>${i}</th>`;
    }
    tableHTML += "</tr></thead><tbody>";

    for (let i = R1; i <= R2; i++) {
      tableHTML += `<tr><th>${i}</th>`;
      for (let j = C1; j <= C2; j++) {
        tableHTML += `<td>${i * j}</td>`;
      }
      tableHTML += "</tr>";
    }

    tableHTML += "</tbody></table>";

    // Display table
    const tableName = "Multiplication Table: " + C1 + " to " + C2 + " x " + R1 + " to " + R2;
    $("#tableName").text(tableName);
    $("#tableContainer").html(tableHTML);
    $("#tableContainer").css("backgroundImage", "url(imgs/background-img.jpg)"); // https://pixabay.com/photos/astronomy-bright-constellation-dark-1867616/ link for background image
  } else {
    // Display error message
    $("#errorMessage").text("Please fix the errors in the form.");
  }
}