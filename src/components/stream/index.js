import {h} from 'preact';
import styles from '../../util/jss';

const {classes} = styles({
    wrap: {
        padding: [0, 10]
    },
    embed: {
        width: '100%',
        height: '400px'
    }
});

export default function Stream({channel}) {
    return <div className={classes.wrap}>
        <h1>Stream</h1>
        <iframe
            className={classes.embed}
            src={`http://player.twitch.tv/?channel=${channel}`}
            frameBorder="0"
            scrolling="no"
            allowFullScreen="true">
        </iframe>
    </div>
}