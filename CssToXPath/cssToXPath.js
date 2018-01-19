'use strict';

 function cssToXPath(css) {
    if (css === "") return "";
    let i = 0;
    let start;
    let result = "//";
    let length = css.length;
    while (i < length) {
        let symbol = css[i];
        if (symbol.match(/[a-z]/)) {
            start = i;
            while (i < length && css[i].match(/[a-z]/)) {
                i++;
            }
            if (i === length)
                return result + css.substr(start);
            result += css.substring(start, i);
            continue;
        }
        if (symbol === ' ') {
            result += "//"; i++;
            continue;
        }
        if (symbol.match(/[\.#\[]/)) {
            let attributes = [];
            while (i < length && css[i] !== " ") {
                switch (css[i]) {
                    case ".":
                        i++; start = i+1;
                        while (i < length && css[i].match(/[a-z0-9A-Z0-9:\-_\.]/)) i++;
                        attributes.push(i === length
                            ? convertToClass(css.substr(1))
                            : convertToClass(css.substring(start, i)));
                        break;                    
                    case "#":
                        i++; start = i;
                        while (i < length && css[i].match(/[a-z0-9A-Z0-9:\-_\.]/)) i++;
                        attributes.push(i === length
                            ? convertToId(css.substr(1))
                            : convertToId(css.substring(start, i)));
                        break;
                    case "[":
                        i++;
                        let attribute = "@";
                        while (i < length && css[i] !== '=') {
                            attribute += css[i];
                            i++;
                        }
                        attribute += "="; i++;
                        if (css[i] !== "'") attribute += "'";
                        while (i < length && css[i] !== ']') {
                            attribute += css[i];
                            i++;
                        }
                        if (i === length) return "Incorrect Css. No ']' symbol for '['";
                        if (attribute.slice(-1) !== "'") attribute += "'";
                        attributes.push(attribute);
                        break;
                    default: return `Can't process Css. Unexpected symbol ${css[i-1]} in attributes`;
                }
                i++;
            }
            if (result.slice(-1) === '/') result += "*";
            result += `[${attributes.join(" and ")}]`;
            continue;
        }
        return `Can't process Css. Unexpected symbol '${symbol}'`;
    }
    return result;

    function convertToClass(value) {
        return `contains(@class,'${value}')`;
    }
    function convertToId(value) {
        return convertToAtribute("id", value);
    }
    function convertToAtribute(attr, value) {
        return `@${attr}='${value}'`;
    }
}

 module.exports = cssToXPath;
