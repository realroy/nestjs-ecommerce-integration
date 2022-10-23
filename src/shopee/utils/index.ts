import type { EntityManager, QueryRunner } from 'typeorm';

export function throwIfError(data: { error?: string; message?: string }) {
  if (data?.error?.length) {
    throw new Error(data.error + data.message);
  }
}

interface WrapTypeormTransactionArguments<T> {
  queryRunner: QueryRunner;
  execute: (manager: EntityManager) => Promise<T>;
}

export async function wrapTypeormTransaction<T>({
  queryRunner,
  execute,
}: WrapTypeormTransactionArguments<T>) {
  try {
    if (!queryRunner.connection.isInitialized) {
      await queryRunner.connect();
    }
    await queryRunner.startTransaction();

    const response = await execute(queryRunner.manager);
    await queryRunner.commitTransaction();

    return response;
  } catch (error) {
    queryRunner.rollbackTransaction();
    throw error;
  } finally {
    queryRunner.release();
  }
}
