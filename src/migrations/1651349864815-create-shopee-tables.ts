import { MigrationInterface, QueryRunner } from "typeorm";

export class createShopeeTables1651349864815 implements MigrationInterface {
    name = 'createShopeeTables1651349864815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopee_token" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accessToken" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "refreshToken" character varying NOT NULL, "partnerId" character varying NOT NULL, "shopId" character varying, CONSTRAINT "UQ_cc68b3d503687b8876576cba1ed" UNIQUE ("id"), CONSTRAINT "UQ_a3dd5b8e0ccd973748eadcff12f" UNIQUE ("accessToken"), CONSTRAINT "UQ_7903c3fa0f684d18aced3052236" UNIQUE ("refreshToken"), CONSTRAINT "UQ_2b3f5bfb00f2160675cf16a06cc" UNIQUE ("shopId"), CONSTRAINT "PK_cc68b3d503687b8876576cba1ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_shop" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "partnerId" character varying NOT NULL, CONSTRAINT "UQ_35cbabf2346b68353d5e0eae7a3" UNIQUE ("id"), CONSTRAINT "PK_35cbabf2346b68353d5e0eae7a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_image" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "data" jsonb NOT NULL, "shopId" character varying, "productId" character varying, CONSTRAINT "UQ_c821bb75ef96ecfae575589b8f0" UNIQUE ("id"), CONSTRAINT "PK_c821bb75ef96ecfae575589b8f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_product" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "data" jsonb NOT NULL, "sku" character varying NOT NULL, "shopId" character varying NOT NULL, CONSTRAINT "UQ_3c9be5c23af163ced777f6531d2" UNIQUE ("id"), CONSTRAINT "UQ_cc1ca0485c328f7ea9af2cee56d" UNIQUE ("sku"), CONSTRAINT "PK_3c9be5c23af163ced777f6531d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shopee_token" ADD CONSTRAINT "FK_2b3f5bfb00f2160675cf16a06cc" FOREIGN KEY ("shopId") REFERENCES "shopee_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_image" ADD CONSTRAINT "FK_2a1d82bd7b13e4a01f31de60697" FOREIGN KEY ("shopId") REFERENCES "shopee_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_image" ADD CONSTRAINT "FK_090d76e2c4caa9039ff52660a45" FOREIGN KEY ("productId") REFERENCES "shopee_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_product" ADD CONSTRAINT "FK_1eeb745aa66293b8ec9d26a3b05" FOREIGN KEY ("shopId") REFERENCES "shopee_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopee_product" DROP CONSTRAINT "FK_1eeb745aa66293b8ec9d26a3b05"`);
        await queryRunner.query(`ALTER TABLE "shopee_image" DROP CONSTRAINT "FK_090d76e2c4caa9039ff52660a45"`);
        await queryRunner.query(`ALTER TABLE "shopee_image" DROP CONSTRAINT "FK_2a1d82bd7b13e4a01f31de60697"`);
        await queryRunner.query(`ALTER TABLE "shopee_token" DROP CONSTRAINT "FK_2b3f5bfb00f2160675cf16a06cc"`);
        await queryRunner.query(`DROP TABLE "shopee_product"`);
        await queryRunner.query(`DROP TABLE "shopee_image"`);
        await queryRunner.query(`DROP TABLE "shopee_shop"`);
        await queryRunner.query(`DROP TABLE "shopee_token"`);
    }

}
