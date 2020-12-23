// const mailjet = require("node-mailjet").connect(
//   "cd07b149e3ce437c9e4e5c2d021c89a5",
//   "9573874672d52c00d0c5b34301d07dbd"
// );

// function send() {
//   return request;
// }
// const request = mailjet.post("send", { version: "v3.1" }).request({
//   Messages: [
//     {
//       From: {
//         Email: "onacedricnageri@gmail.com",
//         Name: "NAGERI"
//       },
//       To: [
//         {
//           Email: "onacedricnageri@gmail.com",
//           Name: "NAGERI"
//         }
//       ],
//       Subject: "Greetings from NAGERI - Mailjet.",
//       TextPart: "My first Mailjet email",
//       HTMLPart:
//         "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       CustomID: "AppGettingStartedTest"
//     }
//   ]
// });
// request
//   .then(result => {
//     console.log(result.body);
//   })
//   .catch(err => {
//     console.log(err.statusCode);
//   });

// export { send };
