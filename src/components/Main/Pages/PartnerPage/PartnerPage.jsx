import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PARTNERS,
} from '../../../../lib/appwrite';
import CategoryTxt from './CategoryTxt/CategoryTxt';
import FocusTxt from './FocusTxt/FocusTxt';
import ServicesCards from './ServicesCards/ServicesCards';
import ExternalLinks from './ExternalLinks/ExternalLinks';
import StrategicManifesto from './StrategicManifesto/StrategicManifesto';
import ForOwners from './ForOwners/ForOwners';
import Approach from './Approach/Approach';
import SocialLinks from './SocialLinks/SocialLinks';
import Engagement from './Engagement/Engagement';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';

import classes from './PartnerPage.module.css';

import linkedinIcon from '../../../../assets/images/icons/linkedin.svg';
import telegramIcon from '../../../../assets/images/icons/telegram.svg';
import twitterIcon from '../../../../assets/images/icons/twitter.svg';
import shareBtnCopyIcon from '../../../../assets/images/icons/shareBtnCopy.svg';
import AssetsPageFaq from '../AssetsPage/AssetsPageFaq/AssetsPageFaq';

const PartnerPage = () => {
    const { id: partnerId } = useParams();

    const [partner, setPartner] = useState([]);

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PARTNERS,
                    rowId: partnerId,
                });
                setPartner(response);
            } catch (error) {
                console.error('Error loading partner:', error.message);
            }
        };
        fetchPartner();
    }, [partnerId]);

    const shareUrl = encodeURIComponent(
        typeof window !== 'undefined' ? window.location.href : '',
    );

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className={classes.partnerPage}>
            <section className={classes.identity}>
                <div className="wrapper">
                    <div className={classes.identityContainer}>
                        <div className={classes.logoAndName}>
                            {partner.image_url && (
                                <div className={classes.partnerImage}>
                                    <img
                                        src={partner.image_url}
                                        alt="Partner logo"
                                    />
                                </div>
                            )}
                            <h2>{partner.name}</h2>
                        </div>
                        <div className={classes.shareButtons}>
                            Share
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.shareBtn}
                            >
                                <img src={linkedinIcon} alt="linkedin" />
                            </a>
                            <a
                                href={`https://t.me/share/url?url=${shareUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.shareBtn}
                            >
                                <img src={telegramIcon} alt="telegram" />
                            </a>
                            <a
                                href={`https://x.com/intent/tweet?url=${shareUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.shareBtn}
                            >
                                <img src={twitterIcon} alt="twitter" />
                            </a>
                            <div
                                onClick={copyToClipboard}
                                className={classes.shareBtn}
                            >
                                <img src={shareBtnCopyIcon} alt="share link" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.identityTxt}>
                        <CategoryTxt category={partner.category} />
                        {partner.description && (
                            <p className={classes.description}>
                                {partner.description}
                            </p>
                        )}
                    </div>
                    <div className={classes.locationAndFocus}>
                        {partner.jurisdiction && (
                            <div className={classes.locationAndFocusBox}>
                                <h4>Jurisdiction</h4>
                                <p>{partner.jurisdiction}</p>
                            </div>
                        )}
                        <FocusTxt category={partner.category} />
                    </div>
                </div>
            </section>
            <ServicesCards category={partner.category} />
            <ExternalLinks
                partner_url={partner.partner_url}
                whatsapp_url={partner.whatsapp_url}
            />
            <StrategicManifesto category={partner.category} />
            <ForOwners category={partner.category} />
            <Approach approach_text={partner.approach_text} />
            <SocialLinks
                partner_url={partner.partner_url}
                email={partner.email}
                linkedin_url={partner.linkedin_url}
            />
            <Engagement engagement_blocks={partner.engagement_blocks} />
            <AdditionalInfo content_blocks={partner.content_blocks} />
            <AssetsPageFaq pageName="partner" relatedId={partnerId} />
        </main>
    );
};

export default PartnerPage;
