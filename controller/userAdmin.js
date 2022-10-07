const Service = require("../service");

const fs = require("fs");
const PDFDocument = require("pdfkit-table");
module.exports = {
  Add: async (data) => {
    let userdata = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      address: data.address,
    };
    let user = await Service.userService.addUser(userdata);
    if (user) {
      return {
        status: "Success",
        message: "Add user successfull",
        user: user,
      };
    } else {
      return {
        status: "unSuccess",
        message: " unable to Add user ",
        user: user,
      };
    }
  },
  get: async () => {
    let data = await Service.userService.get();
    if (data) {
      const doc = new PDFDocument();
      const size = data.length;
      doc.pipe(fs.createWriteStream("generatPdf.pdf"));
      doc.fontSize(20).text("Generating PDF\n\n");
      doc
        .fontSize(12)
        .text(`Name           Age             gender          address \n\n`);
      doc.moveTo(50, 140).lineTo(500, 140).stroke();
      for (var i = 0; i < data.length; i++) {
        var name = data[i]["name"];
        var age = data[i]["age"];
        var gender = data[i]["gender"];
        var address = data[i]["address"];
        doc
          .fontSize(12)
          .text(
            `${name}           ${age}              ${gender}           ${address}\n`
          );
      }
      doc
        .moveTo(50, 145 + size * 15)
        .lineTo(500, 145 + size * 15)
        .stroke();
      doc.fontSize(12).text(`\n\nTotal users - ${size}`);
      doc.end();
      return data;
    } else {
      return "Can't fetch data.";
    }
  },
  gets:async()=>{
    let user = await Service.userService.gets(); 
   
    let doc = new PDFDocument({ margin: 30, size: 'A4' });

    doc.pipe(fs.createWriteStream("./generatedocument.pdf"));


 const table = {
  title :'User Table',
  headers: [
    { label:"Name", property: 'name', width: 60, renderer: null },
    { label:"age", property: 'age', width: 150, renderer: null }, 
    { label:"gender", property: 'gender', width: 100, renderer: null }, 
    { label:"address", property: 'address', width: 100, renderer: null },  
  ],
  datas: user.rows,
  rows: [
    [
      "Total Count Users"," ",`${user.count}`,
     
    ],
   
  ],
};

doc.table(table, {
  prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
  prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
});
doc.moveDown();
  doc.end();  
  }
};
