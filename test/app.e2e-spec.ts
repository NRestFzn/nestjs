import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e) - JWT Authentication', () => {
  let app: INestApplication;
  let accessToken: string;

  const uniqueEmail = `testuser-${Date.now()}@example.com`;
  const userCredentials = {
    email: uniqueEmail,
    password: 'SecurePassword123!',
    fullName: 'Test e2e',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Registration and Login', () => {
    it('/users/register (POST) - should register a new user', () => {
      return request(app.getHttpServer())
        .post('/users/register')
        .send(userCredentials)
        .expect(HttpStatus.CREATED)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });

    it('/users/login (POST) - should not login with wrong password', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({ email: userCredentials.email, password: 'WrongPassword' })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('/users/login (POST) - should login the registered user and return a JWT', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: userCredentials.email,
          password: userCredentials.password,
        })
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body).toHaveProperty('token');
          expect(typeof res.body.token).toBe('string');
          accessToken = res.body.token;
        });
    });
  });

  describe('Protected Route Access (/users/me)', () => {
    const protectedRoute = '/users/me';

    it('should return 401 UNAUTHORIZED if no token is provided', () => {
      return request(app.getHttpServer())
        .get(protectedRoute)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return 401 UNAUTHORIZED if an invalid/malformed token is provided', () => {
      return request(app.getHttpServer())
        .get(protectedRoute)
        .set('Authorization', 'Bearer invalidtoken123')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return 401 UNAUTHORIZED if token is malformed (missing Bearer prefix)', () => {
      const DUMMY_TOKEN_WITHOUT_PREFIX =
        'just.some.random.string.without.bearer';
      return request(app.getHttpServer())
        .get('/users/me') // Ganti protectedRoute menjadi /users/me jika itu yang benar
        .set('Authorization', DUMMY_TOKEN_WITHOUT_PREFIX)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should allow access with a valid token and return user profile data', async () => {
      if (!accessToken) {
        throw new Error(
          'Access token not available for protected route test. Ensure login test runs first and succeeds.',
        );
      }

      const response = await request(app.getHttpServer())
        .get(protectedRoute)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.OK);

      expect(response.body).toBeDefined();
    });
  });
});
