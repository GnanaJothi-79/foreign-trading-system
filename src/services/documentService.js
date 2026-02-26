// Document Generation Service
export const generateInvoice = (trade) => {
  console.log('Generating invoice for trade:', trade);
  
  // Create invoice content
  const invoiceContent = {
    invoiceNumber: `INV-${trade.id}-${Date.now()}`,
    date: new Date().toLocaleDateString(),
    buyer: trade.importer,
    seller: trade.exporter,
    items: [{
      description: trade.productName,
      quantity: trade.quantity,
      unitPrice: trade.unitPrice,
      currency: trade.currency,
      total: trade.totalAmount
    }],
    totalAmount: trade.totalAmount,
    currency: trade.currency
  };

  // For now, just return a mock document
  return {
    save: (filename) => {
      console.log('Saving invoice as:', filename);
      console.log('Invoice content:', invoiceContent);
      
      // Create a text version of the invoice
      let invoiceText = "=".repeat(60) + "\n";
      invoiceText += "                    INVOICE\n";
      invoiceText += "=".repeat(60) + "\n\n";
      invoiceText += `Invoice No: ${invoiceContent.invoiceNumber}\n`;
      invoiceText += `Date: ${invoiceContent.date}\n\n`;
      invoiceText += `Buyer: ${invoiceContent.buyer}\n`;
      invoiceText += `Seller: ${invoiceContent.seller}\n\n`;
      invoiceText += "-".repeat(60) + "\n";
      invoiceText += "Description                 Qty   Unit Price   Total\n";
      invoiceText += "-".repeat(60) + "\n";
      
      invoiceContent.items.forEach(item => {
        invoiceText += `${item.description.padEnd(25)} ${item.quantity.toString().padEnd(6)} ${item.currency} ${item.unitPrice.toFixed(2)}   ${item.currency} ${item.total.toFixed(2)}\n`;
      });
      
      invoiceText += "-".repeat(60) + "\n";
      invoiceText += `Total Amount: ${invoiceContent.currency} ${invoiceContent.totalAmount.toFixed(2)}\n`;
      invoiceText += "=".repeat(60) + "\n";
      
      // Create download link
      const blob = new Blob([invoiceText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      
      alert(`Invoice generated and downloaded as: ${filename}`);
    }
  };
};

export const generateBillOfLading = (trade) => {
  console.log('Generating bill of lading for trade:', trade);
  
  return {
    save: (filename) => {
      const blContent = "=".repeat(60) + "\n";
      const content = blContent +
        "              BILL OF LADING\n" +
        blContent + "\n" +
        `BL Number: BL-${trade.id}-${Date.now()}\n` +
        `Date: ${new Date().toLocaleDateString()}\n\n` +
        `Shipper: ${trade.exporter}\n` +
        `Consignee: ${trade.importer}\n\n` +
        `Vessel: MV Trade Spirit\n` +
        `Port of Loading: New York, USA\n` +
        `Port of Discharge: Mumbai, India\n\n` +
        `CARGO DETAILS:\n` +
        `-".repeat(40)}\n` +
        `Description: ${trade.productName}\n` +
        `Quantity: ${trade.quantity} units\n` +
        `Weight: ${trade.quantity * 10} kg\n` +
        `Volume: ${trade.quantity * 0.5} m³\n\n` +
        `=".repeat(60)}`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      
      alert(`Bill of Lading generated and downloaded as: ${filename}`);
    }
  };
};

export const generateLetterOfCredit = (trade, bankDetails) => {
  console.log('Generating letter of credit for trade:', trade, bankDetails);
  
  return {
    save: (filename) => {
      const lcContent = "=".repeat(60) + "\n" +
        "              LETTER OF CREDIT\n" +
        "=".repeat(60) + "\n\n" +
        `LC Number: LC-${trade.id}-${Date.now()}\n` +
        `Date: ${new Date().toLocaleDateString()}\n` +
        `Expiry Date: ${new Date(Date.now() + 90*24*60*60*1000).toLocaleDateString()}\n\n` +
        `ISSUING BANK:\n` +
        `Global Trade Bank\n` +
        `123 Bank Street\n` +
        `New York, USA 10005\n\n` +
        `BENEFICIARY:\n` +
        `${trade.exporter}\n\n` +
        `APPLICANT:\n` +
        `${trade.importer}\n\n` +
        `AMOUNT: ${trade.currency} ${trade.totalAmount.toFixed(2)}\n\n` +
        `COVERING: Shipment of ${trade.quantity} units of ${trade.productName}\n\n` +
        `DOCUMENTS REQUIRED:\n` +
        `1. Signed Commercial Invoice\n` +
        `2. Bill of Lading\n` +
        `3. Packing List\n` +
        `4. Certificate of Origin\n\n` +
        `=".repeat(60)}`;
      
      const blob = new Blob([lcContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      
      alert(`Letter of Credit generated and downloaded as: ${filename}`);
    }
  };
};