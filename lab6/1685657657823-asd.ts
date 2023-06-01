import { MigrationInterface, QueryRunner } from "typeorm";

export class Asd1685657657823 implements MigrationInterface {
    name = 'Asd1685657657823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_address_valid"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "info"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "info" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "text" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "info"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "info" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "users_address_valid" CHECK ((((address -> 'city'::text) IS NOT NULL) AND (jsonb_typeof((address -> 'city'::text)) = 'string'::text) AND ((address -> 'street'::text) IS NOT NULL) AND (jsonb_typeof((address -> 'street'::text)) = 'string'::text)))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
