import { expect } from 'chai';
import resquest from 'supertest';

import { app } from '../app.js';

// describe('Testing at localhost', () => {
//     it('testing route localhost:3000', (done) => {
//         resquest(app)
//             .get('/api/v1/orders')
//             .then((res) => {
//                 expect(res.status).to.equal(200);
//                 expect(res.body).to.be.an('object');
//                 done();
//             })
//             .catch((err) => done(err));
//     });
// });

describe('Testing at localhost', () => {
    it('testing route localhost:3000', (done) => {
        resquest(app)
            .post('/api/v1/orders')
            .send({
                orderItems: [
                    {
                        product: '654502c06d91f02b2d8d92ce',
                        quantity: 4,
                    },
                    {
                        product: '6545033b4032d60cd0655e3e',
                        quantity: 7,
                    },
                ],
                shippingAddress: 'Ninh Kieu',
                city: 'Can Tho',
                zip: '1001',
                country: 'Viet Nam',
                phone: '03331231',
                totalPrice: 1500000,
                user: '654b8a0e021bfbbd0b975778',
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
});
