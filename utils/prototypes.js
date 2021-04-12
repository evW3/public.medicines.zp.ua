Array.prototype.toFormat = function (replacement) {
    return this.map(item => Object.fromEntries(Object.entries(item).map(([k, v]) => [k.replace(replacement, ''), v])));
}