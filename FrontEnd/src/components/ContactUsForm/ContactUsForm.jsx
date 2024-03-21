import React from 'react'
import './ContactUsForm.scss'

const ContactUsForm = () => {
  return (
    <div className="main">
        <div className="form-container">
            <div className="form">
                <span className="heading">Get in touch</span>
                <input placeholder="Name" type="text" className="input"/>
                <input placeholder="Email" id="mail" type="email" className="input"/>
                <textarea placeholder="Say Hello" rows="10" cols="30" id="message" name="message" className="textarea"></textarea>
                <div className="button-container">
                <div className="send-button">Send</div>
                {/* <div className="reset-button-container">
                    <div id="reset-btn" className="reset-button">Reset</div>
                </div> */}
            </div>
        </div>
        </div>
    </div>
  )
}

export default ContactUsForm