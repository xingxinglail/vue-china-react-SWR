import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import qs from 'query-string';
import classnames from 'classnames';
import styles from './Index.scss';
import IndexList from '../../components/IndexList';

const Index: React.FC = () => {
    const { search } = useLocation();
    const parseSearch = qs.parse(search);
    const currentSinger: string = Array.isArray(parseSearch) ? parseSearch[0] : parseSearch?.singer || '7994';
    const singers = [
        {
            id: '7994',
            label: '周杰伦'
        },
        {
            id: '9319',
            label: 'Taylor Swift'
        },
        {
            id: '83594',
            label: 'Linkin Park'
        },
        {
            id: '1632',
            label: 'Blue'
        }
    ];

    return (
        <div className={styles.index}>
            <div className={styles.nav}>
                {singers.map(singer => (
                    <Link
                        key={singer.id}
                        className={classnames(styles.tab, { [styles.selected]: singer.id === currentSinger })}
                        to={`/?singer=${singer.id}`}
                    >
                        {singer.label}
                    </Link>
                ))}
            </div>
            <div>
                {singers.map(singer => singer.id === currentSinger && <IndexList key={singer.id} singer={singer.id} />)}
            </div>
        </div>
    );
};

export default Index;
