import { useState } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    ID,
    TABLE_ID_FORM_MESSAGES,
} from '../../../../../lib/appwrite';
import classes from './MainPageForm.module.css';

import formImage from '../../../../../assets/images/mainPageImages/formImage.png';

const MainPageForm = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) return;

        setIsLoading(true);
        setError('');

        try {
            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FORM_MESSAGES,
                rowId: ID.unique(),
                data: {
                    mail: email,
                    purpose: 'To subscribe to the newsletter',
                },
            });

            setIsSubmitted(true);
            setEmail('');
        } catch (err) {
            console.error('Appwrite error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={classes.form}>
            <div className="wrapper">
                <div className={classes.formContainer}>
                    <div className={classes.formInfo} id="subscriptionForm">
                        <h2>Get Market Access</h2>
                        <p>
                            Request access to structured market insights,
                            platform overviews, and ecosystem updates.
                        </p>
                        <form onSubmit={handleSubmit} id="mainPageForm">
                            <input
                                id={classes.email}
                                name="mail"
                                type="email"
                                placeholder="Enter your email to continue"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Request Access'}
                            </button>
                        </form>
                        {isSubmitted && (
                            <span className={classes.successMessage}>
                                Thank you! You've successfully subscribed to our
                                updates.
                            </span>
                        )}
                        {error && (
                            <span className={classes.errorMessage}>
                                {error}
                            </span>
                        )}
                        <label className={classes.labelCheck}>
                            <input
                                type="checkbox"
                                name="check"
                                id={classes.check}
                            />
                            <span>No spam. Relevant updates only.</span>
                        </label>
                    </div>
                    <div className={classes.formImg}>
                        <img src={formImage} alt="form image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainPageForm;
