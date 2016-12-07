import {h} from 'preact';
import cx from 'classnames';
import styles from '../../util/jss';

const {classes} = styles({
    channel: {
        display: 'flex',
        cursor: 'pointer',
        padding: 10,
        '&:hover': {
            background: '#ededed'
        }
    },
    status: {
        marginTop: 5,
        textAlign: 'center'
    },
    side: {
        paddingRight: 15
    },
    logo: {
        width: 70
    },
    offline: {
        opacity: 0.6
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
        <div className={classes.side}>
            <img src={channel.logo} alt="logo" className={cx(classes.logo, {[classes.offline]: !channel.stream})} />
            {channel.stream && <div className={classes.status}>Online</div>}
        </div>
        <div>
            <h3 className={classes.title}>[{channel.language}] {channel.display_name}</h3>
            <p className={classes.line}>{channel.status}</p>
            <p className={classes.line}>{channel.game}</p>
        </div>
    </div>
}

export default function Channels({channels, active, onSelect}) {
    return <div>
        <h1>Followed channels</h1>
        {channels.map((channel, index) => <Channel channel={channel} tabIndex={index} active={channel.name === active} onClick={onSelect} />)}
    </div>
}