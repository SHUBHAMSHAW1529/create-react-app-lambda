//reference to initial appscript
function doPost(e) {
    var lock = LockService.getDocumentLock();
    lock.waitLock(3000); // hold off up to 30 sec to avoid concurrent writing
    Logger.log("starting to execute");
    try {
      Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
      
      // select the 'responses' sheet by default
      var doc = SpreadsheetApp.getActiveSpreadsheet();
      var sheetName = e.parameters.formGoogleSheetName || "responses";
      var sheet = doc.getSheetByName(sheetName);
      var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var newHeader = oldHeader.slice();
      var fieldsFromForm = getDataColumns(e.parameters);
      var row = [new Date()]; // first element in the row should always be a timestamp
      
      // loop through the header columns
      for (var i = 1; i < oldHeader.length; i++) { // start at 1 to avoid Timestamp column
        var field = oldHeader[i];
        var output = getFieldFromData(field, e.parameters);
        row.push(output);
        
        // mark as stored by removing from form fields
        var formIndex = fieldsFromForm.indexOf(field);
        if (formIndex > -1) {
          fieldsFromForm.splice(formIndex, 1);
        }
      }
      
      // set any new fields in our form
      for (var i = 0; i < fieldsFromForm.length; i++) {
        var field = fieldsFromForm[i];
        var output = getFieldFromData(field, e.parameters);
        row.push(output);
        newHeader.push(field);
      }
      
      // more efficient to set values as [][] array than individually
      var nextRow = sheet.getLastRow() + 1; // get next row
      sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  
      // update header row with any new data
      if (newHeader.length > oldHeader.length) {
        sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
      }
      
      return ContentService.createTextOutput("done");
  
    }
    catch(error) {
      Logger.log(error);
      return ContentService.createTextOutput("done_with_error");
    }
    finally {
      lock.releaseLock();
      return;
    }
  
  }
  
  function testPost() {
    var data = {
      parameters : {
        profileName : "Shubham Shaw",
        profileLink : "link",
        formDataNameOrder: "[\"profileName\"]",
        formGoogleSheetName : "responses"
      }
    };
  
    var resp = doPost(data);
  
    console.log("response ", resp);
  }
  
  function getDataColumns(data) {
    return Object.keys(data).filter(function(column) {
      return !(column === 'formDataNameOrder' || column === 'formGoogleSheetName' || column === 'formGoogleSendEmail' || column === 'honeypot');
    });
  }
  
  function getFieldFromData(field, data) {
    var values = data[field] || '';
    var output = values.join ? values.join(', ') : values;
    return output;
  }
  
  function doGet() {
     // Get the spreadsheet by ID
    const doc = SpreadsheetApp.getActiveSpreadsheet();;
  
    const sheetName = 'responses';
  
    // Get the first sheet
    const sheet = doc.getSheetByName(sheetName);;
  
    // Get the data range of the sheet
    const range = sheet.getDataRange();
  
    // Get the values of all cells in the data range
    const values = range.getValues();
  
    console.log(values);
    
    return ContentService.createTextOutput(JSON.stringify(values)).setMimeType(ContentService.MimeType.JSON);
  }
  
  