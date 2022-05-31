import { MigrationInterface, QueryRunner } from "typeorm";

export class createShopeeTables1653016878523 implements MigrationInterface {
    name = 'createShopeeTables1653016878523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopee_token" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "access_token" character varying NOT NULL, "expired_at" TIMESTAMP NOT NULL, "refresh_token" character varying NOT NULL, "partner_id" character varying NOT NULL, "shop_id" character varying, CONSTRAINT "UQ_cc68b3d503687b8876576cba1ed" UNIQUE ("id"), CONSTRAINT "UQ_bfb36c47101b94a77af969223d7" UNIQUE ("access_token"), CONSTRAINT "UQ_74b33f09a12937cc3ed2a1d63f8" UNIQUE ("refresh_token"), CONSTRAINT "UQ_9329d66969a0d90b3f6b28cdb25" UNIQUE ("shop_id"), CONSTRAINT "PK_cc68b3d503687b8876576cba1ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_shop" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "code" character varying NOT NULL, "partner_id" character varying NOT NULL, "orders_sync_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_35cbabf2346b68353d5e0eae7a3" UNIQUE ("id"), CONSTRAINT "PK_35cbabf2346b68353d5e0eae7a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_image" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "data" jsonb NOT NULL, "shop_id" character varying, "product_id" character varying, CONSTRAINT "UQ_c821bb75ef96ecfae575589b8f0" UNIQUE ("id"), CONSTRAINT "PK_c821bb75ef96ecfae575589b8f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopee_product" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "data" jsonb NOT NULL, "sku" character varying NOT NULL, "shop_id" character varying NOT NULL, CONSTRAINT "UQ_3c9be5c23af163ced777f6531d2" UNIQUE ("id"), CONSTRAINT "UQ_cc1ca0485c328f7ea9af2cee56d" UNIQUE ("sku"), CONSTRAINT "PK_3c9be5c23af163ced777f6531d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shopee_token" ADD CONSTRAINT "FK_9329d66969a0d90b3f6b28cdb25" FOREIGN KEY ("shop_id") REFERENCES "shopee_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_image" ADD CONSTRAINT "FK_cf964c7d947615f6579038c32c9" FOREIGN KEY ("shop_id") REFERENCES "shopee_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_image" ADD CONSTRAINT "FK_6cc9be17137d4a655a697589b7f" FOREIGN KEY ("product_id") REFERENCES "shopee_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopee_product" ADD CONSTRAINT "FK_5ba03c456b095c763c9f7a46993" FOREIGN KEY ("shop_id") REFERENCES "shopee_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopee_product" DROP CONSTRAINT "FK_5ba03c456b095c763c9f7a46993"`);
        await queryRunner.query(`ALTER TABLE "shopee_image" DROP CONSTRAINT "FK_6cc9be17137d4a655a697589b7f"`);
        await queryRunner.query(`ALTER TABLE "shopee_image" DROP CONSTRAINT "FK_cf964c7d947615f6579038c32c9"`);
        await queryRunner.query(`ALTER TABLE "shopee_token" DROP CONSTRAINT "FK_9329d66969a0d90b3f6b28cdb25"`);
        await queryRunner.query(`DROP TABLE "shopee_product"`);
        await queryRunner.query(`DROP TABLE "shopee_image"`);
        await queryRunner.query(`DROP TABLE "shopee_shop"`);
        await queryRunner.query(`DROP TABLE "shopee_token"`);
    }

}
