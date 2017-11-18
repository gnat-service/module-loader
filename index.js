/**
 * Created by leaf4monkey on 11/18/2017
 */

const traverser = require('dir-traverse');

const load = (dir, filter) => {
    const modules = [];
    const handler = ({fullPath}) => modules.push(require(fullPath));
    traverser(dir, {filter, handler});
    return modules;
};

const loader = (dirs, filter) => {
    const fn = dir => load(dir, filter);
    if (Array.isArray(dirs)) {
        return dirs.map(fn);
    }
    const type = typeof dirs;
    if (type === 'string') {
        return fn(dirs);
    }
    if (dirs) {
        const map = {};
        Object.keys(dirs).forEach(name => {
            const dir = dirs[name];
            map[name] = fn(dir);
        });
        return map;
    }

    throw new TypeError(`Expect \`dirs\` to be a string, an array of string or an object, got a(n) ${type}.`);
};

module.exports = loader;
