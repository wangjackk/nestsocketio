import { PartialType } from '@nestjs/mapped-types';
import { CreateGetBackendStateDto } from './create-get_backend_state.dto';

export class UpdateGetBackendStateDto extends PartialType(CreateGetBackendStateDto) {}
