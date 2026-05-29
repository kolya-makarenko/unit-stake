import { useState, useEffect } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PARTNERS,
    BUCKET_ID,
    ID,
    storage,
} from '../../../../lib/appwrite';
import classes from './AdminPartners.module.css';

import plusIcon from '../../../../assets/images/icons/plus.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';
import upLoadIcon from '../../../../assets/images/icons/upload.svg';
import imageIcon from '../../../../assets/images/icons/imageIcon.svg';
import editIcon from '../../../../assets/images/icons/edit.svg';

const AdminPartners = () => {
    const [partners, setPartners] = useState([]);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [partnerUrl, setPartnerUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPartnerId, setEditingPartnerId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchPartners = async () => {
        try {
            setIsLoading(true);
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PARTNERS,
            });
            setPartners(response.rows || []);
        } catch (error) {
            console.error('Error loading partners:', error.message);
            alert('Unable to load partner data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleAddClick = () => {
        setName('');
        setImageUrl('');
        setPartnerUrl('');
        setImageFile(null);
        setEditingPartnerId(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (partner) => {
        setName(partner.name || '');
        setImageUrl(partner.image_url || '');
        setPartnerUrl(partner.partner_url || '');
        setImageFile(null);
        setEditingPartnerId(partner.$id);
        setIsFormOpen(true);
    };

    const handleDeleteClick = async (partnerId) => {
        if (!window.confirm('Are you sure you want to remove this partner?'))
            return;

        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PARTNERS,
                rowId: partnerId,
            });
            alert('The partner has been successfully removed!');
            fetchPartners();
        } catch (error) {
            console.error('Error deleting partner:', error);
            alert('Error deleting partner.');
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingPartnerId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        setIsSubmitting(true);

        try {
            let finalImageUrl = imageUrl;

            if (imageFile) {
                const uploadedFile = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    imageFile,
                );
                finalImageUrl = `${storage.client.config.endpoint}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${storage.client.config.project}`;
            }

            const data = {
                name: name,
                image_url: finalImageUrl,
                partner_url: partnerUrl,
            };

            if (editingPartnerId) {
                await tablesDB.updateRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PARTNERS,
                    rowId: editingPartnerId,
                    data: data,
                });
                alert('The partner has been successfully updated!');
            } else {
                await tablesDB.createRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PARTNERS,
                    rowId: ID.unique(),
                    data: data,
                });
                alert('Partner successfully added!');
            }

            setIsFormOpen(false);
            fetchPartners();
        } catch (error) {
            console.error('Error saving partner:', error);
            alert(`Error saving partner: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className={classes.adminPage}>
                <h2>Loading data...</h2>
            </div>
        );
    }

    return (
        <div className={classes.adminPage}>
            {isFormOpen ? (
                <div className={classes.AdminHeader}>
                    <h2>
                        {editingPartnerId ? 'Edit Partner' : 'Add New Partner'}
                    </h2>
                    <button onClick={handleCancel}>
                        <img src={plusIcon} alt="plus" />
                        Back to Partnes
                    </button>
                </div>
            ) : (
                <div className={classes.AdminHeader}>
                    <h2>Partners</h2>
                    <button onClick={handleAddClick}>
                        <img src={plusIcon} alt="plus" />
                        Add Partner
                    </button>
                </div>
            )}
            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className={classes.addPlatformForm}
                >
                    <h3 className={classes.addPlatformFormHeader}>
                        {editingPartnerId ? 'Edit Partner' : 'Add New Partner'}
                    </h3>
                    <div className={classes.addPlatformFormIdentity}>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="partnerName">Partner Name</label>
                            <input
                                type="text"
                                id="partnerName"
                                placeholder="e.g. Binance"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="partnerUrl">
                                Partner Website URL
                            </label>
                            <input
                                type="text"
                                id="partnerUrl"
                                placeholder="https://example.com"
                                value={partnerUrl}
                                onChange={(e) => setPartnerUrl(e.target.value)}
                            />
                        </div>

                        <div
                            className={
                                classes.addPlatformFormIdentityFieldImage
                            }
                        >
                            <p>Logo</p>
                            <label htmlFor="partnerImage">
                                {imageFile || imageUrl ? (
                                    <div
                                        className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                    >
                                        <img src={imageIcon} alt="upload" />
                                        <span>
                                            {imageFile
                                                ? imageFile.name
                                                : 'Current Logo (Uploaded)'}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            classes.addPlatformFormIdentityFieldImagePlaceholder
                                        }
                                    >
                                        <img src={upLoadIcon} alt="upload" />
                                        <span>Select an image</span>
                                    </div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="partnerImage"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={classes.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            )}

            {!isFormOpen && (
                <div className={classes.adminPartners}>
                    <h3>Partners List</h3>
                    <div className={classes.adminPartnersContaner}>
                        {partners.length === 0 ? (
                            <p className={classes.addPlatformFormHeader}>
                                No partners added
                            </p>
                        ) : (
                            partners.map((partner) => (
                                <div
                                    key={partner.$id}
                                    className={classes.adminPartnersListItem}
                                >
                                    <div
                                        className={
                                            classes.adminPartnersListItemName
                                        }
                                    >
                                        <h4>{partner.name}</h4>
                                        {partner.partner_url && (
                                            <a
                                                href={partner.partner_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {partner.partner_url}
                                            </a>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            classes.adminPartnersListItemActions
                                        }
                                    >
                                        <button
                                            type="button"
                                            className={
                                                classes.adminPartnersListItemEdit
                                            }
                                            onClick={() =>
                                                handleEditClick(partner)
                                            }
                                        >
                                            <img src={editIcon} alt="edit" />
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                classes.adminPartnersListItemDelete
                                            }
                                            onClick={() =>
                                                handleDeleteClick(partner.$id)
                                            }
                                        >
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPartners;
