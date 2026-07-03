import { useState, useEffect } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PARTNERS,
    TABLE_ID_CATEGORIES,
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
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [partnerUrl, setPartnerUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPartnerId, setEditingPartnerId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [email, setEmail] = useState('');
    const [textBlocks, setTextBlocks] = useState([]);

    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_CATEGORIES,
            });
            if (response.rows && response.rows.length > 0) {
                setCategoriesList(response.rows[0].partner_categories || []);
            }
        } catch (error) {
            console.error('Error loading partner categories:', error.message);
        }
    };

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
        fetchCategories();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const addTextBlock = (type) => {
        const newBlock = {
            id: ID.unique(),
            type: type,
            value: type === 'case_link' ? { title: '', url: '' } : '',
            file: null,
        };
        setTextBlocks([...textBlocks, newBlock]);
    };

    const handleBlockTextChange = (id, text) => {
        setTextBlocks(
            textBlocks.map((block) =>
                block.id === id ? { ...block, value: text } : block,
            ),
        );
    };

    const handleCaseLinkChange = (id, field, text) => {
        setTextBlocks(
            textBlocks.map((block) =>
                block.id === id
                    ? { ...block, value: { ...block.value, [field]: text } }
                    : block,
            ),
        );
    };

    const handleBlockFileChange = (id, e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setTextBlocks(
                textBlocks.map((block) =>
                    block.id === id
                        ? {
                              ...block,
                              file: file,
                              value: file.name,
                              existingUrl: null,
                          }
                        : block,
                ),
            );
        }
    };

    const removeBlock = (id) => {
        setTextBlocks(textBlocks.filter((block) => block.id !== id));
    };

    const handleAddClick = () => {
        setName('');
        setDescription('');
        setImageUrl('');
        setPartnerUrl('');
        setEmail('');
        setCategory('');
        setTextBlocks([]);
        setImageFile(null);
        setEditingPartnerId(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (partner) => {
        setName(partner.name || '');
        setDescription(partner.description || '');
        setImageUrl(partner.image_url || '');
        setPartnerUrl(partner.partner_url || '');
        setEmail(partner.email || '');
        setCategory(partner.category || '');
        setImageFile(null);
        setEditingPartnerId(partner.$id);

        if (partner.content_blocks && partner.content_blocks.length) {
            const parsedBlocks = partner.content_blocks.map((blockStr) => {
                const block = JSON.parse(blockStr);
                return {
                    id: ID.unique(),
                    type: block.type,
                    value: block.value,
                    file: null,
                    existingUrl: block.type === 'image' ? block.value : null,
                };
            });
            setTextBlocks(parsedBlocks);
        } else {
            setTextBlocks([]);
        }

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

            const serializedBlocks = [];
            for (const block of textBlocks) {
                if (block.type === 'image') {
                    if (block.file) {
                        const uploadedBlockFile = await storage.createFile(
                            BUCKET_ID,
                            ID.unique(),
                            block.file,
                        );
                        const fileUrl = `${storage.client.config.endpoint}/storage/buckets/${BUCKET_ID}/files/${uploadedBlockFile.$id}/view?project=${storage.client.config.project}`;

                        serializedBlocks.push(
                            JSON.stringify({
                                type: block.type,
                                value: fileUrl,
                            }),
                        );
                    } else {
                        serializedBlocks.push(
                            JSON.stringify({
                                type: block.type,
                                value: block.existingUrl || '',
                            }),
                        );
                    }
                } else {
                    serializedBlocks.push(
                        JSON.stringify({
                            type: block.type,
                            value: block.value,
                        }),
                    );
                }
            }

            const data = {
                name: name,
                description: description,
                image_url: finalImageUrl,
                partner_url: partnerUrl,
                email: email,
                category: category,
                content_blocks: serializedBlocks,
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
                    <button onClick={handleCancel}>Back to Partners</button>
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
                            <label htmlFor="partnerDescription">
                                Description
                            </label>
                            <input
                                type="text"
                                id="partnerDescription"
                                placeholder="Describe the partner..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="partnerEmail">Partner Email</label>
                            <input
                                type="email"
                                id="partnerEmail"
                                placeholder="e.g. partner@binance.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="partnerCategory">
                                Partner Category
                            </label>
                            <select
                                id="partnerCategory"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categoriesList.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
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

                    <div className={classes.addPlatformFormContent}>
                        <h3 className={classes.addPlatformFormHeader}>
                            Content Blocks
                        </h3>
                        <div className={classes.addPlatformFormContentBlocks}>
                            <div className={classes.addPlatformFormBlocksList}>
                                {textBlocks.map((block, index) => (
                                    <div
                                        key={block.id}
                                        className={`${classes.addPlatformFormBlocksListItem} ${classes[block.type]}`}
                                    >
                                        <div
                                            className={
                                                classes.addPlatformFormBlocksListItemHeader
                                            }
                                        >
                                            <span>
                                                Block {index + 1}:{' '}
                                                <strong>
                                                    {block.type === 'h4' &&
                                                        'Title'}
                                                    {block.type === 'p' &&
                                                        'Body Text'}
                                                    {block.type === 'image' &&
                                                        'Image Block'}
                                                    {block.type ===
                                                        'case_link' &&
                                                        'Link to Case'}
                                                </strong>
                                            </span>
                                            <button
                                                type="button"
                                                className={
                                                    classes.deleteBlockBtn
                                                }
                                                onClick={() =>
                                                    removeBlock(block.id)
                                                }
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="Delete"
                                                />
                                            </button>
                                        </div>

                                        {block.type === 'h4' && (
                                            <input
                                                type="text"
                                                placeholder="Enter title text..."
                                                className={
                                                    classes.addPlatformFormBlocksListItemInputTitle
                                                }
                                                value={block.value}
                                                onChange={(e) =>
                                                    handleBlockTextChange(
                                                        block.id,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        )}

                                        {block.type === 'p' && (
                                            <textarea
                                                placeholder="Enter main text content..."
                                                className={
                                                    classes.addPlatformFormBlocksListItemInputTitle
                                                }
                                                value={block.value}
                                                onChange={(e) =>
                                                    handleBlockTextChange(
                                                        block.id,
                                                        e.target.value,
                                                    )
                                                }
                                                rows={4}
                                            />
                                        )}

                                        {block.type === 'case_link' && (
                                            <div
                                                className={
                                                    classes.adminPartnersCaseLinksInputs
                                                }
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Case Title / Label (e.g. DeFi Integration Case)"
                                                    className={
                                                        classes.addPlatformFormBlocksListItemInputTitle
                                                    }
                                                    value={
                                                        block.value?.title || ''
                                                    }
                                                    onChange={(e) =>
                                                        handleCaseLinkChange(
                                                            block.id,
                                                            'title',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Case URL (https://...)"
                                                    className={
                                                        classes.addPlatformFormBlocksListItemInputTitle
                                                    }
                                                    value={
                                                        block.value?.url || ''
                                                    }
                                                    onChange={(e) =>
                                                        handleCaseLinkChange(
                                                            block.id,
                                                            'url',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}

                                        {block.type === 'image' && (
                                            <div
                                                className={
                                                    classes.addPlatformFormIdentityFieldImage
                                                }
                                            >
                                                <label
                                                    htmlFor={`imageBlock-${block.id}`}
                                                >
                                                    {block.file ||
                                                    block.existingUrl ? (
                                                        <div
                                                            className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                                        >
                                                            <img
                                                                src={imageIcon}
                                                                alt="upload"
                                                            />
                                                            <span>
                                                                {block.file
                                                                    ? block.file
                                                                          .name
                                                                    : 'Current Block Image'}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={
                                                                classes.addPlatformFormIdentityFieldImagePlaceholder
                                                            }
                                                        >
                                                            <img
                                                                src={upLoadIcon}
                                                                alt="upload"
                                                            />
                                                            <span>
                                                                Select block
                                                                image
                                                            </span>
                                                        </div>
                                                    )}
                                                </label>
                                                <input
                                                    id={`imageBlock-${block.id}`}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleBlockFileChange(
                                                            block.id,
                                                            e,
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div
                                className={classes.addPlatformFormBlockButtons}
                            >
                                <button
                                    type="button"
                                    onClick={() => addTextBlock('h4')}
                                >
                                    + Add Title
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addTextBlock('p')}
                                >
                                    + Add Body Text
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addTextBlock('image')}
                                >
                                    + Add Image
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addTextBlock('case_link')}
                                >
                                    + Add Case Link
                                </button>
                            </div>
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
                                        <h4>
                                            {partner.name}{' '}
                                            {partner.category && (
                                                <span>
                                                    ({partner.category})
                                                </span>
                                            )}
                                        </h4>
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
