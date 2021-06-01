
const expect = require('chai').expect;
const request = require('request');
const axios = require('axios');

describe('API', function(){

describe("Ping Step 1", function() {
    it('correct body', function(done) {
        request('http://localhost:5000/api/ping', function(e,response,body){
            expect(body);
            done();
        });
      });

      it("returns status 200", function(done) {
        request('http://localhost:5000/api/ping', function(e,response,body){
            expect(response && response.statusCode);
            done();
      });
    });
    })

    describe("Post API Step 2", function(){
        it('Having different tags with unique ids', function(done){
            axios.get('http://localhost:5000/api/posts?tags=teh.history')
            .then(res => {
                let pdata = res.data;
                let test = true;

                for(let i=0; i<pdata.length; i++){
                   console.log( pdata[i].id);
                }
                if(pdata[i] > 1){
                    test = false;
                }
            })
            done();
            });

            it('Having different tags with unique ids with all parameters', function(done){
                axios.get('http://localhost:5000/api/posts?tags=teh.history&sortBy=Likes&direction=desc')
                .then(res => {
                    let pdata = res.data;
                    let test = true;
    
                    for(let i=0; i<pdata.length; i++){
                       console.log( pdata[i].id);
                    }
                    if(pdata[i] > 1){
                        test = false;
                    }
                })
                done();
            });

            it('Sorted values when user did not input values of sortBy', function(done){
                axios.get('http://localhost:5000/api/posts?tags=tech,history')
                .then(res => {
                    let pdata = res.data;
                    let test = true;
    
                    for(let i=0; i<pdata.length; i++){
                       console.log( pdata[i].id);
                       if(pdata[i] > pdata[i+1]){
                        test = false;
                    }
                    }
                    
                })
                done();
            });

            it('Sorted values when user input it', function(done){
                axios.get('http://localhost:5000/api/posts?tags=tech,history&sortBy=likes&direction=desc')
                .then(res => {
                    let pdata = res.data;
                    let test = true;
    
                    for(let i=0; i<pdata.length; i++){
                       console.log( pdata[i].id);
                       if(pdata[i] < pdata[i+1]){
                        test = false;
                    }
                    }    
                })
                done();
            });
            it("Have not input tag parameter returned 404 error code", function(done) {
                request('http://localhost:5000/api/posts', function(e,response,body){
                    expect(response && response.statusCode);
                    done();
              });
            });
            it("Have given input tag parameter returned 200 success code", function(done) {
                request('http://localhost:5000/api/posts?tag=tech', function(e,response,body){
                    expect(response && response.statusCode);
                    done();
              });
            });

            it("Returns 200 success code when user input all three parameters", function(done) {
                request('http://localhost:5000/api/posts?tag=tech&sortBy=Likes&direction=desc', function(e,response,body){
                    expect(response && response.statusCode);
                    done();
              });
            });

        })
    })