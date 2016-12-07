import {h, Component} from 'preact';
import {createHashHistory} from 'history';
import ChannelsList from '../../components/channels-list';
import Stream from '../../components/stream';
import twitch from '../../util/twitch-client';
import styles from '../../util/jss';

const history = createHashHistory();

function getChannelName(location) {
    return location.pathname.substring(1);
}

const {classes} = styles({
    layout: {
        display: 'flex',
        height: '100vh'
    },
    leftCol: {
        flex: 1,
        overflowY: 'auto'
    },
    rightCol: {
        flex: 2
    }
});

function displayError(error) {
    const element = document.createElement('pre');
    element.textContent = error || JSON.stringify(error);
    element.style.border = '1px solid red';
    element.style.padding = '10px';
    document.body.insertBefore(element, document.body.childNodes[0]);
}

const logsEl = document.createElement('div');
document.body.insertBefore(logsEl, document.body.childNodes[0]);
function log(message) {
    const entry = document.createElement('p');
    entry.textContent = message;
    logsEl.appendChild(entry);
}

window.onerror = (message, file, line) => {
    displayError(`
        ${message}
        ${file}:${line}
    `);
};

export default class IndexPage extends Component {
    state = {};

    onChannelSelect = channelName => {
        history.push({
            pathname: channelName
        })
    };

    componentDidMount() {
        document.addEventListener('keyup', event => log(event.keyCode));
        history.listen(location => {
            this.setActiveStream(getChannelName(location));
        });
        twitch.followedChannels('just_boris').then(response => {
            this.setState({
                follows: response.data.follows.map(({channel}) => channel)
            }, () => {
                this.state.follows.forEach((channel) => this.loadStreamInfo(channel));
                const activeStream = getChannelName(history.location);
                if(activeStream) {
                    this.setActiveStream(activeStream);
                }
            });
        }).catch(error => {
            displayError(error.stack || error);
        });
    }

    loadStreamInfo(channel) {
        const name = channel.name;
        twitch.streamInfo(name).then(response => {
            this.setState({
                follows: this.state.follows.map(channel =>
                    channel.name === name ? ({...channel, stream: response.data.stream}) :channel
                )
            });
        });
    }

    setActiveStream(channelName) {
        this.setState({activeChannel: channelName});
    }

    render(props, {follows, activeChannel}) {
        if(!follows) {
            return <div>Loading...</div>
        }
        return <div className={classes.layout}>
            <div className={classes.leftCol}>
                <ChannelsList channels={follows.sort((a, b) => a.stream ? -1 : b.stream ? 1 : 0)} active={activeChannel} onSelect={this.onChannelSelect} />
            </div>
            {activeChannel && <div className={classes.rightCol}>
                <Stream channel={activeChannel} />
            </div>}
        </div>
    }
}