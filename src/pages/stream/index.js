import {h} from 'preact';
import {Link, route} from 'preact-router';
import KeyLogger from '../../components/keylogger';
import styles from '../../util/jss';

const {classes} = styles({
    wrap: {
        padding: [0, 10]
    },
    embed: {
        width: '100%',
        height: '400px'
    },
    close: {
        float: 'right',
        textDecoration: 'none',
        color: '#5778c7'
    }
});

export default function Stream({channel}) {
    function onKeyPress(key) {
        if(key === 48) {
            route('/')
        }
    }
    return <div className={classes.wrap}>
        <KeyLogger onKeyPress={onKeyPress}/>
        <h1>
            <Link href="/" className={classes.close}>Close</Link>
            Stream: {channel}
        </h1>
        <iframe
            className={classes.embed}
            src={`http://player.twitch.tv/?channel=${channel}`}
            frameBorder="0"
            scrolling="no"
            allowFullScreen="true">
        </iframe>
    </div>
}