import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1770906934691 implements MigrationInterface {
    name = 'InitSchema1770906934691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favourites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "gameId" uuid, CONSTRAINT "PK_173e5d5cc35490bf1de2d2d3739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0f2c8899f7714e2eb9e1fbca1e" ON "favourites" ("userId", "gameId") `);
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "coverImageUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "ownerId" uuid, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "scores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "gameId" uuid, CONSTRAINT "PK_c36917e6f26293b91d04b8fd521" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2424b8ae8c270a6d86bbc260c3" ON "scores" ("userId", "gameId") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "profileImageUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD CONSTRAINT "FK_a7dca0d9d21de69ad51b962a87b" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_7ba31d25ad376fbcb7f8a20a8db" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_c0508b319d67f890b4118099680" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_0e19b6c2a3e26c5a526a3877761" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_0e19b6c2a3e26c5a526a3877761"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_c0508b319d67f890b4118099680"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_7ba31d25ad376fbcb7f8a20a8db"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_a7dca0d9d21de69ad51b962a87b"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP CONSTRAINT "FK_b75b5e4a2475d03acfe11eac1d1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2424b8ae8c270a6d86bbc260c3"`);
        await queryRunner.query(`DROP TABLE "scores"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f2c8899f7714e2eb9e1fbca1e"`);
        await queryRunner.query(`DROP TABLE "favourites"`);
    }

}
