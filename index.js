/*
File: index.js
GUI Assignment: Homework 4, Creating an Interactive Dynamic Table
Jake Shick, UMass Lowell Computer Science, jake_shick@student.uml.edu
Copyright (c) 2024 by Shick. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by JS on November 27, 2024 at 10:15 PM.
*/

let tabCounter = 1; // counter to check or see for 
$(function () {
    $("#tabs").tabs();
    $('#mult-form').validate({
        rules: { // rules that specify the range and type of input from the user.
            "min_x": {
                required: true,
                number: true,
                range: [-50, 50]
            },
            "max_x": {
                required: true,
                number: true,
                range: [-50, 50]
            },
            "min_y": {
                required: true,
                number: true,
                range: [-50, 50]
            },
            "max_y": {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: { // messages that tell user what part of their input is incorrect.
          "min_x": {
            required: "Please enter a value for min_x",
            number: "Please enter a valid number",
            range: "Value must be between -50 and 50",
          },
          "max_x": {
            required: "Please enter a value for max_x",
            number: "Please enter a valid number",
            range: "Value must be between -50 and 50"
          },
          "min_y": {
            required: "Please enter a value for min_y",
            number: "Please enter a valid number",
            range: "Value must be between -50 and 50"
          },
          "max_y": {
            required: "Please enter a value for max_y",
            number: "Please enter a valid number",
            range: "Value must be between -50 and 50"
          }
        }
    });
    
    // Initialize sliders
    initializeSlider("min-x", "slider-min-x", -50, 50);
    initializeSlider("max-x", "slider-max-x", -50, 50);
    initializeSlider("min-y", "slider-min-y", -50, 50);
    initializeSlider("max-y", "slider-max-y", -50, 50);

    // Close tab event
    $("#tabs").on("click", ".ui-icon-close", function () {
        const tabId = $(this).data("tab-id");

        $(`#tab-li-${tabId}`).remove();
        $(`#tab-${tabId}`).remove();

        $("#tabs").tabs("refresh");
    });
});

// Slider initialization function
function initializeSlider(inputId, sliderId, min, max) {
    let initialValue = parseInt($(`#${inputId}`).val()) || 0;
    $(`#${sliderId}`).slider({
        range: "min",
        value: initialValue,
        min: min,
        max: max,
        slide: function (event, ui) {
            $(`#${inputId}`).val(ui.value);
        }
    });

    $(`#${inputId}`).on("input", function () {
        let value = parseInt($(this).val());
        if (!isNaN(value) && value >= min && value <= max) {
            $(`#${sliderId}`).slider("value", value);
        }
    });
}

// Submit function
function Submit() {
  if (!$('#mult-form').valid()) {
    return; // Exit if form is invalid
  }
    
    //sets the 4 values here to be integers instead of down in mult table
    let min_x = parseInt($("#min-x").val());
    let max_x = parseInt($("#max-x").val());
    let min_y = parseInt($("#min-y").val());
    let max_y = parseInt($("#max-y").val());

    // Create dynamic tab
    let tabLabel = `[${min_x}, ${max_x}] x [${min_y}, ${max_y}]`;
    let newTabId = `tab-${tabCounter}`;
    let tableContainerId = `tableContainer-${tabCounter}`;

    $("#tabs ul").append(
        `<li id="tab-li-${tabCounter}"><a href="#${newTabId}">${tabLabel}</a> <span class="ui-icon ui-icon-close" role="button" data-tab-id="${tabCounter}"></span></li>`
    );
    $("#tabs").append(
        `<div id="${newTabId}"><div class="table-container" id="${tableContainerId}"></div></div>`
    );

    $("#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", tabCounter - 1);

    // Generate table
    multiplicationTable(min_x, max_x, min_y, max_y, tableContainerId);

    tabCounter++;
}

// Generate multiplication table
function multiplicationTable(min_x, max_x, min_y, max_y, containerId) { // start of the multiplication table which takes the values collected in input boxes
  const tableContainer = document.getElementById(containerId); // gets the element id from the document, in this case tableContainer in order to add to it
  tableContainer.innerHTML = '';
  const table = document.createElement('table'); // creates a table element
  // turns these four numbers into integers
  
  let headerRow = document.createElement('tr'); // creates the table row which 
  // Create an empty cell to align the top left corner of the table
  let emptyCell = document.createElement('th'); 
  headerRow.appendChild(emptyCell); // Append the empty cell to the header row

  // Loop through values from min_x to max_x to create column headers
  for (let x = min_x; x <= max_x; x++) {
      let row = document.createElement("th"); // Create a header cell for each x value
      row.textContent = x; // Set the cell's text to the current x value
      headerRow.appendChild(row); // Append the cell to the header row
  }
  table.appendChild(headerRow); // Add the completed header row to the table

// Loop through values from min_y to max_y to create rows for each y value
  for (let y = min_y; y <= max_y; y++) {
      let row = document.createElement("tr"); // Create a new table row for the current y value
      let newLine = document.createElement("th"); // Create a header cell for the row
      newLine.textContent = y; // Set the row header cell's text to the current y value
      row.appendChild(newLine); // Add the row header cell to the row

      // Loop through values from min_x to max_x to create data cells for each x * y
      for (let x = min_x; x <= max_x; x++) {
          let content = document.createElement("td"); // Create a new table data cell
          content.textContent = x * y; // Set the cell's text to the product of x and y
          row.appendChild(content); // Append the cell to the current row
      }
      table.appendChild(row); // Append the completed row to the table
  }
  tableContainer.appendChild(table); // Add the fully populated table to the table container

}