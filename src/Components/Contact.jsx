import classes from "./Contact.module.css";
export default function Contact() {
  return (
    <section className={classes["contact-section"]}>
      <div className={classes["contact-container"]}>
        <h1>Contact HelperConnect</h1>

        <div className={classes["contact-content"]}>
          <div className={classes["contact-info"]}>
            <h2>Get in Touch</h2>
            <p>
              Have questions or need support? Our team is here to help laborers
              and customers alike.
            </p>

            <div className={classes["contact-methods"]}>
              <div className={classes["contact-item"]}>
                <i className="fas fa-phone"></i>
                <span>
                  Customer Support: <strong>1800-123-4567</strong>
                </span>
              </div>
              <div className={classes["contact-item"]}>
                <i className="fas fa-envelope"></i>
                <span>
                  Email: <strong>support@Helperconnect.com</strong>
                </span>
              </div>
              <div className={classes["contact-item"]}>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  Office: Level 9, Raheja Towers, MG Road, Bangalore, Karnataka
                  560001, India
                </span>
              </div>
            </div>

            <div className={classes["laborer-support"]}>
              <h3>Helper Support</h3>
              <p>
                Specialized support for our skilled professionals regarding
                profile management, payments, and job opportunities.
              </p>
              <span className={classes["support-email"]}>
                Helpers@workconnect.com
              </span>
            </div>
          </div>

          <form className={classes["contact-form"]}>
            <h2>Send us a Message</h2>
            <div className={classes["form-group"]}>
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className={classes["form-group"]}>
              <label>Email</label>
              <input type="email" placeholder="Your email" />
            </div>
            <div className={classes["form-group"]}>
              <label>Subject</label>
              <select>
                <option>General Inquiry</option>
                <option>Helper Registration</option>
                <option>Customer Support</option>
                <option>Payment Issue</option>
              </select>
            </div>
            <div className={classes["form-group"]}>
              <label>Message</label>
              <textarea rows="5" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className={classes["submit-button"]}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
