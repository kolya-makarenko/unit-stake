import { useState, useEffect } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_FAQS_PAGE,
    Query,
} from '../../../../../lib/appwrite';
import classes from './AssetsPageFaq.module.css';

const AssetsPageFaq = () => {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_FAQS_PAGE,
                    queries: [Query.equal('page_type', 'assets_owners')],
                });
                const document = response.rows[0];

                if (document && document.faq_blocks) {
                    const parsedFaqs = document.faq_blocks
                        .map((item) => {
                            try {
                                return JSON.parse(item);
                            } catch (e) {
                                console.error('Parsing error:', e);
                                return null;
                            }
                        })
                        .filter(Boolean);

                    setFaqs(parsedFaqs);
                }
            } catch (error) {
                console.error('Error fetching faqs:', error);
            }
        };
        fetchFaqs();
    }, []);

    return (
        <section className={`sectionMarginTop ${classes.faq}`}>
            <div className="wrapper">
                <h2>FAQ</h2>
                <p>No. Institutional interest is increasing globally.</p>
                <div className={classes.faqContainer}>
                    {faqs.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`${classes.faqBox} ${isActive ? classes.active : ''}`}
                                onClick={() => handleToggle(index)}
                            >
                                <div className={classes.faqQuestion}>
                                    {item.question}
                                    <svg
                                        width="17"
                                        height="9"
                                        viewBox="0 0 17 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.08203 7.8252L8.08203 1.46156L15.082 7.8252"
                                            stroke="white"
                                            strokeWidth="2.16364"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <div className={classes.faqAnswer}>
                                    {item.answer}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AssetsPageFaq;
