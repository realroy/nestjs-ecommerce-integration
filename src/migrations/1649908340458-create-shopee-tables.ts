import { MigrationInterface, QueryRunner } from "typeorm";

export class createShopeeTables1649908340458 implements MigrationInterface {
    name = 'createShopeeTables1649908340458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopee_token" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accessToken" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "refreshToken" character varying NOT NULL, "partnerId" character varying NOT NULL, CONSTRAINT "UQ_a3dd5b8e0ccd973748eadcff12f" UNIQUE ("accessToken"), CONSTRAINT "UQ_7903c3fa0f684d18aced3052236" UNIQUE ("refreshToken"), CONSTRAINT "PK_cc68b3d503687b8876576cba1ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_shop" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "partnerId" character varying NOT NULL, "shopId" character varying NOT NULL, CONSTRAINT "UQ_e43857c48449957aa109b1387bf" UNIQUE ("shopId"), CONSTRAINT "PK_35cbabf2346b68353d5e0eae7a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shopee_shop"`);
        await queryRunner.query(`DROP TABLE "shopee_token"`);
    }

}
