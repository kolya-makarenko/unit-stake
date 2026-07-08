import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_NEWS,
} from '../../../../../lib/appwrite';

import classes from './Article.module.css';

const Article = () => {
    const { id: articleId } = useParams();
    const navigate = useNavigate();

    const [articleData, setArticleData] = useState({});

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    rowId: articleId,
                });
                setArticleData(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching article data:', error);
                alert('Failed to load article data.');
                navigate('/insights');
            }
        };
        fetchArticle();
    }, [articleId, navigate]);

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <main className={classes.articlePage}>
            <section className={classes.article}>
                <div className="wrapper">
                    <div className={classes.articleContainer}>
                        <div className={classes.articleContent}>
                            <div className={classes.articleContentMain}>
                                <p className={classes.articleDate}>
                                    {dateFormatter(articleData.$updatedAt)}
                                </p>
                                <h2>{articleData.title}</h2>
                                <h3>{articleData.description}</h3>
                                <div className={classes.articleAuthorShare}>
                                    <div className={classes.articleAuthor}>
                                        {articleData.author}
                                    </div>
                                    <div className={classes.articleShare}></div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.articleTable}></div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Article;
