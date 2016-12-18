import {h} from 'preact';
import cx from 'classnames';
import styles from '../../util/jss';

const vars = {
    overlay: 'rgba(255, 255, 255, 0.8)',
    padSize: 5,
};

const {classes} = styles({
    channels: {
        maxWidth: 500,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap'
    },
    channel: {
        width: '33.33%',
        cursor: 'pointer',
        padding: vars.padSize,
        position: 'relative',
        '&:hover': {
            background: '#ededed'
        }
    },
    number: {
        position: 'absolute',
        top: vars.padSize,
        left: vars.padSize,
        padding: [0, 5],
        fontSize: 42,
        fontWeight: 'bold',
        width: 48,
        textAlign: 'center'
    },
    numberOnline: {
        background: vars.overlay
    },
    logo: {
        width: '100%'
    },
    logoWrap: {
        fontSize: 0
    },
    logoOffline: {
        opacity: 0.6
    },
    info: {
        position: 'absolute',
        left: vars.padSize,
        bottom: vars.padSize,
        padding: [0, 5],
        right: vars.padSize,
        background: vars.overlay,
        overflow: 'hidden'
    },
    online: {
        width: '0.8em',
        height: '0.8em',
        display: 'inline-block',
        background: '#21de48',
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: '0.5em'
    },
    game: {
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    title: {
        textAlign: 'center'
    },
    line: {
        margin: 0,
        '& + &': {
            marginTop: 5
        }
    }
});

function Channel({channel, tabIndex, onClick}) {
    return <div className={classes.channel} onClick={() => onClick(channel.name)}>
        <div className={cx(classes.number, {[classes.numberOnline]: channel.stream})}>{tabIndex + 1}</div>
        <div className={classes.logoWrap}>
            <img src={channel.logo} alt="logo" className={cx(classes.logo, {[classes.logoOffline]: !channel.stream})} />
        </div>
        <div className={classes.info}>
            <h3 className={cx(classes.line, classes.title)}>
                {channel.stream && <span className={classes.online}></span>}
                {channel.display_name}
            </h3>
            <p className={cx(classes.line, classes.game)}>{channel.game}</p>
        </div>
    </div>
}

export default function Channels({channels, onSelect}) {
    return <div className={classes.channels}>
        {channels.map((channel, index) => <Channel channel={channel} tabIndex={index} onClick={onSelect} />)}
    </div>
}