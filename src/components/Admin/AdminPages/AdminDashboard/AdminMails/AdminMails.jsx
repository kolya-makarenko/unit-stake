import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_FORM_MESSAGES,
    ID,
    Query,
} from '../../../../../lib/appwrite';

import classes from './AdminMails.module.css';

const AdminMails = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const fetchMessages = async () => {
        try {
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FORM_MESSAGES,
                queries: [Query.orderDesc('$createdAt')],
            });

            setMessages(response.rows);
            console.log(response.rows);
        } catch (error) {
            console.error('Error loading messages:', error.message);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const viewMessage = (mailId) => {
        navigate(`/admin/mail/${mailId}`);
    };

    const formatLocalDate = (isoString) => {
        const date = new Date(isoString);

        return new Intl.DateTimeFormat('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
            .format(date)
            .replace(',', '');
    };

    return (
        <div className={classes.adminMails}>
            <h4>Mails</h4>
            <div className={classes.adminMailsTable}>
                <div className={classes.adminMailsTableHeader}>
                    <span>E-mail</span>
                    <span>Name</span>
                    <span>Phone number</span>
                    <span>Date</span>
                </div>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.is_read
                                ? classes.adminMailsTableRow
                                : `${classes.adminMailsTableRow} ${classes.new}`
                        }
                    >
                        <span className={classes.adminMailsTableRowMail}>
                            {message.mail}
                        </span>
                        <span className={classes.adminMailsTableRowName}>
                            {message.name}
                        </span>
                        <span className={classes.adminMailsTableRowPhone}>
                            {message.phone_number}
                        </span>
                        <span className={classes.adminMailsTableRowDate}>
                            {formatLocalDate(message.$createdAt)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminMails;
