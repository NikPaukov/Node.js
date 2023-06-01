const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1685651395980 {
    name = 'Migrations1685651395980'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "users_address_valid"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "info"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "info" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "created_at" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "text"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "text" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "user_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "user_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "user_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "user_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "text"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "text" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "created_at" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "info"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "info" text
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "users_address_valid" CHECK (
                    (
                        ((address->'city'::text) IS NOT NULL)
                        AND (
                            jsonb_typeof((address->'city'::text)) = 'string'::text
                        )
                        AND ((address->'street'::text) IS NOT NULL)
                        AND (
                            jsonb_typeof((address->'street'::text)) = 'string'::text
                        )
                    )
                )
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }
}
