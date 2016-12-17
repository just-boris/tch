import {h, Component} from 'preact';
import styles from '../../util/jss';

const {classes} = styles({
    popup: {
        position: 'fixed',
        zIndex: 1,
        top: 10,
        right: 10,
        border: '1px solid #eee',
        padding: '1em',
        background: '#f1f1f1'
    }
});

export default class KeyLogger extends Component {
    onKeyup = e => {
        this.setState({key: e.keyCode});
        this.props.onKeyPress(e.keyCode);
    };

    componentDidMount() {
        document.addEventListener('keypress', this.onKeyup)
    }

    componentDidUnmount() {
        document.removeEventListener('keypress', this.onKeyup);
    }


    render(props, {key}) {
        if(!key) {
            return null;
        }
        return <div className={classes.popup}>Key pressed {key}</div>;
    }

    static defaultProps = {
        onKeyPress: () => {}
    }
}