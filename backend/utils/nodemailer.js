import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(
  {
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: 'Your Email', // your email
      pass: 'Your pass' // your email password 
    },
  }
)

// function for sending email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


