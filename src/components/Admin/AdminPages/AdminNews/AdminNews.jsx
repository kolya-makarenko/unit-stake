import { useState, useEffect } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    ID,
    TABLE_ID_NEWS,
    TABLE_ID_CATEGORIES,
    BUCKET_ID,
    storage,
    Query,
} from '../../../../lib/appwrite';
import classes from './AdminNews.module.css';

import plusIcon from '../../../../assets/images/icons/plus.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';
import upLoadIcon from '../../../../assets/images/icons/upload.svg';
import imageIcon from '../../../../assets/images/icons/imageIcon.svg';
import editIcon from '../../../../assets/images/icons/edit.svg';

const ITEMS_PER_PAGE = 25;

const AdminNews = () => {
    const [newsList, setNewsList] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isPublished, setIsPublished] = useState(false);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingNewsId, setEditingNewsId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_CATEGORIES,
            });
            if (response.rows && response.rows.length > 0) {
                setCategoriesList(response.rows[0].news_categories || []);
            }
        } catch (error) {
            console.error('Error loading news categories:', error.message);
        }
    };

    const fetchNews = async () => {
        try {
            setIsLoading(true);
            const offset = (currentPage - 1) * ITEMS_PER_PAGE;

            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_NEWS,
                queries: [
                    Query.orderDesc('$createdAt'),
                    Query.limit(ITEMS_PER_PAGE),
                    Query.offset(offset),
                ],
            });
            setNewsList(response.rows || []);
            setTotalCount(response.total);
        } catch (error) {
            console.error('Error loading news:', error.message);
            alert('Unable to load the news list.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const addContentBlock = (type) => {
        const newBlock = {
            id: ID.unique(),
            type: type,
            value: '',
        };
        setContentBlocks([...contentBlocks, newBlock]);
    };

    const handleBlockChange = (id, value) => {
        setContentBlocks(
            contentBlocks.map((block) =>
                block.id === id ? { ...block, value: value } : block,
            ),
        );
    };

    const removeContentBlock = (id) => {
        setContentBlocks(contentBlocks.filter((block) => block.id !== id));
    };

    const handleAddClick = () => {
        setTitle('');
        setDescription('');
        setAuthor('');
        setCategory('');
        setImageUrl('');
        setImageFile(null);
        setContentBlocks([]);
        setIsPublished(false);
        setEditingNewsId(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (newsItem) => {
        setTitle(newsItem.title || '');
        setDescription(newsItem.description || '');
        setAuthor(newsItem.author || '');
        setCategory(newsItem.category || '');
        setImageUrl(newsItem.image_url || '');
        setImageFile(null);
        setIsPublished(newsItem.is_published || false);
        setEditingNewsId(newsItem.$id);

        if (newsItem.content_blocks && newsItem.content_blocks.length) {
            const parsedBlocks = newsItem.content_blocks.map((blockStr) => {
                const block = JSON.parse(blockStr);
                return {
                    id: ID.unique(),
                    type: block.type,
                    value: block.value,
                };
            });
            setContentBlocks(parsedBlocks);
        } else {
            setContentBlocks([]);
        }

        setIsFormOpen(true);
    };

    const handleDeleteClick = async (newsId) => {
        if (!window.confirm('Are you sure you want to delete this post?'))
            return;

        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_NEWS,
                rowId: newsId,
            });
            alert('The post has been successfully deleted!');
            setTotalCount((prev) => Math.max(0, prev - 1));
            fetchNews();
        } catch (error) {
            console.error('Error deleting news:', error);
            alert('Error deleting news.');
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingNewsId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

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

            const stringifiedBlocks = contentBlocks.map((block) =>
                JSON.stringify({
                    type: block.type,
                    value: block.value,
                }),
            );

            const data = {
                title: title,
                description: description,
                author: author,
                category: category,
                image_url: finalImageUrl,
                content_blocks: stringifiedBlocks,
                is_published: isPublished,
            };

            if (editingNewsId) {
                await tablesDB.updateRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    rowId: editingNewsId,
                    data: data,
                });
                alert('The news item has been successfully updated!');
            } else {
                await tablesDB.createRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    rowId: ID.unique(),
                    data: data,
                });
                alert('The post has been successfully added!');
            }

            setIsFormOpen(false);
            fetchNews();
        } catch (error) {
            console.error('Error saving news:', error);
            alert(`Error saving news: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (isLoading) {
        return (
            <div className={classes.adminPage}>
                <h3>Loading news...</h3>
            </div>
        );
    }

    return (
        <div className={classes.adminPage}>
            {isFormOpen ? (
                <div className={classes.AdminHeader}>
                    <h2>{editingNewsId ? 'Edit Article' : 'Add Article'}</h2>
                    <button onClick={handleCancel}>Back to News</button>
                </div>
            ) : (
                <div className={classes.AdminHeader}>
                    <h2>News & Articles</h2>
                    <button onClick={handleAddClick}>
                        <img src={plusIcon} alt="plus" />
                        Add Article
                    </button>
                </div>
            )}

            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className={classes.addPlatformForm}
                >
                    <h3 className={classes.addPlatformFormHeader}>
                        Article title and other details
                    </h3>

                    <div className={classes.addPlatformFormIdentity}>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="newsTitle">Article Title</label>
                            <input
                                type="text"
                                id="newsTitle"
                                placeholder="e.g. Bitcoin Hits New All-Time High"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="newsDescription">
                                Article Description
                            </label>
                            <input
                                type="text"
                                id="newsDescription"
                                placeholder="Description of the article..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="newsAuthor">Author Name</label>
                            <input
                                type="text"
                                id="newsAuthor"
                                placeholder="e.g. Alex Shmidt"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>

                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="newsCategory">
                                Article Category
                            </label>
                            <select
                                id="newsCategory"
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
                            <p>Cover Image</p>
                            <label htmlFor="newsImage">
                                {imageFile || imageUrl ? (
                                    <div
                                        className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                    >
                                        <img src={imageIcon} alt="upload" />
                                        <span>
                                            {imageFile
                                                ? imageFile.name
                                                : 'Current Cover (Uploaded)'}
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
                                id="newsImage"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className={classes.addPlatformFormContent}>
                        <h3 className={classes.addPlatformFormHeader}>
                            Article Content Builder
                        </h3>
                        <div className={classes.addPlatformFormContentBlocks}>
                            <div className={classes.addPlatformFormBlocksList}>
                                {contentBlocks.map((block, index) => (
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
                                            <span>Block {index + 1}</span>
                                            <button
                                                type="button"
                                                className={
                                                    classes.deleteBlockBtn
                                                }
                                                onClick={() =>
                                                    removeContentBlock(block.id)
                                                }
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="Delete"
                                                />
                                            </button>
                                        </div>

                                        <div>
                                            {block.type === 'heading' ? (
                                                <input
                                                    type="text"
                                                    placeholder="Enter section heading..."
                                                    className={
                                                        classes.addPlatformFormBlocksListItemInputTitle
                                                    }
                                                    value={block.value}
                                                    onChange={(e) =>
                                                        handleBlockChange(
                                                            block.id,
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            ) : (
                                                <textarea
                                                    placeholder="Enter text..."
                                                    className={
                                                        classes.addPlatformFormBlocksListItemInputTitle
                                                    }
                                                    value={block.value}
                                                    onChange={(e) =>
                                                        handleBlockChange(
                                                            block.id,
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={6}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className={classes.addPlatformFormBlockButtons}
                            >
                                <button
                                    type="button"
                                    onClick={() => addContentBlock('heading')}
                                >
                                    + Add Heading
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addContentBlock('text')}
                                >
                                    + Add Text
                                </button>
                            </div>
                        </div>
                    </div>

                    <h3
                        className={`${classes.addPlatformFormHeader} ${classes.marginTop20}`}
                    >
                        Visibility & Status
                    </h3>
                    <div className={classes.addPlatformFormSwitches}>
                        <div
                            className={classes.addPlatformFormSwitchesContainer}
                        >
                            <div className={classes.addPlatformFormSwitchesBox}>
                                <div>
                                    <h6>Published</h6>
                                    <p>
                                        Show the article on the main news feed
                                    </p>
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
                    <div>
                        <button
                            type="submit"
                            className={classes.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Article'}
                        </button>
                    </div>
                </form>
            )}

            {!isFormOpen && (
                <div className={classes.adminPartners}>
                    <h3>Articles List</h3>
                    <div className={classes.adminNewsContaner}>
                        {newsList.length === 0 ? (
                            <p className={classes.addPlatformFormHeader}>
                                There are no news items or articles
                            </p>
                        ) : (
                            <div className={classes.adminNewsGrid}>
                                <div className={classes.adminNewsGridHeader}>
                                    <div
                                        className={
                                            classes.adminNewsGridHeaderItem
                                        }
                                    >
                                        Title
                                    </div>
                                    <div
                                        className={
                                            classes.adminNewsGridHeaderItem
                                        }
                                    >
                                        Author
                                    </div>
                                    <div
                                        className={
                                            classes.adminNewsGridHeaderItem
                                        }
                                    >
                                        Published
                                    </div>
                                    <div
                                        className={
                                            classes.adminNewsGridHeaderItem
                                        }
                                    >
                                        Date
                                    </div>
                                    <div
                                        className={
                                            classes.adminNewsGridHeaderItem
                                        }
                                    >
                                        Actions
                                    </div>
                                </div>
                                {newsList.map((newsItem) => (
                                    <div
                                        key={newsItem.$id}
                                        className={classes.adminNewsGridItem}
                                    >
                                        <h4>{newsItem.title}</h4>
                                        <h5>
                                            {newsItem.author || 'Anonymous'}
                                        </h5>
                                        {newsItem.is_published ? (
                                            <div
                                                className={
                                                    classes.adminNewsGridItemPublished
                                                }
                                            >
                                                Published
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    classes.adminNewsGridItemNotPublished
                                                }
                                            >
                                                Draft
                                            </div>
                                        )}
                                        <h5>
                                            {dateFormatter(newsItem.$createdAt)}
                                        </h5>
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
                                                    handleEditClick(newsItem)
                                                }
                                            >
                                                <img
                                                    src={editIcon}
                                                    alt="edit"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                className={
                                                    classes.adminPartnersListItemDelete
                                                }
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        newsItem.$id,
                                                    )
                                                }
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="Delete"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {totalPages > 1 && (
                            <div className={classes.adminMailsPagination}>
                                <h4
                                    className={classes.adminMailsPaginationInfo}
                                >
                                    Showing {currentPage} of {totalPages} news
                                </h4>
                                <div
                                    className={classes.adminMailsPaginationBtns}
                                >
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className={
                                            classes.adminMailsPaginationBtnPrev
                                        }
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.25 10.5L8.75 7L5.25 3.5"
                                                stroke="#808080"
                                                strokeWidth="1.16667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => {
                                            const pageNumber = index + 1;
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            pageNumber,
                                                        )
                                                    }
                                                    className={`${classes.adminMailsPaginationBtnNumber} ${
                                                        currentPage ===
                                                        pageNumber
                                                            ? classes.active
                                                            : ''
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        },
                                    )}
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className={
                                            classes.adminMailsPaginationBtnNext
                                        }
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.25 10.5L8.75 7L5.25 3.5"
                                                stroke="#808080"
                                                strokeWidth="1.16667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNews;
