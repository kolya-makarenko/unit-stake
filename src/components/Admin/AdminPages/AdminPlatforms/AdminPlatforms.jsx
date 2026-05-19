import { useEffect, useState } from 'react';
import classes from './AdminPlatforms.module.css';
import {
    databases,
    DATABASE_ID,
    COLLECTION_ID,
} from '../../../../lib/appwrite';

import editIcon from '../../../../assets/images/icons/edit.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';

const AdminPlatforms = () => {
    const [platforms, setPlatforms] = useState([]);

    const fetchPlatforms = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
            );
            setPlatforms(response.documents);
            console.log(response.documents);
        } catch (error) {
            console.error('Error loading platforms:', error.message);
        }
    };

    useEffect(() => {
        fetchPlatforms();
    }, []);

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Platforms</h2>
            </div>
            <table className={classes.platformsList}>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Category</th>
                        <th>Verification</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {platforms.map((platform, index) => (
                        <tr key={index}>
                            <td className={classes.platformListName}>
                                {platform.name}
                            </td>
                            <td className={classes.platformListCategory}>
                                {platform.category}
                            </td>
                            <td>
                                {platform.is_verified ? (
                                    <div
                                        className={
                                            classes.platformListVerificationOn
                                        }
                                    >
                                        Verified
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            classes.platformListVerificationOff
                                        }
                                    >
                                        Not Verified
                                    </div>
                                )}
                            </td>
                            <td className={classes.platformListDate}>
                                {dateFormatter(platform.$createdAt)}
                            </td>
                            <td className={classes.platformsListActions}>
                                <button className={classes.platformsListEdit}>
                                    <img src={editIcon} alt="edit" />
                                </button>
                                <button className={classes.platformsListDelete}>
                                    <img src={deleteIcon} alt="delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPlatforms;
