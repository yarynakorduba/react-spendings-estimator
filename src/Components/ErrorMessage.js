export const DateErrorMessage = ({validity}) => {
    return (
        <div className="error-msg" style={validity ? { opacity: 0 } : { opacity: 1 }}>
            Date should be in the past
        </div>
    );
};

export const AmountErrorMessage = ({validity}) => {
    return (
        <div className="error-msg" style={validity ? { opacity: 0 } : { opacity: 1 }}>
            Amount should be greater than 0
        </div>
    );
};
