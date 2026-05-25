import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_FORM_MESSAGES,
} from '../../../../../../lib/appwrite';
import classes from './AdminMail.module.css';

import deleteIcon from '../../../../../../assets/images/icons/delete.svg';

const AdminMail = () => {
    const [mailData, setMailData] = useState('');
    const { id: mailId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMailData = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_FORM_MESSAGES,
                    rowId: mailId,
                });

                setMailData(response);
            } catch (error) {
                console.error('Error fetching mail data:', error);
                alert('Failed to load mail data.');
                navigate('/admin');
            }
        };

        if (mailId) {
            fetchMailData();
        }
    }, [mailId, navigate]);

    const readMail = async () => {
        try {
            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FORM_MESSAGES,
                rowId: mailId,
                data: {
                    is_read: true,
                },
            });
        } catch (error) {
            console.error('Error reading mail:', error.message);
        }
    };

    readMail();

    const deleteMail = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this mail?',
        );
        if (!confirmDelete) return;

        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FORM_MESSAGES,
                rowId: mailId,
            });
            alert('Mail deleted successfully.');
            navigate('/admin');
        } catch (error) {
            console.error('Error deleting mail:', error.message);
            alert('Failed to delete mail. Please try again.');
        }
    };

    const formatLocalDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(date);
    };

    const formatLocalTime = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString();
    };

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Mail</h2>
                <button onClick={() => navigate('/admin')}>
                    Back to Dashboard
                </button>
            </div>
            <div className={classes.adminMail}>
                <div className={classes.adminMailBody}>
                    <h3>Mail from:</h3>
                    <p>
                        E-mail:{' '}
                        <a href={`mailto:${mailData.mail}`}>{mailData.mail}</a>
                    </p>
                    <p>
                        Name: <span>{mailData.name}</span>
                    </p>
                    <p>
                        Phone Number:{' '}
                        <a href={`tel:${mailData.phone_number}`}>
                            {mailData.phone_number}
                        </a>
                    </p>
                    <p>
                        Date:{' '}
                        <span>{formatLocalDate(mailData.$createdAt)}</span>
                    </p>
                    <p>
                        Time:{' '}
                        <span>{formatLocalTime(mailData.$createdAt)}</span>
                    </p>
                </div>
                <button
                    className={classes.adminMailDelete}
                    onClick={deleteMail}
                >
                    <img src={deleteIcon} alt="delete" />
                </button>
            </div>
        </div>
    );
};

export default AdminMail;
