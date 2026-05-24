import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_FORM_MESSAGES,
    ID,
} from '../../../../../../lib/appwrite';

import classes from './AdminMail.module.css';

const AdminMail = () => {
    const [mailData, setMailData] = useState(null);
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

    return <div></div>;
};

export default AdminMail;
