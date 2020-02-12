import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import qs from 'query-string';
import classnames from 'classnames';
import styles from './Index.scss';
import IndexList from '../../components/IndexList';

const Index: React.FC = () => {
    const { search } = useLocation();
    const parseSearch = qs.parse(search);
    const currentTab: string = Array.isArray(parseSearch) ? parseSearch[0] : parseSearch?.tab || 'all';
    const tabs = [
        {
            key: 'all',
            label: '全部'
        },
        {
            key: 'good',
            label: '精华'
        },
        {
            key: 'weex',
            label: 'weex'
        },
        {
            key: 'share',
            label: '分享'
        },
        {
            key: 'ask',
            label: '问答'
        },
        {
            key: 'job',
            label: '招聘'
        }
    ];
    console.log('Index');
    return (
        <div className={styles.index}>
            <div className={styles.nav}>
                {tabs.map(tab => (
                    <Link
                        key={tab.key}
                        className={classnames(styles.tab, { [styles.selected]: tab.key === currentTab })}
                        to={`/?tab=${tab.key}`}
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>
            <div>{tabs.map(tab => tab.key === currentTab && <IndexList key={tab.key} tab={tab.key} />)}</div>
        </div>
    );
};

export default Index;
