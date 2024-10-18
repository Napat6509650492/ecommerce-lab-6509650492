const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {
    describe('GET /products', () => {
        it('should return all products', async () => {
            const res = await request(app).get('/products');
            expect(res.status).toBe(200)
            expect(res.body).toHaveLength(2)
        });
    });

    describe('GET /products/:id', () => {
        it('should return a product by ID', async () => {
            const pid = 1
            const res = await request(app).get(`/products/${pid}`);
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('id', 1);
        });
        it('should return 404 if product not found', async () => {
            const pid = 5
            const res = await request(app).get(`/products/${pid}`);
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

    describe('POST /products', () => {
        it('should add a new product', async () => {
            const newProduct = {
                name: 'iPad', 
                price: 50000, 
                stock: 10 };
            const res = await request(app)
                .post(`/products`)
                .send(newProduct);
            expect(res.status).toBe(201);
        });
    });

    describe('PUT /products/:id', () => {
        it('should update an existing product', async () => {
            const upid = 1;
            const uanme = 'MacBook'

            const res = await request(app)
                .put(`/products/${upid}`)
                .send({
                    stock:100
                });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('stock',100);
        });

        it('should update an existing product Name', async () => {
            const upid = 1;
            const uname = 'MacBook'

            const res = await request(app)
                .put(`/products/${upid}`)
                .send({
                    name: uname
                });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', uname);
        });


        it('should return 404 if product not found', async () => {
            const upid = 50;
            const res = await request(app)
                .put(`/products/${upid}`)
                .send({
                    stock: 100
                });
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

    describe('DELETE /products/:id', () => {
        it('should delete a product', async () => {
            const del_id = 1;
            const res = await request(app)
                .delete(`/products/${del_id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Product deleted');
        });
        it('should return 404 if product not found', async () => {
            const del_id = 50;
            const res = await request(app)
                .delete(`/products/${del_id}`);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

});
