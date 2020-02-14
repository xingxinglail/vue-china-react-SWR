import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import qs from 'query-string';
import classnames from 'classnames';
import styles from './Index.scss';
import IndexList from '../../components/IndexList/IndexList';

const Index: React.FC = () => {
    const { search } = useLocation();
    const parseSearch = qs.parse(search);
    const currentTab: string = Array.isArray(parseSearch) ? parseSearch[0] : parseSearch?.tab || 'all';
    const tabs = React.useRef([
        {
            key: 'all',
            label: '全部',
            top: 0
        },
        {
            key: 'good',
            label: '精华',
            top: 0
        },
        {
            key: 'weex',
            label: 'weex',
            top: 0
        },
        {
            key: 'share',
            label: '分享',
            top: 0
        },
        {
            key: 'ask',
            label: '问答',
            top: 0
        },
        {
            key: 'job',
            label: '招聘',
            top: 0
        }
    ]);
    React.useEffect(() => {
        const tab = tabs.current.find(c => c.key === currentTab);
        const doc = document.scrollingElement;
        if (tab && doc) doc.scrollTop = tab.top;
    }, [currentTab]);

    const setTop = () => {
        const tab = tabs.current.find(c => c.key === currentTab);
        if (tab) tab.top = document.scrollingElement?.scrollTop || 0;
    };

    return (
        <div className={styles.index}>
            <div className={styles.nav}>
                {tabs.current.map(tab => (
                    <Link
                        key={tab.key}
                        className={classnames(styles.tab, { [styles.selected]: tab.key === currentTab })}
                        to={`/?tab=${tab.key}`}
                        onClick={setTop}
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>
            {tabs.current.map(tab => tab.key === currentTab && <IndexList key={tab.key} tab={tab.key} />)}
        </div>
    );
};

export default Index;
