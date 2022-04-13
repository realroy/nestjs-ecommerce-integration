import { MigrationInterface, QueryRunner } from "typeorm";

export class createShopeeShop1649848928240 implements MigrationInterface {
    name = 'createShopeeShop1649848928240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopee_shop" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "shopId" character varying NOT NULL, CONSTRAINT "PK_35cbabf2346b68353d5e0eae7a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shopee_shop"`);
    }

}
