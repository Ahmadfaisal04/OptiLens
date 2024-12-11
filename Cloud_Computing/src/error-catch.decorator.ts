import { BadRequestException, ConflictException, NotFoundException, SetMetadata, applyDecorators } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const CATCH_PRISMA_ERROR = 'CATCH_PRISMA_ERROR';

const prismaErrorToHttpStatus = (error: PrismaClientKnownRequestError) => {
    // console.error(error)
    switch (error.code) {
        case 'P2002':
            throw new ConflictException(error.meta?.target + " ini sudah dipakai")
        case 'P2025':
            throw new NotFoundException("Tidak Menemukan Data")
        default:
            console.log(error)
            throw new BadRequestException("Data Bermasalah")

    }
};

export const CatchPrismaError = () => {
    return applyDecorators(
        SetMetadata(CATCH_PRISMA_ERROR, true),
        (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => {
            if (descriptor) {
                // Method decorator
                const originalMethod = descriptor.value;

                descriptor.value = async function (...args: any[]) {
                    try {
                        return await originalMethod.apply(this, args);
                    } catch (error) {
                        console.log(JSON.stringify(error))
                        if (error instanceof PrismaClientKnownRequestError) {
                            const status = prismaErrorToHttpStatus(error);
                            throw new HttpException(
                                {
                                    status,
                                    error: error.message,
                                },
                                status,
                            );
                        }
                        throw error;
                    }
                };

                return descriptor;
            } else {
                // Class decorator
                for (const key of Object.getOwnPropertyNames(target.prototype)) {
                    const method = target.prototype[key];
                    if (typeof method === 'function' && key !== 'constructor') {
                        target.prototype[key] = async function (...args: any[]) {
                            try {
                                return await method.apply(this, args);
                            } catch (error) {
                                if (error instanceof PrismaClientKnownRequestError) {
                                    prismaErrorToHttpStatus(error);
                                }
                                
                                throw error;
                            }
                        };
                    }
                }
            }
        },
    );
};