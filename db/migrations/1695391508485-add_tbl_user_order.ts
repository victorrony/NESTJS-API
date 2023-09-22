import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTblUserOrder1695391508485 implements MigrationInterface {
    name = 'AddTblUserOrder1695391508485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderdAt"`);
    }

}
