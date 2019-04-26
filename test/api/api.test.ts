import * as mocha from 'mocha';

import * as chai from 'chai';

import chaiHttp = require('chai-http');

import app from '../../src/app';

import * as config from "../../src/configs/config";

chai.use(chaiHttp);

const expect = chai.expect;

let authorizedUser;

let createdAdmin;

let createdGroup;

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
describe('POST api/v1/auth/login', () => {

    it('responds with JSON object and must contains sid, user_id and not contains password, private_key', async () => {

        return chai.request(app).post('/auth/login')
            .send({

                "email": config.app.default_user.email,

                "password": config.app.default_user.password,

            })
            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('email');

                expect(res.body.result).to.have.property('sid');

                expect(res.body.result).to.have.property('token');

                expect(res.body.result).to.not.have.property('password');

                expect(res.body.result).to.not.have.property('private_key');

                authorizedUser = res.body.result;

            });
    });

});

describe('GET api/v1/auth/check', () => {

    it('Wrong data invalid sid in headers', async () => {

        return chai.request(app).get('/auth/check')

            .set('X-AUTH-SID', '27bdbgd431111111111111107b0e5a1f')

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(403);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(false);

                expect(res.body.status).to.eql(false);

                expect(res.body.error).to.have.property('type');

                expect(res.body.error).to.have.property('message');

            });
    });

    it('Wrong data invalid token in headers', async () => {

        return chai.request(app).get('/auth/check')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', '63ff51111111111111111111111111abd0875ab')

            .then(res => {

                expect(res.status).to.eql(403);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(false);

                expect(res.body.status).to.eql(false);

                expect(res.body.error).to.have.property('type');

                expect(res.body.error).to.have.property('message');

            });
    });

    it('responds with JSON object must not contains token, private_key, password', async () => {

        return chai.request(app).get('/auth/check')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('email');

                expect(res.body.result.email).to.eql(authorizedUser.email);

                expect(res.body.result).to.have.property('sid');

                expect(res.body.result.sid).to.eql(authorizedUser.sid);

                expect(res.body.result).to.have.property('group');

                expect(res.body.result).to.not.have.property('token');

                expect(res.body.result).to.not.have.property('private_key');

                expect(res.body.result).to.not.have.property('password');

            });
    });

});


describe('POST api/v1/group', () => {

    it('responds with JSON object must contain access with default `no` values', async () => {

        return chai.request(app).post('/group')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .send({

                "name": "api-test"

            })
            .then(res => {

                expect(res.status).to.eql(201);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('name');

                expect(res.body.result.name).to.eql("api-test");

                expect(res.body.result).to.have.property('access');

                expect(res.body.result.access).to.have.property('system');

                expect(res.body.result.access.system).to.have.property('fields');

                expect(res.body.result.access.system.fields).to.have.property('users');

                expect(res.body.result.access.system.fields.users).to.have.property('value');

                expect(res.body.result.access.system.fields.users.value).to.eql("no");

                expect(res.body.result.access.system.fields).to.have.property('groups');

                expect(res.body.result.access.system.fields.groups).to.have.property('value');

                expect(res.body.result.access.system.fields.groups.value).to.eql("no");

                createdGroup = res.body.result;

            });
    });

});

describe('PUT api/v1/group/{_id}', () => {

    it('responds with JSON object must contain changed values', async () => {

        return chai.request(app).put('/group/'+createdGroup._id)

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .send({

                "name": "api-test-updated"

            })
            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('name');

                expect(res.body.result.name).to.eql("api-test-updated");

                expect(res.body.result).to.have.property('access');

                createdGroup = res.body.result;

            });
    });

});

describe('GET api/v1/groups', () => {

    it('responds with JSON array group objects and contain created group too', async () => {

        return chai.request(app).get('/groups')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.be.an('array');

                expect(res.body.result[0]).to.have.property('name');

                expect(res.body.result[0]).to.have.property('access');

            });
    });

});


describe('GET api/v1/group/{_id}', () => {

    it('responds with JSON group object', async () => {

        return chai.request(app).get('/group/'+createdGroup._id)

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('name');

                expect(res.body.result).to.have.property('access');

                expect(res.body.result.name).to.eql("api-test-updated");

            });
    });

});


describe('POST api/v1/user', () => {

    it('Wrong data invalid email', async () => {

        return chai.request(app).post('/user')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .send({

                "email": "api-test.example.com"

            })
            .then(res => {

                expect(res.status).to.eql(500);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(false);

                expect(res.body.status).to.eql(false);

                expect(res.body.error).to.have.property('type');

                expect(res.body.error).to.have.property('message');

            });
    });

    it('responds with JSON object must not contains token, private_key, password', async () => {

        return chai.request(app).post('/user')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .send({

                "first_name": "api-test",

                "email": "api-test@example.com",

                "group": createdGroup._id,

                "private_key": "101010101010100110111010",

                "token": "010101110011000111001010",

            })
            .then(res => {

                expect(res.status).to.eql(201);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('sid');

                expect(res.body.result).to.have.property('email');

                expect(res.body.result.email).to.eql("api-test@example.com");

                expect(res.body.result).to.have.property('first_name');

                expect(res.body.result.first_name).to.eql("api-test");

                expect(res.body.result).to.have.property('group');

                expect(res.body.result).to.not.have.property('token');

                expect(res.body.result).to.not.have.property('private_key');

                expect(res.body.result).to.not.have.property('password');

                createdAdmin = res.body.result;

            });
    });

});

describe('PUT api/v1/user/{_id}', () => {

    it('Wrong data invalid group', async () => {

        return chai.request(app).post('/user')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .send({

                "email": "api-test@example.com",

                "group": "5cc2bf01111111111b8375ab"

            })
            .then(res => {

                expect(res.status).to.eql(500);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(false);

                expect(res.body.status).to.eql(false);

                expect(res.body.error).to.have.property('type');

                expect(res.body.error).to.have.property('message');

            });
    });

    it('responds with JSON object must not contains token, private_key, password', async () => {

        return chai.request(app).put('/user/'+createdAdmin._id)

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .send({

                "first_name": "api-test-updated",

                "email": "api-test@example.com",

                "group": null,

                "private_key": "101010101010100110111010",

                "token": "010101110011000111001010",

            })
            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('sid');

                expect(res.body.result).to.have.property('email');

                expect(res.body.result.email).to.eql("api-test@example.com");

                expect(res.body.result).to.have.property('first_name');

                expect(res.body.result.first_name).to.eql("api-test-updated");

                expect(res.body.result).to.have.property('group');

                expect(res.body.result).to.not.have.property('token');

                expect(res.body.result).to.not.have.property('private_key');

                expect(res.body.result).to.not.have.property('password');

                createdAdmin = res.body.result;

            });
    });

});

describe('GET api/v1/users', () => {

    it('responds with JSON array objects in array must not contains token, private_key, password', async () => {

        return chai.request(app).get('/users')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.be.an('array');

                expect(res.body.result[0]).to.have.property('sid');

                expect(res.body.result[0]).to.have.property('group');

                expect(res.body.result[0]).to.not.have.property('token');

                expect(res.body.result[0]).to.not.have.property('private_key');

                expect(res.body.result[0]).to.not.have.property('password');

            });
    });

});

describe('GET api/v1/user/{_id}', () => {

    it('responds with JSON object must not contains token, private_key, password', async () => {

        return chai.request(app).get('/user/'+createdAdmin._id)

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.error).to.eql(false);

                expect(res.body.status).to.eql(true);

                expect(res.body.result).to.have.property('sid');

                expect(res.body.result).to.have.property('group');

                expect(res.body.result).to.not.have.property('token');

                expect(res.body.result).to.not.have.property('private_key');

                expect(res.body.result).to.not.have.property('password');

            });
    });

});

describe('DELETE api/v1/user/{_id}', () => {

    it('Wrong user _id', async () => {

        return chai.request(app).del('/user/01011111111123')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(500);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(false);

                expect(res.body.status).to.eql(false);

                expect(res.body.error).to.have.property('type');

                expect(res.body.error).to.have.property('message');

            });
    });

    it('responds with JSON true', async () => {

        return chai.request(app).del('/user/'+createdAdmin._id)

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(true);

                expect(res.body.status).to.eql(true);

                expect(res.body.error).to.eql(false);

            });
    });

});

describe('DELETE api/v1/group/{_id}', () => {

    it('Wrong group _id', async () => {

        return chai.request(app).del('/group/01011111111123')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(500);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(false);

                expect(res.body.status).to.eql(false);

                expect(res.body.error).to.have.property('type');

                expect(res.body.error).to.have.property('message');

            });
    });

    it('responds with JSON true', async () => {

        return chai.request(app).del('/group/'+createdGroup._id)

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(true);

                expect(res.body.status).to.eql(true);

                expect(res.body.error).to.eql(false);

            });
    });

});

describe('GET api/v1/auth/logout', () => {

    it('responds with JSON true', async () => {

        return chai.request(app).get('/auth/logout')

            .set('X-AUTH-SID', authorizedUser.sid)

            .set('X-AUTH-TOKEN', authorizedUser.token)

            .then(res => {

                expect(res.status).to.eql(200);

                expect(res.type).to.eql('application/json');

                expect(res.body).to.have.property('error');

                expect(res.body).to.have.property('result');

                expect(res.body).to.have.property('status');

                expect(res.body.result).to.eql(true);

                expect(res.body.status).to.eql(true);

                expect(res.body.error).to.eql(false);

            });
    });

});