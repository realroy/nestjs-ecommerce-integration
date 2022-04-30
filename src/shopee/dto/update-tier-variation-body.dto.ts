import { OmitType } from '@nestjs/swagger';

import { CreateTierVariationBodyDto } from './create-tier-variation-body.dto';

export class UpdateTierVariationBodyDto extends OmitType(
  CreateTierVariationBodyDto,
  ['model'] as const,
) {}
