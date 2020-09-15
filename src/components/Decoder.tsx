
import React from 'react';
import DecoderUtility from '../utils/DecoderUtility';
import Error from './Error';

type Props = {
    codedMessage: string
}

type State = {
    error: string
}

export default class Decoder extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            error: ""
        }
    }

    convert = (codedMessage: string): string => {
        try {
            return DecoderUtility.DecodeMessage(codedMessage);
        } catch (error) {
            this.setState({
                error: error
            });
            return "";
        }
    }

    render() {
        const { error } = this.state;
        const { codedMessage } = this.props;
        let secretMessage = this.convert(codedMessage);
        return (
            <div className="decode">
                <label>Coded Message To Decrypt</label>
                <textarea value={codedMessage}></textarea>
                <label>Embedded Secret Message</label>
                <textarea value={secretMessage}></textarea>
                <Error error={error} />
            </div>
        );
    }
}