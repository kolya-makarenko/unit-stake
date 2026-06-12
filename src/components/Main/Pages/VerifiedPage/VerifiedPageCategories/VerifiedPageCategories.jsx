import classes from './VerifiedPageCategories.module.css';

import categoriesIcon1 from '../../../../../assets/images/verifiedPageImages/verificationCategoriesIcon1.svg';
import categoriesIcon2 from '../../../../../assets/images/verifiedPageImages/verificationCategoriesIcon2.svg';
import categoriesIcon3 from '../../../../../assets/images/verifiedPageImages/verificationCategoriesIcon3.svg';
import categoriesIcon4 from '../../../../../assets/images/verifiedPageImages/verificationCategoriesIcon4.svg';
import categoriesIcon5 from '../../../../../assets/images/verifiedPageImages/verificationCategoriesIcon5.svg';

const categoriesBoxes = [
    {
        id: '1',
        title: 'Legal',
        text: 'Corporate structure, company jurisdiction, and token holder rights.',
        downloadLink: '',
        icon: categoriesIcon1,
    },
    {
        id: '2',
        title: 'Financials',
        text: 'Disclosed financial data, cash flow model, and key financial indicators.',
        downloadLink: '',
        icon: categoriesIcon2,
    },
    {
        id: '3',
        title: 'Team KYC',
        text: 'Identity verification of key project participants.',
        downloadLink: '',
        icon: categoriesIcon3,
    },
    {
        id: '4',
        title: 'Reputation',
        text: 'Media coverage of the project and key contributors, including the history of previous ventures.',
        downloadLink: '',
        icon: categoriesIcon4,
    },
    {
        id: '5',
        title: 'Tech Verification',
        text: 'Verification of smart contracts and technical infrastructure.',
        downloadLink: '',
        icon: categoriesIcon5,
    },
];

const VerifiedPageCategories = () => {
    return (
        <section className={classes.categories}>
            <div className="wrapper">
                <h2>Verification Categories</h2>
                <div className={classes.categoriesContainer}>
                    {categoriesBoxes.map((item) => (
                        <div key={item.id} className={classes.categoriesBox}>
                            <div className={classes.categoriesBoxTitle}>
                                <div className={classes.categoriesBoxIcon}>
                                    <img src={item.icon} alt="icon" />
                                </div>
                                <h4>Legal</h4>
                            </div>
                            <p>{item.text}</p>
                            <div className={classes.categoriesDownloadLink}>
                                <a
                                    href={item.downloadLink}
                                    download={item.downloadLink}
                                >
                                    Methodology
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_1656_154)">
                                            <path
                                                d="M7.4094 13.5915C7.61835 13.8006 7.86645 13.9664 8.13953 14.0796C8.41261 14.1928 8.70531 14.251 9.0009 14.251C9.2965 14.251 9.5892 14.1928 9.86227 14.0796C10.1353 13.9664 10.3835 13.8006 10.5924 13.5915L13.0007 11.1833C13.1298 11.0404 13.199 10.8535 13.1941 10.661C13.1891 10.4685 13.1104 10.2853 12.9741 10.1494C12.8378 10.0134 12.6545 9.93499 12.462 9.93045C12.2695 9.92592 12.0827 9.99558 11.9402 10.125L9.74565 12.3203L9.7509 0.75C9.7509 0.551088 9.67188 0.360322 9.53123 0.21967C9.39058 0.0790176 9.19981 0 9.0009 0V0C8.80199 0 8.61122 0.0790176 8.47057 0.21967C8.32992 0.360322 8.2509 0.551088 8.2509 0.75L8.24415 12.306L6.06165 10.125C5.92092 9.98437 5.73009 9.9054 5.53114 9.90547C5.33218 9.90554 5.14141 9.98464 5.00078 10.1254C4.86015 10.2661 4.78118 10.4569 4.78125 10.6559C4.78132 10.8548 4.86042 11.0456 5.00115 11.1863L7.4094 13.5915Z"
                                                fill="#D34329"
                                            />
                                            <path
                                                d="M17.25 12C17.0511 12 16.8603 12.079 16.7197 12.2197C16.579 12.3603 16.5 12.5511 16.5 12.75V15.75C16.5 15.9489 16.421 16.1397 16.2803 16.2803C16.1397 16.421 15.9489 16.5 15.75 16.5H2.25C2.05109 16.5 1.86032 16.421 1.71967 16.2803C1.57902 16.1397 1.5 15.9489 1.5 15.75V12.75C1.5 12.5511 1.42098 12.3603 1.28033 12.2197C1.13968 12.079 0.948912 12 0.75 12C0.551088 12 0.360322 12.079 0.21967 12.2197C0.0790176 12.3603 0 12.5511 0 12.75L0 15.75C0 16.3467 0.237053 16.919 0.65901 17.341C1.08097 17.7629 1.65326 18 2.25 18H15.75C16.3467 18 16.919 17.7629 17.341 17.341C17.7629 16.919 18 16.3467 18 15.75V12.75C18 12.5511 17.921 12.3603 17.7803 12.2197C17.6397 12.079 17.4489 12 17.25 12Z"
                                                fill="#D34329"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1656_154">
                                                <rect
                                                    width="18"
                                                    height="18"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                    <div className={classes.categoriesTextBox}>
                        <h5>Note</h5>
                        <p>
                            Each section is based on information disclosed by
                            the project and, where possible, verified through
                            independent and publicly available sources.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifiedPageCategories;
