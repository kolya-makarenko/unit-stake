import classes from './ExternalLinks.module.css';

const siteIcon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 3H21V9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10.001 14L21.001 3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const whatsappIcon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 23.9999L1.687 17.837C0.645998 16.033 0.0989998 13.988 0.0999998 11.891C0.103 5.33499 5.43799 0 11.993 0C15.174 0.000999998 18.16 1.24 20.406 3.48799C22.6509 5.73599 23.8869 8.72398 23.8859 11.902C23.8829 18.459 18.548 23.7939 11.993 23.7939C10.003 23.7929 8.04198 23.2939 6.30499 22.346L0 23.9999ZM6.59698 20.193C8.27298 21.188 9.87298 21.784 11.989 21.785C17.437 21.785 21.875 17.351 21.878 11.9C21.88 6.43799 17.463 2.01 11.997 2.008C6.54498 2.008 2.11 6.44199 2.108 11.892C2.107 14.117 2.75899 15.783 3.85399 17.526L2.85499 21.174L6.59698 20.193ZM17.984 14.729C17.91 14.605 17.712 14.531 17.414 14.382C17.117 14.233 15.656 13.514 15.383 13.415C15.111 13.316 14.913 13.266 14.714 13.564C14.516 13.861 13.946 14.531 13.773 14.729C13.6 14.927 13.426 14.952 13.129 14.803C12.832 14.654 11.874 14.341 10.739 13.328C9.85598 12.54 9.25898 11.567 9.08598 11.269C8.91298 10.972 9.06798 10.811 9.21598 10.663C9.34998 10.53 9.51298 10.316 9.66198 10.142C9.81298 9.96998 9.86198 9.84598 9.96198 9.64698C10.061 9.44898 10.012 9.27498 9.93698 9.12598C9.86198 8.97798 9.26798 7.51498 9.02098 6.91998C8.77898 6.34099 8.53398 6.41899 8.35198 6.40999L7.78198 6.39999C7.58398 6.39999 7.26198 6.47399 6.98998 6.77199C6.71798 7.06998 5.94999 7.78798 5.94999 9.25098C5.94999 10.714 7.01498 12.127 7.16298 12.325C7.31198 12.523 9.25798 15.525 12.239 16.812C12.948 17.118 13.502 17.301 13.933 17.438C14.645 17.664 15.293 17.632 15.805 17.556C16.376 17.471 17.563 16.837 17.811 16.143C18.059 15.448 18.059 14.853 17.984 14.729Z"
            fill="#0C0C0C"
        />
    </svg>
);

const ExternalLinks = (props) => {
    if (!props.partner_url && !props.whatsapp_url) {
        return;
    }

    return (
        <section className={classes.externalLinks}>
            <div className="wrapper">
                <div className={classes.externalLinksContainer}>
                    {props.partner_url && (
                        <div className={classes.secondaryInfoLink}>
                            <a
                                href={props.partner_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Website
                                {siteIcon}
                            </a>
                        </div>
                    )}
                    {props.whatsapp_url && (
                        <div className={classes.whatsappLink}>
                            <a
                                href={props.whatsapp_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contact What'sApp
                                {whatsappIcon}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ExternalLinks;
