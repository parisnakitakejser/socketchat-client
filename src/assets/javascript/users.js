const axios = require('axios');

module.exports = {
    ping (user) {
        return axios.get('http://localhost:2345/ping', {
            params: {
                id: user._id['$oid'],
                user_id: user.user_id
            }
        }).then((reponse) => {
            return {
                'status': 'OK',
                'code': 200
            }
        }).catch((reponse) => {
            return {
                'stauts': 'ERROR',
                'code': 501
            }
        });
    }
};