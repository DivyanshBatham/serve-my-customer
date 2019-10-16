const { auth } = require('../config/adminSdk');

export default functions.auth.user().onCreate((user) => {
    const { email } = user;
});