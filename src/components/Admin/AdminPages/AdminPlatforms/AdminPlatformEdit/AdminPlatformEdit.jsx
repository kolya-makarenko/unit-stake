import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
} from '../../../../../lib/appwrite';
import classes from './AdminPlatformEdit.module.css';

const AdminPlatformEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: '', // Зберігатимемо в стейті як рядок для зручного редагування в інпуті
        is_verified: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlatformData = async () => {
            try {
                setIsLoading(true);
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    rowId: id,
                });

                // Перетворюємо масив категорій [ "Tech", "Crypto" ] у рядок "Tech, Crypto"
                const categoryString = Array.isArray(response.category)
                    ? response.category.join(', ')
                    : response.category || '';

                setFormData({
                    name: response.name || '',
                    category: categoryString,
                    is_verified: response.is_verified || false,
                });
            } catch (error) {
                console.error(
                    'Error fetching platform details:',
                    error.message,
                );
                alert('Failed to load platform data.');
                navigate('/admin/platforms');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchPlatformData();
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Перетворюємо рядок "Tech, Crypto" назад у масив ["Tech", "Crypto"]
            // .filter(Boolean) видаляє пусті елементи, якщо користувач випадково поставив зайву кому
            const categoryArray = formData.category
                .split(',')
                .map((cat) => cat.trim())
                .filter(Boolean);

            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
                rowId: id,
                data: {
                    name: formData.name,
                    category: categoryArray, // Передаємо вже як масив
                    is_verified: formData.is_verified,
                },
            });

            alert('Platform updated successfully!');
            navigate('/admin/platforms');
        } catch (error) {
            console.error('Error updating platform:', error.message);
            alert('Failed to update platform. Please try again.');
        }
    };

    if (isLoading) {
        return <div className={classes.loading}>Loading platform data...</div>;
    }

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Edit Platform</h2>
                <button onClick={() => navigate('/admin/platforms')}>
                    Back to Platforms
                </button>
            </div>
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
                    <label htmlFor="name">Platform Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={classes.formGroup}>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div
                    className={`${classes.formGroup} ${classes.checkboxGroup}`}
                >
                    <label htmlFor="is_verified">
                        <input
                            type="checkbox"
                            id="is_verified"
                            name="is_verified"
                            checked={formData.is_verified}
                            onChange={handleChange}
                        />
                        Verified Platform
                    </label>
                </div>

                <div className={classes.actions}>
                    <button
                        type="button"
                        className={classes.cancelBtn}
                        onClick={() => navigate('/admin/platforms')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className={classes.saveBtn}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPlatformEdit;
