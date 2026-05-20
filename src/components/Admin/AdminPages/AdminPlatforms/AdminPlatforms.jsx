import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AdminPlatforms.module.css';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
} from '../../../../lib/appwrite';

import editIcon from '../../../../assets/images/icons/edit.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';
import plusIcon from '../../../../assets/images/icons/plus.svg';

const AdminPlatforms = () => {
    const [platforms, setPlatforms] = useState([]);
    const navigate = useNavigate();

    const fetchPlatforms = async () => {
        try {
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
            });

            setPlatforms(response.rows);
            console.log(response.rows);
        } catch (error) {
            console.error('Error loading platforms:', error.message);
        }
    };

    const editPlatform = (platformId) => {
        navigate(`/admin/platforms/edit/${platformId}`);
    };

    const deletePlatform = async (platformId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this platform?',
        );
        if (!confirmDelete) return;

        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
                rowId: platformId,
            });
            setPlatforms((prevPlatforms) =>
                prevPlatforms.filter((platform) => platform.$id !== platformId),
            );
            alert('Platform deleted successfully.');
        } catch (error) {
            console.error('Error deleting platform:', error.message);
            alert('Failed to delete platform. Please try again.');
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
                <button onClick={() => navigate('/admin/platforms/add')}>
                    <img src={plusIcon} alt="plus" />
                    Add Platform
                </button>
            </div>
            <table className={classes.platformsList}>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Category</th>
                        <th>Verification</th>
                        <th>Date</th>
                        <th>Actions</th>
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
                                <button
                                    className={classes.platformsListEdit}
                                    onClick={() => editPlatform(platform.$id)}
                                >
                                    <img src={editIcon} alt="edit" />
                                </button>
                                <button
                                    className={classes.platformsListDelete}
                                    onClick={() => deletePlatform(platform.$id)}
                                >
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
