import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSWRPages } from 'swr';
import useRequest from '../../libs/useRequest';
import styles from './IndexList.scss';

interface IndexList {
    tab: string;
    limit?: number;
}

interface Topic {
    id: string;
    author_id: string;
    tab: string;
    content: string;
    title: string;
    last_reply_at: string;
    good: boolean;
    top: boolean;
    reply_count: number;
    visit_count: number;
    create_at: string;
    author: {
        loginname: string;
        avatar_url: string;
    };
}

const useScrollBottom = (cb: () => void, deps: unknown[] = [], value = 50): void => {
    React.useEffect(() => {
        const doc = document.scrollingElement || { clientHeight: 0, scrollTop: 0, scrollHeight: 0 };
        const h = doc.clientHeight;
        const fn = () => {
            if (doc.scrollTop + h >= doc.scrollHeight - value) cb();
        };
        window.addEventListener('scroll', fn);
        return () => {
            window.removeEventListener('scroll', fn);
        };
    }, deps);
};

const IndexList: React.FC<IndexList> = props => {
    const { tab, limit = 15 } = props;

    const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages<
        number | null,
        { data: Topic[]; page: number }
    >(
        tab,

        // page component
        ({ offset, withSWR }) => {
            const { data: projects } = withSWR(
                // use the wrapper to wrap the *pagination API SWR*
                useRequest(
                    {
                        // url: '/music/tab/song/list',
                        url: '/api/v1/topics',
                        params: { tab, page: offset || 1, limit }
                    },
                    { revalidateOnFocus: false }
                )
            );
            // you can still use other SWRs outside
            if (!projects) return null;

            return projects.data.map(project => (
                <Link className={styles.topic} key={project.id} to={`/topic/${project.id}`}>
                    <img className={styles.avatar} src={project.author.avatar_url} alt="avatar" />
                    <p className={styles.title}>{project.title}</p>
                </Link>
            ));
        },

        // one page's SWR => offset of next page
        ({ data }) => {
            if (data) {
                if (data.data.length < limit) return null;
                return data.page + 1;
            }
            return null;
        },

        // deps of the page component
        []
    );

    useScrollBottom(() => {
        if (isReachingEnd || isLoadingMore) return;
        loadMore();
    }, [isReachingEnd, isLoadingMore]);
    return (
        <div className={styles.indexList}>
            <div className={styles.topicWrapper}>{pages}</div>
            <p>{isLoadingMore ? 'loading. . .' : isReachingEnd ? 'no more data' : 'load more'}</p>
        </div>
    );
};

IndexList.defaultProps = {
    limit: 15
};

IndexList.propTypes = {
    tab: PropTypes.string.isRequired,
    limit: PropTypes.number
};

export default React.memo(IndexList);
