const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to the Excel file - storing it in the server root
const FILE_PATH = path.join(__dirname, '../users.xlsx');

const logUserToExcel = (userData) => {
  try {
    let workbook;
    let worksheet;

    // Prepare the new row data
    const newRow = [{
      ID: userData.id,
      Name: userData.name,
      Email: userData.email,
      Role: userData.role,
      SignupDate: new Date().toLocaleDateString(),
      SignupTime: new Date().toLocaleTimeString()
    }];

    // Check if file exists
    if (fs.existsSync(FILE_PATH)) {
      // Read existing file
      workbook = xlsx.readFile(FILE_PATH);
      const sheetName = workbook.SheetNames[0];
      worksheet = workbook.Sheets[sheetName];

      // Convert current sheet to JSON to append easily
      const existingData = xlsx.utils.sheet_to_json(worksheet);
      
      // Add new data
      const updatedData = existingData.concat(newRow);
      
      // Update worksheet
      worksheet = xlsx.utils.json_to_sheet(updatedData);
      workbook.Sheets[sheetName] = worksheet;

    } else {
      // Create new workbook and worksheet
      workbook = xlsx.utils.book_new();
      worksheet = xlsx.utils.json_to_sheet(newRow);
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
    }

    // Write file
    xlsx.writeFile(workbook, FILE_PATH);
    console.log(`User ${userData.email} logged to Excel successfully.`);

  } catch (error) {
    console.error('Error logging to Excel:', error);
    // Don't throw error to prevent blocking the response
  }
};


const syncUsersToExcel = (allUsers) => {
  try {
    // Flatten/Format data
    const formattedData = allUsers.map(u => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Role: u.role,
      SignupDate: new Date(u.created_at).toLocaleDateString(),
      SignupTime: new Date(u.created_at).toLocaleTimeString()
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');

    xlsx.writeFile(workbook, FILE_PATH);
    console.log(`Synced ${allUsers.length} users to Excel.`);
    return { success: true };
  } catch (error) {
    console.error('Error syncing Excel:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { logUserToExcel, syncUsersToExcel };
