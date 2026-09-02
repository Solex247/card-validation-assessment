// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CardValidation (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  it('/card/validate (POST) returns valid: true for a valid card', () => {
    return request(app.getHttpServer())
      .post('/card/validate')
      .send({ cardNumber: '4532015112830366' })
      .expect(200)
      .expect({ cardNumber: '4532015112830366', valid: true });
  });

  it('/card/validate (POST) returns 400 for missing cardNumber', () => {
    return request(app.getHttpServer())
      .post('/card/validate')
      .send({})
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});