
import React from 'react';
import EncoderUtility from '../utils/EncoderUtility';
import Error from './Error';

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement>

type Props = {
    codedMessage: string
    changeCodeCallback: (c: string) => void
}

type State = {
    error: string
    secretMessage: string
    seededLorem: string
}

export default class Encoder extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            error: "",
            secretMessage: "",
            seededLorem: ""
        }
    }

    updateSeededLorem = (e: ChangeEvent) => {
        this.setState({ seededLorem: e.target.value }, this.convert)
    }
    
    updateSecretMessage = (e: ChangeEvent) => {
        this.setState({ secretMessage: e.target.value }, this.convert)
    }

    convert = () => {
        try {
            const { secretMessage, seededLorem } = this.state;
            let codedMessage = EncoderUtility.EncodeMessage(secretMessage, seededLorem);
            this.props.changeCodeCallback(codedMessage);
        } catch (error) {
            this.setState({
                error: error
            });
        }
    }

    render() {
        const { secretMessage, seededLorem, error } = this.state;
        const { codedMessage } = this.props;
        return (
            <div className="encode">
                <label>Secret Message</label>
                <textarea className="message" value={secretMessage} onChange={this.updateSecretMessage}></textarea>
                <label>Lorem Ipsum Seed</label>
                <textarea value={seededLorem} onChange={this.updateSeededLorem}></textarea>
                <label>Coded Message</label>
                <textarea value={codedMessage}></textarea>
                <Error error={error} />
            </div>
        );
    }
}