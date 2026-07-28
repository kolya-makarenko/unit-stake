import { useNavigate } from 'react-router-dom';
import classes from './TermOfServices.module.css';

const TermOfServices = () => {
    const navigate = useNavigate();
    return (
        <main className={classes.legalPage}>
            <div className="wrapper">
                <div className={classes.legalPageContainer}>
                    <h2>Terms and Conditions</h2>
                    <div className={classes.effective}>
                        <p>
                            <span>Last updated:</span> June 12, 2026
                        </p>
                    </div>
                    <p>
                        PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE
                        USING THE UNITSTAKE AGGREGATOR. BY ACCESSING OR USING
                        THE AGGREGATOR, YOU AGREE TO BE BOUND BY THESE TERMS.
                    </p>
                    <p>
                        These Terms and Conditions (the "<span>Terms</span>")
                        govern your access to and use of the Unitstake
                        Aggregator, including the website{' '}
                        <span
                            className={classes.link}
                            onClick={() => navigate('/')}
                        >
                            https://unitstake.com/
                        </span>
                        , any associated web or mobile application, and any
                        related services, tools, materials and information
                        contained or made available therein (collectively, the "
                        <span>Aggregator</span>"), operated by Unit Stake
                        Limited, a company incorporated under the laws of
                        England and Wales ("Unitstake", "we", "us", or "our").
                    </p>
                    <p>
                        These Terms constitute a legally binding agreement
                        between you and Unitstake. By accessing, browsing, or
                        using the Aggregator in any manner, you confirm your
                        and, where applicable, your entity’s acceptance of these
                        Terms, together with our Privacy Policy and any
                        additional terms, guidelines, or policies incorporated
                        herein by reference. If you do not agree to these Terms,
                        you must discontinue your use of the Aggregator.
                    </p>
                    <h2>Changes to the Terms</h2>
                    <p>
                        Unitstake reserves the right to change, modify, or
                        update these Terms at any time. Such changes shall be
                        effective upon posting of the updated Terms on the
                        Aggregator, accompanied by an updated "Last Updated"
                        date. Accordingly, please review these Terms
                        periodically. Where changes are material, Unitstake will
                        use reasonable efforts to provide reasonable advance
                        notice, such as by posting a prominent notice on the
                        Aggregator or notifying registered users by email. Your
                        continued use of the Aggregator following the posting of
                        any updated Terms will constitute your acceptance of
                        such changes. If you do not agree to the updated Terms,
                        you must discontinue your use of the Aggregator.
                    </p>
                    <h2>Aggregator Services</h2>
                    <p>
                        Unitstake operates as an independent information
                        aggregator and discovery platform. The Aggregator
                        provides users with structured access to publicly
                        available and issuer-submitted information relating to
                        tokenized real-world asset projects, tokenization
                        platforms, and ecosystem participants, as well as
                        educational content about the sector. All content
                        available through the Aggregator is provided for general
                        informational and educational purposes only.
                    </p>
                    <p>Subject to these Terms, Unitstake enables users to:</p>
                    <ul className={classes.latterList}>
                        <li>
                            explore a directory of tokenized real-world asset
                            projects and tokenization platforms listed on the
                            Aggregator;
                        </li>
                        <li>
                            review structured profiles of listed projects and
                            platforms, based on publicly available and
                            issuer-submitted information;
                        </li>
                        <li>
                            access information about ecosystem participants in
                            the tokenized asset sector, including technology
                            providers, legal service providers, and
                            infrastructure operators;
                        </li>
                        <li>
                            access educational content relating to the tokenized
                            asset sector, including market overviews, news, and
                            editorial commentary on real-world asset
                            tokenization and related topics.
                        </li>
                    </ul>
                    <p>
                        Unitstake reserves the right to modify, suspend, or
                        discontinue any aspect of the Aggregator, including its
                        content, functionality, or technical specifications, at
                        any time, with or without notice. Such changes may
                        result in temporary or permanent unavailability of the
                        Aggregator or certain features.
                    </p>
                    <h2>No Advice</h2>
                    <p>
                        The Aggregator is operated by Unit Stake Limited, which
                        is not a registered broker-dealer, investment advisor,
                        or financial intermediary in any jurisdiction. Unitstake
                        does not provide investment, legal, tax, or other
                        professional advice, endorsement, or recommendations
                        with respect to any project, Aggregator, asset, or token
                        displayed on the Aggregator. Nothing on this Aggregator
                        constitutes or should be construed as an offer to sell,
                        solicitation of an offer to buy, a financial promotion,
                        investment advice, or a recommendation by Unitstake or
                        any of its affiliates.
                    </p>
                    <p>
                        All tokens and other digital assets displayed on the
                        Aggregator are offered by the relevant issuer, and all
                        information provided in relation to them is the
                        responsibility of that issuer. Unitstake makes no
                        representations or warranties as to the accuracy,
                        completeness, or reliability of such information. You
                        are solely responsible for determining whether any
                        investment, investment strategy, or related transaction
                        is appropriate for you based on your personal investment
                        objectives, financial circumstances, and risk tolerance.
                        You should consult with appropriately qualified advisors
                        for any legal, tax, insurance, or investment advice.
                        Unitstake does not guarantee any investment performance,
                        outcome, or return of capital for any project posted on
                        the Aggregator.
                    </p>
                    <h2>Third-Party Content</h2>
                    <p>
                        <span>Definition.</span> The Aggregator aggregates and
                        displays information submitted by, or sourced from,
                        third-party projects, tokenization platforms, ecosystem
                        participants, and other external sources (collectively,
                        "<span>Listed Parties</span>"). The substantial majority
                        of content available on the Aggregator, including, but
                        not limited to, project descriptions, financial metrics,
                        projected returns, funding figures, asset valuations,
                        legal structure descriptions, and regulatory status
                        information, originates from, and remains the sole
                        responsibility of, the relevant Listed Party ("
                        <span>Third-Party Content</span>").
                    </p>
                    <p>
                        Unitstake does not create, generate, or control any
                        Third-Party Content. All Third-Party Content is
                        displayed as submitted or sourced and reflects
                        information as provided by the relevant Listed Party at
                        the time of submission.
                    </p>
                    <p>
                        <span>No Endorsement.</span> Unitstake makes no
                        representation or warranty of any kind, whether express
                        or implied, as to the accuracy, completeness,
                        timeliness, or reliability of any Third-Party Content.
                        The inclusion of any Listed Party on the Aggregator does
                        not constitute, and shall not be construed as, any
                        endorsement, recommendation, or approval by Unitstake.
                        All financial metrics, projected returns (including any
                        figures expressed as IRR, APR, APY, or target return),
                        funding progress indicators, and similar data are
                        provided for informational purposes only.
                    </p>
                    <p>
                        To the maximum extent permitted by applicable law,
                        Unitstake disclaims all liability for any losses arising
                        from any inaccuracy, omission, error, misrepresentation,
                        or misleading statement contained in any Third-Party
                        Content, whether submitted directly by a Listed Party or
                        sourced from publicly available materials.
                    </p>
                    <p>
                        <span>No Ongoing Monitoring Obligation.</span> Unitstake
                        undertakes no obligation to monitor, review, update, or
                        correct Third-Party Content on an ongoing basis.
                        Information displayed on the Aggregator may not reflect
                        the current status of a Listed Party or its projects.
                        You are solely responsible for independently verifying
                        any information obtained through the Aggregator before
                        relying upon it for any purpose.
                    </p>
                    <h2>Verification Badge</h2>
                    <p>
                        <span>Overview.</span> Certain projects listed on the
                        Aggregator may display a "Verified by Unitstake" badge
                        (the "<span>Verification Badge</span>"). The
                        Verification Badge indicates only that Unitstake has
                        conducted a limited factual review of specific
                        information provided by the relevant Listed Party
                        against supporting documentation and publicly available
                        sources, in accordance with the{' '}
                        <span
                            className={classes.link}
                            onClick={() => navigate('/verified')}
                        >
                            Verification Methodology
                        </span>
                        .
                    </p>
                    <p>
                        The Verification Badge does not constitute, and shall
                        not be construed as: (a) an endorsement, recommendation,
                        approval, or validation of any Listed Party, its
                        business, products, or offering; (b) an assessment of
                        investment merit, commercial viability, financial
                        soundness, or suitability of any listed project for any
                        particular purpose; (c) a confirmation that
                        issuer-submitted information is accurate, complete, or
                        current as of any date other than the date of
                        verification; or (d) a guarantee that any projected
                        returns or financial metrics will be achieved; (e) a
                        legal opinion, including any opinion on the legal
                        classification of any token or tokenized instrument; or
                        (f) a form of financial, investment, legal, or
                        regulatory due diligence of any kind. You shall not rely
                        on the presence of the Verification Badge as a
                        substitute for independent professional advice or your
                        own due diligence.
                    </p>
                    <p>
                        <span>Withdrawal and Modification.</span> The
                        Verification Badge reflects the state of information at
                        the time of review. Unitstake reserves the right to
                        withdraw, suspend, or modify the Verification Badge at
                        any time and without prior notice if it determines that
                        the underlying information no longer meets its
                        verification criteria or if it becomes aware of
                        information inconsistent with the basis on which the
                        badge was awarded. Withdrawal or modification of the
                        Verification Badge does not give rise to any liability
                        on the part of Unitstake.
                    </p>
                    <p>
                        <span>Verification Methodology.</span> The specific
                        criteria, process, and limitations applicable to
                        Disclosure Verification are set out in Unitstake's{' '}
                        <span
                            className={classes.link}
                            onClick={() => navigate('/verified')}
                        >
                            Verification Methodology
                        </span>
                        , published on the Aggregator and incorporated into
                        these Terms by reference. Unitstake reserves the right
                        to amend the Verification Methodology at any time, with
                        updates published on the Aggregator together with the
                        applicable effective date.
                    </p>
                    <p>
                        <span>No Liability.</span> Unitstake accepts no
                        liability whatsoever for any loss, damage, or expense of
                        any nature arising from a user's reliance on any
                        verified or unverified listing or on the presence,
                        absence, withdrawal, or modification of the Verification
                        Badge.
                    </p>
                    <h2>User Eligibility & Jurisdictional Issues</h2>
                    <p>
                        Each time you access or use the Aggregator, you
                        represent and warrant that:
                    </p>
                    <ul className={classes.latterList}>
                        <li>
                            You have read and agree to be bound by these Terms;
                        </li>
                        <li>You are at least eighteen (18) years old; </li>
                        <li>
                            You have the full legal authority to enter into and
                            be bound by these Terms;
                        </li>
                        <li>
                            If you are accessing or using the Aggregator on
                            behalf of a company, organisation, or other legal
                            entity, you are duly authorised to bind such entity
                            to these Terms, and references to “you” include such
                            entity;
                        </li>
                        <li>
                            You are not subject to any economic or trade
                            sanctions administered by the United Nations, the
                            European Union, His Majesty's Treasury, or the U.S.
                            Office of Foreign Assets Control, nor are you on any
                            prohibited or restricted parties list maintained by
                            any such authority;
                        </li>
                        <li>
                            Your use of the Aggregator complies with all
                            applicable laws, rules, and regulations.
                        </li>
                    </ul>
                    <p>
                        You further represent, warrant and covenant that neither
                        you nor any person acting on your behalf will use the
                        Aggregator: (1) in connection with money laundering,
                        terrorist financing, sanctions evasion, tax evasion,
                        fraud, or any other unlawful activity; or (2) from, in,
                        or for the benefit of any jurisdiction in which for
                        reputational, legal and/or operational reasons Unitstake
                        has chosen not to market its services, which currently
                        includes Iran, North Korea, Syria, Russia, Belarus, and
                        the non-Ukraine-government-controlled regions of Ukraine
                        (each, an "<span>Excluded Jurisdiction</span>").
                    </p>
                    <p>
                        Unitstake operates this Aggregator from the United
                        Kingdom and makes no representation that the Aggregator
                        or any content thereon is appropriate or available for
                        use in any particular location or for any or all
                        purposes. If you access the Aggregator from outside the
                        United Kingdom, you do so on your own initiative and at
                        your own risk, and you are solely responsible for
                        compliance with applicable local laws and regulations.
                    </p>
                    <h2>Aggregator Access</h2>
                    <p>
                        The Aggregator does not require registration or account
                        creation. All information published on the Aggregator is
                        available to eligible users on a free, open-access
                        basis.
                    </p>
                    <p>
                        From time to time, users may communicate with Unitstake
                        or interact with the Aggregator through various contact
                        channels and submission forms, including the following:
                    </p>
                    <p>
                        <span>(a) Newsletter Subscription.</span> Users may
                        subscribe to the Unitstake newsletter by providing their
                        email address. Subscribers will receive periodic
                        communications from Unitstake, including market updates,
                        industry news, educational content, and announcements
                        regarding new tokenized projects and tokenization
                        platforms. Please note that users may withdraw their
                        consent and unsubscribe at any time by following the
                        unsubscribe link included in each newsletter.
                    </p>
                    <p>
                        <span>(b) Project Listing Application.</span> Issuers
                        and project representatives may submit an application
                        requesting that a tokenized real-world asset project be
                        considered for listing on the Aggregator. The
                        application form requires the submission of
                        project-related information and contact details
                        necessary for Unitstake to communicate with the
                        applicant. Submission of a listing application does not
                        guarantee placement on the Platform. Unitstake reserves
                        the right, at its sole discretion, to accept, reject, or
                        request additional information in respect of any
                        application.
                    </p>
                    <p>
                        By submitting any form on the Aggregator or otherwise
                        providing information through the Aggregator, you
                        represent and warrant that all information provided is
                        accurate, complete, and not misleading. You shall not
                        submit information on behalf of any other person or
                        entity without their prior authorisation.
                    </p>
                    <p>
                        Any personal data submitted through the Aggregator's
                        contact channels or forms will be collected and
                        processed by Unitstake in accordance with the{' '}
                        <span
                            className={classes.link}
                            onClick={() => navigate('/privacy-policy')}
                        >
                            Privacy Policy
                        </span>
                        . By submitting a form or otherwise providing personal
                        data through the Aggregator, you acknowledge that you
                        have read and understood how your personal data will be
                        processed.
                    </p>
                    <h2>Intellectual Property</h2>
                    <p>
                        <span>Ownership.</span> The Aggregator and all content
                        it contains, or may in the future contain, including,
                        but not limited to, information, data, text, audio,
                        video, graphics, photographs, designs, software,
                        functionality, articles, materials, directories, guides,
                        trademarks, service marks, trade names, logos, code, and
                        any other form of intellectual property (collectively,
                        the "<span>Aggregator Content</span>"), is owned by or
                        licensed by Unitstake and is protected by copyright,
                        trademark, and other intellectual property laws and
                        treaties. The Aggregator is also protected as a
                        collective work or compilation under applicable
                        copyright and other laws and treaties.
                    </p>
                    <p>
                        You agree to abide by all applicable intellectual
                        property laws and any additional copyright notices
                        displayed in connection with the Aggregator. You shall
                        promptly notify Unitstake upon becoming aware of any
                        unauthorised use of the Aggregator by any individual or
                        entity, or of any claim that any portion of the
                        Aggregator infringes third-party intellectual property
                        rights.
                    </p>
                    <p>
                        <span>Use of Trademarks.</span> You shall not use any
                        trademarks, trade names, service marks, or logos of
                        Unitstake or its affiliates in any manner that creates
                        the impression that such names or marks belong to or are
                        associated with you, or that Unitstake endorses you to
                        use them, without Unitstake's prior written approval.
                    </p>
                    <p>
                        <span>Limited Licence.</span> You acquire no rights or
                        licences in or to the Aggregator or any content
                        contained therein other than the limited right to access
                        and use the Aggregator in accordance with these Terms.
                        You are not permitted to copy, sell, rent, sublicense,
                        or otherwise redistribute any Aggregator Content. All
                        rights not expressly granted by these Terms are
                        reserved. Should you choose to download or save any
                        content from the Aggregator, you may do so ONLY for your
                        own personal, noncommercial use. Downloaded content
                        shall not be shared with third parties or used for any
                        illegal purpose or in any manner inconsistent with the
                        provisions of these Terms.
                    </p>
                    <p>
                        <span>Feedback.</span> If you choose to provide
                        Unitstake with any feedback, suggestions, or other
                        materials relating to the Aggregator ("
                        <span>Feedback</span>"), you hereby grant Unitstake an
                        unlimited, irrevocable, perpetual, sublicensable,
                        transferable, royalty-free licence to use any such
                        Feedback for any purpose without any obligation or
                        compensation to you. Unitstake is not obligated to
                        implement any Feedback in any way. Additionally,
                        Unitstake may use your usage history to improve the
                        Aggregator and its related services. For information
                        regarding Unitstake's handling of your Feedback and any
                        usage information, please refer to the Unitstake{' '}
                        <span
                            className={classes.link}
                            onClick={() => navigate('/privacy-policy')}
                        >
                            Privacy Policy
                        </span>
                        .
                    </p>
                    <h2>Restriction on Use</h2>
                    <p>
                        You may not use the Aggregator for any illegal purpose,
                        for the facilitation of any violation of applicable law
                        or regulation, or in any manner inconsistent with these
                        Terms. You agree to use the Aggregator solely for your
                        own personal, non-commercial use and not for resale,
                        redistribution, or use by or for the benefit of any
                        other person or entity.
                    </p>
                    <p>Without limiting the foregoing, you shall not:</p>
                    <ul className={classes.latterList}>
                        <li>
                            use the Aggregator for any illegal or unlawful
                            purpose, including, but not limited to, money
                            laundering, fraud, tax evasion, sanction evasion, or
                            any criminal activity;
                        </li>
                        <li>
                            impersonate any person or entity, misrepresent your
                            identity or affiliation with any person or entity,
                            or otherwise provide false or misleading information
                            about yourself;
                        </li>
                        <li>
                            copy, reproduce, distribute, publish, republish,
                            display, transmit, frame, modify, create derivative
                            works or otherwise exploit any part of the
                            Aggregator or its content;{' '}
                        </li>
                        <li>
                            recompile, decompile, disassemble, reverse engineer,
                            attempt to derive the source code or underlying
                            algorithms of any part of the Aggregator;{' '}
                        </li>
                        <li>
                            access, acquire, copy, or monitor any portion of the
                            Aggregator, any data or content found on the
                            Aggregator, or any other Aggregator information,
                            using any robot, spider, scraper, web crawler, or
                            any other automated means, program, tool, algorithm,
                            process or methodology;{' '}
                        </li>
                        <li>
                            store any portion of the Aggregator or its content
                            in, or route the same to, any database or server, or
                            use it to construct a database of any kind;
                        </li>
                        <li>
                            sell, license, or distribute any portion of the
                            Aggregator or its content to any third party, or use
                            it as a component of or basis for any product
                            offered for sale, license, or distribution;
                        </li>
                        <li>
                            bypass, circumvent, or disable any security
                            mechanism, access control, or other protective
                            measures of the Aggregator, or violate any robot
                            exclusion headers;
                        </li>
                        <li>
                            attempt to gain unauthorised access to the
                            Aggregator, data, materials, information, computer
                            systems or networks connected to any server
                            associated with the Aggregator, through hacking,
                            password exploitation, or any other means;
                        </li>
                        <li>
                            use the Aggregator in any manner that could harm,
                            take over, disable, overburden, or otherwise impair
                            any of Unitstake’s computer systems, including, but
                            not limited to, adversely impact the speed of
                            delivery of data;
                        </li>
                        <li>
                            interfere with any other party's access to or
                            enjoyment of the Aggregator;
                        </li>
                        <li>
                            use the Aggregator or its content in any manner that
                            could compete with the business of Unitstake or its
                            affiliates, substitute for the Aggregator, or affect
                            Unitstake's ability to derive revenue in connection
                            with the Aggregator;
                        </li>
                        <li>
                            use the Aggregator, or any trademarks, trade names,
                            service marks, or logos of Unitstake or its
                            affiliates, in any unsolicited communications, spam,
                            or promotional materials.
                        </li>
                    </ul>
                    <p>
                        Unauthorised access to or use of the Aggregator is
                        unlawful. Unitstake reserves the right, without prior
                        notice and in its sole discretion, to suspend or
                        permanently terminate your access to the Aggregator, and
                        take technical and legal measures to prevent such access
                        or use and to seek damages in connection therewith. You
                        agree to notify Unitstake promptly upon becoming aware
                        of any violation of these Terms by any third party.
                    </p>
                    <h2>Risk Acknowledgement</h2>
                    <p>
                        Please note that investment in tokenized real-world
                        assets and participation in tokenization ecosystems
                        involve significant risks, including, but not limited
                        to:
                    </p>
                    <ul>
                        <li>
                            <span>Market and liquidity risk.</span> The markets
                            for tokenized real-world assets are nascent and
                            highly volatile. The value of tokenized assets may
                            fluctuate significantly due to market conditions,
                            supply and demand dynamics, macroeconomic factors,
                            and investor sentiment. Tokenized assets may have a
                            limited or no secondary market, and you may be
                            unable to exit a position at a favourable price or
                            at all.
                        </li>
                        <li>
                            <span>Regulatory risk.</span> The legal and
                            regulatory status of tokenized assets is uncertain
                            and evolving across jurisdictions. Changes in
                            applicable law or regulatory interpretation may
                            adversely affect the value, transferability, or
                            legality of any tokenized asset. You are solely
                            responsible for ensuring that any decisions made or
                            actions taken as a result of your use of the
                            Aggregator comply with all applicable laws and
                            regulations in your jurisdiction.
                        </li>
                        <li>
                            <span>Technology risk.</span> Blockchain-based
                            systems, smart contracts, and supporting
                            infrastructure may be subject to vulnerabilities,
                            bugs, exploits, failures, or unforeseen operational
                            disruptions. Blockchain transactions, once
                            confirmed, are generally irreversible.
                        </li>
                        <li>
                            <span>Third-party risk.</span> The entities behind
                            tokenized projects may fail to perform their
                            obligations, become insolvent, or otherwise cease
                            operations, resulting in partial or total loss of
                            invested capital. Unitstake does not guarantee the
                            continued operation, solvency, or performance of any
                            third-party project or Aggregator described on the
                            Aggregator.
                        </li>
                        <li>
                            <span>Information risk.</span> All content available
                            on the Aggregator, including project descriptions,
                            financial metrics, target returns, and
                            forward-looking statements, is sourced or obtained
                            from the respective project operators. Such
                            information may be inaccurate, incomplete, or
                            misleading. The inclusion of any project,
                            Aggregator, or ecosystem participant on the
                            Aggregator does not constitute an endorsement,
                            approval, or warranty by Unitstake as to its
                            quality, reliability, suitability, or legality.
                        </li>
                    </ul>
                    <p>
                        For a comprehensive description of risks specifically
                        associated with tokenized real-world assets, digital
                        assets, blockchain infrastructure, and smart contract
                        vulnerabilities, please refer to our{' '}
                        <span
                            className={classes.link}
                            onClick={() => navigate('/legal-disclaimer')}
                        >
                            Risk Disclosure Statement
                        </span>
                        , which forms an integral part of these Terms and is
                        available at. The Risk Disclosure Statement supplements
                        the risk categories set out in this Section and should
                        be read before making any decision based on information
                        obtained from the Aggregator.
                    </p>
                    <p>
                        By accessing or using the Aggregator, you acknowledge
                        that the risks described in this Section and in the Risk
                        Disclosure Statement are material, that the tokenized
                        asset ecosystem is subject to rapid change, and that the
                        information available on the Aggregator may not reflect
                        the current risk profile of any project, platform, or
                        asset referenced therein. You are solely responsible for
                        any consequences arising from your reliance on
                        information made available through the Aggregator.
                    </p>
                    <h2>Disclaimers and Limitation of Liability</h2>
                    <p>
                        <span>No Warranties.</span> You agree that your use of
                        the Aggregator is at your sole risk. The Aggregator and
                        anything contained within the Aggregator, including, but
                        not limited to, content, descriptions of tokenized
                        projects and platforms, or any other materials, are
                        provided "as is" and "as available". To the maximum
                        extent permitted by law, Unitstake disclaims all
                        warranties of any kind, express or implied, in respect
                        of the Aggregator, including, but not limited to,
                        merchantability, fitness for a particular purpose,
                        title, or non-infringement. Unitstake does not warrant
                        that: (a) the Aggregator will be available on an
                        uninterrupted, timely, or error-free basis; (b) defects
                        or errors will be corrected; (c) the Aggregator or any
                        electronic communications sent by Unitstake are free of
                        viruses, worms, Trojan horses, or other harmful or
                        corrupting components; or (d) the Aggregator is
                        compatible with your equipment, software, or network
                        environment.
                    </p>
                    <p>
                        <span>No Advice.</span> You acknowledge that the
                        Aggregator is provided for informational purposes only
                        and is not intended for trading purposes. Nothing
                        contained in the Aggregator shall constitute or be
                        construed as: (a) an offering, solicitation,
                        recommendation, or endorsement to buy or sell any
                        tokenized asset, security, financial instrument, or
                        investment of any kind; (b) investment advice or
                        investment recommendations, including recommendations as
                        to whether or not to "buy", "sell", "hold", or to enter
                        or not to enter into any other transaction, or any
                        recommendation of an investment strategy; (c) tax,
                        accounting, legal, or regulatory advice or opinions
                        regarding the profitability or suitability of any
                        tokenized asset, security, or other interest; or (d) an
                        opinion on the future or expected value of any tokenized
                        asset, security or other interest. Content available
                        through the Aggregator reflects publicly available and
                        issuer-submitted information and does not take into
                        account the individual circumstances, objectives,
                        financial situation, or needs of any particular user.
                    </p>
                    <p>
                        <span>No Guarantee of Accuracy or Completeness.</span>{' '}
                        You acknowledge that the Aggregator may include certain
                        information sourced from or contributed by third
                        parties, and Unitstake does not guarantee the accuracy,
                        completeness, currency, or reliability of the
                        Aggregator, or of any data, views, opinions, statements,
                        or other content available on the Aggregator, including
                        descriptions of tokenized projects. Accordingly,
                        notwithstanding anything to the contrary set forth
                        herein, to the maximum extent permitted by law,
                        Unitstake, its affiliates, agents, directors, officers,
                        employees, representatives, successors, and assigns
                        shall not, directly or indirectly, be liable, in any
                        way, to you or any other person for any: (a)
                        inaccuracies, errors, or omissions within the
                        Aggregator, including, but not limited to, quotes and
                        financial data; (b) delays, errors, or interruptions in
                        the transmission or delivery of content through the
                        Aggregator; or (c) loss or damage arising therefrom or
                        occasioned thereby, or by any reason of nonperformance.
                    </p>
                    <p>
                        <span>
                            YOU ASSUME ALL RESPONSIBILITIES AND OBLIGATIONS WITH
                            RESPECT TO ANY DECISIONS MADE OR ACTIONS TAKEN AS A
                            RESULT OF YOUR USE OF THE AGGREGATOR, INCLUDING,
                            WITHOUT LIMITATION, ANY DECISION MADE OR ACTION
                            TAKEN IN RELIANCE UPON THE AGGREGATOR.
                        </span>
                    </p>
                    <p>
                        <span>Third-Party Websites and External Links.</span>{' '}
                        The Aggregator may contain hyperlinks to websites,
                        platforms, or resources operated by third parties ("
                        <span>Third-Party Websites</span>"). Such links are
                        provided for convenience only and do not constitute an
                        endorsement, approval, or recommendation by Unitstake of
                        any information, product, or asset available on or
                        through any Third-Party Website. Unitstake does not
                        control Third-Party Websites and, therefore, is not
                        responsible for their availability, accuracy, content,
                        security, or compliance with applicable laws. If you
                        choose to access any Third-Party Website via a link on
                        the Aggregator, you do so entirely at your own risk, and
                        these Terms shall not apply to your use of such
                        Third-Party Website.
                    </p>
                    <p>
                        <span>Third-Party Communications.</span> Unitstake
                        disclaims all liability in respect of any communication
                        you may receive from any third party in connection with
                        your use of the Aggregator, whether direct or indirect,
                        and in respect of any action you may take or omit to
                        take as a result of any such communication. You are
                        solely responsible for independently assessing and
                        verifying the identity, authority, and trustworthiness
                        of the source and content of any third-party
                        communication. Unitstake makes no representation or
                        warranty regarding, and assumes no responsibility for
                        verifying, the identity or trustworthiness of any
                        third-party communication source.
                    </p>
                    <p>
                        <span>Limitation of Liability.</span> To the maximum
                        extent permitted by applicable law, Unitstake and its
                        affiliates, agents, directors, officers, employees,
                        representatives, successors, and assigns shall not be
                        liable to you or any third party for any damages or
                        losses of any kind arising out of or in connection with:
                        (a) your access to or use of, or inability to access or
                        use, the Aggregator or any content thereon; (b) any
                        inaccuracy, error, or omission in respect of any
                        information provided through the Aggregator; (c) any
                        interruption, suspension, or discontinuation of the
                        Aggregator or any part thereof; (d) any bugs, viruses,
                        trojan horses, or other harmful or corrupting components
                        transmitted through the Aggregator; (e) any fault or
                        failure arising from your own equipment, software, or
                        internet connection; or (f) any decision made or action
                        taken in reliance upon information accessed through the
                        Aggregator. The foregoing exclusion of liability applies
                        regardless of the legal theory under which a claim is
                        brought, including contract, tort, negligence, strict
                        liability, or otherwise, and extends to all categories
                        of loss including direct, indirect, incidental,
                        consequential, special, punitive, or exemplary damages,
                        and loss of revenue, anticipated profits, business,
                        data, or goodwill, even if Unitstake has been advised of
                        the possibility of such damages. To the extent that
                        applicable law does not permit the exclusion or
                        limitation of certain categories of liability, such
                        limitations shall apply only to the fullest extent
                        permissible under applicable law. In no event shall
                        Unitstake's total aggregate liability to you for all
                        claims arising out of or in connection with the
                        Aggregator exceed the amount of EUR 100 (one hundred
                        euros). No action, regardless of form, arising out of or
                        pertaining to the Aggregator may be brought by you more
                        than one year after the cause of action has accrued.
                    </p>
                    <p>
                        <span>Force Majeure.</span> Unitstake shall not be
                        liable for any failure or delay in the performance of
                        its obligations under these Terms to the extent such
                        failure or delay arises from circumstances beyond
                        Unitstake's reasonable control, including, but not
                        limited to, acts of God, war, civil unrest, governmental
                        action, telecommunications failure, or cyberattacks.
                    </p>
                    <p>
                        <span>Remedies.</span> If you breach or threaten to
                        breach any provision of these Terms, Unitstake reserves
                        the right to seek injunctive or other equitable relief
                        without prejudice to any other remedies. If Unitstake
                        prevails in any legal proceeding arising from such
                        breach, Unitstake shall be entitled to recover all
                        reasonable costs, expenses, and legal fees incurred in
                        connection therewith. Unitstake further reserves the
                        right, in its sole discretion, to suspend or permanently
                        terminate your access to the Aggregator if Unitstake
                        reasonably determines that the Aggregator has been or
                        may be used in a manner that is unlawful, improper, or
                        in violation of these Terms or the rights of any third
                        party.
                    </p>
                    <h2>Indemnification</h2>
                    <p>
                        You agree to indemnify, defend, and hold harmless
                        Unitstake and its affiliates, officers, directors,
                        employees, representatives, agents, successors, and
                        assigns from and against any and all claims, damages,
                        liabilities, costs, and expenses (including reasonable
                        legal fees) arising out of or in connection with the
                        Aggregator, including, but not limited to: (a) use of
                        the Aggregator by you or someone using your computer;
                        (b) a violation of the Terms by you or anyone using your
                        computer; or (c) any misrepresentation or breach of
                        representation or warranty made by you contained herein.
                    </p>
                    <h2>Termination</h2>
                    <p>
                        You may terminate these Terms at any time, with or
                        without cause, by discontinuing your use of the
                        Aggregator. You agree that Unitstake reserves the right
                        to terminate these Terms or suspend your access to and
                        use of the Aggregator (or any portion thereof) at any
                        time, with or without cause and without prior notice,
                        including where Unitstake determines, in its sole
                        discretion, that you fail to comply with any provision
                        of these Terms.
                    </p>
                    <p>
                        Unitstake shall not be liable to you or any third party
                        for the termination or suspension of access to the
                        Aggregator. Upon termination of these Terms by you or
                        Unitstake, you must discontinue your use of the
                        Aggregator. Any violation of these Terms may result in
                        restrictions on your access to all or part of this
                        Aggregator and, where appropriate, may be referred to
                        relevant law enforcement authorities. Unitstake will
                        determine your compliance with these Terms in its sole
                        discretion, and its decision shall be final and binding.
                    </p>
                    <h2>Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in
                        accordance with the laws of England and Wales, without
                        giving effect to conflicts-of-law principles. In the
                        event of any dispute arising out of or in connection
                        with these Terms, the parties shall first attempt to
                        resolve such dispute through good-faith negotiations.
                    </p>
                    <p>
                        For the purposes of such negotiations, you agree to send
                        the written description of the dispute to the following
                        email address: legal@unitstake.com. The written
                        description must provide, at a minimum, the following
                        information: your name; a description of the nature or
                        basis of the claim or dispute; and proof of your
                        relationship with Unitstake.
                    </p>
                    <p>
                        If the dispute is not resolved within sixty (60) days
                        after receipt of the written description of the dispute,
                        you and Unitstake agree that the courts of England and
                        Wales shall have exclusive jurisdiction to settle any
                        dispute arising out of or in connection with these
                        Terms.
                    </p>
                    <h2>Privacy Policy</h2>
                    <p>
                        Unitstake respects your privacy and processes personal
                        data in accordance with its Privacy Policy, which is
                        available on the Aggregator and incorporated into these
                        Terms by reference.
                    </p>
                    <h2>Entire Agreement / Severability / Waiver</h2>
                    <p>
                        These Terms, together with any documents and policies
                        incorporated by reference, constitute the entire
                        agreement between you and Unitstake with respect to your
                        use of the Aggregator. If any provision of these Terms
                        is found invalid or unenforceable, it shall be enforced
                        to the maximum extent permitted by applicable law, and
                        the other provisions shall remain in full force and
                        effect. Unitstake’s failure to exercise or enforce any
                        right or provision of these Terms shall not constitute a
                        waiver of such right or provision unless acknowledged
                        and agreed to by Unitstake in writing.
                    </p>
                    <h2>Assignment/Delegation</h2>
                    <p>
                        You may not assign these Terms or the rights hereunder
                        without Unitstake’s prior written consent. Unitstake may
                        assign these Terms to an affiliate. You acknowledge and
                        agree that Unitstake may delegate certain of its
                        responsibilities, obligations, and duties under or in
                        connection with the Terms to a third party or affiliate,
                        who may perform them on Unitstake’s behalf.
                    </p>
                    <h2>Language</h2>
                    <p>
                        The section headings in these Terms are used solely for
                        convenience and have no legal or contractual
                        significance. These Terms are prepared and executed in
                        the English language. In the event of any conflict
                        between the English version of these Terms and the
                        translation into any other language, the English version
                        shall prevail.
                    </p>
                    <h2>Contact Information</h2>
                    <p>
                        If you have any questions regarding these Terms or the
                        Aggregator, please contact Unitstake at:
                    </p>
                    <p>Unit Stake Limited</p>
                    <p>
                        <a
                            href="https://maps.app.goo.gl/EfWrarP9AvFzL4kRA"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            124 City Road, London, England, EC1V 2NX
                        </a>
                    </p>
                    <p>
                        <a href="mailto:legal@unitstake.com">
                            legal@unitstake.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default TermOfServices;
