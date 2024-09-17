import { ExceptionFilter, Catch, BadRequestException } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException) {
    // Extract the validation errors
    const { message } = exception.getResponse() as any;

    throw new GraphQLError(message[0], {
      extensions: { code: 'DATA_VALIDATION_FAILED' }
    });
  }
}
