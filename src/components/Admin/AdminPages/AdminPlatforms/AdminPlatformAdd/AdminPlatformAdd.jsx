import { useState } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
    ID,
} from '../../../../../lib/appwrite';
import { useNavigate } from 'react-router-dom';
import classes from './AdminPlatformAdd.module.css';

const AdminPlatformAdd = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [varification, setVerification] = useState(false);
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        try {
            const data = {
                name: name,
                is_verified: varification,
                category: [category],
            };

            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
                rowId: ID.unique(),
                data: data,
            });

            alert('Platform added successfully!');
            navigate('/admin/platforms');
        } catch (error) {
            console.error('Error adding platform:', error);
            alert(`Failed to add platform: ${error.message}`);
        }
    };

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Add Platform</h2>
                <button onClick={() => navigate('/admin/platforms')}>
                    Back to Platforms
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Platform name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="varification">
                    <input
                        type="checkbox"
                        id="varification"
                        checked={varification}
                        onChange={(e) => setVerification(e.target.checked)}
                    />
                    Verified
                </label>
                <button type="submit">Add platform</button>
            </form>
        </div>
    );
};

export default AdminPlatformAdd;
