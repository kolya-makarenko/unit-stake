import { useEffect, useState } from 'react';
import classes from './AdminPlatforms.module.css';
import {
    databases,
    DATABASE_ID,
    COLLECTION_ID,
} from '../../../../lib/appwrite';

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
                            <td>{platform.name}</td>
                            <td>{platform.category}</td>
                            <td>
                                {platform.is_verified ? (
                                    <div>Verified</div>
                                ) : (
                                    <div>Not Verified</div>
                                )}
                            </td>
                            <td>{platform.$createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPlatforms;
