import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoice = (trade) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text('TRADEFLOW', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', 105, 35, { align: 'center' });
  
  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice No: INV-${trade.id}`, 20, 50);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
  doc.text(`Due Date: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}`, 20, 60);
  
  // Buyer/Seller info
  doc.setFontSize(12);
  doc.text('Buyer (Importer):', 20, 75);
  doc.setFontSize(10);
  doc.text(trade.importer, 20, 82);
  doc.text('123 Importer Street', 20, 87);
  doc.text('Mumbai, India 400001', 20, 92);
  
  doc.setFontSize(12);
  doc.text('Seller (Exporter):', 120, 75);
  doc.setFontSize(10);
  doc.text(trade.exporter, 120, 82);
  doc.text('456 Exporter Avenue', 120, 87);
  doc.text('New York, USA 10001', 120, 92);
  
  // Product table
  const tableData = [[
    trade.productName,
    trade.quantity,
    `${trade.currency} ${trade.unitPrice.toFixed(2)}`,
    `${trade.currency} ${trade.totalAmount.toFixed(2)}`
  ]];
  
  doc.autoTable({
    startY: 105,
    head: [['Product Description', 'Quantity', 'Unit Price', 'Total']],
    body: tableData,
    foot: [[
      '',
      '',
      'Subtotal:',
      `${trade.currency} ${trade.totalAmount.toFixed(2)}`
    ]],
    theme: 'striped',
    headStyles: { fillColor: [0, 102, 204] }
  });
  
  // Payment terms
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(10);
  doc.text('Payment Terms: Bank Transfer within 30 days', 20, finalY);
  doc.text('Bank Details:', 20, finalY + 10);
  doc.text('Bank: Global Trade Bank', 20, finalY + 15);
  doc.text('Account: 1234567890', 20, finalY + 20);
  doc.text('SWIFT: GLOBUS44', 20, finalY + 25);
  
  return doc;
};

export const generateBillOfLading = (trade) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text('TRADEFLOW', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('BILL OF LADING', 105, 35, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`BL No: BL-${trade.id}`, 20, 50);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
  
  // Shipping details
  doc.setFontSize(12);
  doc.text('Shipper:', 20, 70);
  doc.setFontSize(10);
  doc.text(trade.exporter, 20, 77);
  
  doc.setFontSize(12);
  doc.text('Consignee:', 20, 92);
  doc.setFontSize(10);
  doc.text(trade.importer, 20, 99);
  
  doc.setFontSize(12);
  doc.text('Vessel/Voyage:', 120, 70);
  doc.setFontSize(10);
  doc.text('MV Trade Spirit / V-123', 120, 77);
  
  doc.setFontSize(12);
  doc.text('Port of Loading:', 120, 92);
  doc.setFontSize(10);
  doc.text('New York, USA', 120, 99);
  
  doc.setFontSize(12);
  doc.text('Port of Discharge:', 120, 114);
  doc.setFontSize(10);
  doc.text('Mumbai, India', 120, 121);
  
  // Cargo details
  doc.autoTable({
    startY: 135,
    head: [['Marks & Numbers', 'Description', 'Weight', 'Volume']],
    body: [[
      'N/M',
      trade.productName,
      `${trade.quantity * 10} kg`,
      `${trade.quantity * 0.5} m³`
    ]],
    theme: 'striped',
    headStyles: { fillColor: [0, 102, 204] }
  });
  
  return doc;
};

export const generateLetterOfCredit = (trade, bankDetails) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text('TRADEFLOW', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('LETTER OF CREDIT', 105, 35, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`LC No: LC-${trade.id}`, 20, 50);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
  doc.text(`Expiry Date: ${new Date(Date.now() + 90*24*60*60*1000).toLocaleDateString()}`, 20, 60);
  
  // Bank details
  doc.setFontSize(12);
  doc.text('Issuing Bank:', 20, 75);
  doc.setFontSize(10);
  doc.text('Global Trade Bank', 20, 82);
  doc.text('123 Bank Street', 20, 87);
  doc.text('New York, USA 10005', 20, 92);
  
  doc.setFontSize(12);
  doc.text('Beneficiary:', 120, 75);
  doc.setFontSize(10);
  doc.text(trade.exporter, 120, 82);
  
  doc.setFontSize(12);
  doc.text('Applicant:', 20, 107);
  doc.setFontSize(10);
  doc.text(trade.importer, 20, 114);
  
  // Amount
  doc.setFontSize(12);
  doc.text(`Amount: ${trade.currency} ${trade.totalAmount.toFixed(2)}`, 20, 129);
  
  // Description
  doc.setFontSize(10);
  doc.text('Covering: Shipment of:', 20, 144);
  doc.text(`${trade.quantity} units of ${trade.productName}`, 20, 151);
  
  // Documents required
  doc.setFontSize(12);
  doc.text('Documents Required:', 20, 171);
  doc.setFontSize(10);
  doc.text('1. Signed Commercial Invoice', 20, 178);
  doc.text('2. Bill of Lading', 20, 185);
  doc.text('3. Packing List', 20, 192);
  doc.text('4. Certificate of Origin', 20, 199);
  
  return doc;
};