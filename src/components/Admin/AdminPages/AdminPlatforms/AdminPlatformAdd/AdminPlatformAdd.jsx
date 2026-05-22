import { useState } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
    ID,
    storage,
    BUCKET_ID,
} from '../../../../../lib/appwrite';
import { useNavigate } from 'react-router-dom';
import classes from './AdminPlatformAdd.module.css';

import upLoadIcon from '../../../../../assets/images/icons/upload.svg';
import imageIcon from '../../../../../assets/images/icons/imageIcon.svg';

const AdminPlatformAdd = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [verification, setVerification] = useState(false);
    const [category, setCategory] = useState('');
    const [assets, setAssets] = useState('');
    const [platformAge, setPlatformAge] = useState('');
    const [totalProjects, setTotalProjects] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [platformWebsite, setPlatformWebsite] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [textBlocks, setTextBlocks] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const addTextBlock = (type) => {
        const newBlock = {
            id: ID.unique(),
            type: type,
            value: type === 'ul' ? [''] : '',
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
                          }
                        : block,
                ),
            );
        }
    };

    const handleListItemChange = (blockId, itemIndex, text) => {
        setTextBlocks(
            textBlocks.map((block) => {
                if (block.id === blockId) {
                    const updatedList = [...block.value];
                    updatedList[itemIndex] = text;
                    return { ...block, value: updatedList };
                }
                return block;
            }),
        );
    };

    const addListItem = (blockId) => {
        setTextBlocks(
            textBlocks.map((block) => {
                if (block.id === blockId) {
                    return { ...block, value: [...block.value, ''] };
                }
                return block;
            }),
        );
    };

    const removeListItem = (blockId, itemIndex) => {
        setTextBlocks(
            textBlocks.map((block) => {
                if (block.id === blockId) {
                    const updatedList = block.value.filter(
                        (_, idx) => idx !== itemIndex,
                    );
                    return {
                        ...block,
                        value: updatedList.length ? updatedList : [''],
                    };
                }
                return block;
            }),
        );
    };

    const removeBlock = (id) => {
        setTextBlocks(textBlocks.filter((block) => block.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        setIsSubmitting(true);

        try {
            let imageUrl = '';
            if (imageFile) {
                const uploadedFile = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    imageFile,
                );
                imageUrl = `${storage.client.config.endpoint}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${storage.client.config.project}`;
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
                        const blockImageUrl = `${storage.client.config.endpoint}/storage/buckets/${BUCKET_ID}/files/${uploadedBlockFile.$id}/view?project=${storage.client.config.project}`;

                        serializedBlocks.push(
                            JSON.stringify({
                                type: 'image',
                                value: blockImageUrl,
                            }),
                        );
                    } else {
                        serializedBlocks.push(
                            JSON.stringify({ type: 'image', value: '' }),
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
                is_verified: verification,
                category: category ? [category] : [],
                image_url: imageUrl,
                text_blocks: serializedBlocks,
                assets: assets,
                platform_age: platformAge,
                total_projects: totalProjects,
                jurisdiction: jurisdiction,
                platform_website: platformWebsite,
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Add Platform</h2>
                <button
                    onClick={() => navigate('/admin/platforms')}
                    disabled={isSubmitting}
                >
                    Back to Platforms
                </button>
            </div>
            <form onSubmit={handleSubmit} className={classes.addPlatformForm}>
                <h3 className={classes.addPlatformFormHeader}>
                    Platform Identity
                </h3>
                <div className={classes.addPlatformFormIdentity}>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="platformName">Platform Name</label>
                        <input
                            type="text"
                            id="platformName"
                            placeholder="e.g. NexusFi"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="category">Primary Category</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="assets">
                            Total Tokenized Asset Volume
                        </label>
                        <input
                            type="text"
                            id="assets"
                            placeholder="$ 0"
                            value={assets}
                            onChange={(e) => setAssets(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="platformAge">Operating Since</label>
                        <input
                            type="text"
                            id="platformAge"
                            placeholder="2019"
                            value={platformAge}
                            onChange={(e) => setPlatformAge(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="totalProjects">
                            Number of Projects
                        </label>
                        <input
                            type="text"
                            id="totalProjects"
                            placeholder="0"
                            value={totalProjects}
                            onChange={(e) => setTotalProjects(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="jurisdiction">Jurisdiction</label>
                        <input
                            type="text"
                            id="jurisdiction"
                            placeholder="City, Country"
                            value={jurisdiction}
                            onChange={(e) => setJurisdiction(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="platformUrl">URL Slug</label>
                        <input
                            type="text"
                            id="platformUrl"
                            placeholder="Platform Website URL"
                            value={platformWebsite}
                            onChange={(e) => setPlatformWebsite(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityFieldImage}>
                        <p>Logo</p>
                        <label htmlFor="image">
                            {imageFile ? (
                                <div
                                    className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                >
                                    <img src={imageIcon} alt="upload" />
                                    <span>{imageFile.name}</span>
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
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className={classes.addPlatformFormContent}>
                    <h3 className={classes.addPlatformFormHeader}>
                        Content Blocks
                    </h3>

                    <div className={classes.blockButtons}>
                        <button
                            type="button"
                            onClick={() => addTextBlock('h4')}
                        >
                            + Add Heading (H4)
                        </button>
                        <button type="button" onClick={() => addTextBlock('p')}>
                            + Add Paragraph (P)
                        </button>
                        <button
                            type="button"
                            onClick={() => addTextBlock('ul')}
                        >
                            + Add List (UL)
                        </button>
                        <button
                            type="button"
                            onClick={() => addTextBlock('image')}
                        >
                            + Add Image (IMG)
                        </button>
                    </div>

                    <div className={classes.blocksList}>
                        {textBlocks.map((block, index) => (
                            <div
                                key={block.id}
                                className={`${classes.blockItem} ${classes[block.type]}`}
                            >
                                <div className={classes.blockHeader}>
                                    <span>
                                        #{index + 1} Блок:{' '}
                                        <strong>
                                            {block.type.toUpperCase()}
                                        </strong>
                                    </span>
                                    <button
                                        type="button"
                                        className={classes.deleteBlockBtn}
                                        onClick={() => removeBlock(block.id)}
                                    >
                                        Видалити блок
                                    </button>
                                </div>

                                {block.type === 'h4' && (
                                    <input
                                        type="text"
                                        placeholder="Введіть заголовок..."
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
                                        placeholder="Введіть текст абзацу..."
                                        value={block.value}
                                        onChange={(e) =>
                                            handleBlockTextChange(
                                                block.id,
                                                e.target.value,
                                            )
                                        }
                                        rows={3}
                                    />
                                )}

                                {block.type === 'ul' && (
                                    <div className={classes.listBlockContainer}>
                                        {block.value.map((item, itemIdx) => (
                                            <div
                                                key={itemIdx}
                                                className={classes.listItemRow}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder={`Пункт списку №${itemIdx + 1}`}
                                                    value={item}
                                                    onChange={(e) =>
                                                        handleListItemChange(
                                                            block.id,
                                                            itemIdx,
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeListItem(
                                                            block.id,
                                                            itemIdx,
                                                        )
                                                    }
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className={classes.addListItemBtn}
                                            onClick={() =>
                                                addListItem(block.id)
                                            }
                                        >
                                            + Додати пункт списку
                                        </button>
                                    </div>
                                )}

                                {block.type === 'image' && (
                                    <div
                                        className={classes.imageBlockContainer}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleBlockFileChange(
                                                    block.id,
                                                    e,
                                                )
                                            }
                                        />
                                        {block.file && (
                                            <p
                                                className={
                                                    classes.fileSelectedName
                                                }
                                            >
                                                ✓ Вибрано файл:{' '}
                                                {block.file.name}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <label htmlFor="verification" className={classes.checkboxLabel}>
                    <input
                        type="checkbox"
                        id="verification"
                        checked={verification}
                        onChange={(e) => setVerification(e.target.checked)}
                    />
                    Verified
                </label>

                <button
                    type="submit"
                    className={classes.submitBtn}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding...' : 'Add platform'}
                </button>
            </form>
        </div>
    );
};

export default AdminPlatformAdd;
