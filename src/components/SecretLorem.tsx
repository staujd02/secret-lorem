import React from 'react';
import Encoder from './Encoder';
import Decoder from './Decoder';

type State = {
    codedMessage: string
}

export default class SecretLorem extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            codedMessage: ""
        }
    }

    updateCodedMessage = (c: string) => {
        this.setState({ codedMessage: c });
    }

    render() {
        const { codedMessage } = this.state;
        return (
            <>
                <Encoder codedMessage={codedMessage} changeCodeCallback={this.updateCodedMessage} />
                <Decoder codedMessage={codedMessage} />
            </>
        );
    }
}