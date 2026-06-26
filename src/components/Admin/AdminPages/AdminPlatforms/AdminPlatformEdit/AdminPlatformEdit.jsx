import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
    TABLE_ID_CATEGORIES,
    ID,
    storage,
    BUCKET_ID,
} from '../../../../../lib/appwrite';
import classes from './AdminPlatformEdit.module.css';

import upLoadIcon from '../../../../../assets/images/icons/upload.svg';
import imageIcon from '../../../../../assets/images/icons/imageIcon.svg';
import deleteIcon from '../../../../../assets/images/icons/delete.svg';
import removeIcon from '../../../../../assets/images/icons/remove.svg';

const AdminPlatformEdit = () => {
    const { id: platformId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    const [categoriesList, setCategoriesList] = useState([]);
    const [typesList, setTypesList] = useState([]);
    const [investorTypesList, setInvestorTypesList] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedInvestorTypes, setSelectedInvestorTypes] = useState([]);

    const [assets, setAssets] = useState(0);
    const [platformAge, setPlatformAge] = useState('');
    const [totalProjects, setTotalProjects] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [platformWebsite, setPlatformWebsite] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    const [textBlocks, setTextBlocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_CATEGORIES,
                });
                const row = response.rows[0] || {};
                setCategoriesList(row.platform_categories || []);
                setTypesList(row.types || []);
                setInvestorTypesList(row.project_filters || []);
            } catch (error) {
                console.error('Error loading categories:', error.message);
                alert('Failed to load categories data.');
            }
        };

        const fetchPlatformData = async () => {
            try {
                const data = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    rowId: platformId,
                });

                setName(data.name || '');
                setDescription(data.description || '');
                setIsPublished(data.is_published || false);
                setAssets(data.assets || 0);
                setPlatformAge(data.platform_age || '');
                setTotalProjects(data.total_projects || '');
                setPlatformWebsite(data.platform_website || '');
                setCurrentImageUrl(data.image_url || '');

                setSelectedCategories(data.category || []);
                setSelectedTypes(data.filters || []);
                setSelectedInvestorTypes(data.investor_type || []);

                if (data.jurisdiction) {
                    setJurisdiction(
                        Array.isArray(data.jurisdiction)
                            ? data.jurisdiction.join(', ')
                            : data.jurisdiction,
                    );
                } else {
                    setJurisdiction('');
                }

                if (data.text_blocks && data.text_blocks.length) {
                    const parsedBlocks = data.text_blocks.map((blockStr) => {
                        const block = JSON.parse(blockStr);
                        return {
                            id: ID.unique(),
                            type: block.type,
                            value: block.value,
                            file: null,
                            existingUrl:
                                block.type === 'image' ? block.value : null,
                        };
                    });
                    setTextBlocks(parsedBlocks);
                }
            } catch (error) {
                console.error('Error fetching platform data:', error);
                alert('Failed to load platform data.');
                navigate('/admin/platforms');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
        fetchPlatformData();
    }, [platformId, navigate]);

    const handleCategoryChange = (cat) => {
        setSelectedCategories((prev) =>
            prev.includes(cat)
                ? prev.filter((item) => item !== cat)
                : [...prev, cat],
        );
    };

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type],
        );
    };

    const handleInvestorTypeChange = (type) => {
        setSelectedInvestorTypes((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type],
        );
    };

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
            existingUrl: null,
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
                              existingUrl: null,
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

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const updatedBlocks = [...textBlocks];
        const draggedBlock = updatedBlocks[draggedIndex];

        updatedBlocks.splice(draggedIndex, 1);
        updatedBlocks.splice(index, 0, draggedBlock);

        setDraggedIndex(index);
        setTextBlocks(updatedBlocks);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        setIsSubmitting(true);

        try {
            let imageUrl = currentImageUrl;
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
                            JSON.stringify({
                                type: 'image',
                                value: block.existingUrl || block.value || '',
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

            const jurisdictionArray = jurisdiction
                ? jurisdiction
                      .split(',')
                      .map((item) => item.trim())
                      .filter((item) => item !== '')
                : [];

            const data = {
                name: name,
                description: description,
                is_published: isPublished,
                category: selectedCategories,
                image_url: imageUrl,
                text_blocks: serializedBlocks,
                assets: assets ? Number(assets) : 0,
                platform_age: platformAge,
                total_projects: totalProjects,
                jurisdiction: jurisdictionArray,
                platform_website: platformWebsite,
                filters: selectedTypes,
                investor_type: selectedInvestorTypes,
            };

            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
                rowId: platformId,
                data: data,
            });

            alert('Platform updated successfully!');
            navigate('/admin/platforms');
        } catch (error) {
            console.error('Error updating platform:', error);
            alert(`Failed to update platform: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderBlockContent = (block) => {
        switch (block.type) {
            case 'h4':
                return <h6>Section Title</h6>;
            case 'h5':
                return <h6>Subtitle</h6>;
            case 'b':
                return <h6>Bold Text</h6>;
            case 'p':
                return <h6>Body Text</h6>;
            case 'ul':
                return <h6>List block</h6>;
            case 'image':
                return <h6>Image</h6>;
            default:
                return <h6>Block</h6>;
        }
    };

    if (isLoading) {
        return (
            <div className={classes.adminPage}>
                <h3>Loading platform data...</h3>
            </div>
        );
    }

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Edit Platform</h2>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="platformDescription">Description</label>
                        <input
                            type="text"
                            id="platformDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div
                        className={`${classes.addPlatformFormIdentityField} ${classes.investorTypeListBox}`}
                    >
                        <label>Asset Type</label>
                        <div className={classes.investorTypeList}>
                            {categoriesList.map((cat) => (
                                <label
                                    key={cat}
                                    className={classes.investorType}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                            cat,
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(cat)
                                        }
                                    />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`${classes.addPlatformFormIdentityField} ${classes.investorTypeListBox}`}
                    >
                        <label>Types</label>
                        <div className={classes.investorTypeList}>
                            {typesList.map((type) => (
                                <label
                                    key={type}
                                    className={classes.investorType}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => handleTypeChange(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`${classes.addPlatformFormIdentityField} ${classes.investorTypeListBox}`}
                    >
                        <label>Investor Type</label>
                        <div className={classes.investorTypeList}>
                            {investorTypesList.map((type) => (
                                <label
                                    key={type}
                                    className={classes.investorType}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedInvestorTypes.includes(
                                            type,
                                        )}
                                        onChange={() =>
                                            handleInvestorTypeChange(type)
                                        }
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="assets">
                            Total Tokenized Asset Volume
                        </label>
                        <input
                            type="number"
                            id="assets"
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
                            placeholder="e.g. UA, US, United Kingdom"
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
                            ) : currentImageUrl ? (
                                <div
                                    className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                >
                                    <img src={imageIcon} alt="logo" />
                                    <span>Current Logo Attached</span>
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
                    <div className={classes.addPlatformFormContentBlocks}>
                        <div className={classes.addPlatformFormBlocksList}>
                            {textBlocks.map((block, index) => (
                                <div
                                    key={block.id}
                                    className={`${classes.addPlatformFormBlocksListItem} ${classes[block.type]} ${
                                        draggedIndex === index
                                            ? classes.dragging
                                            : ''
                                    }`}
                                    draggable={
                                        draggedIndex === index || undefined
                                    }
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragEnd={handleDragEnd}
                                >
                                    <div
                                        className={
                                            classes.addPlatformFormBlocksListItemHeader
                                        }
                                        onMouseDown={(e) => {
                                            if (
                                                e.target.tagName !== 'BUTTON' &&
                                                e.target.tagName !== 'IMG'
                                            ) {
                                                setDraggedIndex(index);
                                            }
                                        }}
                                        onDragStart={(e) =>
                                            handleDragStart(e, index)
                                        }
                                    >
                                        <span>
                                            ☰ Block {index + 1}
                                            <strong>
                                                {renderBlockContent(block)}
                                            </strong>
                                        </span>
                                        <button
                                            type="button"
                                            className={classes.deleteBlockBtn}
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
                                            placeholder="Text title"
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
                                    {block.type === 'h5' && (
                                        <input
                                            type="text"
                                            placeholder="Text Subtitle"
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
                                    {block.type === 'b' && (
                                        <input
                                            type="text"
                                            placeholder="Bold Text"
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
                                            placeholder="Write the section content here..."
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
                                            rows={6}
                                        />
                                    )}
                                    {block.type === 'ul' && (
                                        <div
                                            className={
                                                classes.addPlatformFormBlocksListItemLists
                                            }
                                        >
                                            {block.value.map(
                                                (item, itemIdx) => (
                                                    <div
                                                        key={itemIdx}
                                                        className={
                                                            classes.addPlatformFormBlocksListItemListsRow
                                                        }
                                                    >
                                                        <input
                                                            type="text"
                                                            placeholder={`List item ${itemIdx + 1}`}
                                                            className={
                                                                classes.addPlatformFormBlocksListItemInputTitle
                                                            }
                                                            value={item}
                                                            onChange={(e) =>
                                                                handleListItemChange(
                                                                    block.id,
                                                                    itemIdx,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className={
                                                                classes.deleteBlockBtn
                                                            }
                                                            onClick={() =>
                                                                removeListItem(
                                                                    block.id,
                                                                    itemIdx,
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={removeIcon}
                                                                alt="Delete"
                                                            />
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                            <button
                                                type="button"
                                                className={
                                                    classes.addListItemBtn
                                                }
                                                onClick={() =>
                                                    addListItem(block.id)
                                                }
                                            >
                                                + Add List Item
                                            </button>
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
                                                {block.file ? (
                                                    <div
                                                        className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                                    >
                                                        <img
                                                            src={imageIcon}
                                                            alt="upload"
                                                        />
                                                        <span>
                                                            {block.file.name}
                                                        </span>
                                                    </div>
                                                ) : block.existingUrl ? (
                                                    <div
                                                        className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                                    >
                                                        <img
                                                            src={imageIcon}
                                                            alt="upload"
                                                        />
                                                        <span>
                                                            Image Loaded
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
                                                            Select an image
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
                        <div className={classes.addPlatformFormBlockButtons}>
                            <button
                                type="button"
                                onClick={() => addTextBlock('h4')}
                            >
                                + Add Title
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('h5')}
                            >
                                + Add Subtitle
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('b')}
                            >
                                + Add Bold Text
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('p')}
                            >
                                + Add Body Text
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('ul')}
                            >
                                + Add List / Highlights
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('image')}
                            >
                                + Add Image
                            </button>
                        </div>
                    </div>
                </div>
                <h3
                    className={`${classes.addPlatformFormHeader} ${classes.marginTop20}`}
                >
                    Visibility
                </h3>
                <div className={classes.addPlatformFormSwitches}>
                    <div className={classes.addPlatformFormSwitchesContainer}>
                        <div className={classes.addPlatformFormSwitchesBox}>
                            <div>
                                <h6>Published</h6>
                                <p>Show the platform on the platforms page</p>
                            </div>
                            <label htmlFor="isPublished">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={isPublished}
                                    onChange={(e) =>
                                        setIsPublished(e.target.checked)
                                    }
                                />
                                <span></span>
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className={classes.submitBtn}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default AdminPlatformEdit;
