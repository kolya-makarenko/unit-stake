import { useState } from 'react';

import classes from './ServicesCards.module.css';

import partnerServicesCardIcon1 from '../../../../../assets/images/icons/partnerServicesCardIcon1.svg';
import partnerServicesCardIcon2 from '../../../../../assets/images/icons/partnerServicesCardIcon2.svg';
import partnerServicesCardIcon3 from '../../../../../assets/images/icons/partnerServicesCardIcon3.svg';
import partnerServicesCardIcon4 from '../../../../../assets/images/icons/partnerServicesCardIcon4.svg';
import partnerServicesCardIcon5 from '../../../../../assets/images/icons/partnerServicesCardIcon5.svg';
import partnerServicesCardIcon6 from '../../../../../assets/images/icons/partnerServicesCardIcon6.svg';

const marketingCards = [
    {
        id: '1',
        icon: partnerServicesCardIcon1,
        title: 'Go-to-Market Strategy',
        txt: 'Strategic launch planning for tokenised asset projects — from market positioning to investor acquisition funnels.',
    },
    {
        id: '2',
        icon: partnerServicesCardIcon2,
        title: 'Investor-Facing Positioning',
        txt: 'Clear, credible messaging that helps asset owners explain the value, structure, and opportunity behind their tokenised asset.',
    },
    {
        id: '3',
        icon: partnerServicesCardIcon3,
        title: 'Conversion Website Development',
        txt: 'High-converting coded websites and landing pages designed to turn attention into qualified investor and partner enquiries.',
    },
    {
        id: '4',
        icon: partnerServicesCardIcon4,
        title: 'Content & Thought Leadership',
        txt: 'Educational, trust-building content for blogs, reports, social media, presentations, and investor communications.',
    },
    {
        id: '5',
        icon: partnerServicesCardIcon5,
        title: 'Paid Acquisition & Lead Generation',
        txt: 'Google Ads, Meta Ads, retargeting, and funnel campaigns focused on attracting relevant investors, asset owners, ecosystem partners.',
    },
    {
        id: '6',
        icon: partnerServicesCardIcon6,
        title: 'Community & Distribution',
        txt: 'Strategic visibility across digital channels to build awareness, trust, and long-term market demand.',
    },
];

const legalCards = [
    {
        id: '1',
        icon: partnerServicesCardIcon1,
        title: 'Audit & Assurance',
        txt: 'Independent audit and assurance services designed to strengthen credibility, improve financial transparency and support stakeholder confidence.',
    },
    {
        id: '2',
        icon: partnerServicesCardIcon2,
        title: 'Tax Advisory',
        txt: 'Strategic tax guidance for businesses, investors and digital asset structures, including crypto asset taxation, corporate tax, VAT and cross-border considerations.',
    },
    {
        id: '3',
        icon: partnerServicesCardIcon3,
        title: 'Crypto Assets Compliance',
        txt: 'Specialist support for companies and investors dealing with crypto assets, helping them understand reporting obligations, tax treatment and regulatory expectations.',
    },
    {
        id: '4',
        icon: partnerServicesCardIcon4,
        title: 'FinTech Compliance',
        txt: 'Advisory for fintech businesses operating in regulated environments, including governance, risk management, compliance frameworks and international structuring.',
    },
    {
        id: '5',
        icon: partnerServicesCardIcon5,
        title: 'Financial Advisory',
        txt: 'Commercial and strategic advisory for businesses seeking growth, restructuring, transaction readiness or stronger financial decision-making.',
    },
    {
        id: '6',
        icon: partnerServicesCardIcon6,
        title: 'RWA Tokenisation Advisory',
        txt: 'Professional guidance for tokenising real estate, commodities, financial instruments and alternative assets, focused on compliance, structure and investor trust.',
    },
];

const CARDS_MAP = {
    Marketing: marketingCards,
    Legal: legalCards,
};

const ServicesCards = ({ category }) => {
    const cards = CARDS_MAP[category] || [];

    return (
        <section className={classes.servicesCards}>
            <div className="wrapper">
                <h3>Services</h3>
                <div className={classes.servicesCardsContainer}>
                    {cards.map((card) => (
                        <div key={card.id} className={classes.servicesCard}>
                            <img src={card.icon} alt="icon" />
                            <h4>{card.title}</h4>
                            <p>{card.txt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesCards;
