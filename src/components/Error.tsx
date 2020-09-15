import React from 'react';

type Props = {
    error: string
}

const Error: React.FunctionComponent<Props> = ({ error }) => error ?
    (
        <>
            <label>Error</label>
            <label>{error}</label>
        </>
    ) : null

export default Error;