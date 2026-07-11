import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    Query,
    TABLE_ID_PARTNERS,
} from '../../../../../lib/appwrite';
import classes from './AssetsPageLegalPartners.module.css';

const AssetsPageLegalPartners = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PARTNERS,
                    queries: [Query.equal('category', 'Legal'), Query.limit(3)],
                });
                setPartners(response.rows);
            } catch (error) {
                console.error('Error fetching partners:', error);
            }
        };
        fetchPartners();
    }, []);

    return (
        <section className={`sectionMarginTop ${classes.partners}`}>
            <div className="wrapper">
                <div className={classes.partnersHeader}>
                    <h2>Legal Partners</h2>
                    <p>
                        Legal partners supporting the structuring, regulatory
                        positioning, and compliance aspects of tokenised
                        projects across jurisdictions. Firms are presented based
                        on their experience in digital assets, securities
                        frameworks, and cross-border structuring.
                    </p>
                </div>
                <div className={classes.partnersContainer}>
                    {partners.map((item, index) => (
                        <div key={index} className={classes.partnerCard}>
                            <div className={classes.partnerCardImg}>
                                <div className={classes.partnerPosition}>
                                    <div className={classes.partnerNumber}>
                                        Partner · 0{index + 1}
                                    </div>
                                    <div className={classes.partnerVerified}>
                                        <div
                                            className={classes.grinCircle}
                                        ></div>
                                        Verified
                                    </div>
                                </div>
                                <div className={classes.partnerLogo}>
                                    <img
                                        src={item.image_url}
                                        alt="partner logo"
                                    />
                                </div>
                            </div>
                            <div className={classes.partnerText}>
                                <h3>{item.name}</h3>
                                <p className={classes.partnerDescription}>
                                    {item.description}
                                </p>
                            </div>
                            <div className={classes.partnerLink}>
                                <h6>Selected</h6>
                                <div
                                    className={classes.projectsCardLinkBtn}
                                    onClick={() =>
                                        navigate(`/partner/${item.$id}`)
                                    }
                                >
                                    <p>Learn More</p>
                                    <svg
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 15.2758L15 1"
                                            stroke="#D34329"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M15 12.0761V1.1C15 1.04477 14.9553 1 14.9 1H4.0752"
                                            stroke="#D34329"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AssetsPageLegalPartners;
