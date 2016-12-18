import {h, Component} from 'preact';
import {route} from 'preact-router';
import ChannelsList from '../../components/channels-list';
import KeyLogger from '../../components/keylogger';
import twitch from '../../util/twitch-client';

export default class IndexPage extends Component {
    state = {};

    onChannelSelect = channelName => {
        route(`/${channelName}`);
    };

    onKeyPress = key => {
        const {follows} = this.state;
        if(key > 48 && key < 58) {
            const index = key - 49;
            this.onChannelSelect(follows[index].name)
        }
    };

    componentDidMount() {
        twitch.followedChannels('just_boris').then(response => {
            this.setState({
                follows: response.data.follows.map(({channel}) => channel)
            }, () => {
                this.state.follows.forEach((channel) => this.loadStreamInfo(channel));
            });
        }).catch(error => {
            this.setState({error: error.stack || error});
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

    render(props, {follows, error}) {
        if (!follows) {
            return <div>Loading...</div>
        }
        if (error) {
            return <div>{error}</div>
        }
        return <div>
            <KeyLogger onKeyPress={this.onKeyPress}/>
            <ChannelsList channels={follows} onSelect={this.onChannelSelect}/>
        </div>
    }
}