import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PROJECTS,
    TABLE_ID_CATEGORIES,
    ID,
    storage,
    BUCKET_ID,
} from '../../../../../lib/appwrite';

import classes from './AdminProjectEdit.module.css';

import deleteIcon from '../../../../../assets/images/icons/delete.svg';
import upLoadIcon from '../../../../../assets/images/icons/upload.svg';
import imageIcon from '../../../../../assets/images/icons/imageIcon.svg';
import removeIcon from '../../../../../assets/images/icons/remove.svg';

const AdminProjectEdit = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [minInvestment, setMinInvestment] = useState('');
    const [maxInvestment, setMaxInvestment] = useState('');
    const [fundingGoal, setFundingGoal] = useState('');
    const [currentInvestments, setCurrentInvestments] = useState('');
    const [numberInvestors, setNumberInvestors] = useState('');
    const [deadline, setDeadline] = useState('');
    const [tokenBlocks, setTokenBlocks] = useState([]);
    const [isPublished, setIsPublished] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [textBlocks, setTextBlocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    rowId: projectId,
                });
                const data = response;

                setName(data.name || '');
                setCategory(
                    data.category && data.category.length
                        ? data.category[0]
                        : '',
                );
                setMinInvestment(data.min_investment || '');
                setMaxInvestment(data.max_investment || '');
                setFundingGoal(data.funding_goal || '');
                setCurrentInvestments(data.current_investments || '');
                setNumberInvestors(data.number_investors || '');
                setDeadline(data.deadline || '');
                setIsPublished(data.is_published || false);
                setIsVerified(data.is_verified || false);

                if (data.content_blocks && data.content_blocks.length) {
                    const parsedBlocks = data.content_blocks.map((blockStr) => {
                        const block = JSON.parse(blockStr);
                        return {
                            id: ID.unique(),
                            type: block.type,
                            value: block.value,
                            file: null,
                            existingUrl:
                                block.type === 'image' ||
                                block.type === 'document'
                                    ? block.value
                                    : null,
                        };
                    });
                    setTextBlocks(parsedBlocks);
                }

                if (data.token_addresses && data.token_addresses.length) {
                    const parsedTokens = data.token_addresses.map(
                        (blockStr) => {
                            const block = JSON.parse(blockStr);
                            return {
                                id: ID.unique(),
                                name: block.name || '',
                                address: block.address || '',
                                network: block.network || '',
                                blockchainAddress:
                                    block.blockchainAddress || '',
                            };
                        },
                    );
                    setTokenBlocks(parsedTokens);
                }
            } catch (error) {
                console.error('Error fetching project data:', error);
                alert('Failed to load project data.');
                navigate('/admin/projects');
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_CATEGORIES,
                });
                setCategoriesList(response.rows[0].project_categories);
            } catch (error) {
                console.error('Error loading categories:', error.message);
                alert('Failed to load categories data.');
            }
        };
        fetchCategories();
        fetchProjectData();
    }, [projectId, navigate]);

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

    const renderBlockContent = (block) => {
        switch (block.type) {
            case 'h4':
                return <h6>Section Title</h6>;
            case 'p':
                return <h6>Body Text</h6>;
            case 'ul':
                return <h6>List block</h6>;
            case 'image':
                return <h6>Image</h6>;
            case 'document':
                return <h6>Document</h6>;
            default:
                return null;
        }
    };

    const addTokenBlock = () => {
        const newBlock = {
            id: ID.unique(),
            name: '',
            address: '',
            network: '',
            blockchainAddress: '',
        };
        setTokenBlocks([...tokenBlocks, newBlock]);
    };

    const handleTokenBlockChange = (id, field, value) => {
        setTokenBlocks(
            tokenBlocks.map((block) =>
                block.id === id ? { ...block, [field]: value } : block,
            ),
        );
    };

    const removeTokenBlock = (id) => {
        setTokenBlocks(tokenBlocks.filter((block) => block.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        setIsSubmitting(true);

        try {
            const serializedBlocks = [];

            for (const block of textBlocks) {
                if (block.type === 'image' || block.type === 'document') {
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

            const serializedTokens = tokenBlocks.map((token) =>
                JSON.stringify({
                    name: token.name,
                    address: token.address,
                    network: token.network,
                    blockchainAddress: token.blockchainAddress,
                }),
            );

            const data = {
                name: name,
                category: category ? [category] : [],
                min_investment: minInvestment ? Number(minInvestment) : null,
                max_investment: maxInvestment ? Number(maxInvestment) : null,
                funding_goal: fundingGoal ? Number(fundingGoal) : null,
                current_investments: currentInvestments
                    ? Number(currentInvestments)
                    : null,
                number_investors: numberInvestors
                    ? Number(numberInvestors)
                    : null,
                deadline: deadline || null,
                is_published: isPublished,
                is_verified: isVerified,
                content_blocks: serializedBlocks,
                token_addresses: serializedTokens,
            };

            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PROJECTS,
                rowId: projectId,
                data: data,
            });

            alert('Project updated successfully!');
            navigate('/admin/projects');
        } catch (error) {
            console.error('Error updating project:', error);
            alert(`Failed to update project: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    if (isLoading) {
        return (
            <div className={classes.adminPage}>
                <h3>Loading project data...</h3>
            </div>
        );
    }

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Edit Project</h2>
                <button
                    type="button"
                    onClick={() => navigate('/admin/projects')}
                    disabled={isSubmitting}
                >
                    Back to Projects
                </button>
            </div>
            <form onSubmit={handleSubmit} className={classes.addPlatformForm}>
                <h3 className={classes.addPlatformFormHeader}>
                    Project Identity
                </h3>
                <div className={classes.addPlatformFormIdentity}>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            type="text"
                            id="projectName"
                            placeholder="e.g. NexusFi"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="category">Primary Category</label>
                        <select
                            id="category"
                            className={classes.selectInput}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categoriesList.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="minInvestment">
                            Minimum investment
                        </label>
                        <input
                            type="number"
                            id="minInvestment"
                            placeholder="500"
                            value={minInvestment}
                            onChange={(e) => setMinInvestment(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="maxInvestment">
                            Maximum investment
                        </label>
                        <input
                            type="number"
                            id="maxInvestment"
                            placeholder="75000000"
                            value={maxInvestment}
                            onChange={(e) => setMaxInvestment(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="fundingGoal">Funding goal</label>
                        <input
                            type="number"
                            id="fundingGoal"
                            placeholder="75000000"
                            value={fundingGoal}
                            onChange={(e) => setFundingGoal(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="currentInvestments">
                            Current investments
                        </label>
                        <input
                            type="number"
                            id="currentInvestments"
                            placeholder="50000000"
                            value={currentInvestments}
                            onChange={(e) =>
                                setCurrentInvestments(e.target.value)
                            }
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="numberInvestors">
                            Number of investors
                        </label>
                        <input
                            type="number"
                            id="numberInvestors"
                            placeholder="63"
                            value={numberInvestors}
                            onChange={(e) => setNumberInvestors(e.target.value)}
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            min={getTodayDate()}
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.addPlatformFormContent}>
                    <h3 className={classes.addPlatformFormHeader}>
                        Token addresses
                    </h3>
                    <div className={classes.addPlatformFormContentBlocks}>
                        <div className={classes.addPlatformFormBlocksList}>
                            {tokenBlocks.map((block, index) => (
                                <div
                                    key={block.id}
                                    className={
                                        classes.addPlatformFormBlocksListItem
                                    }
                                >
                                    <div
                                        className={
                                            classes.addPlatformFormBlocksListItemHeader
                                        }
                                    >
                                        <span>Token Structure {index + 1}</span>
                                        <button
                                            type="button"
                                            className={classes.deleteBlockBtn}
                                            onClick={() =>
                                                removeTokenBlock(block.id)
                                            }
                                        >
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                            />
                                        </button>
                                    </div>
                                    <div
                                        className={
                                            classes.addPlatformFormBlocksListItemsAdresses
                                        }
                                    >
                                        <input
                                            type="text"
                                            placeholder="Address Name (e.g. USDT)"
                                            value={block.name}
                                            onChange={(e) =>
                                                handleTokenBlockChange(
                                                    block.id,
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                classes.addPlatformFormBlocksListItemInputTitle
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Address Hash"
                                            value={block.address}
                                            onChange={(e) =>
                                                handleTokenBlockChange(
                                                    block.id,
                                                    'address',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                classes.addPlatformFormBlocksListItemInputTitle
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Network/Blockchain (e.g. ERC-20)"
                                            value={block.network}
                                            onChange={(e) =>
                                                handleTokenBlockChange(
                                                    block.id,
                                                    'network',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                classes.addPlatformFormBlocksListItemInputTitle
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Blockchain Explorer URL"
                                            value={block.blockchainAddress}
                                            onChange={(e) =>
                                                handleTokenBlockChange(
                                                    block.id,
                                                    'blockchainAddress',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                classes.addPlatformFormBlocksListItemInputTitle
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={classes.addPlatformFormBlockButtons}>
                            <button type="button" onClick={addTokenBlock}>
                                + Token address
                            </button>
                        </div>
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
                                            Block {index + 1}
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
                                                htmlFor={`imageBlockEdit-${block.id}`}
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
                                                            Select an image
                                                        </span>
                                                    </div>
                                                )}
                                            </label>
                                            <input
                                                id={`imageBlockEdit-${block.id}`}
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

                                    {block.type === 'document' && (
                                        <div
                                            className={
                                                classes.addPlatformFormIdentityFieldImage
                                            }
                                        >
                                            <label
                                                htmlFor={`documentBlockEdit-${block.id}`}
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
                                                                : 'Current Block Document'}
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
                                                            Select a document
                                                            (PDF)
                                                        </span>
                                                    </div>
                                                )}
                                            </label>
                                            <input
                                                id={`documentBlockEdit-${block.id}`}
                                                type="file"
                                                accept="application/pdf"
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
                                onClick={() => addTextBlock('p')}
                            >
                                + Add Body Text
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('ul')}
                            >
                                + Add List
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('image')}
                            >
                                + Add Image
                            </button>
                            <button
                                type="button"
                                onClick={() => addTextBlock('document')}
                            >
                                + Add Document
                            </button>
                        </div>
                    </div>
                </div>
                <h3
                    className={`${classes.addPlatformFormHeader} ${classes.marginTop20}`}
                >
                    Visibility & Verified
                </h3>
                <div className={classes.addPlatformFormSwitches}>
                    <div className={classes.addPlatformFormSwitchesContainer}>
                        <div className={classes.addPlatformFormSwitchesBox}>
                            <div>
                                <h6>Verified</h6>
                                <p>Mark the project as verified</p>
                            </div>
                            <label htmlFor="isVerified">
                                <input
                                    type="checkbox"
                                    id="isVerified"
                                    checked={isVerified}
                                    onChange={(e) =>
                                        setIsVerified(e.target.checked)
                                    }
                                />
                                <span></span>
                            </label>
                        </div>
                        <div className={classes.addPlatformFormSwitchesBox}>
                            <div>
                                <h6>Published</h6>
                                <p>Show the project on the projects page</p>
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

export default AdminProjectEdit;
