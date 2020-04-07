var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var server = 'http://localhost:3000/devices'

chai.use(chaiHttp);

describe('Routes', function() {
    it('should return 200 as status code of service', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    });

    it('should return a list on asking for list of devices first time', function(done) {
        chai.request(server)
        .get('/list')
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res.body).to.be.an('array');
            done();
        })
    });
})


describe('Add/Remove devices', function(done) { 

    it('should correctly add a device', function(done) {
        chai.request(server)
        .post('/add')
        .set('Content-Type', 'application/json')
        .send({"device_name": 'test_device'})
        .end(function(err, res, body) {
            expect(err).to.be.null;
            expect(res.body).to.deep.equal({ 
                "status": "Success!",
                "device_added":  "test_device"
            })
          done();
        })
    })
    
    it('should correctly remove a device', function() {
            chai.request(server)
                .post('/remove')
                .set('Content-Type', 'application/json')
                .send({"device": 'test_device'})
                .end(function(err, res, body) {
                    expect(err).to.be.null;
                    expect(res.body).to.deep.equal({ 
                        "status": "Success!",
                        "device_removed": "test_device"
                    })
                })
               
    })
})

describe('Task handling', function() {
    
    it('should correctly add a device', function(done) {
        chai.request(server)
        .post('/add')
        .set('Content-Type', 'application/json')
        .send({"device_name": 'test_device'})
        .end(function(err, res, body) {
            expect(err).to.be.null;
            expect(res.body).to.deep.equal({ 
                "status": "Success!",
                "device_added":  "test_device"
            })
          done();
        })
    })

    it('should create a task for a device', function(done) {
        chai.request(server)
        .put('/task')
        .set('Content-Type', 'application/json')
        .send({
            "device": 'test_device',
            "task": "test_task"
            })
        .end(function(err, res, body) {
            expect(err).to.be.null;
            expect(res.body).to.deep.equal({ 
                "device": "test_device",
                "action_performed": "test_task"
            })
            done();
        })

    })
})

        

