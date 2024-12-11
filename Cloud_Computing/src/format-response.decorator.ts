// src/decorators/format-response.decorator.ts
import { applyDecorators } from '@nestjs/common';

export interface FormattedResponse<T> {
    statusCode: number;
    data: Awaited<T>;
}

export const FormatResponse = (statusCode: number = 200) => {
    return applyDecorators(
        (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => {
            if (descriptor) {
                // Method decorator
                const originalMethod = descriptor.value;

                descriptor.value = async function (...args: any[]) {
                    
                    const result = await originalMethod.apply(this, args);
                    
                    return {
                        statusCode: statusCode,
                        data: result,
                    };
                };

                return descriptor;
            } else {
                // Class decorator
                for (const key of Object.getOwnPropertyNames(target.prototype)) {
                    const method = target.prototype[key];
                    if (typeof method === 'function' && key !== 'constructor') {
                        target.prototype[key] = async function (...args: any[]) {
                            const result = await method.apply(this, args);
                            return {
                                statusCode: 200,
                                data: result,
                            };
                        };
                    }
                }
            }
        },
    );
};