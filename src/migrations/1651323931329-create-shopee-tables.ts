import { MigrationInterface, QueryRunner } from 'typeorm';

export class createShopeeTables1651323931329 implements MigrationInterface {
  name = 'createShopeeTables1651323931329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shopee_token" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accessToken" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "refreshToken" character varying NOT NULL, "partnerId" character varying NOT NULL, CONSTRAINT "UQ_a3dd5b8e0ccd973748eadcff12f" UNIQUE ("accessToken"), CONSTRAINT "UQ_7903c3fa0f684d18aced3052236" UNIQUE ("refreshToken"), CONSTRAINT "PK_cc68b3d503687b8876576cba1ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shopee_shop" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "partnerId" character varying NOT NULL, "shopId" character varying NOT NULL, CONSTRAINT "UQ_e43857c48449957aa109b1387bf" UNIQUE ("shopId"), CONSTRAINT "PK_35cbabf2346b68353d5e0eae7a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shopee_image" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "imageId" character varying NOT NULL, "imageUrlList" jsonb NOT NULL, "shopId" integer, CONSTRAINT "UQ_84496528b590455476ac3da3703" UNIQUE ("imageId"), CONSTRAINT "PK_c821bb75ef96ecfae575589b8f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopee_image" ADD CONSTRAINT "FK_2a1d82bd7b13e4a01f31de60697" FOREIGN KEY ("shopId") REFERENCES "shopee_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shopee_image" DROP CONSTRAINT "FK_2a1d82bd7b13e4a01f31de60697"`,
    );
    await queryRunner.query(`DROP TABLE "shopee_image"`);
    await queryRunner.query(`DROP TABLE "shopee_shop"`);
    await queryRunner.query(`DROP TABLE "shopee_token"`);
  }
}
