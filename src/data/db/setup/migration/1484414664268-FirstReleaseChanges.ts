import {MigrationInterface, QueryRunner, Connection, EntityManager} from "typeorm";

export class FirstReleaseChanges1484414664268 implements MigrationInterface {

    async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    }

    async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
    }

}
