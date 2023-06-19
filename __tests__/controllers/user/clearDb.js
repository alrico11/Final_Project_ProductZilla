const User = require('../../../models/user/user')

async function deleteUser() {
    await User.deleteMany({});
}

module.exports = {
    deleteUser
}