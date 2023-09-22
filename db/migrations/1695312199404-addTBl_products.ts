import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBlProducts1695312199404 implements MigrationInterface {
    name = 'AddTBlProducts1695312199404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL, "image" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, "categoriesId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d7e7f53b786522ae18147bb853c" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d7e7f53b786522ae18147bb853c"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
