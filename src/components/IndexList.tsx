import React from 'react';
import PropTypes from 'prop-types';
import { useSWRPages } from 'swr';
import useRequest from '../libs/useRequest';

interface IndexList {
    tab: string;
    limit?: number;
}

interface Music {
    language: string;
    publishtime: string;
    pic_big: string;
    pic_small: string;
    country: string;
    lrclink: string;
    file_duration: string;
    si_proxycompany: string;
    song_id: string;
    title: string;
    ting_uid: string;
    author: string;
}

interface MusicResponse {
    code: number;
    msg: string;
    data: {
        page: number;
        totalCount: number;
        totalPage: number;
        limit: number;
        list: Music[];
    };
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

// const IndexList: React.FC<IndexList> = props => {
//     const { tab } = props;
//     const { data } = useRequest<{ data: Topic[] }>({
//         url: 'https://www.vue-js.com/api/v1/topics',
//         params: { tab, page: 1, limit: 10 }
//     });
//     if (!data) return <div>Loading..</div>;
//     return (
//         <div>
//             {
//                 data.data.map(c => (
//                     <p key={ c.id }>{ c.title }</p>
//                 ))
//             }
//         </div>
//     );
// };

const IndexList: React.FC<IndexList> = props => {
    const { tab, limit = 15 } = props;
    console.log(tab);
    const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages<
        number | null,
        { data: Topic[]; page: number }
    >(
        tab,

        // page component
        ({ offset, withSWR }) => {
            const { data: projects } = withSWR(
                // use the wrapper to wrap the *pagination API SWR*
                useRequest({
                    // url: '/music/tab/song/list',
                    url: '/api/v1/topics',
                    params: { tab, page: offset || 1, limit }
                })
            );
            // you can still use other SWRs outside
            if (!projects) return <p>loading</p>;

            return projects.data.map(project => <p key={project.id}>{project.title}</p>);
        },

        // one page's SWR => offset of next page
        ({ data }) => {
            // if (data) {
            //     const nextPage = data.data.page + 1;
            //     if (nextPage > data.data.totalPage) return null;
            //     return nextPage;
            // }
            if (data) {
                if (data.data.length < limit) return null;
                return data.page + 1;
            }
            return null;
        },

        // deps of the page component
        []
    );

    return (
        <div>
            {pages}
            <button type="button" onClick={loadMore} disabled={isReachingEnd || isLoadingMore}>
                {isLoadingMore ? '. . .' : isReachingEnd ? 'no more data' : 'load more'}
            </button>
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
