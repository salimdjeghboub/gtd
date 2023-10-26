const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3001; // You can use any available port
const cors = require('cors');

app.use(cors());


// Configure the email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'salimdjeghboub54@gmail.com',
    pass: 'emnf qlnv gmpk njyj',
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve your HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/send-email', (req, res) => {
  console.log('object')
  const { Name, Email, Phone_Number, Message } = req.body;

  const mailOptions = {
    from: 'salimdjeghboub54@gmail.com',
    to: 'salimdjeghboub54@gmail.com',
    subject: 'Contact Form Submission',
    text: `Name: ${Name}\nEmail: ${Email}\nPhone Number: ${Phone_Number}\nMessage: ${Message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Email not sent. Please try again later.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully. Thank you!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
