import React from 'react';
import PropTypes from 'prop-types';
import { useSWRPages } from 'swr';
import useRequest from '../libs/useRequest';

interface IndexList {
    singer: string;
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
    const { singer } = props;

    const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages<number | null, MusicResponse>(
        singer,

        // page component
        ({ offset, withSWR }) => {
            const { data: projects } = withSWR(
                // use the wrapper to wrap the *pagination API SWR*
                useRequest({
                    url: '/music/singer/song/list',
                    params: { singerId: singer, page: offset || 1 }
                })
            );

            // you can still use other SWRs outside
            if (!projects) return <p>loading</p>;

            return projects.data.list.map(project => <p key={project.song_id}>{project.title}</p>);
        },

        // one page's SWR => offset of next page
        ({ data }) => {
            if (data) {
                const nextPage = data.data.page + 1;
                if (nextPage > data.data.totalPage) return null;
                return nextPage;
            }
            return null;
        },

        // deps of the page component
        []
    );
    // console.log(page.current);
    return (
        <div>
            {pages}
            <button type="button" onClick={loadMore} disabled={isReachingEnd || isLoadingMore}>
                {/* eslint-disable-next-line no-nested-ternary */}
                {isLoadingMore ? '. . .' : isReachingEnd ? 'no more data' : 'load more'}
            </button>
        </div>
    );
};

IndexList.propTypes = {
    singer: PropTypes.string.isRequired
};

export default React.memo(IndexList);
