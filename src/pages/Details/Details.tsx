import React from 'react';
import { useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import useRequest from '../../libs/useRequest';
import styles from './Details.scss';

const Replies = loadable(() => import('./components/Replies'), {
    fallback: <div>Loading...</div>
});

export interface Replie {
    id: string;
    content: string;
    author: {
        loginname: string;
        avatar_url: string;
    };
}

interface Topic {
    id: string;
    title: string;
    content: string;
    author: {
        loginname: string;
        avatar_url: string;
    };
    replies: Replie[];
}

const Details: React.FC = () => {
    const params = useParams<{ id: string }>();
    const { data, error } = useRequest<{ data: Topic }>(
        {
            url: `/api/v1/topic/${params.id}`
        },
        { revalidateOnFocus: false }
    );
    if (error) return <div>{error.message}</div>;
    if (!data) return <div>Loading...</div>;
    return (
        <div className={styles.details}>
            <p className={styles.title}>{data.data.title}</p>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.data.content }} />
            <Replies data={data.data.replies} />
        </div>
    );
};

export default Details;
