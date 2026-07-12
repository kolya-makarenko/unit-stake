import classes from './SocialLinks.module.css';

import siteIcon from '../../../../../assets/images/partnerPageImages/siteIcon.svg';
import mailIcon from '../../../../../assets/images/partnerPageImages/mailIcon.svg';
import linkedinIcon from '../../../../../assets/images/partnerPageImages/linkedinIcon.svg';

const SocialLinks = (props) => {
    const cleanUrl = (url) => {
        return url.replace(/^(https?:\/\/)?(www\.)?/, '');
    };

    if (!props.partner_url && !props.email && !props.linkedin_url) {
        return null;
    }

    return (
        <section className={classes.socialLinks}>
            <div className="wrapper">
                <div className={classes.socialLinksContainer}>
                    {props.partner_url && (
                        <a
                            href={props.partner_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={siteIcon} alt="icon" />
                            {cleanUrl(props.partner_url)}
                        </a>
                    )}
                    {props.email && (
                        <a
                            href={props.email}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={mailIcon} alt="icon" />
                            {props.email}
                        </a>
                    )}
                    {props.linkedin_url && (
                        <a
                            href={props.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={linkedinIcon} alt="icon" />
                            LinkedIn
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SocialLinks;
