import { MigrationInterface, QueryRunner } from "typeorm";

export class createShopeeTables1665233389931 implements MigrationInterface {
    name = 'createShopeeTables1665233389931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."shopee_order_synchronizations_status_enum" AS ENUM('pending', 'failed', 'successful')`);
        await queryRunner.query(`CREATE TABLE "shopee_order_synchronizations" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "shop_id" character varying NOT NULL, "status" "public"."shopee_order_synchronizations_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_9605f0df52ec878f8d5cabcfa80" UNIQUE ("id"), CONSTRAINT "PK_9605f0df52ec878f8d5cabcfa80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_tokens" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "access_token" character varying NOT NULL, "expired_at" TIMESTAMP NOT NULL, "refresh_token" character varying NOT NULL, "partner_id" character varying NOT NULL, "shop_id" character varying, CONSTRAINT "UQ_ca787dfbe90079aed22f47d69a6" UNIQUE ("id"), CONSTRAINT "UQ_00737749b32753651f647c347f1" UNIQUE ("access_token"), CONSTRAINT "UQ_19b7750ff44fea2d14797983d4d" UNIQUE ("refresh_token"), CONSTRAINT "UQ_701fd1f4619080362a2e3a6a42d" UNIQUE ("shop_id"), CONSTRAINT "PK_ca787dfbe90079aed22f47d69a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_shops" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "code" character varying, "partner_id" character varying NOT NULL, "signData" character varying NOT NULL, CONSTRAINT "UQ_7994974945af850e6b5ded8034b" UNIQUE ("id"), CONSTRAINT "PK_7994974945af850e6b5ded8034b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_products" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "data" jsonb NOT NULL, "sku" character varying NOT NULL, "shop_id" character varying NOT NULL, CONSTRAINT "UQ_ba3e8ff4ceb4be39762dd5e3c02" UNIQUE ("id"), CONSTRAINT "UQ_ce7c9a59cbc349794ee164a54fd" UNIQUE ("sku"), CONSTRAINT "PK_ba3e8ff4ceb4be39762dd5e3c02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_images" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "data" jsonb NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "UQ_d800a68530d8f836444e2347c51" UNIQUE ("id"), CONSTRAINT "PK_d800a68530d8f836444e2347c51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shopee_order_synchronizations" ADD CONSTRAINT "FK_4193b3362a4e80d12ae6757cdb7" FOREIGN KEY ("shop_id") REFERENCES "shopee_shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_tokens" ADD CONSTRAINT "FK_701fd1f4619080362a2e3a6a42d" FOREIGN KEY ("shop_id") REFERENCES "shopee_shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_products" ADD CONSTRAINT "FK_01c972f22555adfd3d2dd779a98" FOREIGN KEY ("shop_id") REFERENCES "shopee_shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_images" ADD CONSTRAINT "FK_0e6b884f050118025cb4f8cdb78" FOREIGN KEY ("shop_id") REFERENCES "shopee_shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_images" ADD CONSTRAINT "FK_3889b095213bf9c83fb1a368cee" FOREIGN KEY ("product_id") REFERENCES "shopee_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopee_images" DROP CONSTRAINT "FK_3889b095213bf9c83fb1a368cee"`);
        await queryRunner.query(`ALTER TABLE "shopee_images" DROP CONSTRAINT "FK_0e6b884f050118025cb4f8cdb78"`);
        await queryRunner.query(`ALTER TABLE "shopee_products" DROP CONSTRAINT "FK_01c972f22555adfd3d2dd779a98"`);
        await queryRunner.query(`ALTER TABLE "shopee_tokens" DROP CONSTRAINT "FK_701fd1f4619080362a2e3a6a42d"`);
        await queryRunner.query(`ALTER TABLE "shopee_order_synchronizations" DROP CONSTRAINT "FK_4193b3362a4e80d12ae6757cdb7"`);
        await queryRunner.query(`DROP TABLE "shopee_images"`);
        await queryRunner.query(`DROP TABLE "shopee_products"`);
        await queryRunner.query(`DROP TABLE "shopee_shops"`);
        await queryRunner.query(`DROP TABLE "shopee_tokens"`);
        await queryRunner.query(`DROP TABLE "shopee_order_synchronizations"`);
        await queryRunner.query(`DROP TYPE "public"."shopee_order_synchronizations_status_enum"`);
    }

}
