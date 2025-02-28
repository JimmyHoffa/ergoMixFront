import { CUSTOM_TOKEN } from "../const";
import { store } from "../store";
import moment from 'moment/moment';

export const ergWithoutSuffix = value => (value / 1e9);

export const erg = value => {
    const valInErg = ergWithoutSuffix(value)
    return (valInErg === 1) ? "1 ERG" : valInErg + " ERG";
};

const getTokenFromId = tokenId => {
    if(tokenId === undefined){
        tokenId = "";
    }
    const state = store.getState();
    const tokens = state.tokens;
    let resultToken = CUSTOM_TOKEN;
    tokens.forEach(token => {
        if(token.id === tokenId){
            if(tokenId !== '' || token.type !== 'custom') {
                resultToken = token;
            }
        }
    });
    return resultToken;
}

export const tokenName = (tokenId, excludeTokenSuffix = false, token=null) => {
    if(token === null){
        token = getTokenFromId(tokenId);
    }
    if(token.type === 'custom'){
        return tokenId.substr(0, 5) + (excludeTokenSuffix ? "" : " Token");
    }
    return token.name;
}

export const token = (value, tokenId, excludeTokenSuffix=false) => {
    tokenId = tokenId === undefined ? '' : tokenId;
    if(value === ''){
        value = 0
    }
    const resultToken = getTokenFromId(tokenId);
    const res = value / Math.pow(10, resultToken.decimals);
    if(resultToken.type === 'custom'){
        return res + " " + tokenId.substr(0, 5) + (excludeTokenSuffix ? "" : " Token");
    }
    return res + " " + tokenName(tokenId, excludeTokenSuffix, resultToken);
}

export const id = (value, max_printing_str = 5) => {
    if (value.length > max_printing_str) {
        return value.substr(0, max_printing_str) + '...'
    } else {
        return value
    }
}

export const address = value => {
    if (value.length > 10) {
        return value.substr(0, 5) + '...' + value.substr(-5, 5)
    } else {
        return value
    }
};

export const errorMessage = exp => {
    try {
        const data = JSON.parse(exp.response.data)
        return data.message
    } catch (e) {
        try {
            if (exp.response.data.message !== undefined) {
                return exp.response.data.message
            }
            return exp.message
        }catch(exp){
            return e.message;
        }

    }
}

export const capFirst = msg => {
    try {
        return msg.charAt(0).toUpperCase() + msg.substring(1);
    }catch (e) {
        return '';
    }
}

export const dateTime = value => {
    try {
        const valueInt = parseInt(value);
        if(isNaN(valueInt)) return value;
        return moment(new Date(valueInt)).format("yyyy-MM-DD hh:mm");
    }catch (e){
        return value;
    }
}
