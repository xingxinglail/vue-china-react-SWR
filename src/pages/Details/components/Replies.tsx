import React from 'react';
import PropTypes from 'prop-types';
import { Replie } from '../Details';
import styles from './Replies.scss';

interface RepliesProps {
    data: Replie[];
}

const Replies: React.FC<RepliesProps> = props => {
    const { data } = props;
    return (
        <div className={styles.repliesWrapper}>
            {data.map(replie => (
                <div className={styles.replie} key={replie.id}>
                    <p>{replie.author.loginname}</p>
                    <div dangerouslySetInnerHTML={{ __html: replie.content }} />
                </div>
            ))}
        </div>
    );
};

Replies.defaultProps = {
    data: []
};

Replies.propTypes = {
    data: PropTypes.array.isRequired
};

export default Replies;
