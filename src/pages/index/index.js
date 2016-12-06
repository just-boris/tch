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

export default class IndexPage extends Component {
    state = {};

    onChannelSelect = channelName => {
        history.push({
            pathname: channelName
        })
    };

    componentDidMount() {
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
                <ChannelsList channels={follows} active={activeChannel} onSelect={this.onChannelSelect} />
            </div>
            <div className={classes.rightCol}>
                <Stream channel={activeChannel} />
            </div>
        </div>
    }
}