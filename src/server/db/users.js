const users = new Map();

function getUser(id) {
    return users.get(id);
}

function verifyUser(id, password) {
    const user = getUser(id);

    if(!user) {
        return false;
    }

    return user.password === password;
}

function createUser(id, password) {
    if(getUser(id)) {
        return false;
    }

    const user = {
        id,
        password,
        victories: 0,
        defeats: 0
    };

    users.set(id, user);
    return true;
}

function deleteAllUsers() {
    users.clear();
}

function deleteUser(id) {
    const user = getUser(id);

    if(!user) {
        throw "Invalid User ID: " + id;
    }

    users.delete(id);
}

function reportEndOfMatch(id, isVictory) {

    const user = getUser(id);
    if(!user) {
        throw "Invalid User ID " + id;
    }

    isVictory ? user.victories++ : user.defeats++;
}

module.exports = {getUser, verifyUser, createUser, deleteAllUsers, reportEndOfMatch};