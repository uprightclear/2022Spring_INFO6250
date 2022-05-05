import React from "react";

const loginContext = React.createContext({
    default: 'Overridden by provider value'
});

export default loginContext;