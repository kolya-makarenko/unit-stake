import classes from './AssetsPagePath.module.css';

const pathBoxes = [
    {
        id: '1',
        title: 'Asset Selection',
        txt: 'Identification of a suitable asset with clear value and revenue potential.',
    },
    {
        id: '2',
        title: 'Legal Structuring',
        txt: 'Creation of the legal framework, including SPV, ownership structure, and compliance.',
    },
    {
        id: '3',
        title: 'Marketing & Positioning',
        txt: 'Preparing the project to attract investor attention.',
    },
    {
        id: '4',
        title: 'Platform Listing & Token Issuance',
        txt: 'Listing the asset on the platform and issuing tokens for investors.',
    },
];

const AssetsPagePath = () => {
    return (
        <section className={classes.path}>
            <div className="wrapper">
                <h2>A Clear Path to Raising Capital Through Tokenization</h2>
            </div>
            <div className={classes.pathRow}>
                <div className={`wrapper ${classes.pathContainer}`}>
                    {pathBoxes.map((item) => (
                        <div key={item.id} className={classes.pathBox}>
                            <div className={classes.pathBoxInfo}>
                                <h3>{item.title}</h3>
                                <p>{item.txt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AssetsPagePath;
