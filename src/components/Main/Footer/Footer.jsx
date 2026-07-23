import { NavLink } from 'react-router-dom';
import classes from './Footer.module.css';

import logo from '../../../assets/images/logoWhite.svg';

const MENU_ITEMS = [
    { to: '/projects', label: 'Projects' },
    { to: '/platforms', label: 'Platforms' },
    { to: '/for-assets-owners', label: 'For Asset Owners' },
    { to: '/insights', label: 'Insights' },
    { to: '/academy', label: 'Academy' },
    { to: '/about-us', label: 'About Us' },
    { to: '/verified', label: 'Verified By UnitStake' },
];

const instagramIcon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 7.5C11.11 7.5 10.24 7.76392 9.49993 8.25839C8.75991 8.75285 8.18314 9.45566 7.84254 10.2779C7.50195 11.1002 7.41283 12.005 7.58647 12.8779C7.7601 13.7508 8.18868 14.5526 8.81802 15.182C9.44736 15.8113 10.2492 16.2399 11.1221 16.4135C11.995 16.5872 12.8998 16.4981 13.7221 16.1575C14.5443 15.8169 15.2471 15.2401 15.7416 14.5001C16.2361 13.76 16.5 12.89 16.5 12C16.4988 10.8069 16.0243 9.66303 15.1806 8.81939C14.337 7.97575 13.1931 7.50124 12 7.5ZM12 15C11.4067 15 10.8266 14.8241 10.3333 14.4944C9.83994 14.1648 9.45542 13.6962 9.22836 13.1481C9.0013 12.5999 8.94189 11.9967 9.05764 11.4147C9.1734 10.8328 9.45912 10.2982 9.87868 9.87868C10.2982 9.45912 10.8328 9.1734 11.4147 9.05764C11.9967 8.94189 12.5999 9.0013 13.1481 9.22836C13.6962 9.45542 14.1648 9.83994 14.4944 10.3333C14.8241 10.8266 15 11.4067 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15ZM16.5 2.25H7.5C6.10807 2.25149 4.77358 2.80509 3.78933 3.78933C2.80509 4.77358 2.25149 6.10807 2.25 7.5V16.5C2.25149 17.8919 2.80509 19.2264 3.78933 20.2107C4.77358 21.1949 6.10807 21.7485 7.5 21.75H16.5C17.8919 21.7485 19.2264 21.1949 20.2107 20.2107C21.1949 19.2264 21.7485 17.8919 21.75 16.5V7.5C21.7485 6.10807 21.1949 4.77358 20.2107 3.78933C19.2264 2.80509 17.8919 2.25149 16.5 2.25ZM20.25 16.5C20.25 17.4946 19.8549 18.4484 19.1516 19.1516C18.4484 19.8549 17.4946 20.25 16.5 20.25H7.5C6.50544 20.25 5.55161 19.8549 4.84835 19.1516C4.14509 18.4484 3.75 17.4946 3.75 16.5V7.5C3.75 6.50544 4.14509 5.55161 4.84835 4.84835C5.55161 4.14509 6.50544 3.75 7.5 3.75H16.5C17.4946 3.75 18.4484 4.14509 19.1516 4.84835C19.8549 5.55161 20.25 6.50544 20.25 7.5V16.5ZM18 7.125C18 7.3475 17.934 7.56501 17.8104 7.75002C17.6868 7.93502 17.5111 8.07922 17.3055 8.16436C17.1 8.24951 16.8738 8.27179 16.6555 8.22838C16.4373 8.18498 16.2368 8.07783 16.0795 7.9205C15.9222 7.76316 15.815 7.56271 15.7716 7.34448C15.7282 7.12625 15.7505 6.90005 15.8356 6.69448C15.9208 6.48891 16.065 6.31321 16.25 6.1896C16.435 6.06598 16.6525 6 16.875 6C17.1734 6 17.4595 6.11853 17.6705 6.3295C17.8815 6.54048 18 6.82663 18 7.125Z"
            fill="white"
        />
    </svg>
);

const twitterIcon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M20.133 19.8478L14.2643 10.6247L20.0552 4.25438C20.1862 4.10674 20.2537 3.91343 20.2431 3.71636C20.2325 3.51929 20.1446 3.33435 19.9986 3.20161C19.8525 3.06888 19.66 2.99907 19.4628 3.00731C19.2657 3.01555 19.0797 3.10117 18.9452 3.24562L13.4289 9.31312L9.633 3.34781C9.56531 3.24127 9.47183 3.15353 9.36121 3.09274C9.25059 3.03194 9.12642 3.00004 9.00019 3H4.50019C4.36571 2.99993 4.2337 3.03603 4.11796 3.10449C4.00222 3.17296 3.90702 3.27129 3.84232 3.38918C3.77763 3.50707 3.74582 3.64018 3.75023 3.77458C3.75463 3.90898 3.7951 4.03973 3.86738 4.15313L9.73613 13.3753L3.94519 19.7503C3.87756 19.823 3.82503 19.9083 3.79063 20.0014C3.75623 20.0945 3.74065 20.1935 3.74479 20.2927C3.74894 20.3918 3.77272 20.4892 3.81477 20.5791C3.85681 20.669 3.91628 20.7496 3.98973 20.8164C4.06318 20.8831 4.14915 20.9346 4.24265 20.9679C4.33615 21.0012 4.43533 21.0156 4.53443 21.0103C4.63354 21.0049 4.7306 20.98 4.81999 20.9369C4.90938 20.8937 4.98932 20.8333 5.05519 20.7591L10.5714 14.6916L14.3674 20.6569C14.4356 20.7625 14.5293 20.8494 14.6399 20.9093C14.7505 20.9693 14.8744 21.0005 15.0002 21H19.5002C19.6345 21 19.7664 20.9638 19.882 20.8954C19.9976 20.827 20.0927 20.7288 20.1573 20.611C20.222 20.4933 20.2539 20.3604 20.2496 20.2261C20.2453 20.0918 20.205 19.9612 20.133 19.8478ZM15.4118 19.5L5.86613 4.5H8.58488L18.1343 19.5H15.4118Z"
            fill="white"
        />
    </svg>
);

const linkedinIcon = (
    <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.25 0.0666504C0.95 0.149984 0.6875 0.30415 0.4625 0.52915C0.2375 0.75415 0.1 1.01665 0.05 1.31665C0.0166667 1.48332 0 4.54165 0 10.4917L0.025 19.4417L0.175 19.7667C0.358333 20.15 0.616667 20.425 0.95 20.5917L1.025 20.6417C1.15833 20.7083 1.33333 20.75 1.55 20.7667C1.86667 20.8 2.55833 20.8167 3.625 20.8167H17.4C18.4333 20.8167 19.1083 20.8 19.425 20.7667C19.625 20.75 19.7917 20.7 19.925 20.6167L20 20.5667C20.1333 20.4833 20.2708 20.3583 20.4125 20.1917C20.5542 20.025 20.6583 19.8667 20.725 19.7167L20.8 19.4667L20.825 10.4667C20.825 4.46665 20.8167 1.39998 20.8 1.26665C20.6833 0.766649 20.3917 0.399984 19.925 0.166651L19.6 0.0166492H10.55C6.61667 -1.71661e-05 4.10833 -0.00418282 3.025 0.00415039C1.94167 0.0124836 1.35 0.0333176 1.25 0.0666504ZM5.35 3.49165C5.88333 3.57498 6.275 3.85832 6.525 4.34165C6.575 4.45832 6.60833 4.55415 6.625 4.62915C6.64167 4.70415 6.65 4.85415 6.65 5.07915C6.65 5.30415 6.64167 5.45415 6.625 5.52915C6.60833 5.60415 6.56667 5.70415 6.5 5.82915C6.43333 5.95415 6.325 6.08748 6.175 6.22915C6.025 6.37082 5.88333 6.47498 5.75 6.54165C5.66667 6.59165 5.58333 6.62082 5.5 6.62915C5.41667 6.63748 5.27083 6.64165 5.0625 6.64165C4.85417 6.64165 4.7125 6.63748 4.6375 6.62915C4.5625 6.62082 4.475 6.59165 4.375 6.54165C4.04167 6.37498 3.79583 6.13748 3.6375 5.82915C3.47917 5.52082 3.42917 5.17498 3.4875 4.79165C3.54583 4.40832 3.70417 4.09998 3.9625 3.86665C4.22083 3.63332 4.575 3.49998 5.025 3.46665C5.04167 3.46665 5.15 3.47498 5.35 3.49165ZM14.7 7.89165C15.35 8.02498 15.8875 8.31248 16.3125 8.75415C16.7375 9.19582 17.0333 9.76665 17.2 10.4667C17.2667 10.7667 17.3125 11.1625 17.3375 11.6542C17.3625 12.1458 17.375 13.1167 17.375 14.5667V17.3667H14.325V14.5167C14.3083 13.25 14.2958 12.4458 14.2875 12.1041C14.2792 11.7625 14.2583 11.5416 14.225 11.4417C14.125 11.0583 13.9708 10.7708 13.7625 10.5792C13.5542 10.3875 13.2833 10.2792 12.95 10.2542C12.6167 10.2291 12.3042 10.2958 12.0125 10.4542C11.7208 10.6125 11.5083 10.8333 11.375 11.1167C11.2917 11.2667 11.2417 11.4083 11.225 11.5416C11.1917 11.7083 11.175 12.0167 11.175 12.4667L11.15 17.3667H8.2V8.06665H11.15V9.39165L11.325 9.14165C11.7583 8.50832 12.3333 8.09998 13.05 7.91665C13.2333 7.86665 13.5042 7.83748 13.8625 7.82915C14.2208 7.82082 14.5 7.84165 14.7 7.89165ZM6.5 12.7167V17.3667H3.45V8.06665H6.5V12.7167Z"
            fill="white"
        />
    </svg>
);

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className="wrapper">
                <div className={classes.footerContainer}>
                    <NavLink to="/" className={classes.footerlogo}>
                        <img src={logo} alt="logo" />
                    </NavLink>
                    <div className={classes.footerMenu}>
                        <ul>
                            {MENU_ITEMS.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.to}
                                        className={classes.footerMenuLink}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={classes.footerSocialLinks}>
                        <a
                            href="https://www.instagram.com/unitstake"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {instagramIcon}
                        </a>
                        <a
                            href="https://www.threads.com/@unitstake"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {twitterIcon}
                        </a>
                        <a
                            href="https://www.linkedin.com/company/unit-stake/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {linkedinIcon}
                        </a>
                    </div>
                </div>
                <div className={classes.disclaimer}>
                    <div className={classes.disclaimerHeader}>
                        Legal Disclaimer
                    </div>
                    <p>
                        The Aggregator is operated by Unit Stake Limited, which
                        is not a registered broker-dealer, investment adviser,
                        or financial intermediary in any jurisdiction. The
                        Aggregator operates solely as an information aggregator,
                        providing publicly available data relating to tokenised
                        real-world assets and associated projects. Unitstake
                        does not provide investment, legal, tax, or other
                        professional advice, endorsements, or recommendations
                        with respect to any project, platform, or digital asset
                        displayed on the Aggregator. Nothing on this Aggregator
                        constitutes or should be construed as a financial
                        promotion, an offer to sell, solicitation of an offer to
                        buy, investment advice, or a recommendation by Unit
                        Stake Limited. All digital assets displayed on the
                        Aggregator are offered by the relevant issuer, and all
                        information provided in relation to them is the
                        responsibility of that issuer. Unit Stake Limited makes
                        no representations or warranties as to the accuracy,
                        completeness, or reliability of such information. You
                        are solely responsible for determining whether any
                        investment, investment strategy, or related transaction
                        is appropriate for you based on your personal investment
                        objectives, financial circumstances, and risk tolerance.
                        You should consult with appropriately qualified advisers
                        for any legal, tax, insurance, or investment advice.
                        Unit Stake Limited does not guarantee any investment
                        performance, outcome, or return of capital for any
                        project posted on the Aggregator.
                    </p>
                </div>
                <div className={classes.footerLegalText}>
                    <div className={classes.footerCopyright}>
                        © Copyright UnitStake 2026
                    </div>
                    <div className={classes.footerLegalLinks}>
                        <ul>
                            <li>
                                <NavLink
                                    to="/privacy-policy"
                                    className={classes.footerLegalLink}
                                >
                                    Privacy Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/legal-disclaimer"
                                    className={classes.footerLegalLink}
                                >
                                    Risk Disclosure Statement
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/term-services"
                                    className={classes.footerLegalLink}
                                >
                                    Terms and Conditions
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
