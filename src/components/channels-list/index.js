import {h} from 'preact';
import cx from 'classnames';
import styles from '../../util/jss';

const {classes} = styles({
    channel: {
        padding: 10,
        '&:hover': {
            background: '#ededed'
        }
    },
    active: {
        background: '#f1f1f1'
    },
    title: {
        margin: 0,
        marginBottom: '1em'
    },
    line: {
        margin: 0,
        marginBottom: 10
    }
});

function Channel({channel, tabIndex, active, onClick}) {
    return <div className={cx(classes.channel, {[classes.active]: active})} tabIndex={tabIndex} onClick={() => onClick(channel.name)}>
        <h3 className={classes.title}>[{channel.language}] {channel.display_name}</h3>
        <p className={classes.line}>{channel.status}</p>
        <p className={classes.line}>{channel.game}</p>
        <p className={classes.line}>Streaming: {channel.stream ? 'yes' : 'no'}</p>
    </div>
}

export default function Channels({channels, active, onSelect}) {
    return <div>
        <h1>Followed channels</h1>
        {channels.map((channel, index) => <Channel channel={channel} tabIndex={index} active={channel.name === active} onClick={onSelect} />)}
    </div>
}