function doPost(e) {
  const SHEET_ID = '1PvNMomPOlWjdGFIs8G2MGG_4fAFVeQBMG-d7yMwg3JM';
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Get form data
    const formData = e ? e.parameter : {};
    
    // Debug logging
    console.log('Received form data:', formData);
    console.log('BSC Address field specifically:', formData.referralBscAddress);
    console.log('Referred field:', formData.referred);
    
    // Validate required fields
    if (!formData.timestamp || !formData.walletAddress || !formData.transactionHash) {
      return ContentService
        .createTextOutput('Missing required fields')
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Validate referral logic: if referred is "Yes", BSC address must not be empty
    if (formData.referred === 'Yes' && (!formData.referralBscAddress || formData.referralBscAddress.trim() === '')) {
      console.error('CRITICAL ERROR: Referred is Yes but BSC address is empty!');
      return ContentService
        .createTextOutput('Error: BSC address is required when referred is Yes')
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp',
        'Wallet Address',
        'Network',
        'Amount (USD)',
        'Transaction Hash',
        'Referred?',
        'Referrer BSC Address',
        'Signature'
      ]]);
      
      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground('#1FE2D6');
      headerRange.setFontColor('#00334B');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // Parse timestamp for better display
    const timestamp = new Date(formData.timestamp);
    
    // Prepare row data with correct field mapping
    const rowData = [
      timestamp,
      formData.walletAddress || '',
      formData.network || '',
      formData.amount || '',
      formData.transactionHash || '',
      formData.referred || 'No',
      formData.referralBscAddress || '',  // This is the correct field name
      formData.signature || ''
    ];
    
    // Debug logging
    console.log('Row data being inserted:', rowData);
    
    // Add new row
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 8);
    
    // Set number format for amount column
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const amountCell = sheet.getRange(lastRow, 4);
      amountCell.setNumberFormat('$#,##0.00');
    }
    
    // Log successful submission
    console.log('Successfully added row:', rowData);
    
    return ContentService
      .createTextOutput('Success: Data submitted to ToolAI CEO spreadsheet')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('ToolAI Presale Data Collector - CEO Sheet')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function to verify sheet access
function testSheetAccess() {
  const SHEET_ID = '1PvNMomPOlWjdGFIs8G2MGG_4fAFVeQBMG-d7yMwg3JM';
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    console.log('Sheet access successful. Sheet name:', sheet.getName());
    console.log('Last row:', sheet.getLastRow());
    return true;
  } catch (error) {
    console.error('Sheet access failed:', error);
    return false;
  }
}

// Test function with sample data
function testDoPost() {
  const sampleEvent = {
    parameter: {
      timestamp: new Date().toISOString(),
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      network: 'Ethereum',
      amount: '100.00',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      referred: 'No',
      referralBscAddress: '',
      signature: 'test-signature'
    }
  };
  
  return doPost(sampleEvent);
} 