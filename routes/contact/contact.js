const nodemailer = require("nodemailer");

const Contact = {
  create_contact: async function (req, res) {
    // app.post("/investor", (req, res) => {
    console.log("req.body.name", req.body);
    console.log("req.body.name", req.body.name);
    const output = `


      <h3 style="font-family: cursive">NEW CLIENT INFO</h3>
    

    
<table rules="all" style="border-color: #2d0067; width: 80%;border: 1px #899fa9 solid;  color: black; " cellpadding="10" >

<tr style='background: #e2f1f7;'>
<td>  <img style="height: 73px;"  src='cid:unique@cid'></td>
<td>  <h2 style="font-family: cursive;     text-align: center;">MAP CLIENT</h2> </td>
</tr>

<tr style='background: white;'>
<td><strong>Name:</strong> </td>
<td><strong> ${req.body.name} </strong> </td>
</tr>

<tr style='background: #e2f1f7;'>
<td><strong>Email:</strong> </td>
<td><strong> ${req.body.email} </strong> </td>
</tr>

<tr style='background: white;'>
<td><strong>Subject:</strong> </td>
<td><strong> ${req.body.subject} </strong> </td>
</tr>

<tr style='background: #e2f1f7;'>
<td><strong>Message:</strong> </td>
<td><strong> ${req.body.message} </strong> </td>
</tr>



</table>

   
   
     `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      // ssl:     true,
      secure: false,
      requireTLS: true,

      auth: {
        user: "yourparadisepark1@gmail.com", // generated ethereal user
        pass: "Cacarella12", // generated ethereal password
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Nodemailer Contact" <yourparadisepark1@gmail.com>', // sender address

      // from: req.body.email,
      to: "qmuhammad144@gmail.com", // list of receivers
      subject: "New Investor", // Subject line
      text: "Hello world?", // plain text body

      html: output,
      attachments: [
        {
          filename: "logo.png",
          path: "./images/logo.png",
          cid: "unique@cid",
        },
      ],
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.json({ msg: "OK" });
    });
    // });
  },
};

module.exports = Contact;
