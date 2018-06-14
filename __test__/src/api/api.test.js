'use strict';

import superagent from 'superagent';
// import api from '../../../src/api/api.js'; 
import app from '../../../src/app.js';

/*
## Tests
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered [ X ]
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:

 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found [ X  ]
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request [ X ]
 * `GET`: test 200, it should contain a response body for a request made with a valid id [ X ]
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid [ X ]
 * `POST`: test 200, it should respond with the body content for a post request with a valid body [ X ]
 * 

*/

describe('app',() =>{

  beforeAll( () => {
    app.start(3300);
  });

  afterAll( ()=>{
    app.stop();
  });

  it('should post a new note with the body, and get back that note with a specific id', () => {
    let obj = {
      id:'33',
      content: 'freds name', 
      title: 'Fred'};
    return superagent
      .post('http://localhost:3300/api/v1/notes')
      .send(obj)

      .then(data =>
      {
        let returns = data.body.id;
        return superagent
          .get(`http://localhost:3300/api/v1/notes?id=${returns}`)
          .then(data => {
            // console.log('top', data.status);
            // console.log(returns);
            expect(data.status).toEqual(200);
            expect(data.body.id).toEqual(returns);
          } )
          .catch(err => {
            console.log(err);
          });
      });

  });



  it('should return error for post 400', () => {
    let obj = {};
    return superagent
      .post('http://localhost:3300/api/v1/notes')
      .send(obj)
      .then(res => {
        // console.log(res.statusCode);
      })
      .catch(res => {
        console.log(res.status);
        expect(res.status).toEqual(400);
        
   
      });
  });


  it('should return error for get with bad id 404', () => {
    return superagent
      .get(`http://localhost:3300/api/v1/notes?id=3`)
      
      .catch(res => {
        console.log(res.status);
        expect(res.status).toEqual(404);
        
   
      });
  });

  it('should return error for get with no id 400', () => {
    return superagent
      .get(`http://localhost:3300/api/v1/notes?id=`)
      
      .catch(res => {
        console.log('last', res.status);
        expect(res.status).toEqual(400);
        
   
      });
  });

  it('should post a new note with the body, and get back that note with a specific id', () => {
    let obj = {
      id:'33',
      content: 'freds name', 
      title: 'Fred'};
    return superagent
      .post('http://localhost:3300/api/v1/notes')
      .send(obj)
      .then(data =>{
        let returns = data.body.id;
        console.log('last 200: ', data.status);
        expect(data.status).toEqual(200);
        expect(data.body.id).toEqual(returns);
      });
  });

});
