import classes from './AboutUsPageContacts.module.css';

const AboutUsPageContacts = () => {
    return (
        <section className={`sectionMarginTop ${classes.contacts}`}>
            <div className="wrapper">
                <h2>Contact us</h2>
                <div className={classes.contactsContainer}>
                    <div className={classes.contactsAdress}>
                        <h3>Address</h3>
                        <a
                            href="https://maps.app.goo.gl/KvPc6tHWFfLDUxfn9"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            124 City Road, London, England, EC1V 2NX
                        </a>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.235609498627!2d-0.09124732337873727!3d51.52723827181778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca671a6cfb1%3A0x382927fb9ac5269b!2zMTI0IENpdHkgUmQsIExvbmRvbiBFQzFWIDJOWCwg0JLQtdC70LjQutC-0LHRgNC40YLQsNC90LjRjw!5e0!3m2!1sru!2sua!4v1781138299637!5m2!1sru!2sua"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className={classes.contactsMailCards}>
                        <div className={classes.contactsMailCard}>
                            <h4>Support</h4>
                            <p>general assistance.</p>
                            <a href="mailto:support@unitstake.com">
                                support@unitstake.com
                            </a>
                        </div>
                        <div className={classes.contactsMailCard}>
                            <h4>Marketing & Partnerships</h4>
                            <p>
                                Strategic partnerships, media, and collaboration
                                inquiries.
                            </p>
                            <a href="mailto:partners@unitstake.com">
                                partners@unitstake.com
                            </a>
                        </div>
                        <div className={classes.contactsMailCard}>
                            <h4>Sales</h4>
                            <p>Listing and commercial inquiries.</p>
                            <a href="mailto:support@unitstake.com">
                                support@unitstake.com
                            </a>
                        </div>
                    </div>
                    <div className={classes.contactsCv}>
                        <h3>Join our Team</h3>
                        <p>
                            Working at Unit Stake means helping build the
                            infrastructure of a new financial reality. We
                            structure the tokenised asset market and make
                            real-world assets more accessible in the digital
                            economy. We’re looking for people who think
                            long-term, understand where the market is going, and
                            want to be part of shaping it.
                        </p>
                        <h6>Send your CV:</h6>
                        <a href="mailto:support@unitstake.com">
                            support@unitstake.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPageContacts;
