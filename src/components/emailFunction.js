// never used
import React from "react";
import { useState } from "react";
import { init, emailjs } from "emailjs-com";
init("user_ppWRIYMbE7GoCsbYfs3Is");
//this sends email to ADMIN ( One person hard coded)
const EmailComponent = ({ destEmail }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const templateId = "template_rd7sdug";

    sendFeedback(templateId, {
      message_html: this.state.feedback,
      from_name: this.state.name,
      reply_to: setEmail(destEmail)
    });
  };

  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send("gmail", templateId, variables)
      .then(res => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  };
};

var templateParams = {
  name: "James",
  notes: "Check this out!"
};

emailjs.send("service_g4r7e8x", "template_rd7sdug", templateParams).then(
  function(response) {
    console.log("SUCCESS!", response.status, response.text);
  },
  function(error) {
    console.log("FAILED...", error);
  }
);
/**
 emailjs.send("service_g4r7e8x", "template_rd7sdug", {
  to_name: "ajrosebella@gmail.com",
  message: "thePass",
  reply_to: "onacedricnageri@gmail.com"
});


emailjs.send("service_g4r7e8x", "template_rd7sdug", {
  message: "passwordHere",
  reply_to: "ajrosebella@gmail.com"
});


 */
export default EmailComponent;
