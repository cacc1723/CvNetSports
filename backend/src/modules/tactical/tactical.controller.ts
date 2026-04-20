@UseGuards(JwtAuthGuard)
@Controller('tactical')
export class TacticalController {
  constructor(private readonly tacticalService: TacticalService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreatePlayDto) {
    // req.user fue inyectado por el JwtStrategy
    return this.tacticalService.create(req.user.id, dto);
  }

  @Get()
  findAll() {
    return this.tacticalService.findAll();
  }
}