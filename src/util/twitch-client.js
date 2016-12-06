import axios from 'axios';

class TwitchClient {
    constructor(clientId) {
        this.clientId = clientId;
        this.baseUrl = 'https://api.twitch.tv/kraken'
    }

    _request(params) {
        return axios({
            url: this.baseUrl + params.url,
            headers: {
                'Client-ID': this.clientId
            }
        })
    }

    followedChannels(username) {
        return this._request({url: `/users/${username}/follows/channels`})
    }

    streamInfo(channel) {
        return this._request({url: `/streams/${channel}`})
    }
}


export default new TwitchClient('1hn3vivr4f3l12k5elncnj18b1bmcgx');