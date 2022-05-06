
import emailjs from '@emailjs/browser';


const sendEmailLike = (obj) => {

  emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID_LIKE, obj, process.env.REACT_APP_PUBLIC_KEY)
    .then((result) => {
      // console.log(result.text);
    }, (error) => {
      // console.log(error.text);
    });
};

const sendEmailComment = (obj) => {

  emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID_COMMENT, obj, process.env.REACT_APP_PUBLIC_KEY)
    .then((result) => {
      // console.log(result.text);
    }, (error) => {
      // console.log(error.text);
    });
};


export { sendEmailLike, sendEmailComment };

