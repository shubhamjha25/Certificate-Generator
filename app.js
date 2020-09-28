const generatePDF = async (name) => {

    const {PDFDocument, rbg} = PDFLib;

    const existingBytes = await fetch("./certificate/template.pdf").then(res => res.arrayBuffer());

    const existingFont = await fetch('./font/BalsamiqSans-Bold.ttf').then(res => res.arrayBuffer());
    
    const pdfDoc = await PDFDocument.load(existingBytes);

    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(existingFont);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(name, {
        x: 380,
        y: 287,
        size: 40,
        font: customFont
    })
    
    const uri = await pdfDoc.saveAsBase64({dataUri: true});

    // document.getElementById("cert-pdf").src = uri;
}

generatePDF("Your Name");