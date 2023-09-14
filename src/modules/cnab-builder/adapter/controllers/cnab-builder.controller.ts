import { Controller } from '@nestjs/common';
import { CnabBuilderService } from '../../application/services/cnab-builder.service';

@Controller('cnab-builder')
export class CnabBuilderController {
  constructor(private readonly cnabBuilderService: CnabBuilderService) {}
}
